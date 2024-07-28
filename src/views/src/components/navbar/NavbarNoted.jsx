import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Style from './NavbarNoted.module.css';

function NavbarNoted() {
  return (
    <Navbar collapseOnSelect expand="lg" className={Style.customNavbar} fixed="top">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src="/notedFlowLogo-removebg-preview.png"
            className={`${Style.logo} d-inline-block align-top`}
            alt="NotedFlow logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className={Style.navbarToggle} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features" style={{ color: '#fff' }}>Home</Nav.Link>
            <Nav.Link href="#pricing" style={{ color: '#fff' }}>Soluções</Nav.Link>
            <Nav.Link href="#pricing" style={{ color: '#fff' }}>Recursos</Nav.Link>
            <Nav.Link href="#pricing" style={{ color: '#fff' }}>Sobre</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets" style={{ color: '#fff' }}>Solicite uma demonstração</Nav.Link>
            <Nav.Link eventKey={2} href="#memes" style={{ color: '#fff' }}>
              Conecte-se
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes" style={{ backgroundColor: '#DEF9C4', borderRadius: '5px', color: '#50B498', boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.100)', textAlign: 'center' }}>
              Obtenha o NotedFlow gratuitamente
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarNoted;
