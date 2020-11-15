import React, { useState, useEffect } from 'react';
import appModule from './app.module.css';
import {
  patchTransaction,
  createTransaction,
} from '../services/transactionService.js';

export default function Modal({
  typeModal,
  updateModal,
  updateTransaction,
  updateCurrentMonthYear,
}) {
  const style = {
    open: {
      display: 'block',
      opacity: '1',
      zIndex: '1003',
      top: '20%',
      transform: 'scaleX(1) scaleY(1)',
      boxShadow: '100% 100% teal',
    },
    closed: {
      display: 'none',
      opacity: '0',
    },
  };

  const [open, setOpen] = useState(style.closed);
  const [radioState, setRadioState] = useState('-');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(null);
  const [date, setDate] = useState('');

  function handleDescription(event) {
    setDescription(event.target.value);
  }
  function handleCategory(event) {
    setCategory(event.target.value);
  }
  function handleValue(event) {
    setValue(parseInt(event.target.value));
  }
  function handleDate(event) {
    setDate(event.target.value);
  }

  useEffect(() => {
    const stateModal = typeModal !== null ? style.open : style.closed;
    setOpen(stateModal);
    if (typeModal === 'add') {
      setDescription('');
      setCategory('');
      setValue(parseInt(''));
      const today = `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`;
      setDate(today);
    } else if (typeModal === 'edit') {
      setDescription(updateTransaction.description);
      setCategory(updateTransaction.category);
      setValue(parseInt(updateTransaction.value));
      setDate(updateTransaction.yearMonthDay);
    }
    if (typeModal !== null) {
      let btnBool = false;
      const classActiveModal = document.getElementsByClassName('activeModal');
      Array.prototype.forEach.call(classActiveModal, function (element) {
        element.addEventListener('click', () => {
          btnBool = true;
        });
      });
      window.addEventListener('click', function (e) {
        if (!document.getElementById('modal').contains(e.target) && !btnBool) {
          handleClose();
        }
        if (btnBool) {
          btnBool = false;
        }
      });
    }
  }, [typeModal]);

  function handleClose() {
    updateModal(null);
  }

  function handleRadio(event) {
    setRadioState(event.target.value);
  }
  function handleSubmit(event) {
    if (description && category && radioState && date && !isNaN(value)) {
      let yearMonth = '';
      if (typeModal === 'add') {
        const json = {
          day: parseInt(date.substring(8)),
          month: parseInt(date.substring(7, 2)),
          value: parseInt(value),
          year: parseInt(date.substring(0, 4)),
          yearMonth: date.substring(0, 7),
          yearMonthDay: date,
          description,
          category,
          type: radioState,
        };
        createTransaction(json);
        yearMonth = json.yearMonth;
      } else {
        const json = {
          day: parseInt(date.substring(8)),
          month: parseInt(date.substring(7, 2)),
          value: parseInt(value),
          year: parseInt(date.substring(0, 4)),
          yearMonth: date.substring(0, 7),
          yearMonthDay: date,
          description,
          category,
        };
        const { _id } = updateTransaction;
        patchTransaction(_id, json);
        yearMonth = json.yearMonth;
      }
      updateCurrentMonthYear(yearMonth);
      updateModal(null);
    }
  }

  return (
    <div id="modal" className="modal" style={open}>
      <div className="modal-content">
        <h4>
          Inclusão de lançamento{' '}
          <button
            className={appModule.cursor}
            style={{
              float: 'right',
              padding: '0px 10px',
              backgroundColor: 'red',
              color: 'white',
            }}
            onClick={handleClose}
          >
            X
          </button>
        </h4>

        {typeModal === 'add' && (
          <div onChange={handleRadio}>
            <label>
              <input name="type" type="radio" value="-" defaultChecked />
              <span style={{ color: 'red', fontWeight: 'bold' }}>Despesa</span>
            </label>
            <label>
              <input name="type" type="radio" value="+" />
              <span style={{ color: 'green', fontWeight: 'bold' }}>
                Receita
              </span>
            </label>
          </div>
        )}
        <label htmlFor="description">Descrição</label>
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          onChange={handleDescription}
          value={description}
        />
        <label htmlFor="category">Categoria</label>
        <input
          type="text"
          name="category"
          placeholder="Categoria"
          onChange={handleCategory}
          value={category}
        />
        <label htmlFor="value">Valor</label>
        <input
          type="number"
          name="description"
          placeholder="0"
          min="0"
          onChange={handleValue}
          value={value}
        />
        <label htmlFor="date">Data</label>
        <input type="date" name="date" onChange={handleDate} value={date} />
      </div>
      <div className="modal-footer">
        <button
          style={{ padding: '5px' }}
          className={appModule.cursor}
          disabled={!value || !description || !radioState || !category || !date}
          onClick={handleSubmit}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
