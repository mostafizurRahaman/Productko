import { async } from "@firebase/util"
import { createBrowserRouter } from "react-router-dom"
import DashboardLayout from "../../Layout/DashboardLayout/DashboardLayout"
import Main from "../../Layout/Main"
import AddProducts from "../../Pages/Dashboard/Seller/AddProducts/AddProducts"
import CategoryProducts from "../../Pages/Home/CategoryProducts/CategoryProducts"
import Home from "../../Pages/Home/Home/Home"
import Login from "../../Pages/Login/Login"
import Register from "../../Pages/Register/Register"
import axios from 'axios'; 
import PrivateRoute from "../PrivateRoute/PrivateRoute"
import BookedProduct from "../../Pages/BookedProduct/BookedProduct"


const Routes = createBrowserRouter([
   {
      path: '/', 
      element: <Main></Main>, 
      children: [
         {
            path: '/', 
            element: <Home></Home>
         }, 
         {
            path: '/home',
            element: <Home></Home>
         }, 
         {
            path:'/login', 
            element:<Login></Login>
         }, 
         {
            path: '/register', 
            element: <Register></Register>
         }, 
         {
            path: '/category/:id', 
            element: <CategoryProducts></CategoryProducts>, 
            loader: async({params}) =>{
               const res = await  axios.get(`http://localhost:5000/categories/${params.id}`); 
               return res.data;
            }
         }, 
         {
            path: '/product/:id', 
            element:  <BookedProduct></BookedProduct>, 
            loader: async({params}) => {
               const res = await axios.get(`http://localhost:5000/products/${params.id}`);
               console.log(res); 
               return res.data; 
            }
         }
        
      ]
   }, 
   {
      path: '/dashboard', 
      element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>, 
      children: [
         {
            path: '/dashboard/addProducts', 
            element: <AddProducts></AddProducts>,
         }
      ]
   }
])



export default Routes; 