import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/login";
import Navbar from "./Components/Navbar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react'
import './App.css'

export default function App() {
    const [mode, setMode] = useState(localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : 'light')
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true' ? true : false)
    const theme = createTheme({
        palette: {
            mode: mode,
        },
    });
    const router = createBrowserRouter([
        {
            path: '/Login',
            element: <Login setIsLoggedIn={setIsLoggedIn} />
        },

        {
            path: '/SignUp',
            element: <SignUp setIsLoggedIn={setIsLoggedIn} />
        }

    ])
    return (<>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar setMode={setMode} mode={mode} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div className="page">
                <RouterProvider router={router} />
            </div>
        </ThemeProvider>
    </>)
}