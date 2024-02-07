 
import './App.css';
import Home from './komponente/pocetna/Home';
import Login from './komponente/auth/Login';
import Register from './komponente/auth/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './komponente/navbar/Navbar';
import { useState } from 'react';
import DocumentsTable from './komponente/documents/DocumentsTable';
import DocumentUpload from './komponente/documents/DocumentUpload';
import ITDocumentsComponent from './komponente/documents/spoljniApi/ITDocumentsComponent';
import Statistike from './komponente/admin/Statistike';
function App() {
  const [token,setToken]=useState(null);
  return (

    <div className='App'>
      <Router>
      <Navbar  token={token} setToken={setToken}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs/it" element={<ITDocumentsComponent />} />
          <Route path="/docs/upload" element={<DocumentUpload />} />
          <Route path="/docs" element={<DocumentsTable />} />
          <Route path="/login" element={<Login  setToken={setToken}/>} />
          <Route path="/register" element={<Register />} />


          <Route path="/statistike" element={<Statistike />} />
 
        </Routes>
    </Router>
    
    </div>
  );
}

export default App;
