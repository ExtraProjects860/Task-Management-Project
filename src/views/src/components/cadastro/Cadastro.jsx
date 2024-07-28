import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importando ícones de olho
import styles from './Cadastro.module.css';
import NavbarNoted from '../navbar/NavbarNoted';
import Footer from '../footer/Footer';

function Cadastro() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <NavbarNoted />
      <div className={`d-flex justify-content-center align-items-center ${styles.formContainer}`}>
      <div className={`col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5 ${styles.formBox}`}>
        <div className={styles.logo}>
          <img src="./notedFlowLogo-removebg-preview.png" alt="LogoNotedFlow" />
          <h2>Cadastre-se</h2>
        </div>
        <Form>
          <Form.Group className={styles.formGroup} controlId='formBasicName'>
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Digite seu nome" />
          </Form.Group>
          <Form.Group className={styles.formGroup} controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Digite seu email" />
          </Form.Group>
          <Form.Group className={styles.formGroup} controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '2.5rem' }} // Adiciona espaço para o ícone
              />
              <div
                className={`position-absolute top-50 end-0 translate-middle-y ${styles.eyeIcon}`}
                onClick={handleTogglePassword}
                style={{ cursor: 'pointer', paddingRight: '1rem' }} // Ajuste o padding conforme necessário
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </Form.Group>
          <Button className={styles.button} type="submit">
            Continue
          </Button>
          <Button className={styles.buttonBack} onClick={() => navigate('/')}>
            Voltar
          </Button>
        </Form>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Cadastro;
