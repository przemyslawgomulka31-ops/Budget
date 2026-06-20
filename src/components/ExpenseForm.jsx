import {useState,useEffect,} from "react";
import {addTransaction,updateTransaction,} from "../db/budgetDB";
import {detectCategory,} from "../utils/autoCategories";


export default function ExpenseForm({
  onSaved,
  editingItem,
}) {
  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

const [category, setCategory] =
  useState("Inne");

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

    setCategory(
      editingItem.category
    );
  }
}, [editingItem]);

  async function save() {
  if (!title || !amount)
    return;

  if (editingItem) {
    await updateTransaction({
      ...editingItem,

      title,

      amount:
        Number(amount),

      subtype,

      category,
    });
  } else {
    await addTransaction({
      title,

      amount:
        Number(amount),

      type: "expense",

      subtype,

      category,

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
  placeholder="Nazwa wydatku"
  value={title}
  onChange={(e) => {
    const value =
      e.target.value;

    setTitle(value);

    setCategory(
      detectCategory(
        value
      )
    );
  }}
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
          setSubtype(
            e.target.value
          )
        }
      >
        <option value="regular">
          Regularne
        </option>

        <option value="daily">
          Codzienne
        </option>

        <option value="unplanned">
          Niezaplanowane
        </option>

<option value="investment">
  Inwestycyjne
</option>
      </select>

<select
  value={category}
  onChange={(e) =>
    setCategory(
      e.target.value
    )
  }
>
  <option>Jedzenie</option>

  <option>Transport</option>

  <option>Dom</option>

  <option>Rozrywka</option>

  <option>Zdrowie</option>

  <option>Sport</option>

  <option>Auto</option>

  <option>Finanse</option>

  <option>Inwestycje</option>

  <option>Podróże</option>

  <option>Fotografia</option>

  <option>Piłka nożna</option>

  <option>Randki</option>

  <option>Zakupy internetowe</option>

  <option>Głupoty</option>

  <option>Inne</option>
</select>

      <button onClick={save}>
  {editingItem
    ? "AKTUALIZUJ"
    : "ZAPISZ"}
</button>
    </div>
  );
}