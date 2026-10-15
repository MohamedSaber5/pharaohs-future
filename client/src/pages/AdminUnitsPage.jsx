import { useState, useEffect, useCallback } from 'react';
import unitService    from '@services/unit.service.js';
import projectService from '@services/project.service.js';
import toast from 'react-hot-toast';

const STATUS_LIST = ["متاح","محجوز","مباع"];
const TYPE_LIST   = ["شقة","بنتهاوس","فيلا","تاون هاوس","دوبلكس","محل تجاري","محل إداري","جراند"];
const FINISH_LIST = ["كامل التشطيب","تشطيب فندقي","نصف تشطيب","بدون تشطيب","Core & Shell"];

const EMPTY = {
  project:"", type:"شقة", area:"", floor:"", building:"",
  rooms:"", bathrooms:1, parking:0,
  price:"", downPaymentPercent:10, installmentYears:5, deliveryDate:"",
  finishing:"كامل التشطيب", status:"متاح", description:"", ref:""
};

const SC = {
  "متاح":"bg-green-100 text-green-800",
  "محجوز":"bg-amber-100 text-amber-800",
  "مباع":"bg-red-100 text-red-800"
};

function fmtPrice(n) { return n ? Number(n).toLocaleString('ar-EG') + ' ج.م' : '—'; }

export default function AdminUnitsPage() {
  const [units,      setUnits]      = useState([]);
  const [projects,   setProjects]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [projFilter, setProjFilter] = useState('الكل');
  const [statFilter, setStatFilter] = useState('الكل');
  const [showModal,  setShowModal]  = useState(false);
  const [editId,     setEditId]     = useState(null);
  const [form,       setForm]       = useState(EMPTY);
  const [deleteId,   setDeleteId]   = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (projFilter !== 'الكل') params.project = projFilter;
      if (statFilter !== 'الكل') params.status  = statFilter;
      const [u, p] = await Promise.all([unitService.getAll(params), projectService.getAll()]);
      setUnits(u?.data ?? u ?? []);
      setProjects(p?.data ?? p ?? []);
    } catch { toast.error('تعذّر تحميل البيانات'); }
    finally { setLoading(false); }
  }, [projFilter, statFilter]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setForm({ ...EMPTY, project: projects[0]?._id || "" });
    setEditId(null); setShowModal(true);
  };
  const openEdit = (u) => {
    setForm({
      project: u.project?._id || u.project || "",
      type: u.type || "شقة", area: u.area || "", floor: u.floor || "",
      building: u.building || "",
      rooms: u.rooms || "", bathrooms: u.bathrooms || 1, parking: u.parking || 0,
      price: u.price || "", downPaymentPercent: u.downPaymentPercent ?? 10,
      installmentYears: u.installmentYears ?? 5,
      deliveryDate: u.deliveryDate ? u.deliveryDate.split('T')[0] : "",
      finishing: u.finishing || "كامل التشطيب",
      status: u.status || "متاح", description: u.description || "", ref: u.ref || "",
    });
    setEditId(u._id); setShowModal(true);
  };
  const fc = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.project || !form.area || !form.price) { toast.error('يرجى تعبئة المشروع والمساحة والسعر'); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        area:               Number(form.area),
        floor:              Number(form.floor || 1),
        rooms:              Number(form.rooms || 0),
        bathrooms:          Number(form.bathrooms),
        parking:            Number(form.parking || 0),
        price:              Number(form.price),
        downPaymentPercent: Number(form.downPaymentPercent || 10),
        installmentYears:   Number(form.installmentYears || 0),
        deliveryDate:       form.deliveryDate || null,
      };
      if (editId) { await unitService.update(editId, payload); toast.success('تم تحديث الوحدة ✅'); }
      else        { await unitService.create(payload);         toast.success('تم إنشاء الوحدة ✅'); }
      setShowModal(false); setEditId(null); load();
    } catch (err) { toast.error(err?.response?.data?.message || err?.message || 'حدث خطأ'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await unitService.delete(deleteId); toast.success('تم حذف الوحدة'); setDeleteId(null); load(); }
    catch { toast.error('خطأ أثناء الحذف'); }
  };

  // Live payment preview
  const dpAmt = form.price ? Math.round(Number(form.price) * Number(form.downPaymentPercent || 0) / 100) : 0;
  const monthlyAmt = (form.price && Number(form.installmentYears) > 0)
    ? Math.round((Number(form.price) - dpAmt) / (Number(form.installmentYears) * 12))
    : 0;

  const inp = "w-full h-10 px-3 rounded-xl border border-neutral-200 text-[13px] outline-none bg-neutral-50 focus:border-[#775a1a] transition-all";
  const lbl = "text-[12px] font-semibold text-neutral-600 mb-1 block";

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-7" style={{background:"#f8f9fa",minHeight:"100vh"}} dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-neutral-900">إدارة الوحدات</h1>
          <p className="text-[13px] text-neutral-500 mt-0.5">{units.length} وحدة</p>
        </div>
        <button onClick={openCreate}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-xl font-bold text-white text-[13px] hover:opacity-90 transition-all shadow-md"
          style={{background:'#000e1f'}}>
          <span className="material-symbols-outlined text-[18px]">add</span>إضافة وحدة
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-4 flex items-center gap-3 flex-wrap shadow-sm">
        <select value={projFilter} onChange={e=>{setProjFilter(e.target.value);}} className="h-9 px-3 rounded-lg border border-neutral-200 text-[13px] outline-none">
          <option value="الكل">كل المشاريع</option>
          {projects.map(p=><option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        <select value={statFilter} onChange={e=>{setStatFilter(e.target.value);}} className="h-9 px-3 rounded-lg border border-neutral-200 text-[13px] outline-none">
          <option value="الكل">كل الحالات</option>
          {STATUS_LIST.map(s=><option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 flex flex-col gap-3">{[1,2,3].map(i=><div key={i} className="h-14 bg-neutral-100 rounded-xl animate-pulse"/>)}</div>
        ) : units.length === 0 ? (
          <div className="flex flex-col items-center py-20">
            <span className="material-symbols-outlined text-[56px] text-neutral-300 mb-4">home</span>
            <p className="text-neutral-500 text-[15px]">لا توجد وحدات</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{background:'#f8f9fa',borderBottom:'1px solid #f1f3f4'}}>
                  {["#","المشروع","النوع","المساحة","المبنى","الدور","السعر","د.م%","التقسيط","التسليم","الحالة",""].map(h=>(
                    <th key={h} className="px-4 py-3 text-right text-[11px] font-semibold text-neutral-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {units.map((u,i)=>(
                  <tr key={u._id} className="border-t border-neutral-100 hover:bg-neutral-50/60 transition-colors">
                    <td className="px-4 py-3 text-[12px] text-neutral-400 font-mono">{i+1}</td>
                    <td className="px-4 py-3 text-[13px] font-semibold text-neutral-800 whitespace-nowrap">{u.project?.name||'—'}</td>
                    <td className="px-4 py-3 text-[13px] text-neutral-700">{u.type}</td>
                    <td className="px-4 py-3 text-[13px] text-neutral-600 whitespace-nowrap">{u.area} م²</td>
                    <td className="px-4 py-3 text-[13px] text-neutral-600">{u.building||'—'}</td>
                    <td className="px-4 py-3 text-[13px] text-neutral-600 text-center">{u.floor}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-[13px] font-bold text-neutral-800">{Number(u.price).toLocaleString()}</span>
                      <span className="text-[10px] text-neutral-400 mr-1"> ج.م</span>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-neutral-600 text-center">{u.downPaymentPercent||10}%</td>
                    <td className="px-4 py-3 text-[13px] text-neutral-600 text-center">{u.installmentYears||0} سنة</td>
                    <td className="px-4 py-3 text-[13px] text-neutral-600 whitespace-nowrap">
                      {u.deliveryDate ? new Date(u.deliveryDate).toLocaleDateString('ar-EG') : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${SC[u.status]||""}`}>{u.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={()=>openEdit(u)} className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-[#775a1a] transition-all">
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                        <button onClick={()=>setDeleteId(u._id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-all">
                          <span className="material-symbols-outlined text-[16px]">delete</span>
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

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" style={{background:'rgba(0,14,31,0.65)'}} onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-6 p-7">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[20px] font-bold text-neutral-900">{editId?'تعديل الوحدة':'إضافة وحدة جديدة'}</h3>
              <button onClick={()=>setShowModal(false)} className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-all">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Section: الأساسيات */}
              <div>
                <p className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider mb-3">بيانات الوحدة</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className={lbl}>المشروع *</label>
                    <select name="project" value={form.project} onChange={fc} className={inp} required>
                      <option value="">— اختر مشروعاً —</option>
                      {projects.map(p=><option key={p._id} value={p._id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>النوع</label>
                    <select name="type" value={form.type} onChange={fc} className={inp}>
                      {TYPE_LIST.map(t=><option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>المساحة (م²) *</label>
                    <input name="area" type="number" min="1" value={form.area} onChange={fc} className={inp} placeholder="150" required/>
                  </div>
                  <div>
                    <label className={lbl}>المبنى / البرج</label>
                    <input name="building" type="text" value={form.building} onChange={fc} className={inp} placeholder="A / برج 1 / ..."  />
                  </div>
                  <div>
                    <label className={lbl}>الدور</label>
                    <input name="floor" type="number" min="0" value={form.floor} onChange={fc} className={inp} placeholder="3"/>
                  </div>
                  <div>
                    <label className={lbl}>غرف النوم</label>
                    <input name="rooms" type="number" min="0" value={form.rooms} onChange={fc} className={inp} placeholder="3"/>
                  </div>
                  <div>
                    <label className={lbl}>الحمامات</label>
                    <input name="bathrooms" type="number" min="0" value={form.bathrooms} onChange={fc} className={inp}/>
                  </div>
                  <div>
                    <label className={lbl}>مواقف السيارات</label>
                    <input name="parking" type="number" min="0" value={form.parking} onChange={fc} className={inp}/>
                  </div>
                  <div>
                    <label className={lbl}>التشطيب</label>
                    <select name="finishing" value={form.finishing} onChange={fc} className={inp}>
                      {FINISH_LIST.map(f=><option key={f}>{f}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>الحالة</label>
                    <select name="status" value={form.status} onChange={fc} className={inp}>
                      {STATUS_LIST.map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>كود المرجع (اختياري)</label>
                    <input name="ref" type="text" value={form.ref} onChange={fc} className={inp} placeholder="UNIT-001"/>
                  </div>
                </div>
              </div>

              {/* Section: شروط الدفع */}
              <div className="pt-3 border-t border-neutral-100">
                <p className="text-[12px] font-bold text-neutral-400 uppercase tracking-wider mb-3">شروط الدفع</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className={lbl}>السعر الإجمالي (ج.م) *</label>
                    <input name="price" type="number" min="0" value={form.price} onChange={fc} className={inp} placeholder="2500000" required/>
                  </div>
                  <div>
                    <label className={lbl}>نسبة الدفعة المقدمة (%)</label>
                    <input name="downPaymentPercent" type="number" min="0" max="100" value={form.downPaymentPercent} onChange={fc} className={inp}/>
                  </div>
                  <div>
                    <label className={lbl}>سنوات التقسيط</label>
                    <input name="installmentYears" type="number" min="0" max="30" value={form.installmentYears} onChange={fc} className={inp} placeholder="5"/>
                  </div>
                  <div className="col-span-2">
                    <label className={lbl}>تاريخ التسليم</label>
                    <input name="deliveryDate" type="date" value={form.deliveryDate} onChange={fc} className={inp}/>
                  </div>
                </div>

                {/* Live payment preview */}
                {form.price > 0 && (
                  <div className="mt-3 p-4 rounded-2xl grid grid-cols-3 gap-3" style={{background:'#f0f7ff'}}>
                    <div className="text-center">
                      <p className="text-[11px] text-neutral-500 mb-1">الدفعة المقدمة</p>
                      <p className="text-[15px] font-bold text-neutral-900">{dpAmt.toLocaleString()}</p>
                      <p className="text-[10px] text-neutral-400">ج.م</p>
                    </div>
                    <div className="text-center border-r border-l border-blue-200">
                      <p className="text-[11px] text-neutral-500 mb-1">القسط الشهري</p>
                      <p className="text-[15px] font-bold text-neutral-900">{monthlyAmt.toLocaleString()}</p>
                      <p className="text-[10px] text-neutral-400">ج.م/شهر</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] text-neutral-500 mb-1">مدة التقسيط</p>
                      <p className="text-[15px] font-bold text-neutral-900">{form.installmentYears || 0}</p>
                      <p className="text-[10px] text-neutral-400">سنة</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className={lbl}>الوصف</label>
                <textarea name="description" value={form.description} onChange={fc} rows={3}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-[13px] outline-none bg-neutral-50 focus:border-[#775a1a] transition-all resize-none"
                  placeholder="وصف مختصر للوحدة..."/>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={()=>setShowModal(false)} className="flex-1 h-11 rounded-xl bg-neutral-100 text-neutral-600 font-semibold hover:bg-neutral-200 transition-all">إلغاء</button>
                <button type="submit" disabled={saving}
                  className="flex-1 h-11 rounded-xl text-white font-bold disabled:opacity-60 flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md"
                  style={{background:'#000e1f'}}>
                  {saving?<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>:<><span className="material-symbols-outlined text-[18px]">save</span>{editId?'حفظ التعديلات':'إنشاء الوحدة'}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,14,31,0.65)'}}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-xs w-full">
            <span className="material-symbols-outlined text-[40px] text-red-500 block text-center mb-3">warning</span>
            <p className="text-center font-bold text-neutral-800 mb-1">تأكيد الحذف</p>
            <p className="text-center text-[13px] text-neutral-500 mb-5">هذا الإجراء لا يمكن التراجع عنه</p>
            <div className="flex gap-3">
              <button onClick={()=>setDeleteId(null)} className="flex-1 h-10 rounded-xl bg-neutral-100 text-neutral-600 font-semibold">إلغاء</button>
              <button onClick={handleDelete} className="flex-1 h-10 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700">حذف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}