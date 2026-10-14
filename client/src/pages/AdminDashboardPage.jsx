import { Link } from 'react-router-dom';

const STATS = [
  { icon:"apartment",      label:"إجمالي المشروعات", value:"14",   sub:"+2 هذا العام",      color:"text-primary",   bg:"bg-primary-container/40" },
  { icon:"holiday_village",label:"الوحدات المتاحة",   value:"481",  sub:"من أصل 850 وحدة",  color:"text-secondary", bg:"bg-secondary-container/30" },
  { icon:"event_available",label:"الحجوزات النشطة",   value:"38",   sub:"+12 هذا الشهر",    color:"text-green-700", bg:"bg-green-100" },
  { icon:"payments",       label:"إجمالي المبيعات",   value:"18.4B",sub:"ج.م هذا العام",     color:"text-secondary", bg:"bg-secondary-container/30" },
];

const RECENT_RESERVATIONS = [
  { id:"RES-2841", client:"محمد أحمد السيد",    unit:"شقة 3 غرف — حورس",  project:"أبراج حورس",   date:"14 أكتوبر 2025", amount:"5,200,000", status:"مؤكد" },
  { id:"RES-2840", client:"سارة محمود علي",    unit:"بنتهاوس — سيتيا",   project:"سيتيا",         date:"13 أكتوبر 2025", amount:"9,500,000", status:"قيد المراجعة" },
  { id:"RES-2839", client:"أحمد خالد فارس",    unit:"مكتب تنفيذي 320م²", project:"أبراج حورس",   date:"12 أكتوبر 2025", amount:"7,400,000", status:"مؤكد" },
  { id:"RES-2838", client:"منى إبراهيم حسن",   unit:"شاليه ساحلي",        project:"المونتريال",    date:"11 أكتوبر 2025", amount:"4,800,000", status:"ملغي" },
  { id:"RES-2837", client:"كريم عبد الله",      unit:"شقة 2 غرف نوم",     project:"الملكية",       date:"10 أكتوبر 2025", amount:"3,100,000", status:"مؤكد" },
];

const STATUS_COLORS = {
  "مؤكد":         "bg-green-100 text-green-800",
  "قيد المراجعة": "bg-amber-100 text-amber-800",
  "ملغي":         "bg-red-100 text-red-800",
};

const PROJECTS_PROGRESS = [
  { name:"أبراج حورس الاستثمارية", progress:62, status:"تحت الإنشاء", units:68, sold:44 },
  { name:"كمبوند سيتيا الراقي",    progress:35, status:"قيد البيع",    units:180, sold:125 },
  { name:"فيلات الملكية",           progress:88, status:"قيد البيع",    units:64,  sold:52 },
  { name:"برج النيل الأزرق",       progress:95, status:"قيد البيع",    units:96,  sold:88 },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 lg:p-10 flex flex-col gap-8 bg-surface min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-surface font-bold">لوحة التحكم الرئيسية</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">الأربعاء، 14 أكتوبر 2025</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-all">
            <span className="material-symbols-outlined text-on-surface-variant text-[22px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-secondary border-2 border-surface" />
          </button>
          <Link to="/admin/projects" className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">add</span>مشروع جديد
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {STATS.map(s=>(
          <div key={s.label} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center`}>
                <span className={`material-symbols-outlined text-[24px] ${s.color}`}>{s.icon}</span>
              </div>
              <span className="material-symbols-outlined text-outline text-[20px]">trending_up</span>
            </div>
            <p className={`font-financial-numeric text-headline-sm ${s.color} font-bold leading-none mb-1`}>{s.value}</p>
            <p className="font-title-md text-title-md text-on-surface font-semibold">{s.label}</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Reservations */}
        <div className="xl:col-span-2 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30">
            <h2 className="font-title-lg text-title-lg text-on-surface font-bold">آخر الحجوزات</h2>
            <Link to="/admin/reservations" className="font-label-md text-label-md text-secondary hover:underline flex items-center gap-1">
              عرض الكل <span className="material-symbols-outlined text-[16px]">arrow_left_alt</span>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-container-low">
                  {["رقم الحجز","العميل","الوحدة","التاريخ","المبلغ","الحالة"].map(h=>(
                    <th key={h} className="px-4 py-3 text-right font-label-md text-label-md text-on-surface-variant font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_RESERVATIONS.map((r,i)=>(
                  <tr key={r.id} className={`border-t border-outline-variant/20 hover:bg-surface-container-low transition-colors ${i%2===0?"":"bg-surface-container-lowest/50"}`}>
                    <td className="px-4 py-3.5"><span className="font-financial-numeric text-label-md text-secondary font-bold">{r.id}</span></td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0"><span className="font-label-sm text-label-sm text-on-primary font-bold">{r.client[0]}</span></div>
                        <span className="font-title-md text-title-md text-on-surface font-semibold whitespace-nowrap">{r.client}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-body-md text-body-md text-on-surface whitespace-nowrap">{r.unit}</p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">{r.project}</p>
                    </td>
                    <td className="px-4 py-3.5 font-label-md text-label-md text-on-surface-variant whitespace-nowrap">{r.date}</td>
                    <td className="px-4 py-3.5 font-financial-numeric text-title-md text-on-surface font-bold whitespace-nowrap">{r.amount} <span className="font-label-sm text-label-sm text-on-surface-variant">ج.م</span></td>
                    <td className="px-4 py-3.5"><span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold whitespace-nowrap ${STATUS_COLORS[r.status]||""}`}>{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Projects Progress */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30">
            <h2 className="font-title-lg text-title-lg text-on-surface font-bold">تقدم المشروعات</h2>
            <Link to="/admin/projects" className="font-label-md text-label-md text-secondary hover:underline flex items-center gap-1">
              إدارة <span className="material-symbols-outlined text-[16px]">arrow_left_alt</span>
            </Link>
          </div>
          <div className="p-4 flex flex-col gap-4">
            {PROJECTS_PROGRESS.map(p=>(
              <div key={p.name} className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-title-md text-title-md text-on-surface font-bold leading-tight">{p.name}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">{p.sold} / {p.units} وحدة مباعة</p>
                  </div>
                  <span className="font-financial-numeric text-secondary font-bold">{p.progress}%</span>
                </div>
                <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-secondary to-secondary-fixed rounded-full" style={{ width: p.progress+"%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {icon:"apartment",     label:"إضافة مشروع",    to:"/admin/projects",      color:"bg-primary-container/40 text-primary"},
          {icon:"holiday_village",label:"إضافة وحدة",    to:"/admin/units",         color:"bg-secondary-container/30 text-secondary"},
          {icon:"groups",        label:"إدارة العملاء",   to:"/admin/clients",       color:"bg-green-100 text-green-700"},
          {icon:"bar_chart",     label:"التقارير",        to:"/admin/reports",       color:"bg-surface-container-high text-on-surface"},
        ].map(a=>(
          <Link key={a.label} to={a.to} className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className={`w-12 h-12 rounded-xl ${a.color} flex items-center justify-center`}>
              <span className="material-symbols-outlined text-[24px]">{a.icon}</span>
            </div>
            <span className="font-title-md text-title-md text-on-surface font-semibold">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}