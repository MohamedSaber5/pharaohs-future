import { useState, useEffect, useCallback } from "react";
import adminService from "@services/admin.service.js";

const BADGE = {
  true:  "bg-emerald-100 text-emerald-800 border border-emerald-200",
  false: "bg-red-100 text-red-800 border border-red-200",
};

export default function AdminEmployeeRotationPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [alert, setAlert]         = useState({ type: "", text: "" });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminService.getEmployeesRotation();
      const list = res?.data ?? res ?? [];
      setEmployees(Array.isArray(list) ? list : []);
    } catch {
      setAlert({ type: "error", text: "تعذّر تحميل قائمة الموظفين" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleActive = async (emp) => {
    try {
      await adminService.updateEmployeeRotation(emp._id, {
        rotationActive: !emp.rotationActive,
      });
      setAlert({
        type: "success",
        text: `تم ${emp.rotationActive ? "إيقاف" : "تفعيل"} الموظف ${emp.name} في دورة التعيين`,
      });
      load();
    } catch {
      setAlert({ type: "error", text: "فشل تحديث الحالة" });
    }
  };

  const moveUp = async (idx) => {
    if (idx === 0) return;
    const newOrder = [...employees];
    [newOrder[idx - 1], newOrder[idx]] = [newOrder[idx], newOrder[idx - 1]];
    await saveOrder(newOrder);
  };

  const moveDown = async (idx) => {
    if (idx === employees.length - 1) return;
    const newOrder = [...employees];
    [newOrder[idx + 1], newOrder[idx]] = [newOrder[idx], newOrder[idx + 1]];
    await saveOrder(newOrder);
  };

  const saveOrder = async (newOrder) => {
    setSaving(true);
    setEmployees(newOrder);
    try {
      const orderedIds = newOrder.map((e) => e._id);
      await adminService.reorderEmployeesRotation(orderedIds);
      setAlert({ type: "success", text: "تم حفظ الترتيب الجديد بنجاح" });
    } catch {
      setAlert({ type: "error", text: "فشل حفظ الترتيب" });
      load(); // Reload on failure
    } finally {
      setSaving(false);
    }
  };

  const activeCount   = employees.filter((e) => e.rotationActive).length;
  const inactiveCount = employees.filter((e) => !e.rotationActive).length;

  return (
    <div dir="rtl" className="p-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: "rgba(119,90,26,0.12)" }}>
            <span className="material-symbols-outlined text-[22px]" style={{ color: "#775a1a" }}>group</span>
          </div>
          <div>
            <h1 className="text-[24px] font-bold text-neutral-900">إدارة دورة تعيين موظفي المبيعات</h1>
            <p className="text-[13px] text-neutral-500">
              تحكم في ترتيب الموظفين ضمن نظام التوزيع التلقائي للعملاء (Round Robin)
            </p>
          </div>
        </div>
      </div>

      {/* Alert */}
      {alert.text && (
        <div
          className={`p-4 rounded-2xl text-[14px] font-semibold mb-6 flex items-center justify-between ${
            alert.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">
              {alert.type === "success" ? "check_circle" : "error"}
            </span>
            {alert.text}
          </div>
          <button onClick={() => setAlert({ type: "", text: "" })}>
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "إجمالي الموظفين", val: employees.length, color: "text-neutral-900", bg: "bg-neutral-50" },
          { label: "نشطون في التناوب", val: activeCount, color: "text-emerald-700", bg: "bg-emerald-50" },
          { label: "موقوفون مؤقتاً", val: inactiveCount, color: "text-red-600", bg: "bg-red-50" },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-5 border border-neutral-200/80 text-center`}>
            <p className={`text-[28px] font-black ${s.color}`}>{s.val}</p>
            <p className="text-[12px] font-bold text-neutral-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Info Note */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-[13px] text-blue-800 mb-6 flex items-start gap-3">
        <span className="material-symbols-outlined text-blue-500 mt-0.5">info</span>
        <div>
          <strong>كيف يعمل نظام التوزيع التلقائي؟</strong>
          <p className="mt-1 text-blue-700 leading-relaxed">
            عند قيام عميل بحجز وحدة، يُعيَّن له تلقائياً الموظف النشط الذي يحمل أقل عدد من العملاء الحاليين، مع مراعاة الترتيب المحدد هنا. الموظفون الموقوفون لا يتلقون تعيينات جديدة.
          </p>
        </div>
      </div>

      {/* Employee List */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-white rounded-2xl border border-neutral-100 animate-pulse" />
          ))}
        </div>
      ) : employees.length === 0 ? (
        <div className="bg-white rounded-3xl border border-neutral-200 p-16 text-center">
          <span className="material-symbols-outlined text-[48px] text-neutral-300 mb-3">group_off</span>
          <h3 className="text-[18px] font-bold text-neutral-700">لا يوجد موظفو مبيعات حتى الآن</h3>
          <p className="text-[13px] text-neutral-400 mt-1">
            قم بتعيين دور "موظف" لمستخدمين من صفحة إدارة المستخدمين أولاً
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/80 flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-neutral-800">
              قائمة الموظفين المرتبة حسب أولوية التعيين
            </h2>
            {saving && (
              <div className="flex items-center gap-2 text-[13px] text-neutral-500">
                <span className="w-4 h-4 border-2 border-neutral-300 border-t-[#775a1a] rounded-full animate-spin" />
                جاري الحفظ...
              </div>
            )}
          </div>

          <div className="divide-y divide-neutral-100">
            {employees.map((emp, idx) => (
              <div
                key={emp._id}
                className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                  emp.rotationActive
                    ? "hover:bg-neutral-50/60"
                    : "bg-neutral-50/40 opacity-70"
                }`}
              >
                {/* Priority Number */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-[14px] font-black"
                  style={{
                    background: emp.rotationActive ? "#000e1f" : "#f3f4f6",
                    color: emp.rotationActive ? "#c9952a" : "#9ca3af",
                  }}
                >
                  {idx + 1}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#775a1a] to-[#c9952a] flex items-center justify-center flex-shrink-0">
                  <span className="text-[15px] font-black text-white">
                    {emp.name?.charAt(0) || "؟"}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[15px] font-bold text-neutral-900">{emp.name}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        BADGE[String(emp.rotationActive)]
                      }`}
                    >
                      {emp.rotationActive ? "نشط في التناوب" : "موقوف مؤقتاً"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-0.5 text-[12px] text-neutral-500">
                    {emp.phone && (
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">call</span>
                        {emp.phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">assignment_ind</span>
                      {emp.assignedCount || 0} عميل معيّن
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Reorder Arrows */}
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0 || saving}
                      className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="تحريك لأعلى (أولوية أعلى)"
                    >
                      <span className="material-symbols-outlined text-[16px]">keyboard_arrow_up</span>
                    </button>
                    <button
                      onClick={() => moveDown(idx)}
                      disabled={idx === employees.length - 1 || saving}
                      className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="تحريك لأسفل (أولوية أقل)"
                    >
                      <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
                    </button>
                  </div>

                  {/* Toggle Active in Rotation */}
                  <button
                    onClick={() => toggleActive(emp)}
                    className={`h-9 px-4 rounded-xl text-[12px] font-bold flex items-center gap-1.5 transition-all border ${
                      emp.rotationActive
                        ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {emp.rotationActive ? "pause_circle" : "play_circle"}
                    </span>
                    {emp.rotationActive ? "إيقاف مؤقت" : "تفعيل"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
