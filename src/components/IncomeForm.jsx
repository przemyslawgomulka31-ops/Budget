import { useState } from "react";
import { FaCalendarAlt, FaTag, FaWallet } from "react-icons/fa";
import { addTransaction, updateTransaction } from "../db/budgetDB";

export default function IncomeForm({ onSaved, editingItem, month }) {
  const [title, setTitle] = useState(editingItem?.title || ""); const [amount, setAmount] = useState(editingItem?.amount || ""); const [subtype, setSubtype] = useState(editingItem?.subtype || "regular"); const [date, setDate] = useState(editingItem?.date || `${editingItem?.month || month}-01`);
  async function save() { if (!title.trim() || !amount || !date) return; const transaction = { title: title.trim(), amount: Number(amount), subtype, date, month: date.slice(0, 7) }; if (editingItem) await updateTransaction({ ...editingItem, ...transaction }); else await addTransaction({ ...transaction, type: "income", createdAt: new Date().toISOString() }); onSaved(editingItem ? "Zaktualizowano dochód" : "Dodano dochód"); }
  return <div className="form"><label><FaTag /> Nazwa<input placeholder="np. Pensja" value={title} onChange={(e) => setTitle(e.target.value)} /></label><label><FaWallet /> Kwota<input type="number" min="0" step="0.01" placeholder="0,00" value={amount} onChange={(e) => setAmount(e.target.value)} /></label><label><FaCalendarAlt /> Data<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label><label>Typ<select value={subtype} onChange={(e) => setSubtype(e.target.value)}><option value="regular">Regularny</option><option value="oneTime">Jednorazowy</option><option value="investment">Inwestycyjny</option></select></label><button onClick={save}>{editingItem ? "Zapisz zmiany" : "Dodaj dochód"}</button></div>;
}
