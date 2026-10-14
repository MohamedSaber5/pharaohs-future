import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";

/**
 * NotFoundPage - 404 page
 */
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 px-4">
      <div className="text-center max-w-md">
        <p className="text-brand-500 text-8xl font-display font-bold mb-4">404</p>
        <h1 className="text-2xl font-display font-bold text-dark-50 mb-3">
          Page Not Found
        </h1>
        <p className="text-dark-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          <HiHome className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
