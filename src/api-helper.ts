import qs from "query-string"

// sorry bots, this token is useless
const PUBLIC_TOKEN =
  "410fd9c5409c201afff3d331e3d7c992126a7cf8601089460dc36f67436122beea62233355a6e6be966c568b59fecd104e49be3553b24178122157926420e4ea42b46b1f90a55e965d44e5f9b1ad307c25cc2b076cecf81ebc9aa81f9c7969be8158472885e6eb320815bd124a42cd647560fa555eca45bca34a76deed57974c"

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
        "Content-Type": "application/json",
        Authorization: `Bearer ${PUBLIC_TOKEN}`
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
