import User from '../User/user';
import UserCreate from '../UserCreate/userCreate';
import Shuffle from '../Shuffle/shuffle';
import api from '../../services/api';
import './table.css';

async function handleDelete(table, user){;
    try{
      await api.delete(`/users`, { data: {table, user} });
    }
    catch(error){
      if (error.response) {
          alert(`Erro ${error.response.status}: ${error.response.data}`);
        } else {
          alert('Erro desconhecido: '+ error);
      }
    }
}

function Table({table}) {
  return (
    <div className='table-margin'>
        <div className='container-table'>
            <div className='table utils'>
                <h3>{table?.name}</h3>
            </div>
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
                />
                <Shuffle
                    tableId={table._id}
                />
            </div>
        </div>
            
        {table?.users.map(data => (
        <User 
        key={data._id}
        handleDelete={handleDelete} 
        tableId={table._id}
        data={data}
        /> ))}
    </div>
  );
}

export default Table;