import UserChange from '../UserChange/userChange';
import { AiOutlineDelete } from "react-icons/ai";
import './user.css';

function User({tableId, data, handleDelete}) {
  return (
    <div className='container-table'>
      <div className='name utils-form'>
          <h3>{data.name}</h3>
        </div>
        <div className='email utils-form'>
          <h3>{data.email}</h3>
        </div>
        <div className='gift utils-form'>
          <h3>{data.gift}</h3>
        </div>
        <div className='icons-table'>
          <UserChange data={data} tableId={tableId}/>
          <AiOutlineDelete onClick={() => handleDelete(tableId, data._id)}/>
        </div>
    </div>
  );
}

export default User;
