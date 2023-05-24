import { useState} from 'react';
import Modal from 'react-modal';
import './userChange.css';
import api from '../../services/api';
import { RxUpdate } from "react-icons/rx";

Modal.setAppElement('#root');

function UserChange({data}) {
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(){
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }
  async function handleChange(e){
    if(data.name !== name || data.email !== email){
        await api.post(`/update/${data._id}`, {
        name,
        email
    });
    }

    setName('');
    setEmail('');
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
