import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, CheckCircle2, AlertCircle, Navigation, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const routes = [
  {
    id: '1',
    name: 'Downtown Route A',
    day: 'Monday',
    outlets: [
      { name: 'SuperMart Downtown', time: '09:00 AM', status: 'completed' },
      { name: 'QuickStop Express', time: '10:30 AM', status: 'completed' },
      { name: 'MegaMart Central', time: '12:00 PM', status: 'current' },
      { name: 'Corner Grocers', time: '02:00 PM', status: 'pending' },
      { name: 'Fresh Foods Plus', time: '03:30 PM', status: 'pending' },
    ],
    totalDistance: '24 km',
    estimatedTime: '6 hours',
  },
  {
    id: '2',
    name: 'North Zone Route',
    day: 'Tuesday',
    outlets: [
      { name: 'Metro Mart', time: '09:00 AM', status: 'pending' },
      { name: 'Family Bazaar', time: '10:30 AM', status: 'pending' },
      { name: 'Daily Needs Store', time: '12:00 PM', status: 'pending' },
      { name: 'City Supermarket', time: '02:00 PM', status: 'pending' },
    ],
    totalDistance: '18 km',
    estimatedTime: '5 hours',
  },
  {
    id: '3',
    name: 'South Zone Route',
    day: 'Wednesday',
    outlets: [
      { name: 'Premium Mart', time: '09:00 AM', status: 'pending' },
      { name: 'Value Store', time: '10:30 AM', status: 'pending' },
      { name: 'Express Grocers', time: '12:00 PM', status: 'pending' },
      { name: 'Neighborhood Shop', time: '02:00 PM', status: 'pending' },
      { name: 'Local Mart', time: '03:30 PM', status: 'pending' },
      { name: 'Fresh Corner', time: '04:30 PM', status: 'pending' },
    ],
    totalDistance: '32 km',
    estimatedTime: '7 hours',
  },
];

const statusConfig = {
  completed: { icon: CheckCircle2, color: 'text-success bg-success/10', label: 'Completed' },
  current: { icon: Navigation, color: 'text-primary bg-primary/10', label: 'In Progress' },
  pending: { icon: Clock, color: 'text-muted-foreground bg-muted', label: 'Pending' },
};

export default function RoutesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Routes</h1>
            <p className="text-muted-foreground">Plan and manage your daily routes</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Week View
            </Button>
            <Button className="btn-gradient-primary">
              <Navigation className="h-4 w-4 mr-2" />
              Start Today's Route
            </Button>
          </div>
        </div>

        {/* Route Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {routes.map((route) => {
            const completed = route.outlets.filter(o => o.status === 'completed').length;
            const progress = (completed / route.outlets.length) * 100;
            const isToday = route.day === 'Monday'; // Mock today

            return (
              <div
                key={route.id}
                className={cn(
                  'rounded-xl bg-card p-6 shadow-card',
                  isToday && 'ring-2 ring-primary'
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{route.name}</h3>
                      {isToday && <Badge className="badge-info">Today</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{route.day}</p>
                  </div>
                  <Badge variant="outline">
                    {route.outlets.length} stops
                  </Badge>
                </div>

                {/* Progress */}
                {isToday && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{completed}/{route.outlets.length}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${progress}%`, background: 'var(--gradient-success)' }}
                      />
                    </div>
                  </div>
                )}

                {/* Route Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {route.totalDistance}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {route.estimatedTime}
                  </div>
                </div>

                {/* Outlets List */}
                <div className="space-y-2">
                  {route.outlets.map((outlet, index) => {
                    const config = statusConfig[outlet.status as keyof typeof statusConfig];
                    const Icon = config.icon;
                    return (
                      <div
                        key={index}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-lg',
                          outlet.status === 'current' ? 'bg-primary/5 border border-primary/20' : 'bg-muted/30'
                        )}
                      >
                        <div className={cn('h-8 w-8 rounded-full flex items-center justify-center', config.color)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{outlet.name}</p>
                          <p className="text-xs text-muted-foreground">{outlet.time}</p>
                        </div>
                        {outlet.status === 'current' && (
                          <Button size="sm" className="btn-gradient-primary">
                            Navigate
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View Full Route
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
