import React from 'react';

const Select = (props) => {

  const handleAction = (value) => {
    props.action(value)
  }
  
  return (
    <select value={props.cache} onChange={(e) => handleAction(e.target.value)}>
    <option value="" selected disabled hidden>Escolha a fonte</option>
      {
        props.item.map((item, i) => {
          return <option key={i} value={item}>{item}</option>
        })
      }
  </select>
  )
}

export default Select;