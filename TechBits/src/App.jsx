import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react'
import SignUp from "./Pages/SignUp";
import Login from "./Pages/login";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import EditPost from "./Pages/EditPost";
import ViewPost from "./Pages/ViewPost";



export default function App() {
    const [mode, setMode] = useState(localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : 'light')
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true' ? true : false)
    const theme = createTheme({
        palette: {
            mode: mode,
        },
    });
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/login',
            element: <Login setIsLoggedIn={setIsLoggedIn} />
        },

        {
            path: '/signUp',
            element: <SignUp setIsLoggedIn={setIsLoggedIn} />
        },
        {
            path: '/create',
            element: <CreatePost isLoggedIn={isLoggedIn} />
        },
        {
            path: '/edit/:id',
            element: <EditPost isLoggedIn={isLoggedIn} />
        },
        {
            path: '/view/:id',
            element: <ViewPost isLoggedIn={isLoggedIn} />
        }

    ])
    return (<>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar setMode={setMode} mode={mode} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <RouterProvider router={router} />
        </ThemeProvider>
    </>)
}