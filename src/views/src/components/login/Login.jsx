import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Login.module.css';
import LoadingModal from '../loadingModal/LoadingModal';
import ErrorModal from '../errorModal/ErrorModal';
import { validateAndAuthenticate } from '../auth/AuthLogin';
import NavbarNoted from '../navbar/NavbarNoted';
import Footer from '../footer/Footer';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    validateAndAuthenticate(
      email,
      password,
      setEmailError,
      setPasswordError,
      setShowModal,
      setShowErrorModal,
      setErrorMessage,
      navigate
    );
  };

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
          <p>Bem-vindo de volta! Faça login na sua conta.</p>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className={styles.formGroup} controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(''); // Limpa o erro de email quando o usuário começa a digitar
              }}
              required
              className={emailError ? styles.errorInput : ''}
            />
            {emailError && <div className={styles.errorMessage}>{emailError}</div>}
          </Form.Group>
          <Form.Group className={`${styles.formGroup} ${passwordError ? styles.error : ''}`} controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(''); // Limpa o erro de senha quando o usuário começa a digitar
                }}
                required
                style={{ paddingRight: '2.5rem' }}
                className={passwordError ? styles.errorInput : ''}
              />
              <div
                className={`position-absolute top-50 end-0 translate-middle-y ${styles.eyeIcon}`}
                onClick={handleTogglePassword}
                style={{ cursor: 'pointer', paddingRight: '1rem' }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}
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
      <LoadingModal show={showModal} onHide={() => setShowModal(false)} />
      <ErrorModal show={showErrorModal} onHide={() => setShowErrorModal(false)} errorMessage={errorMessage} />
    </div>
    <Footer />
    </>
  );
}

export default Login;
