export const formatDateShort = new Intl.DateTimeFormat('en-UK', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
}).format;

export const formatTimeDetailed = new Intl.DateTimeFormat('en-UK', {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
}).format;
