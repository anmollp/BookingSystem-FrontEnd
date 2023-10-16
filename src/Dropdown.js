import React from 'react';
import './style.css';

const City = ({onSelect, item}) => {
  return (
    <div className="drop-down-element" onClick={() => onSelect(item)}>
      {item.cityName}
    </div>
  )
}

const Dropdown = ({ data, handleSelection }) => (
  <div className="drop-down">
    {data.map(item => (
      <div key={item.cityId}>
        <City onSelect={handleSelection} item={item}/>
      </div>
    ))}
  </div>
);

export default Dropdown;
