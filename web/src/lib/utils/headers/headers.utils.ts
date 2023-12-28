export function commonHeaders() {
  return new Headers(
    {
      "Authorization": "Bearer " + globalThis.localStorage.getItem("token") ?? ""
    }
  )
}