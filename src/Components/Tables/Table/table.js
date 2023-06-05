import User from '../../Users/User/user';
import UserCreate from '../../Users/UserCreate/userCreate';
import Shuffle from '../../Users/UserShuffle/userShuffle';
import './table.css';

function Table({table, tables, setTables}) {
  return (
    <div className='table-margin'>
        <div className='container-table'>
            <div className='table utils'>
                <h3>{table?.name}</h3>
            </div>
        </div>
        <div className='container-table'>
            <div className='name utils'>
                <h3>Nome</h3>
            </div>
            <div className='email utils'>
                <h3>Email</h3>
            </div>
            <div className='gift utils'>
                <h3>Presentear</h3>
            </div>
            <div className='icons'>
                <UserCreate 
                    table={table}
                    tables={tables}
                    setTables={setTables}
                />
                <Shuffle
                    tableId={table._id}
                    tables={tables}
                    setTables={setTables}
                />
            </div>
        </div>
            
        {table?.users.map(user => (
        <User 
        key={user._id}
        table={table}
        user={user}
        setTables={setTables}
        tables={tables}
        /> ))}
    </div>
  );
}

export default Table;