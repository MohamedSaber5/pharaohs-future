import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext.jsx";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Properties", to: "/properties" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

/**
 * Navbar - responsive navigation with scroll effect and auth state
 */
const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Detect scroll to add background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark-950/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-dark-800"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            id="nav-logo"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center font-display font-bold text-white text-lg shadow-lg shadow-brand-900/30">
              PF
            </div>
            <div className="hidden sm:block">
              <p className="font-display font-bold text-dark-50 text-lg leading-none group-hover:text-brand-400 transition-colors">
                Pharaohs Future
              </p>
              <p className="text-xs text-dark-400 font-sans tracking-widest uppercase">
                Real Estate
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                id={`nav-${link.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-brand-400 bg-brand-500/10"
                      : "text-dark-300 hover:text-dark-50 hover:bg-dark-800"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-dark-300">
                  Hi, <span className="text-brand-400 font-medium">{user?.name}</span>
                </span>
                <button
                  id="nav-logout"
                  onClick={handleLogout}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  id="nav-login"
                  to="/login"
                  className="text-sm font-medium text-dark-300 hover:text-dark-50 transition-colors px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  id="nav-register"
                  to="/register"
                  className="btn-primary text-sm px-4 py-2"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-lg text-dark-300 hover:text-dark-50 hover:bg-dark-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="md:hidden py-4 border-t border-dark-800 animate-slide-down">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-brand-400 bg-brand-500/10"
                        : "text-dark-300 hover:text-dark-50 hover:bg-dark-800"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3 mt-2 border-t border-dark-800 flex flex-col gap-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => { handleLogout(); setIsMobileOpen(false); }}
                    className="btn-secondary text-sm w-full"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileOpen(false)}
                      className="btn-secondary text-sm text-center"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileOpen(false)}
                      className="btn-primary text-sm text-center"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
