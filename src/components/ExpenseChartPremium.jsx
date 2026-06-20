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
  data,
}) {
  if (!data.length) return null;

  const total =
    data.reduce(
      (
        sum,
        item
      ) =>
        sum +
        item.value,
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
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
          >
            {data.map(
              (
                entry,
                index
              ) => (
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

      {data
        .sort(
          (
            a,
            b
          ) =>
            b.value -
            a.value
        )
        .map(
          (
            item,
            index
          ) => (
            <div
              key={item.name}
              style={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
                marginBottom:
                  "12px",
              }}
            >
              <span>
                {item.name}
              </span>

              <span>
                {item.value}
                {" zł | "}
                {(
                  (item.value /
                    total) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
          )
        )}
    </div>
  );
}