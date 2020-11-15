import axios from 'axios';

async function getAllMonthYear() {
  const URL = process.env.REACT_APP_API_URL + '/allYearMonth';
  const res = await axios.get(URL);
  return res.data;
}

async function getOneMonthYear(period) {
  const URL = process.env.REACT_APP_API_URL + '?period=' + period;
  const res = await axios.get(URL);
  return res.data;
}

async function deleteTransaction(id) {
  const URL = process.env.REACT_APP_API_URL + '/' + id;
  const res = await axios.delete(URL);
  return res.data;
}

async function patchTransaction(id, data) {
  const URL = process.env.REACT_APP_API_URL + '/' + id;
  const res = await axios.patch(URL, data);
  return res.data;
}

async function createTransaction(data) {
  const URL = process.env.REACT_APP_API_URL;
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
