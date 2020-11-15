import axios from 'axios';
const webURL =
  'https://controle-financeiro-fullstack.herokuapp.com/api/transaction';

async function getAllMonthYear() {
  const URL = process.env.REACT_APP_API_URL || webURL + '/allYearMonth';
  const res = await axios.get(URL);
  return res.data;
}

async function getOneMonthYear(period) {
  const URL = process.env.REACT_APP_API_URL || webURL + '?period=' + period;
  const res = await axios.get(URL);
  return res.data;
}

async function deleteTransaction(id) {
  const URL = process.env.REACT_APP_API_URL || webURL + '/' + id;
  const res = await axios.delete(URL);
  return res.data;
}

async function patchTransaction(id, data) {
  const URL = process.env.REACT_APP_API_URL || webURL + '/' + id;
  const res = await axios.patch(URL, data);
  return res.data;
}

async function createTransaction(data) {
  const URL = process.env.REACT_APP_API_URL || webURL;
  console.log(data);
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
