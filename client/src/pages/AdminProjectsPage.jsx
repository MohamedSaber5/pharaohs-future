import { useState, useEffect, useCallback, useRef } from "react";
import projectService from "@services/project.service.js";
import { getImageUrl } from "@utils/imageHelper.js";
import toast from "react-hot-toast";
import { useLanguage } from "@context/LanguageContext.jsx";

const STATUS_LIST = ["قيد البيع", "تحت الإنشاء", "مكتمل"];
const TYPE_LIST = [
  "سكني فاخر",
  "تجاري وإداري",
  "فيلات فاخرة",
  "شاليهات سياحية",
  "سكني متوسط",
  "تجاري",
  "إداري",
];

const EMPTY_FORM = {
  name: "",
  nameEn: "",
  location: "",
  type: "سكني فاخر",
  description: "",
  totalArea: "",
  startPrice: "",
  delivery: "",
  status: "قيد البيع",
  progress: 0,
  license: "",
};

const Badge = ({ status, tStatus }) => {
  const cls =
    status === "قيد البيع"
      ? "bg-amber-100 text-amber-800"
      : status === "مكتمل"
      ? "bg-green-100 text-green-800"
      : "bg-blue-100 text-blue-800";
  return (
    <span className={`px-2.5 py-1 rounded-full text-[12px] font-bold whitespace-nowrap ${cls}`}>
      {tStatus ? tStatus(status) : status}
    </span>
  );
};

export default function AdminProjectsPage() {
  const { t, isRTL, dir, tStatus, formatPrice } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const fileInputRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (statusFilter !== "الكل") params.status = statusFilter;
      if (search) params.search = search;
      const res = await projectService.getAll(params);
      setProjects(res?.data ?? res ?? []);
    } catch {
      setError("تعذر تحميل المشاريع");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setImages([]);
    setPreviews([]);
    setShowModal(true);
  };

  const openEdit = (p) => {
    setForm({
      name: p.name || "",
      nameEn: p.nameEn || "",
      location: p.location || "",
      type: p.type || "سكني فاخر",
      description: p.description || "",
      totalArea: p.totalArea || "",
      startPrice: p.startPrice || "",
      delivery: p.delivery || "",
      status: p.status || "قيد البيع",
      progress: p.progress || 0,
      license: p.license || "",
      unitCount: p.unitCount ?? p.totalUnits ?? 0,
    });
    const imgs = p.images || [];
    setImages(imgs);
    setPreviews(imgs);
    setEditId(p._id);
    setShowModal(true);
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setPreviews((prev) => [...prev, ...newPreviews]);

    setUploadingImg(true);
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append("images", f));
      const res = await projectService.uploadImages(fd);
      const urls = res?.data?.urls ?? res?.urls ?? [];
      setImages((prev) => [...prev, ...urls]);
      toast.success(`تم رفع ${urls.length} صورة بنجاح.`);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err?.response?.data?.message || err?.message || "فشل رفع الصور");
    } finally {
      setUploadingImg(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.type) {
      toast.error("يرجى تعبئة الحقول المطلوبة");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        nameEn: form.nameEn,
        location: form.location,
        type: form.type,
        description: form.description,
        delivery: form.delivery,
        status: form.status,
        license: form.license,
        totalArea: Number(form.totalArea) || 0,
        startPrice: Number(form.startPrice) || 0,
        progress: Number(form.progress) || 0,
        images,
      };
      if (editId) {
        await projectService.update(editId, payload);
        toast.success("تم تحديث المشروع بنجاح");
      } else {
        await projectService.create(payload);
        toast.success("تم إنشاء المشروع بنجاح");
      }
      setShowModal(false);
      setEditId(null);
      setImages([]);
      setPreviews([]);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "حدث خطأ");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await projectService.delete(deleteId);
      toast.success("تم حذف المشروع");
      setDeleteId(null);
      load();
    } catch {
      toast.error("حدث خطأ");
    }
  };

  // Real dynamic totals calculated directly from projects & active units
  const totals = {
    total: projects.length,
    units: projects.reduce((a, p) => a + (p.unitCount ?? p.totalUnits ?? 0), 0),
    available: projects.reduce((a, p) => a + (p.availableCount ?? 0), 0),
    sold: projects.reduce((a, p) => a + (p.soldCount ?? 0), 0),
  };

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-7" style={{ background: "#f8f9fa", minHeight: "100vh" }} dir={dir}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-neutral-900 mb-1">{t("admin.menuProjects", "إدارة المشاريع")}</h1>
          <p className="text-[14px] text-neutral-500">{isRTL ? "إضافة وتعديل ومتابعة مشاريع الشركة وحالاتها" : "Add, edit, and track company projects and statuses"}</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-xl text-[14px] font-bold text-white shadow-md hover:opacity-90 transition-all cursor-pointer"
          style={{ background: "#000e1f" }}
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          {t("admin.newProject", "إضافة مشروع جديد")}
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t("admin.statTotalProjects", "إجمالي المشاريع"), value: totals.total, icon: "apartment", color: "#000e1f" },
          { label: t("admin.statTotalUnits", "إجمالي الوحدات الفعلية"), value: totals.units, icon: "layers", color: "#775a1a" },
          { label: t("admin.statAvailableUnits", "الوحدات المتاحة"), value: totals.available, icon: "check_circle", color: "#16a34a" },
          { label: isRTL ? "الوحدات المباعة" : "Sold Units", value: totals.sold, icon: "sell", color: "#dc2626" },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
              style={{ background: kpi.color }}
            >
              <span className="material-symbols-outlined text-[24px]">{kpi.icon}</span>
            </div>
            <div>
              <p className="text-[12px] font-medium text-neutral-400 mb-0.5">{kpi.label}</p>
              <p className="text-[22px] font-bold text-neutral-900">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <span className={`material-symbols-outlined absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-neutral-400 text-[20px]`}>
            search
          </span>
          <input
            type="text"
            placeholder={isRTL ? "بحث باسم المشروع أو الموقع..." : "Search by project or location..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full h-10 ${isRTL ? "pr-10 pl-4" : "pl-10 pr-4"} rounded-xl border border-neutral-200 text-[13px] focus:outline-none focus:border-amber-700 transition-colors`}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["الكل", ...STATUS_LIST].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`h-9 px-4 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === s
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {s === "الكل" ? t("common.all", "الكل") : tStatus(s)}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-neutral-400 text-[14px]">{t("common.loading", "جاري التحميل...")}</div>
        ) : error ? (
          <div className="py-20 text-center text-red-500 text-[14px]">{error}</div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center text-neutral-400 text-[14px]">{t("admin.noProjects", "لا توجد مشاريع مطابقة")}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-100 text-[12px] font-bold text-neutral-400 bg-neutral-50/50">
                  <th className={`py-4 px-6 ${isRTL ? "text-right" : "text-left"}`}>{t("admin.projectCol", "المشروع")}</th>
                  <th className={`py-4 px-4 ${isRTL ? "text-right" : "text-left"}`}>{t("admin.locationCol", "الموقع")}</th>
                  <th className={`py-4 px-4 ${isRTL ? "text-right" : "text-left"}`}>{isRTL ? "النوع" : "Type"}</th>
                  <th className="py-4 px-4 text-center">{t("admin.unitsTotalCol", "الوحدات الفعلية")}</th>
                  <th className="py-4 px-4 text-center">{t("admin.availableCol", "المتاح")}</th>
                  <th className={`py-4 px-4 ${isRTL ? "text-right" : "text-left"}`}>{isRTL ? "يبدأ من" : "Starts From"}</th>
                  <th className={`py-4 px-4 ${isRTL ? "text-right" : "text-left"}`}>{t("admin.statusCol", "الحالة")}</th>
                  <th className="py-4 px-6 text-center">{t("common.actions", "إجراءات")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-[13px]">
                {projects.map((p) => {
                  const cover = p.images?.[0] ? getImageUrl(p.images[0]) : null;
                  const unitCount = p.unitCount ?? p.totalUnits ?? 0;
                  const availCount = p.availableCount ?? 0;

                  return (
                    <tr key={p._id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className={`py-4 px-6 ${isRTL ? "text-right" : "text-left"}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden shrink-0 flex items-center justify-center border border-neutral-200">
                            {cover ? (
                              <img src={cover} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="material-symbols-outlined text-neutral-400 text-[22px]">
                                apartment
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-neutral-900">{!isRTL && p.nameEn ? p.nameEn : p.name}</p>
                            {isRTL && p.nameEn && <p className="text-[11px] text-neutral-400">{p.nameEn}</p>}
                          </div>
                        </div>
                      </td>
                      <td className={`py-4 px-4 text-neutral-600 ${isRTL ? "text-right" : "text-left"}`}>{p.location || "—"}</td>
                      <td className={`py-4 px-4 text-neutral-600 ${isRTL ? "text-right" : "text-left"}`}>{p.type || "—"}</td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-amber-50 text-amber-900 border border-amber-200/60">
                          {unitCount} {isRTL ? "وحدة" : "units"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-bold text-green-700">
                        {availCount}
                      </td>
                      <td className={`py-4 px-4 font-bold text-neutral-900 font-mono ${isRTL ? "text-right" : "text-left"}`}>
                        {p.startPrice ? formatPrice(p.startPrice) : "—"}
                      </td>
                      <td className={`py-4 px-4 ${isRTL ? "text-right" : "text-left"}`}>
                        <Badge status={p.status} tStatus={tStatus} />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEdit(p)}
                            className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                            title={isRTL ? "تعديل المشروع" : "Edit Project"}
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteId(p._id)}
                            className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                            title={isRTL ? "حذف المشروع" : "Delete Project"}
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Create / Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl my-8 relative">
            <div className="flex items-center justify-between pb-5 border-b border-neutral-100 mb-6">
              <h2 className="text-[18px] font-bold text-neutral-900">
                {editId ? "تعديل المشروع" : "إضافة مشروع جديد"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                    اسم المشروع بالعربية *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-[13px] focus:outline-none focus:border-amber-700"
                    placeholder="مثال: كمبوند سيليا"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                    اسم المشروع بالإنجليزية
                  </label>
                  <input
                    type="text"
                    name="nameEn"
                    value={form.nameEn}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-[13px] focus:outline-none focus:border-amber-700"
                    placeholder="e.g. Celia Compound"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                    الموقع *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={form.location}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-[13px] focus:outline-none focus:border-amber-700"
                    placeholder="مثال: أسوان الجديدة - الحي الثاني"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                    نوع المشروع *
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-[13px] focus:outline-none focus:border-amber-700 bg-white"
                  >
                    {TYPE_LIST.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                    السعر المبدئي (ج.م)
                  </label>
                  <input
                    type="number"
                    name="startPrice"
                    value={form.startPrice}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-[13px] focus:outline-none focus:border-amber-700"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                    المساحة الإجمالية (م²)
                  </label>
                  <input
                    type="number"
                    name="totalArea"
                    value={form.totalArea}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-[13px] focus:outline-none focus:border-amber-700"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                    تاريخ التسليم
                  </label>
                  <input
                    type="text"
                    name="delivery"
                    value={form.delivery}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-[13px] focus:outline-none focus:border-amber-700"
                    placeholder="مثال: 2026"
                  />
                </div>
              </div>

              {/* Dynamic Units notice */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-800 text-[22px]">layers</span>
                  <div>
                    <p className="text-[13px] font-bold text-amber-900">
                      عدد الوحدات المسجلة: {editId ? (form.unitCount ?? 0) : 0} وحدة
                    </p>
                    <p className="text-[11px] text-amber-700 mt-0.5">
                      يتم احتساب عدد الوحدات ديناميكياً وتحديثه تلقائياً عند إضافة أو حذف وحدات تابعة للمشروع.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                    حالة المشروع
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-[13px] focus:outline-none focus:border-amber-700 bg-white"
                  >
                    {STATUS_LIST.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                    نسبة الإنجاز (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    name="progress"
                    value={form.progress}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-neutral-200 text-[13px] focus:outline-none focus:border-amber-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                  الوصف والتفاصيل
                </label>
                <textarea
                  rows={3}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl border border-neutral-200 text-[13px] focus:outline-none focus:border-amber-700"
                  placeholder="وصف مميزات ومواصفات المشروع..."
                />
              </div>

              {/* Upload Images */}
              <div>
                <label className="block text-[13px] font-bold text-neutral-700 mb-2">
                  صور المشروع
                </label>
                <div className="flex flex-wrap gap-3 mb-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-neutral-200 group">
                      <img
                        src={getImageUrl(img)}
                        alt="Project"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    disabled={uploadingImg}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-xl border-2 border-dashed border-neutral-300 hover:border-amber-700 flex flex-col items-center justify-center text-neutral-400 hover:text-amber-700 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {uploadingImg ? "sync" : "add_photo_alternate"}
                    </span>
                    <span className="text-[10px] mt-1 font-bold">
                      {uploadingImg ? "جاري الرفع..." : "إضافة صورة"}
                    </span>
                  </button>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="h-11 px-6 rounded-xl border border-neutral-200 text-[13px] font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImg}
                  className="h-11 px-8 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-[13px] font-bold transition-all disabled:opacity-50 shadow-md"
                >
                  {saving ? "جاري الحفظ..." : editId ? "حفظ التعديلات" : "إضافة المشروع"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[28px]">delete</span>
            </div>
            <h3 className="text-[16px] font-bold text-neutral-900 mb-2">تأكيد حذف المشروع</h3>
            <p className="text-[13px] text-neutral-500 mb-6">
              هل أنت متأكد من حذف هذا المشروع؟ سيتم نقل المشروع إلى قائمة غير النشط.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 h-11 rounded-xl border border-neutral-200 text-[13px] font-bold text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[13px] font-bold transition-colors shadow-md"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
