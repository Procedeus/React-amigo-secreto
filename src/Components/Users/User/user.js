import UserChange from '../UserChange/userChange';
import UserDelete from '../UserDelete/userDelete';
import './user.css';

function User({table, user, tables, setTables}) {
  return (
    <div className='container-table'>
      <div className='name utils-form'>
          <h3>{user.name}</h3>
        </div>
        <div className='email utils-form'>
          <h3>{user.email}</h3>
        </div>
        <div className='gift utils-form'>
          <h3>{user.gift}</h3>
        </div>
        <div className='icons-table'>
          <UserChange user={user} table={table} tables={tables} setTables={setTables}/>
          <UserDelete table={table._id} user={user._id} tables={tables} setTables={setTables}/>
        </div>
    </div>
  );
}

export default User;
