import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Store, Calendar, Users, TrendingUp } from 'lucide-react';
import type { Outlet } from './OutletFormModal';

interface ViewOutletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  outlet: Outlet | null;
}

const categoryColors: Record<string, string> = {
  'Supermarket': 'bg-primary/10 text-primary border-primary/20',
  'Hypermarket': 'bg-success/10 text-success border-success/20',
  'Convenience': 'bg-warning/10 text-warning border-warning/20',
  'Kirana': 'bg-accent/10 text-accent border-accent/20',
};

const stockColors: Record<string, string> = {
  'High': 'bg-success/10 text-success',
  'Medium': 'bg-warning/10 text-warning',
  'Low': 'bg-destructive/10 text-destructive',
};

export function ViewOutletDialog({ open, onOpenChange, outlet }: ViewOutletDialogProps) {
  if (!outlet) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="block">{outlet.outlet}</span>
              <Badge variant="outline" className="font-mono text-xs mt-1">
                {outlet.outletId}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Status */}
            <div className="flex items-center gap-3">
              <Badge 
                variant="outline" 
                className={outlet.status === 'active' 
                  ? 'bg-success/10 text-success border-success/20' 
                  : 'bg-destructive/10 text-destructive border-destructive/20'
                }
              >
                <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${outlet.status === 'active' ? 'bg-success' : 'bg-destructive'}`}></span>
                {outlet.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
              <Badge variant="outline" className={categoryColors[outlet.category]}>
                {outlet.category}
              </Badge>
              <Badge variant="outline" className={stockColors[outlet.stockPosition]}>
                Stock: {outlet.stockPosition}
              </Badge>
            </div>

            <Separator />

            {/* Location & Route */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Location & Route
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">HQ:</span>
                  <span className="ml-2 font-medium">{outlet.hq}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Point Routes:</span>
                  <span className="ml-2 font-mono">{outlet.pointRoutes}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">SO Name:</span>
                  <span className="ml-2 font-medium">{outlet.soName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Position:</span>
                  <Badge variant="outline" className="ml-2">
                    {outlet.position}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Owner & Contact */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Owner & Contact
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Owner Name:</span>
                  <span className="ml-2 font-medium">{outlet.ownerName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span>{outlet.phone}</span>
                </div>
                {outlet.altContactPerson && (
                  <>
                    <div>
                      <span className="text-muted-foreground">Alt Contact:</span>
                      <span className="ml-2">{outlet.altContactPerson}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{outlet.altPhone}</span>
                    </div>
                  </>
                )}
                {outlet.altEmail && (
                  <div className="col-span-2 flex items-center gap-1">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span>{outlet.altEmail}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Store Details */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Store Details
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Founded Year:</span>
                  <span className="ml-2 font-medium">{outlet.storeFoundedYear}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Daily Foot Traffic:</span>
                  <span className="ml-2 font-medium">{outlet.avgDailyFootTraffic}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Area:</span>
                  <span className="ml-2 font-mono">{outlet.areaSFT} SFT</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Shape:</span>
                  <span className="ml-2">{outlet.outletShape}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Diabetic Status:</span>
                  <Badge variant="outline" className={outlet.diabeticStatus === 'Yes' ? 'ml-2 bg-success/10 text-success' : 'ml-2 bg-muted text-muted-foreground'}>
                    {outlet.diabeticStatus}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Timestamps */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Timeline
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Added On:</span>
                  <span className="ml-2">{outlet.addedOn}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="ml-2">{outlet.latestUpdatedOn}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
