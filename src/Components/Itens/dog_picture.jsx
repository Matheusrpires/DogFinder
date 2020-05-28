import React from 'react';
import styled from 'styled-components';

const A = styled.a`
    position: absolute;
    color: ${props => props.color};
    font-family: ${props => props.font}, sans-serif;
    top: 0%;
    font-size: 3em;
    left: 5%;
  `;

const Dog_picture = (props) => {
  return (
    <React.Fragment>
      <img src={props.picture} alt="Dog" />
      <A color={props.color} font={props.font} className="dog_name">{props.dogName}</A>
    </React.Fragment>
  )
}

export default Dog_picture;