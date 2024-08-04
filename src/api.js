// // src/api.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:5000',
// });

// export default api;


// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://edwardndiyoo.pythonanywhere.com/', // Update this to your hosted server URL
});

export default api;
