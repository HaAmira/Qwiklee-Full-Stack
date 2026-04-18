import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import MyOrder from "../pages/MyOrder";
import SaveAddress from "../pages/SaveAddress";
import EditUserProfile from "../pages/EditUserProfile";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermision from "../layout/AdminPermision";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import DisplayCartItem from "../component/DisplayCartItem";
import DisplayCartItemMobile from "../component/DisplayCartItemMobile";
import CheckoutPage from "../pages/CheckoutPage";
import Address from "../pages/Address";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element: <Home/>
            },
            {
                path : "search",
                element: <SearchPage/>
            },
            {
                path : "login",
                element: <Login/>
            },
            {
                path : "register",
                element: <Register/>
            },
            {
                path : "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path : "verification-otp",
                element: <OtpVerification/>
            },
            {
                path : "reset-password",
                element: <ResetPassword/>
            },
            {
                path : "user",
                element: <UserMenuMobile/>
            },
            {
                path : "dashboard",
                element: <Dashboard/>,
                children : [
                    {
                        path : "profile",
                        element : <Profile/>
                    },
                    {
                        path : "myorder",
                        element : <MyOrder/>
                    },
                    {
                        path : "save-address",
                        element : <Address/>
                    },
                    {
                        path : "edit-profile",
                        element : <EditUserProfile/>
                    },
                    {
                        path : "category",
                        element : <AdminPermision><Category/></AdminPermision>
                    },
                    {
                        path : "subcategory",
                        element : <AdminPermision><SubCategory/></AdminPermision>
                    },
                    {
                        path : "upload-product",
                        element : <AdminPermision><UploadProduct/></AdminPermision>
                    },
                    {
                        path : "product",
                        element : <AdminPermision><ProductAdmin/></AdminPermision>
                    },
                ]
            },
            {
                path: ":category",
                children : [
                    {
                        path : ":subCategory",
                        element : <ProductListPage/>
                    }
                ]
            },
            {
                path : "product/:product",
                element : <ProductDisplayPage/>
            },
            {
                path : "cart",
                element : <DisplayCartItemMobile/>
            },
            {
                path : "checkout",
                element : <CheckoutPage/>
            },
            {
                path : "success",
                element : <Success/>
            },
            {
                path : "cancel",
                element : <Cancel/>
            },
        ]
    }
])

export default router
