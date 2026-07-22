import { useEffect, useState } from "react";
import MonthSelector from "../components/MonthSelector";
import CategoriesSummary from "../components/CategoriesSummary";
import ExpenseChartPremium from "../components/ExpenseChartPremium";
import { getTransactions } from "../db/budgetDB";

const money = (amount) => `${Number(amount || 0).toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł`;
export default function Summary() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); const [summary, setSummary] = useState({ income: 0, expense: 0, chart: [] });
  useEffect(() => { async function load() { const items = (await getTransactions()).filter((item) => item.month === month); let income = 0; let expense = 0; const grouped = {}; items.forEach((item) => { if (item.type === "income") income += Number(item.amount || 0); else if (item.type === "expense") { expense += Number(item.amount || 0); const category = item.category || "Inne"; grouped[category] = (grouped[category] || 0) + Number(item.amount || 0); } }); setSummary({ income, expense, chart: Object.entries(grouped).map(([name, value]) => ({ name, value })) }); } load(); }, [month]);
  return <div className="screen"><h1>STATYSTYKI</h1><MonthSelector month={month} setMonth={setMonth} /><div className="overview-grid"><div className="summary-box"><small>Dochody</small><strong>{money(summary.income)}</strong></div><div className="summary-box"><small>Wydatki</small><strong>{money(summary.expense)}</strong></div><div className="summary-box"><small>Bilans</small><strong>{money(summary.income - summary.expense)}</strong></div><div className="summary-box"><small>Oszczędności</small><strong>{summary.income ? `${(((summary.income - summary.expense) / summary.income) * 100).toFixed(1)}%` : "—"}</strong></div></div><ExpenseChartPremium data={summary.chart} /><CategoriesSummary month={month} /></div>;
}
