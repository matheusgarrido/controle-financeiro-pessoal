import React, { useState } from 'react';
import Filter from './components/Filter.js';

import List from './components/List.js';
import Description from './components/Description.js';
import { getOneMonthYear } from './services/transactionService.js';

export default function App() {
  const [currentMonthYear, setCurrentMonthYear] = useState();
  const [filteredMonthYearList, setFilteredMonthYearList] = useState([]);
  const [transactions, setTransactions] = useState({
    length: 0,
    transactions: [],
  });

  async function updateCurrentMonthYear(monthYear) {
    setCurrentMonthYear(monthYear);
    const res = await getOneMonthYear(monthYear);
    setTransactions(res);
    setFilteredMonthYearList(res);
  }

  function updateFilteredMonthYearList(monthYear) {
    setFilteredMonthYearList(monthYear);
  }

  return (
    <>
      <h1>Desafio Final do Bootcamp Full Stack</h1>
      <h2>Controle Financeiro Pessoal</h2>
      <Filter
        currentMonthYear={currentMonthYear}
        updateCurrentMonthYear={updateCurrentMonthYear}
      />
      <Description transactions={filteredMonthYearList} />
      <List
        transactions={transactions}
        updateFilteredMonthYearList={updateFilteredMonthYearList}
        updateCurrentMonthYear={updateCurrentMonthYear}
      />

      <p style={{ textAlign: 'center' }}>
        Desenvolvido por Matheus Garrido &copy; 2020
      </p>
    </>
  );
}
