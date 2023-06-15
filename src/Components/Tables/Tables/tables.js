import { useEffect, useState } from 'react';
import TableCreate from '../TableCreate/tableCreate';
import Table from '../Table/table';
import './tables.css';

function Tables({tables, setTables, currentTable, setCurrentTable, legthTable}) {
  const [showButton, setShowButton] = useState(true);

  useEffect(() =>{
    setShowButton(legthTable > currentTable)

  }, [legthTable, currentTable])

  function handleButtonClick(){
    setCurrentTable(currentTable + 1);
  }
  return (
    <>
      <TableCreate setTables={setTables} tables={tables} />
      {tables.map(table => (
        <Table key={table._id} table={table} setTables={setTables} tables={tables}/>
      ))}
      <div className='container-table'>
        <div className='click'>
        {showButton && (
          <button id='showButton' type="button" onClick={() => {handleButtonClick()}}>Mostrar Mais</button>
        )}
        </div>
      </div>
    </>
  );
}

export default Tables;