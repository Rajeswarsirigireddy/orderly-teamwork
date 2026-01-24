import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, MoreVertical, Mail, Phone, MapPin, CalendarIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';

const teamMembers = [
  { id: '1', name: 'Michael Chen', email: 'michael@fmcg.com', phone: '+91 98765 43210', role: 'Field Rep', territory: 'Downtown District', status: 'active', visits: 145, sales: 485000 },
  { id: '2', name: 'Priya Sharma', email: 'priya@fmcg.com', phone: '+91 98765 43211', role: 'Field Rep', territory: 'North Zone', status: 'active', visits: 132, sales: 420000 },
  { id: '3', name: 'Raj Kumar', email: 'raj@fmcg.com', phone: '+91 98765 43212', role: 'Field Rep', territory: 'South Zone', status: 'inactive', visits: 98, sales: 310000 },
  { id: '4', name: 'Anita Desai', email: 'anita@fmcg.com', phone: '+91 98765 43213', role: 'Team Lead', territory: 'East Zone', status: 'active', visits: 156, sales: 520000 },
  { id: '5', name: 'Vikram Singh', email: 'vikram@fmcg.com', phone: '+91 98765 43214', role: 'Field Rep', territory: 'West Zone', status: 'active', visits: 112, sales: 380000 },
  { id: '6', name: 'Sneha Gupta', email: 'sneha@fmcg.com', phone: '+91 98765 43215', role: 'Field Rep', territory: 'Central Zone', status: 'active', visits: 128, sales: 395000 },
];

const designations = [
  'Zonal Sales Manager',
  'Area Sales Manager',
  'Regional Sales Manager',
  'Sales Officer',
  'Sales Executive',
  'Sales Incharge',
  'Sales Promoter',
  'Distributor',
  'Sr Sales Officer',
  'NHP USER',
];

const roles = [
  'Zonal Sales Manager',
  'Area Sales Manager',
  'Regional Sales Manager',
  'Sales Officer',
  'Sales Executive',
  'Sales Incharge',
  'Sales Promoter',
  'Distributor',
  'Sr Sales Officer',
  'NHP USER',
];

const regionalOffices = [
  'Hyderabad',
  'Bengaluru',
  'Kolkatta',
  'Pune',
  'Mumbai',
  'Andhra Pradesh',
  'Delhi',
  'Telangana',
  'Lucknow',
  'UP',
];

const employmentTypes = ['ON ROLL', 'OFF ROLL', 'OFFICE'];
const genders = ['Male', 'Female', 'Transgender', 'Other'];

const reportingManagers = [
  { id: 'MGR001', name: 'Rajesh Kumar' },
  { id: 'MGR002', name: 'Sunita Sharma' },
  { id: 'MGR003', name: 'Amit Patel' },
  { id: 'MGR004', name: 'Priya Singh' },
];

const employeeFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits').max(15),
  employeeId: z.string().min(1, 'Employee ID is required').max(20),
  dateOfBirth: z.date({ required_error: 'Date of birth is required' }),
  dateOfJoin: z.date({ required_error: 'Date of join is required' }),
  gender: z.string().min(1, 'Gender is required'),
  email: z.string().email('Invalid email address').max(255),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password is required'),
  designation: z.string().min(1, 'Designation is required'),
  role: z.string().min(1, 'Role is required'),
  regionalOffice: z.string().min(1, 'Regional office is required'),
  employmentType: z.string().min(1, 'Employment type is required'),
  reportingManagerId: z.string().min(1, 'Reporting manager ID is required'),
  reportingManagerName: z.string().min(1, 'Reporting manager name is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type EmployeeFormData = z.infer<typeof employeeFormSchema>;

export default function TeamPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      employeeId: '',
      gender: '',
      email: '',
      password: '',
      confirmPassword: '',
      designation: '',
      role: '',
      regionalOffice: '',
      employmentType: '',
      reportingManagerId: '',
      reportingManagerName: '',
    },
  });

  const onSubmit = (data: EmployeeFormData) => {
    console.log('Employee data:', data);
    toast({
      title: 'Employee Created',
      description: `${data.fullName} has been added successfully.`,
    });
    setIsDialogOpen(false);
    form.reset();
  };

  const handleManagerSelect = (managerId: string) => {
    const manager = reportingManagers.find(m => m.id === managerId);
    if (manager) {
      form.setValue('reportingManagerId', manager.id);
      form.setValue('reportingManagerName', manager.name);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Team Management</h1>
            <p className="text-muted-foreground">Manage your sales team members</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Create New Employee</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[75vh] pr-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Phone Number */}
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Employee ID */}
                      <FormField
                        control={form.control}
                        name="employeeId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Employee ID *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter employee ID" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Date of Birth */}
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date Of Birth *</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date > new Date() || date < new Date("1950-01-01")}
                                  initialFocus
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Date of Join */}
                      <FormField
                        control={form.control}
                        name="dateOfJoin"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date Of Join *</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date("2000-01-01")}
                                  initialFocus
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Gender */}
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {genders.map((gender) => (
                                  <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Email */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Password */}
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password *</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Confirm Password */}
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password *</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Confirm password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Designation */}
                      <FormField
                        control={form.control}
                        name="designation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Designation *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select designation" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {designations.map((designation) => (
                                  <SelectItem key={designation} value={designation}>{designation}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Role */}
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {roles.map((role) => (
                                  <SelectItem key={role} value={role}>{role}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Regional Office */}
                      <FormField
                        control={form.control}
                        name="regionalOffice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Regional Office *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select regional office" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {regionalOffices.map((office) => (
                                  <SelectItem key={office} value={office}>{office}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Employment Type */}
                      <FormField
                        control={form.control}
                        name="employmentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Employment Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select employment type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {employmentTypes.map((type) => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Reporting Manager */}
                      <FormField
                        control={form.control}
                        name="reportingManagerId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reporting Manager *</FormLabel>
                            <Select onValueChange={handleManagerSelect} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select reporting manager" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {reportingManagers.map((manager) => (
                                  <SelectItem key={manager.id} value={manager.id}>
                                    {manager.id} - {manager.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Reporting Manager Name (auto-filled) */}
                      <FormField
                        control={form.control}
                        name="reportingManagerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reporting Manager Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Auto-filled from selection" {...field} readOnly className="bg-muted" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="btn-gradient-primary">
                        Create Employee
                      </Button>
                    </div>
                  </form>
                </Form>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Total Members</p>
            <p className="text-2xl font-bold text-foreground">6</p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-success">5</p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Total Visits (MTD)</p>
            <p className="text-2xl font-bold text-foreground">771</p>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Total Sales (MTD)</p>
            <p className="text-2xl font-bold text-primary">₹25.1L</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search team members..." className="pl-9" />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-card shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Territory</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Visits (MTD)</TableHead>
                <TableHead>Sales (MTD)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {member.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {member.territory}
                    </div>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.visits}</TableCell>
                  <TableCell>₹{(member.sales / 1000).toFixed(0)}k</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={member.status === 'active' ? 'badge-success' : 'bg-muted text-muted-foreground'}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>View Route</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
