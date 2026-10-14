import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@context/AuthContext.jsx";
import LoadingSpinner from "@components/ui/LoadingSpinner.jsx";

/**
 * ProtectedRoute - redirects to /login if user is not authenticated.
 * Shows a loading spinner while session is being verified.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
