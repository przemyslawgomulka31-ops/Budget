export function localMonth(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function defaultDateForMonth(month) {
  const today = new Date();
  return month === localMonth(today) ? `${month}-${String(today.getDate()).padStart(2, "0")}` : `${month}-01`;
}
