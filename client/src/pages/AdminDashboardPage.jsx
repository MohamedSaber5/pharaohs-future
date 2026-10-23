import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@context/AuthContext.jsx';
import { useLanguage } from '@context/LanguageContext.jsx';
import projectService from '@services/project.service.js';

const today = new Date().toLocaleDateString('ar-EG', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function StatCard({ icon, label, value, sub, color, bg, loading }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
          <span className={`material-symbols-outlined text-[24px] ${color}`}>{icon}</span>
        </div>
        <span className="text-[12px] font-medium text-neutral-400 bg-neutral-50 px-2.5 py-1 rounded-full">
          مباشر من MongoDB
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
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        setError('تعذر تحميل البيانات. يرجى التحقق من اتصال السيرفر.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const { t, isRTL, dir } = useLanguage();
  const stat = stats ?? {};

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-7" style={{ background: "#f8f9fa", minHeight: "100vh" }} dir={dir}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-neutral-900">{t("admin.portalTitle", "لوحة التحكم الإدارية")}</h1>
          <p className="text-[13px] text-neutral-500 mt-0.5">{today}</p>
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
              <p className="text-[13px] font-bold text-neutral-800 leading-none">{user?.name || "المسؤول"}</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">مدير النظام</p>
            </div>
          </div>
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-bold text-white hover:opacity-90 transition-all shadow-md"
            style={{ background: "#000e1f" }}
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            مشروع جديد
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

      {/* Dynamic Stats Grid directly bound to MongoDB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          icon="apartment"
          label="إجمالي المشاريع"
          value={stat.projects?.total}
          sub={`تحت الإنشاء: ${stat.projects?.underConstruction ?? 0} — مكتمل: ${stat.projects?.completed ?? 0}`}
          color="text-[#000e1f]"
          bg="bg-[#000e1f]/8"
          loading={loading}
        />
        <StatCard
          icon="holiday_village"
          label="الوحدات المتاحة"
          value={stat.units?.available}
          sub={`من إجمالي ${stat.units?.total ?? 0} وحدة مسجلة`}
          color="text-[#775a1a]"
          bg="bg-[#775a1a]/10"
          loading={loading}
        />
        <StatCard
          icon="sell"
          label="وحدات مباعة / محجوزة"
          value={(stat.units?.sold ?? 0) + (stat.units?.reserved ?? 0)}
          sub={`مباع: ${stat.units?.sold ?? 0} | محجوز: ${stat.units?.reserved ?? 0}`}
          color="text-green-700"
          bg="bg-green-50"
          loading={loading}
        />
        <StatCard
          icon="inventory"
          label="إجمالي الوحدات الفعلي"
          value={stat.units?.total}
          sub="يتغير ديناميكياً مع الإضافة والحذف"
          color="text-blue-700"
          bg="bg-blue-50"
          loading={loading}
        />
      </div>

      {/* Projects table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h2 className="text-[16px] font-bold text-neutral-900">أحدث المشاريع والوحدات</h2>
          <Link
            to="/admin/projects"
            className="text-[13px] font-semibold hover:underline flex items-center gap-1"
            style={{ color: "#775a1a" }}
          >
            إدارة المشاريع <span className="material-symbols-outlined text-[16px]">arrow_left_alt</span>
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
            title="لا توجد مشاريع مضافة بعد"
            sub="أضف مشروعك الأول ليظهر هنا"
            action="/admin/projects"
            actionLabel="إضافة مشروع"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#f8f9fa", borderBottom: "1px solid #f1f3f4" }}>
                  {["المشروع", "الموقع", "الوحدات المسجلة", "المتاح", "نسبة الإنجاز", "الحالة"].map((h) => (
                    <th key={h} className="px-4 py-3 text-right text-[12px] font-semibold text-neutral-500 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p._id} className="border-t border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-4">
                      <p className="text-[14px] font-bold text-neutral-800 whitespace-nowrap">{p.name}</p>
                      {p.nameEn && <p className="text-[12px] text-neutral-400">{p.nameEn}</p>}
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
                        {p.status}
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
          { icon: "apartment", label: "إدارة المشاريع", to: "/admin/projects", bg: "#000e1f", tc: "white" },
          { icon: "holiday_village", label: "إدارة الوحدات", to: "/admin/units", bg: "#775a1a", tc: "white" },
          { icon: "event_available", label: "الحجوزات", to: "/admin/reservations", bg: "#166534", tc: "white" },
          { icon: "swap_horiz", label: "توزيع الموظفين", to: "/admin/employee-rotation", bg: "#1e40af", tc: "white" },
        ].map((a) => (
          <Link
            key={a.label}
            to={a.to}
            className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-neutral-100 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: a.bg }}>
              <span className="material-symbols-outlined text-[24px]" style={{ color: a.tc }}>
                {a.icon}
              </span>
            </div>
            <span className="text-[14px] font-semibold text-neutral-700">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
