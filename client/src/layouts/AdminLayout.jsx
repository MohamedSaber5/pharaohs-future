import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext.jsx";
import { useLanguage } from "@context/LanguageContext.jsx";
import LanguageSwitcher from "@components/common/LanguageSwitcher.jsx";
import logoSrc from "@assets/images/really-logo.png";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { t, isRTL, dir } = useLanguage();
  const navigate = useNavigate();

  const doLogout = async () => {
    try { await logout(); } catch (_) {}
    navigate("/auth");
  };

  const navSections = [
    {
      title: t("admin.secMain", "الرئيسية"),
      items: [
        { to: "/admin/dashboard", icon: "dashboard", label: t("admin.menuDashboard", "لوحة التحكم") },
      ],
    },
    {
      title: t("admin.secRealEstate", "العقارات والمشاريع"),
      items: [
        { to: "/admin/projects", icon: "apartment", label: t("admin.menuProjects", "المشاريع") },
        { to: "/admin/units", icon: "holiday_village", label: t("admin.menuUnits", "الوحدات") },
      ],
    },
    {
      title: t("admin.secSales", "المبيعات"),
      items: [
        { to: "/admin/reservations", icon: "bookmark", label: t("admin.menuReservations", "الحجوزات") },
        { to: "/admin/assignment-logs", icon: "assignment_ind", label: t("admin.menuLogs", "سجل التعيين") },
      ],
    },
    {
      title: t("admin.secManagement", "الإدارة والتحكم"),
      items: [
        { to: "/admin/users", icon: "group", label: t("admin.menuUsers", "المستخدمون") },
        { to: "/admin/employee-rotation", icon: "swap_vert", label: t("admin.menuRotation", "توزيع الموظفين") },
        { to: "/admin/settings", icon: "tune", label: t("admin.menuSettings", "إعدادات الموقع") },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen" style={{ background: "#f8f9fa" }} dir={dir}>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 h-full w-64 flex flex-col z-50 select-none ${
          isRTL ? "right-0 border-l" : "left-0 border-r"
        }`}
        style={{
          background: "#000e1f",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        {/* Brand */}
        <div
          className="flex items-center gap-3 px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <img
            src={logoSrc}
            alt={t("brand.name", "مستقبل الفراعنة")}
            className="h-10 w-auto object-contain max-w-[140px]"
          />
          <div className="min-w-0">
            <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-[#c9952a]/20 text-[#f0d897] border border-[#c9952a]/30">
              {t("admin.portalTitle", "لوحة الإدارة")}
            </span>
          </div>
        </div>

        {/* Back to Home Button & Language Switcher */}
        <div className="px-3 pt-3 flex flex-col gap-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-xs font-bold transition-all text-[#000e1f] shadow-md hover:opacity-95"
            style={{ background: "linear-gradient(135deg, #f0d897 0%, #c9952a 100%)" }}
          >
            <span className={`material-symbols-outlined text-[17px] ${!isRTL ? "rotate-180" : ""}`}>
              arrow_forward
            </span>
            <span>{t("admin.backToSite", "العودة للموقع الرئيسي")}</span>
          </Link>
          <LanguageSwitcher variant="button" className="w-full justify-center" />
        </div>

        {/* Nav Sections */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-5">
          {navSections.map((section) => (
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
              <p className="text-[13px] font-bold text-white truncate">{user?.name || "Admin"}</p>
              <p className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                {t("roles.admin", "مسؤول النظام")}
              </p>
            </div>
          </div>
          <button
            onClick={doLogout}
            className="w-full flex items-center justify-center gap-2 h-9 rounded-xl text-[13px] font-semibold transition-all hover:bg-red-500/20 cursor-pointer"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            {t("nav.logout", "تسجيل الخروج")}
          </button>
        </div>
      </aside>

      {/* Main Content (Offset for Sidebar in RTL vs LTR) */}
      <div className={`flex-1 min-w-0 ${isRTL ? "mr-64" : "ml-64"}`}>
        <Outlet />
      </div>
    </div>
  );
}
