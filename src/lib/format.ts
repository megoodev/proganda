// Western digits in Arabic (ar-EG-u-nu-latn) and Cairo time zone for dates.
const tag = (locale: string) => (locale === "ar" ? "ar-EG-u-nu-latn" : "en");
const zone = "Africa/Cairo";

export const formatNumber = (value: number, locale: string) =>
  new Intl.NumberFormat(tag(locale)).format(value);

export const formatCompactNumber = (value: number, locale: string) =>
  new Intl.NumberFormat(tag(locale), { notation: "compact", maximumFractionDigits: 1 }).format(value);

export const formatDate = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(tag(locale), { dateStyle: "medium", timeZone: zone }).format(new Date(iso));

export const formatTime = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(tag(locale), { timeStyle: "short", timeZone: zone }).format(new Date(iso));

export const formatDateTime = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(tag(locale), { dateStyle: "medium", timeStyle: "short", timeZone: zone }).format(new Date(iso));
