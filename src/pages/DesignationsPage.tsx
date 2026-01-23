import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Award, Plus, Search, Edit, Trash2, Users } from 'lucide-react';

const designations = [
  { id: '1', name: 'Sales Executive', level: 1, department: 'Sales', employeeCount: 45, description: 'Entry-level sales position' },
  { id: '2', name: 'Senior Sales Executive', level: 2, department: 'Sales', employeeCount: 28, description: 'Experienced sales professional' },
  { id: '3', name: 'Area Sales Manager', level: 3, department: 'Sales', employeeCount: 12, description: 'Manages sales team in a region' },
  { id: '4', name: 'Regional Sales Manager', level: 4, department: 'Sales', employeeCount: 6, description: 'Oversees multiple areas' },
  { id: '5', name: 'Sales Director', level: 5, department: 'Sales', employeeCount: 2, description: 'Head of sales operations' },
  { id: '6', name: 'Distribution Executive', level: 1, department: 'Distribution', employeeCount: 20, description: 'Handles distribution logistics' },
  { id: '7', name: 'Warehouse Manager', level: 3, department: 'Distribution', employeeCount: 8, description: 'Manages warehouse operations' },
  { id: '8', name: 'Marketing Coordinator', level: 2, department: 'Marketing', employeeCount: 10, description: 'Coordinates marketing activities' },
];

const getLevelColor = (level: number) => {
  switch (level) {
    case 1: return 'bg-muted text-muted-foreground';
    case 2: return 'bg-primary/10 text-primary';
    case 3: return 'bg-success/10 text-success';
    case 4: return 'bg-warning/10 text-warning';
    case 5: return 'bg-accent/10 text-accent';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function DesignationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Designations</h1>
            <p className="text-muted-foreground">Manage job titles and hierarchy levels</p>
          </div>
          <Button className="btn-gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Designation
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{designations.length}</p>
                <p className="text-sm text-muted-foreground">Total Designations</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{designations.reduce((a, b) => a + b.employeeCount, 0)}</p>
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
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">Hierarchy Levels</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Departments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search designations..." className="pl-10" />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-card shadow-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-foreground">Designation</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Department</th>
                <th className="text-center py-4 px-6 font-medium text-foreground">Level</th>
                <th className="text-center py-4 px-6 font-medium text-foreground">Employees</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Description</th>
                <th className="text-center py-4 px-6 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {designations.map((designation) => (
                <tr key={designation.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{designation.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant="outline">{designation.department}</Badge>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Badge className={getLevelColor(designation.level)}>
                      Level {designation.level}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="font-medium">{designation.employeeCount}</span>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground text-sm">
                    {designation.description}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
