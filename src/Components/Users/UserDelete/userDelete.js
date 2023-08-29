import api from '../../../services/api';
import { AiOutlineDelete } from "react-icons/ai";
import toast from 'react-hot-toast';
import { useState } from 'react';

function UserDelete({table, user, tables, setTables}){
  const [loading, setLoading] = useState(false);

    async function handleDelete(table, user){
      setLoading(true);
        try{
            const token = localStorage.getItem('token');
            const response = await api.delete(`/users`, { data: { user }, headers: {
                'Authorization': `Bearer ${token}`
                }});
            setTables(tables.map(tableN => {
                if (tableN._id === table) {
                    const updatedUsers = tableN.users.filter(userN => userN._id !== response.data._id);
                    return {...tableN, users: updatedUsers}
                }
                return tableN;
              }));
              toast.success(<p className='toast-fonts'>Usuário Deletado com Sucesso!!</p>);
              setLoading(false);
            }
        catch(error){
            if (error.response) {
              toast.error(<p className='toast-fonts'>Erro {error.response.status}: {error.response.data.error}</p>);
            } else {
              toast.error(<p className='toast-fonts'>Erro desconhecido: {error}</p>);
            }
            setLoading(false);
        }
    }
    return(
        <>
          <AiOutlineDelete onClick={() => loading ? '' : handleDelete(table, user)}/>
        </>
    );
}
export default UserDelete;