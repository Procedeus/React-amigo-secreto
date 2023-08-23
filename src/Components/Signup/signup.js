import { useState } from "react";
import api from '../../services/api';
import './signup.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { validateUsername, validatePassword } from '../../Utils/validadores';
import img from '../../assets/gift.png';

function Signup(){

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await api.post('/signup', {username, password});
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

    const validateSignup = (username, password) => {
        return validateUsername(username) && validatePassword(password);
    }

    return(
        <div className="container-signup">
            <img src={img} alt="person gifted"/>
            <div className="form-box-signup">
                <h1>Cadastro</h1>
                <form className="form-signup" onSubmit={handleSubmit}>
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
                    disabled={!validateSignup(username, password)}
                    >Confirmar</button>
                </form>
                <div>
                    <p>Já é registrado?
                    <NavLink to="/login"> Clique aqui</NavLink >
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;