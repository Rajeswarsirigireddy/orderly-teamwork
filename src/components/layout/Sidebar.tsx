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
  ChevronDown,
  Network,
  Award,
  Building,
  Shield,
  Store,
  ClipboardCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface SubNavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface NavItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  roles: string[];
  subItems?: SubNavItem[];
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['super_admin', 'admin', 'employee'] },
  { 
    icon: Users, 
    label: 'Team Management', 
    roles: ['super_admin', 'admin'],
    subItems: [
      { icon: Users, label: 'Team', path: '/team' },
      { icon: Award, label: 'Designations', path: '/designations' },
      { icon: Building, label: 'Departments', path: '/departments' },
      { icon: UserCog, label: 'Roles', path: '/roles' },
      { icon: Shield, label: 'Permissions', path: '/permissions' },
    ]
  },
  { icon: Building2, label: 'Organizations', path: '/organizations', roles: ['super_admin'] },
  { icon: Network, label: 'Network', path: '/network', roles: ['super_admin'] },
  { 
    icon: MapPin, 
    label: 'Outlets', 
    roles: ['super_admin', 'admin', 'employee'],
    subItems: [
      { icon: Store, label: 'Total Outlets', path: '/outlets' },
      { icon: ClipboardCheck, label: 'Beat Productive Calls', path: '/beat-productive-calls' },
    ]
  },
  { icon: Route, label: 'Routes', path: '/routes', roles: ['admin', 'employee'] },
  { icon: ShoppingCart, label: 'Orders', path: '/orders', roles: ['super_admin', 'admin', 'employee'] },
  { icon: Package, label: 'Products', path: '/products', roles: ['super_admin', 'admin'] },
  { icon: BarChart3, label: 'Analytics', path: '/analytics', roles: ['super_admin', 'admin'] },
  { icon: Settings, label: 'Settings', path: '/settings', roles: ['super_admin', 'admin', 'employee'] },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(['Team Management']);

  const filteredNavItems = navItems.filter((item) => 
    user && item.roles.includes(user.role)
  );

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => 
      prev.includes(label) 
        ? prev.filter(m => m !== label)
        : [...prev, label]
    );
  };

  const isSubItemActive = (item: NavItem) => {
    return item.subItems?.some(sub => location.pathname === sub.path);
  };

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
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isActive = item.path ? location.pathname === item.path : isSubItemActive(item);
            const isOpen = openMenus.includes(item.label);

            if (hasSubItems) {
              return (
                <li key={item.label}>
                  <Collapsible open={isOpen && !collapsed} onOpenChange={() => toggleMenu(item.label)}>
                    <CollapsibleTrigger asChild>
                      <button
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 w-full',
                          isActive
                            ? 'bg-sidebar-primary/20 text-sidebar-primary'
                            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        )}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                            <ChevronDown className={cn(
                              'h-4 w-4 transition-transform duration-200',
                              isOpen ? 'rotate-180' : ''
                            )} />
                          </>
                        )}
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1">
                      <ul className="space-y-1 pl-4">
                        {item.subItems?.map((subItem) => {
                          const isSubActive = location.pathname === subItem.path;
                          return (
                            <li key={subItem.path}>
                              <Link
                                to={subItem.path}
                                className={cn(
                                  'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200',
                                  isSubActive
                                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                                    : 'text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                )}
                              >
                                <subItem.icon className="h-4 w-4 flex-shrink-0" />
                                <span className="text-sm">{subItem.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </li>
              );
            }

            return (
              <li key={item.path}>
                <Link
                  to={item.path!}
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
