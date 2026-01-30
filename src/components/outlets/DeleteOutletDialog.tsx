import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Store, AlertTriangle } from 'lucide-react';
import type { Outlet } from './OutletFormModal';

interface DeleteOutletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  outlet: Outlet | null;
  onConfirm: () => void;
}

export function DeleteOutletDialog({ open, onOpenChange, outlet, onConfirm }: DeleteOutletDialogProps) {
  if (!outlet) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <AlertDialogTitle>Delete Outlet</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-3">
            <p>Are you sure you want to delete this outlet? This action cannot be undone.</p>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border">
              <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                <Store className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{outlet.outlet}</p>
                <p className="text-xs text-muted-foreground">{outlet.outletId} • {outlet.hq}</p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete Outlet
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
