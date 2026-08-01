import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", balance: 12000 },
  { month: "Feb", balance: 18000 },
  { month: "Mar", balance: 25000 },
  { month: "Apr", balance: 21000 },
  { month: "May", balance: 35000 },
  { month: "Jun", balance: 47000 },
  { month: "Jul", balance: 62000 },
];

function BalanceChart() {
  return (
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="balance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <XAxis dataKey="month" stroke="#9CA3AF" />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="balance"
            stroke="#8B5CF6"
            fill="url(#balance)"
            strokeWidth={4}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BalanceChart;