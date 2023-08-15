import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HttpConfig from '../../api/HttpConfig';
import { AuthProvider } from '../../context/AuthProvider';
import logo from '../../images/logo-coco-bambu.png';
import './styles.css';

interface State {
  userName: string;
  password: string;
}

function Login() {
  const [state, setState] = useState<State>({
    userName: "",
    password: "",
  });

  const { userInfo, setUserInfo } = useContext(AuthProvider);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.token) {
        navigate('/dishes')
    }
  }, [navigate, userInfo]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: React.FormEvent) {
    try {
      event.preventDefault();
      const response = await HttpConfig.post('/api/authentication/login', { ...state });

      setUserInfo({ ...response.data });
      localStorage.setItem("accessToken", JSON.stringify({ ...response.data }));
      setIsAuthorized(true)
      navigate('/dishes');
    } catch (err) {
      console.error(err);
      setIsAuthorized(false)
    }
  }

  const [isAuthorized, setIsAuthorized] = useState(true);

  return (
    <div>
      { isAuthorized ? (    <div className='login-background'>
      <div className='container d-flex-block col-sm-4 col-md-4 col-lg-3'>
        <img className="logo-login" src={logo} alt='logo' />
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control user-bg"
              placeholder="Nome do usuário"
              style={{ fontStyle: "italic", fontSize: "12px", paddingLeft: "30px" }}
              id="loginFormUserName"
              name="userName"
              value={state.userName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Senha"
              style={{ fontStyle: "italic", fontSize: "12px", paddingLeft: "30px" }}
              className="form-control password-bg"
              id="loginFormPassword"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn mt-3 container-fluid" style={{ backgroundColor: "#FF9300", color: "white" }}>
            Acessar
          </button>
        </form>
      </div>
    </div>
    ) : (  <div>
      <div style={{ border: '1px solid red', padding: '16px', borderRadius: '4px', backgroundColor: '#ffebee' }}>
        <h2>Acesso não autorizado</h2>
        <p>As credenciais fornecidas são inválidas. Verifique seu usuário e senha.</p>
      </div>
    
    </div>)}
    </div>
  );
}

export default Login;