import React, { useState, useEffect } from 'react';
import './App.css';
import api from './services/api';
import Table from './Components/Tables/Table/table';
import TableCreate from './Components/Tables/TableCreate/tableCreate';

function App() {
  const [tables, setTables] = useState([]);
    
  useEffect(() =>{
    async function getTables(){
      const response = await api.get('/tables',);
      setTables(response.data);
    }
    getTables();
  }, [])

  return (
    <>
      <TableCreate setTables={setTables} tables={tables} />
      {tables.map(table => (
        <Table key={table._id} table={table} tables={tables} setTables={setTables}/>
      ))}
    </>
  );
}

export default App;
