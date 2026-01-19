import { StatsCard } from './StatsCard';
import { SalesChart } from './SalesChart';
import { TopPerformers } from './TopPerformers';
import { RecentActivity } from './RecentActivity';
import { Users, ShoppingCart, TrendingUp, MapPin, Target, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const teamMembers = [
  { id: '1', name: 'Michael Chen', avatar: 'MC', status: 'online', visits: 4, target: 6 },
  { id: '2', name: 'Priya Sharma', avatar: 'PS', status: 'online', visits: 5, target: 6 },
  { id: '3', name: 'Raj Kumar', avatar: 'RK', status: 'offline', visits: 3, target: 6 },
  { id: '4', name: 'Anita Desai', avatar: 'AD', status: 'online', visits: 6, target: 6 },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Territory Dashboard</h1>
          <p className="text-muted-foreground">North Region Performance Overview</p>
        </div>
        <Badge className="badge-success text-sm py-1 px-3">
          <Target className="h-4 w-4 mr-1" />
          87% Target Achieved
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Team Revenue"
          value="₹8.2L"
          change={14.2}
          icon={<TrendingUp className="h-6 w-6" />}
          variant="primary"
        />
        <StatsCard
          title="Team Members"
          value="12"
          change={1}
          changeLabel="new this week"
          icon={<Users className="h-6 w-6" />}
          variant="success"
        />
        <StatsCard
          title="Today's Orders"
          value="47"
          change={22.5}
          icon={<ShoppingCart className="h-6 w-6" />}
          variant="warning"
        />
        <StatsCard
          title="Outlets Covered"
          value="234"
          change={8.1}
          icon={<MapPin className="h-6 w-6" />}
        />
      </div>

      {/* Team Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-card p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Team Activity</h3>
              <Badge variant="outline" className="text-xs">
                Live Status
              </Badge>
            </div>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${
                        member.status === 'online' ? 'bg-success' : 'bg-muted-foreground'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{member.name}</p>
                      {member.visits >= member.target && (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {member.visits}/{member.target} visits completed
                    </p>
                  </div>
                  <div className="w-24">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(member.visits / member.target) * 100}%`,
                          background:
                            member.visits >= member.target
                              ? 'var(--gradient-success)'
                              : 'var(--gradient-warning)',
                        }}
                      />
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      member.status === 'online' ? 'badge-success' : 'bg-muted text-muted-foreground'
                    }
                  >
                    {member.status === 'online' ? 'Active' : 'Offline'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
        <RecentActivity />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <TopPerformers />
      </div>
    </div>
  );
}
