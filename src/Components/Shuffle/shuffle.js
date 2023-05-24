import emailjs from '@emailjs/browser';
import api from '../../services/api';
import { BiShuffle } from "react-icons/bi";

function Raffle({setDatas}) {
  async function getDatasRaffle(){
    const response = await api.post('/raffle');
    setDatas(response.data);
    return response.data;
  }
  async function sendEmail(){ 
    const datas = await getDatasRaffle();
    datas.forEach(item => {
      const email = {
        giftedName: item.gift,
        giftName: item.name,
        giftEmail: item.email
      };
      emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, email, process.env.REACT_APP_PUBLIC_KEY);
    })
  }

  return (
    <>
      <BiShuffle onClick={() => { sendEmail(); }}/>
    </>
  );
}

export default Raffle;
