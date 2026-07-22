import { useState } from "react";
import { addTransaction, updateTransaction } from "../db/budgetDB";

export default function IncomeForm({ onSaved, editingItem, month }) {
  const [title, setTitle] = useState(editingItem?.title || ""); const [amount, setAmount] = useState(editingItem?.amount || "");
  const [subtype, setSubtype] = useState(editingItem?.subtype || "regular"); const [date, setDate] = useState(editingItem?.date || `${editingItem?.month || month}-01`);
  async function save() {
    if (!title.trim() || !amount || !date) return;
    const transaction = { title: title.trim(), amount: Number(amount), subtype, date, month: date.slice(0, 7) };
    if (editingItem) await updateTransaction({ ...editingItem, ...transaction }); else await addTransaction({ ...transaction, type: "income", createdAt: new Date().toISOString() });
    onSaved();
  }
  return <div className="form"><input placeholder="Nazwa" value={title} onChange={(e) => setTitle(e.target.value)} /><input type="number" min="0" step="0.01" placeholder="Kwota" value={amount} onChange={(e) => setAmount(e.target.value)} /><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><select value={subtype} onChange={(e) => setSubtype(e.target.value)}><option value="regular">Regularne</option><option value="oneTime">Jednorazowe</option><option value="investment">Inwestycyjne</option></select><button onClick={save}>{editingItem ? "AKTUALIZUJ" : "ZAPISZ"}</button></div>;
}
