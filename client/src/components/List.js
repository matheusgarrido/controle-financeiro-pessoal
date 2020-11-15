import React, { useEffect, useState } from 'react';
import Card from './Card.js';
import Modal from './Modal.js';

import appModule from './app.module.css';

export default function CardList({
  transactions,
  updateFilteredMonthYearList,
  updateCurrentMonthYear,
}) {
  const [transactionsList, setTransactionsList] = useState([]);
  const [filter, setFilter] = useState('');
  const [modal, setModal] = useState(null);
  const [updateTransaction, setUpdateTransaction] = useState({
    description: '',
    category: '',
    value: 0,
    date: '',
  });

  function handleUpdateTransaction(res) {
    setUpdateTransaction(res);
    updateModal('edit');
  }

  useEffect(() => {
    const newList = [];
    const allTransactions = transactions.transactions.filter((element) => {
      return element.description.includes(filter);
    });
    allTransactions.forEach((transaction) => {
      newList.push(
        <Card
          transaction={transaction}
          key={transaction._id}
          handleUpdateTransaction={handleUpdateTransaction}
          updateCurrentMonthYear={updateCurrentMonthYear}
        />
      );
    });
    updateFilteredMonthYearList(allTransactions);
    setTransactionsList(newList);
  }, [transactions, filter]);

  function handleFilter(event) {
    const value = event.target.value;
    setFilter(value);
  }

  function handleModal(event) {
    // const typeModal = event.target.id;
    // console.log(typeModal);
    updateModal('add');
  }

  function updateModal(state) {
    if (state) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    setModal(state);
  }

  return (
    <div style={{ marginBottom: '10px' }}>
      <div id="filterTransaction" style={{ display: 'flex' }}>
        <button
          id="add"
          data-target="modal"
          class="btn modal-trigger activeModal"
          onClick={handleModal}
          style={{ marginLeft: 'auto' }}
        >
          + Novo Lançamento
        </button>
        <input
          type="text"
          name="filter"
          id="filter"
          placeholder="Filtro"
          style={{ width: '30%', marginLeft: '10px', marginRight: 'auto' }}
          onChange={handleFilter}
        />
      </div>
      <Modal
        typeModal={modal}
        updateModal={updateModal}
        updateTransaction={updateTransaction}
        updateCurrentMonthYear={updateCurrentMonthYear}
      />
      {transactionsList}
      {transactionsList.length === 0 && (
        <p style={{ textAlign: 'center' }}>
          Não foram encontrados resuldados para a busca.
        </p>
      )}
    </div>
  );
}
