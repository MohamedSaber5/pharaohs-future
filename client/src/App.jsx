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
import AboutPage         from "@pages/AboutPage.jsx";
import ContactPage       from "@pages/ContactPage.jsx";

// Admin Pages
import AdminDashboardPage from "@pages/admin/AdminDashboardPage.jsx";
import AdminProjectsPage  from "@pages/admin/AdminProjectsPage.jsx";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 5 * 60 * 1000 } }
});

/** Guard: يمنع غير المسجلين من الوصول لـ Admin */
const ProtectedRoute = ({ children, requiredRole = "admin" }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", fontFamily:"Cairo,sans-serif", color:"#78716c" }}>
      جاري التحميل...
    </div>
  );
  if (!user) return <Navigate to="/auth" replace />;
  if (requiredRole === "admin" && user.role !== "admin") return <Navigate to="/" replace />;
  return children;
};

const AppRoutes = () => (
  <Routes>
    {/* ── Public Routes (with Navbar + Footer) ── */}
    <Route element={<MainLayout />}>
      <Route index                element={<HomePage />} />
      <Route path="projects"      element={<ProjectsPage />} />
      <Route path="projects/:id"  element={<ProjectDetailPage />} />
      <Route path="properties"    element={<PropertiesPage />} />
      <Route path="properties/:id" element={<UnitDetailPage />} />
      <Route path="about"         element={<AboutPage />} />
      <Route path="contact"       element={<ContactPage />} />
    </Route>

    {/* ── Auth Route (no navbar/footer) ── */}
    <Route path="auth" element={<AuthPage />} />

    {/* ── Admin Routes (sidebar layout) ── */}
    <Route path="admin" element={
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    }>
      <Route index            element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboardPage />} />
      <Route path="projects"  element={<AdminProjectsPage />} />
    </Route>

    {/* ── Catch All ── */}
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
