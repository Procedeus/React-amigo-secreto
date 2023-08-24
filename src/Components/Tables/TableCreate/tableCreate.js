import api from '../../../services/api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import './tableCreate.css'

function TableCreate({setTables, tables}) {
  const [name, setName] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
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
    }
    catch(error){
      if (error.response) {
        toast.error(<p className='toast-fonts'>Erro {error.response.status}: {error.response.data.error}</p>);
      } else {
        toast.error(<p className='toast-fonts'>Erro desconhecido: {error}</p>);
      }
    }
  }

  return (
        <form className="container-title margin-form" onSubmit={handleSubmit}>
            <input 
              className="input-create" 
              type='text' 
              placeholder='Nome Tabela' 
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input 
              className="create-submit" 
              type='submit' 
              value='Criar'
            />
        </form>
  );
}

export default TableCreate;