import { useState } from "react";
import api from '../../services/api';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { validateUsername, validatePassword } from '../../Utils/validadores';
import img from '../../assets/gift.png';

function Login(){

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await api.post('/login', {username, password});
            const token = response.data;
            localStorage.setItem('token', token);
            navigate('/');
        }
        catch(error){
            if (error.response) {
                alert(`Erro ${error.response.status}: ${error.response.data.error}`);
              } else {
                alert('Erro desconhecido: '+ error);
            }
          }
    }

    const validateLogin = (username, password) => {
        return validateUsername(username) && validatePassword(password);
    }

    return(
        <div className="container-login">
            <div className="form-box">
                <h1>Login</h1>
                <form className="form-login" onSubmit={handleSubmit}>
                    <input
                        className={validateUsername(username) ? 'correct' : 'wrong'}
                        type="text"
                        name="username"
                        placeholder="Usuário"
                        onChange={e =>  setUsername(e.target.value) }
                    />
                    <input
                        className={validatePassword(password) ? 'correct' : 'wrong'}
                        type="password"
                        name="password"
                        placeholder="Senha"
                        onChange={e =>  setPassword(e.target.value) }
                    />
                    <button 
                    type="submit"
                    disabled={!validateLogin(username, password)}
                    >Confirmar</button>
                </form>
                <div>
                    <p>Não é registrado?
                    <NavLink to="/signup"> Cadastrar</NavLink >
                    </p>
                </div>
            </div>
            <img src={img} alt="person gifted"/>
        </div>
    );
}

export default Login;