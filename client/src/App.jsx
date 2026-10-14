import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@context/AuthContext.jsx";
import MainLayout from "@layouts/MainLayout.jsx";

// Pages
import HomePage from "@pages/HomePage.jsx";
import NotFoundPage from "@pages/NotFoundPage.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          {/* Global toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#22232e",
                color: "#f6f6f7",
                border: "1px solid #3a3b4a",
                borderRadius: "12px",
              },
              success: {
                iconTheme: { primary: "#d4881a", secondary: "#fff" },
              },
              error: {
                iconTheme: { primary: "#ef4444", secondary: "#fff" },
              },
            }}
          />

          <Routes>
            {/* Public Routes with MainLayout */}
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />

              {/* TODO: Add pages from Figma design */}
              {/* <Route path="properties" element={<PropertiesPage />} /> */}
              {/* <Route path="properties/:id" element={<PropertyDetailPage />} /> */}
              {/* <Route path="projects" element={<ProjectsPage />} /> */}
              {/* <Route path="about" element={<AboutPage />} /> */}
              {/* <Route path="contact" element={<ContactPage />} /> */}
              {/* <Route path="login" element={<LoginPage />} /> */}
              {/* <Route path="register" element={<RegisterPage />} /> */}
            </Route>

            {/* Protected Routes */}
            {/* <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            /> */}

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
