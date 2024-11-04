import qs from "query-string"

export function getStrapiURL(path = "") {
  return `${"http://localhost:1337"}${path}`
}

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json"
      },
      ...options
    }

    // Build request URL
    const queryString = qs.stringify(urlParamsObject)
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export function retrieveMedia(url: string) {
  return getStrapiURL(`/${url}`)
}
