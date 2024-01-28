import logo from './logo.svg';
import './App.css';
import Home from './komponente/pocetna/Home';
import Login from './komponente/auth/Login';
import Register from './komponente/auth/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (


      <Router>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </Router>
    
      
  );
}

export default App;
