import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SuperAdminDashboard } from '@/components/dashboard/SuperAdminDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { EmployeeDashboard } from '@/components/dashboard/EmployeeDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'super_admin':
        return <SuperAdminDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'employee':
        return <EmployeeDashboard />;
      default:
        return null;
    }
  };

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>;
}
