import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './sidebarNoted.css'

function Sidebar() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sidedbar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <aside className="sidebar">
        <div className="profile">
          <div className="avatar">F</div>
          <div className="username">Fulano</div>
        </div>
        <nav className="menu">
          <ul>
            <li><a href="#">Pesquisar</a></li>
            <li><a href="#">Página inicial</a></li>
            <li><a href="#">Alterar Dados</a></li>
          </ul>
        </nav>
        <div className="boards">
          <ul>
            <li><a href="#">Novo</a></li>
            <li><a href="#">Quadro 2</a></li>
            <li><a href="#">Quadro 3</a></li>
            <li><a href="#">Quadro 4</a></li>
            <li><a href="#">Lista de Tarefas</a></li>
            <li><a href="#">Projeto x</a></li>
          </ul>
        </div>
        <button className="logout">Sair</button>
      </aside>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;