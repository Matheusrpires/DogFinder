import axios from 'axios';

const url = "https://dog.ceo/api/breeds";
const pictureUrl = "https://dog.ceo/api/breed";

export const getAllNames = async () => {

  try {
    const { data } = await axios.get(`${url}/list/all`);
    const { message } = data;
    return message;
  } catch (error) {
    console.log(error);
  }
}

export const getOneDog = async (breed) => {

  try {
    const { data } = await axios.get(`${pictureUrl}/${breed}/images/random`);
    console.log(data.message);
    return data.message;
  } catch (error) {
    console.log(error);
  }
}