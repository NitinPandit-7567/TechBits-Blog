import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/login";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import EditPost from "./Pages/EditPost";
import ViewPost from "./Pages/ViewPost";
import MyPosts from "./Pages/MyPosts";

export default function App() {
  const [mode, setMode] = useState(
    localStorage.getItem("theme") !== null
      ? localStorage.getItem("theme")
      : "light"
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true" ? true : false
  );
  const [error, setError] = useState(false);
  const [banner, setBanner] = useState(false);
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home setError={setError} isLoggedIn={isLoggedIn} />,
    },
    {
      path: "/login",
      element: (
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setBanner={setBanner}
          setError={setError}
          error={error}
        />
      ),
    },

    {
      path: "/signUp",
      element: (
        <SignUp
          setIsLoggedIn={setIsLoggedIn}
          setError={setError}
          setBanner={setBanner}
        />
      ),
    },
    {
      path: "/create",
      element: (
        <CreatePost
          isLoggedIn={isLoggedIn}
          setError={setError}
          setBanner={setBanner}
        />
      ),
    },
    {
      path: "/edit/:id",
      element: (
        <EditPost
          isLoggedIn={isLoggedIn}
          setError={setError}
          setBanner={setBanner}
        />
      ),
    },
    {
      path: "/view/:id",
      element: (
        <ViewPost
          isLoggedIn={isLoggedIn}
          setError={setError}
          setBanner={setBanner}
        />
      ),
    },
    {
      path: "/myposts",
      element: <MyPosts isLoggedIn={isLoggedIn} setError={setError} />,
    },
  ]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar
          setMode={setMode}
          mode={mode}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          error={error}
          setError={setError}
          banner={banner}
          setBanner={setBanner}
        />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}
