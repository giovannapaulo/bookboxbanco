import React, { useRef, useState } from 'react';
import './LoginRegistro.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginRegistro = () => {
  const containerRef = useRef(null);
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  const [nomeUsuarioCadastro, setNomeUsuarioCadastro] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [popup, setPopup] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();

  const showPopup = (message, type = 'success') => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ ...popup, show: false }), 3000); 
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/usuario', { email: emailLogin, senha: senhaLogin });
      if (response.status === 200) {
        showPopup('Login realizado com sucesso!');
        setEmailLogin('');
        setSenhaLogin('');
        navigate('/dashboard');
      } else if (response.status === 401) {
        showPopup('Credenciais inválidas. Tente novamente.', 'error');
      } else {
        showPopup('Falha na realização do Login. Tente Novamente.', 'error');
      }
    } catch (error) {
      showPopup('Falha na realização do Login. Tente Novamente.', 'error');
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleCadastroSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/usuario', { nomeUsuario: nomeUsuarioCadastro, email: emailCadastro, senha: senhaCadastro });
      if (response.status === 201) {
        showPopup('Conta criada com sucesso!');
        setNomeUsuarioCadastro('');
        setEmailCadastro('');
        setSenhaCadastro('');

      } else if (response.status === 409) {
        showPopup('Este email já está cadastrado.', 'warning');
      } else {
        showPopup('Falha ao criar conta. Tente novamente.', 'error');
      }
      console.log(response);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      showPopup('Falha ao criar conta. Tente novamente.', 'error');
    }
  };

  const handleSignUp = () => {
    containerRef.current.classList.add('right-panel-active');
  };

  const handleSignIn = () => {
    containerRef.current.classList.remove('right-panel-active');
  };

  return (
    <>
      {popup.show && (
        <div className={`custom-popup ${popup.type}`}>
          <p>{popup.message}</p>
        </div>
      )}
      <div className="container" id="container" ref={containerRef}>
        <div className="form-container sign-up-container">
          <form onSubmit={handleCadastroSubmit}>
            <h1>Crie uma conta</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>Ou use seu email</span>
            <input type="text" placeholder="Nome de Usúario" value={nomeUsuarioCadastro} onChange={e => setNomeUsuarioCadastro(e.target.value)} />
            <input type="email" placeholder="Email" value={emailCadastro} onChange={e => setEmailCadastro(e.target.value)} />
            <input type="password" placeholder="Senha" value={senhaCadastro} onChange={e => setSenhaCadastro(e.target.value)} />
            <button>Criar conta</button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>Ou use uma conta existente</span>
            <input type="email" placeholder="Email" value={emailLogin} onChange={e => setEmailLogin(e.target.value)} />
            <input type="password" placeholder="Senha" value={senhaLogin} onChange={e => setSenhaLogin(e.target.value)} />
            <a href="#">Esqueceu sua senha?</a>
            <button>Fazer Login</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bem-vindo(a) de volta ao BookBox!</h1>
              <p>Para continuar conectado, faça login com suas informações pessoais.</p>
              <button className="ghost" id="signIn" onClick={handleSignIn}>Login</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Olá, leitoras!</h1>
              <p>Crie uma conta e inicie sua jornada conosco.</p>
              <button className="ghost" id="signUp" onClick={handleSignUp}>Criar conta</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRegistro;