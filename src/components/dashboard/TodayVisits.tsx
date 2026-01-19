import { MapPin, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Visit {
  id: string;
  outletName: string;
  address: string;
  time: string;
  status: 'completed' | 'pending' | 'missed';
  orderValue?: number;
}

const visits: Visit[] = [
  {
    id: '1',
    outletName: 'SuperMart Downtown',
    address: '123 Market Street',
    time: '09:00 AM',
    status: 'completed',
    orderValue: 45000,
  },
  {
    id: '2',
    outletName: 'QuickStop Express',
    address: '456 Main Road',
    time: '10:30 AM',
    status: 'completed',
    orderValue: 28000,
  },
  {
    id: '3',
    outletName: 'MegaMart Central',
    address: '789 Commerce Ave',
    time: '12:00 PM',
    status: 'pending',
  },
  {
    id: '4',
    outletName: 'Corner Grocers',
    address: '321 Oak Lane',
    time: '02:30 PM',
    status: 'pending',
  },
  {
    id: '5',
    outletName: 'Fresh Foods Plus',
    address: '654 Green Street',
    time: '04:00 PM',
    status: 'pending',
  },
];

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    label: 'Completed',
    className: 'badge-success',
  },
  pending: {
    icon: Clock,
    label: 'Pending',
    className: 'badge-warning',
  },
  missed: {
    icon: XCircle,
    label: 'Missed',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

export function TodayVisits() {
  const completedCount = visits.filter((v) => v.status === 'completed').length;
  const totalCount = visits.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="rounded-xl bg-card p-6 shadow-card animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Today's Route</h3>
          <p className="text-sm text-muted-foreground">
            {completedCount} of {totalCount} visits completed
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{progress}%</p>
          <p className="text-xs text-muted-foreground">Progress</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: 'var(--gradient-success)',
          }}
        />
      </div>

      <div className="space-y-3">
        {visits.map((visit) => {
          const StatusIcon = statusConfig[visit.status].icon;
          return (
            <div
              key={visit.id}
              className={cn(
                'flex items-center gap-4 p-4 rounded-lg border transition-colors',
                visit.status === 'completed'
                  ? 'bg-success/5 border-success/20'
                  : 'bg-card border-border hover:border-primary/30'
              )}
            >
              <div
                className={cn(
                  'flex items-center justify-center h-10 w-10 rounded-lg',
                  visit.status === 'completed'
                    ? 'bg-success/10 text-success'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground truncate">
                    {visit.outletName}
                  </p>
                  <Badge variant="outline" className={statusConfig[visit.status].className}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConfig[visit.status].label}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground">{visit.address}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{visit.time}</span>
                </div>
              </div>
              {visit.orderValue && (
                <div className="text-right">
                  <p className="text-sm font-semibold text-success">
                    ₹{visit.orderValue.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Order</p>
                </div>
              )}
              {visit.status === 'pending' && (
                <Button size="sm" className="btn-gradient-primary">
                  Start Visit
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
