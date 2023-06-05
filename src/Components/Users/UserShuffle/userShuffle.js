import emailjs from '@emailjs/browser';
import api from '../../../services/api';
import { BiShuffle } from "react-icons/bi";

function Shuffle({tableId, setTables, tables}) {
  async function getDatasShuffle() {
    const response = await api.post('/shuffle', {tableId} );
    return response.data;
  }

  async function sendEmail(){ 
    try{
      const response = await getDatasShuffle();
      setTables(tables.map(tableN =>{
        if(tableN._id === tableId){
            return response;
        }
        return tableN;
      }));
      response.users.forEach(user => {
        const email = {
          giftedName: user.gift,
          giftName: user.name,
          giftEmail: user.email
        };
        emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, email, process.env.REACT_APP_PUBLIC_KEY);
      })
    }
    catch(error){
      if (error.response) {
          alert(`Erro ${error.response.status}: ${error.response.data.error}`);
        } else {
          alert('Erro desconhecido: '+ error);
      }
    }
  }

  return (
    <>
      <BiShuffle onClick={() => { sendEmail(); }}/>
    </>
  );
}

export default Shuffle;