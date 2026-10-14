import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@context/AuthContext.jsx";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(16,36,58,0.06)]">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-space-md">

        {/* Logo */}
        <div className="flex items-center gap-space-lg">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-primary-container flex items-center justify-center text-secondary-fixed shadow-[0_2px_10px_rgba(16,36,58,0.15)]">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="font-title-lg text-title-lg text-primary tracking-tight leading-tight">مستقبل الفراعنة</span>
              <span className="font-label-sm text-label-sm text-secondary tracking-normal">للاستثمار والتطوير العقاري</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-space-lg mr-space-md">
            {[
              { to:"/",          label:"الرئيسية",        exact:true },
              { to:"/projects",  label:"مشروعاتنا",       exact:false },
              { to:"/properties",label:"الوحدات المتاحة", exact:false },
              { to:"/about",     label:"من نحن",           exact:false },
              { to:"/contact",   label:"تواصل معنا",       exact:false },
            ].map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `font-title-md text-title-md transition-colors py-2 ${isActive ? "text-secondary" : "text-on-surface-variant hover:text-on-surface"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-space-md">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface">
            <span className="material-symbols-outlined text-secondary text-[18px]">payments</span>
            <span className="font-label-md text-label-md text-secondary">ج.م</span>
            <span className="font-label-sm text-label-sm text-outline">EGP</span>
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              {user.role === "admin" && (
                <Link to="/admin/dashboard" className="hidden md:inline-flex items-center justify-center h-10 px-4 rounded-lg font-title-md text-title-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                  لوحة التحكم
                </Link>
              )}
              <button onClick={logout} className="hidden md:inline-flex items-center justify-center h-10 px-4 rounded-lg font-title-md text-title-md text-on-surface-variant hover:bg-surface-container transition-colors">
                خروج
              </button>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <span className="font-label-sm text-label-sm text-on-primary font-bold">{user.name?.[0] || "م"}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth" className="hidden md:inline-flex items-center justify-center h-10 px-4 rounded-lg font-title-md text-title-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                تسجيل الدخول
              </Link>
              <Link to="/auth" className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all shadow-[0_4px_16px_-4px_rgba(16,36,58,0.25)]">
                إنشاء حساب جديد
              </Link>
            </div>
          )}

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-surface border-t border-outline-variant/30 px-6 py-4 flex flex-col gap-1">
          {[
            { to:"/",          label:"الرئيسية" },
            { to:"/projects",  label:"مشروعاتنا" },
            { to:"/properties",label:"الوحدات المتاحة" },
            { to:"/about",     label:"من نحن" },
            { to:"/contact",   label:"تواصل معنا" },
          ].map(item => (
            <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `block py-3 px-4 rounded-lg font-title-md text-title-md transition-colors ${isActive ? "bg-secondary-container text-on-secondary-container" : "text-on-surface-variant hover:bg-surface-container"}`}>
              {item.label}
            </NavLink>
          ))}
          {!user && (
            <Link to="/auth" onClick={() => setMobileOpen(false)} className="mt-2 h-11 flex items-center justify-center rounded-lg bg-primary-container text-on-primary font-title-md text-title-md">
              إنشاء حساب / تسجيل الدخول
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
