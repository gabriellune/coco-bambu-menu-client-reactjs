import React, { useState, useEffect, useContext } from 'react';

import { AuthProvider } from '../../context/AuthProvider';
import HttpConfig from '../../api/HttpConfig';
import Card from '../Card';
import Navbar from '../NavBar';
import './styles.css';

function Dishes() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [searchWord, setSearchWord] = useState<string>('');
  const [filteredDishes, setFilteredDishes] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await HttpConfig.get('api/dishes');
        setDishes([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filteredArray = dishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchWord.toLowerCase())
    );
    setFilteredDishes(filteredArray);
  }, [searchWord, dishes]);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWord(event.target.value);
  }

  const { setUserInfo } = useContext(AuthProvider);

  function checkOut() {
    localStorage.removeItem('accessToken');
    setUserInfo({ user: {}, token: '' });
  }

  return (
    <div className='container'>
      <Navbar handleSearch={handleSearch} searchWord={searchWord} checkOut={checkOut} />
      <div className="container">
        <h1 className='title'>Últimos pedidos</h1>
        <hr className='line' />

        {filteredDishes.length !== 0 ? (
          filteredDishes.map((dish) => {
            return <Card key={dish._id} dish={dish} />;
          })
        ) : (
          <div className="d-flex-block text-center mt-5">
            <small className="title">O item pesquisado não existe.</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dishes;