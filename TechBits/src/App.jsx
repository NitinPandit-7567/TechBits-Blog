import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/login";
const router = createBrowserRouter([
    {
        path: '/Login',
        element: <Login />
    },

    {
        path: '/SignUp',
        element: <SignUp />
    }

])

export default function App() {
    return (<>
        <div className="page">
            <RouterProvider router={router} />
        </div>
    </>)
}