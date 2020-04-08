// helper to generate a URL with query parameters

export const getUrlWithParams = (url: string, params: any): string => {
  if (url.includes('?')) {
    url += '?'
  }
  url += Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&')

  return url
}

// deep copy a message
export const copy = (message: {}): {} => {
  return JSON.parse(JSON.stringify(message))
}
