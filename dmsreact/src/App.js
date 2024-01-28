import logo from './logo.svg';
import './App.css';
import Home from './komponente/pocetna/Home';
import Login from './komponente/auth/Login';
import Register from './komponente/auth/Register';

function App() {
  return (
    <div className="App">
      <Home></Home>
      <Login></Login>
      <Register></Register>
    </div>
  );
}

export default App;
