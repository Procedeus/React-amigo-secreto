import { useEffect, useState } from 'react';
import api from '../../../services/api'
import TableCreate from '../TableCreate/tableCreate';
import Table from '../Table/table';
import {useNavigate} from 'react-router-dom'
import './tables.css';

function Tables() {
  const [tables, setTables] = useState([]);
  const [currentTable, setCurrentTable] = useState(2);
  const [currentTables, setCurrentTables] = useState([]);

  const navigate = useNavigate();

  useEffect(() =>{
    
    async function getTables(){
      const token = localStorage.getItem('token');
      try{
        const response = await api.get('/tables',
        { headers: {
          'Authorization': `Bearer ${token}`
        }});
        setTables(response.data);
      }
      catch(error){
        if (error.response) {
          alert(`Erro ${error.response.status}: ${error.response.data.error}`);
        } else {
          alert('Erro desconhecido: '+ error);
        }
        navigate('/login');
      }
    }

    getTables();
  }, []);
  
  useEffect(()=>{
    setCurrentTables(tables.slice(0, currentTable));
  }, [tables, currentTable])

  function handleButtonClick(){
    setCurrentTable(prevCurrentTable => prevCurrentTable + 1);
  }
  return (
    <>
      <TableCreate setTables={setTables} tables={currentTables} />
      {currentTables.map(table => (
        <Table key={table._id} table={table} setTables={setTables} tables={currentTables}/>
      ))}
      <div className='container-table'>
        <div className='click'>
        {currentTable < tables.length && (
          <button id='showButton' type="button" onClick={() => {handleButtonClick()}}>Mostrar Mais</button>
        )}
        </div>
      </div>
    </>
  );
}

export default Tables;