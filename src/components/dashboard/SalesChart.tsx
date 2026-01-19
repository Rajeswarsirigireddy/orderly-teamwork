import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Mon', sales: 42000, target: 40000 },
  { name: 'Tue', sales: 38000, target: 40000 },
  { name: 'Wed', sales: 45000, target: 40000 },
  { name: 'Thu', sales: 52000, target: 40000 },
  { name: 'Fri', sales: 48000, target: 40000 },
  { name: 'Sat', sales: 61000, target: 40000 },
  { name: 'Sun', sales: 35000, target: 40000 },
];

export function SalesChart() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Sales Performance</h3>
          <p className="text-sm text-muted-foreground">Weekly sales vs target</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
            <span className="text-muted-foreground">Target</span>
          </div>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(199, 89%, 38%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(199, 89%, 38%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 15%, 45%)', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 15%, 45%)', fontSize: 12 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(214, 20%, 90%)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="hsl(215, 15%, 75%)"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="none"
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(199, 89%, 38%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
