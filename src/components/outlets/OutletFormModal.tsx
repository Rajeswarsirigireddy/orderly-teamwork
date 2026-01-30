import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const outletFormSchema = z.object({
  hq: z.string().min(1, 'HQ is required'),
  pointRoutes: z.string().min(1, 'Point Routes is required'),
  soName: z.string().min(1, 'SO Name is required'),
  outlet: z.string().min(1, 'Outlet name is required'),
  outletId: z.string().min(1, 'Outlet ID is required'),
  ownerName: z.string().min(1, 'Owner name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  position: z.enum(['Primary', 'Secondary']),
  altContactPerson: z.string().optional(),
  altPhone: z.string().optional(),
  altEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  storeFoundedYear: z.string().min(4, 'Year is required'),
  avgDailyFootTraffic: z.string().min(1, 'Foot traffic is required'),
  category: z.enum(['Supermarket', 'Hypermarket', 'Convenience', 'Kirana']),
  areaSFT: z.string().min(1, 'Area is required'),
  outletShape: z.enum(['Rectangle', 'Square', 'L-Shape']),
  stockPosition: z.enum(['High', 'Medium', 'Low']),
  diabeticStatus: z.enum(['Yes', 'No']),
  status: z.enum(['active', 'inactive']),
});

export type OutletFormData = z.infer<typeof outletFormSchema>;

export interface Outlet extends OutletFormData {
  id: string;
  addedOn: string;
  latestUpdatedOn: string;
}

interface OutletFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  outlet?: Outlet | null;
  onSubmit: (data: OutletFormData) => void;
  mode: 'create' | 'edit';
}

const hqOptions = ['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'];
const categoryOptions = ['Supermarket', 'Hypermarket', 'Convenience', 'Kirana'];
const shapeOptions = ['Rectangle', 'Square', 'L-Shape'];
const stockOptions = ['High', 'Medium', 'Low'];

export function OutletFormModal({ open, onOpenChange, outlet, onSubmit, mode }: OutletFormModalProps) {
  const form = useForm<OutletFormData>({
    resolver: zodResolver(outletFormSchema),
    defaultValues: outlet ? {
      hq: outlet.hq,
      pointRoutes: outlet.pointRoutes,
      soName: outlet.soName,
      outlet: outlet.outlet,
      outletId: outlet.outletId,
      ownerName: outlet.ownerName,
      phone: outlet.phone,
      position: outlet.position as 'Primary' | 'Secondary',
      altContactPerson: outlet.altContactPerson || '',
      altPhone: outlet.altPhone || '',
      altEmail: outlet.altEmail || '',
      storeFoundedYear: outlet.storeFoundedYear,
      avgDailyFootTraffic: outlet.avgDailyFootTraffic,
      category: outlet.category as 'Supermarket' | 'Hypermarket' | 'Convenience' | 'Kirana',
      areaSFT: outlet.areaSFT,
      outletShape: outlet.outletShape as 'Rectangle' | 'Square' | 'L-Shape',
      stockPosition: outlet.stockPosition as 'High' | 'Medium' | 'Low',
      diabeticStatus: outlet.diabeticStatus as 'Yes' | 'No',
      status: outlet.status as 'active' | 'inactive',
    } : {
      hq: '',
      pointRoutes: '',
      soName: '',
      outlet: '',
      outletId: '',
      ownerName: '',
      phone: '',
      position: 'Primary',
      altContactPerson: '',
      altPhone: '',
      altEmail: '',
      storeFoundedYear: '',
      avgDailyFootTraffic: '',
      category: 'Supermarket',
      areaSFT: '',
      outletShape: 'Rectangle',
      stockPosition: 'Medium',
      diabeticStatus: 'No',
      status: 'active',
    },
  });

  const handleSubmit = (data: OutletFormData) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Add New Outlet' : 'Edit Outlet'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
                {/* Basic Information */}
                <FormField
                  control={form.control}
                  name="hq"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>HQ *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select HQ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {hqOptions.map(hq => (
                            <SelectItem key={hq} value={hq}>{hq}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pointRoutes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Point Routes *</FormLabel>
                      <FormControl>
                        <Input placeholder="Route-HYD-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="soName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SO Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Sales Officer Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="outlet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Outlet Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Outlet Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="outletId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Outlet ID *</FormLabel>
                      <FormControl>
                        <Input placeholder="OUT001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Owner Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 XX XXXX XXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Position" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Primary">Primary</SelectItem>
                          <SelectItem value="Secondary">Secondary</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Alternative Contact */}
                <FormField
                  control={form.control}
                  name="altContactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alt Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="Alternative Contact" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="altPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alt Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 XX XXXX XXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="altEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alt Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Store Details */}
                <FormField
                  control={form.control}
                  name="storeFoundedYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Founded Year *</FormLabel>
                      <FormControl>
                        <Input placeholder="2020" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="avgDailyFootTraffic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avg Daily Foot Traffic *</FormLabel>
                      <FormControl>
                        <Input placeholder="500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryOptions.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="areaSFT"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area (SFT) *</FormLabel>
                      <FormControl>
                        <Input placeholder="2500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="outletShape"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Outlet Shape *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Shape" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {shapeOptions.map(shape => (
                            <SelectItem key={shape} value={shape}>{shape}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stockPosition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Position *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Stock Position" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {stockOptions.map(stock => (
                            <SelectItem key={stock} value={stock}>{stock}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="diabeticStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diabetic Status *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="btn-gradient-primary">
                {mode === 'create' ? 'Add Outlet' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
