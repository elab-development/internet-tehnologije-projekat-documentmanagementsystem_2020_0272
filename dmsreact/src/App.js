 
import './App.css';
import Home from './komponente/pocetna/Home';
import Login from './komponente/auth/Login';
import Register from './komponente/auth/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './komponente/navbar/Navbar';
import { useState } from 'react';
import DocumentsTable from './komponente/documents/DocumentsTable';
function App() {
  const [token,setToken]=useState(null);
  return (

    <div className='App'>
      <Router>
      <Navbar  token={token} setToken={setToken}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<DocumentsTable />} />
          <Route path="/login" element={<Login  setToken={setToken}/>} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </Router>
    
    </div>
  );
}

export default App;
