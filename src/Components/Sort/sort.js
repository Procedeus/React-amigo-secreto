import api from '../../services/api';
import emailjs from '@emailjs/browser';

function Sort({datasGift, datasGifted}) {
  function sendEmail(email){
      emailjs.send('service_ula1si9', 'RaffleMessage', email, 'npm9LdK879AmP_hAT')
      .then(function(response) {
        alert('Enviado com sucesso!', response.status, response.text);
        window.location.reload(false);
      }, function(error) {
        alert('Ocorreu um erro.', error);
      });
  }
  let num, num2, gift, gifted;
  gift = [];
  gifted = [];
  function raffle(num, num2){
    num = Math.floor(Math.random() * datasGift.length);
    num2 = Math.floor(Math.random() * datasGifted.length);
    gift = datasGift.at(num);
    gifted = datasGifted.at(num2);
    if(datasGift.length > 1 && gifted._id !== undefined){
      for(;gift._id == gifted._id;){
        num2 = Math.floor(Math.random() * datasGifted.length);
        gifted = datasGifted.at(num2);
      }
    }
    else if(gift._id === gifted._id && gift._id != undefined){
        alert("Não é possível se sortear.");
    }
  }

  async function handleGift(){
    if(datasGift.length > 0){
      raffle(num, num2);
      if(gift._id !== gifted._id && gift._id !== undefined && gifted._id !== undefined){
        await api.post(`/updateGift/${gift._id}`, {
          gift: gifted.name
        });
        await api.post(`/updateGifted/${gifted._id}`, {
          gifted: gift.name
        });
        SsendEmail({
          giftName: gift.name,
          giftEmail: gift.email,
          giftedName: gifted.name,
        });
      }
    }
    else{
      alert("Não foi possível sortear.");
    }
  }

  return (
    <div>
      <button onClick={() => handleGift()}>Sortear</button>
    </div>
  );
}

export default Sort;
