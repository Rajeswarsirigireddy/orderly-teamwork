import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { Search, Plus, MoreVertical, Mail, Phone, MapPin } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const teamMembers = [
  { id: '1', name: 'Michael Chen', email: 'michael@fmcg.com', phone: '+91 98765 43210', role: 'Field Rep', territory: 'Downtown District', status: 'active', visits: 145, sales: 485000 },
  { id: '2', name: 'Priya Sharma', email: 'priya@fmcg.com', phone: '+91 98765 43211', role: 'Field Rep', territory: 'North Zone', status: 'active', visits: 132, sales: 420000 },
  { id: '3', name: 'Raj Kumar', email: 'raj@fmcg.com', phone: '+91 98765 43212', role: 'Field Rep', territory: 'South Zone', status: 'inactive', visits: 98, sales: 310000 },
  { id: '4', name: 'Anita Desai', email: 'anita@fmcg.com', phone: '+91 98765 43213', role: 'Team Lead', territory: 'East Zone', status: 'active', visits: 156, sales: 520000 },
  { id: '5', name: 'Vikram Singh', email: 'vikram@fmcg.com', phone: '+91 98765 43214', role: 'Field Rep', territory: 'West Zone', status: 'active', visits: 112, sales: 380000 },
  { id: '6', name: 'Sneha Gupta', email: 'sneha@fmcg.com', phone: '+91 98765 43215', role: 'Field Rep', territory: 'Central Zone', status: 'active', visits: 128, sales: 395000 },
];

export default function TeamPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Team Management</h1>
            <p className="text-muted-foreground">Manage your sales team members</p>
          </div>
          <Button className="btn-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
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
