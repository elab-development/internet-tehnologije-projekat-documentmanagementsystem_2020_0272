 
import './App.css';
import Home from './komponente/pocetna/Home';
import Login from './komponente/auth/Login';
import Register from './komponente/auth/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './komponente/navbar/Navbar';
function App() {
  return (

    <div className='App'>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </Router>
    
    </div>
  );
}

export default App;
