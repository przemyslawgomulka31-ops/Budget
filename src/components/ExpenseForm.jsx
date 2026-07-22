import { useState } from "react";
import { addTransaction, updateTransaction } from "../db/budgetDB";
import { categorizeExpense, EXPENSE_CATEGORIES, normalizeMerchant } from "../utils/autoCategories";

export default function ExpenseForm({ onSaved, editingItem, month }) {
  const [title, setTitle] = useState(editingItem?.title || "");
  const [amount, setAmount] = useState(editingItem?.amount || "");
  const [category, setCategory] = useState(editingItem?.category || "Inne");
  const [subtype, setSubtype] = useState(editingItem?.subtype || "regular");
  const [date, setDate] = useState(editingItem?.date || `${editingItem?.month || month}-01`);

  async function save() {
    if (!title.trim() || !amount || !date) return;
    const transaction = { title: normalizeMerchant(title), amount: Number(amount), subtype, category, date, month: date.slice(0, 7) };
    if (editingItem) await updateTransaction({ ...editingItem, ...transaction });
    else await addTransaction({ ...transaction, type: "expense", createdAt: new Date().toISOString() });
    onSaved();
  }

  return <div className="form">
    <input placeholder="Nazwa wydatku" value={title} onChange={(e) => { setTitle(e.target.value); setCategory(categorizeExpense(e.target.value).category); }} />
    <input type="number" min="0" step="0.01" placeholder="Kwota" value={amount} onChange={(e) => setAmount(e.target.value)} />
    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
    <select value={subtype} onChange={(e) => setSubtype(e.target.value)}><option value="regular">Regularne</option><option value="daily">Codzienne</option><option value="unplanned">Niezaplanowane</option><option value="investment">Inwestycyjne</option></select>
    <select value={category} onChange={(e) => setCategory(e.target.value)}>{EXPENSE_CATEGORIES.map((name) => <option key={name}>{name}</option>)}</select>
    <button onClick={save}>{editingItem ? "AKTUALIZUJ" : "ZAPISZ"}</button>
  </div>;
}
