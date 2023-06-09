import TableCreate from '../TableCreate/tableCreate';
import Table from '../Table/table';

function Tables({tables, setTables}) {
    return (
      <>
      <TableCreate setTables={setTables} tables={tables} />
      {tables.map(table => (
        <Table key={table._id} table={table} setTables={setTables} tables={tables}/>
      ))}
      </>
      );
    }

export default Tables;