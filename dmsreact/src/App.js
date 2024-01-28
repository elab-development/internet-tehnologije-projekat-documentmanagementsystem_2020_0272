import logo from './logo.svg';
import './App.css';
import Home from './komponente/pocetna/Home';
import Login from './komponente/auth/Login';

function App() {
  return (
    <div className="App">
      <Home></Home>
      <Login></Login>
    </div>
  );
}

export default App;
