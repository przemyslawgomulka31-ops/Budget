import { useEffect, useMemo, useState } from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import ExpenseForm from "../components/ExpenseForm";
import MonthSelector from "../components/MonthSelector";
import Toast from "../components/Toast";
import { addTransaction, deleteTransaction, getRegularExpenses, getTransactions } from "../db/budgetDB";
import { EXPENSE_CATEGORIES } from "../utils/autoCategories";
import { localMonth } from "../utils/date";

const formatDate = (value) => new Date(value).toLocaleDateString("pl-PL", { day: "numeric", month: "long" });
const money = (value) => `${Number(value).toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł`;
export default function Expenses() {
  const [items, setItems] = useState([]); const [month, setMonth] = useState(localMonth());
  const [showForm, setShowForm] = useState(false); const [editingItem, setEditingItem] = useState(null); const [query, setQuery] = useState(""); const [category, setCategory] = useState(""); const [toast, setToast] = useState("");
  async function loadData() { setItems((await getTransactions()).filter((item) => item.type === "expense" && item.month === month).sort((a, b) => (b.date || "").localeCompare(a.date || ""))); }
  async function generateMonth() { const all = await getTransactions(); if (all.some((item) => item.type === "expense" && item.month === month)) return; for (const item of await getRegularExpenses()) await addTransaction({ title: item.title, amount: item.amount, type: "expense", subtype: "regular", month, date: `${month}-01`, category: item.category || "Inne", generated: true, createdAt: new Date().toISOString() }); }
  useEffect(() => { async function init() { await generateMonth(); await loadData(); } init(); }, [month]);
  const visibleItems = useMemo(() => items.filter((item) => (!category || item.category === category) && item.title.toLocaleLowerCase("pl-PL").includes(query.toLocaleLowerCase("pl-PL"))), [items, query, category]);
  function saved(message) { loadData(); setShowForm(false); setEditingItem(null); setToast(message); }
  return <div className="screen"><h1>Wydatki</h1><MonthSelector month={month} setMonth={setMonth} /><button className="menu-button compact-button" onClick={() => { setEditingItem(null); setShowForm(true); }}>+ Dodaj wydatek</button>{showForm && <ExpenseForm month={month} onSaved={saved} />}{editingItem && <div className="modal"><div className="modal-card"><button className="modal-close" onClick={() => setEditingItem(null)}>×</button><h2>Edytuj wydatek</h2><ExpenseForm key={editingItem.id} editingItem={editingItem} month={month} onSaved={(message) => { setEditingItem(null); saved(message); }} /></div></div>}<div className="filters"><label className="search"><FaSearch /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Szukaj sklepu lub wydatku" /></label><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="">Wszystkie kategorie</option>{EXPENSE_CATEGORIES.map((name) => <option key={name}>{name}</option>)}</select></div><div className="transaction-list">{visibleItems.map((item) => <article className="transaction-card" key={item.id}><div><h3>🛒 {item.title}</h3><p>{item.category || "Inne"} · {formatDate(item.date || `${item.month}-01`)}</p></div><div className="transaction-right"><strong>{money(item.amount)}</strong><div><button className="edit-btn" aria-label="Edytuj" onClick={() => setEditingItem(item)}><FaEdit /></button><button className="delete-btn" aria-label="Usuń" onClick={async () => { await deleteTransaction(item.id); await loadData(); setToast("Usunięto wydatek"); }}><FaTrash /></button></div></div></article>)}{!visibleItems.length && <p className="empty-state">Brak wydatków spełniających kryteria.</p>}</div><Toast message={toast} onClose={() => setToast("")} /></div>;
}
