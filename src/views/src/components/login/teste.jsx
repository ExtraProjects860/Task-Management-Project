import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Login.module.css';

function Login() {
  const navigate = useNavigate();

  return (
    <div className={`d-flex justify-content-center align-items-center ${styles.formContainer}`}>
      <div className={`col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5 ${styles.formBox}`}>
        <div className={styles.logo}>
          <img src="./notedFlowLogo-removebg-preview.png" alt="LogoNotedFlow" />
          <p>Bem-vindo de volta! Faça login na sua conta.</p>
        </div>
        <Form>
          <Form.Group className={styles.formGroup} controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Digite seu email" />
          </Form.Group>
          <Form.Group className={styles.formGroup} controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Digite sua senha" />
          </Form.Group>
          <div className={styles.forgotPassword}>
            <a href="#forgot-password">Esqueceu sua senha?</a>
          </div>
          <Button className={styles.button} type="submit">
            Continue
          </Button>
          <div className={styles.createAccount}>
            <a href="#create-account" onClick={() => navigate('/create-account')}>
              Não possui acesso? Crie aqui a sua conta!
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;