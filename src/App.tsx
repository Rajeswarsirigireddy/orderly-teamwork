import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import TeamPage from "./pages/TeamPage";
import OrganizationsPage from "./pages/OrganizationsPage";
import OutletsPage from "./pages/OutletsPage";
import RoutesPage from "./pages/RoutesPage";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import RolesPage from "./pages/RolesPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/team" element={<ProtectedRoute allowedRoles={['super_admin', 'admin']}><TeamPage /></ProtectedRoute>} />
      <Route path="/organizations" element={<ProtectedRoute allowedRoles={['super_admin']}><OrganizationsPage /></ProtectedRoute>} />
      <Route path="/outlets" element={<ProtectedRoute><OutletsPage /></ProtectedRoute>} />
      <Route path="/routes" element={<ProtectedRoute allowedRoles={['admin', 'employee']}><RoutesPage /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute allowedRoles={['super_admin', 'admin']}><ProductsPage /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute allowedRoles={['super_admin', 'admin']}><AnalyticsPage /></ProtectedRoute>} />
      <Route path="/roles" element={<ProtectedRoute allowedRoles={['super_admin']}><RolesPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
