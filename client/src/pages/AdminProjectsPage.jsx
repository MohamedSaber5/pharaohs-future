import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import projectService from '@services/project.service.js';
import toast from 'react-hot-toast';

const STATUS_LIST = ["قيد البيع","تحت الإنشاء","مكتمل"];
const TYPE_LIST   = ["سكني فاخر","تجاري وسكني","فيلات فاخرة","شاليهات ساحلية","سكني متوسط","تجاري"];

const EMPTY_FORM = {
  name:"", nameEn:"", location:"", type:"سكني فاخر",
  description:"", totalArea:"", totalUnits:"", startPrice:"",
  delivery:"", status:"قيد البيع", progress:0, license:"",
};

function Badge({ status }) {
  const cls =
    status==="قيد البيع"   ?"bg-amber-100 text-amber-800":
    status==="مكتمل"        ?"bg-green-100 text-green-800":
                             "bg-blue-100 text-blue-800";
  return <span className={`px-2.5 py-1 rounded-full text-[12px] font-bold whitespace-nowrap ${cls}`}>{status}</span>;
}

function InputField({ label, name, value, onChange, type="text", required, options, textarea, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-neutral-700">{label}{required&&<span className="text-red-500 mr-1">*</span>}</label>
      {textarea ? (
        <textarea name={name} value={value} onChange={onChange} rows={3}
          className="px-3 py-2.5 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 resize-none transition-all focus:border-[#775a1a] focus:bg-white" />
      ) : options ? (
        <select name={name} value={value} onChange={onChange}
          className="h-11 px-3 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 appearance-none transition-all focus:border-[#775a1a] focus:bg-white cursor-pointer">
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} required={required}
          className="h-11 px-3 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 transition-all focus:border-[#775a1a] focus:bg-white" />
      )}
      {hint && <p className="text-[11px] text-neutral-400">{hint}</p>}
    </div>
  );
}

export default function AdminProjectsPage() {
  const [projects,     setProjects]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [saving,       setSaving]       = useState(false);
  const [error,        setError]        = useState('');
  const [search,       setSearch]       = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [showModal,    setShowModal]    = useState(false);
  const [editId,       setEditId]       = useState(null);
  const [form,         setForm]         = useState(EMPTY_FORM);
  const [deleteId,     setDeleteId]     = useState(null);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const params = {};
      if (statusFilter !== 'الكل') params.status = statusFilter;
      if (search) params.search = search;
      const res = await projectService.getAll(params);
      setProjects(res?.data ?? res ?? []);
    } catch { setError('تعذّر تحميل المشروعات'); }
    finally  { setLoading(false); }
  }, [statusFilter, search]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setForm(EMPTY_FORM); setEditId(null); setShowModal(true); };
  const openEdit   = (p)  => {
    setForm({
      name:p.name||"", nameEn:p.nameEn||"", location:p.location||"",
      type:p.type||"سكني فاخر", description:p.description||"",
      totalArea:p.totalArea||"", totalUnits:p.totalUnits||"",
      startPrice:p.startPrice||"", delivery:p.delivery||"",
      status:p.status||"قيد البيع", progress:p.progress||0, license:p.license||"",
    });
    setEditId(p._id); setShowModal(true);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.type) { toast.error('يرجى تعبئة الحقول المطلوبة'); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        totalArea:  Number(form.totalArea)  || 0,
        totalUnits: Number(form.totalUnits) || 0,
        startPrice: Number(form.startPrice) || 0,
        progress:   Number(form.progress)   || 0,
      };
      if (editId) {
        await projectService.update(editId, payload);
        toast.success('تم تحديث المشروع بنجاح ✅');
      } else {
        await projectService.create(payload);
        toast.success('تم إنشاء المشروع بنجاح ✅');
      }
      setShowModal(false); setEditId(null); load();
    } catch (err) { toast.error(err?.message || 'حدث خطأ أثناء الحفظ'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await projectService.delete(deleteId);
      toast.success('تم حذف المشروع');
      setDeleteId(null); load();
    } catch { toast.error('حدث خطأ أثناء الحذف'); }
  };

  const totals = {
    total:     projects.length,
    units:     projects.reduce((a,p) => a+(p.totalUnits||0), 0),
    available: projects.reduce((a,p) => a+(p.availableCount||0), 0),
    sold:      projects.reduce((a,p) => a+(p.soldCount||0), 0),
  };

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-7" style={{ background:"#f8f9fa", minHeight:"100vh" }}>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-neutral-900">إدارة المشروعات</h1>
          <p className="text-[13px] text-neutral-500 mt-0.5">{totals.total} مشروع مسجّل في قاعدة البيانات</p>
        </div>
        <button onClick={openCreate}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-xl text-[13px] font-bold text-white hover:opacity-90 transition-all shadow-md"
          style={{ background:"#000e1f" }}>
          <span className="material-symbols-outlined text-[18px]">add</span>مشروع جديد
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl flex items-center gap-3 text-[14px]" style={{ background:"#fef2f2", color:"#dc2626" }}>
          <span className="material-symbols-outlined text-[20px]">error</span>{error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {icon:"apartment",       label:"المشروعات",  value:totals.total,     color:"#000e1f", bg:"rgba(0,14,31,0.08)"},
          {icon:"holiday_village", label:"الوحدات",    value:totals.units,     color:"#775a1a", bg:"rgba(119,90,26,0.1)"},
          {icon:"sell",            label:"مباعة",       value:totals.sold,      color:"#166534", bg:"#dcfce7"},
          {icon:"inventory",       label:"متاحة",       value:totals.available, color:"#1e40af", bg:"#dbeafe"},
        ].map(s=>(
          <div key={s.label} className="bg-white rounded-2xl border border-neutral-100 p-4 shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:s.bg }}>
              <span className="material-symbols-outlined text-[22px]" style={{ color:s.color }}>{s.icon}</span>
            </div>
            <div>
              <p className="text-[24px] font-bold leading-none" style={{ color:s.color }}>{s.value}</p>
              <p className="text-[12px] text-neutral-500 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="relative flex-1">
          <input value={search} onChange={e=>{setSearch(e.target.value)}} placeholder="بحث باسم المشروع أو الموقع..."
            className="w-full h-11 pr-10 pl-4 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] focus:bg-white transition-all" />
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[20px]">search</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {["الكل","قيد البيع","تحت الإنشاء","مكتمل"].map(s=>(
            <button key={s} onClick={()=>setStatusFilter(s)}
              className={`h-9 px-4 rounded-lg text-[13px] font-semibold transition-all ${statusFilter===s?"text-white":"text-neutral-500 bg-neutral-100 hover:bg-neutral-200"}`}
              style={statusFilter===s?{ background:"#000e1f" }:{}}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 flex flex-col gap-3">
            {[1,2,3,4].map(i=><div key={i} className="h-14 bg-neutral-100 rounded-xl animate-pulse" />)}
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-3xl bg-neutral-100 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[40px] text-neutral-400">apartment</span>
            </div>
            <h3 className="text-[18px] font-bold text-neutral-700 mb-2">لا توجد مشروعات بعد</h3>
            <p className="text-[14px] text-neutral-400 mb-6">ابدأ بإضافة مشروعك الأول من زر "مشروع جديد"</p>
            <button onClick={openCreate}
              className="inline-flex items-center gap-2 h-10 px-6 rounded-xl text-[13px] font-bold text-white hover:opacity-90 transition-all shadow-md"
              style={{ background:"#000e1f" }}>
              <span className="material-symbols-outlined text-[18px]">add</span>إضافة مشروع
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background:"#f8f9fa", borderBottom:"1px solid #f1f3f4" }}>
                  {["المشروع","النوع","الموقع","الوحدات","السعر","التسليم","التقدم","الحالة","إجراءات"].map(h=>(
                    <th key={h} className="px-4 py-3.5 text-right text-[12px] font-semibold text-neutral-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map(p=>(
                  <tr key={p._id} className="border-t border-neutral-100 hover:bg-neutral-50/60 transition-colors">
                    <td className="px-4 py-4">
                      <p className="text-[14px] font-bold text-neutral-800 whitespace-nowrap">{p.name}</p>
                      {p.nameEn && <p className="text-[11px] text-neutral-400">{p.nameEn}</p>}
                    </td>
                    <td className="px-4 py-4 text-[13px] text-neutral-600 whitespace-nowrap">{p.type}</td>
                    <td className="px-4 py-4 text-[13px] text-neutral-600 whitespace-nowrap max-w-[160px] truncate">{p.location}</td>
                    <td className="px-4 py-4 text-center text-[14px] font-bold text-neutral-800">{p.unitCount ?? p.totalUnits ?? 0}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-[14px] font-bold text-neutral-800">{p.startPrice ? Number(p.startPrice).toLocaleString() : "—"}</span>
                      {p.startPrice > 0 && <span className="text-[11px] text-neutral-400 mr-1">ج.م</span>}
                    </td>
                    <td className="px-4 py-4 text-[13px] text-neutral-600 whitespace-nowrap">{p.delivery || "—"}</td>
                    <td className="px-4 py-4 min-w-[110px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width:(p.progress||0)+"%", background:"#775a1a" }} />
                        </div>
                        <span className="text-[11px] font-bold text-neutral-500">{p.progress||0}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4"><Badge status={p.status} /></td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={()=>openEdit(p)} className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-[#775a1a] transition-all" title="تعديل">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={()=>setDeleteId(p._id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-all" title="حذف">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Add/Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:"rgba(0,14,31,0.5)" }}
          onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
              <h2 className="text-[18px] font-bold text-neutral-900">{editId?"تعديل المشروع":"إضافة مشروع جديد"}</h2>
              <button onClick={()=>setShowModal(false)} className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-400 hover:bg-neutral-100 transition-all">
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="اسم المشروع"         name="name"       value={form.name}       onChange={handleChange} required />
              <InputField label="الاسم بالإنجليزية"   name="nameEn"     value={form.nameEn}     onChange={handleChange} />
              <div className="sm:col-span-2">
                <InputField label="الموقع"             name="location"   value={form.location}   onChange={handleChange} required hint="مثال: العاصمة الإدارية الجديدة — CBD" />
              </div>
              <InputField label="نوع المشروع"          name="type"       value={form.type}       onChange={handleChange} options={TYPE_LIST} />
              <InputField label="الحالة"               name="status"     value={form.status}     onChange={handleChange} options={STATUS_LIST} />
              <InputField label="المساحة الكلية (م²)"  name="totalArea"  value={form.totalArea}  onChange={handleChange} type="number" />
              <InputField label="إجمالي الوحدات"       name="totalUnits" value={form.totalUnits} onChange={handleChange} type="number" />
              <InputField label="سعر البداية (ج.م)"    name="startPrice" value={form.startPrice} onChange={handleChange} type="number" />
              <InputField label="موعد التسليم"          name="delivery"   value={form.delivery}   onChange={handleChange} hint="مثال: ديسمبر 2026" />
              <InputField label="الترخيص"               name="license"    value={form.license}    onChange={handleChange} />
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-neutral-700">نسبة الإنجاز ({form.progress}%)</label>
                <input type="range" name="progress" min="0" max="100" value={form.progress} onChange={handleChange}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer" style={{ accentColor:"#775a1a" }} />
              </div>
              <div className="sm:col-span-2">
                <InputField label="الوصف"              name="description" value={form.description} onChange={handleChange} textarea />
              </div>
              <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
                <button type="button" onClick={()=>setShowModal(false)}
                  className="h-10 px-5 rounded-xl bg-neutral-100 text-neutral-600 text-[13px] font-semibold hover:bg-neutral-200 transition-all">
                  إلغاء
                </button>
                <button type="submit" disabled={saving}
                  className="h-10 px-6 rounded-xl text-[13px] font-bold text-white disabled:opacity-60 flex items-center gap-2 hover:opacity-90 transition-all"
                  style={{ background:"#000e1f" }}>
                  {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />حفظ...</> : <><span className="material-symbols-outlined text-[18px]">save</span>{editId?"تحديث":"حفظ المشروع"}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:"rgba(0,14,31,0.5)" }}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[28px] text-red-600">delete_forever</span>
            </div>
            <h3 className="text-[18px] font-bold text-neutral-900 mb-2">تأكيد الحذف</h3>
            <p className="text-[14px] text-neutral-500 mb-6">سيتم إلغاء تفعيل هذا المشروع ولن يظهر للمستخدمين. هل تريد المتابعة؟</p>
            <div className="flex items-center gap-3">
              <button onClick={()=>setDeleteId(null)} className="flex-1 h-10 rounded-xl bg-neutral-100 text-neutral-600 text-[13px] font-semibold hover:bg-neutral-200 transition-all">إلغاء</button>
              <button onClick={handleDelete} className="flex-1 h-10 rounded-xl bg-red-600 text-white text-[13px] font-bold hover:bg-red-700 transition-all">حذف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}