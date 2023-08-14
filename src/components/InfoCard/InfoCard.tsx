import React from 'react';

interface InfoCardProps {
status: string,
  message: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ status, message }) => {
  return (
    <div className="error-card">
      <h2>status</h2>
      <p>{message}</p>
    </div>
  );
};

export default InfoCard;