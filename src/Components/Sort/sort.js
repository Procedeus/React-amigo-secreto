import emailjs from '@emailjs/browser';

function Sort({getDatasRaffle, datas}) {
  function sendEmail(datas){
    datas.map(item => {
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
      <button onClick={() => 
        {
          getDatasRaffle(true); 
          sendEmail(datas);
        }}>Sortear</button>
    </div>
  );
}

export default Sort;
