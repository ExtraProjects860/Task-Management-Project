import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Cadastro from './components/cadastro/Cadastro';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarNoted from './components/navbar/NavbarNoted';
import Footer from './components/footer/Footer';

// Instalar o npm install react-router-dom mdb-react-ui-kit para roteamento e para o bootstrap !!

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarNoted />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-account" element={<Cadastro />} />
        </Routes>  
        <Footer />      
      </div>
    </Router>
  );
}

export default App;
