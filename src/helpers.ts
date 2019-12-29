// helper to generate a URL with query parameters

export const getUrlWithParams = (url: string, params: any) => {
  if (url.indexOf('?') < 0) url += '?';
  url += Object.keys(params)
    .map(key => key + '=' + params[key])
    .join('&');
  return url;
};

// deep copy a messag
export const copy = (message: any) => {
  return JSON.parse(JSON.stringify(message));
};
