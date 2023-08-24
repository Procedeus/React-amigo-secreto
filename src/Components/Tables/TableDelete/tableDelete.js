import api from '../../../services/api';
import { AiOutlineDelete } from "react-icons/ai";

function UserDelete({table, tables, setTables, setCurrentTable}){
    
    async function handleDelete(table){
        try{
            const token = localStorage.getItem('token');
            const response = await api.delete(`/tables`, { data: {table}, headers: {
                'Authorization': `Bearer ${token}`
                }});
            setCurrentTable(prevCurrentTable => prevCurrentTable - 1);
            setTables(tables.filter(table => table._id !== response.data._id));
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
          <AiOutlineDelete onClick={() => handleDelete(table)}/>
        </>
    );
}
export default UserDelete;