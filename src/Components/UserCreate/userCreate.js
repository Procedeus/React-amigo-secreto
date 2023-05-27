import { useState} from 'react';
import Modal from 'react-modal';
import './userCreate.css';
import api from '../../services/api';
import { HiPlus } from "react-icons/hi";


Modal.setAppElement('#root');

function UserCreate({setDatas, datas}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(){
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }
  async function handleSubmit(e){
    e.preventDefault();

    try{
      const response = await api.post('/users/', {
        name,
        email
      })

      setName('');
      setEmail('');

      setDatas([...datas, response.data])
    }
    catch(error){
      if (error.response) {
          alert(`Erro ${error.response.status}: ${error.response.data.error}`);
        } else {
          alert('Erro desconhecido: '+ error);
      }
  }
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
                <button id="Confirm" type="submit">Confirmar</button>
            </form>
          </div>
          <button onClick={closeModal}>Close</button>
        </Modal>
    </>
  );
}

export default UserCreate;
