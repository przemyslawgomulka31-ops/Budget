import { useEffect, useState } from "react";
import { getTransactions } from "../db/budgetDB";

export default function MonthlyHistory() {
  const [months, setMonths] =
    useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const data =
      await getTransactions();

    const grouped = {};

    data.forEach((item) => {
      if (!grouped[item.month]) {
        grouped[item.month] = {
          income: 0,
          expense: 0,
        };
      }

      if (item.type === "income") {
        grouped[item.month].income +=
          item.amount;
      }

      if (item.type === "expense") {
        grouped[item.month].expense +=
          item.amount;
      }
    });

    const result =
      Object.entries(grouped)
        .map(([month, values]) => ({
          month,
          balance:
            values.income -
            values.expense,
        }))
        .sort((a, b) =>
          a.month.localeCompare(
            b.month
          )
        );

    setMonths(result);
  }

  return (
    <>
      <h2>Historia</h2>

      {months.map((item) => (
        <div
          className="card"
          key={item.month}
        >
          <h3>{item.month}</h3>

          <p>
            Bilans:
            {" "}
            {item.balance}
            {" "}
            zł
          </p>
        </div>
      ))}
    </>
  );
}