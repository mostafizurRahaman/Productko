import { RouterProvider } from 'react-router-dom';
import Routes from './Route/Routes/Routes'; 
import './App.css';
import {  Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className='relative'>
       
        <RouterProvider router={ Routes }>

        </RouterProvider>
        <Toaster></Toaster>
       
    </div>
  );
}

export default App;
