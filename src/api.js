// src/api.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://edwardndiyoo.pythonanywhere.com',
// });

// export default api;



// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default api;


