import axios from 'axios';
const webURL = !process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'https://controle-financeiro-fullstack.herokuapp.com/api/transaction';

async function getAllMonthYear() {
  const URL = webURL + '/allYearMonth';
  const res = await axios.get(URL);
  return res.data;
}

async function getOneMonthYear(period) {
  const URL = webURL + '?period=' + period;
  const res = await axios.get(URL);
  return res.data;
}

async function deleteTransaction(id) {
  const URL = webURL + '/' + id;
  const res = await axios.delete(URL);
  return res.data;
}

async function patchTransaction(id, data) {
  const URL = webURL + '/' + id;
  const res = await axios.patch(URL, data);
  return res.data;
}

async function createTransaction(data) {
  const URL = webURL;
  const res = await axios.post(URL, data);
  return res.data;
}

export {
  getAllMonthYear,
  getOneMonthYear,
  deleteTransaction,
  patchTransaction,
  createTransaction,
};
