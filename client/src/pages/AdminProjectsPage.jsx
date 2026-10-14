import { useState } from 'react';
import { Link } from 'react-router-dom';

const PROJECTS = [
  { id:1, name:"أبراج حورس الاستثمارية", location:"العاصمة الإدارية — CBD", type:"تجاري وسكني", units:68, sold:44, available:24, price:"7,450,000", status:"تحت الإنشاء", progress:62, delivery:"ديسمبر 2026" },
  { id:2, name:"كمبوند سيتيا الراقي",    location:"القاهرة الجديدة",         type:"سكني فاخر",  units:180, sold:125,available:55, price:"2,500,000", status:"قيد البيع",    progress:35, delivery:"يونيو 2027" },
  { id:3, name:"فيلات الملكية",           location:"الشيخ زايد",               type:"فيلات فاخرة",units:64, sold:52, available:12, price:"7,200,000", status:"قيد البيع",    progress:88, delivery:"مارس 2026" },
  { id:4, name:"برج النيل الأزرق",       location:"الزمالك — كورنيش النيل",   type:"سكني فاخر",  units:96, sold:88, available:8,  price:"12,000,000",status:"قيد البيع",    progress:95, delivery:"سبتمبر 2025" },
  { id:5, name:"ريزيدنس المونتريال",     location:"الساحل الشمالي — الكيلو 94", type:"شاليهات", units:120,sold:89, available:31, price:"4,800,000", status:"تحت الإنشاء", progress:28, delivery:"مايو 2027" },
];

const STATUS_COLORS = {
  "تحت الإنشاء": "bg-blue-100 text-blue-800",
  "قيد البيع":   "bg-amber-100 text-amber-800",
  "مكتمل":       "bg-green-100 text-green-800",
};

export default function AdminProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("الكل");
  const [showModal, setShowModal] = useState(false);

  const filtered = PROJECTS.filter(p => {
    if (statusFilter !== "الكل" && p.status !== statusFilter) return false;
    if (search && !p.name.includes(search) && !p.location.includes(search)) return false;
    return true;
  });

  return (
    <div className="p-6 lg:p-10 flex flex-col gap-8 bg-surface min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold">إدارة المشروعات</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">إجمالي {PROJECTS.length} مشروع مسجّل</p>
        </div>
        <button onClick={()=>setShowModal(true)} className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-secondary text-on-primary font-title-md text-title-md hover:bg-on-secondary-container transition-all shadow-md">
          <span className="material-symbols-outlined text-[18px]">add</span>مشروع جديد
        </button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {icon:"apartment",       label:"إجمالي المشروعات",  value:PROJECTS.length,              color:"text-primary",   bg:"bg-primary-container/40"},
          {icon:"holiday_village", label:"إجمالي الوحدات",    value:PROJECTS.reduce((a,p)=>a+p.units,0), color:"text-secondary", bg:"bg-secondary-container/30"},
          {icon:"sell",            label:"وحدات مباعة",        value:PROJECTS.reduce((a,p)=>a+p.sold,0),  color:"text-green-700", bg:"bg-green-100"},
          {icon:"inventory",       label:"وحدات متاحة",        value:PROJECTS.reduce((a,p)=>a+p.available,0),color:"text-amber-700",bg:"bg-amber-100"},
        ].map(s=>(
          <div key={s.label} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-4 shadow-sm flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
              <span className={`material-symbols-outlined text-[22px] ${s.color}`}>{s.icon}</span>
            </div>
            <div>
              <p className={`font-financial-numeric text-headline-sm ${s.color} font-bold leading-none`}>{s.value}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث عن مشروع..." className="w-full h-11 pr-10 pl-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-secondary" />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
          </div>
          <div className="flex items-center gap-2">
            {["الكل","قيد البيع","تحت الإنشاء","مكتمل"].map(s=>(
              <button key={s} onClick={()=>setStatusFilter(s)} className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all ${statusFilter===s?"bg-primary-container text-on-primary":"bg-surface-container text-on-surface-variant hover:bg-surface-container-high"}`}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                {["المشروع","النوع","الوحدات","المبيعات","المتاح","السعر","التسليم","التقدم","الحالة","إجراءات"].map(h=>(
                  <th key={h} className="px-4 py-3.5 text-right font-label-md text-label-md text-on-surface-variant font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p,i)=>(
                <tr key={p.id} className={`border-t border-outline-variant/20 hover:bg-surface-container-low transition-colors ${i%2===1?"bg-surface-container-lowest/40":""}`}>
                  <td className="px-4 py-4">
                    <p className="font-title-md text-title-md text-on-surface font-bold whitespace-nowrap">{p.name}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span>{p.location}</p>
                  </td>
                  <td className="px-4 py-4"><span className="font-label-md text-label-md text-on-surface-variant whitespace-nowrap">{p.type}</span></td>
                  <td className="px-4 py-4 text-center"><span className="font-financial-numeric text-title-md text-on-surface font-bold">{p.units}</span></td>
                  <td className="px-4 py-4 text-center"><span className="font-financial-numeric text-title-md text-green-700 font-bold">{p.sold}</span></td>
                  <td className="px-4 py-4 text-center"><span className="font-financial-numeric text-title-md text-secondary font-bold">{p.available}</span></td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-financial-numeric text-title-md text-on-surface font-bold">{p.price}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant"> ج.م</span>
                  </td>
                  <td className="px-4 py-4 font-label-md text-label-md text-on-surface-variant whitespace-nowrap">{p.delivery}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: p.progress+"%" }} />
                      </div>
                      <span className="font-label-sm text-label-sm text-secondary font-bold whitespace-nowrap">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold whitespace-nowrap ${STATUS_COLORS[p.status]||""}`}>{p.status}</span></td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <Link to={"/projects/"+p.id} className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-secondary transition-all" title="عرض">
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </Link>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-secondary transition-all" title="تعديل">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-all" title="حذف">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-[48px] text-outline mb-3">search_off</span>
            <p className="font-title-md text-title-md text-on-surface-variant">لا توجد مشروعات مطابقة</p>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm" onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/30 bg-surface-container-low">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">إضافة مشروع جديد</h2>
              <button onClick={()=>setShowModal(false)} className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {label:"اسم المشروع",        ph:"مثال: أبراج حورس",    type:"text"},
                {label:"الاسم بالإنجليزية",   ph:"Horus Tower",          type:"text"},
                {label:"الموقع",              ph:"العاصمة الإدارية",    type:"text"},
                {label:"نوع المشروع",         ph:"سكني / تجاري",        type:"text"},
                {label:"المساحة الكلية (م²)", ph:"32000",               type:"number"},
                {label:"عدد الوحدات",         ph:"68",                   type:"number"},
                {label:"سعر البداية (ج.م)",   ph:"7450000",              type:"number"},
                {label:"موعد التسليم",         ph:"ديسمبر 2026",         type:"text"},
              ].map(f=>(
                <div key={f.label} className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface-variant">{f.label}</label>
                  <input type={f.type} placeholder={f.ph} className="h-11 px-4 rounded-lg bg-surface-container-low text-on-surface font-title-md text-title-md focus:outline-none focus:ring-1 focus:ring-secondary" />
                </div>
              ))}
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant">الوصف</label>
                <textarea rows={3} placeholder="وصف المشروع..." className="px-4 py-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-secondary resize-none" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-outline-variant/30">
              <button onClick={()=>setShowModal(false)} className="h-10 px-5 rounded-lg bg-surface-container text-on-surface-variant font-title-md text-title-md hover:bg-surface-container-high transition-all">إلغاء</button>
              <button className="h-10 px-6 rounded-lg bg-secondary text-on-primary font-title-md text-title-md hover:bg-on-secondary-container transition-all shadow-md flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">save</span>حفظ المشروع
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}