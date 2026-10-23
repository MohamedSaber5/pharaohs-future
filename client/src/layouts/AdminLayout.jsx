import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext.jsx";

const NAV_SECTIONS = [
  {
    title: "الرئيسية",
    items: [
      { to: "/admin/dashboard", icon: "dashboard", label: "لوحة التحكم" },
    ],
  },
  {
    title: "العقارات",
    items: [
      { to: "/admin/projects", icon: "apartment",       label: "المشاريع" },
      { to: "/admin/units",    icon: "holiday_village", label: "الوحدات" },
    ],
  },
  {
    title: "المبيعات",
    items: [
      { to: "/admin/reservations",    icon: "bookmark",       label: "الحجوزات" },
      { to: "/admin/assignment-logs", icon: "assignment_ind", label: "سجل التعيين" },
    ],
  },
  {
    title: "الإدارة والتحكم",
    items: [
      { to: "/admin/users",              icon: "group",         label: "المستخدمون" },
      { to: "/admin/employee-rotation",  icon: "swap_vert",     label: "توزيع الموظفين" },
      { to: "/admin/settings",           icon: "tune",          label: "إعدادات الموقع" },
    ],
  },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const doLogout = async () => {
    try { await logout(); } catch (_) {}
    navigate("/auth");
  };

  return (
    <div className="flex min-h-screen" style={{ background: "#f8f9fa" }} dir="rtl">
      {/* Sidebar */}
      <aside
        className="fixed right-0 top-0 h-full w-64 flex flex-col z-50 select-none"
        style={{ background: "#000e1f", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Brand */}
        <div
          className="flex items-center gap-3 px-5 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(201,149,42,0.2)" }}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ color: "#c9952a" }}>
              account_balance
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-white truncate leading-tight">
              مستقبل الفراعنة
            </p>
            <p className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
              لوحة الإدارة
            </p>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="px-3 pt-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-xs font-bold transition-all text-[#000e1f] shadow-md hover:opacity-95"
            style={{ background: "linear-gradient(135deg, #f0d897 0%, #c9952a 100%)" }}
          >
            <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
            <span>العودة للموقع الرئيسي</span>
          </Link>
        </div>

        {/* Nav Sections */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-5">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <p
                className="text-[10px] font-bold uppercase tracking-widest px-3 mb-2"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {section.title}
              </p>
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/admin/dashboard"}
                    className={({ isActive }) =>
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all " +
                      (isActive
                        ? "text-[#c9952a]"
                        : "hover:bg-white/5 text-white/50 hover:text-white/80")
                    }
                    style={({ isActive }) =>
                      isActive ? { background: "rgba(201,149,42,0.15)" } : {}
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                        <span className="flex-1">{item.label}</span>
                        {isActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: "#c9952a" }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div
          className="px-3 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3 px-2 mb-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[13px] text-white"
              style={{ background: "rgba(201,149,42,0.3)" }}
            >
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold text-white truncate">{user?.name || "المسؤول"}</p>
              <p className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                مسؤول النظام
              </p>
            </div>
          </div>
          <button
            onClick={doLogout}
            className="w-full flex items-center justify-center gap-2 h-9 rounded-xl text-[13px] font-semibold transition-all hover:bg-red-500/20"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="mr-64 flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
