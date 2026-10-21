import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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

const ROLE_BADGES = {
  admin: { label: "مسؤول النظام", color: "bg-red-500/20 text-red-300 border-red-500/30" },
  employee: { label: "مستشار مبيعات", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  user: { label: "عميل متميز", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    setMobileOpen(false);
    await logout();
    navigate("/");
  };

  const roleInfo = user ? ROLE_BADGES[user.role] || ROLE_BADGES.user : null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#000e1f]/95 backdrop-blur-xl border-b border-white/10 shadow-lg" dir="rtl">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
          <img
            src={logoSrc}
            alt="مستقبل الفراعنة"
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
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

        {/* Left Side: Actions & Profile */}
        <div className="flex items-center gap-3">
          {user ? (
            /* ── Authenticated: Profile Menu & Notifications ── */
            <div className="flex items-center gap-2 sm:gap-3" ref={profileRef}>
              {/* Notification Bell */}
              <NotificationBell />

              {/* Profile Dropdown Trigger */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-2.5 h-11 px-3 rounded-2xl border transition-all ${
                    profileOpen
                      ? "bg-white/15 border-[#c9952a]/60 shadow-lg shadow-[#c9952a]/10"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  {/* User Initial Circle */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9952a] to-[#775a1a] flex items-center justify-center text-white text-[13px] font-black shadow-md flex-shrink-0">
                    {user.name?.[0]?.toUpperCase() || "؟"}
                  </div>

                  {/* Name & Role Text */}
                  <div className="hidden sm:flex flex-col items-start text-right min-w-0">
                    <span className="text-[13px] font-bold text-white truncate max-w-[120px] leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-[#c9952a] font-semibold">
                      {roleInfo?.label}
                    </span>
                  </div>

                  <span
                    className={`material-symbols-outlined text-[18px] text-white/50 transition-transform duration-200 ${
                      profileOpen ? "rotate-180 text-[#c9952a]" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {/* Profile Luxury Dropdown */}
                {profileOpen && (
                  <div className="absolute left-0 mt-2 w-72 rounded-3xl bg-[#000e1f] border border-[#c9952a]/30 shadow-2xl backdrop-blur-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* Header: User Info Card */}
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-2">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9952a] to-[#775a1a] flex items-center justify-center text-white text-[15px] font-black shadow-lg">
                          {user.name?.[0]?.toUpperCase() || "؟"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[14px] font-bold text-white truncate">{user.name}</p>
                          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mt-0.5 ${roleInfo?.color}`}>
                            {roleInfo?.label}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-white/50 truncate font-mono">{user.email}</p>
                      {user.phone && <p className="text-[11px] text-white/50 truncate font-mono mt-0.5">{user.phone}</p>}
                    </div>

                    {/* Navigation Items */}
                    <div className="flex flex-col gap-1 text-[13px]">
                      {user.role === "user" && (
                        <Link
                          to="/my-reservations"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#c9952a]">bookmark</span>
                          <span>حجوزاتي العقارية</span>
                        </Link>
                      )}

                      {user.role === "employee" && (
                        <Link
                          to="/employee"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#c9952a]">support_agent</span>
                          <span>لوحة مبيعات الموظف</span>
                        </Link>
                      )}

                      {user.role === "admin" && (
                        <>
                          <Link
                            to="/admin/dashboard"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[#c9952a] hover:bg-[#c9952a]/10 transition-colors font-bold"
                          >
                            <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                            <span>لوحة تحكم الإدارة</span>
                          </Link>
                          <Link
                            to="/admin/projects"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px]">apartment</span>
                            <span>إدارة المشاريع</span>
                          </Link>
                        </>
                      )}

                      <Link
                        to="/properties"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">holiday_village</span>
                        <span>تصفح الوحدات المتاحة</span>
                      </Link>
                    </div>

                    <div className="h-px bg-white/10 my-2" />

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-[13px] font-semibold"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ── Unauthenticated: Header Actions (Left side) ── */
            <div className="flex items-center gap-2 sm:gap-3">
              {/* تسجيل الدخول */}
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-[13px] font-bold text-white/80 hover:text-white hover:bg-white/10 border border-white/15 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                <span>تسجيل الدخول</span>
              </Link>

              {/* إنشاء حساب */}
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 h-10 px-4 sm:px-5 rounded-xl text-[13px] font-bold transition-all shadow-md hover:opacity-95 hover:shadow-lg active:scale-[0.98]"
                style={{ background: "#c9952a", color: "#000e1f" }}
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                <span>إنشاء حساب</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-white/70 hover:bg-white/10 transition-colors mr-1"
          >
            <span className="material-symbols-outlined text-[24px]">{mobileOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#000e1f] border-t border-white/10 px-6 py-5 flex flex-col gap-2" dir="rtl">
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

          <div className="h-px bg-white/10 my-2" />

          {user ? (
            <div className="flex flex-col gap-2">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9952a] to-[#775a1a] flex items-center justify-center text-white text-[14px] font-bold">
                  {user.name?.[0]?.toUpperCase() || "؟"}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white">{user.name}</p>
                  <p className="text-[11px] text-[#c9952a]">{roleInfo?.label}</p>
                </div>
              </div>

              {user.role === "user" && (
                <Link
                  to="/my-reservations"
                  onClick={() => setMobileOpen(false)}
                  className="h-10 flex items-center justify-center rounded-xl bg-white/10 text-white text-[14px] font-bold gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">bookmark</span>
                  حجوزاتي
                </Link>
              )}

              {user.role === "employee" && (
                <Link
                  to="/employee"
                  onClick={() => setMobileOpen(false)}
                  className="h-10 flex items-center justify-center rounded-xl bg-white/10 text-white text-[14px] font-bold gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                  لوحة المبيعات
                </Link>
              )}

              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="h-10 flex items-center justify-center rounded-xl bg-[#c9952a] text-[#000e1f] text-[14px] font-bold gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                  لوحة الإدارة
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="h-10 flex items-center justify-center rounded-xl border border-red-500/30 text-red-400 text-[14px] font-semibold gap-2 mt-1"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-1">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="h-11 flex items-center justify-center rounded-xl border border-white/20 text-white text-[14px] font-bold gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="h-11 flex items-center justify-center rounded-xl text-[14px] font-bold gap-2 shadow-md"
                style={{ background: "#c9952a", color: "#000e1f" }}
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                إنشاء حساب جديد
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
