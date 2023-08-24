import { useState } from 'react';
import Modal from 'react-modal';
import api from '../../../services/api';
import { RxUpdate } from "react-icons/rx";
import toast from 'react-hot-toast';

Modal.setAppElement('#root');

function TableChange({table, setTables, tables}) {
  const [name, setName] = useState(table.name);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(){
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  async function handleTableChange(e){
    e.preventDefault();
    const token = localStorage.getItem('token');
    if(table.name !== name){
      try{ 
        const response = await api.post('/tablesU', { 
          table: table._id,
          name
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setTables(tables.map(tableN => {
          if (tableN._id === table._id) {
            return {...tableN, name: response.data.name};
          }
          return tableN;
        }));

        closeModal();
        toast.success(<p className='toast-fonts'>Tabela Alterada com Sucesso!!</p>);
      }
      catch(error){
        if (error.response) {
          toast.error(<p className='toast-fonts'>Erro {error.response.status}: {error.response.data.error}</p>);
        } else {
          toast.error(<p className='toast-fonts'>Erro desconhecido: {error}</p>);
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
        <form onSubmit={handleTableChange} className='modal-form'>
            <input 
              placeholder="Nome"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <button id="Confirm" type="submit">Confirmar</button>
        </form>
      </div>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default TableChange;
