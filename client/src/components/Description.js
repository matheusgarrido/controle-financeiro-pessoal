import React, { useState, useEffect } from 'react';

export default function Description({ transactions }) {
  const [launch, setLaunch] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setLaunch(transactions.length);

    //Incomes
    const allIncomes = transactions
      .filter((element) => element.type === '+')
      .map((element) => element.value);
    let sumIncome = 0;
    allIncomes.forEach((value) => {
      sumIncome += value;
    });
    setIncome(sumIncome);

    //Expenses
    const allExpenses = transactions.filter((element) => element.type === '-');
    let sumExpense = 0;
    allExpenses.forEach((element) => {
      sumExpense += element.value;
    });
    setExpense(sumExpense);
    setBalance(sumIncome - sumExpense);
  }, [transactions]);

  const style = {
    positive: {
      color: 'green',
      fontWeight: 'bold',
    },
    negative: {
      color: 'red',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <label style={{ padding: '20px', fontSize: '20px', color: 'black' }}>
        Lançamentos: {launch}
      </label>
      <label style={{ padding: '20px', fontSize: '20px', color: 'black' }}>
        Receitas:<span style={style.positive}> R$ {income.toFixed(2)}</span>
      </label>
      <label style={{ padding: '20px', fontSize: '20px', color: 'black' }}>
        Despesas:<span style={style.negative}> R$ {expense.toFixed(2)}</span>
      </label>
      <label style={{ padding: '20px', fontSize: '20px', color: 'black' }}>
        Saldo:
        {balance > 0 && (
          <span style={style.positive}> R$ {balance.toFixed(2)}</span>
        )}
        {balance < 0 && (
          <span style={style.negative}> R$ {balance.toFixed(2)}</span>
        )}
        {balance === 0 && <span>R$ {balance.toFixed(2)}</span>}
      </label>
    </div>
  );
}
