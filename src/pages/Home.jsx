import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactions } from "../db/budgetDB";
import PieChart
from "../components/PieChart";
import IncomeChart
from "../components/IncomeChart";
import ExpenseChartPremium
from "../components/ExpenseChartPremium";
export default function Home() {
  const navigate = useNavigate();

  const [income, setIncome] =
    useState(0);

  const [expense, setExpense] =
    useState(0);

  const [balance, setBalance] =
    useState(0);
const [savingPercent,
  setSavingPercent] =
  useState(0);

const [balanceChart, setBalanceChart] =
  useState([]);

const [incomeChart, setIncomeChart] =
  useState([]);

const [expenseChart, setExpenseChart] =
  useState([]);
const [showCharts, setShowCharts] =
  useState(false);

 useEffect(() => {
  loadData();

  setTimeout(() => {
    setShowCharts(true);
  }, 500);
}, []);

  async function loadData() {
    const data =
      await getTransactions();

    const currentMonth =
      new Date()
        .toISOString()
        .slice(0, 7);

    const monthData =
      data.filter(
        (item) =>
          item.month ===
          currentMonth
      );

    const incomeTotal =
      monthData
        .filter(
          (item) =>
            item.type ===
            "income"
        )
        .reduce(
          (
            sum,
            item
          ) =>
            sum +
            item.amount,
          0
        );

    const expenseTotal =
      monthData
        .filter(
          (item) =>
            item.type ===
            "expense"
        )
        .reduce(
          (
            sum,
            item
          ) =>
            sum +
            item.amount,
          0
        );

    setIncome(
      incomeTotal
    );

    setExpense(
      expenseTotal
    );

    setBalance(
      incomeTotal -
        expenseTotal
    );
if (incomeTotal > 0) {
  setSavingPercent(
    (
      ((incomeTotal -
        expenseTotal) /
        incomeTotal) *
      100
    ).toFixed(1)
  );
}

setBalanceChart([
  {
    name: "Dochody",
    value: incomeTotal,
  },
  {
    name: "Wydatki",
    value: expenseTotal,
  },
]);

const incomeTypes = {};

monthData
  .filter(
    (item) =>
      item.type ===
      "income"
  )
  .forEach((item) => {
    const key =
      item.subtype ||
      "Inne";

    incomeTypes[key] =
      (incomeTypes[key] || 0) +
      item.amount;
  });

setIncomeChart(
  Object.entries(
    incomeTypes
  ).map(
    ([name, value]) => ({
      name,
      value,
    })
  )
);
const categories = {};

monthData
  .filter(
    (item) =>
      item.type ===
      "expense"
  )
  .forEach((item) => {
    const category =
      item.category ||
      "Inne";

    if (
      !categories[
        category
      ]
    ) {
      categories[
        category
      ] = 0;
    }

    categories[
      category
    ] += item.amount;
  });

setExpenseChart(
  Object.entries(
    categories
  ).map(
    ([name, value]) => ({
      name,
      value,
    })
  )
);  }

  return (
    <div className="screen">
    <div className="wealth-card">

  <div className="wealth-title">
    MAJĄTEK NETTO
  </div>

  <div className="wealth-value">
    {balance} zł
  </div>

  <div className="wealth-change">
    Bieżący miesiąc
<div
  style={{
    marginTop: "25px",
  }}
>
  <div
    style={{
      marginBottom: "8px",
    }}
  >
    Oszczędności względem dochodów
  </div>

  <div
    style={{
      width: "100%",
      height: "12px",
      background:
        "#0f172a",
      borderRadius:
        "999px",
      overflow:
        "hidden",
    }}
  >
    <div
      style={{
        width:
          `${savingPercent}%`,
        height: "100%",
        background:
          "#22c55e",
      }}
    />
  </div>

  <div
    style={{
      textAlign:
        "right",
      marginTop:
        "8px",
      fontWeight:
        "bold",
      color:
        "#22c55e",
    }}
  >
    {savingPercent}%
  </div>
</div>
  </div>

  <div className="wealth-grid">

    <div className="wealth-item">
      <div className="wealth-label">
        Dochody

      </div>


      <div className="wealth-number">
        {income} zł
      </div>
    </div>

    <div className="wealth-item">
      <div className="wealth-label">
        Wydatki
      </div>

      <div className="wealth-number">
        {expense} zł
      </div>
    </div>

    <div className="wealth-item">
      <div className="wealth-label">
        Bilans
      </div>

      <div className="wealth-number">
        {balance} zł
      </div>
    </div>

  </div>
</div>

         <PieChart
  data={balanceChart}
/>


<IncomeChart
  data={incomeChart}
/>


<ExpenseChartPremium
  data={expenseChart}
/>
    


  
    </div>
  );
}