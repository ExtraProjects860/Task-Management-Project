import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './sidebarNoted.css';
import { BsSearch, BsHouse, BsFillGearFill, BsPlusLg, BsCheck2 } from "react-icons/bs";

const Sidebar = ({ taskLists }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const name = localStorage.getItem('name');
  const firstLetter = name.charAt(0);

  return (
    <>
      <Button className='btnMenu' onClick={handleShow}>
        Menu
      </Button>

      <Offcanvas style= {{background: '#DEF9C4'}} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="sidebar">
        <div className="profile">
          <div className="avatar">{firstLetter}</div>
          <div className="username">{name}</div>
        </div>
        <nav className="menu">
          <ul>
            <li><a href="#"> <BsSearch className='icons' /> Filtrar</a></li>
            <li><a href="#"> <BsHouse className='icons' /> Página inicial</a></li>
            <li><a href="#"> <BsFillGearFill className='icons' /> Alterar Dados</a></li>
          </ul>
        </nav>
        <br/>
        <hr/>
        <br/>
        <div className="boards">
          <ul>
            <li><a href="#"> <BsPlusLg className='icons' /> Novo</a></li>
          </ul>
          <ul>{taskLists.length > 0 ? (
          taskLists.map((lista) => (
            <li  key={lista.idTaskList} className="sidebar-item"> <a href="#"> <BsCheck2 className='icons' />
              {lista.taskListName} </a>
            </li>
          ))
        ) : (
          <li className="sidebar-item">No lists available</li>
        )}
      </ul>
        </div>
        <button className="logout">Sair</button>
      </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;