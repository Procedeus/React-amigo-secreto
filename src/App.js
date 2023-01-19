import React, { useState, useEffect } from 'react';
import './App.css';
import User from './Components/User/user';
import UserCreate from './Components/UserCreate/userCreate';
import api from './services/api';
import Sort from './Components/Sort/sort'

function App() {
  const [datas, setDatas] = useState([]);
    
  useEffect(() =>{
    async function getDatas(){
      const response = await api.get('/users/',);
      setDatas(response.data);
    }
    getDatas();
  }, [])

  async function handleDelete(id){;
    await api.delete(`/users/${id}`);
    setDatas(datas.filter(delUser => delUser._id != id))
  }
  async function getDatasRaffle(verif){
    const response = await api.post('/raffle/${verif}',);
    setDatas(response.data);
  }

  return (
    <div className='app'>
      <div className='flex-button'>
      <UserCreate 
      setDatas={setDatas} 
      datas={datas}
      />
      <Sort
      datas={datas}
      getDatasRaffle={getDatasRaffle}
      />
      </div>
      <form className='form'>
          <ul className='title'>
            <li><h3>Nome</h3></li>
            <li><h3>Email</h3></li>
            <li><h3>Presentear</h3></li>
            <li><h3>Presenteado</h3></li>
          </ul>
        {datas.map(data => (
          <User 
          handleDelete={handleDelete} 
          data={data} 
          key={data._id}
          />

        ))}
      </form>
    </div>
  );
}

export default App;
