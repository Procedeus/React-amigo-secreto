import emailjs from '@emailjs/browser';
import api from '../../../services/api';
import { BiShuffle } from "react-icons/bi";
import toast from 'react-hot-toast';
import { useState } from 'react';

function Shuffle({tableId, setTables, tables}) {
  const [loading, setLoading] = useState(false);

  async function getDatasShuffle() {
    const token = localStorage.getItem('token');
    const response = await api.post('/shuffle', {tableId}, { 
      headers: {
      'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }

  async function sendEmail(){ 
    setLoading(true);
    try{
      const response = await getDatasShuffle();
      setTables(tables.map(tableN =>{
        if(tableN._id === tableId){
          return {...tableN, users: response};
        }
        return tableN;
      }));
      response.forEach(user => {
        const email = {
          giftedName: user.gift,
          giftName: user.name,
          giftEmail: user.email
        };
        emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, email, process.env.REACT_APP_PUBLIC_KEY);
      })
      toast.success(<p className='toast-fonts'>Sorteio Realizado com Sucesso!!</p>);
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

  return (
    <>
      <BiShuffle onClick={() => loading ? '' : sendEmail() }/>
    </>
  );
}

export default Shuffle;