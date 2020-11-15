import React, { useState, useEffect } from 'react';
import { getAllMonthYear } from '../services/transactionService.js';
import appModule from './app.module.css';

export default function Filter({ currentMonthYear, updateCurrentMonthYear }) {
  const [listMonthYear, setListMonthYear] = useState([
    <option>Carregando...</option>,
  ]);

  const monthsNames = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  useEffect(async () => {
    const allMonthYear = await getAllMonthYear();
    let list = [];
    allMonthYear.map((monthYear) => {
      const month = parseInt(monthYear.substring(5));
      const year = monthYear.substring(0, 4);
      const monthInOption = monthsNames[month - 1] + '/' + year;
      list.push(<option value={monthYear}>{monthInOption}</option>);
    });
    setListMonthYear(list);
    let today = new Date().getFullYear() + '-' + (new Date().getMonth() + 1);
    updateCurrentMonthYear(today);
  }, []);

  function handleSelect(event) {
    const selectedValue = event.target.value;
    updateCurrentMonthYear(selectedValue);
  }

  function handleSelectButton(event) {
    let indexValue = listMonthYear.findIndex((element) => {
      if (element.props.value === currentMonthYear) return element;
    });
    const lengthList = listMonthYear.length;
    const { id } = event.target;
    switch (id) {
      case 'previousMonthYear':
        indexValue--;
        break;
      case 'nextMonthYear':
        indexValue++;
        break;
    }
    if (indexValue >= 0 && indexValue < lengthList) {
      const newMonthYear = listMonthYear[indexValue].props.value;
      updateCurrentMonthYear(newMonthYear);
    }
  }

  return (
    <div
      style={{ display: 'inline-flex', margin: 'auto', width: '100%' }}
      onClick={handleSelectButton}
    >
      <button
        className={appModule.cursor}
        id="previousMonthYear"
        style={{
          marginLeft: 'auto',
          width: '40px',
          fontWeight: 'bold',
          backgroundColor: 'lightgreen',
        }}
      >
        &lt;
      </button>
      <select
        onChange={handleSelect}
        value={currentMonthYear}
        style={{ display: 'flex', width: '150px', border: '1px solid black' }}
      >
        {listMonthYear}
      </select>
      <button
        id="nextMonthYear"
        onClick={handleSelectButton}
        className={appModule.cursor}
        style={{
          marginRight: 'auto',
          width: '40px',
          fontWeight: 'bold',
          backgroundColor: 'lightgreen',
        }}
      >
        &gt;
      </button>
    </div>
  );
}
