import api from '../../../services/api';
import { AiOutlineDelete } from "react-icons/ai";

function UserDelete({table, user, tables, setTables}){
    
    async function handleDelete(table, user){
        try{
            const response = await api.delete(`/users`, { data: {table, user} });
            setTables(tables.map(tableN =>{
                if(tableN._id === table){
                    return response.data;
                }
                return tableN;
            }));
        }
        catch(error){
            if (error.response) {
                alert(`Erro ${error.response.status}: ${error.response.data}`);
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