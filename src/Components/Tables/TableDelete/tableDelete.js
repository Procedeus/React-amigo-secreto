import api from '../../../services/api';
import { AiOutlineDelete } from "react-icons/ai";
import toast from 'react-hot-toast';

function UserDelete({table, tables, setTables, setCurrentTable}){
    
    async function handleDelete(table){
        try{
            const token = localStorage.getItem('token');
            const response = await api.delete(`/tables`, { data: {table}, headers: {
                'Authorization': `Bearer ${token}`
                }});
            setCurrentTable(prevCurrentTable => prevCurrentTable - 1);
            setTables(tables.filter(table => table._id !== response.data._id));
            toast.success(<p className='toast-fonts'>Tabela Deletada com Sucesso!!</p>);
        }
        catch(error){
            if (error.response) {
                toast.error(<p className='toast-fonts'>Erro {error.response.status}: {error.response.data.error}</p>);
            } else {
                toast.error(<p className='toast-fonts'>Erro desconhecido: {error}</p>);
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