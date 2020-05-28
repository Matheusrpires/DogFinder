import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getAllNames, getOneDog } from '../../API/index.js';
import Dog_picture from '../Itens/dog_picture.jsx';
import Select from '../Itens/select.jsx';

import "./page.scss";

const A = styled.a`
    position: absolute;
    color: ${props => props.color};
    font-family: ${props => props.font}, sans-serif;
    top: 0%;
    font-size: 3em;
    left: 5%;
  `;

const fonts = ["Roboto", "Lora", "Nunito Sans", "Open Sans", "Slabo27px"];

const Page = (props) => {

  const [dogName, setDogName] = useState("");
  const [names, setNames] = useState([]);
  const [dog, setDog] = useState("");
  const [picture, setPicture] = useState("");
  const [color, setColor] = useState("");
  const [font, setFont] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState(0);

  useEffect(() => {
    const call = async () => {
      setNames(await getAllNames());
    }
    call();
  }, [])

  useEffect(() => {
    let { color: colorS, dogName: dogNameS, font: fontS, picture: pictureS, raça: dogS } = JSON.parse(localStorage.getItem('info'));
    setColor(colorS);
    setDogName(dogNameS);
    setFont(fontS);
    setPicture(pictureS);
    setDog(dogS);
  }, [])

  const callPicture = async (e) => {
    dog && setPicture(await getOneDog(dog));
  }

  const saveItens = () => {
    const info = {
      dogName: dogName,
      raça: dog,
      picture: picture,
      color: color,
      font: font,
      date: new Date()
    }
    localStorage.setItem("info", JSON.stringify(info))
    Message();
  }

  const Message = () => {
    setMessage("Dados salvos")
    clearTimeout(time);
    setTime(
      setTimeout(() => {
        setMessage("");
        setTime(0);
      }, 900)
    )
  }

  const handleSelect = (item) => {
    setFont(item)
  }

  return (
    <div className="container">
      <h1>Ache seu Cachorro</h1>
      <div className="dog_selector_container">

        <input type="text" id="dname" name="dname" value={dogName} placeholder="Name" onChange={(e) => setDogName(e.target.value)} />

        <select value={dog} onChange={(e) => setDog(e.target.value)}>
          <option value="" selected disabled hidden>Escolha a raça</option>
          {
            names ?
              Object.keys(names).map((name, i) => {
                return (
                  <React.Fragment>
                    {
                      names[name].length > 0 ?
                        names[name].map((subname, i) => {
                          return (
                            <option value={`${name}/${subname}`} key={i}>{subname} {name}</option>
                          )
                        })
                        :
                        <option value={name} key={i}>{name}</option>
                    }
                  </React.Fragment>
                )
              })
              : null
          }
        </select>

        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="" selected disabled hidden>Escolha a cor</option>
          <option value="blue">Azul</option>
          <option value="red">Vermelha</option>
          <option value="white">Branco</option>
          <option value="green">Verde</option>
          <option value="grey">Cinza</option>
        </select>

        <Select item={fonts} cache={font} action={handleSelect} />

        <input type="submit" onClick={callPicture} />

        {
          picture && <input type="submit" onClick={saveItens} value="Salvar" />
        }

      </div>
      <section>
        <div className="dog_container">
          {
            picture ?
              <Dog_picture picture={picture} color={color} font={font} dogName={dogName} />
              : null
          }
          {
            message && <a className="dog_message__sucess">{message}</a>
          }
        </div>
      </section>
    </div>
  )
}

export default Page;