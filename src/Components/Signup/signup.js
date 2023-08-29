import { useState } from "react";
import api from '../../services/api';
import './signup.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { validateUsername, validatePassword } from '../../Utils/validadores';
import img from '../../assets/gift.png';
import toast from 'react-hot-toast';

function Signup(){

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        try{
            const response = await api.post('/signup', {username, password});
            const token = response.data;
            localStorage.setItem('token', token);
            navigate('/');
            toast.success(<p className='toast-fonts'>Cadastro Realizado com Sucesso!!</p>);
            setLoading(false);
        }
        catch(error){
            if (error.response) {
              toast.error(<p className='toast-fonts'>Erro {error.response.status}: {error.response.data.error}</p>);
            } else {
              toast.error(<p className='toast-fonts'>Erro desconhecido: {error}</p>);
            }
            setLoading(false);
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
                    disabled={(!validateSignup(username, password) || loading)}
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