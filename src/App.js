import { RouterProvider } from 'react-router-dom';
import Routes from './Route/Routes/Routes'; 
import './App.css';

function App() {
  return (
    <div className="App">
        <RouterProvider router={ Routes }>

        </RouterProvider>
    </div>
  );
}

export default App;
