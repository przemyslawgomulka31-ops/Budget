export default function MonthSelector({
  month,
  setMonth,
}) {
  return (
    <input
      type="month"
      value={month}
      onChange={(e) =>
        setMonth(
          e.target.value
        )
      }
    />
  );
}