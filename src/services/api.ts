import axios from 'axios';

const api = axios.create({
  baseURL: "https://back-criativa-doations-635d356bed7c.herokuapp.com" //`${process.env.REACT_APP_API_URL}`,  
});

export default api; 