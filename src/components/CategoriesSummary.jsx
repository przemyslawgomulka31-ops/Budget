import { useEffect, useState } from "react";
import { getTransactions } from "../db/budgetDB";

export default function CategoriesSummary({ month }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => { async function load() { const data = await getTransactions(); const grouped = {}; data.filter((item) => item.type === "expense" && item.month === month).forEach((item) => { const name = item.category || "Inne"; grouped[name] = (grouped[name] || 0) + Number(item.amount || 0); }); setCategories(Object.entries(grouped).sort(([, a], [, b]) => b - a)); } load(); }, [month]);
  const total = categories.reduce((sum, [, amount]) => sum + amount, 0);
  return <section className="categories-summary"><h2>Kategorie wydatków</h2>{categories.length === 0 ? <p className="page-hint">Brak wydatków w tym miesiącu.</p> : categories.map(([name, amount]) => <div key={name} className="card"><h3>{name}</h3><p>{amount.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł · {((amount / total) * 100).toFixed(1)}%</p></div>)}</section>;
}
