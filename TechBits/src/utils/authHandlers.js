import { clearUserData, setUserData } from "../utils/UserData";
import errorHandler from "./errorHandler";
export async function handleSignUp(evt, formData, setIsLoading, setError, setIsLoggedIn) {
  evt.preventDefault();
  const finalFormData = {
    //setting formData
    username: formData.username,
    name: { first: formData.firstName, last: formData.lastName },
    email: formData.email,
    password: formData.password,
  };
  const signUpResponse = await fetch("http://localhost:3000/user/sign-up", {
    //making a POST request to create new user
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalFormData),
  });
  const res = await signUpResponse.json();
  if (!res.error) {
    //if no error, set userData and isLoggedin to true
    setUserData(res);
    localStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
    setIsLoading(false);
    setError(false);
    return "/";
  } else {
    setIsLoading(false);
    return errorHandler(res, setError); //if error setError banner
  }
}

export async function handleLogIn(evt, formData) {
  //making a POST request for signin
  evt.preventDefault();
  const response = await fetch("http://localhost:3000/user/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return await response.json();
}

export async function handleLogout(isLoggedIn, setIsLoggedIn) {
  if (isLoggedIn) {
    const response = await fetch("http://localhost:3000/user/logout", {
      //POST request for logout
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    clearUserData();
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    return "/";
  }
}
