export default function MonthSelector({
  month,
  setMonth,
}) {
  return (
    <input
      className="month-selector"
      lang="pl"
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
