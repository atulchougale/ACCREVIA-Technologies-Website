/**
 * Local preview that mimics Netlify's routing for the built site in dist/:
 *   1. rules from dist/_redirects ("from to status", "!" = forced)
 *   2. static files (exact path or /path/index.html)
 *   3. otherwise dist/404.html with a real HTTP 404
 * Use it to verify real HTTP status codes: npm run build && npm run preview:netlify
 * (Vite's own preview server answers every URL with index.html and HTTP 200, so it cannot show 404 behaviour.)
 */
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const dist = process.env.DIST ?? join(process.cwd(), "dist");
const port = Number(process.env.PORT ?? 4180);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".webmanifest": "application/manifest+json",
};

const rules = existsSync(join(dist, "_redirects"))
  ? readFileSync(join(dist, "_redirects"), "utf-8")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const [from, to, status = "301"] = line.split(/\s+/);
        return { from, to, status: parseInt(status, 10), force: status.endsWith("!") };
      })
  : [];

const fileFor = (pathname) => {
  const safe = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  for (const candidate of [join(dist, safe), join(dist, safe, "index.html")]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
};

const send = (res, status, file) => {
  res.writeHead(status, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
};

createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const pathname = decodeURIComponent(url.pathname);
  const existing = fileFor(pathname);
  const rule = rules.find((r) => r.from === pathname && (r.force || !existing));

  if (rule && rule.status >= 300 && rule.status < 400) {
    res.writeHead(rule.status, { Location: rule.to + url.search });
    return res.end();
  }
  if (rule && rule.status === 200) {
    const target = fileFor(rule.to);
    if (target) return send(res, 200, target);
  }
  if (existing) return send(res, 200, existing);
  return send(res, 404, join(dist, "404.html"));
}).listen(port, () => console.log(`Netlify-style preview on http://localhost:${port}`));
