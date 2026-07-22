/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import MonthSelector from "../components/MonthSelector";
import { EXPENSE_CATEGORIES } from "../utils/autoCategories";
import { getLimits, getTransactions, saveLimit } from "../db/budgetDB";

const money = (value) => `${Number(value || 0).toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł`;

export default function Limits() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [limits, setLimits] = useState({}); const [spent, setSpent] = useState({}); const [message, setMessage] = useState("");
  async function load() {
    const [saved, transactions] = await Promise.all([getLimits(), getTransactions()]);
    setLimits(Object.fromEntries(saved.map((item) => [item.category, item.amount])));
    const sums = {}; transactions.filter((item) => item.type === "expense" && item.month === month).forEach((item) => { sums[item.category || "Inne"] = (sums[item.category || "Inne"] || 0) + Number(item.amount || 0); }); setSpent(sums);
  }
  useEffect(() => { load(); }, [month]);
  async function save(category) { const amount = Number(limits[category] || 0); await saveLimit({ category, amount }); setMessage(`Zapisano limit: ${category}`); }
  return <div className="screen"><h1>LIMITY BUDŻETOWE</h1><MonthSelector month={month} setMonth={setMonth} />{message && <p className="status-message">{message}</p>}<p className="page-hint">Limity są miesięczne. Postęp poniżej dotyczy wybranego miesiąca.</p>{EXPENSE_CATEGORIES.filter((category) => category !== "Inne").map((category) => { const limit = Number(limits[category] || 0); const used = Number(spent[category] || 0); const percent = limit ? Math.round((used / limit) * 100) : 0; const exceeded = limit > 0 && used > limit; return <div className="limit-card" key={category}><div className="limit-heading"><strong>{category}</strong><span className={exceeded ? "danger" : ""}>{money(used)} / {limit ? money(limit) : "brak limitu"}</span></div>{limit > 0 && <><div className="progress"><div className={exceeded ? "progress-fill danger-fill" : "progress-fill"} style={{ width: `${Math.min(percent, 100)}%` }} /></div><small className={exceeded ? "danger" : ""}>{exceeded ? `Przekroczono limit o ${money(used - limit)}` : `${percent}% wykorzystanego limitu`}</small></>}<div className="limit-editor"><input type="number" min="0" step="0.01" placeholder="Miesięczny limit" value={limits[category] ?? ""} onChange={(e) => setLimits({ ...limits, [category]: e.target.value })} /><button onClick={() => save(category)}>Zapisz</button></div></div>; })}</div>;
}
