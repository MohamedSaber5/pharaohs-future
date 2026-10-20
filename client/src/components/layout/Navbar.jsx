import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@context/AuthContext.jsx";
import logoSrc from "@assets/images/logo.png";
import NotificationBell from "@components/NotificationBell.jsx";

const NAV_ITEMS = [
  { to: "/",           label: "الرئيسية",          exact: true  },
  { to: "/projects",   label: "المشاريع",           exact: false },
  { to: "/properties", label: "الوحدات المتاحة",    exact: false },
  { to: "/about",      label: "عن الشركة",          exact: false },
  { to: "/contact",    label: "تواصل معنا",         exact: false },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#000e1f]/95 backdrop-blur-xl border-b border-white/10 shadow-lg" dir="rtl">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <img src={logoSrc} alt="فراعنة المستقبل" className="h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `text-[14px] font-semibold transition-all whitespace-nowrap py-2 border-b-2 ${
                  isActive
                    ? "text-[#c9952a] border-[#c9952a]"
                    : "text-white/70 border-transparent hover:text-white hover:border-white/30"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              {/* Notification Bell — visible to all logged-in users */}
              <NotificationBell />

              {/* My Reservations link for regular clients */}
              {user.role === "user" && (
                <Link
                  to="/my-reservations"
                  className="hidden md:inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">bookmark</span>
                  حجوزاتي
                </Link>
              )}

              {/* Employee Dashboard */}
              {user.role === "employee" && (
                <Link
                  to="/employee"
                  className="hidden md:inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">support_agent</span>
                  لوحة المبيعات
                </Link>
              )}

              {/* Admin Dashboard */}
              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="hidden md:inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-semibold text-[#c9952a] border border-[#c9952a]/30 hover:bg-[#c9952a]/10 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                  لوحة الإدارة
                </Link>
              )}

              {/* User Avatar & Logout */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#775a1a] to-[#c9952a] flex items-center justify-center text-white text-[14px] font-black shadow-lg">
                  {user.name?.[0] || "؟"}
                </div>
                <button
                  onClick={logout}
                  title="تسجيل الخروج"
                  className="hidden md:flex w-9 h-9 items-center justify-center rounded-xl text-white/50 hover:bg-white/10 hover:text-red-400 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth"
                className="hidden md:inline-flex items-center h-9 px-4 rounded-xl text-[13px] font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center h-9 px-5 rounded-xl text-[13px] font-bold transition-all shadow-md hover:opacity-90"
                style={{ background: "#c9952a", color: "#000e1f" }}
              >
                احجز وحدتك
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-white/70 hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#000e1f] border-t border-white/10 px-6 py-4 flex flex-col gap-1" dir="rtl">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block py-3 px-4 rounded-xl text-[14px] font-semibold transition-colors ${
                  isActive
                    ? "bg-white/10 text-[#c9952a]"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {user ? (
            <div className="mt-3 flex flex-col gap-2">
              {user.role === "user" && (
                <Link
                  to="/my-reservations"
                  onClick={() => setMobileOpen(false)}
                  className="h-10 flex items-center justify-center rounded-xl bg-white/10 text-white text-[14px] font-bold"
                >
                  حجوزاتي
                </Link>
              )}
              {user.role === "employee" && (
                <Link
                  to="/employee"
                  onClick={() => setMobileOpen(false)}
                  className="h-10 flex items-center justify-center rounded-xl bg-white/10 text-white text-[14px] font-bold"
                >
                  لوحة المبيعات
                </Link>
              )}
              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="h-10 flex items-center justify-center rounded-xl bg-[#c9952a] text-[#000e1f] text-[14px] font-bold"
                >
                  لوحة الإدارة
                </Link>
              )}
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="h-10 flex items-center justify-center rounded-xl border border-white/20 text-white/60 text-[14px] font-semibold"
              >
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMobileOpen(false)}
              className="mt-3 h-11 flex items-center justify-center rounded-xl text-[14px] font-bold"
              style={{ background: "#c9952a", color: "#000e1f" }}
            >
              احجز وحدتك الآن
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
