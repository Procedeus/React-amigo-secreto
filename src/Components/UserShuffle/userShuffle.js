import emailjs from '@emailjs/browser';
import api from '../../services/api';
import { BiShuffle } from "react-icons/bi";

function Shuffle(tableId) {
  async function getDatasShuffle() {
    const response = await api.post('/shuffle', tableId );
    return response.data;
  }

  async function sendEmail(){ 
    try{
      const datas = await getDatasShuffle();
      datas.forEach(item => {
        const email = {
          giftedName: item.gift,
          giftName: item.name,
          giftEmail: item.email
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