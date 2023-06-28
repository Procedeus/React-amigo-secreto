import { useState} from 'react';
import Modal from 'react-modal';
import api from '../../../services/api';
import { RxUpdate } from "react-icons/rx";

Modal.setAppElement('#root');

function UserChange({user, table, setTables, tables}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(){
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }
  async function handleChange(e){
    e.preventDefault();
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

        closeModal();
      }
      catch(error){
        if (error.response) {
          alert(`Erro ${error.response.status}: ${error.response.data}`);
        } else {
          alert('Erro desconhecido: '+ error);
        }
      }
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
            <button id="Confirm" type="submit">Confirmar</button>
        </form>
      </div>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default UserChange;
