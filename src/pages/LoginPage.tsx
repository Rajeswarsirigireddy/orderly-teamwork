import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package, Shield, UserCog, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RoleOption {
  role: UserRole;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const roleOptions: RoleOption[] = [
  {
    role: 'super_admin',
    title: 'Super Admin',
    description: 'Full system access, manage all organizations and users',
    icon: Shield,
    color: 'from-primary to-accent',
  },
  {
    role: 'admin',
    title: 'Admin',
    description: 'Manage team, territories, and view HQ analytics',
    icon: UserCog,
    color: 'from-success to-emerald-400',
  },
  {
    role: 'employee',
    title: 'Field Representative',
    description: 'Daily visits, order entry, and route management',
    icon: Users,
    color: 'from-warning to-orange-400',
  },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole) => {
    login(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Logo and Title */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 shadow-lg">
            <Package className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">FieldSales Pro</h1>
          <p className="text-lg text-muted-foreground">
            FMCG Sales Force Automation Platform
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-3 gap-6">
          {roleOptions.map((option, index) => (
            <button
              key={option.role}
              onClick={() => handleLogin(option.role)}
              className={cn(
                'group relative overflow-hidden rounded-2xl bg-card p-6 shadow-card transition-all duration-300',
                'hover:shadow-lg hover:-translate-y-1 hover:border-primary/50',
                'border border-border text-left animate-slide-up'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay */}
              <div
                className={cn(
                  'absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity',
                  `bg-gradient-to-br ${option.color}`
                )}
              />

              {/* Icon */}
              <div
                className={cn(
                  'inline-flex items-center justify-center h-12 w-12 rounded-xl mb-4',
                  `bg-gradient-to-br ${option.color}`
                )}
              >
                <option.icon className="h-6 w-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {option.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {option.description}
              </p>

              {/* Arrow indicator */}
              <div className="mt-4 flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Login as {option.title}</span>
                <svg
                  className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Demo notice */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Demo Mode: Select a role to explore the dashboard
        </p>
      </div>
    </div>
  );
}
