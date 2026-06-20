import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
  "#f97316",
];

export default function ExpenseChart({
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
        STRUKTURA DOCHODÓW I PRZYCHODÓW
      </h2>

      <ResponsiveContainer
        width="100%"
        height={260}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={85}
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

      {data.map(
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
                "10px",
            }}
          >
            <span>
              {item.name}
            </span>

            <span>
              {item.value} zł
              {" | "}
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