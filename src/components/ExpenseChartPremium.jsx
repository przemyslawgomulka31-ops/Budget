import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#8b5cf6",
  "#3b82f6",
  "#14b8a6",
  "#84cc16",
  "#64748b",
];

export default function ExpenseChartPremium({
  data = [],
}) {
  if (!Array.isArray(data) || !data.length) {
    return null;
  }

  const safeData = data.filter(
    (item) =>
      item &&
      item.name &&
      !isNaN(Number(item.value))
  );

  const total = safeData.reduce(
    (sum, item) =>
      sum +
      Number(item.value || 0),
    0
  );

  return (
    <div className="card">
      <h2>
        STRUKTURA WYDATKÓW
      </h2>

      <ResponsiveContainer
        width="100%"
        height={280}
      >
        <PieChart>
          <Pie
            data={safeData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
          >
            {safeData.map(
              (entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {[...safeData]
        .sort(
          (a, b) =>
            Number(b.value) -
            Number(a.value)
        )
        .map((item) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              marginBottom: "12px",
            }}
          >
            <span>
              {item.name}
            </span>

            <span>
              {Number(item.value)} zł
              {" | "}
              {total > 0
                ? (
                    (Number(
                      item.value
                    ) /
                      total) *
                    100
                  ).toFixed(1)
                : "0.0"}
              %
            </span>
          </div>
        ))}
    </div>
  );
}