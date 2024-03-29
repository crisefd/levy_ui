// return authorization header with jwt token
export function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.token ? { Authorization: "Bearer " + user.token } : {};
}
