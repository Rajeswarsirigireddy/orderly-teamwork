import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Shield, Plus, Search, Edit, Eye, Trash2, Lock, Users, BarChart3, ShoppingCart, MapPin, Package, Settings, Building, Network, Route } from 'lucide-react';

const modules = [
  { key: 'dashboard', label: 'Dashboard', icon: BarChart3, description: 'View dashboard and analytics' },
  { key: 'team', label: 'Team Management', icon: Users, description: 'Manage team members' },
  { key: 'organizations', label: 'Organizations', icon: Building, description: 'Manage organizations' },
  { key: 'network', label: 'Network', icon: Network, description: 'Manage network hierarchy' },
  { key: 'outlets', label: 'Outlets', icon: MapPin, description: 'Manage retail outlets' },
  { key: 'routes', label: 'Routes', icon: Route, description: 'Manage sales routes' },
  { key: 'orders', label: 'Orders', icon: ShoppingCart, description: 'Manage orders' },
  { key: 'products', label: 'Products', icon: Package, description: 'Manage products' },
  { key: 'settings', label: 'Settings', icon: Settings, description: 'System settings' },
];

const permissions = [
  { id: 'view', label: 'View', icon: Eye, description: 'Can view data' },
  { id: 'create', label: 'Create', icon: Plus, description: 'Can create new records' },
  { id: 'edit', label: 'Edit', icon: Edit, description: 'Can edit existing records' },
  { id: 'delete', label: 'Delete', icon: Trash2, description: 'Can delete records' },
];

const roles = [
  { id: 'super_admin', name: 'Super Admin', color: 'bg-primary text-primary-foreground' },
  { id: 'admin', name: 'Admin', color: 'bg-success text-white' },
  { id: 'employee', name: 'Field Rep', color: 'bg-warning text-white' },
];

// Permission matrix: role -> module -> permissions
const permissionMatrix: Record<string, Record<string, string[]>> = {
  super_admin: {
    dashboard: ['view', 'create', 'edit', 'delete'],
    team: ['view', 'create', 'edit', 'delete'],
    organizations: ['view', 'create', 'edit', 'delete'],
    network: ['view', 'create', 'edit', 'delete'],
    outlets: ['view', 'create', 'edit', 'delete'],
    routes: ['view', 'create', 'edit', 'delete'],
    orders: ['view', 'create', 'edit', 'delete'],
    products: ['view', 'create', 'edit', 'delete'],
    settings: ['view', 'create', 'edit', 'delete'],
  },
  admin: {
    dashboard: ['view'],
    team: ['view', 'create', 'edit'],
    organizations: [],
    network: ['view'],
    outlets: ['view', 'create', 'edit'],
    routes: ['view', 'create', 'edit'],
    orders: ['view', 'create', 'edit'],
    products: ['view'],
    settings: ['view', 'edit'],
  },
  employee: {
    dashboard: ['view'],
    team: [],
    organizations: [],
    network: [],
    outlets: ['view'],
    routes: ['view'],
    orders: ['view', 'create'],
    products: ['view'],
    settings: ['view'],
  },
};

export default function PermissionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Permissions</h1>
            <p className="text-muted-foreground">Configure granular access control for each role</p>
          </div>
          <Button className="btn-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create Permission Set
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{modules.length}</p>
                <p className="text-sm text-muted-foreground">Modules</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{permissions.length}</p>
                <p className="text-sm text-muted-foreground">Permission Types</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{roles.length}</p>
                <p className="text-sm text-muted-foreground">Roles</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">36</p>
                <p className="text-sm text-muted-foreground">Total Permissions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search modules..." className="pl-10" />
          </div>
        </div>

        {/* Permission Matrix */}
        <div className="rounded-xl bg-card shadow-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Permission Matrix</h3>
            <p className="text-sm text-muted-foreground">Configure what each role can do in each module</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-foreground min-w-[200px]">Module</th>
                  <th className="text-center py-4 px-6 font-medium text-foreground">Permission</th>
                  {roles.map((role) => (
                    <th key={role.id} className="text-center py-4 px-6 font-medium min-w-[120px]">
                      <Badge className={role.color}>{role.name}</Badge>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modules.map((module) => (
                  permissions.map((perm, permIndex) => (
                    <tr key={`${module.key}-${perm.id}`} className={`border-t border-border/50 ${permIndex === 0 ? 'bg-muted/20' : ''}`}>
                      {permIndex === 0 && (
                        <td rowSpan={permissions.length} className="py-4 px-6 border-r border-border/50">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                              <module.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{module.label}</p>
                              <p className="text-xs text-muted-foreground">{module.description}</p>
                            </div>
                          </div>
                        </td>
                      )}
                      <td className="py-3 px-6 text-center border-r border-border/50">
                        <div className="flex items-center justify-center gap-2">
                          <perm.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{perm.label}</span>
                        </div>
                      </td>
                      {roles.map((role) => {
                        const hasPermission = permissionMatrix[role.id]?.[module.key]?.includes(perm.id);
                        return (
                          <td key={role.id} className="py-3 px-6 text-center">
                            <Switch checked={hasPermission} disabled />
                          </td>
                        );
                      })}
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h4 className="font-semibold text-foreground mb-2">Clone Permissions</h4>
            <p className="text-sm text-muted-foreground mb-4">Copy permission set from one role to another</p>
            <Button variant="outline" className="w-full">Clone Permissions</Button>
          </div>
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h4 className="font-semibold text-foreground mb-2">Reset to Default</h4>
            <p className="text-sm text-muted-foreground mb-4">Reset all permissions to factory defaults</p>
            <Button variant="outline" className="w-full">Reset Permissions</Button>
          </div>
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h4 className="font-semibold text-foreground mb-2">Export Matrix</h4>
            <p className="text-sm text-muted-foreground mb-4">Download permission matrix as CSV</p>
            <Button variant="outline" className="w-full">Export CSV</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
