import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
} from 'lucide-react';

// Types
interface Route {
  id: string;
  name: string;
  outlets: number;
  assignedRep?: string;
}

interface Beat {
  id: string;
  name: string;
  routes: Route[];
  outlets: number;
}

interface City {
  id: string;
  name: string;
  beats: Beat[];
  totalOutlets: number;
}

interface Root {
  id: string;
  name: string;
  cities: City[];
  totalOutlets: number;
}

// Dummy data
const initialNetworkData: Root[] = [
  {
    id: 'root-1',
    name: 'North Region',
    totalOutlets: 2450,
    cities: [
      {
        id: 'city-1',
        name: 'New Delhi',
        totalOutlets: 850,
        beats: [
          {
            id: 'beat-1',
            name: 'Connaught Place',
            outlets: 120,
            routes: [
              { id: 'route-1', name: 'CP Main Market', outlets: 45, assignedRep: 'Rahul Kumar' },
              { id: 'route-2', name: 'CP Inner Circle', outlets: 38, assignedRep: 'Priya Singh' },
              { id: 'route-3', name: 'CP Outer Ring', outlets: 37, assignedRep: 'Amit Sharma' },
            ],
          },
          {
            id: 'beat-2',
            name: 'Karol Bagh',
            outlets: 180,
            routes: [
              { id: 'route-4', name: 'KB Main Road', outlets: 65, assignedRep: 'Sunita Verma' },
              { id: 'route-5', name: 'KB Market Area', outlets: 58, assignedRep: 'Vikram Patel' },
              { id: 'route-6', name: 'KB Residential', outlets: 57, assignedRep: 'Anita Joshi' },
            ],
          },
          {
            id: 'beat-3',
            name: 'Lajpat Nagar',
            outlets: 150,
            routes: [
              { id: 'route-7', name: 'LN Central Market', outlets: 55, assignedRep: 'Deepak Gupta' },
              { id: 'route-8', name: 'LN Defence Colony', outlets: 50, assignedRep: 'Neha Agarwal' },
              { id: 'route-9', name: 'LN South Extension', outlets: 45, assignedRep: 'Rohit Mehra' },
            ],
          },
        ],
      },
      {
        id: 'city-2',
        name: 'Gurgaon',
        totalOutlets: 620,
        beats: [
          {
            id: 'beat-4',
            name: 'DLF Phase 1-3',
            outlets: 200,
            routes: [
              { id: 'route-10', name: 'DLF Cyber Hub', outlets: 70, assignedRep: 'Karan Malhotra' },
              { id: 'route-11', name: 'DLF Golf Course', outlets: 65, assignedRep: 'Sanjay Reddy' },
              { id: 'route-12', name: 'DLF Galleria', outlets: 65, assignedRep: 'Meera Iyer' },
            ],
          },
          {
            id: 'beat-5',
            name: 'Sector 14-29',
            outlets: 180,
            routes: [
              { id: 'route-13', name: 'Sector 14 Market', outlets: 60, assignedRep: 'Arun Nair' },
              { id: 'route-14', name: 'Sector 17-18', outlets: 60, assignedRep: 'Pooja Saxena' },
              { id: 'route-15', name: 'HUDA Market', outlets: 60, assignedRep: 'Varun Khanna' },
            ],
          },
        ],
      },
      {
        id: 'city-3',
        name: 'Noida',
        totalOutlets: 480,
        beats: [
          {
            id: 'beat-6',
            name: 'Sector 18',
            outlets: 160,
            routes: [
              { id: 'route-16', name: 'Atta Market', outlets: 55, assignedRep: 'Ravi Tiwari' },
              { id: 'route-17', name: 'GIP Mall Area', outlets: 55, assignedRep: 'Shreya Das' },
              { id: 'route-18', name: 'Brahmaputra Market', outlets: 50, assignedRep: 'Manish Yadav' },
            ],
          },
          {
            id: 'beat-7',
            name: 'Sector 62-63',
            outlets: 140,
            routes: [
              { id: 'route-19', name: 'Sector 62 Main', outlets: 70, assignedRep: 'Kavita Sharma' },
              { id: 'route-20', name: 'Sector 63 IT Park', outlets: 70, assignedRep: 'Nitin Kumar' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'root-2',
    name: 'West Region',
    totalOutlets: 1890,
    cities: [
      {
        id: 'city-4',
        name: 'Mumbai',
        totalOutlets: 1200,
        beats: [
          {
            id: 'beat-8',
            name: 'Andheri',
            outlets: 280,
            routes: [
              { id: 'route-21', name: 'Andheri West', outlets: 95, assignedRep: 'Rajesh Patil' },
              { id: 'route-22', name: 'Andheri East', outlets: 95, assignedRep: 'Suresh Joshi' },
              { id: 'route-23', name: 'Lokhandwala', outlets: 90, assignedRep: 'Prakash Shetty' },
            ],
          },
          {
            id: 'beat-9',
            name: 'Bandra',
            outlets: 320,
            routes: [
              { id: 'route-24', name: 'Bandra West', outlets: 110, assignedRep: 'Amit Deshmukh' },
              { id: 'route-25', name: 'Bandra East', outlets: 105, assignedRep: 'Vijay Kulkarni' },
              { id: 'route-26', name: 'Linking Road', outlets: 105, assignedRep: 'Ajay Pawar' },
            ],
          },
          {
            id: 'beat-10',
            name: 'Powai',
            outlets: 200,
            routes: [
              { id: 'route-27', name: 'Hiranandani', outlets: 100, assignedRep: 'Ganesh Naik' },
              { id: 'route-28', name: 'Powai Lake Area', outlets: 100, assignedRep: 'Mahesh Sawant' },
            ],
          },
        ],
      },
      {
        id: 'city-5',
        name: 'Pune',
        totalOutlets: 690,
        beats: [
          {
            id: 'beat-11',
            name: 'Koregaon Park',
            outlets: 180,
            routes: [
              { id: 'route-29', name: 'KP North', outlets: 90, assignedRep: 'Sachin Jadhav' },
              { id: 'route-30', name: 'KP Lane Areas', outlets: 90, assignedRep: 'Nikhil Bhosle' },
            ],
          },
          {
            id: 'beat-12',
            name: 'Hinjewadi',
            outlets: 220,
            routes: [
              { id: 'route-31', name: 'Phase 1', outlets: 75, assignedRep: 'Rahul Mane' },
              { id: 'route-32', name: 'Phase 2', outlets: 75, assignedRep: 'Vishal Gaikwad' },
              { id: 'route-33', name: 'Phase 3', outlets: 70, assignedRep: 'Akash Shirke' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'root-3',
    name: 'South Region',
    totalOutlets: 1650,
    cities: [
      {
        id: 'city-6',
        name: 'Bangalore',
        totalOutlets: 980,
        beats: [
          {
            id: 'beat-13',
            name: 'Koramangala',
            outlets: 250,
            routes: [
              { id: 'route-34', name: '5th Block', outlets: 85, assignedRep: 'Ramesh Kumar' },
              { id: 'route-35', name: '6th Block', outlets: 85, assignedRep: 'Suresh Rao' },
              { id: 'route-36', name: '7th Block', outlets: 80, assignedRep: 'Girish Shetty' },
            ],
          },
          {
            id: 'beat-14',
            name: 'Indiranagar',
            outlets: 220,
            routes: [
              { id: 'route-37', name: '100 Ft Road', outlets: 75, assignedRep: 'Prashanth Hegde' },
              { id: 'route-38', name: '12th Main', outlets: 75, assignedRep: 'Mohan Gowda' },
              { id: 'route-39', name: 'CMH Road', outlets: 70, assignedRep: 'Kiran Reddy' },
            ],
          },
          {
            id: 'beat-15',
            name: 'Whitefield',
            outlets: 280,
            routes: [
              { id: 'route-40', name: 'ITPL Main', outlets: 95, assignedRep: 'Naveen Kumar' },
              { id: 'route-41', name: 'EPIP Zone', outlets: 95, assignedRep: 'Praveen Raj' },
              { id: 'route-42', name: 'Whitefield Main', outlets: 90, assignedRep: 'Ashwin Pai' },
            ],
          },
        ],
      },
      {
        id: 'city-7',
        name: 'Chennai',
        totalOutlets: 670,
        beats: [
          {
            id: 'beat-16',
            name: 'T Nagar',
            outlets: 200,
            routes: [
              { id: 'route-43', name: 'Pondy Bazaar', outlets: 70, assignedRep: 'Senthil Kumar' },
              { id: 'route-44', name: 'Usman Road', outlets: 65, assignedRep: 'Murugan S' },
              { id: 'route-45', name: 'Thyagaraya Road', outlets: 65, assignedRep: 'Balaji R' },
            ],
          },
          {
            id: 'beat-17',
            name: 'Anna Nagar',
            outlets: 180,
            routes: [
              { id: 'route-46', name: 'Anna Nagar East', outlets: 90, assignedRep: 'Vignesh S' },
              { id: 'route-47', name: 'Anna Nagar West', outlets: 90, assignedRep: 'Karthik M' },
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
  };
}

export default function NetworkPage() {
  const [networkData, setNetworkData] = useState<Root[]>(initialNetworkData);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['root-1', 'city-1', 'beat-1']));
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    mode: 'add',
    type: 'root',
  });
  const [formData, setFormData] = useState({ name: '', assignedRep: '' });

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

  const openAddDialog = (type: EntityType, parentId?: string) => {
    setDialogState({ open: true, mode: 'add', type, parentId });
    setFormData({ name: '', assignedRep: '' });
  };

  const openEditDialog = (type: EntityType, data: { id: string; name: string; assignedRep?: string }) => {
    setDialogState({ open: true, mode: 'edit', type, data });
    setFormData({ name: data.name, assignedRep: data.assignedRep || '' });
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log('Saving:', { ...dialogState, formData });
    setDialogState({ open: false, mode: 'add', type: 'root' });
    setFormData({ name: '', assignedRep: '' });
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

  const stats = {
    roots: networkData.length,
    cities: networkData.reduce((acc, r) => acc + r.cities.length, 0),
    beats: networkData.reduce((acc, r) => acc + r.cities.reduce((a, c) => a + c.beats.length, 0), 0),
    routes: networkData.reduce(
      (acc, r) => acc + r.cities.reduce((a, c) => a + c.beats.reduce((b, bt) => b + bt.routes.length, 0), 0),
      0
    ),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Network Management</h1>
            <p className="text-muted-foreground">Manage your distribution network hierarchy</p>
          </div>
          <Button className="btn-gradient-primary" onClick={() => openAddDialog('root')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Root Region
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl bg-card p-5 shadow-card">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.roots}</p>
                <p className="text-sm text-muted-foreground">Root Regions</p>
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
            <p className="text-sm text-muted-foreground">Root → City → Beat → Route</p>
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
                          {root.cities.length} cities • {root.totalOutlets} outlets
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
                                  {city.beats.length} beats • {city.totalOutlets} outlets
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
                                          {beat.routes.length} routes • {beat.outlets} outlets
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
                                                  {route.outlets} outlets
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
                                              onClick={() =>
                                                openEditDialog('route', {
                                                  id: route.id,
                                                  name: route.name,
                                                  assignedRep: route.assignedRep,
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
          <DialogContent>
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
                      <SelectItem value="Rahul Kumar">Rahul Kumar</SelectItem>
                      <SelectItem value="Priya Singh">Priya Singh</SelectItem>
                      <SelectItem value="Amit Sharma">Amit Sharma</SelectItem>
                      <SelectItem value="Sunita Verma">Sunita Verma</SelectItem>
                      <SelectItem value="Vikram Patel">Vikram Patel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
      </div>
    </DashboardLayout>
  );
}
