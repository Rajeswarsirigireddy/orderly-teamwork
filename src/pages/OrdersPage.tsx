import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, Package, Eye, Download, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const orders = [
  { id: 'ORD-001', outlet: 'SuperMart Downtown', date: '2024-01-19', items: 24, value: 45000, status: 'delivered', rep: 'Michael Chen' },
  { id: 'ORD-002', outlet: 'QuickStop Express', date: '2024-01-19', items: 15, value: 28000, status: 'processing', rep: 'Priya Sharma' },
  { id: 'ORD-003', outlet: 'MegaMart Central', date: '2024-01-18', items: 48, value: 125000, status: 'delivered', rep: 'Raj Kumar' },
  { id: 'ORD-004', outlet: 'Corner Grocers', date: '2024-01-18', items: 12, value: 18000, status: 'pending', rep: 'Anita Desai' },
  { id: 'ORD-005', outlet: 'Fresh Foods Plus', date: '2024-01-18', items: 32, value: 67000, status: 'shipped', rep: 'Michael Chen' },
  { id: 'ORD-006', outlet: 'Daily Needs Store', date: '2024-01-17', items: 18, value: 34000, status: 'delivered', rep: 'Priya Sharma' },
  { id: 'ORD-007', outlet: 'Metro Mart', date: '2024-01-17', items: 56, value: 148000, status: 'delivered', rep: 'Vikram Singh' },
  { id: 'ORD-008', outlet: 'Family Bazaar', date: '2024-01-17', items: 28, value: 52000, status: 'cancelled', rep: 'Sneha Gupta' },
  { id: 'ORD-009', outlet: 'Premium Mart', date: '2024-01-16', items: 42, value: 95000, status: 'delivered', rep: 'Michael Chen' },
  { id: 'ORD-010', outlet: 'Value Store', date: '2024-01-16', items: 20, value: 38000, status: 'delivered', rep: 'Priya Sharma' },
];

const statusStyles: Record<string, string> = {
  'delivered': 'badge-success',
  'shipped': 'badge-info',
  'processing': 'badge-warning',
  'pending': 'bg-muted text-muted-foreground',
  'cancelled': 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function OrdersPage() {
  const totalValue = orders.reduce((sum, o) => sum + o.value, 0);
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground">Track and manage all orders</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="btn-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              New Order
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold text-foreground">{orders.length}</p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Delivered</p>
            <p className="text-2xl font-bold text-success">{deliveredOrders}</p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Processing</p>
            <p className="text-2xl font-bold text-warning">2</p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-muted-foreground">1</p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold text-primary">₹{(totalValue / 100000).toFixed(1)}L</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Outlet</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Sales Rep</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      {order.outlet}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell className="font-medium">₹{order.value.toLocaleString()}</TableCell>
                  <TableCell>{order.rep}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusStyles[order.status]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
