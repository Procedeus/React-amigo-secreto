import { useState} from 'react';
import Modal from 'react-modal';
import './userCreate.css';
import api from '../../services/api';

Modal.setAppElement('#root');

function UserCreate({setDatas, datas, setDatasGift, datasGift, setDatasGifted, datasGifted}) {
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

    const response = await api.post('/users/', {
      name,
      email
    })

    setName('');
    setEmail('');

    setDatas([...datas, response.data])
    setDatasGift([...datasGift, response.data])
    setDatasGifted([...datasGifted, response.data])
  }
  return (
    <div>
      <button onClick={openModal}>Criar</button>
      <Modal
        isOpen={modalIsOpen}
        onResquestClose={closeModal}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
        className="modal-content"
        >
          <div className='container'>
            <form className='modal-form' onSubmit={handleSubmit}>
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

export default UserCreate;
