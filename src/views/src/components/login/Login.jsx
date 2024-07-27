import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importando ícones de olho
import styles from './Login.module.css';
import { login } from './LoginApi';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      console.log("Login bem-sucedido, te redirecionando para página principal!", response);
      navigate('/');
    } catch (error) {
      console.error("Erro durante Login:", error.message);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`d-flex justify-content-center align-items-center ${styles.formContainer}`}>
      <div className={`col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5 ${styles.formBox}`}>
        <div className={styles.logo}>
          <img src="./notedFlowLogo-removebg-preview.png" alt="LogoNotedFlow" />
          <p>Bem-vindo de volta! Faça login na sua conta.</p>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className={styles.formGroup} controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className={styles.formGroup} controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
