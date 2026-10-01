import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import MonthSelector from "../components/MonthSelector";
import IncomeForm from "../components/IncomeForm";
import Toast from "../components/Toast";
import { addTransaction, deleteTransaction, getRegularIncome, getTransactions } from "../db/budgetDB";
import { localMonth } from "../utils/date";
const money = (value) => `${Number(value).toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł`;
const formatDate = (value) => new Date(value).toLocaleDateString("pl-PL", { day: "numeric", month: "long" });
const types = { regular: "Regularny", oneTime: "Jednorazowy", investment: "Dochód z inwestycji" };
export default function Income() {
  const [items, setItems] = useState([]); const [month, setMonth] = useState(localMonth()); const [showForm, setShowForm] = useState(false); const [editing, setEditing] = useState(null); const [toast, setToast] = useState("");
  async function load() { setItems((await getTransactions()).filter((item) => item.type === "income" && item.month === month).sort((a, b) => (b.date || "").localeCompare(a.date || ""))); }
  async function generate() { const data = await getTransactions(); if (data.some((item) => item.type === "income" && item.month === month)) return; for (const item of await getRegularIncome()) await addTransaction({ title: item.title, amount: item.amount, type: "income", subtype: "regular", month, date: `${month}-01`, generated: true, createdAt: new Date().toISOString() }); }
  useEffect(() => { async function init() { await generate(); await load(); } init(); }, [month]);
  function saved(message) { load(); setShowForm(false); setEditing(null); setToast(message); }
  return <div className="screen"><h1>Dochody</h1><MonthSelector month={month} setMonth={setMonth} /><button className="menu-button compact-button" onClick={() => { setEditing(null); setShowForm(true); }}>+ Dodaj dochód</button>{showForm && <IncomeForm month={month} onSaved={saved} />}{editing && <div className="modal"><div className="modal-card"><button className="modal-close" onClick={() => setEditing(null)}>×</button><h2>Edytuj dochód</h2><IncomeForm key={editing.id} editingItem={editing} month={month} onSaved={saved} /></div></div>}<div className="transaction-list">{items.map((item) => <article className="transaction-card income-card" key={item.id}><div><h3>↗ {item.title}</h3><p>{types[item.subtype] || item.subtype} · {formatDate(item.date || `${item.month}-01`)}</p></div><div className="transaction-right"><strong>+ {money(item.amount)}</strong><div><button className="edit-btn" aria-label="Edytuj" onClick={() => setEditing(item)}><FaEdit /></button><button className="delete-btn" aria-label="Usuń" onClick={async () => { await deleteTransaction(item.id); await load(); setToast("Usunięto dochód"); }}><FaTrash /></button></div></div></article>)}{!items.length && <p className="empty-state">Brak dochodów w tym miesiącu.</p>}</div><Toast message={toast} onClose={() => setToast("")} /></div>;
}
