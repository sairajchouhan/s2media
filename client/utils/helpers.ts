export const formQueryString = (query: Record<string, any>) => {
  const qs = { value: '' }
  if (query) {
    const keyValStrinsPairs = Object.keys(query).map((key) => `${key}=${query[key]}`)
    qs.value = keyValStrinsPairs.length ? `?${keyValStrinsPairs.join('&')}` : ''
  }
  return qs.value
}
