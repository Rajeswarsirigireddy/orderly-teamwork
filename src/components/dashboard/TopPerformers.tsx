import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

interface Performer {
  id: string;
  name: string;
  avatar: string;
  territory: string;
  sales: number;
  target: number;
  trend: number;
}

const performers: Performer[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    avatar: 'RS',
    territory: 'Mumbai Central',
    sales: 485000,
    target: 400000,
    trend: 21,
  },
  {
    id: '2',
    name: 'Priya Patel',
    avatar: 'PP',
    territory: 'Delhi NCR',
    sales: 420000,
    target: 400000,
    trend: 15,
  },
  {
    id: '3',
    name: 'Amit Kumar',
    avatar: 'AK',
    territory: 'Bangalore South',
    sales: 395000,
    target: 400000,
    trend: 8,
  },
  {
    id: '4',
    name: 'Sneha Gupta',
    avatar: 'SG',
    territory: 'Pune West',
    sales: 380000,
    target: 400000,
    trend: 12,
  },
];

export function TopPerformers() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Top Performers</h3>
        <Badge variant="secondary" className="text-xs">This Month</Badge>
      </div>
      <div className="space-y-4">
        {performers.map((performer, index) => {
          const progress = Math.round((performer.sales / performer.target) * 100);
          return (
            <div
              key={performer.id}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <span className="text-lg font-bold text-muted-foreground w-6">
                {index + 1}
              </span>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {performer.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{performer.name}</p>
                <p className="text-xs text-muted-foreground">{performer.territory}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  ₹{(performer.sales / 1000).toFixed(0)}k
                </p>
                <div className="flex items-center justify-end gap-1 text-success">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs font-medium">+{performer.trend}%</span>
                </div>
              </div>
              <div className="w-16">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success rounded-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right mt-1">{progress}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
