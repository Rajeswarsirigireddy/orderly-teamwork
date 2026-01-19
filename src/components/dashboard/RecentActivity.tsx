import { cn } from '@/lib/utils';
import { ShoppingCart, MapPin, UserPlus, CheckCircle2 } from 'lucide-react';

interface Activity {
  id: string;
  type: 'order' | 'visit' | 'user' | 'target';
  title: string;
  description: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'order',
    title: 'New order placed',
    description: 'SuperMart Downtown - ₹45,000',
    time: '5 min ago',
  },
  {
    id: '2',
    type: 'visit',
    title: 'Store visit completed',
    description: 'QuickStop Express by Michael Chen',
    time: '15 min ago',
  },
  {
    id: '3',
    type: 'target',
    title: 'Daily target achieved',
    description: 'North Region hit 105% of target',
    time: '1 hour ago',
  },
  {
    id: '4',
    type: 'user',
    title: 'New team member added',
    description: 'Priya Sharma joined as Field Rep',
    time: '2 hours ago',
  },
  {
    id: '5',
    type: 'order',
    title: 'Large order confirmed',
    description: 'MegaMart Central - ₹1,25,000',
    time: '3 hours ago',
  },
];

const iconMap = {
  order: ShoppingCart,
  visit: MapPin,
  user: UserPlus,
  target: CheckCircle2,
};

const colorMap = {
  order: 'bg-info/10 text-info',
  visit: 'bg-primary/10 text-primary',
  user: 'bg-accent/10 text-accent',
  target: 'bg-success/10 text-success',
};

export function RecentActivity() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:underline">View all</button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type];
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className={cn('rounded-lg p-2', colorMap[activity.type])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {activity.description}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
