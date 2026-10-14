import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext.jsx";

const NAV = [
  { to:"/admin/dashboard",    icon:"dashboard",       label:"نظرة عامة" },
  { to:"/admin/projects",     icon:"apartment",       label:"المشروعات" },
  { to:"/admin/units",        icon:"holiday_village", label:"الوحدات" },
  { to:"/admin/reservations", icon:"event_available", label:"الحجوزات" },
  { to:"/admin/clients",      icon:"groups",          label:"العملاء" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const doLogout = async () => { try { await logout(); } catch(_){} navigate("/auth"); };

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="fixed right-0 top-0 h-full w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between select-none">
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="p-space-lg flex items-center gap-space-sm border-b border-outline-variant/30">
            <div className="w-11 h-11 rounded-lg bg-primary-container text-secondary-fixed flex items-center justify-center shadow-md flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-title-md text-title-md text-primary font-bold truncate leading-tight">مستقبل الفراعنة</span>
              <span className="font-label-sm text-label-sm text-secondary truncate mt-0.5">لوحة الإدارة</span>
            </div>
          </div>
          <nav className="flex-1 px-space-md py-space-sm overflow-y-auto flex flex-col gap-1">
            {NAV.map(item => (
              <NavLink key={item.to} to={item.to} end={item.to === "/admin/dashboard"}
                className={({ isActive }) =>
                  "flex items-center gap-space-sm px-space-md py-space-sm rounded-lg transition-colors " +
                  (isActive ? "bg-primary-container text-on-primary font-semibold shadow-sm" : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface")
                }
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="font-title-md text-title-md">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="p-space-md border-t border-outline-variant/30">
          <div className="flex items-center gap-space-sm px-space-md py-space-sm mb-2">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="font-label-sm text-on-primary font-bold">{user?.name?.[0] || "م"}</span>
            </div>
            <div>
              <p className="font-title-md text-title-md text-on-surface font-bold truncate">{user?.name || "المسؤول"}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">مسؤول النظام</p>
            </div>
          </div>
          <button onClick={doLogout} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-surface-container text-on-surface-variant hover:bg-error-container hover:text-on-error-container font-label-md text-label-md transition-colors">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            تسجيل خروج
          </button>
        </div>
      </aside>
      <div className="mr-72 flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}

