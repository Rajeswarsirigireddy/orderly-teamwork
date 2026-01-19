import { StatsCard } from './StatsCard';
import { TodayVisits } from './TodayVisits';
import { QuickActions } from './QuickActions';
import { ShoppingCart, MapPin, Target, Clock, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
          <p className="text-muted-foreground">Downtown District Route</p>
        </div>
        <Badge className="badge-info text-sm py-1 px-3">
          <Clock className="h-4 w-4 mr-1" />
          5 Visits Remaining
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Today's Sales"
          value="₹73,000"
          change={18.5}
          icon={<TrendingUp className="h-5 w-5" />}
          variant="primary"
        />
        <StatsCard
          title="Orders Placed"
          value="4"
          change={2}
          changeLabel="more than yesterday"
          icon={<ShoppingCart className="h-5 w-5" />}
          variant="success"
        />
        <StatsCard
          title="Visits Done"
          value="2/7"
          icon={<MapPin className="h-5 w-5" />}
          variant="warning"
        />
        <StatsCard
          title="Target Progress"
          value="68%"
          icon={<Target className="h-5 w-5" />}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TodayVisits />
        </div>
        <div className="space-y-6">
          <QuickActions />
          
          {/* Daily Target Card */}
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Daily Target</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Sales Target</span>
                  <span className="text-sm font-medium text-foreground">₹73K / ₹1L</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: '73%', background: 'var(--gradient-success)' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Visit Target</span>
                  <span className="text-sm font-medium text-foreground">2 / 7</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: '28%', background: 'var(--gradient-warning)' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">New Outlets</span>
                  <span className="text-sm font-medium text-foreground">1 / 2</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: '50%', background: 'var(--gradient-primary)' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Pending Tasks</h3>
            <div className="space-y-3">
              {[
                { task: 'Collect payment from SuperMart', priority: 'high' },
                { task: 'Update stock at QuickStop', priority: 'medium' },
                { task: 'Photo verification needed', priority: 'low' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      item.priority === 'high'
                        ? 'bg-destructive'
                        : item.priority === 'medium'
                        ? 'bg-warning'
                        : 'bg-muted-foreground'
                    }`}
                  />
                  <span className="text-sm text-foreground">{item.task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
