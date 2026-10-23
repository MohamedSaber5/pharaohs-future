import { useState, useEffect, useCallback, useRef } from 'react';
import unitService from '@services/unit.service.js';
import projectService from '@services/project.service.js';
import { getImageUrl } from '@utils/imageHelper.js';
import toast from 'react-hot-toast';
import { useLanguage } from '@context/LanguageContext.jsx';

const STATUS_LIST = ["متاح", "محجوز", "مباع"];
const TYPE_LIST = [
  "شقة",
  "شقة فاخرة",
  "بنتهاوس",
  "فيلا",
  "تاون هاوس",
  "دوبلكس",
  "دوبلكس بحديقة",
  "بنتهاوس برووف",
  "استوديو مميز",
  "محل تجاري",
  "مكتب إداري",
  "أرض",
];
const FINISH_LIST = [
  "تشطيب كامل",
  "تشطيب فندقي",
  "نصف تشطيب",
  "بدون تشطيب",
  "Core & Shell",
];

const EMPTY = {
  project: "",
  type: "شقة",
  area: "",
  floor: "",
  building: "",
  rooms: "",
  bathrooms: 1,
  parking: 0,
  price: "",
  downPaymentPercent: 10,
  installmentYears: 5,
  deliveryDate: "",
  finishing: "تشطيب كامل",
  status: "متاح",
  description: "",
  ref: "",
};

const SC = {
  "متاح": "bg-green-100 text-green-800",
  "محجوز": "bg-amber-100 text-amber-800",
  "مباع": "bg-red-100 text-red-800",
};

export default function AdminUnitsPage() {
  const { t, isRTL, dir, tStatus, tType, formatPrice, formatArea } = useLanguage();
  const [units, setUnits] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projFilter, setProjFilter] = useState('الكل');
  const [statFilter, setStatFilter] = useState('الكل');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const fileInputRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (projFilter !== 'الكل') params.project = projFilter;
      if (statFilter !== 'الكل') params.status = statFilter;
      else params.status = 'all';

      const [u, p] = await Promise.all([
        unitService.getAll(params),
        projectService.getAll({ limit: 100 }),
      ]);

      const uData = u?.data ?? u;
      const uList = Array.isArray(uData?.units)
        ? uData.units
        : Array.isArray(uData)
        ? uData
        : [];
      setUnits(uList);

      const pData = p?.data ?? p;
      const pList = Array.isArray(pData?.projects)
        ? pData.projects
        : Array.isArray(pData)
        ? pData
        : [];
      setProjects(pList);
    } catch {
      toast.error('تعذر تحميل البيانات');
    } finally {
      setLoading(false);
    }
  }, [projFilter, statFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setForm({ ...EMPTY, project: projects[0]?._id || "" });
    setEditId(null);
    setImages([]);
    setPreviews([]);
    setShowModal(true);
  };

  const openEdit = (u) => {
    setForm({
      project: u.project?._id || u.project || "",
      type: u.type || "شقة",
      area: u.area || "",
      floor: u.floor ?? "",
      building: u.building || "",
      rooms: u.rooms ?? "",
      bathrooms: u.bathrooms ?? 1,
      parking: u.parking ?? 0,
      price: u.price || "",
      downPaymentPercent: u.downPaymentPercent ?? 10,
      installmentYears: u.installmentYears ?? 5,
      deliveryDate: u.deliveryDate ? u.deliveryDate.split('T')[0] : "",
      finishing: u.finishing || "تشطيب كامل",
      status: u.status || "متاح",
      description: u.description || "",
      ref: u.ref || "",
    });
    const imgs = u.images || [];
    setImages(imgs);
    setPreviews(imgs);
    setEditId(u._id);
    setShowModal(true);
  };

  const fc = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setPreviews((prev) => [...prev, ...newPreviews]);

    setUploadingImg(true);
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append('images', f));
      const res = await unitService.uploadImages(fd);
      const urls = res?.data?.urls ?? res?.urls ?? [];
      setImages((prev) => [...prev, ...urls]);
      toast.success(`تم رفع ${urls.length} صورة للوحدة بنجاح.`);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err?.response?.data?.message || err?.message || 'فشل رفع الصور');
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
    if (!form.project || !form.area || !form.price) {
      toast.error('يرجى تعبئة المشروع والمساحة والسعر');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        area: Number(form.area),
        floor: Number(form.floor || 1),
        rooms: Number(form.rooms || 0),
        bathrooms: Number(form.bathrooms || 1),
        parking: Number(form.parking || 0),
        price: Number(form.price),
        downPaymentPercent: Number(form.downPaymentPercent || 10),
        installmentYears: Number(form.installmentYears || 0),
        deliveryDate: form.deliveryDate || null,
        images,
      };
      if (editId) {
        await unitService.update(editId, payload);
        toast.success('تم تحديث الوحدة بنجاح.');
      } else {
        await unitService.create(payload);
        toast.success('تم إنشاء الوحدة بنجاح.');
      }
      setShowModal(false);
      setEditId(null);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'حدث خطأ');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await unitService.delete(deleteId);
      toast.success('تم حذف الوحدة');
      setDeleteId(null);
      load();
    } catch {
      toast.error('خطأ أثناء الحذف');
    }
  };

  // Live payment preview
  const dpAmt = form.price
    ? Math.round((Number(form.price) * Number(form.downPaymentPercent || 0)) / 100)
    : 0;
  const monthlyAmt =
    form.price && Number(form.installmentYears) > 0
      ? Math.round((Number(form.price) - dpAmt) / (Number(form.installmentYears) * 12))
      : 0;

  const inp =
    "w-full h-10 px-3 rounded-xl border border-neutral-200 text-[13px] outline-none bg-neutral-50 focus:border-[#775a1a] transition-all";
  const lbl = "text-[12px] font-semibold text-neutral-600 mb-1 block";

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-7" style={{ background: "#f8f9fa", minHeight: "100vh" }} dir={dir}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-neutral-900">{t("admin.menuUnits", "إدارة الوحدات العقارية")}</h1>
          <p className="text-[13px] text-neutral-500 mt-0.5">
            {isRTL ? `إجمالي الوحدات الحقيقية المسجلة: ${units.length} وحدة` : `Total registered units: ${units.length} units`}
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-xl font-bold text-white text-[13px] hover:opacity-90 transition-all shadow-md cursor-pointer"
          style={{ background: '#000e1f' }}
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          {isRTL ? "إضافة وحدة جديدة" : "Add New Unit"}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-4 flex items-center gap-3 flex-wrap shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-neutral-500 font-semibold">{t("admin.projectCol", "المشروع")}:</span>
          <select
            value={projFilter}
            onChange={(e) => setProjFilter(e.target.value)}
            className="h-9 px-3 rounded-lg border border-neutral-200 text-[13px] outline-none bg-neutral-50 cursor-pointer"
          >
            <option value="الكل">{isRTL ? "كل المشاريع" : "All Projects"}</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {!isRTL && p.nameEn ? p.nameEn : p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[12px] text-neutral-500 font-semibold">{t("admin.statusCol", "الحالة")}:</span>
          <select
            value={statFilter}
            onChange={(e) => setStatFilter(e.target.value)}
            className="h-9 px-3 rounded-lg border border-neutral-200 text-[13px] outline-none bg-neutral-50 cursor-pointer"
          >
            <option value="الكل">{isRTL ? "كل الحالات" : "All Statuses"}</option>
            {STATUS_LIST.map((s) => (
              <option key={s} value={s}>
                {tStatus(s)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-neutral-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : units.length === 0 ? (
          <div className="flex flex-col items-center py-20">
            <span className="material-symbols-outlined text-[56px] text-neutral-300 mb-4">home</span>
            <p className="text-neutral-500 text-[15px]">{isRTL ? "لا توجد وحدات مسجلة تطابق التصفية" : "No registered units match filters"}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '1px solid #f1f3f4' }}>
                  {[
                    "#",
                    isRTL ? "الصورة" : "Image",
                    t("admin.projectCol", "المشروع"),
                    isRTL ? "النوع" : "Type",
                    isRTL ? "المساحة" : "Area",
                    isRTL ? "المبنى" : "Bldg",
                    isRTL ? "الدور" : "Floor",
                    isRTL ? "السعر" : "Price",
                    isRTL ? "المقدم" : "Down Payment",
                    isRTL ? "التقسيط" : "Installment",
                    t("admin.statusCol", "الحالة"),
                    t("common.actions", "إجراءات"),
                  ].map((h) => (
                    <th key={h} className={`px-4 py-3 ${isRTL ? "text-right" : "text-left"} text-[11px] font-semibold text-neutral-500 whitespace-nowrap`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {units.map((u, i) => {
                  const img = u.images?.[0]
                    ? getImageUrl(u.images[0])
                    : u.project?.images?.[0]
                    ? getImageUrl(u.project.images[0])
                    : null;
                  return (
                    <tr key={u._id} className="border-t border-neutral-100 hover:bg-neutral-50/60 transition-colors">
                      <td className={`px-4 py-3 text-[12px] text-neutral-400 font-mono ${isRTL ? "text-right" : "text-left"}`}>{i + 1}</td>
                      <td className="px-4 py-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 flex-shrink-0">
                          {img ? (
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="material-symbols-outlined text-neutral-300 flex items-center justify-center h-full text-[20px]">
                              holiday_village
                            </span>
                          )}
                        </div>
                      </td>
                      <td className={`px-4 py-3 text-[13px] font-semibold text-neutral-800 whitespace-nowrap ${isRTL ? "text-right" : "text-left"}`}>
                        {!isRTL && u.project?.nameEn ? u.project.nameEn : (u.project?.name || '—')}
                      </td>
                      <td className={`px-4 py-3 text-[13px] text-neutral-700 ${isRTL ? "text-right" : "text-left"}`}>{tType(u.type)}</td>
                      <td className={`px-4 py-3 text-[13px] text-neutral-600 whitespace-nowrap ${isRTL ? "text-right" : "text-left"}`}>{formatArea(u.area)}</td>
                      <td className={`px-4 py-3 text-[13px] text-neutral-600 ${isRTL ? "text-right" : "text-left"}`}>{u.building || '—'}</td>
                      <td className={`px-4 py-3 text-[13px] text-neutral-600 text-center`}>{u.floor ?? 1}</td>
                      <td className={`px-4 py-3 whitespace-nowrap ${isRTL ? "text-right" : "text-left"}`}>
                        <span className="text-[13px] font-bold text-neutral-800 font-mono">{formatPrice(u.price)}</span>
                      </td>
                      <td className="px-4 py-3 text-[13px] text-neutral-600 text-center font-mono">{u.downPaymentPercent || 10}%</td>
                      <td className="px-4 py-3 text-[13px] text-neutral-600 text-center">{u.installmentYears || 0} {isRTL ? "سنوات" : "Years"}</td>
                      <td className={`px-4 py-3 ${isRTL ? "text-right" : "text-left"}`}>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${SC[u.status] || ""}`}>
                          {tStatus(u.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-center">
                          <button
                            onClick={() => openEdit(u)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-[#775a1a] transition-all cursor-pointer"
                            title={isRTL ? "تعديل" : "Edit"}
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                          </button>
                          <button
                            onClick={() => setDeleteId(u._id)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
                            title={isRTL ? "حذف" : "Delete"}
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
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

      {/* Create/Edit Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
          style={{ background: 'rgba(0,14,31,0.65)' }}
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-6 p-7">
            <div className="flex items-center justify-between mb-6 border-b border-neutral-100 pb-4">
              <h3 className="text-[20px] font-bold text-neutral-900">
                {editId ? 'تعديل بيانات الوحدة' : 'إضافة وحدة جديدة'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-neutral-200 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Section: الأساسيات */}
              <div>
                <p className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider mb-3">البيانات الأساسية</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className={lbl}>المشروع *</label>
                    <select name="project" value={form.project} onChange={fc} className={inp} required>
                      <option value="">— اختر المشروع —</option>
                      {projects.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>نوع الوحدة</label>
                    <select name="type" value={form.type} onChange={fc} className={inp}>
                      {TYPE_LIST.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>المساحة (م²) *</label>
                    <input
                      name="area"
                      type="number"
                      min="1"
                      value={form.area}
                      onChange={fc}
                      className={inp}
                      placeholder="150"
                      required
                    />
                  </div>
                  <div>
                    <label className={lbl}>المبنى / العمارة</label>
                    <input
                      name="building"
                      type="text"
                      value={form.building}
                      onChange={fc}
                      className={inp}
                      placeholder="عمارة B3 / فيلا 1"
                    />
                  </div>
                  <div>
                    <label className={lbl}>الدور / الطابق</label>
                    <input
                      name="floor"
                      type="number"
                      min="0"
                      value={form.floor}
                      onChange={fc}
                      className={inp}
                      placeholder="3"
                    />
                  </div>
                  <div>
                    <label className={lbl}>عدد الغرف</label>
                    <input
                      name="rooms"
                      type="number"
                      min="0"
                      value={form.rooms}
                      onChange={fc}
                      className={inp}
                      placeholder="3"
                    />
                  </div>
                  <div>
                    <label className={lbl}>عدد الحمامات</label>
                    <input
                      name="bathrooms"
                      type="number"
                      min="0"
                      value={form.bathrooms}
                      onChange={fc}
                      className={inp}
                    />
                  </div>
                  <div>
                    <label className={lbl}>موقف السيارات</label>
                    <input
                      name="parking"
                      type="number"
                      min="0"
                      value={form.parking}
                      onChange={fc}
                      className={inp}
                    />
                  </div>
                  <div>
                    <label className={lbl}>نوع التشطيب</label>
                    <select name="finishing" value={form.finishing} onChange={fc} className={inp}>
                      {FINISH_LIST.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>الحالة</label>
                    <select name="status" value={form.status} onChange={fc} className={inp}>
                      {STATUS_LIST.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>كود المرجع (اختياري)</label>
                    <input
                      name="ref"
                      type="text"
                      value={form.ref}
                      onChange={fc}
                      className={inp}
                      placeholder="UNIT-101"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload for Unit */}
              <div>
                <p className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider mb-2">صور الوحدة</p>
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileSelect} />
                <div className="flex flex-wrap gap-2">
                  {previews.map((src, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-neutral-200 group bg-neutral-100">
                      <img src={getImageUrl(src)} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <span className="material-symbols-outlined text-white text-[18px]">delete</span>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImg}
                    className="w-20 h-20 rounded-xl border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center gap-0.5 text-neutral-400 hover:border-[#775a1a] hover:text-[#775a1a] transition-all disabled:opacity-60 cursor-pointer"
                  >
                    {uploadingImg ? (
                      <span className="w-5 h-5 border-2 border-neutral-300 border-t-[#775a1a] rounded-full animate-spin" />
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[22px]">add_photo_alternate</span>
                        <span className="text-[10px] font-semibold">رفع صورة</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Section: شروط الدفع */}
              <div className="pt-3 border-t border-neutral-100">
                <p className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider mb-3">شروط ونظام الدفع</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className={lbl}>السعر الإجمالي (ج.م.) *</label>
                    <input
                      name="price"
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={fc}
                      className={inp}
                      placeholder="2500000"
                      required
                    />
                  </div>
                  <div>
                    <label className={lbl}>نسبة الدفعة المقدمة (%)</label>
                    <input
                      name="downPaymentPercent"
                      type="number"
                      min="0"
                      max="100"
                      value={form.downPaymentPercent}
                      onChange={fc}
                      className={inp}
                    />
                  </div>
                  <div>
                    <label className={lbl}>سنوات التقسيط</label>
                    <input
                      name="installmentYears"
                      type="number"
                      min="0"
                      max="30"
                      value={form.installmentYears}
                      onChange={fc}
                      className={inp}
                      placeholder="5"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className={lbl}>تاريخ التسليم</label>
                    <input
                      name="deliveryDate"
                      type="date"
                      value={form.deliveryDate}
                      onChange={fc}
                      className={inp}
                    />
                  </div>
                </div>

                {/* Live payment preview */}
                {form.price > 0 && (
                  <div className="mt-3 p-4 rounded-2xl grid grid-cols-3 gap-3" style={{ background: '#f0f7ff' }}>
                    <div className="text-center">
                      <p className="text-[11px] text-neutral-500 mb-1">الدفعة المقدمة</p>
                      <p className="text-[15px] font-bold text-neutral-900">{dpAmt.toLocaleString()}</p>
                      <p className="text-[10px] text-neutral-400">ج.م.</p>
                    </div>
                    <div className="text-center border-r border-l border-blue-200">
                      <p className="text-[11px] text-neutral-500 mb-1">القسط الشهري</p>
                      <p className="text-[15px] font-bold text-neutral-900">{monthlyAmt.toLocaleString()}</p>
                      <p className="text-[10px] text-neutral-400">ج.م./شهر</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] text-neutral-500 mb-1">مدة التقسيط</p>
                      <p className="text-[15px] font-bold text-neutral-900">{form.installmentYears || 0}</p>
                      <p className="text-[10px] text-neutral-400">سنوات</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className={lbl}>الوصف</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={fc}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-[13px] outline-none bg-neutral-50 focus:border-[#775a1a] transition-all resize-none"
                  placeholder="وصف مميزات الوحدة..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 h-11 rounded-xl bg-neutral-100 text-neutral-600 font-semibold hover:bg-neutral-200 transition-all cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImg}
                  className="flex-1 h-11 rounded-xl text-white font-bold disabled:opacity-60 flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md cursor-pointer"
                  style={{ background: '#000e1f' }}
                >
                  {saving ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">save</span>
                      {editId ? 'حفظ التعديلات' : 'إنشاء الوحدة'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,14,31,0.65)' }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xs w-full text-center">
            <span className="material-symbols-outlined text-[40px] text-red-500 block mx-auto mb-3">warning</span>
            <p className="font-bold text-neutral-800 mb-1">تأكيد حذف الوحدة</p>
            <p className="text-[13px] text-neutral-500 mb-5">هل أنت متأكد من رغبتك في حذف هذه الوحدة؟</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 h-10 rounded-xl bg-neutral-100 text-neutral-600 font-semibold hover:bg-neutral-200 transition-all cursor-pointer"
              >
                إلغاء
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 h-10 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all cursor-pointer"
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
