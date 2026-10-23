import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@context/AuthContext.jsx';
import { useLanguage } from '@context/LanguageContext.jsx';
import projectService from '@services/project.service.js';

function StatCard({ icon, label, value, sub, color, bg, loading, liveLabel }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
          <span className={`material-symbols-outlined text-[24px] ${color}`}>{icon}</span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {liveLabel}
        </span>
      </div>
      {loading ? (
        <div className="h-8 w-20 bg-neutral-100 animate-pulse rounded-lg mb-2" />
      ) : (
        <p className={`text-[32px] font-bold leading-none mb-1 ${color}`}>{value ?? 0}</p>
      )}
      <p className="text-[14px] font-semibold text-neutral-700 mb-0.5">{label}</p>
      <p className="text-[12px] text-neutral-400">{sub}</p>
    </div>
  );
}

function EmptyState({ icon, title, sub, action, actionLabel }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-[32px] text-neutral-400">{icon}</span>
      </div>
      <h3 className="text-[16px] font-bold text-neutral-700 mb-1">{title}</h3>
      <p className="text-[13px] text-neutral-400 mb-5">{sub}</p>
      {action && (
        <Link
          to={action}
          className="inline-flex items-center gap-2 h-9 px-5 rounded-lg text-[13px] font-bold text-white hover:opacity-90 transition-all"
          style={{ background: "#000e1f" }}
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { t, isRTL, dir, tStatus } = useLanguage();
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const todayFormatted = new Date().toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [s, p] = await Promise.all([
          projectService.getStats(),
          projectService.getAll(),
        ]);
        setStats(s?.data ?? s);
        setProjects((p?.data ?? p ?? []).slice(0, 5));
      } catch (err) {
        setError(isRTL ? 'تعذر تحميل البيانات. يرجى التحقق من اتصال السيرفر.' : 'Failed to load data. Please check connection.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isRTL]);

  const stat = stats ?? {};
  const liveBadgeText = t("admin.liveSync", "مباشر • تحديث فوري");

  const tableHeaders = [
    t("admin.projectCol", "المشروع"),
    t("admin.locationCol", "الموقع"),
    t("admin.unitsTotalCol", "الوحدات المسجلة"),
    t("admin.availableCol", "المتاح"),
    t("admin.progressCol", "نسبة الإنجاز"),
    t("admin.statusCol", "الحالة"),
  ];

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-7" style={{ background: "#f8f9fa", minHeight: "100vh" }} dir={dir}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-neutral-900">{t("admin.portalTitle", "لوحة التحكم الإدارية")}</h1>
          <p className="text-[13px] text-neutral-500 mt-0.5">{todayFormatted}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border border-neutral-100 shadow-sm">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[13px] font-bold"
              style={{ background: "#775a1a" }}
            >
              {user?.name?.[0] || "م"}
            </div>
            <div>
              <p className="text-[13px] font-bold text-neutral-800 leading-none">{user?.name || (isRTL ? "المسؤول" : "Administrator")}</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">{t("roles.admin", "مدير النظام")}</p>
            </div>
          </div>
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-bold text-white hover:opacity-90 transition-all shadow-md"
            style={{ background: "#000e1f" }}
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            {t("admin.newProject", "مشروع جديد")}
          </Link>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl flex items-center gap-3 text-[14px]" style={{ background: "#fef2f2", color: "#dc2626" }}>
          <span className="material-symbols-outlined text-[20px]">error</span>
          {error}
        </div>
      )}

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          icon="apartment"
          label={t("admin.statTotalProjects", "إجمالي المشاريع")}
          value={stat.projects?.total}
          sub={
            isRTL
              ? `تحت الإنشاء: ${stat.projects?.underConstruction ?? 0} — مكتمل: ${stat.projects?.completed ?? 0}`
              : `Under Const.: ${stat.projects?.underConstruction ?? 0} — Completed: ${stat.projects?.completed ?? 0}`
          }
          color="text-[#000e1f]"
          bg="bg-[#000e1f]/8"
          loading={loading}
          liveLabel={liveBadgeText}
        />
        <StatCard
          icon="holiday_village"
          label={t("admin.statAvailableUnits", "الوحدات المتاحة")}
          value={stat.units?.available}
          sub={
            isRTL
              ? `من إجمالي ${stat.units?.total ?? 0} وحدة مسجلة`
              : `Out of ${stat.units?.total ?? 0} registered units`
          }
          color="text-[#775a1a]"
          bg="bg-[#775a1a]/10"
          loading={loading}
          liveLabel={liveBadgeText}
        />
        <StatCard
          icon="sell"
          label={t("admin.statSoldReserved", "وحدات مباعة ومحجوزة")}
          value={(stat.units?.sold ?? 0) + (stat.units?.reserved ?? 0)}
          sub={
            isRTL
              ? `مباع: ${stat.units?.sold ?? 0} | محجوز: ${stat.units?.reserved ?? 0}`
              : `Sold: ${stat.units?.sold ?? 0} | Reserved: ${stat.units?.reserved ?? 0}`
          }
          color="text-green-700"
          bg="bg-green-50"
          loading={loading}
          liveLabel={liveBadgeText}
        />
        <StatCard
          icon="inventory"
          label={t("admin.statTotalUnits", "إجمالي الوحدات الفعلي")}
          value={stat.units?.total}
          sub={t("admin.statDynamic", "مزامنة فورية لكافة الوحدات")}
          color="text-blue-700"
          bg="bg-blue-50"
          loading={loading}
          liveLabel={liveBadgeText}
        />
      </div>

      {/* Projects table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h2 className="text-[16px] font-bold text-neutral-900">{t("admin.latestProjects", "أحدث المشاريع والوحدات")}</h2>
          <Link
            to="/admin/projects"
            className="text-[13px] font-semibold hover:underline flex items-center gap-1"
            style={{ color: "#775a1a" }}
          >
            <span>{t("admin.manageProjects", "إدارة المشاريع")}</span>
            <span className={`material-symbols-outlined text-[16px] ${!isRTL ? "rotate-180" : ""}`}>arrow_left_alt</span>
          </Link>
        </div>

        {loading ? (
          <div className="p-8 flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-neutral-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <EmptyState
            icon="apartment"
            title={t("admin.noProjects", "لا توجد مشاريع مضافة بعد")}
            sub={t("admin.addFirstProject", "أضف مشروعك الأول ليظهر هنا")}
            action="/admin/projects"
            actionLabel={t("admin.newProject", "إضافة مشروع")}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#f8f9fa", borderBottom: "1px solid #f1f3f4" }}>
                  {tableHeaders.map((h) => (
                    <th key={h} className={`px-4 py-3 ${isRTL ? "text-right" : "text-left"} text-[12px] font-semibold text-neutral-500 whitespace-nowrap`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p._id} className="border-t border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-4">
                      <p className="text-[14px] font-bold text-neutral-800 whitespace-nowrap">
                        {!isRTL && p.nameEn ? p.nameEn : p.name}
                      </p>
                      {isRTL && p.nameEn && <p className="text-[12px] text-neutral-400">{p.nameEn}</p>}
                    </td>
                    <td className="px-4 py-4 text-[13px] text-neutral-600 whitespace-nowrap">{p.location}</td>
                    <td className="px-4 py-4 text-center text-[14px] font-bold text-neutral-800">
                      {p.unitCount ?? 0}
                    </td>
                    <td className="px-4 py-4 text-center text-[14px] font-bold" style={{ color: "#775a1a" }}>
                      {p.availableCount ?? 0}
                    </td>
                    <td className="px-4 py-4 min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: (p.progress || 0) + "%", background: "#775a1a" }}
                          />
                        </div>
                        <span className="text-[12px] font-bold" style={{ color: "#775a1a" }}>
                          {p.progress || 0}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[12px] font-bold whitespace-nowrap ${
                          p.status === "قيد البيع"
                            ? "bg-amber-100 text-amber-800"
                            : p.status === "مكتمل"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {tStatus(p.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: "apartment", label: t("admin.quickProjects", "إدارة المشاريع"), to: "/admin/projects", bg: "#000e1f", tc: "white" },
          { icon: "holiday_village", label: t("admin.quickUnits", "إدارة الوحدات"), to: "/admin/units", bg: "#775a1a", tc: "white" },
          { icon: "event_available", label: t("admin.quickReservations", "الحجوزات"), to: "/admin/reservations", bg: "#166534", tc: "white" },
          { icon: "swap_horiz", label: t("admin.quickRotation", "توزيع الموظفين"), to: "/admin/employee-rotation", bg: "#1e40af", tc: "white" },
        ].map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-neutral-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: a.bg }}>
              <span className="material-symbols-outlined text-[24px]" style={{ color: a.tc }}>
                {a.icon}
              </span>
            </div>
            <span className="text-[14px] font-semibold text-neutral-700 text-center">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
