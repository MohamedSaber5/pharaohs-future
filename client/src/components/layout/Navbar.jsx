import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext.jsx";
import logoSrc from "@assets/images/erasebg-transformed.png";
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
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside on desktop
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
    await logout();
    navigate("/");
  };

  const roleInfo = user ? ROLE_BADGES[user.role] || ROLE_BADGES.user : null;

  return (
    <>
      {/* ── 1. TOP HEADER (Desktop & Mobile) ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#000e1f]/95 backdrop-blur-xl border-b border-white/10 shadow-lg" dir="rtl">
        <div className="h-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group py-1">
            <img
              src={logoSrc}
              alt="مستقبل الفراعنة"
              className="h-11 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
            />
          </Link>

          {/* Desktop Navigation Links (hidden on mobile) */}
          <nav className="hidden lg:flex items-center gap-7">
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

          {/* Header Left Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3" ref={profileRef}>
                {/* Notification Bell */}
                <NotificationBell />

                {/* Profile Trigger Button */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`flex items-center gap-2.5 h-10 sm:h-11 px-2.5 sm:px-3 rounded-2xl border transition-all cursor-pointer ${
                      profileOpen
                        ? "bg-white/15 border-[#c9952a]/60 shadow-lg shadow-[#c9952a]/10"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9952a] to-[#775a1a] flex items-center justify-center text-white text-[13px] font-black shadow-md flex-shrink-0">
                      {user.name?.[0]?.toUpperCase() || "؟"}
                    </div>

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

                  {/* Desktop Dropdown Menu */}
                  {profileOpen && (
                    <div className="hidden lg:block absolute left-0 mt-2 w-72 rounded-3xl bg-[#000e1f] border border-[#c9952a]/30 shadow-2xl backdrop-blur-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
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
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-[13px] font-semibold cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        <span>تسجيل الخروج</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Unauthenticated: Clean Login Button */
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 sm:gap-2 h-10 sm:h-11 px-4 sm:px-5 rounded-2xl text-xs sm:text-[13.5px] font-bold transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#c9952a]/20 hover:-translate-y-0.5 active:translate-y-0 text-[#000e1f]"
                style={{ background: "linear-gradient(135deg, #f0d897 0%, #c9952a 50%, #b07d1f 100%)" }}
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                <span>تسجيل الدخول</span>
              </Link>
            )}
          </div>

        </div>
      </header>

      {/* ── 2. MODERN APP-LIKE BOTTOM NAVIGATION BAR (Mobile Only) ── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#000e1f]/95 backdrop-blur-2xl border-t border-[#c9952a]/30 shadow-[0_-8px_32px_rgba(0,14,31,0.65)] select-none"
        dir="rtl"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="max-w-md mx-auto px-3 h-16 flex items-center justify-between">

          {/* Tab 1: الرئيسية */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 ${
                isActive
                  ? "text-[#f0d897] font-black scale-105"
                  : "text-white/60 hover:text-white font-medium"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-xl transition-all ${isActive ? "bg-white/10 shadow-sm" : ""}`}>
                  <span className="material-symbols-outlined text-[22px] block">home</span>
                </div>
                <span className="text-[10.5px] mt-0.5 tracking-tight">الرئيسية</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9952a] mt-0.5 shadow-[0_0_8px_#c9952a]" />
                )}
              </>
            )}
          </NavLink>

          {/* Tab 2: المشاريع */}
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 ${
                isActive
                  ? "text-[#f0d897] font-black scale-105"
                  : "text-white/60 hover:text-white font-medium"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-xl transition-all ${isActive ? "bg-white/10 shadow-sm" : ""}`}>
                  <span className="material-symbols-outlined text-[22px] block">apartment</span>
                </div>
                <span className="text-[10.5px] mt-0.5 tracking-tight">المشاريع</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9952a] mt-0.5 shadow-[0_0_8px_#c9952a]" />
                )}
              </>
            )}
          </NavLink>

          {/* Tab 3: HERO CENTER ACTION: الوحدات المتاحة */}
          <NavLink
            to="/properties"
            className="flex flex-col items-center justify-center flex-1 relative -top-3.5 group cursor-pointer"
          >
            {({ isActive }) => (
              <>
                <div
                  className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-xl border-2 transition-all duration-300 ${
                    isActive
                      ? "border-[#f0d897] scale-110 shadow-[#c9952a]/50"
                      : "border-[#000e1f] group-hover:scale-105 shadow-[#c9952a]/25"
                  }`}
                  style={{
                    background: "linear-gradient(135deg, #f0d897 0%, #c9952a 50%, #b07d1f 100%)",
                    color: "#000e1f",
                  }}
                >
                  <span className="material-symbols-outlined text-[26px] font-bold">domain</span>
                </div>
                <span className={`text-[10.5px] font-bold mt-1 tracking-tight ${isActive ? "text-[#f0d897]" : "text-white/70"}`}>
                  الوحدات
                </span>
              </>
            )}
          </NavLink>

          {/* Tab 4: تواصل معنا */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 ${
                isActive
                  ? "text-[#f0d897] font-black scale-105"
                  : "text-white/60 hover:text-white font-medium"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-xl transition-all ${isActive ? "bg-white/10 shadow-sm" : ""}`}>
                  <span className="material-symbols-outlined text-[22px] block">support_agent</span>
                </div>
                <span className="text-[10.5px] mt-0.5 tracking-tight">تواصل</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9952a] mt-0.5 shadow-[0_0_8px_#c9952a]" />
                )}
              </>
            )}
          </NavLink>

          {/* Tab 5: حسابي / دخول */}
          {user ? (
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 cursor-pointer ${
                profileOpen
                  ? "text-[#f0d897] font-black scale-105"
                  : "text-white/60 hover:text-white font-medium"
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${profileOpen ? "bg-white/10 shadow-sm" : ""}`}>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#c9952a] to-[#775a1a] flex items-center justify-center text-white text-[11px] font-black">
                  {user.name?.[0]?.toUpperCase() || "؟"}
                </div>
              </div>
              <span className="text-[10.5px] mt-0.5 tracking-tight truncate max-w-[55px]">
                {user.role === "admin" ? "الإدارة" : user.role === "employee" ? "المبيعات" : "حسابي"}
              </span>
              {profileOpen && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9952a] mt-0.5 shadow-[0_0_8px_#c9952a]" />
              )}
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 ${
                  isActive
                    ? "text-[#f0d897] font-black scale-105"
                    : "text-white/60 hover:text-white font-medium"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1 rounded-xl transition-all ${isActive ? "bg-white/10 shadow-sm" : ""}`}>
                    <span className="material-symbols-outlined text-[22px] block">account_circle</span>
                  </div>
                  <span className="text-[10.5px] mt-0.5 tracking-tight">دخول</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9952a] mt-0.5 shadow-[0_0_8px_#c9952a]" />
                  )}
                </>
              )}
            </NavLink>
          )}

        </div>
      </nav>

      {/* ── 3. MOBILE PROFILE BOTTOM SHEET ── */}
      {profileOpen && user && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm flex flex-col justify-end p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setProfileOpen(false);
          }}
          dir="rtl"
        >
          <div className="bg-[#000e1f] border-2 border-[#c9952a]/40 rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom-8 duration-250 mb-20">
            {/* Top Close bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#c9952a] text-[20px]">manage_accounts</span>
                <span className="text-sm font-bold text-white">إدارة الحساب والجلسة</span>
              </div>
              <button
                onClick={() => setProfileOpen(false)}
                className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* User Profile Card */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#c9952a] to-[#775a1a] flex items-center justify-center text-white text-[16px] font-black shadow-lg">
                  {user.name?.[0]?.toUpperCase() || "؟"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-bold text-white truncate">{user.name}</p>
                  <span className={`inline-block text-[10.5px] font-bold px-2 py-0.5 rounded-full border mt-0.5 ${roleInfo?.color}`}>
                    {roleInfo?.label}
                  </span>
                </div>
              </div>
              <p className="text-[11.5px] text-white/60 truncate font-mono">{user.email}</p>
              {user.phone && <p className="text-[11.5px] text-white/60 truncate font-mono mt-0.5">{user.phone}</p>}
            </div>

            {/* Quick Navigation Links */}
            <div className="flex flex-col gap-1.5 text-sm">
              {user.role === "user" && (
                <Link
                  to="/my-reservations"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#c9952a]">bookmark</span>
                  <span>حجوزاتي العقارية</span>
                </Link>
              )}

              {user.role === "employee" && (
                <Link
                  to="/employee"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-[#c9952a]/15 text-[#f0d897] font-bold transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#c9952a]">support_agent</span>
                  <span>لوحة مبيعات الموظف</span>
                </Link>
              )}

              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-[#c9952a] text-[#000e1f] font-black transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                  <span>لوحة تحكم الإدارة</span>
                </Link>
              )}

              <Link
                to="/about"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-white/5 text-white/75 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[19px] text-white/50">info</span>
                <span>عن شركة مستقبل الفراعنة</span>
              </Link>
            </div>

            <div className="h-px bg-white/10 my-3" />

            {/* Logout Action */}
            <button
              onClick={handleLogout}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 font-bold text-xs sm:text-sm hover:bg-red-500/25 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
