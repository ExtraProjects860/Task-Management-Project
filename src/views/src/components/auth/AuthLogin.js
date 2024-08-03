import { login } from '../login/LoginApi';

export const validateAndAuthenticate = async (
  email, 
  password, 
  setEmailError, 
  setPasswordError, 
  setShowModal, 
  setShowErrorModal, 
  setErrorMessage, 
  navigate
) => {
  setShowModal(true); // Mostra o modal de carregamento

  // Resetar erros antes da tentativa de login
  setEmailError('');
  setPasswordError('');

  try {
    // Tentativa de login
    const response = await login(email, password);
    console.log("Login bem-sucedido, te redirecionando para página principal!", response);
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000); // Aguarda 3 segundos antes de redirecionar
  } catch (error) {
    console.error("Erro durante Login:", error.message);

    // Verifica se o erro é relacionado ao email ou senha
    const emailInvalid = error.message.toLowerCase().includes('email');
    const passwordInvalid = error.message.toLowerCase().includes('senha');

    // Se o email for inválido
    if (emailInvalid) {
      setEmailError('Email inválido');
      setErrorMessage('Email inválido');
    }

    // Se a senha for inválida
    if (passwordInvalid) {
      setPasswordError('Senha incorreta');
      setErrorMessage('Senha incorreta');
    }

    // Se ambos forem inválidos
    if (!emailInvalid && !passwordInvalid) {
      setPasswordError('Senha incorreta');
      setErrorMessage('Senha incorreta');
    }

    setShowModal(false); // Oculta o modal de carregamento
    setShowErrorModal(true); // Mostra o modal de erro
  }
};
