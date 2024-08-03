import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/dashboard/dashboard';


// Instalar o npm install react-router-dom mdb-react-ui-kit para roteamento e para o bootstrap !!

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>  
      </div>   
    </Router>
  );
}

export default App;
