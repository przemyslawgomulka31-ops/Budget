import { openDB } from "idb";

const DB_NAME = "budgetOS";
const DB_VERSION = 2;

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db, oldVersion) {
    if (!db.objectStoreNames.contains("transactions")) {
      db.createObjectStore("transactions", { keyPath: "id", autoIncrement: true });
    }
    if (oldVersion < 2 && !db.objectStoreNames.contains("limits")) {
      db.createObjectStore("limits", { keyPath: "category" });
    }
  },
});

export async function addTransaction(transaction) { return (await dbPromise).add("transactions", transaction); }
export async function getTransactions() { return (await dbPromise).getAll("transactions"); }
export async function deleteTransaction(id) { return (await dbPromise).delete("transactions", id); }
export async function updateTransaction(transaction) { return (await dbPromise).put("transactions", transaction); }
export async function getLimits() { return (await dbPromise).getAll("limits"); }
export async function saveLimit(limit) { return (await dbPromise).put("limits", limit); }
export async function getRegularIncome() { return (await getTransactions()).filter((item) => item.type === "income" && item.subtype === "regular" && !item.generated); }
export async function getRegularExpenses() { return (await getTransactions()).filter((item) => item.type === "expense" && item.subtype === "regular" && !item.generated); }
export async function exportJSON() { return getTransactions(); }
