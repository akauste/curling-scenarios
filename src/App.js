import { NavLink, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import MainHeader from './components/layout/MainHeader';
import Home from './pages/Home';
import Board from './pages/Board';
import Login from './pages/Login';

function App() {
  return (
    <>
      <MainHeader />
      <main className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<p>404 Page not found</p>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
