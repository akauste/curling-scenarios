import { Routes, Route } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';

import MainHeader from './components/layout/MainHeader';
import Home from './pages/Home';
import Board from './pages/Board';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useSelector } from 'react-redux';
import Guide from './pages/Guide';

function App() {
  const user = useSelector(state => state.auth.user);

  return (
    <>
      <MainHeader />
      <main className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/login" element={<Login />} />
          { user && <Route path="/profile" element={<Profile />} /> }
          <Route path="*" element={<p>404 Page not found</p>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
