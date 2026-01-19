import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

export function StatsCard({
  title,
  value,
  change,
  changeLabel = 'vs last week',
  icon,
  variant = 'default',
}: StatsCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  const iconBgClasses = {
    default: 'bg-primary/10 text-primary',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <div className="stat-card animate-slide-up">
      <div className="stat-card-gradient" />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
            {change !== undefined && (
              <div className="mt-2 flex items-center gap-1">
                {isPositive && <TrendingUp className="h-4 w-4 text-success" />}
                {isNegative && <TrendingDown className="h-4 w-4 text-destructive" />}
                <span
                  className={cn(
                    'text-sm font-medium',
                    isPositive && 'text-success',
                    isNegative && 'text-destructive',
                    !isPositive && !isNegative && 'text-muted-foreground'
                  )}
                >
                  {isPositive && '+'}
                  {change}%
                </span>
                <span className="text-sm text-muted-foreground">{changeLabel}</span>
              </div>
            )}
          </div>
          <div className={cn('rounded-xl p-3', iconBgClasses[variant])}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
