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
import { Search, Plus, MapPin, Phone, Store, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const outlets = [
  { id: '1', name: 'SuperMart Downtown', type: 'Supermarket', address: '123 Market Street, Mumbai', phone: '+91 22 1234 5678', owner: 'Rajesh Patel', lastVisit: '2 days ago', orders: 24, value: 125000, status: 'active' },
  { id: '2', name: 'QuickStop Express', type: 'Convenience', address: '456 Main Road, Mumbai', phone: '+91 22 1234 5679', owner: 'Priya Mehta', lastVisit: 'Today', orders: 18, value: 85000, status: 'active' },
  { id: '3', name: 'MegaMart Central', type: 'Hypermarket', address: '789 Commerce Ave, Mumbai', phone: '+91 22 1234 5680', owner: 'Amit Shah', lastVisit: '1 week ago', orders: 45, value: 320000, status: 'active' },
  { id: '4', name: 'Corner Grocers', type: 'Kirana', address: '321 Oak Lane, Mumbai', phone: '+91 22 1234 5681', owner: 'Suresh Kumar', lastVisit: '3 days ago', orders: 12, value: 45000, status: 'active' },
  { id: '5', name: 'Fresh Foods Plus', type: 'Supermarket', address: '654 Green Street, Mumbai', phone: '+91 22 1234 5682', owner: 'Neha Sharma', lastVisit: '5 days ago', orders: 28, value: 156000, status: 'inactive' },
  { id: '6', name: 'Daily Needs Store', type: 'Kirana', address: '987 Hill Road, Mumbai', phone: '+91 22 1234 5683', owner: 'Vikram Singh', lastVisit: 'Yesterday', orders: 15, value: 62000, status: 'active' },
  { id: '7', name: 'Metro Mart', type: 'Hypermarket', address: '147 Station Road, Mumbai', phone: '+91 22 1234 5684', owner: 'Anand Joshi', lastVisit: '4 days ago', orders: 52, value: 425000, status: 'active' },
  { id: '8', name: 'Family Bazaar', type: 'Supermarket', address: '258 Park Street, Mumbai', phone: '+91 22 1234 5685', owner: 'Kavita Rao', lastVisit: 'Today', orders: 31, value: 178000, status: 'active' },
];

const typeColors: Record<string, string> = {
  'Supermarket': 'bg-primary/10 text-primary',
  'Hypermarket': 'bg-success/10 text-success',
  'Convenience': 'bg-warning/10 text-warning',
  'Kirana': 'bg-accent/10 text-accent',
};

export default function OutletsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Outlets</h1>
            <p className="text-muted-foreground">Manage retail outlets and stores</p>
          </div>
          <Button className="btn-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Outlet
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Total Outlets</p>
            <p className="text-2xl font-bold text-foreground">8</p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-success">7</p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold text-foreground">225</p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Total Value</p>
            <p className="text-2xl font-bold text-primary">₹13.9L</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search outlets..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="supermarket">Supermarket</SelectItem>
              <SelectItem value="hypermarket">Hypermarket</SelectItem>
              <SelectItem value="convenience">Convenience</SelectItem>
              <SelectItem value="kirana">Kirana</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Outlet</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Orders (MTD)</TableHead>
                <TableHead>Value (MTD)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {outlets.map((outlet) => (
                <TableRow key={outlet.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <Store className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{outlet.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {outlet.address}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={typeColors[outlet.type]}>
                      {outlet.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{outlet.owner}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {outlet.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{outlet.lastVisit}</TableCell>
                  <TableCell>{outlet.orders}</TableCell>
                  <TableCell>₹{(outlet.value / 1000).toFixed(0)}k</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={outlet.status === 'active' ? 'badge-success' : 'bg-muted text-muted-foreground'}>
                      {outlet.status}
                    </Badge>
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
