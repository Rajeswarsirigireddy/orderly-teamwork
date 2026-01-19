import { Plus, MapPin, FileText, Camera, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickAction {
  icon: React.ElementType;
  label: string;
  description: string;
  variant: 'primary' | 'secondary';
}

const actions: QuickAction[] = [
  {
    icon: Plus,
    label: 'New Order',
    description: 'Create a quick order',
    variant: 'primary',
  },
  {
    icon: MapPin,
    label: 'Check In',
    description: 'Start outlet visit',
    variant: 'secondary',
  },
  {
    icon: Camera,
    label: 'Shelf Photo',
    description: 'Capture display',
    variant: 'secondary',
  },
  {
    icon: FileText,
    label: 'Daily Report',
    description: 'Submit EOD report',
    variant: 'secondary',
  },
];

export function QuickActions() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card animate-slide-up">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant === 'primary' ? 'default' : 'outline'}
            className={`h-auto flex-col items-start p-4 ${
              action.variant === 'primary' ? 'btn-gradient-primary' : ''
            }`}
          >
            <action.icon className="h-5 w-5 mb-2" />
            <span className="text-sm font-medium">{action.label}</span>
            <span className="text-xs opacity-70">{action.description}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
