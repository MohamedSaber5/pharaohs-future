import { useState, useEffect, useCallback } from 'react';
import unitService    from '@services/unit.service.js';
import projectService from '@services/project.service.js';
import toast from 'react-hot-toast';

const STATUS_LIST   = ["متاح","محجوز","مباع"];
const TYPE_LIST     = ["شقة","بنتهاوس","فيلا","تاون هاوس","دوبلكس","مكتب","محل تجاري","شاليه"];
const FINISH_LIST   = ["سوبر لوكس","تشطيب فندقي","نصف تشطيب","Core & Shell","بدون تشطيب"];
const EMPTY_FORM    = { project:"", type:"شقة", area:"", floor:"", rooms:"", bathrooms:1, parking:0, price:"", finishing:"سوبر لوكس", status:"متاح", description:"", ref:"" };

const STATUS_COLORS = { "متاح":"bg-green-100 text-green-800", "محجوز":"bg-amber-100 text-amber-800", "مباع":"bg-red-100 text-red-800" };

export default function AdminUnitsPage() {
  const [units,    setUnits]    = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState('');
  const [projFilter, setProjFilter] = useState('الكل');
  const [statFilter, setStatFilter] = useState('الكل');
  const [showModal, setShowModal] = useState(false);
  const [editId,    setEditId]   = useState(null);
  const [form,      setForm]     = useState(EMPTY_FORM);
  const [deleteId,  setDeleteId] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const params = {};
      if (projFilter !== 'الكل') params.project = projFilter;
      if (statFilter !== 'الكل') params.status  = statFilter;
      const [u, p] = await Promise.all([
        unitService.getAll(params),
        projectService.getAll(),
      ]);
      setUnits(u?.data ?? u ?? []);
      setProjects(p?.data ?? p ?? []);
    } catch { setError('تعذّر تحميل البيانات'); }
    finally   { setLoading(false); }
  }, [projFilter, statFilter]);

  useEffect(() => { loadData(); }, [loadData]);

  const openCreate = () => {
    setForm({ ...EMPTY_FORM, project: projects[0]?._id || "" });
    setEditId(null); setShowModal(true);
  };
  const openEdit = (u) => {
    setForm({
      project: u.project?._id || u.project || "",
      type: u.type||"شقة", area: u.area||"", floor: u.floor||"",
      rooms: u.rooms||"", bathrooms: u.bathrooms||1, parking: u.parking||0,
      price: u.price||"", finishing: u.finishing||"سوبر لوكس",
      status: u.status||"متاح", description: u.description||"", ref: u.ref||"",
    });
    setEditId(u._id); setShowModal(true);
  };
  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.project || !form.area || !form.price) { toast.error('يرجى تعبئة الحقول المطلوبة'); return; }
    setSaving(true);
    try {
      const payload = { ...form, area:Number(form.area), floor:Number(form.floor||1), rooms:Number(form.rooms||0), bathrooms:Number(form.bathrooms), parking:Number(form.parking||0), price:Number(form.price) };
      if (editId) { await unitService.update(editId, payload); toast.success('تم تحديث الوحدة ✅'); }
      else        { await unitService.create(payload);         toast.success('تم إنشاء الوحدة ✅'); }
      setShowModal(false); setEditId(null); loadData();
    } catch (err) { toast.error(err?.message || 'حدث خطأ'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await unitService.delete(deleteId); toast.success('تم حذف الوحدة'); setDeleteId(null); loadData(); }
    catch { toast.error('حدث خطأ أثناء الحذف'); }
  };

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-7" style={{ background:"#f8f9fa", minHeight:"100vh" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-neutral-900">إدارة الوحدات</h1>
          <p className="text-[13px] text-neutral-500 mt-0.5">{units.length} وحدة مسجّلة</p>
        </div>
        <button onClick={openCreate}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-xl text-[13px] font-bold text-white hover:opacity-90 transition-all shadow-md"
          style={{ background:"#000e1f" }}>
          <span className="material-symbols-outlined text-[18px]">add</span>وحدة جديدة
        </button>
      </div>

      {error && <div className="p-4 rounded-xl flex items-center gap-3 text-[14px]" style={{ background:"#fef2f2",color:"#dc2626" }}><span className="material-symbols-outlined text-[20px]">error</span>{error}</div>}

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <select value={projFilter} onChange={e=>setProjFilter(e.target.value)}
          className="flex-1 h-11 px-3 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] cursor-pointer">
          <option value="الكل">كل المشروعات</option>
          {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        <div className="flex items-center gap-2">
          {["الكل","متاح","محجوز","مباع"].map(s=>(
            <button key={s} onClick={()=>setStatFilter(s)}
              className={`h-9 px-4 rounded-lg text-[13px] font-semibold transition-all ${statFilter===s?"text-white":"text-neutral-500 bg-neutral-100 hover:bg-neutral-200"}`}
              style={statFilter===s?{ background:"#000e1f" }:{}}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 flex flex-col gap-3">{[1,2,3,4].map(i=><div key={i} className="h-14 bg-neutral-100 rounded-xl animate-pulse" />)}</div>
        ) : units.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-3xl bg-neutral-100 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[40px] text-neutral-400">holiday_village</span>
            </div>
            <h3 className="text-[18px] font-bold text-neutral-700 mb-2">لا توجد وحدات بعد</h3>
            <p className="text-[14px] text-neutral-400 mb-6">ابدأ بإضافة وحدتك الأولى من زر "وحدة جديدة"</p>
            <button onClick={openCreate} className="inline-flex items-center gap-2 h-10 px-6 rounded-xl text-[13px] font-bold text-white hover:opacity-90 transition-all shadow-md" style={{ background:"#000e1f" }}>
              <span className="material-symbols-outlined text-[18px]">add</span>إضافة وحدة
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background:"#f8f9fa",borderBottom:"1px solid #f1f3f4" }}>
                  {["المشروع","النوع","المساحة","الدور","الغرف","التشطيب","السعر","الحالة","إجراءات"].map(h=>(
                    <th key={h} className="px-4 py-3.5 text-right text-[12px] font-semibold text-neutral-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {units.map(u=>(
                  <tr key={u._id} className="border-t border-neutral-100 hover:bg-neutral-50/60 transition-colors">
                    <td className="px-4 py-3.5 text-[13px] font-semibold text-neutral-800 whitespace-nowrap">{u.project?.name || "—"}</td>
                    <td className="px-4 py-3.5 text-[13px] text-neutral-600 whitespace-nowrap">{u.type}</td>
                    <td className="px-4 py-3.5 text-[14px] font-bold text-neutral-800 whitespace-nowrap">{u.area} م²</td>
                    <td className="px-4 py-3.5 text-[13px] text-neutral-600 text-center">{u.floor}</td>
                    <td className="px-4 py-3.5 text-[13px] text-neutral-600 text-center">{u.rooms || "—"}</td>
                    <td className="px-4 py-3.5 text-[13px] text-neutral-600 whitespace-nowrap">{u.finishing}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="text-[14px] font-bold text-neutral-800">{Number(u.price).toLocaleString()}</span>
                      <span className="text-[11px] text-neutral-400 mr-1">ج.م</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[12px] font-bold whitespace-nowrap ${STATUS_COLORS[u.status]||""}`}>{u.status}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button onClick={()=>openEdit(u)} className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-[#775a1a] transition-all">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button onClick={()=>setDeleteId(u._id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-all">
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:"rgba(0,14,31,0.5)" }} onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
              <h2 className="text-[18px] font-bold text-neutral-900">{editId?"تعديل الوحدة":"إضافة وحدة جديدة"}</h2>
              <button onClick={()=>setShowModal(false)} className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-400 hover:bg-neutral-100 transition-all">
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-neutral-700">المشروع <span className="text-red-500">*</span></label>
                <select name="project" value={form.project} onChange={handleChange} required
                  className="h-11 px-3 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] cursor-pointer">
                  <option value="">اختر المشروع</option>
                  {projects.map(p=><option key={p._id} value={p._id}>{p.name}</option>)}
                </select>
              </div>
              {[
                {label:"نوع الوحدة",    name:"type",      options:TYPE_LIST},
                {label:"التشطيب",       name:"finishing", options:FINISH_LIST},
                {label:"الحالة",        name:"status",    options:STATUS_LIST},
                {label:"المساحة (م²)",  name:"area",   type:"number", req:true},
                {label:"الدور",         name:"floor",  type:"number"},
                {label:"عدد الغرف",     name:"rooms",  type:"number"},
                {label:"الحمامات",      name:"bathrooms", type:"number"},
                {label:"مواقف السيارات",name:"parking",   type:"number"},
                {label:"السعر (ج.م)",   name:"price",  type:"number", req:true},
                {label:"كود الوحدة",    name:"ref"},
              ].map(f=>(
                <div key={f.name} className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-neutral-700">{f.label}{f.req&&<span className="text-red-500 mr-1">*</span>}</label>
                  {f.options ? (
                    <select name={f.name} value={form[f.name]} onChange={handleChange}
                      className="h-11 px-3 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] cursor-pointer">
                      {f.options.map(o=><option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={f.type||"text"} name={f.name} value={form[f.name]} onChange={handleChange} required={f.req}
                      className="h-11 px-3 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] transition-all focus:bg-white" />
                  )}
                </div>
              ))}
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-neutral-700">الوصف</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                  className="px-3 py-2.5 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 resize-none focus:border-[#775a1a] transition-all focus:bg-white" />
              </div>
              <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
                <button type="button" onClick={()=>setShowModal(false)} className="h-10 px-5 rounded-xl bg-neutral-100 text-neutral-600 text-[13px] font-semibold hover:bg-neutral-200 transition-all">إلغاء</button>
                <button type="submit" disabled={saving} className="h-10 px-6 rounded-xl text-[13px] font-bold text-white disabled:opacity-60 flex items-center gap-2 hover:opacity-90 transition-all" style={{ background:"#000e1f" }}>
                  {saving?<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />حفظ...</>:<><span className="material-symbols-outlined text-[18px]">save</span>{editId?"تحديث":"حفظ الوحدة"}</>}
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
            <p className="text-[14px] text-neutral-500 mb-6">هل أنت متأكد من حذف هذه الوحدة؟</p>
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