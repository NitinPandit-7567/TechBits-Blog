//setting userData in the local storage
export function setUserData(data) {
  return localStorage.setItem(
    "user",
    JSON.stringify({
      username: data.username,
      name: data.name,
      email: data.email,
    })
  );
}
//getting userData from the local storage
export function getUserData() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return false;
  }
}
//clearing userData in the local storage
export function clearUserData() {
  return localStorage.removeItem("user");
}
