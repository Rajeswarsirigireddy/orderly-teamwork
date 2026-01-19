import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp, TrendingDown, Download, Calendar } from 'lucide-react';

const salesData = [
  { month: 'Jan', sales: 420000, target: 400000 },
  { month: 'Feb', sales: 380000, target: 400000 },
  { month: 'Mar', sales: 450000, target: 420000 },
  { month: 'Apr', sales: 520000, target: 450000 },
  { month: 'May', sales: 480000, target: 450000 },
  { month: 'Jun', sales: 610000, target: 500000 },
];

const categoryData = [
  { name: 'Grains', value: 35, color: 'hsl(38, 92%, 50%)' },
  { name: 'Oils', value: 25, color: 'hsl(199, 89%, 38%)' },
  { name: 'Beverages', value: 20, color: 'hsl(142, 71%, 45%)' },
  { name: 'Snacks', value: 12, color: 'hsl(174, 62%, 47%)' },
  { name: 'Others', value: 8, color: 'hsl(215, 15%, 60%)' },
];

const regionData = [
  { region: 'North', sales: 82, target: 100 },
  { region: 'South', sales: 68, target: 100 },
  { region: 'East', sales: 54, target: 100 },
  { region: 'West', sales: 75, target: 100 },
  { region: 'Central', sales: 48, target: 100 },
];

const topProducts = [
  { name: 'Premium Basmati Rice', sales: 15200, units: 2340 },
  { name: 'Sunflower Oil 1L', sales: 12800, units: 7111 },
  { name: 'Instant Noodles Pack', sales: 9600, units: 8000 },
  { name: 'Tea Premium 500g', sales: 8500, units: 2500 },
  { name: 'Biscuit Variety Box', sales: 7650, units: 9000 },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground">Detailed insights and reports</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Revenue', value: '₹28.6L', change: 14.2, positive: true },
            { label: 'Orders', value: '1,847', change: 8.5, positive: true },
            { label: 'Avg Order Value', value: '₹15,480', change: 5.2, positive: true },
            { label: 'Active Outlets', value: '3,254', change: -2.1, positive: false },
          ].map((metric, i) => (
            <div key={i} className="rounded-xl bg-card p-4 shadow-card">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{metric.value}</p>
              <div className={`flex items-center gap-1 mt-2 ${metric.positive ? 'text-success' : 'text-destructive'}`}>
                {metric.positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="text-sm font-medium">{metric.positive ? '+' : ''}{metric.change}%</span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Trend */}
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Sales Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(199, 89%, 38%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(199, 89%, 38%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}`, '']} />
                  <Area type="monotone" dataKey="target" stroke="hsl(215, 15%, 75%)" strokeDasharray="5 5" fill="none" />
                  <Area type="monotone" dataKey="sales" stroke="hsl(199, 89%, 38%)" fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Sales by Category</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Region Performance */}
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Region Performance</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <YAxis type="category" dataKey="region" axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Bar dataKey="sales" fill="hsl(199, 89%, 38%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Products */}
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Top Products</h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-lg font-bold text-muted-foreground w-6">{index + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.units.toLocaleString()} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">₹{(product.sales / 1000).toFixed(1)}k</p>
                    <Badge variant="outline" className="badge-success text-xs">
                      Top Seller
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
