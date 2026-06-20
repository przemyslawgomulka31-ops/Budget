import { openDB } from "idb";

const DB_NAME = "budgetOS";
const DB_VERSION = 1;

export const dbPromise = openDB(
  DB_NAME,
  DB_VERSION,
  {
    upgrade(db) {
      if (
        !db.objectStoreNames.contains(
          "transactions"
        )
      ) {
        db.createObjectStore(
          "transactions",
          {
            keyPath: "id",
            autoIncrement: true,
          }
        );
      }
    },
  }
);

export async function addTransaction(
  transaction
) {
  const db = await dbPromise;

  return db.add(
    "transactions",
    transaction
  );
}

export async function getTransactions() {
  const db = await dbPromise;

  return db.getAll(
    "transactions"
  );
}

export async function getRegularIncome() {
  const db = await dbPromise;

  const all = await db.getAll("transactions");

  return all.filter(
    (item) =>
      item.type === "income" &&
      item.subtype === "regular" &&
      !item.generated
  );
}

export async function getRegularExpenses() {
  const db = await dbPromise;

  const all = await db.getAll(
    "transactions"
  );

  return all.filter(
    (item) =>
      item.type === "expense" &&
      item.subtype === "regular" &&
      !item.generated
  );
}

export async function exportJSON() {
  const db = await dbPromise;

  return db.getAll(
    "transactions"
  );
}

export async function deleteTransaction(id) {
  const db = await dbPromise;

  return db.delete(
    "transactions",
    id
  );
}
export async function updateTransaction(transaction) {
  const db = await dbPromise;

  return db.put(
    "transactions",
    transaction
  );
}