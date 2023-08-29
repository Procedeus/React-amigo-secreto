import api from '../../../services/api';
import { AiOutlineDelete } from "react-icons/ai";
import toast from 'react-hot-toast';
import { useState } from 'react';

function UserDelete({table, tables, setTables, setCurrentTable}){
    const [loading, setLoading] = useState(false);
    async function handleDelete(table){
        setLoading(true);
        try{
            const token = localStorage.getItem('token');
            const response = await api.delete(`/tables`, { data: {table}, headers: {
                'Authorization': `Bearer ${token}`
                }});
            setCurrentTable(prevCurrentTable => prevCurrentTable - 1);
            setTables(tables.filter(table => table._id !== response.data._id));
            toast.success(<p className='toast-fonts'>Tabela Deletada com Sucesso!!</p>);
            setLoading(false);
        }
        catch(error){
            if (error.response) {
                toast.error(<p className='toast-fonts'>Erro {error.response.status}: {error.response.data}</p>);
            } else {
                toast.error(<p className='toast-fonts'>Erro desconhecido: {error}</p>);
            }
            setLoading(false);
          }
    }
    return(
        <>
          <AiOutlineDelete onClick={() => loading ? '' : handleDelete(table)}/>
        </>
    );
}
export default UserDelete;