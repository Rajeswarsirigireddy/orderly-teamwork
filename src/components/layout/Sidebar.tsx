import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  MapPin,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Building2,
  Route,
  Package,
  UserCog,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles: string[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['super_admin', 'admin', 'employee'] },
  { icon: Users, label: 'Team Management', path: '/team', roles: ['super_admin', 'admin'] },
  { icon: Building2, label: 'Organizations', path: '/organizations', roles: ['super_admin'] },
  { icon: MapPin, label: 'Outlets', path: '/outlets', roles: ['super_admin', 'admin', 'employee'] },
  { icon: Route, label: 'Routes', path: '/routes', roles: ['admin', 'employee'] },
  { icon: ShoppingCart, label: 'Orders', path: '/orders', roles: ['super_admin', 'admin', 'employee'] },
  { icon: Package, label: 'Products', path: '/products', roles: ['super_admin', 'admin'] },
  { icon: BarChart3, label: 'Analytics', path: '/analytics', roles: ['super_admin', 'admin'] },
  { icon: UserCog, label: 'User Roles', path: '/roles', roles: ['super_admin'] },
  { icon: Settings, label: 'Settings', path: '/settings', roles: ['super_admin', 'admin', 'employee'] },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const filteredNavItems = navItems.filter((item) => 
    user && item.roles.includes(user.role)
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'admin':
        return 'Admin';
      case 'employee':
        return 'Field Rep';
      default:
        return role;
    }
  };

  return (
    <aside
      className={cn(
        'sidebar-gradient flex flex-col h-screen transition-all duration-300 relative',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
          <Package className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-lg font-bold text-sidebar-foreground">FieldSales</h1>
            <p className="text-xs text-sidebar-foreground/60">FMCG Pro</p>
          </div>
        )}
      </div>

      {/* Collapse Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border bg-card shadow-md hover:bg-muted"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium animate-fade-in">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="border-t border-sidebar-border p-4">
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          <Avatar className="h-10 w-10 border-2 border-sidebar-primary/30">
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm font-medium">
              {user?.avatar}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.name}
              </p>
              <p className="text-xs text-sidebar-primary">
                {getRoleBadge(user?.role || '')}
              </p>
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={logout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}
