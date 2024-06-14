import { createBrowserRouter, redirect } from "react-router-dom";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CartPage from "../pages/CartPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage/>,
        loader: () => {
            return !localStorage.getItem("token") ? redirect("/login") : null;
        }

    },
    {
        path: "/login",
        element: <LoginPage/>,
        loader: () => {
            return localStorage.getItem("token") ? redirect("/") : null;
        }

    },
    {
        path: "/register",
        element: <RegisterPage/>
    },
    {
        path: "/cart",
        element: <CartPage/>
    }
])

export default router;