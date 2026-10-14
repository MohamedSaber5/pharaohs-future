import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logoImg from "@assets/images/logo.jpg";

const navLinks = [
  { label: "الرئيسية",        to: "/" },
  { label: "عن الشركة",       to: "/about" },
  { label: "مشروعاتنا",       to: "/projects" },
  { label: "الوحدات المتاحة", to: "/properties" },
  { label: "تواصل معنا",      to: "/contact" },
];

const Navbar = () => {
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [isMobileOpen,  setIsMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0, right: 0, left: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? "rgba(248,243,232,0.97)" : "#f8f3e8",
        borderBottom: isScrolled ? "1px solid #e6d9be" : "1px solid transparent",
        backdropFilter: isScrolled ? "blur(8px)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <nav className="site-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>

        {/* ─── CTA Button (Left in RTL = visually left) ─── */}
        <button id="navbar-cta" className="btn-gold" style={{ fontSize: "0.82rem", padding: "0.5rem 1.2rem" }}>
          استفسر عن وحدة
        </button>

        {/* ─── Nav Links (Center) ─── */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="desktop-nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              id={`nav-${link.label}`}
              style={({ isActive }) => ({
                padding: "0.4rem 0.85rem",
                fontSize: "0.875rem",
                fontWeight: isActive ? "600" : "400",
                color: isActive ? "#1c1917" : "#57534e",
                textDecoration: "none",
                position: "relative",
                transition: "color 0.2s",
                fontFamily: "Cairo, sans-serif",
              })}
              className={({ isActive }) => isActive ? "nav-link-active" : ""}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* ─── Logo (Right in RTL) ─── */}
        <Link to="/" id="navbar-logo" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <img
            src={logoImg}
            alt="مستقبل الفراعنة"
            style={{ height: "44px", width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* ─── Mobile Toggle ─── */}
        <button
          id="navbar-mobile-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="القائمة"
          style={{
            display: "none",
            padding: "0.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#1c1917",
          }}
          className="mobile-toggle"
        >
          {isMobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </nav>

      {/* ─── Mobile Menu ─── */}
      {isMobileOpen && (
        <div style={{ backgroundColor: "#f8f3e8", borderTop: "1px solid #e6d9be", padding: "1rem 1.5rem 1.5rem" }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMobileOpen(false)}
              style={({ isActive }) => ({
                display: "block",
                padding: "0.75rem 0",
                fontSize: "1rem",
                fontWeight: isActive ? "600" : "400",
                color: isActive ? "#c9952a" : "#44403c",
                textDecoration: "none",
                borderBottom: "1px solid #e6d9be",
                fontFamily: "Cairo, sans-serif",
              })}
            >
              {link.label}
            </NavLink>
          ))}
          <button className="btn-gold" style={{ marginTop: "1rem", width: "100%" }}>
            استفسر عن وحدة
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
