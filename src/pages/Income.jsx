import { useEffect } from "react";
import { useState } from "react";
import MonthSelector from "../components/MonthSelector";
import IncomeForm from "../components/IncomeForm";


import {FaTrash, FaEdit,} from "react-icons/fa";
import {getTransactions, getRegularIncome, addTransaction, deleteTransaction,} from "../db/budgetDB";

export default function Income() {
  const [items, setItems] =
    useState([]);

const [month, setMonth] =
  useState(
    new Date()
      .toISOString()
      .slice(0, 7)
  );
const [editingItem, setEditingItem] = useState(null);

  const [showForm, setShowForm] =
    useState(false);


async function generateMonth() {
  const all = await getTransactions();

  const currentIncome = all.filter(
    (t) =>
      t.type === "income" &&
      t.month === month
  );

  if (currentIncome.length > 0)
    return;

  const regular =
    await getRegularIncome();

  for (const item of regular) {
    await addTransaction({
      title: item.title,

      amount: item.amount,

      type: "income",

      subtype: "regular",

      month: month,

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
      t.type === "income" &&
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
      <h1>DOCHODY</h1>

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
 <IncomeForm
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
  <div>Typ</div>
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
      {item.subtype}
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