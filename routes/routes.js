import express from 'express';
const transactionRouter = express.Router();
import {
  getByYearMonth,
  getAllYearMonth,
  deleteTransaction,
  updateTransaction,
  createTransaction,
} from '../services/transactionService.js';

transactionRouter.get('/', async (req, res) => {
  const { period } = req.query;
  if (period == null) {
    res.json({
      error: `É necessário informar o parâmetro \"period\", cujo valor deve estar no formato yyyy-mm.`,
    });
  }
  const json = await getByYearMonth(period);
  if (json.length == 0) {
    res.json({
      message: `Não foram encontrados registros.`,
    });
  }
  res.json({ length: json.length, transactions: json });
});

transactionRouter.get('/allYearMonth', async (req, res) => {
  const json = await getAllYearMonth();
  res.json(json);
});

transactionRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const json = await deleteTransaction(id);
  res.json(json);
});

transactionRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const json = await updateTransaction(id, newData);
  res.json(json);
});

transactionRouter.post('/', async (req, res) => {
  const data = req.body;
  const json = await createTransaction(data);
  res.json(json);
});

export default transactionRouter;
