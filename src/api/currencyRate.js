import axios from 'axios';

const api = {
  getCurrencyRate() {
    return axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
  },
};

export default api;
