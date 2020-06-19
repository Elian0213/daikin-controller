import axios from 'axios';

export default {
  info: async () => {
    return await axios.get(`http://192.168.0.47:3000/ac-info`)
      .then((data) => {
        const response = data.data;

        return response;
      })
      .catch((err) => {
        return false;
      })
  },
  update: async (data) => {
    return await axios.post(`http://192.168.0.47:3000/ac-update`, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => {
      return ['success'];
    })
    .catch((err) => {
      return false;
    })
  }
}