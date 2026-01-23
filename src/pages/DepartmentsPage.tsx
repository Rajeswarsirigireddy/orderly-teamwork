import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building, Plus, Search, Edit, Trash2, Users, Award, TrendingUp } from 'lucide-react';

const departments = [
  {
    id: '1',
    name: 'Sales',
    head: 'Rajesh Kumar',
    employeeCount: 93,
    designations: 5,
    budget: '₹45L',
    status: 'active',
    color: 'from-primary to-accent',
    teams: ['North Zone', 'South Zone', 'East Zone', 'West Zone'],
  },
  {
    id: '2',
    name: 'Distribution',
    head: 'Amit Sharma',
    employeeCount: 28,
    designations: 3,
    budget: '₹25L',
    status: 'active',
    color: 'from-success to-emerald-400',
    teams: ['Warehouse', 'Logistics', 'Fleet'],
  },
  {
    id: '3',
    name: 'Marketing',
    head: 'Priya Singh',
    employeeCount: 15,
    designations: 4,
    budget: '₹35L',
    status: 'active',
    color: 'from-warning to-orange-400',
    teams: ['Digital', 'BTL', 'Brand'],
  },
  {
    id: '4',
    name: 'Operations',
    head: 'Vikram Patel',
    employeeCount: 42,
    designations: 4,
    budget: '₹20L',
    status: 'active',
    color: 'from-accent to-purple-400',
    teams: ['Planning', 'Quality', 'Support'],
  },
  {
    id: '5',
    name: 'Finance',
    head: 'Neha Gupta',
    employeeCount: 12,
    designations: 3,
    budget: '₹15L',
    status: 'active',
    color: 'from-cyan-500 to-blue-400',
    teams: ['Accounts', 'Audit', 'Treasury'],
  },
];

export default function DepartmentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Departments</h1>
            <p className="text-muted-foreground">Manage organizational departments and teams</p>
          </div>
          <Button className="btn-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Department
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{departments.length}</p>
                <p className="text-sm text-muted-foreground">Total Departments</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{departments.reduce((a, b) => a + b.employeeCount, 0)}</p>
                <p className="text-sm text-muted-foreground">Total Employees</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{departments.reduce((a, b) => a + b.designations, 0)}</p>
                <p className="text-sm text-muted-foreground">Total Designations</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">₹1.4Cr</p>
                <p className="text-sm text-muted-foreground">Total Budget</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search departments..." className="pl-10" />
          </div>
        </div>

        {/* Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div key={dept.id} className="rounded-xl bg-card shadow-card overflow-hidden">
              {/* Header */}
              <div className={`p-6 bg-gradient-to-r ${dept.color}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{dept.name}</h3>
                      <p className="text-sm text-white/80">{dept.employeeCount} employees</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Department Head</span>
                  <span className="font-medium text-foreground">{dept.head}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Designations</span>
                  <Badge variant="outline">{dept.designations} roles</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Monthly Budget</span>
                  <span className="font-medium text-success">{dept.budget}</span>
                </div>

                {/* Teams */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Teams</p>
                  <div className="flex flex-wrap gap-2">
                    {dept.teams.map((team) => (
                      <Badge key={team} variant="secondary" className="text-xs">
                        {team}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button variant="outline" className="flex-1">View Details</Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
