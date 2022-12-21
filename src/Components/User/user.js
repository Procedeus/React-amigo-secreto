import './user.css';
import UserChange from '../UserChange/userChange';
import { AiOutlineDelete } from "react-icons/ai";

function User({data, handleDelete}) {
  return (
        <ul>
          <li>{data.name}</li>
          <li>{data.email}</li>
          <li>{data.gift}</li>
          <li>{data.gifted}</li>
          <li className="icons">
            <UserChange data={data}/>
          </li>
          <li className="icons">
            <AiOutlineDelete onClick={() => handleDelete(data._id)}/>
          </li>
        </ul>
  );
}

export default User;
