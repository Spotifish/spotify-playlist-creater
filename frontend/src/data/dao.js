const baseUrl = "http://localhost:8080";

const fetchExtended = (url, ...params) => {
  return fetch(baseUrl + url, params)
}

export default fetchExtended;
