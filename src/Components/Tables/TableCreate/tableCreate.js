import api from '../../../services/api';
import { useState } from 'react';
import './tableCreate.css'

function TableCreate({setTables, tables}) {
  const [name, setName] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    try{
      const response = await api.post('/tables/', {
        name
      })

      setName('');
      setTables([...tables, response.data]);
    }
    catch(error){
      if (error.response) {
          alert(`Erro ${error.response.status}: ${error.response.data}`);
        } else {
          alert('Erro desconhecido: '+ error);
      }
    }
  }

  return (
        <form className="container-table" onSubmit={handleSubmit}>
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