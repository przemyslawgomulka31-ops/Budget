import { useEffect, useState } from "react";
import { getTransactions } from "../db/budgetDB";

export default function Habits({
  month,
}) {
  const [habits, setHabits] =
    useState([]);

  useEffect(() => {
    loadData();
  }, [month]);

  async function loadData() {
    const data =
      await getTransactions();

    const expenses =
      data.filter(
        (item) =>
          item.type === "expense" &&
          item.month === month
      );

    const grouped = {};

    expenses.forEach((item) => {
      if (!grouped[item.title]) {
        grouped[item.title] = {
          count: 0,
          amount: 0,
        };
      }

      grouped[item.title].count++;

      grouped[item.title].amount +=
        item.amount;
    });

    const result =
      Object.entries(grouped)
        .map(
          ([name, values]) => ({
            name,
            count:
              values.count,
            amount:
              values.amount,
          })
        )
        .sort(
          (a, b) =>
            b.count - a.count
        );

    setHabits(
      result.slice(0, 10)
    );
  }

  return (
    <>
      <h2>Nawyki</h2>

      {habits.map((item) => (
        <div
          className="card"
          key={item.name}
        >
          <h3>{item.name}</h3>

          <p>
            {item.count} razy
          </p>

          <p>
            {item.amount} zł
          </p>
        </div>
      ))}
    </>
  );
}