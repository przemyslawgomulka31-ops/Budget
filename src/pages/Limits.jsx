/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import MonthSelector from "../components/MonthSelector";
import Toast from "../components/Toast";
import { EXPENSE_CATEGORIES } from "../utils/autoCategories";
import { getLimits, getTransactions, saveLimit } from "../db/budgetDB";

const money = (value) => `${Number(value || 0).toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł`;
export default function Limits() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); const [limits, setLimits] = useState({}); const [spent, setSpent] = useState({}); const [editing, setEditing] = useState(null); const [draft, setDraft] = useState(""); const [toast, setToast] = useState("");
  async function load() { const [saved, transactions] = await Promise.all([getLimits(), getTransactions()]); setLimits(Object.fromEntries(saved.map((item) => [item.category, item.amount]))); const sums = {}; transactions.filter((item) => item.type === "expense" && item.month === month).forEach((item) => { const category = item.category || "Inne"; sums[category] = (sums[category] || 0) + Number(item.amount || 0); }); setSpent(sums); }
  useEffect(() => { load(); }, [month]);
  async function save(category) { const amount = Number(draft || 0); await saveLimit({ category, amount }); setLimits({ ...limits, [category]: amount }); setEditing(null); setToast(`Zapisano limit: ${category}`); }
  return <div className="screen"><h1>Limity budżetowe</h1><MonthSelector month={month} setMonth={setMonth} /><p className="page-hint">Postęp dla wybranego miesiąca.</p>{EXPENSE_CATEGORIES.filter((category) => category !== "Inne").map((category) => { const limit = Number(limits[category] || 0); const used = Number(spent[category] || 0); const percent = limit ? Math.round((used / limit) * 100) : 0; const exceeded = limit && used > limit; return <article className="limit-card" key={category}><div className="limit-heading"><strong>{category}</strong><span className={exceeded ? "danger" : ""}>{limit ? `${money(used)} / ${money(limit)}` : `${money(used)} · brak limitu`}</span></div>{limit > 0 && <><div className="progress"><div className={exceeded ? "progress-fill danger-fill" : "progress-fill"} style={{ width: `${Math.min(percent, 100)}%` }} /></div><small className={exceeded ? "danger" : ""}>{exceeded ? `Przekroczono o ${money(used - limit)}` : `${percent}% · pozostało ${money(Math.max(limit - used, 0))}`}</small></>}{editing === category ? <div className="limit-editor"><input autoFocus type="number" min="0" step="0.01" value={draft} onChange={(e) => setDraft(e.target.value)} /><button onClick={() => save(category)}>Zapisz</button><button className="text-button" onClick={() => setEditing(null)}>Anuluj</button></div> : <button className="text-button edit-limit" onClick={() => { setEditing(category); setDraft(limits[category] ?? ""); }}><FaPen /> Edytuj limit</button>}</article>; })}<Toast message={toast} onClose={() => setToast("")} /></div>;
}
