import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Login from './component/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './component/Register';
import RequireAuth from './component/RequireAuth';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Home></Home>
          </RequireAuth>
        }></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
