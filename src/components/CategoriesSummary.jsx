import { useEffect, useState } from "react";
import { getTransactions } from "../db/budgetDB";

export default function CategoriesSummary({
  month,
}) {
  const [categories, setCategories] =
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
      const category =
        item.category || "Inne";

      if (
        !grouped[category]
      ) {
        grouped[category] = 0;
      }

      grouped[category] +=
        item.amount;
    });

    setCategories(
      Object.entries(
        grouped
      )
    );
  }

  return (
    <>
      <h2>Kategorie</h2>

      {categories.map(
        ([name, amount]) => (
          <div
            key={name}
            className="card"
          >
            <h3>{name}</h3>

            <p>
              {amount} zł
            </p>
          </div>
        )
      )}
    </>
  );
}