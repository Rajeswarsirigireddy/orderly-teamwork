import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Building2, Users, MapPin, TrendingUp } from 'lucide-react';

const organizations = [
  { id: '1', name: 'North India Operations', admins: 3, employees: 45, outlets: 856, revenue: 8200000, status: 'active', growth: 12 },
  { id: '2', name: 'South India Operations', admins: 2, employees: 38, outlets: 720, revenue: 6800000, status: 'active', growth: 8 },
  { id: '3', name: 'West India Operations', admins: 2, employees: 32, outlets: 580, revenue: 5400000, status: 'active', growth: 15 },
  { id: '4', name: 'East India Operations', admins: 2, employees: 28, outlets: 445, revenue: 4100000, status: 'active', growth: 6 },
  { id: '5', name: 'Central India Operations', admins: 1, employees: 18, outlets: 320, revenue: 2800000, status: 'pending', growth: -2 },
  { id: '6', name: 'Northeast Operations', admins: 1, employees: 12, outlets: 180, revenue: 1500000, status: 'active', growth: 22 },
];

export default function OrganizationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Organizations</h1>
            <p className="text-muted-foreground">Manage regional organizations and territories</p>
          </div>
          <Button className="btn-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Organization
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search organizations..." className="pl-9" />
        </div>

        {/* Organization Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <div key={org.id} className="rounded-xl bg-card p-6 shadow-card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{org.name}</h3>
                    <Badge variant="outline" className={org.status === 'active' ? 'badge-success' : 'badge-warning'}>
                      {org.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Team</p>
                    <p className="font-medium">{org.admins} Admins, {org.employees} Reps</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Outlets</p>
                    <p className="font-medium">{org.outlets}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Monthly Revenue</p>
                  <p className="text-lg font-bold text-foreground">₹{(org.revenue / 100000).toFixed(1)}L</p>
                </div>
                <div className={`flex items-center gap-1 ${org.growth >= 0 ? 'text-success' : 'text-destructive'}`}>
                  <TrendingUp className={`h-4 w-4 ${org.growth < 0 ? 'rotate-180' : ''}`} />
                  <span className="font-medium">{org.growth >= 0 ? '+' : ''}{org.growth}%</span>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
