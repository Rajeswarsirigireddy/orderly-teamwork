import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Globe,
  Building,
  MapPin,
  Navigation,
  Plus,
  ChevronRight,
  ChevronDown,
  Edit,
  Trash2,
  Search,
  Users,
  Store,
  ArrowRightLeft,
  Eye,
} from 'lucide-react';

// Outlet interface
interface Outlet {
  id: string;
  name: string;
  type: string;
  address: string;
  owner: string;
  phone: string;
}

// Types
interface Route {
  id: string;
  name: string;
  outletIds: string[];
  assignedRep?: string;
}

interface Beat {
  id: string;
  name: string;
  routes: Route[];
}

interface City {
  id: string;
  name: string;
  beats: Beat[];
}

interface Root {
  id: string;
  name: string;
  cities: City[];
}

// All outlets data
const allOutlets: Outlet[] = [
  { id: 'o-1', name: 'SuperMart Downtown', type: 'Supermarket', address: '123 CP Market St', owner: 'Rajesh Patel', phone: '+91 11 1234 5678' },
  { id: 'o-2', name: 'QuickStop Express', type: 'Convenience', address: '456 CP Inner Rd', owner: 'Priya Mehta', phone: '+91 11 1234 5679' },
  { id: 'o-3', name: 'MegaMart Central', type: 'Hypermarket', address: '789 CP Plaza', owner: 'Amit Shah', phone: '+91 11 1234 5680' },
  { id: 'o-4', name: 'Corner Grocers', type: 'Kirana', address: '321 CP Lane', owner: 'Suresh Kumar', phone: '+91 11 1234 5681' },
  { id: 'o-5', name: 'Fresh Foods Plus', type: 'Supermarket', address: '654 KB Main Rd', owner: 'Neha Sharma', phone: '+91 11 1234 5682' },
  { id: 'o-6', name: 'Daily Needs Store', type: 'Kirana', address: '987 KB Market', owner: 'Vikram Singh', phone: '+91 11 1234 5683' },
  { id: 'o-7', name: 'Metro Mart', type: 'Hypermarket', address: '147 KB Complex', owner: 'Anand Joshi', phone: '+91 11 1234 5684' },
  { id: 'o-8', name: 'Family Bazaar', type: 'Supermarket', address: '258 LN Central', owner: 'Kavita Rao', phone: '+91 11 1234 5685' },
  { id: 'o-9', name: 'Urban Grocers', type: 'Kirana', address: '369 LN South', owner: 'Ramesh Gupta', phone: '+91 11 1234 5686' },
  { id: 'o-10', name: 'Premium Mart', type: 'Supermarket', address: '741 DLF Cyber Hub', owner: 'Kiran Malhotra', phone: '+91 124 1234 5687' },
  { id: 'o-11', name: 'Tech Park Store', type: 'Convenience', address: '852 DLF Phase 2', owner: 'Sanjay Reddy', phone: '+91 124 1234 5688' },
  { id: 'o-12', name: 'Golf Course Mart', type: 'Supermarket', address: '963 DLF Golf Rd', owner: 'Meera Iyer', phone: '+91 124 1234 5689' },
  { id: 'o-13', name: 'Sector 14 Store', type: 'Kirana', address: '174 Sector 14 Mkt', owner: 'Arun Nair', phone: '+91 124 1234 5690' },
  { id: 'o-14', name: 'HUDA Market Shop', type: 'Convenience', address: '285 HUDA Mkt', owner: 'Pooja Saxena', phone: '+91 124 1234 5691' },
  { id: 'o-15', name: 'Atta Market Store', type: 'Kirana', address: '396 Atta Market', owner: 'Ravi Tiwari', phone: '+91 120 1234 5692' },
  { id: 'o-16', name: 'GIP Outlet', type: 'Hypermarket', address: '507 GIP Mall', owner: 'Shreya Das', phone: '+91 120 1234 5693' },
  { id: 'o-17', name: 'Brahmaputra Shop', type: 'Convenience', address: '618 Brahmaputra Mkt', owner: 'Manish Yadav', phone: '+91 120 1234 5694' },
  { id: 'o-18', name: 'Sector 62 Mart', type: 'Supermarket', address: '729 Sector 62', owner: 'Kavita Sharma', phone: '+91 120 1234 5695' },
  { id: 'o-19', name: 'IT Park Store', type: 'Convenience', address: '830 Sector 63 IT', owner: 'Nitin Kumar', phone: '+91 120 1234 5696' },
  { id: 'o-20', name: 'Andheri West Shop', type: 'Kirana', address: '941 Andheri W', owner: 'Rajesh Patil', phone: '+91 22 1234 5697' },
  { id: 'o-21', name: 'Andheri East Mart', type: 'Supermarket', address: '152 Andheri E', owner: 'Suresh Joshi', phone: '+91 22 1234 5698' },
  { id: 'o-22', name: 'Lokhandwala Store', type: 'Supermarket', address: '263 Lokhandwala', owner: 'Prakash Shetty', phone: '+91 22 1234 5699' },
  { id: 'o-23', name: 'Bandra West Mart', type: 'Hypermarket', address: '374 Bandra W', owner: 'Amit Deshmukh', phone: '+91 22 1234 5700' },
  { id: 'o-24', name: 'Linking Road Shop', type: 'Convenience', address: '485 Linking Rd', owner: 'Vijay Kulkarni', phone: '+91 22 1234 5701' },
  { id: 'o-25', name: 'Hiranandani Mart', type: 'Supermarket', address: '596 Hiranandani', owner: 'Ganesh Naik', phone: '+91 22 1234 5702' },
  { id: 'o-26', name: 'Powai Lake Store', type: 'Kirana', address: '707 Powai Lake', owner: 'Mahesh Sawant', phone: '+91 22 1234 5703' },
  { id: 'o-27', name: 'KP North Outlet', type: 'Supermarket', address: '818 KP North', owner: 'Sachin Jadhav', phone: '+91 20 1234 5704' },
  { id: 'o-28', name: 'KP Lane Shop', type: 'Kirana', address: '929 KP Lanes', owner: 'Nikhil Bhosle', phone: '+91 20 1234 5705' },
  { id: 'o-29', name: 'Hinjewadi Phase 1', type: 'Convenience', address: '130 Phase 1', owner: 'Rahul Mane', phone: '+91 20 1234 5706' },
  { id: 'o-30', name: 'Hinjewadi Phase 2', type: 'Supermarket', address: '241 Phase 2', owner: 'Vishal Gaikwad', phone: '+91 20 1234 5707' },
  { id: 'o-31', name: 'Koramangala 5th', type: 'Supermarket', address: '352 5th Block', owner: 'Ramesh Kumar', phone: '+91 80 1234 5708' },
  { id: 'o-32', name: 'Koramangala 6th', type: 'Kirana', address: '463 6th Block', owner: 'Suresh Rao', phone: '+91 80 1234 5709' },
  { id: 'o-33', name: 'Indiranagar 100ft', type: 'Hypermarket', address: '574 100 Ft Rd', owner: 'Prashanth Hegde', phone: '+91 80 1234 5710' },
  { id: 'o-34', name: 'CMH Road Store', type: 'Convenience', address: '685 CMH Rd', owner: 'Mohan Gowda', phone: '+91 80 1234 5711' },
  { id: 'o-35', name: 'Whitefield ITPL', type: 'Supermarket', address: '796 ITPL Main', owner: 'Naveen Kumar', phone: '+91 80 1234 5712' },
  { id: 'o-36', name: 'EPIP Zone Mart', type: 'Convenience', address: '907 EPIP Zone', owner: 'Praveen Raj', phone: '+91 80 1234 5713' },
  { id: 'o-37', name: 'Pondy Bazaar Shop', type: 'Kirana', address: '118 Pondy Bazaar', owner: 'Senthil Kumar', phone: '+91 44 1234 5714' },
  { id: 'o-38', name: 'Usman Road Mart', type: 'Supermarket', address: '229 Usman Rd', owner: 'Murugan S', phone: '+91 44 1234 5715' },
  { id: 'o-39', name: 'Anna Nagar East', type: 'Hypermarket', address: '340 Anna Nagar E', owner: 'Vignesh S', phone: '+91 44 1234 5716' },
  { id: 'o-40', name: 'Anna Nagar West', type: 'Supermarket', address: '451 Anna Nagar W', owner: 'Karthik M', phone: '+91 44 1234 5717' },
];

// Dummy data with outlet IDs
const initialNetworkData: Root[] = [
  {
    id: 'root-1',
    name: 'North Region',
    cities: [
      {
        id: 'city-1',
        name: 'New Delhi',
        beats: [
          {
            id: 'beat-1',
            name: 'Connaught Place',
            routes: [
              { id: 'route-1', name: 'CP Main Market', outletIds: ['o-1', 'o-2'], assignedRep: 'Rahul Kumar' },
              { id: 'route-2', name: 'CP Inner Circle', outletIds: ['o-3', 'o-4'], assignedRep: 'Priya Singh' },
            ],
          },
          {
            id: 'beat-2',
            name: 'Karol Bagh',
            routes: [
              { id: 'route-3', name: 'KB Main Road', outletIds: ['o-5', 'o-6'], assignedRep: 'Sunita Verma' },
              { id: 'route-4', name: 'KB Market Area', outletIds: ['o-7'], assignedRep: 'Vikram Patel' },
            ],
          },
          {
            id: 'beat-3',
            name: 'Lajpat Nagar',
            routes: [
              { id: 'route-5', name: 'LN Central Market', outletIds: ['o-8', 'o-9'], assignedRep: 'Deepak Gupta' },
            ],
          },
        ],
      },
      {
        id: 'city-2',
        name: 'Gurgaon',
        beats: [
          {
            id: 'beat-4',
            name: 'DLF Phase 1-3',
            routes: [
              { id: 'route-6', name: 'DLF Cyber Hub', outletIds: ['o-10', 'o-11'], assignedRep: 'Karan Malhotra' },
              { id: 'route-7', name: 'DLF Golf Course', outletIds: ['o-12'], assignedRep: 'Sanjay Reddy' },
            ],
          },
          {
            id: 'beat-5',
            name: 'Sector 14-29',
            routes: [
              { id: 'route-8', name: 'Sector 14 Market', outletIds: ['o-13', 'o-14'], assignedRep: 'Arun Nair' },
            ],
          },
        ],
      },
      {
        id: 'city-3',
        name: 'Noida',
        beats: [
          {
            id: 'beat-6',
            name: 'Sector 18',
            routes: [
              { id: 'route-9', name: 'Atta Market', outletIds: ['o-15', 'o-16'], assignedRep: 'Ravi Tiwari' },
              { id: 'route-10', name: 'GIP Mall Area', outletIds: ['o-17'], assignedRep: 'Shreya Das' },
            ],
          },
          {
            id: 'beat-7',
            name: 'Sector 62-63',
            routes: [
              { id: 'route-11', name: 'Sector 62 Main', outletIds: ['o-18', 'o-19'], assignedRep: 'Kavita Sharma' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'root-2',
    name: 'West Region',
    cities: [
      {
        id: 'city-4',
        name: 'Mumbai',
        beats: [
          {
            id: 'beat-8',
            name: 'Andheri',
            routes: [
              { id: 'route-12', name: 'Andheri West', outletIds: ['o-20', 'o-21'], assignedRep: 'Rajesh Patil' },
              { id: 'route-13', name: 'Lokhandwala', outletIds: ['o-22'], assignedRep: 'Prakash Shetty' },
            ],
          },
          {
            id: 'beat-9',
            name: 'Bandra',
            routes: [
              { id: 'route-14', name: 'Bandra West', outletIds: ['o-23', 'o-24'], assignedRep: 'Amit Deshmukh' },
            ],
          },
          {
            id: 'beat-10',
            name: 'Powai',
            routes: [
              { id: 'route-15', name: 'Hiranandani', outletIds: ['o-25', 'o-26'], assignedRep: 'Ganesh Naik' },
            ],
          },
        ],
      },
      {
        id: 'city-5',
        name: 'Pune',
        beats: [
          {
            id: 'beat-11',
            name: 'Koregaon Park',
            routes: [
              { id: 'route-16', name: 'KP North', outletIds: ['o-27', 'o-28'], assignedRep: 'Sachin Jadhav' },
            ],
          },
          {
            id: 'beat-12',
            name: 'Hinjewadi',
            routes: [
              { id: 'route-17', name: 'Phase 1', outletIds: ['o-29'], assignedRep: 'Rahul Mane' },
              { id: 'route-18', name: 'Phase 2', outletIds: ['o-30'], assignedRep: 'Vishal Gaikwad' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'root-3',
    name: 'South Region',
    cities: [
      {
        id: 'city-6',
        name: 'Bangalore',
        beats: [
          {
            id: 'beat-13',
            name: 'Koramangala',
            routes: [
              { id: 'route-19', name: '5th Block', outletIds: ['o-31', 'o-32'], assignedRep: 'Ramesh Kumar' },
            ],
          },
          {
            id: 'beat-14',
            name: 'Indiranagar',
            routes: [
              { id: 'route-20', name: '100 Ft Road', outletIds: ['o-33', 'o-34'], assignedRep: 'Prashanth Hegde' },
            ],
          },
          {
            id: 'beat-15',
            name: 'Whitefield',
            routes: [
              { id: 'route-21', name: 'ITPL Main', outletIds: ['o-35', 'o-36'], assignedRep: 'Naveen Kumar' },
            ],
          },
        ],
      },
      {
        id: 'city-7',
        name: 'Chennai',
        beats: [
          {
            id: 'beat-16',
            name: 'T Nagar',
            routes: [
              { id: 'route-22', name: 'Pondy Bazaar', outletIds: ['o-37', 'o-38'], assignedRep: 'Senthil Kumar' },
            ],
          },
          {
            id: 'beat-17',
            name: 'Anna Nagar',
            routes: [
              { id: 'route-23', name: 'Anna Nagar East', outletIds: ['o-39', 'o-40'], assignedRep: 'Vignesh S' },
            ],
          },
        ],
      },
    ],
  },
];

type EntityType = 'root' | 'city' | 'beat' | 'route';

interface DialogState {
  open: boolean;
  mode: 'add' | 'edit';
  type: EntityType;
  parentId?: string;
  data?: {
    id: string;
    name: string;
    assignedRep?: string;
    outletIds?: string[];
  };
}

interface TransferDialogState {
  open: boolean;
  outletId: string;
  currentRouteId: string;
  outletName: string;
}

interface ViewOutletsDialogState {
  open: boolean;
  routeId: string;
  routeName: string;
  outletIds: string[];
}

const representatives = [
  'Rahul Kumar', 'Priya Singh', 'Amit Sharma', 'Sunita Verma', 'Vikram Patel',
  'Deepak Gupta', 'Neha Agarwal', 'Rohit Mehra', 'Karan Malhotra', 'Sanjay Reddy',
  'Meera Iyer', 'Arun Nair', 'Pooja Saxena', 'Varun Khanna', 'Ravi Tiwari',
  'Shreya Das', 'Manish Yadav', 'Kavita Sharma', 'Nitin Kumar', 'Rajesh Patil',
];

export default function NetworkPage() {
  const [networkData, setNetworkData] = useState<Root[]>(initialNetworkData);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['root-1', 'city-1', 'beat-1']));
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    mode: 'add',
    type: 'root',
  });
  const [formData, setFormData] = useState({ name: '', assignedRep: '', selectedOutlets: [] as string[] });
  const [transferDialog, setTransferDialog] = useState<TransferDialogState>({
    open: false,
    outletId: '',
    currentRouteId: '',
    outletName: '',
  });
  const [targetRouteId, setTargetRouteId] = useState('');
  const [viewOutletsDialog, setViewOutletsDialog] = useState<ViewOutletsDialogState>({
    open: false,
    routeId: '',
    routeName: '',
    outletIds: [],
  });

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Get all assigned outlet IDs
  const getAssignedOutletIds = (): Set<string> => {
    const assigned = new Set<string>();
    networkData.forEach(root => {
      root.cities.forEach(city => {
        city.beats.forEach(beat => {
          beat.routes.forEach(route => {
            route.outletIds.forEach(id => assigned.add(id));
          });
        });
      });
    });
    return assigned;
  };

  // Get available outlets (not assigned to any route)
  const getAvailableOutlets = (): Outlet[] => {
    const assigned = getAssignedOutletIds();
    return allOutlets.filter(outlet => !assigned.has(outlet.id));
  };

  // Get all routes for transfer
  const getAllRoutes = (): { id: string; name: string; beatName: string; cityName: string }[] => {
    const routes: { id: string; name: string; beatName: string; cityName: string }[] = [];
    networkData.forEach(root => {
      root.cities.forEach(city => {
        city.beats.forEach(beat => {
          beat.routes.forEach(route => {
            routes.push({
              id: route.id,
              name: route.name,
              beatName: beat.name,
              cityName: city.name,
            });
          });
        });
      });
    });
    return routes;
  };

  const getOutletById = (id: string): Outlet | undefined => {
    return allOutlets.find(o => o.id === id);
  };

  const openAddDialog = (type: EntityType, parentId?: string) => {
    setDialogState({ open: true, mode: 'add', type, parentId });
    setFormData({ name: '', assignedRep: '', selectedOutlets: [] });
  };

  const openEditDialog = (type: EntityType, data: { id: string; name: string; assignedRep?: string; outletIds?: string[] }) => {
    setDialogState({ open: true, mode: 'edit', type, data });
    setFormData({ name: data.name, assignedRep: data.assignedRep || '', selectedOutlets: data.outletIds || [] });
  };

  const openViewOutlets = (routeId: string, routeName: string, outletIds: string[]) => {
    setViewOutletsDialog({ open: true, routeId, routeName, outletIds });
  };

  const openTransferDialog = (outletId: string, currentRouteId: string) => {
    const outlet = getOutletById(outletId);
    setTransferDialog({
      open: true,
      outletId,
      currentRouteId,
      outletName: outlet?.name || '',
    });
    setTargetRouteId('');
  };

  const handleTransferOutlet = () => {
    if (!targetRouteId || targetRouteId === transferDialog.currentRouteId) return;

    setNetworkData(prev => {
      const newData = JSON.parse(JSON.stringify(prev)) as Root[];
      
      // Remove outlet from current route
      newData.forEach(root => {
        root.cities.forEach(city => {
          city.beats.forEach(beat => {
            beat.routes.forEach(route => {
              if (route.id === transferDialog.currentRouteId) {
                route.outletIds = route.outletIds.filter(id => id !== transferDialog.outletId);
              }
            });
          });
        });
      });

      // Add outlet to target route
      newData.forEach(root => {
        root.cities.forEach(city => {
          city.beats.forEach(beat => {
            beat.routes.forEach(route => {
              if (route.id === targetRouteId) {
                route.outletIds.push(transferDialog.outletId);
              }
            });
          });
        });
      });

      return newData;
    });

    // Update view outlets dialog
    setViewOutletsDialog(prev => ({
      ...prev,
      outletIds: prev.outletIds.filter(id => id !== transferDialog.outletId),
    }));

    setTransferDialog({ open: false, outletId: '', currentRouteId: '', outletName: '' });
  };

  const handleSave = () => {
    if (dialogState.mode === 'add') {
      // Add new entity logic
      if (dialogState.type === 'route' && dialogState.parentId) {
        const newRoute: Route = {
          id: `route-${Date.now()}`,
          name: formData.name,
          assignedRep: formData.assignedRep,
          outletIds: formData.selectedOutlets,
        };
        
        setNetworkData(prev => {
          const newData = JSON.parse(JSON.stringify(prev)) as Root[];
          newData.forEach(root => {
            root.cities.forEach(city => {
              city.beats.forEach(beat => {
                if (beat.id === dialogState.parentId) {
                  beat.routes.push(newRoute);
                }
              });
            });
          });
          return newData;
        });
      }
    } else if (dialogState.mode === 'edit' && dialogState.data) {
      // Edit existing route with outlets
      if (dialogState.type === 'route') {
        setNetworkData(prev => {
          const newData = JSON.parse(JSON.stringify(prev)) as Root[];
          newData.forEach(root => {
            root.cities.forEach(city => {
              city.beats.forEach(beat => {
                beat.routes.forEach(route => {
                  if (route.id === dialogState.data!.id) {
                    route.name = formData.name;
                    route.assignedRep = formData.assignedRep;
                    route.outletIds = formData.selectedOutlets;
                  }
                });
              });
            });
          });
          return newData;
        });
      }
    }
    
    setDialogState({ open: false, mode: 'add', type: 'root' });
    setFormData({ name: '', assignedRep: '', selectedOutlets: [] });
  };

  const toggleOutletSelection = (outletId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedOutlets: prev.selectedOutlets.includes(outletId)
        ? prev.selectedOutlets.filter(id => id !== outletId)
        : [...prev.selectedOutlets, outletId],
    }));
  };

  const getDialogTitle = () => {
    const action = dialogState.mode === 'add' ? 'Add New' : 'Edit';
    const typeLabel = {
      root: 'Root Region',
      city: 'City',
      beat: 'Beat',
      route: 'Route',
    };
    return `${action} ${typeLabel[dialogState.type]}`;
  };

  // Calculate stats
  const calculateStats = () => {
    let totalOutlets = 0;
    let routes = 0;
    let beats = 0;
    let cities = 0;

    networkData.forEach(root => {
      root.cities.forEach(city => {
        cities++;
        city.beats.forEach(beat => {
          beats++;
          beat.routes.forEach(route => {
            routes++;
            totalOutlets += route.outletIds.length;
          });
        });
      });
    });

    return { roots: networkData.length, cities, beats, routes, totalOutlets };
  };

  const stats = calculateStats();

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'Supermarket':
        return 'bg-primary/10 text-primary';
      case 'Hypermarket':
        return 'bg-success/10 text-success';
      case 'Convenience':
        return 'bg-warning/10 text-warning';
      case 'Kirana':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Network Management</h1>
            <p className="text-muted-foreground">Manage territory hierarchy with outlet-based routes</p>
          </div>
          <Button className="btn-gradient-primary" onClick={() => openAddDialog('root')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Root Region
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="rounded-xl bg-card p-5 shadow-card">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.roots}</p>
                <p className="text-sm text-muted-foreground">Regions</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-5 shadow-card">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-success to-emerald-400 flex items-center justify-center">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.cities}</p>
                <p className="text-sm text-muted-foreground">Cities</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-5 shadow-card">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-warning to-orange-400 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.beats}</p>
                <p className="text-sm text-muted-foreground">Beats</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-5 shadow-card">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-info to-blue-400 flex items-center justify-center">
                <Navigation className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.routes}</p>
                <p className="text-sm text-muted-foreground">Routes</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-5 shadow-card">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalOutlets}</p>
                <p className="text-sm text-muted-foreground">Outlets</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search network..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Network Tree */}
        <div className="rounded-xl bg-card shadow-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Network Hierarchy</h3>
            <p className="text-sm text-muted-foreground">Root → City → Beat → Route (with Outlets)</p>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {networkData.map((root) => (
                <div key={root.id} className="border border-border rounded-lg overflow-hidden">
                  {/* Root Level */}
                  <div
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-accent/10 cursor-pointer hover:from-primary/15 hover:to-accent/15 transition-colors"
                    onClick={() => toggleExpand(root.id)}
                  >
                    <div className="flex items-center gap-3">
                      <button className="p-1 hover:bg-primary/10 rounded">
                        {expandedItems.has(root.id) ? (
                          <ChevronDown className="h-4 w-4 text-primary" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-primary" />
                        )}
                      </button>
                      <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{root.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {root.cities.length} cities
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openAddDialog('city', root.id);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add City
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditDialog('root', { id: root.id, name: root.name });
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Cities */}
                  {expandedItems.has(root.id) && (
                    <div className="pl-8 border-t border-border/50">
                      {root.cities.map((city) => (
                        <div key={city.id} className="border-b border-border/30 last:border-b-0">
                          {/* City Level */}
                          <div
                            className="flex items-center justify-between p-3 bg-success/5 cursor-pointer hover:bg-success/10 transition-colors"
                            onClick={() => toggleExpand(city.id)}
                          >
                            <div className="flex items-center gap-3">
                              <button className="p-1 hover:bg-success/10 rounded">
                                {expandedItems.has(city.id) ? (
                                  <ChevronDown className="h-4 w-4 text-success" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-success" />
                                )}
                              </button>
                              <div className="h-8 w-8 rounded-lg bg-success/20 flex items-center justify-center">
                                <Building className="h-4 w-4 text-success" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{city.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {city.beats.length} beats
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openAddDialog('beat', city.id);
                                }}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add Beat
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditDialog('city', { id: city.id, name: city.name });
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Beats */}
                          {expandedItems.has(city.id) && (
                            <div className="pl-8">
                              {city.beats.map((beat) => (
                                <div key={beat.id} className="border-b border-border/20 last:border-b-0">
                                  {/* Beat Level */}
                                  <div
                                    className="flex items-center justify-between p-3 bg-warning/5 cursor-pointer hover:bg-warning/10 transition-colors"
                                    onClick={() => toggleExpand(beat.id)}
                                  >
                                    <div className="flex items-center gap-3">
                                      <button className="p-1 hover:bg-warning/10 rounded">
                                        {expandedItems.has(beat.id) ? (
                                          <ChevronDown className="h-4 w-4 text-warning" />
                                        ) : (
                                          <ChevronRight className="h-4 w-4 text-warning" />
                                        )}
                                      </button>
                                      <div className="h-7 w-7 rounded-lg bg-warning/20 flex items-center justify-center">
                                        <MapPin className="h-3.5 w-3.5 text-warning" />
                                      </div>
                                      <div>
                                        <p className="font-medium text-sm text-foreground">{beat.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {beat.routes.length} routes
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 text-xs"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openAddDialog('route', beat.id);
                                        }}
                                      >
                                        <Plus className="h-3 w-3 mr-1" />
                                        Add Route
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          openEditDialog('beat', { id: beat.id, name: beat.name });
                                        }}
                                      >
                                        <Edit className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 text-destructive hover:text-destructive"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Routes */}
                                  {expandedItems.has(beat.id) && (
                                    <div className="pl-8 py-2 space-y-1">
                                      {beat.routes.map((route) => (
                                        <div
                                          key={route.id}
                                          className="flex items-center justify-between p-2 rounded-lg bg-info/5 hover:bg-info/10 transition-colors"
                                        >
                                          <div className="flex items-center gap-3">
                                            <div className="h-6 w-6 rounded bg-info/20 flex items-center justify-center">
                                              <Navigation className="h-3 w-3 text-info" />
                                            </div>
                                            <div>
                                              <p className="text-sm font-medium text-foreground">{route.name}</p>
                                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                  <Store className="h-3 w-3" />
                                                  {route.outletIds.length} outlets
                                                </span>
                                                {route.assignedRep && (
                                                  <span className="flex items-center gap-1">
                                                    <Users className="h-3 w-3" />
                                                    {route.assignedRep}
                                                  </span>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <Badge variant="outline" className="text-xs">
                                              Active
                                            </Badge>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-6 w-6"
                                              onClick={() => openViewOutlets(route.id, route.name, route.outletIds)}
                                              title="View Outlets"
                                            >
                                              <Eye className="h-3 w-3" />
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-6 w-6"
                                              onClick={() =>
                                                openEditDialog('route', {
                                                  id: route.id,
                                                  name: route.name,
                                                  assignedRep: route.assignedRep,
                                                  outletIds: route.outletIds,
                                                })
                                              }
                                            >
                                              <Edit className="h-3 w-3" />
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-6 w-6 text-destructive hover:text-destructive"
                                            >
                                              <Trash2 className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogState.open} onOpenChange={(open) => setDialogState((prev) => ({ ...prev, open }))}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{getDialogTitle()}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  placeholder={`Enter ${dialogState.type} name`}
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              {dialogState.type === 'route' && (
                <>
                  <div className="space-y-2">
                    <Label>Assigned Representative</Label>
                    <Select
                      value={formData.assignedRep}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, assignedRep: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select representative" />
                      </SelectTrigger>
                      <SelectContent>
                        {representatives.map((rep) => (
                          <SelectItem key={rep} value={rep}>{rep}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Assign Outlets to Route</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Select outlets to include in this route. Available outlets: {getAvailableOutlets().length + formData.selectedOutlets.length}
                    </p>
                    <ScrollArea className="h-[200px] border rounded-lg p-3">
                      <div className="space-y-2">
                        {[...getAvailableOutlets(), ...allOutlets.filter(o => formData.selectedOutlets.includes(o.id))].map((outlet) => (
                          <div
                            key={outlet.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                            onClick={() => toggleOutletSelection(outlet.id)}
                          >
                            <Checkbox
                              checked={formData.selectedOutlets.includes(outlet.id)}
                              onCheckedChange={() => toggleOutletSelection(outlet.id)}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{outlet.name}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className={`text-xs ${getTypeColor(outlet.type)}`}>
                                  {outlet.type}
                                </Badge>
                                <span>{outlet.address}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <p className="text-xs text-muted-foreground">
                      Selected: {formData.selectedOutlets.length} outlets
                    </p>
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogState((prev) => ({ ...prev, open: false }))}>
                Cancel
              </Button>
              <Button className="btn-gradient-primary" onClick={handleSave}>
                {dialogState.mode === 'add' ? 'Add' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Outlets Dialog */}
        <Dialog open={viewOutletsDialog.open} onOpenChange={(open) => setViewOutletsDialog((prev) => ({ ...prev, open }))}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Outlets in {viewOutletsDialog.routeName}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {viewOutletsDialog.outletIds.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No outlets assigned to this route</p>
              ) : (
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {viewOutletsDialog.outletIds.map((outletId) => {
                      const outlet = getOutletById(outletId);
                      if (!outlet) return null;
                      return (
                        <div
                          key={outlet.id}
                          className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                              <Store className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{outlet.name}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className={`text-xs ${getTypeColor(outlet.type)}`}>
                                  {outlet.type}
                                </Badge>
                                <span>{outlet.address}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Owner: {outlet.owner} • {outlet.phone}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openTransferDialog(outlet.id, viewOutletsDialog.routeId)}
                          >
                            <ArrowRightLeft className="h-3 w-3 mr-1" />
                            Transfer
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewOutletsDialog((prev) => ({ ...prev, open: false }))}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Transfer Outlet Dialog */}
        <Dialog open={transferDialog.open} onOpenChange={(open) => setTransferDialog((prev) => ({ ...prev, open }))}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transfer Outlet</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                Transfer <strong>{transferDialog.outletName}</strong> to a different route
              </p>
              <div className="space-y-2">
                <Label>Select Target Route</Label>
                <Select value={targetRouteId} onValueChange={setTargetRouteId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select route" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAllRoutes()
                      .filter(r => r.id !== transferDialog.currentRouteId)
                      .map((route) => (
                        <SelectItem key={route.id} value={route.id}>
                          {route.name} ({route.beatName}, {route.cityName})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setTransferDialog((prev) => ({ ...prev, open: false }))}>
                Cancel
              </Button>
              <Button className="btn-gradient-primary" onClick={handleTransferOutlet} disabled={!targetRouteId}>
                Transfer Outlet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
