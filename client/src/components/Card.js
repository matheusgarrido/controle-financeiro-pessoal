import React from 'react';
import { deleteTransaction } from '../services/transactionService.js';

export default function Card({
  transaction,
  handleUpdateTransaction,
  updateCurrentMonthYear,
}) {
  const { _id, category, description, type, value, yearMonth } = transaction;
  const style = {
    positive: {
      backgroundColor: 'green',
      borderRadius: '5px',
      display: 'inline-flex',
      width: '50%',
      margin: '2px 25%',
      alignItems: 'center',
      position: 'relative',
    },
    negative: {
      backgroundColor: '#FA8072	',
      borderRadius: '5px',
      display: 'inline-flex',
      width: '50%',
      margin: '2px 25%',
      alignItems: 'center',
      position: 'relative',
    },
  };

  function handleUpdate(event) {
    handleUpdateTransaction(transaction);
  }
  function handleDelete(event) {
    deleteTransaction(_id);
    updateCurrentMonthYear(yearMonth);
  }

  const balanceColor = type === '+' ? style.positive : style.negative;
  return (
    <div key={_id} style={balanceColor}>
      <span style={{ fontWeight: 'bold', padding: '5px 20px' }}>01</span>
      <div>
        <p style={{ padding: '0px', margin: '2px', fontWeight: 'bold' }}>
          {category}
        </p>
        <p style={{ padding: '0px', margin: '2px' }}>{description} </p>
      </div>
      <span style={{ fontSize: '25px', position: 'absolute', left: '60%' }}>
        R$ {value.toFixed(2)}
      </span>
      <i
        onClick={handleUpdate}
        className="material-icons activeModal"
        style={{ position: 'absolute', right: '13%' }}
      >
        create
      </i>
      <i
        onClick={handleDelete}
        className="material-icons"
        style={{ position: 'absolute', right: '5%' }}
        onClick={handleDelete}
      >
        delete
      </i>
    </div>
  );
}
