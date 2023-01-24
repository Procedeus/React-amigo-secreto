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
      emailjs.send('service_ula1si9', 'RaffleMessage', email, 'npm9LdK879AmP_hAT');
    })
  }

  return (
    <div>
      <button onClick={() => { sendEmail(); }}>Sortear</button>
    </div>
  );
}

export default Raffle;
