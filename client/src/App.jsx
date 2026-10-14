import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth }     from "@context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Layouts
import MainLayout  from "@layouts/MainLayout.jsx";
import AdminLayout from "@layouts/AdminLayout.jsx";

// Public Pages
import HomePage          from "@pages/HomePage.jsx";
import ProjectsPage      from "@pages/ProjectsPage.jsx";
import ProjectDetailPage from "@pages/ProjectDetailPage.jsx";
import PropertiesPage    from "@pages/PropertiesPage.jsx";
import UnitDetailPage    from "@pages/UnitDetailPage.jsx";
import AuthPage          from "@pages/AuthPage.jsx";

// Admin Pages
import AdminDashboardPage from "@pages/AdminDashboardPage.jsx";
import AdminProjectsPage  from "@pages/AdminProjectsPage.jsx";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 5 * 60 * 1000 } }
});

const ProtectedRoute = ({ children, requiredRole = "admin" }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return (
    <div className="flex items-center justify-center h-screen font-body-md text-body-md text-on-surface-variant">
      جاري التحميل...
    </div>
  );
  if (!user) return <Navigate to="/auth" replace />;
  if (requiredRole === "admin" && user.role !== "admin") return <Navigate to="/" replace />;
  return children;
};

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route element={<MainLayout />}>
      <Route index                element={<HomePage />} />
      <Route path="projects"      element={<ProjectsPage />} />
      <Route path="projects/:id"  element={<ProjectDetailPage />} />
      <Route path="properties"    element={<PropertiesPage />} />
      <Route path="properties/:id" element={<UnitDetailPage />} />
    </Route>

    {/* Auth Route (fullscreen - no navbar/footer) */}
    <Route path="auth" element={<AuthPage />} />

    {/* Admin Routes */}
    <Route path="admin" element={
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    }>
      <Route index            element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboardPage />} />
      <Route path="projects"  element={<AdminProjectsPage />} />
    </Route>

    {/* Catch All */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
