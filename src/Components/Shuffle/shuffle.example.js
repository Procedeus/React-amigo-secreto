import emailjs from '@emailjs/browser';
import api from '../../services/api';

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
      emailjs.send('SERVICE', 'MESSAGE_TEMPLATE', email, 'ID');
    })
  }

  return (
    <div>
      <button onClick={() => { sendEmail(); }}>Sortear</button>
    </div>
  );
}

export default Raffle;
