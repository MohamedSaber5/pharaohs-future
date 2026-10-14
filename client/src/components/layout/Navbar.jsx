import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@context/AuthContext.jsx";
import logoSrc from "@assets/images/logo.png";

const NAV_ITEMS = [
  { to:"/",           label:"الرئيسية",        exact:true  },
  { to:"/projects",   label:"مشروعاتنا",       exact:false },
  { to:"/properties", label:"الوحدات المتاحة", exact:false },
  { to:"/about",      label:"نبذة عنّا",        exact:false },
  { to:"/contact",    label:"تواصل معنا",       exact:false },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-neutral-100 shadow-sm">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <img src={logoSrc} alt="مستقبل الفراعنة" className="h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `text-[14px] font-semibold transition-colors whitespace-nowrap py-2 border-b-2 ${
                  isActive
                    ? "text-[#775a1a] border-[#775a1a]"
                    : "text-neutral-600 border-transparent hover:text-[#000e1f] hover:border-neutral-300"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600 text-[13px] font-medium">
            <span className="material-symbols-outlined text-[#775a1a] text-[16px]">payments</span>
            <span className="text-[#775a1a] font-bold">EGP</span>
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              {user.role === "admin" && (
                <Link to="/admin/dashboard"
                  className="hidden md:inline-flex items-center h-9 px-4 rounded-lg text-[13px] font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-[#000e1f] transition-colors">
                  لوحة التحكم
                </Link>
              )}
              <button onClick={logout}
                className="hidden md:inline-flex items-center h-9 px-4 rounded-lg text-[13px] font-semibold text-neutral-500 hover:bg-neutral-100 transition-colors">
                خروج
              </button>
              <div className="w-9 h-9 rounded-full bg-[#775a1a] flex items-center justify-center text-white text-[14px] font-bold">
                {user.name?.[0] || "م"}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth"
                className="hidden md:inline-flex items-center h-9 px-4 rounded-lg text-[13px] font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-[#000e1f] transition-colors">
                تسجيل الدخول
              </Link>
              <Link to="/auth"
                className="inline-flex items-center h-9 px-5 rounded-lg bg-[#000e1f] text-white text-[13px] font-bold hover:bg-[#0d1f35] transition-all shadow-md">
                ابدأ الاستثمار
              </Link>
            </div>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors">
            <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-100 px-6 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map(item => (
            <NavLink key={item.to} to={item.to} end={item.exact}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block py-3 px-4 rounded-xl text-[14px] font-semibold transition-colors ${
                  isActive ? "bg-[#000e1f]/5 text-[#775a1a]" : "text-neutral-600 hover:bg-neutral-50 hover:text-[#000e1f]"
                }`
              }>
              {item.label}
            </NavLink>
          ))}
          {!user && (
            <Link to="/auth" onClick={() => setMobileOpen(false)}
              className="mt-3 h-11 flex items-center justify-center rounded-xl bg-[#000e1f] text-white text-[14px] font-bold">
              ابدأ الاستثمار
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
