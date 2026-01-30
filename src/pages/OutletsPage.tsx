import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Search, Plus, MapPin, Phone, Store, Eye, Pencil, Trash2, CheckCircle, XCircle, Building2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OutletFormModal, type Outlet, type OutletFormData } from '@/components/outlets/OutletFormModal';
import { ViewOutletDialog } from '@/components/outlets/ViewOutletDialog';
import { DeleteOutletDialog } from '@/components/outlets/DeleteOutletDialog';
import { toast } from '@/hooks/use-toast';

const initialOutlets: Outlet[] = [
  { 
    id: '1', 
    hq: 'Hyderabad', 
    pointRoutes: 'Route-HYD-001', 
    soName: 'Rahul Verma', 
    outlet: 'SuperMart Downtown', 
    outletId: 'OUT001', 
    ownerName: 'Rajesh Patel', 
    phone: '+91 22 1234 5678', 
    position: 'Primary',
    altContactPerson: 'Amit Patel',
    altPhone: '+91 22 9876 5432',
    altEmail: 'amit@supermart.com',
    storeFoundedYear: '2015',
    avgDailyFootTraffic: '450',
    category: 'Supermarket',
    areaSFT: '2500',
    outletShape: 'Rectangle',
    stockPosition: 'High',
    diabeticStatus: 'Yes',
    addedOn: '2024-01-15',
    latestUpdatedOn: '2024-12-20',
    status: 'active'
  },
  { 
    id: '2', 
    hq: 'Bengaluru', 
    pointRoutes: 'Route-BLR-002', 
    soName: 'Priya Mehta', 
    outlet: 'QuickStop Express', 
    outletId: 'OUT002', 
    ownerName: 'Suresh Kumar', 
    phone: '+91 80 1234 5679', 
    position: 'Secondary',
    altContactPerson: 'Kavita Kumar',
    altPhone: '+91 80 9876 5433',
    altEmail: 'kavita@quickstop.com',
    storeFoundedYear: '2018',
    avgDailyFootTraffic: '280',
    category: 'Convenience',
    areaSFT: '800',
    outletShape: 'Square',
    stockPosition: 'Medium',
    diabeticStatus: 'No',
    addedOn: '2024-02-10',
    latestUpdatedOn: '2024-12-18',
    status: 'active'
  },
  { 
    id: '3', 
    hq: 'Mumbai', 
    pointRoutes: 'Route-MUM-003', 
    soName: 'Vikram Singh', 
    outlet: 'MegaMart Central', 
    outletId: 'OUT003', 
    ownerName: 'Amit Shah', 
    phone: '+91 22 1234 5680', 
    position: 'Primary',
    altContactPerson: 'Neha Shah',
    altPhone: '+91 22 9876 5434',
    altEmail: 'neha@megamart.com',
    storeFoundedYear: '2010',
    avgDailyFootTraffic: '850',
    category: 'Hypermarket',
    areaSFT: '8000',
    outletShape: 'L-Shape',
    stockPosition: 'High',
    diabeticStatus: 'Yes',
    addedOn: '2023-06-20',
    latestUpdatedOn: '2024-12-22',
    status: 'active'
  },
  { 
    id: '4', 
    hq: 'Delhi', 
    pointRoutes: 'Route-DEL-004', 
    soName: 'Anita Desai', 
    outlet: 'Corner Grocers', 
    outletId: 'OUT004', 
    ownerName: 'Mohan Lal', 
    phone: '+91 11 1234 5681', 
    position: 'Secondary',
    altContactPerson: 'Ravi Lal',
    altPhone: '+91 11 9876 5435',
    altEmail: 'ravi@cornergrocers.com',
    storeFoundedYear: '2005',
    avgDailyFootTraffic: '180',
    category: 'Kirana',
    areaSFT: '400',
    outletShape: 'Rectangle',
    stockPosition: 'Low',
    diabeticStatus: 'No',
    addedOn: '2023-08-15',
    latestUpdatedOn: '2024-12-10',
    status: 'inactive'
  },
  { 
    id: '5', 
    hq: 'Pune', 
    pointRoutes: 'Route-PUN-005', 
    soName: 'Sneha Gupta', 
    outlet: 'Fresh Foods Plus', 
    outletId: 'OUT005', 
    ownerName: 'Neha Sharma', 
    phone: '+91 20 1234 5682', 
    position: 'Primary',
    altContactPerson: 'Deepak Sharma',
    altPhone: '+91 20 9876 5436',
    altEmail: 'deepak@freshfoods.com',
    storeFoundedYear: '2019',
    avgDailyFootTraffic: '350',
    category: 'Supermarket',
    areaSFT: '1800',
    outletShape: 'Square',
    stockPosition: 'Medium',
    diabeticStatus: 'Yes',
    addedOn: '2024-03-01',
    latestUpdatedOn: '2024-12-15',
    status: 'active'
  },
  { 
    id: '6', 
    hq: 'Kolkata', 
    pointRoutes: 'Route-KOL-006', 
    soName: 'Raj Kumar', 
    outlet: 'Daily Needs Store', 
    outletId: 'OUT006', 
    ownerName: 'Vikram Singh', 
    phone: '+91 33 1234 5683', 
    position: 'Secondary',
    altContactPerson: 'Pooja Singh',
    altPhone: '+91 33 9876 5437',
    altEmail: 'pooja@dailyneeds.com',
    storeFoundedYear: '2012',
    avgDailyFootTraffic: '220',
    category: 'Kirana',
    areaSFT: '600',
    outletShape: 'Rectangle',
    stockPosition: 'Medium',
    diabeticStatus: 'No',
    addedOn: '2023-11-10',
    latestUpdatedOn: '2024-12-19',
    status: 'inactive'
  },
  { 
    id: '7', 
    hq: 'Chennai', 
    pointRoutes: 'Route-CHN-007', 
    soName: 'Michael Chen', 
    outlet: 'Metro Mart', 
    outletId: 'OUT007', 
    ownerName: 'Anand Joshi', 
    phone: '+91 44 1234 5684', 
    position: 'Primary',
    altContactPerson: 'Lakshmi Joshi',
    altPhone: '+91 44 9876 5438',
    altEmail: 'lakshmi@metromart.com',
    storeFoundedYear: '2008',
    avgDailyFootTraffic: '720',
    category: 'Hypermarket',
    areaSFT: '6500',
    outletShape: 'L-Shape',
    stockPosition: 'High',
    diabeticStatus: 'Yes',
    addedOn: '2023-04-05',
    latestUpdatedOn: '2024-12-21',
    status: 'active'
  },
  { 
    id: '8', 
    hq: 'Ahmedabad', 
    pointRoutes: 'Route-AMD-008', 
    soName: 'Kavita Rao', 
    outlet: 'Family Bazaar', 
    outletId: 'OUT008', 
    ownerName: 'Kavita Rao', 
    phone: '+91 79 1234 5685', 
    position: 'Primary',
    altContactPerson: 'Sunil Rao',
    altPhone: '+91 79 9876 5439',
    altEmail: 'sunil@familybazaar.com',
    storeFoundedYear: '2016',
    avgDailyFootTraffic: '400',
    category: 'Supermarket',
    areaSFT: '2200',
    outletShape: 'Square',
    stockPosition: 'High',
    diabeticStatus: 'No',
    addedOn: '2024-01-20',
    latestUpdatedOn: '2024-12-17',
    status: 'active'
  },
];

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

export default function OutletsPage() {
  const [outlets, setOutlets] = useState<Outlet[]>(initialOutlets);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const totalOutlets = outlets.length;
  const activeOutlets = outlets.filter(o => o.status === 'active').length;
  const inactiveOutlets = outlets.filter(o => o.status === 'inactive').length;

  const handleAddOutlet = () => {
    setSelectedOutlet(null);
    setFormMode('create');
    setFormModalOpen(true);
  };

  const handleEditOutlet = (outlet: Outlet) => {
    setSelectedOutlet(outlet);
    setFormMode('edit');
    setFormModalOpen(true);
  };

  const handleViewOutlet = (outlet: Outlet) => {
    setSelectedOutlet(outlet);
    setViewDialogOpen(true);
  };

  const handleDeleteOutlet = (outlet: Outlet) => {
    setSelectedOutlet(outlet);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = (data: OutletFormData) => {
    if (formMode === 'create') {
      const newOutlet: Outlet = {
        ...data,
        id: String(Date.now()),
        addedOn: new Date().toISOString().split('T')[0],
        latestUpdatedOn: new Date().toISOString().split('T')[0],
      };
      setOutlets([...outlets, newOutlet]);
      toast({
        title: 'Outlet Added',
        description: `${data.outlet} has been added successfully.`,
      });
    } else if (selectedOutlet) {
      setOutlets(outlets.map(o => 
        o.id === selectedOutlet.id 
          ? { ...o, ...data, latestUpdatedOn: new Date().toISOString().split('T')[0] }
          : o
      ));
      toast({
        title: 'Outlet Updated',
        description: `${data.outlet} has been updated successfully.`,
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedOutlet) {
      setOutlets(outlets.filter(o => o.id !== selectedOutlet.id));
      toast({
        title: 'Outlet Deleted',
        description: `${selectedOutlet.outlet} has been deleted.`,
        variant: 'destructive',
      });
      setDeleteDialogOpen(false);
      setSelectedOutlet(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Outlets</h1>
            <p className="text-muted-foreground">Manage retail outlets and stores</p>
          </div>
          <Button className="btn-gradient-primary" onClick={handleAddOutlet}>
            <Plus className="h-4 w-4 mr-2" />
            Add Outlet
          </Button>
        </div>

        {/* Stats - Total, Active, Inactive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-card p-5 shadow-card border border-border/50">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Outlets</p>
                <p className="text-3xl font-bold text-foreground">{totalOutlets}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-5 shadow-card border border-border/50">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Outlets</p>
                <p className="text-3xl font-bold text-success">{activeOutlets}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-5 shadow-card border border-border/50">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inactive Outlets</p>
                <p className="text-3xl font-bold text-destructive">{inactiveOutlets}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search outlets..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="HQ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All HQ</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
              <SelectItem value="bengaluru">Bengaluru</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="kolkata">Kolkata</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
              <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="supermarket">Supermarket</SelectItem>
              <SelectItem value="hypermarket">Hypermarket</SelectItem>
              <SelectItem value="convenience">Convenience</SelectItem>
              <SelectItem value="kirana">Kirana</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-card shadow-card border border-border/50 overflow-hidden">
          <ScrollArea className="w-full">
            <div className="min-w-[3000px]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="font-semibold text-foreground whitespace-nowrap sticky left-0 bg-muted/30 z-10">Actions</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">HQ</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Point Routes</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">SO Name</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Outlet</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Outlet ID</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Owner Name</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Phone Number</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Position</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Alt Contact Person</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Alt Phone Number</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Alt Email Address</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Store Founded in Year</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Avg Daily Foot Traffic</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Category</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Area SFT</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Outlet Shape</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Stock Position</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Diabetic Status</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Added On</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Latest Updated On</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Active/Inactive</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outlets.map((outlet) => (
                    <TableRow key={outlet.id} className="group hover:bg-muted/20 transition-colors">
                      <TableCell className="whitespace-nowrap sticky left-0 bg-card group-hover:bg-muted/20 z-10">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewOutlet(outlet)}>
                            <Eye className="h-4 w-4 text-muted-foreground hover:text-primary" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditOutlet(outlet)}>
                            <Pencil className="h-4 w-4 text-muted-foreground hover:text-primary" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteOutlet(outlet)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-medium">{outlet.hq}</span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge variant="outline" className="font-mono text-xs">
                          {outlet.pointRoutes}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap font-medium">{outlet.soName}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                            <Store className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="font-medium">{outlet.outlet}</span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge variant="outline" className="font-mono text-xs bg-muted/50">
                          {outlet.outletId}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap font-medium">{outlet.ownerName}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span className="text-sm">{outlet.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge variant="outline" className={outlet.position === 'Primary' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}>
                          {outlet.position}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">{outlet.altContactPerson}</TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground text-sm">{outlet.altPhone}</TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground text-sm">{outlet.altEmail}</TableCell>
                      <TableCell className="whitespace-nowrap text-center">{outlet.storeFoundedYear}</TableCell>
                      <TableCell className="whitespace-nowrap text-center font-medium">{outlet.avgDailyFootTraffic}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge variant="outline" className={categoryColors[outlet.category]}>
                          {outlet.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-right font-mono">{outlet.areaSFT}</TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">{outlet.outletShape}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge variant="outline" className={stockColors[outlet.stockPosition]}>
                          {outlet.stockPosition}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge variant="outline" className={outlet.diabeticStatus === 'Yes' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}>
                          {outlet.diabeticStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground text-sm">{outlet.addedOn}</TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground text-sm">{outlet.latestUpdatedOn}</TableCell>
                      <TableCell className="whitespace-nowrap">
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      {/* Modals */}
      <OutletFormModal
        open={formModalOpen}
        onOpenChange={setFormModalOpen}
        outlet={selectedOutlet}
        onSubmit={handleFormSubmit}
        mode={formMode}
      />

      <ViewOutletDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        outlet={selectedOutlet}
      />

      <DeleteOutletDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        outlet={selectedOutlet}
        onConfirm={handleDeleteConfirm}
      />
    </DashboardLayout>
  );
}
