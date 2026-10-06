/** True for absolute http(s) URLs that leave this website. */
export const isExternalUrl = (href: string) => /^https?:\/\//i.test(href);
