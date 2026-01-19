import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Package, Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const products = [
  { id: '1', name: 'Premium Basmati Rice 5kg', sku: 'SKU-001', category: 'Grains', price: 650, stock: 1250, trend: 12, status: 'active' },
  { id: '2', name: 'Sunflower Oil 1L', sku: 'SKU-002', category: 'Oils', price: 180, stock: 2340, trend: 8, status: 'active' },
  { id: '3', name: 'Wheat Flour 10kg', sku: 'SKU-003', category: 'Grains', price: 420, stock: 890, trend: -3, status: 'active' },
  { id: '4', name: 'Sugar 5kg', sku: 'SKU-004', category: 'Essentials', price: 275, stock: 1560, trend: 5, status: 'active' },
  { id: '5', name: 'Tea Premium 500g', sku: 'SKU-005', category: 'Beverages', price: 340, stock: 780, trend: 15, status: 'active' },
  { id: '6', name: 'Instant Noodles Pack', sku: 'SKU-006', category: 'Snacks', price: 120, stock: 3200, trend: 22, status: 'active' },
  { id: '7', name: 'Biscuit Variety Box', sku: 'SKU-007', category: 'Snacks', price: 85, stock: 4500, trend: 18, status: 'active' },
  { id: '8', name: 'Detergent Powder 2kg', sku: 'SKU-008', category: 'Household', price: 245, stock: 120, trend: -8, status: 'low_stock' },
  { id: '9', name: 'Soap Bar 6-Pack', sku: 'SKU-009', category: 'Personal Care', price: 180, stock: 0, trend: 0, status: 'out_of_stock' },
  { id: '10', name: 'Shampoo 500ml', sku: 'SKU-010', category: 'Personal Care', price: 320, stock: 560, trend: 6, status: 'active' },
];

const categoryColors: Record<string, string> = {
  'Grains': 'bg-amber-100 text-amber-700',
  'Oils': 'bg-yellow-100 text-yellow-700',
  'Essentials': 'bg-blue-100 text-blue-700',
  'Beverages': 'bg-green-100 text-green-700',
  'Snacks': 'bg-orange-100 text-orange-700',
  'Household': 'bg-purple-100 text-purple-700',
  'Personal Care': 'bg-pink-100 text-pink-700',
};

const statusStyles: Record<string, string> = {
  'active': 'badge-success',
  'low_stock': 'badge-warning',
  'out_of_stock': 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          <Button className="btn-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Total Products</p>
            <p className="text-2xl font-bold text-foreground">10</p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-success">8</p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Low Stock</p>
            <p className="text-2xl font-bold text-warning">1</p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Out of Stock</p>
            <p className="text-2xl font-bold text-destructive">1</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="grains">Grains</SelectItem>
              <SelectItem value="oils">Oils</SelectItem>
              <SelectItem value="essentials">Essentials</SelectItem>
              <SelectItem value="beverages">Beverages</SelectItem>
              <SelectItem value="snacks">Snacks</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="low_stock">Low Stock</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="rounded-xl bg-card p-4 shadow-card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <h3 className="font-medium text-foreground mb-1 line-clamp-2">{product.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{product.sku}</p>

              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className={categoryColors[product.category]}>
                  {product.category}
                </Badge>
                <Badge variant="outline" className={statusStyles[product.status]}>
                  {product.status.replace('_', ' ')}
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="text-lg font-bold text-foreground">₹{product.price}</p>
                  <p className="text-xs text-muted-foreground">{product.stock} in stock</p>
                </div>
                {product.trend !== 0 && (
                  <div className={`flex items-center gap-1 ${product.trend > 0 ? 'text-success' : 'text-destructive'}`}>
                    {product.trend > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="text-sm font-medium">{product.trend > 0 ? '+' : ''}{product.trend}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
