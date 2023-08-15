import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

interface CardProps {
  dish: {
    _id: string;
    smallImageUrl: string;
    name: string;
    description: string;
  };
}

const Card: React.FC<CardProps> = ({ dish }) => {
  return (
    <>
      <div className="order">
          <img className="image" src={`${dish.smallImageUrl}`} alt={dish.name} />
            <div className="d-flex align-middle col-5">
              <div>
                <h1 className='dish-name'>{dish.name}</h1>
                <p className='dish-description'>{dish.description}</p>
              </div>
          </div>
        <div className="order-actions">
          <Link to={`/dishes/${dish._id}`} className='see-recipe'>Ver <br /> receita</Link>
        </div>
      </div>
      <hr className='line'/>
    </>
  );
}

export default Card;