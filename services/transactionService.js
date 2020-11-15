import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/

import TransactionModel from '../models/TransactionModel.js';

export function getByYearMonth(period) {
  const res = TransactionModel.find({ yearMonth: period }, { __v: 0 });
  return res;
}

export function getAllYearMonth(period) {
  const res = TransactionModel.distinct('yearMonth');
  return res;
}

export function deleteTransaction(id) {
  const res = TransactionModel.deleteOne({ _id: id });
  return res;
}

export function updateTransaction(id, newData) {
  const res = TransactionModel.findByIdAndUpdate({ _id: id }, newData);
  return res;
}

export function createTransaction(data) {
  const res = TransactionModel.create(data);
  return res;
}
