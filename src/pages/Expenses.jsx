import { useEffect, useState } from "react";
import { FaTrash, FaEdit,} from "react-icons/fa";
import ExpenseForm from "../components/ExpenseForm";
import MonthSelector from "../components/MonthSelector";
import EditTransactionModal from "../components/EditTransactionModal";

import {getTransactions, getRegularExpenses, addTransaction, deleteTransaction,} from "../db/budgetDB";


export default function Expenses() {
  const [items, setItems] =
    useState([]);

  const [showForm, setShowForm] =
    useState(false);

const [editingItem, setEditingItem] =
  useState(null);

  const [month, setMonth] =
    useState(
      new Date()
        .toISOString()
        .slice(0, 7)
    );

  async function generateMonth() {
    const all =
      await getTransactions();

    const currentExpenses =
      all.filter(
        (t) =>
          t.type === "expense" &&
          t.month === month
      );

    if (
      currentExpenses.length > 0
    )
      return;

    const regular =
      await getRegularExpenses();

    for (const item of regular) {
      await addTransaction({
        title: item.title,

        amount: item.amount,

        type: "expense",

        subtype: "regular",

        month,

        generated: true,

        createdAt:
          new Date().toISOString(),
      });
    }
  }

  async function loadData() {
    const data =
      await getTransactions();

    setItems(
      data.filter(
        (t) =>
          t.type === "expense" &&
          t.month === month
      )
    );
  }

  useEffect(() => {
    async function init() {
      await generateMonth();
      await loadData();
    }

    init();
  }, [month]);

  return (
    <div className="screen">
      <h1>WYDATKI</h1>

      <MonthSelector
        month={month}
        setMonth={setMonth}
      />

      <button
        className="menu-button"
        onClick={() =>
          setShowForm(
            !showForm
          )
        }
      >
        + DODAJ
      </button>

      {showForm && (
  <ExpenseForm
    editingItem={editingItem}
    onSaved={() => {
      loadData();
      setShowForm(false);
      setEditingItem(null);
    }}
  />
)}
<div className="table-header">
  <div>Nazwa</div>
  <div>Kwota</div>
  <div>Kategoria</div>
  <div>Akcje</div>
</div>

{items.map((item) => (
  <div
    key={item.id}
    className="table-row"
  >
    <div className="table-title">
      {item.title}
    </div>

    <div className="table-amount">
      {item.amount} zł
    </div>

    <div className="table-type">
      {item.category}
    </div>

    <div className="table-actions">

      <button
  className="edit-btn"
  onClick={() => {
    setEditingItem(item);
    setShowForm(true);
  }}
>
  <FaEdit />
</button>

      <button
        className="delete-btn"
        onClick={async () => {
          await deleteTransaction(
            item.id
          );

          loadData();
        }}
      >
        <FaTrash />
      </button>

    </div>
  </div>
))}    </div>
  );
}