import { useState } from "react";
import { FaCalendarAlt, FaFolder, FaShoppingCart, FaWallet } from "react-icons/fa";
import { addTransaction, updateTransaction } from "../db/budgetDB";
import { categorizeExpense, EXPENSE_CATEGORIES, normalizeMerchant } from "../utils/autoCategories";

export default function ExpenseForm({ onSaved, editingItem, month }) {
  const [title, setTitle] = useState(editingItem?.title || "");
  const [amount, setAmount] = useState(editingItem?.amount || "");
  const [category, setCategory] = useState(editingItem?.category || "Inne");
  const [subtype, setSubtype] = useState(editingItem?.subtype || "regular");
  const [date, setDate] = useState(editingItem?.date || `${editingItem?.month || month}-01`);
  const suggestion = title.trim() ? categorizeExpense(title) : null;
  async function save() {
    if (!title.trim() || !amount || !date) return;
    const transaction = { title: normalizeMerchant(title), amount: Number(amount), subtype, category, date, month: date.slice(0, 7) };
    if (editingItem) await updateTransaction({ ...editingItem, ...transaction }); else await addTransaction({ ...transaction, type: "expense", createdAt: new Date().toISOString() });
    onSaved(editingItem ? "Zaktualizowano wydatek" : "Dodano wydatek");
  }
  return <div className="form expense-form">
    <label><FaShoppingCart /> Nazwa<input placeholder="np. Żabka" value={title} onChange={(e) => { setTitle(e.target.value); setCategory(categorizeExpense(e.target.value).category); }} /></label>
    {suggestion?.title && normalizeMerchant(title) !== title.trim() && <p className="autofill-hint">Podpowiedź: <strong>{suggestion.title}</strong> · {suggestion.category}</p>}
    <label><FaWallet /> Kwota<input type="number" min="0" step="0.01" placeholder="0,00" value={amount} onChange={(e) => setAmount(e.target.value)} /></label>
    <label><FaCalendarAlt /> Data<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
    <label><FaFolder /> Kategoria<select value={category} onChange={(e) => setCategory(e.target.value)}>{EXPENSE_CATEGORIES.map((name) => <option key={name}>{name}</option>)}</select></label>
    <select className="secondary-select" aria-label="Typ wydatku" value={subtype} onChange={(e) => setSubtype(e.target.value)}><option value="regular">Regularny</option><option value="daily">Codzienny</option><option value="unplanned">Niezaplanowany</option><option value="investment">Inwestycyjny</option></select>
    <button onClick={save}>{editingItem ? "Zapisz zmiany" : "Dodaj wydatek"}</button>
  </div>;
}
