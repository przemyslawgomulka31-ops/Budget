import { useState } from "react";
import {
  updateTransaction,
} from "../db/budgetDB";

export default function EditTransactionModal({
  transaction,
  onClose,
  onSaved,
}) {
  const [title, setTitle] =
    useState(
      transaction.title
    );

  const [amount, setAmount] =
    useState(
      transaction.amount
    );

  async function save() {
    await updateTransaction({
      ...transaction,

      title,

      amount:
        Number(amount),
    });

    onSaved();
    onClose();
  }

  return (
    <div className="modal">
      <div className="card">
        <h2>EDYTUJ</h2>

        <input
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <input
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
        />

        <button
          onClick={save}
        >
          ZAPISZ
        </button>

        <button
          onClick={onClose}
        >
          ANULUJ
        </button>
      </div>
    </div>
  );
}