import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Login from './component/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
    </>
  );
}

export default App;
