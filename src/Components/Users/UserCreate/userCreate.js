import { useState} from 'react';
import Modal from 'react-modal';
import api from '../../../services/api';
import { HiPlus } from "react-icons/hi";
import { validateEmail, validateName } from '../../../Utils/validadores';
import toast from 'react-hot-toast';


Modal.setAppElement('#root');

function UserCreate({table, tables,setTables}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  

  function openModal(){
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    try{
      const token = localStorage.getItem('token');
      const response = await api.post('/users/', {
        id: table?._id,
        name,
        email
      },
      {
        headers: {
        'Authorization': `Bearer ${token}`
        }
      });

      setName('');
      setEmail('');
      setTables(tables.map(tableN => {
        if(tableN._id === table._id){
          tableN.users.push(response.data);
        }
        return tableN;
      }));
      toast.success(<p className='toast-fonts'>Usuário Criado com Sucesso!!</p>);
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
  const validators = (name, email) => {
    return validateEmail(email) && validateName(name);
  }

  return (
    <>
      <HiPlus onClick={openModal}/>
      <Modal
        isOpen={modalIsOpen}
        onResquestClose={closeModal}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
        className="modal-content"
        >
          <div className='container'>
            <form className='modal-form' onSubmit={handleSubmit}>
                <h3>Criar Novo Nome</h3>
                <input 
                  placeholder="Nome"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <input 
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button 
                id="Confirm" 
                type="submit"
                disabled={(!validators(name, email) || loading)}
                >Confirmar</button>
            </form>
          </div>
          <button onClick={closeModal}>Close</button>
        </Modal>
    </>
  );
}

export default UserCreate;
