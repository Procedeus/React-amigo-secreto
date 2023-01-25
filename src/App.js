import React, { useState, useEffect } from 'react';
import './App.css';
import User from './Components/User/user';
import UserCreate from './Components/UserCreate/userCreate';
import api from './services/api';
import Raffle from './Components/Raffle/raffle'

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
    setDatas(datas.filter(delUser => delUser._id !== id))
  }

  return (
    <div className='app'>
      <div className='flex-button'>
      </div>
      <form className='form'>
          <ul className='title'>
            <li><h3>Nome</h3></li>
            <li><h3>Email</h3></li>
            <li><h3>Presentear</h3></li>
            <li className="icons">
              <UserCreate 
              setDatas = {setDatas} 
              datas = {datas}
              />
            </li>
            <li className="icons">
              <Raffle
              setDatas = {setDatas}
              />
            </li>
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
