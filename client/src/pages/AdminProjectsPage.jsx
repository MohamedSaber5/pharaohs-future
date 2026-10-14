import { useState, useEffect, useCallback, useRef } from 'react';
import projectService from '@services/project.service.js';
import toast from 'react-hot-toast';

const STATUS_LIST = ["قيد البيع","تحت الإنشاء","مكتمل"];
const TYPE_LIST   = ["سكني فاخر","تجاري وسكني","فيلات فاخرة","شاليهات ساحلية","سكني متوسط","تجاري","إداري"];
const EMPTY_FORM  = { name:"",nameEn:"",location:"",type:"سكني فاخر",description:"",totalArea:"",totalUnits:"",startPrice:"",delivery:"",status:"قيد البيع",progress:0,license:"" };

const Badge = ({status}) => {
  const cls = status==="قيد البيع"?"bg-amber-100 text-amber-800":status==="مكتمل"?"bg-green-100 text-green-800":"bg-blue-100 text-blue-800";
  return <span className={`px-2.5 py-1 rounded-full text-[12px] font-bold whitespace-nowrap ${cls}`}>{status}</span>;
};

export default function AdminProjectsPage() {
  const [projects,     setProjects]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [saving,       setSaving]       = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [error,        setError]        = useState('');
  const [search,       setSearch]       = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');
  const [showModal,    setShowModal]    = useState(false);
  const [editId,       setEditId]       = useState(null);
  const [form,         setForm]         = useState(EMPTY_FORM);
  const [images,       setImages]       = useState([]); // uploaded URLs
  const [previews,     setPreviews]     = useState([]); // local preview URLs
  const [deleteId,     setDeleteId]     = useState(null);
  const fileInputRef = useRef(null);

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

  const openCreate = () => { setForm(EMPTY_FORM); setEditId(null); setImages([]); setPreviews([]); setShowModal(true); };
  const openEdit   = (p) => {
    setForm({ name:p.name||"",nameEn:p.nameEn||"",location:p.location||"",type:p.type||"سكني فاخر",description:p.description||"",totalArea:p.totalArea||"",totalUnits:p.totalUnits||"",startPrice:p.startPrice||"",delivery:p.delivery||"",status:p.status||"قيد البيع",progress:p.progress||0,license:p.license||"" });
    setImages(p.images || []); setPreviews(p.images || []);
    setEditId(p._id); setShowModal(true);
  };

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    // Local previews
    const newPreviews = files.map(f => URL.createObjectURL(f));
    setPreviews(prev => [...prev, ...newPreviews]);
    // Upload to server
    setUploadingImg(true);
    try {
      const fd = new FormData();
      files.forEach(f => fd.append('images', f));
      const res = await projectService.uploadImages(fd);
      const urls = res?.data?.urls ?? res?.urls ?? [];
      setImages(prev => [...prev, ...urls]);
      toast.success(`تم رفع ${urls.length} صورة ✅`);
    } catch { toast.error('فشل رفع الصور'); }
    finally { setUploadingImg(false); }
  };

  const removeImage = (idx) => {
    setImages(prev => prev.filter((_,i) => i !== idx));
    setPreviews(prev => prev.filter((_,i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.type) { toast.error('يرجى تعبئة الحقول المطلوبة'); return; }
    setSaving(true);
    try {
      const payload = { ...form, totalArea:Number(form.totalArea)||0, totalUnits:Number(form.totalUnits)||0, startPrice:Number(form.startPrice)||0, progress:Number(form.progress)||0, images };
      if (editId) { await projectService.update(editId, payload); toast.success('تم تحديث المشروع ✅'); }
      else        { await projectService.create(payload);         toast.success('تم إنشاء المشروع ✅'); }
      setShowModal(false); setEditId(null); setImages([]); setPreviews([]); load();
    } catch (err) { toast.error(err?.message || 'حدث خطأ'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await projectService.delete(deleteId); toast.success('تم حذف المشروع'); setDeleteId(null); load(); }
    catch { toast.error('حدث خطأ'); }
  };

  const totals = { total:projects.length, units:projects.reduce((a,p)=>a+(p.totalUnits||0),0), available:projects.reduce((a,p)=>a+(p.availableCount||0),0), sold:projects.reduce((a,p)=>a+(p.soldCount||0),0) };

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-7" style={{ background:"#f8f9fa",minHeight:"100vh" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-neutral-900">إدارة المشروعات</h1>
          <p className="text-[13px] text-neutral-500 mt-0.5">{totals.total} مشروع مسجّل</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 h-10 px-5 rounded-xl text-[13px] font-bold text-white hover:opacity-90 transition-all shadow-md" style={{ background:"#000e1f" }}>
          <span className="material-symbols-outlined text-[18px]">add</span>مشروع جديد
        </button>
      </div>

      {error && <div className="p-4 rounded-xl flex items-center gap-3 text-[14px]" style={{ background:"#fef2f2",color:"#dc2626" }}><span className="material-symbols-outlined text-[20px]">error</span>{error}</div>}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {icon:"apartment",       label:"المشروعات",value:totals.total,    color:"#000e1f",bg:"rgba(0,14,31,0.08)"},
          {icon:"holiday_village", label:"الوحدات",  value:totals.units,    color:"#775a1a",bg:"rgba(119,90,26,0.1)"},
          {icon:"sell",            label:"مباعة",     value:totals.sold,     color:"#166534",bg:"#dcfce7"},
          {icon:"inventory",       label:"متاحة",     value:totals.available,color:"#1e40af",bg:"#dbeafe"},
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
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="بحث باسم المشروع أو الموقع..."
            className="w-full h-11 pr-10 pl-4 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] focus:bg-white transition-all" />
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[20px]">search</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {["الكل","قيد البيع","تحت الإنشاء","مكتمل"].map(s=>(
            <button key={s} onClick={()=>setStatusFilter(s)}
              className={`h-9 px-4 rounded-lg text-[13px] font-semibold transition-all ${statusFilter===s?"text-white":"text-neutral-500 bg-neutral-100 hover:bg-neutral-200"}`}
              style={statusFilter===s?{background:"#000e1f"}:{}}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 flex flex-col gap-3">{[1,2,3,4].map(i=><div key={i} className="h-14 bg-neutral-100 rounded-xl animate-pulse" />)}</div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-3xl bg-neutral-100 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[40px] text-neutral-400">apartment</span>
            </div>
            <h3 className="text-[18px] font-bold text-neutral-700 mb-2">لا توجد مشروعات بعد</h3>
            <p className="text-[14px] text-neutral-400 mb-6">أضف مشروعك الأول وسيظهر للزوار فوراً</p>
            <button onClick={openCreate} className="inline-flex items-center gap-2 h-10 px-6 rounded-xl text-[13px] font-bold text-white hover:opacity-90 transition-all shadow-md" style={{ background:"#000e1f" }}>
              <span className="material-symbols-outlined text-[18px]">add</span>إضافة مشروع
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background:"#f8f9fa",borderBottom:"1px solid #f1f3f4" }}>
                  {["الصورة","المشروع","النوع","الموقع","الوحدات","السعر","التسليم","التقدم","الحالة","إجراءات"].map(h=>(
                    <th key={h} className="px-4 py-3.5 text-right text-[12px] font-semibold text-neutral-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map(p=>(
                  <tr key={p._id} className="border-t border-neutral-100 hover:bg-neutral-50/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                        {p.images?.[0]
                          ? <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                          : <span className="flex items-center justify-center h-full material-symbols-outlined text-[24px] text-neutral-300">apartment</span>
                        }
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-[14px] font-bold text-neutral-800 whitespace-nowrap">{p.name}</p>
                      {p.nameEn && <p className="text-[11px] text-neutral-400">{p.nameEn}</p>}
                    </td>
                    <td className="px-4 py-4 text-[13px] text-neutral-600 whitespace-nowrap">{p.type}</td>
                    <td className="px-4 py-4 text-[13px] text-neutral-600 whitespace-nowrap max-w-[140px] truncate">{p.location}</td>
                    <td className="px-4 py-4 text-center text-[14px] font-bold text-neutral-800">{p.unitCount ?? p.totalUnits ?? 0}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {p.startPrice ? <><span className="text-[14px] font-bold text-neutral-800">{Number(p.startPrice).toLocaleString()}</span><span className="text-[11px] text-neutral-400 mr-1">ج.م</span></> : "—"}
                    </td>
                    <td className="px-4 py-4 text-[13px] text-neutral-600 whitespace-nowrap">{p.delivery||"—"}</td>
                    <td className="px-4 py-4 min-w-[100px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width:(p.progress||0)+"%",background:"#775a1a" }} />
                        </div>
                        <span className="text-[11px] font-bold text-neutral-500">{p.progress||0}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4"><Badge status={p.status} /></td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={()=>openEdit(p)} className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-[#775a1a] transition-all">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={()=>setDeleteId(p._id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-all">
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

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:"rgba(0,14,31,0.6)" }} onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 sticky top-0 bg-white z-10">
              <h2 className="text-[18px] font-bold text-neutral-900">{editId?"تعديل المشروع":"مشروع جديد"}</h2>
              <button onClick={()=>setShowModal(false)} className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-400 hover:bg-neutral-100 transition-all">
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">

              {/* Image Upload */}
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-neutral-700">صور المشروع</label>
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileSelect} />
                <div className="flex flex-wrap gap-3">
                  {previews.map((src,i)=>(
                    <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-neutral-200 group">
                      <img src={src} className="w-full h-full object-cover" />
                      <button type="button" onClick={()=>removeImage(i)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="material-symbols-outlined text-white text-[22px]">delete</span>
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={()=>fileInputRef.current?.click()} disabled={uploadingImg}
                    className="w-24 h-24 rounded-xl border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center gap-1 text-neutral-400 hover:border-[#775a1a] hover:text-[#775a1a] transition-all disabled:opacity-60">
                    {uploadingImg
                      ? <span className="w-6 h-6 border-2 border-neutral-300 border-t-[#775a1a] rounded-full animate-spin" />
                      : <><span className="material-symbols-outlined text-[28px]">add_photo_alternate</span><span className="text-[11px] font-semibold">رفع صورة</span></>
                    }
                  </button>
                </div>
                <p className="text-[11px] text-neutral-400">JPG، PNG، WebP — حجم أقصى 5MB لكل صورة — حتى 10 صور</p>
              </div>

              {/* Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {label:"اسم المشروع *",        name:"name",       req:true},
                  {label:"الاسم بالإنجليزية",     name:"nameEn"},
                  {label:"نوع المشروع *",          name:"type",      options:TYPE_LIST,   req:true},
                  {label:"الحالة",                name:"status",     options:STATUS_LIST},
                  {label:"المساحة الكلية (م²)",   name:"totalArea",  type:"number"},
                  {label:"إجمالي الوحدات",         name:"totalUnits", type:"number"},
                  {label:"سعر البداية (ج.م)",      name:"startPrice", type:"number"},
                  {label:"موعد التسليم",            name:"delivery",   hint:"مثال: ديسمبر 2026"},
                  {label:"الترخيص",                name:"license"},
                ].map(f=>(
                  <div key={f.name} className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-neutral-700">{f.label}</label>
                    {f.options ? (
                      <select name={f.name} value={form[f.name]} onChange={handleChange}
                        className="h-11 px-3 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] cursor-pointer">
                        {f.options.map(o=><option key={o}>{o}</option>)}
                      </select>
                    ) : (
                      <input type={f.type||"text"} name={f.name} value={form[f.name]} onChange={handleChange} required={f.req}
                        className="h-11 px-3 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] focus:bg-white transition-all" />
                    )}
                    {f.hint && <p className="text-[11px] text-neutral-400">{f.hint}</p>}
                  </div>
                ))}
                {/* Location full width */}
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-neutral-700">الموقع *</label>
                  <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="مثال: العاصمة الإدارية الجديدة — CBD"
                    className="h-11 px-3 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] focus:bg-white transition-all" />
                </div>
                {/* Progress */}
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-neutral-700">نسبة الإنجاز ({form.progress}%)</label>
                  <input type="range" name="progress" min="0" max="100" value={form.progress} onChange={handleChange}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer" style={{ accentColor:"#775a1a" }} />
                </div>
                {/* Description */}
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-neutral-700">الوصف</label>
                  <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                    className="px-3 py-2.5 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 resize-none focus:border-[#775a1a] focus:bg-white transition-all" />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
                <button type="button" onClick={()=>setShowModal(false)} className="h-10 px-5 rounded-xl bg-neutral-100 text-neutral-600 text-[13px] font-semibold hover:bg-neutral-200 transition-all">إلغاء</button>
                <button type="submit" disabled={saving||uploadingImg}
                  className="h-10 px-6 rounded-xl text-[13px] font-bold text-white disabled:opacity-60 flex items-center gap-2 hover:opacity-90 transition-all" style={{ background:"#000e1f" }}>
                  {saving?<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />حفظ...</>:<><span className="material-symbols-outlined text-[18px]">save</span>{editId?"تحديث المشروع":"حفظ المشروع"}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:"rgba(0,14,31,0.5)" }}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[28px] text-red-600">delete_forever</span>
            </div>
            <h3 className="text-[18px] font-bold text-neutral-900 mb-2">تأكيد الحذف</h3>
            <p className="text-[14px] text-neutral-500 mb-6">سيتم إخفاء هذا المشروع من الموقع. هل تريد المتابعة؟</p>
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