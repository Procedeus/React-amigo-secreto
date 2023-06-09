import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import api from './services/api';
import Tables from './Components/Tables/Tables/tables';

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
      <Router>
        <Routes>
          <Route path="/" element={<Tables setTables={setTables} tables={tables}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
