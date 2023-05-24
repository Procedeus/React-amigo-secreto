import React, { useState, useEffect } from 'react';
import './App.css';
import User from './Components/User/user';
import UserCreate from './Components/UserCreate/userCreate';
import api from './services/api';
import Shuffle from './Components/Shuffle/shuffle'

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
    <>
      <div className='container-table'>
        <div className='name utils'>
          <h3>Nome</h3>
        </div>
        <div className='email utils'>
          <h3>Email</h3>
        </div>
        <div className='gift utils'>
          <h3>Presentear</h3>
        </div>
        <div className='icons'>
          <UserCreate 
            setDatas = {setDatas} 
            datas = {datas}
          />
          <Shuffle
            setDatas = {setDatas}
          />
        </div>
      </div>
      {datas.map(data => (
        <User 
        handleDelete={handleDelete} 
        data={data} 
        key={data._id}
        />

      ))}
    </>
  );
}

export default App;
