import { useState } from "react";
import api from '../../services/api';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { validateUsername, validatePassword } from '../../Utils/validadores';

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Usuário"
                onChange={e =>  setUsername(e.target.value) }
            />

            <input
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
        <NavLink to="/signup">Cadastrar </NavLink >
        </div>
    );
}

export default Login;