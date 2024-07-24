import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Login.module.css';

function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <img src="path_to_your_logo_image" alt="Logo" />
          <h2>Your Company</h2>
          <p>Welcome back! Please login to your account.</p>
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
            <a href="#forgot-password">Forgot Password?</a>
          </div>
          <div className={styles.createAccount}>
            <a href="#create-account">Não possui acesso? Crie aqui a sua conta!</a>
          </div>
          <Button type="submit" className={styles.loginButton}>Continue</Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
