import { useState } from "react";
import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const CHART_COLORS = ["#4ade80", "#38bdf8", "#fbbf24", "#a78bfa", "#fb7185", "#2dd4bf", "#f97316"];
const money = (value) => `${Number(value).toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł`;

export default function ExpenseChartPremium({ data = [] }) {
  const [type, setType] = useState("pie");
  const safe = data.filter((item) => item?.name && Number(item.value) > 0).sort((a, b) => b.value - a.value);
  if (!safe.length) return <div className="card empty-chart">Dodaj wydatki, aby zobaczyć strukturę kategorii.</div>;
  const total = safe.reduce((sum, item) => sum + Number(item.value), 0);
  return <section className="card chart-card"><div className="chart-heading"><div><span className="eyebrow">ANALIZA KATEGORII</span><h2>Struktura wydatków</h2></div><div className="chart-switch"><button className={type === "pie" ? "selected" : ""} onClick={() => setType("pie")}>Koło</button><button className={type === "bar" ? "selected" : ""} onClick={() => setType("bar")}>Słupki</button><button className={type === "line" ? "selected" : ""} onClick={() => setType("line")}>Linia</button></div></div><div className="chart-visual"><ResponsiveContainer width="100%" height={238}>{type === "pie" ? <PieChart><Pie data={safe} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={2}>{safe.map((item, index) => <Cell key={item.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}</Pie><Tooltip formatter={(value) => money(value)} /></PieChart> : type === "bar" ? <BarChart data={safe}><XAxis dataKey="name" hide /><YAxis hide /><Tooltip formatter={(value) => money(value)} /><Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#4ade80" /></BarChart> : <LineChart data={safe}><XAxis dataKey="name" hide /><YAxis hide /><Tooltip formatter={(value) => money(value)} /><Line dataKey="value" stroke="#4ade80" strokeWidth={3} /></LineChart>}</ResponsiveContainer>{type === "pie" && <div className="chart-center"><strong>{money(total)}</strong><span>wydatków</span></div>}</div><div className="chart-legend">{safe.map((item, index) => <div key={item.name}><span className="legend-dot" style={{ background: CHART_COLORS[index % CHART_COLORS.length] }} /><span className="legend-name">{item.name}</span><strong>{((item.value / total) * 100).toFixed(0)}%</strong><small>{money(item.value)}</small></div>)}</div></section>;
}
