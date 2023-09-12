import api from '../../../services/api';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from 'react-modal';

function TableCreate({setTables, tables, Empty, setEmpty}) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

   useEffect(() =>{
    function tablesLength(){
      if (Empty === false) {
        openModal();
      }
    }

    tablesLength();
  },[Empty]);

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
      const response = await api.post('/tables/', { name }, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
      });

      setName('');
      setTables([...tables, response.data]);
      toast.success(<p className='toast-fonts'>Tabela Criada com Sucesso!!</p>);
      setLoading(false);
      setEmpty(true);
      closeModal();
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

  return (
    <>
      <div className='button-navbar' onClick={openModal}>
        <p>Criar Tabela</p>
      </div>
      <Modal
      isOpen={modalIsOpen}
      onResquestClose={closeModal}
      overlayClassName="modal-overlay"
      className="modal-content"
      >
      <div className='container'>
        <form onSubmit={handleSubmit} className='modal-form'>
            <label>Criar Tabela</label>
            <input 
              placeholder="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <button 
              id="Confirm" 
              type="submit"
              disabled={loading}
            >Confirmar</button>
        </form>
      </div>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
}

export default TableCreate;