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
  const [Empty, setEmpty] = useState();

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
        if(response.data.length > 0){
          setEmpty(true);
        }
        else{
          setEmpty(false);
        }
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
  }, [navigate, setTables]);
  
  useEffect(()=>{
    setCurrentTables(tables.slice(0, currentTable));
  }, [tables, currentTable])

  function handleButtonClick(){
    setCurrentTable(prevCurrentTable => prevCurrentTable + 1);
  }
  
  return (
    <>
      <ul>
        <li>
          <TableCreate setTables={setTables} tables={tables} Empty={Empty} setEmpty={setEmpty} />
        </li>
      </ul>
      {currentTables.map(table => (
        <Table key={table._id} table={table} setTables={setTables} tables={currentTables} setCurrentTable={setCurrentTable} setEmpty={setEmpty}/>
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