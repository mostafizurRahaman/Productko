import { RouterProvider } from 'react-router-dom';
import Routes from './Route/Routes/Routes'; 
import './App.css';

function App() {
  return (
    <div>
        <RouterProvider router={ Routes }>

        </RouterProvider>
    </div>
  );
}

export default App;
