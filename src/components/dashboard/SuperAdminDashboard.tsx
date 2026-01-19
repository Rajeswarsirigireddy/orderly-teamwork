import { StatsCard } from './StatsCard';
import { SalesChart } from './SalesChart';
import { RecentActivity } from './RecentActivity';
import { TopPerformers } from './TopPerformers';
import { Building2, Users, ShoppingCart, TrendingUp, MapPin, Package } from 'lucide-react';

export function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">Complete overview of all operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="₹24.5L"
          change={12.5}
          icon={<TrendingUp className="h-6 w-6" />}
          variant="primary"
        />
        <StatsCard
          title="Active Organizations"
          value="12"
          change={2}
          changeLabel="new this month"
          icon={<Building2 className="h-6 w-6" />}
          variant="success"
        />
        <StatsCard
          title="Total Users"
          value="248"
          change={8.3}
          icon={<Users className="h-6 w-6" />}
          variant="default"
        />
        <StatsCard
          title="Total Orders"
          value="1,847"
          change={15.2}
          icon={<ShoppingCart className="h-6 w-6" />}
          variant="warning"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Active Outlets"
          value="3,254"
          change={5.1}
          icon={<MapPin className="h-6 w-6" />}
        />
        <StatsCard
          title="Products Listed"
          value="456"
          change={3.2}
          icon={<Package className="h-6 w-6" />}
        />
        <StatsCard
          title="Avg Order Value"
          value="₹12,450"
          change={-2.1}
          icon={<ShoppingCart className="h-6 w-6" />}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPerformers />
        <div className="rounded-xl bg-card p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Regional Performance</h3>
          <div className="space-y-4">
            {[
              { region: 'North India', value: 85, revenue: '₹8.2L' },
              { region: 'South India', value: 72, revenue: '₹6.8L' },
              { region: 'West India', value: 68, revenue: '₹5.4L' },
              { region: 'East India', value: 54, revenue: '₹4.1L' },
            ].map((item) => (
              <div key={item.region} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.region}</span>
                  <span className="text-muted-foreground">{item.revenue}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${item.value}%`,
                      background: 'var(--gradient-primary)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
