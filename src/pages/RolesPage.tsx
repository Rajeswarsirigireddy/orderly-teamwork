import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Shield, Users, UserCog, Eye, Edit, Trash2, Plus, Settings, Database, BarChart3, ShoppingCart, MapPin } from 'lucide-react';

const roles = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    users: 2,
    color: 'from-primary to-accent',
    permissions: {
      dashboard: { view: true, edit: true },
      users: { view: true, edit: true, delete: true },
      organizations: { view: true, edit: true, delete: true },
      outlets: { view: true, edit: true, delete: true },
      orders: { view: true, edit: true, delete: true },
      products: { view: true, edit: true, delete: true },
      analytics: { view: true, export: true },
      settings: { view: true, edit: true },
    },
  },
  {
    id: '2',
    name: 'Admin',
    description: 'Regional management with team oversight',
    users: 8,
    color: 'from-success to-emerald-400',
    permissions: {
      dashboard: { view: true, edit: false },
      users: { view: true, edit: true, delete: false },
      organizations: { view: false, edit: false, delete: false },
      outlets: { view: true, edit: true, delete: false },
      orders: { view: true, edit: true, delete: false },
      products: { view: true, edit: false, delete: false },
      analytics: { view: true, export: true },
      settings: { view: true, edit: false },
    },
  },
  {
    id: '3',
    name: 'Field Representative',
    description: 'Daily operations and order management',
    users: 238,
    color: 'from-warning to-orange-400',
    permissions: {
      dashboard: { view: true, edit: false },
      users: { view: false, edit: false, delete: false },
      organizations: { view: false, edit: false, delete: false },
      outlets: { view: true, edit: false, delete: false },
      orders: { view: true, edit: true, delete: false },
      products: { view: true, edit: false, delete: false },
      analytics: { view: false, export: false },
      settings: { view: true, edit: false },
    },
  },
];

const permissionModules = [
  { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { key: 'users', label: 'Team Management', icon: Users },
  { key: 'outlets', label: 'Outlets', icon: MapPin },
  { key: 'orders', label: 'Orders', icon: ShoppingCart },
  { key: 'products', label: 'Products', icon: Database },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function RolesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">User Roles</h1>
            <p className="text-muted-foreground">Manage roles and permissions</p>
          </div>
          <Button className="btn-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create Role
          </Button>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div key={role.id} className="rounded-xl bg-card shadow-card overflow-hidden">
              {/* Header */}
              <div className={`p-6 bg-gradient-to-r ${role.color}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{role.name}</h3>
                      <p className="text-sm text-white/80">{role.users} users</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

                {/* Permission Summary */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">Permissions</p>
                {permissionModules.slice(0, 4).map((module) => {
                    const perms = role.permissions[module.key as keyof typeof role.permissions] as Record<string, boolean>;
                    const hasAccess = perms?.view || perms?.edit;
                    return (
                      <div key={module.key} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <module.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{module.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {perms?.view && <Badge variant="outline" className="text-xs">View</Badge>}
                          {perms?.edit && <Badge variant="outline" className="text-xs badge-success">Edit</Badge>}
                          {!hasAccess && <Badge variant="outline" className="text-xs bg-muted text-muted-foreground">No Access</Badge>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View All Permissions
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Permission Matrix */}
        <div className="rounded-xl bg-card p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-6">Permission Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Module</th>
                  {roles.map((role) => (
                    <th key={role.id} className="text-center py-3 px-4 font-medium text-foreground">
                      {role.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissionModules.map((module) => (
                  <tr key={module.key} className="border-b border-border/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <module.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{module.label}</span>
                      </div>
                    </td>
                    {roles.map((role) => {
                      const perms = role.permissions[module.key as keyof typeof role.permissions] as Record<string, boolean>;
                      return (
                        <td key={role.id} className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="flex items-center gap-1">
                              <Eye className={`h-4 w-4 ${perms?.view ? 'text-success' : 'text-muted-foreground/30'}`} />
                            </div>
                            <div className="flex items-center gap-1">
                              <Edit className={`h-4 w-4 ${perms?.edit ? 'text-primary' : 'text-muted-foreground/30'}`} />
                            </div>
                            <div className="flex items-center gap-1">
                              <Trash2 className={`h-4 w-4 ${perms?.delete ? 'text-destructive' : 'text-muted-foreground/30'}`} />
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
