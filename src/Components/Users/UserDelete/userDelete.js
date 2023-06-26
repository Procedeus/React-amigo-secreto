import api from '../../../services/api';
import { AiOutlineDelete } from "react-icons/ai";

function UserDelete({table, user, tables, setTables}){
    
    async function handleDelete(table, user){
        try{
            const response = await api.delete(`/users`, { data: { user } });
            setTables(tables.map(tableN => {
                if (tableN._id === table) {
                    const updatedUsers = tableN.users.filter(userN => userN._id !== response.data._id);
                    return {...tableN, users: updatedUsers}
                }
                return tableN;
              }));
        }
        catch(error){
            if (error.response) {
                alert(`Erro ${error.response.status}: ${error.response.data.error}`);
                } else {
                alert('Erro desconhecido: '+ error);
            }
        }
    }
    return(
        <>
          <AiOutlineDelete onClick={() => handleDelete(table, user)}/>
        </>
    );
}
export default UserDelete;