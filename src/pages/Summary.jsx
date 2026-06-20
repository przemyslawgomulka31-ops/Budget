import { useEffect, useState } from "react";

import MonthSelector from "../components/MonthSelector";

import Habits from "../components/Habits";
import CategoriesSummary from "../components/CategoriesSummary";
import {
  getTransactions,
} from "../db/budgetDB";

export default function Summary() {
  const [month, setMonth] =
    useState(
      new Date()
        .toISOString()
        .slice(0, 7)
    );

  const [income, setIncome] =
    useState(0);

  const [expense, setExpense] =
    useState(0);

  const [balance, setBalance] =
    useState(0);

  async function loadData() {
    const data =
      await getTransactions();

    const monthData =
      data.filter(
        (item) =>
          item.month === month
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
  }

  useEffect(() => {
    loadData();
  }, [month]);

  return (
    <div className="screen">
      <h1>
        PODSUMOWANIE
      </h1>

      <MonthSelector
        month={month}
        setMonth={setMonth}
      />

      <div className="summary-box">
        Dochody:
        {" "}
        {income}
        {" "}
        zł
      </div>

      <div className="summary-box">
        Wydatki:
        {" "}
        {expense}
        {" "}
        zł
      </div>

      <div className="summary-box">
        Bilans:
        {" "}
        {balance}
        {" "}
        zł
      </div>


<Habits
  month={month}
/>

<CategoriesSummary
  month={month}
/>
    </div>
  );
}