import { useState } from "react";
import { useEffect } from "react";

import {addTransaction,updateTransaction,} from "../db/budgetDB";

export default function IncomeForm({
  onSaved,
  editingItem,
}) {
  const [title, setTitle] =
  useState("");

const [amount, setAmount] =
  useState("");

const [subtype, setSubtype] =
  useState("regular");

useEffect(() => {
  if (editingItem) {
    setTitle(editingItem.title);

    setAmount(
      editingItem.amount
    );

    setSubtype(
      editingItem.subtype
    );
  }
}, [editingItem]);

async function save() {
  if (!title || !amount) return;

  if (editingItem) {
    await updateTransaction({
      ...editingItem,

      title,

      amount:
        Number(amount),

      subtype,
    });
  } else {
    await addTransaction({
      title,

      amount:
        Number(amount),

      type: "income",

      subtype,

      month:
        new Date()
          .toISOString()
          .slice(0, 7),

      createdAt:
        new Date().toISOString(),
    });
  }

  setTitle("");
  setAmount("");

  onSaved();
}

  return (
    <div className="form">
      <input
        placeholder="Nazwa"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Kwota"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />

      <select
        value={subtype}
        onChange={(e) =>
          setSubtype(e.target.value)
        }
      >
        <option value="regular">
          Regularne
        </option>

        <option value="oneTime">
          Jednorazowe
        </option>

        <option value="investment">
  Inwestycyjne
</option>
</select>
   <button onClick={save}>
  {editingItem
    ? "AKTUALIZUJ"
    : "ZAPISZ"}
</button>
    </div>
  );
}