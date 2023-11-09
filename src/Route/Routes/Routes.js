import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout";
import Main from "../../Layout/Main";
import AddProducts from "../../Pages/Dashboard/Seller/AddProducts/AddProducts";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import BookedProduct from "../../Pages/BookedProduct/BookedProduct";
import MyOrders from "../../Pages/Dashboard/Buyer/MyOrders/MyOrders";
import MyProduct from "../../Pages/Dashboard/Seller/MyProduct/MyProduct";
import AllSellers from "../../Pages/Dashboard/Admin/AllSellers/AllSellers";
import AllBuyers from "../../Pages/Dashboard/Admin/AllBuyers/AllBuyers";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import ReportedProducts from "../../Pages/Dashboard/Admin/ReportedProducts/ReportedProducts";
import AdminRoute from "../AdminRoute/AdminRoute";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
import Blog from "../../Pages/Blog/Blog";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import CategoryProducts from "../../Pages/CategoryProducts/CategoryProducts";
import DisplayError from "../../Components/DisplayError/DisplayError";
import MyPayment from "../../Pages/Dashboard/Buyer/MyPayment/MyPayment";
const Routes = createBrowserRouter([
   {
      path: "/",
      element: <Main></Main>,
      children: [
         {
            path: "/",
            element: <Home></Home>,
         },
         {
            path: "/home",
            element: <Home></Home>,
         },
         {
            path: "/login",
            element: <Login></Login>,
         },
         {
            path: "/register",
            element: <Register></Register>,
         },
         {
            path: "/blog",
            element: <Blog></Blog>,
         },
         {
            path: "/category/:id",
            // loader: async ({ params }) => {
            //    const res = await axios.get(
            //       `https://productko-server.vercel.app/categories/${params.id}`,
            //       {
            //          headers: {
            //             authorization: `bearer ${localStorage.getItem(
            //                "productKoToken"
            //             )}`,
            //          },
            //       }
            //    );
            //    return res.data;
            // },
            element: <CategoryProducts></CategoryProducts>,
            // errorElement: <DisplayError></DisplayError>
         },

         {
            path: "/product/:id",
            // loader: async ({ params }) => {
            //    const res = await axios.get(
            //       `https://productko-server.vercel.app/products/${params.id}`,
            //       {
            //          headers: {
            //             authorization: `bearer ${localStorage.getItem(
            //                "productKoToken"
            //             )}`,
            //          },
            //       }
            //    );
            //    return res.data;
            // },
            element: (
               <PrivateRoute>
                  <BuyerRoute>
                     <BookedProduct></BookedProduct>
                  </BuyerRoute>
               </PrivateRoute>
            ),
            // errorElement: <DisplayError></DisplayError>
         },
      ],
   },
   {
      path: "/dashboard",
      element: (
         <PrivateRoute>
            <DashboardLayout></DashboardLayout>
         </PrivateRoute>
      ),
      children: [
         {
            path: "/dashboard/",
            element: (
               <PrivateRoute>
                  <Dashboard></Dashboard>
               </PrivateRoute>
            ),
         },
         {
            path: "/dashboard/addProducts",
            element: (
               <SellerRoute>
                  <AddProducts></AddProducts>
               </SellerRoute>
            ),
         },
         {
            path: "/dashboard/myProducts",
            element: (
               <SellerRoute>
                  <MyProduct></MyProduct>
               </SellerRoute>
            ),
         },
         {
            path: "/dashboard/my-orders",
            element: (
               <BuyerRoute>
                  <MyOrders></MyOrders>
               </BuyerRoute>
            ),
         },
         {
            path: "/dashboard/sellers",
            element: (
               <AdminRoute>
                  <AllSellers></AllSellers>
               </AdminRoute>
            ),
         },
         {
            path: "/dashboard/buyers",
            element: (
               <AdminRoute>
                  {" "}
                  <AllBuyers></AllBuyers>
               </AdminRoute>
            ),
         },
         // {
         //    path: "/dashboard/payment/:id",
         //    element: (
         //       <BuyerRoute>
         //          <Payment></Payment>
         //       </BuyerRoute>
         //    ),
         //    loader: async ({ params }) => {
         //       const res = await fetch(
         //          `https://productko-server.vercel.app/bookings/${params.id}`,
         //          {
         //             headers: {
         //                authorization: `bearer ${localStorage.getItem(
         //                   "productKoToken"
         //                )}`,
         //             },
         //          }
         //       );

         //       const data = await res.json();
         //       return data;
         //    },
         //    errorElement: <DisplayError></DisplayError>,
         // },
         {
            path: "/dashboard/payment/:id",
            element: (
               <BuyerRoute>
                  <MyPayment></MyPayment>
               </BuyerRoute>
            ),
         },
         {
            path: "/dashboard/reported",
            element: (
               <AdminRoute>
                  {" "}
                  <ReportedProducts></ReportedProducts>
               </AdminRoute>
            ),
         },
      ],
   },
   {
      path: "*",
      element: <ErrorPage></ErrorPage>,
   },
]);

export default Routes;
