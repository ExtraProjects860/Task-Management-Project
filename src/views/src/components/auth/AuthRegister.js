import { register } from '../register/RegisterApi';

export const validateAndRegister = async (
  name,
  email,
  password,
  setShowModal,
  setShowErrorModal,
  setErrorMessage,
  setSuccessMessage,
  navigate
) => {
  setShowModal(true); // Mostra o modal de carregamento

  try {
    // Tentativa de registro
    const response = await register(name, email, password);
    console.log("Cadastro bem-sucedido, te redirecionando para página de Login!", response);
    
    // Registro bem-sucedido
    setSuccessMessage('Cadastro realizado com sucesso! Redirecionando para a tela de login...');
    setShowModal(false); // Oculta o modal de carregamento

    // Redireciona após 3 segundos
    setTimeout(() => {
      navigate('/login');
    }, 3000);
    
  } catch (error) {
    // Registro falhou
    console.error("Erro durante cadastro:", error.message);

    // Verifica a mensagem de erro e define a mensagem apropriada para o modal
    if (error.message.includes('Email já existe!')) {
      setErrorMessage('Email já cadastrado. Tente outro.');
    } else {
      setErrorMessage('Erro ao tentar registrar. Tente novamente.');
    }

    setShowErrorModal(true); // Mostra o modal de erro
    setShowModal(false); // Oculta o modal de carregamento
  }
};
