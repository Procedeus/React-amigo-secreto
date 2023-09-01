import { useState} from 'react';
import Modal from 'react-modal';
import api from '../../../services/api';
import { RxUpdate } from "react-icons/rx";
import toast from 'react-hot-toast';

Modal.setAppElement('#root');

function UserChange({user, table, setTables, tables}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function openModal(){
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }
  async function handleChange(e){
    e.preventDefault();
    setLoading(true);
    if(user.name !== name || user.email !== email){
      try{
        const token = localStorage.getItem('token');
        const response = await api.post('/update', { 
          user: user._id,
          name,
          email
        },
        {
          headers: {
          'Authorization': `Bearer ${token}`
          }
        });
        setTables(tables.map(tableN => {
          if (tableN._id === table._id) {
            const updatedUsers = tableN.users.map(user => {
              if (user._id === response.data._id) {
                return response.data;
              }
              return user;
            });
            return { ...tableN, users: updatedUsers };
          }
          return tableN;
        }));
        setLoading(false);
        closeModal();
        toast.success(<p className='toast-fonts'>Usuário Alterado com Sucesso!!</p>);
      }
      catch(error){
        if (error.response) {
          toast.error(<p className='toast-fonts'>Erro {error.response.status}: {error.response.data}</p>);
        } else {
          toast.error(<p className='toast-fonts'>Erro desconhecido: {error}</p>);
        }
      }
      setLoading(false);
    }
  }
  return (
    <div>
      <RxUpdate onClick={openModal}/>
      <Modal
      isOpen={modalIsOpen}
      onResquestClose={closeModal}
      overlayClassName="modal-overlay"
      className="modal-content"
      >
      <div className='container'>
        <form onSubmit={handleChange} className='modal-form'>
            <label>Alterar Usuário</label>
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
            disabled={ loading }
            >Confirmar</button>
        </form>
      </div>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default UserChange;
