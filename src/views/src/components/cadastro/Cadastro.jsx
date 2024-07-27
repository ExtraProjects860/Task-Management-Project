import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Cadastro.module.css';

function Cadastro() {
  const navigate = useNavigate();

  return (
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
            <Form.Control type="password" placeholder="Digite sua senha" />
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
  );
}

export default Cadastro;
