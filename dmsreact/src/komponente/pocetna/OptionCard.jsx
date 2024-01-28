import React from 'react';

const OptionCard = ({ icon, text }) => {
  return (
    <div className="option-card">
      <div>{icon}</div>
      <p>{text}</p>
    </div>
  );
};

export default OptionCard;
