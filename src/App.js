import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import api from './services/api';
import Tables from './Components/Tables/Tables/tables';

function App() {
  const [tables, setTables] = useState([]);
  const [currentTable, setCurrentTable] = useState(2);
  const [currentTables, setCurrentTables] = useState([]);

  useEffect(() =>{

    async function getTables(){
      const response = await api.get('/tables',);
      setTables(response.data);
      setCurrentTables(tables.slice(0, currentTable));
    }

    getTables();
  }, [tables, currentTable])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Tables setTables={setTables} tables={currentTables} currentTable={currentTable} setCurrentTable={setCurrentTable} legthTable={tables.length}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
