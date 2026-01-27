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
import { 
  Search, 
  Plus, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  TrendingUp,
  Calendar,
  User,
  Target,
  ClipboardCheck
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const beatProductiveCalls = [
  { 
    id: '1', 
    date: '2024-12-27',
    hq: 'Hyderabad',
    beat: 'Beat-HYD-001',
    soName: 'Rahul Verma',
    soCode: 'SO001',
    totalOutlets: 25,
    visitedOutlets: 22,
    productiveCalls: 18,
    nonProductiveCalls: 4,
    ordersBooked: 15,
    orderValue: 125000,
    coverage: 88,
    productivity: 82,
    status: 'completed'
  },
  { 
    id: '2', 
    date: '2024-12-27',
    hq: 'Bengaluru',
    beat: 'Beat-BLR-002',
    soName: 'Priya Mehta',
    soCode: 'SO002',
    totalOutlets: 30,
    visitedOutlets: 28,
    productiveCalls: 24,
    nonProductiveCalls: 4,
    ordersBooked: 20,
    orderValue: 185000,
    coverage: 93,
    productivity: 86,
    status: 'completed'
  },
  { 
    id: '3', 
    date: '2024-12-27',
    hq: 'Mumbai',
    beat: 'Beat-MUM-003',
    soName: 'Vikram Singh',
    soCode: 'SO003',
    totalOutlets: 20,
    visitedOutlets: 15,
    productiveCalls: 10,
    nonProductiveCalls: 5,
    ordersBooked: 8,
    orderValue: 65000,
    coverage: 75,
    productivity: 67,
    status: 'in_progress'
  },
  { 
    id: '4', 
    date: '2024-12-27',
    hq: 'Delhi',
    beat: 'Beat-DEL-004',
    soName: 'Anita Desai',
    soCode: 'SO004',
    totalOutlets: 18,
    visitedOutlets: 18,
    productiveCalls: 16,
    nonProductiveCalls: 2,
    ordersBooked: 14,
    orderValue: 98000,
    coverage: 100,
    productivity: 89,
    status: 'completed'
  },
  { 
    id: '5', 
    date: '2024-12-26',
    hq: 'Chennai',
    beat: 'Beat-CHN-005',
    soName: 'Raj Kumar',
    soCode: 'SO005',
    totalOutlets: 22,
    visitedOutlets: 20,
    productiveCalls: 15,
    nonProductiveCalls: 5,
    ordersBooked: 12,
    orderValue: 78000,
    coverage: 91,
    productivity: 75,
    status: 'completed'
  },
  { 
    id: '6', 
    date: '2024-12-26',
    hq: 'Kolkata',
    beat: 'Beat-KOL-006',
    soName: 'Sneha Gupta',
    soCode: 'SO006',
    totalOutlets: 28,
    visitedOutlets: 0,
    productiveCalls: 0,
    nonProductiveCalls: 0,
    ordersBooked: 0,
    orderValue: 0,
    coverage: 0,
    productivity: 0,
    status: 'pending'
  },
  { 
    id: '7', 
    date: '2024-12-26',
    hq: 'Pune',
    beat: 'Beat-PUN-007',
    soName: 'Michael Chen',
    soCode: 'SO007',
    totalOutlets: 24,
    visitedOutlets: 22,
    productiveCalls: 19,
    nonProductiveCalls: 3,
    ordersBooked: 17,
    orderValue: 145000,
    coverage: 92,
    productivity: 86,
    status: 'completed'
  },
  { 
    id: '8', 
    date: '2024-12-26',
    hq: 'Ahmedabad',
    beat: 'Beat-AMD-008',
    soName: 'Kavita Rao',
    soCode: 'SO008',
    totalOutlets: 26,
    visitedOutlets: 24,
    productiveCalls: 20,
    nonProductiveCalls: 4,
    ordersBooked: 18,
    orderValue: 132000,
    coverage: 92,
    productivity: 83,
    status: 'completed'
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge variant="outline" className="bg-success/10 text-success border-success/20"><CheckCircle2 className="h-3 w-3 mr-1" />Completed</Badge>;
    case 'in_progress':
      return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20"><Clock className="h-3 w-3 mr-1" />In Progress</Badge>;
    case 'pending':
      return <Badge variant="outline" className="bg-muted text-muted-foreground"><XCircle className="h-3 w-3 mr-1" />Pending</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getProductivityColor = (value: number) => {
  if (value >= 80) return 'text-success';
  if (value >= 60) return 'text-warning';
  return 'text-destructive';
};

export default function BeatProductiveCallsPage() {
  const totalCalls = beatProductiveCalls.length;
  const completedCalls = beatProductiveCalls.filter(c => c.status === 'completed').length;
  const inProgressCalls = beatProductiveCalls.filter(c => c.status === 'in_progress').length;
  const pendingCalls = beatProductiveCalls.filter(c => c.status === 'pending').length;
  
  const totalProductiveCalls = beatProductiveCalls.reduce((sum, c) => sum + c.productiveCalls, 0);
  const totalOrderValue = beatProductiveCalls.reduce((sum, c) => sum + c.orderValue, 0);
  const avgProductivity = Math.round(beatProductiveCalls.filter(c => c.status === 'completed').reduce((sum, c) => sum + c.productivity, 0) / completedCalls) || 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Beat Productive Calls</h1>
            <p className="text-muted-foreground">Track daily beat visits and productive call metrics</p>
          </div>
          <Button className="btn-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="rounded-xl bg-card p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ClipboardCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Beats</p>
                <p className="text-xl font-bold text-foreground">{totalCalls}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="text-xl font-bold text-success">{completedCalls}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">In Progress</p>
                <p className="text-xl font-bold text-warning">{inProgressCalls}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <XCircle className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pending</p>
                <p className="text-xl font-bold text-muted-foreground">{pendingCalls}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Productive Calls</p>
                <p className="text-xl font-bold text-primary">{totalProductiveCalls}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Productivity</p>
                <p className="text-xl font-bold text-success">{avgProductivity}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by beat, SO name..." className="pl-9" />
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
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="today">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-card shadow-card border border-border/50 overflow-hidden">
          <ScrollArea className="w-full">
            <div className="min-w-[1600px]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Date</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">HQ</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Beat</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">SO Name</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">SO Code</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap text-center">Total Outlets</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap text-center">Visited</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap text-center">Productive</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap text-center">Non-Productive</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap text-center">Orders</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap text-right">Order Value</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap text-center">Coverage %</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap text-center">Productivity %</TableHead>
                    <TableHead className="font-semibold text-foreground whitespace-nowrap">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {beatProductiveCalls.map((call) => (
                    <TableRow key={call.id} className="group hover:bg-muted/20 transition-colors">
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{call.date}</span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-medium">{call.hq}</span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge variant="outline" className="font-mono text-xs">
                          {call.beat}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{call.soName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Badge variant="outline" className="font-mono text-xs bg-muted/50">
                          {call.soCode}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center font-medium">{call.totalOutlets}</TableCell>
                      <TableCell className="whitespace-nowrap text-center">
                        <span className={call.visitedOutlets > 0 ? 'text-primary font-medium' : 'text-muted-foreground'}>
                          {call.visitedOutlets}
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center">
                        <span className="text-success font-medium">{call.productiveCalls}</span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center">
                        <span className="text-destructive font-medium">{call.nonProductiveCalls}</span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center font-medium">{call.ordersBooked}</TableCell>
                      <TableCell className="whitespace-nowrap text-right font-mono">
                        ₹{call.orderValue.toLocaleString()}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${call.coverage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{call.coverage}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center">
                        <span className={`font-bold ${getProductivityColor(call.productivity)}`}>
                          {call.productivity}%
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {getStatusBadge(call.status)}
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
    </DashboardLayout>
  );
}
