import {
  getTransactions,
  addTransaction,
} from "../db/budgetDB";

export async function exportData() {
  const data =
    await getTransactions();

  const blob = new Blob(
    [
      JSON.stringify(
        data,
        null,
        2
      ),
    ],
    {
      type:
        "application/json",
    }
  );

  const url =
    URL.createObjectURL(
      blob
    );

  const a =
    document.createElement(
      "a"
    );

  a.href = url;

  a.download =
    "budget-backup.json";

  a.click();

  URL.revokeObjectURL(
    url
  );
}

export async function importData(
  file
) {
  const text =
    await file.text();

  const data =
    JSON.parse(text);

  for (const item of data) {
    delete item.id;

    await addTransaction(
      item
    );
  }
}