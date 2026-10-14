import { useState } from 'react';
import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    "id": 1,
    "name": "أبراج حورس الاستثمارية",
    "nameEn": "Horus Investment Towers",
    "location": "العاصمة الإدارية الجديدة — CBD",
    "type": "تجاري وسكني",
    "area": "32,000",
    "units": 68,
    "available": 24,
    "price": "7,450,000",
    "status": "تحت الإنشاء",
    "delivery": "ديسمبر 2026",
    "badge": "مميز",
    "progress": 62,
    "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuCPXkPc2KaLFiRV8RHJQhqfstMFlyq8dBqmhxBFocqKU8pB6mxFWJQdKJbYH0h6yCqBJIDjzC5o6OAIqz-VBvC3JV3QGJCDjOANvPEMNXi3tFdaBb0yqjj69JaxpBeTxXLhvRkJUWZS2kDxO4wXomD72DPIhFBq4E2pNChVNfhBIVa1b7UzWbxCxS0j0tQH04JF3VB_bdIPMeRNVw"
  },
  {
    "id": 2,
    "name": "كمبوند سيتيا الراقي",
    "nameEn": "Citia Compound",
    "location": "القاهرة الجديدة — Golden Square",
    "type": "سكني فاخر",
    "area": "48,000",
    "units": 180,
    "available": 55,
    "price": "2,500,000",
    "status": "قيد البيع",
    "delivery": "يونيو 2027",
    "badge": "",
    "progress": 35,
    "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuCq7bUFXb2v6zfL4o9YIVqfH59ePMYGVqLBxMoJeZ69J6hHNcJMoFY9MZfD8S9t4jMiCAnzjdSK4GWJJ7h33o9hVQ3-5VCa0c_cFLiF_rkS_xQI9x3WjrKkRGP0YkFl4H3sxfJpHpDhpKXvBfJ5EoRSdlwL7ztcMiHBLjI1IsTz6fHENs4_Sf3Wep9VRi4nzH9Ei1gDl0RaLqz9M"
  },
  {
    "id": 3,
    "name": "فيلات الملكية",
    "nameEn": "Royal Villas",
    "location": "الشيخ زايد — حدائق الأهرام",
    "type": "فيلات فاخرة",
    "area": "8,000",
    "units": 64,
    "available": 12,
    "price": "7,200,000",
    "status": "قيد البيع",
    "delivery": "مارس 2026",
    "badge": "",
    "progress": 88,
    "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuCgN7gJIFTUPxhAD01uGXvKqLy_wgWfGgp5D9GHJFmpqB5MHvTSPBi6XSF-LtmJj7zOq5N3kUBHE0ilfAzJOhgdHWRi_6S2RhCbJlILRhwMxD0EfBDjH8tN3Wg9fJd8sVH-ZX7Gi7r-RiSmUuaXFcGDhv1m_h5E0gYaxcqIoW_Mgg0lMunRqAP3KRBzDxRnnVdABB_1VoITNIHhY"
  },
  {
    "id": 4,
    "name": "برج النيل الأزرق",
    "nameEn": "Blue Nile Tower",
    "location": "الزمالك — كورنيش النيل",
    "type": "سكني فاخر",
    "area": "15,200",
    "units": 96,
    "available": 8,
    "price": "12,000,000",
    "status": "قيد البيع",
    "delivery": "سبتمبر 2025",
    "badge": "آخر وحدات",
    "progress": 95,
    "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuATa4Oi0yS3kNRr9mqsKyGZ9KGvNs9D7VXdLif8ppgdccHMYATEOM3UtfCyjUGxEwIDJYKbwr9pTJZr3rx9eP6VbPxYArgcxur_UnXZTzZjEyA7NemszADlJ4BSmuNbNe6IfXr83qE-1nZhM5N-7qgB-awykAk1gA7dBBPxyNvTbc96PqW79x9iDlAPSOCYi5nDU5tidE3MgEL-rpTPl4shrCLB52IRNhgjy4FczXjTS34wph2WKzOHqw"
  },
  {
    "id": 5,
    "name": "ريزيدنس المونتريال",
    "nameEn": "Montreal Residence",
    "location": "الساحل الشمالي — الكيلو 94",
    "type": "شاليهات ساحلية",
    "area": "22,000",
    "units": 120,
    "available": 31,
    "price": "4,800,000",
    "status": "تحت الإنشاء",
    "delivery": "مايو 2027",
    "badge": "",
    "progress": 28,
    "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuCPXkPc2KaLFiRV8RHJQhqfstMFlyq8dBqmhxBFocqKU8pB6mxFWJQdKJbYH0h6yCqBJIDjzC5o6OAIqz-VBvC3JV3QGJCDjOANvPEMNXi3tFdaBb0yqjj69JaxpBeTxXLhvRkJUWZS2kDxO4wXomD72DPIhFBq4E2pNChVNfhBIVa1b7UzWbxCxS0j0tQH04JF3VB_bdIPMeRNVw"
  },
  {
    "id": 6,
    "name": "أكاديمية بارك ريزيدنس",
    "nameEn": "Academy Park Residence",
    "location": "العاصمة الإدارية — R7",
    "type": "سكني متوسط",
    "area": "60,000",
    "units": 320,
    "available": 142,
    "price": "1,900,000",
    "status": "تحت الإنشاء",
    "delivery": "أكتوبر 2027",
    "badge": "جديد",
    "progress": 15,
    "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuCq7bUFXb2v6zfL4o9YIVqfH59ePMYGVqLBxMoJeZ69J6hHNcJMoFY9MZfD8S9t4jMiCAnzjdSK4GWJJ7h33o9hVQ3-5VCa0c_cFLiF_rkS_xQI9x3WjrKkRGP0YkFl4H3sxfJpHpDhpKXvBfJ5EoRSdlwL7ztcMiHBLjI1IsTz6fHENs4_Sf3Wep9VRi4nzH9Ei1gDl0RaLqz9M"
  }
];

const STATUS_COLORS = {
  "تحت الإنشاء": "bg-blue-100 text-blue-800",
  "قيد البيع":   "bg-amber-100 text-amber-800",
  "مكتمل":       "bg-green-100 text-green-800",
};

const TABS = [
  { label:"الكل", count:14 },
  { label:"قيد البيع", count:9 },
  { label:"تحت الإنشاء", count:3 },
  { label:"مكتملة", count:2 },
];

const AREAS = ["العاصمة الإدارية","القاهرة الجديدة","الشيخ زايد","الساحل الشمالي","الزمالك"];
const TYPES = ["تجاري وسكني","سكني فاخر","فيلات فاخرة","شاليهات ساحلية","سكني متوسط"];
const BUDGETS = ["أقل من 3 مليون","3-6 مليون","6-12 مليون","أكثر من 12 مليون"];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("الكل");
  const [viewMode, setViewMode] = useState("grid");
  const [area, setArea]     = useState("");
  const [type, setType]     = useState("");
  const [budget, setBudget] = useState("");

  const filtered = PROJECTS.filter(p => {
    if (activeTab === "قيد البيع"    && p.status !== "قيد البيع")    return false;
    if (activeTab === "تحت الإنشاء"  && p.status !== "تحت الإنشاء")  return false;
    if (activeTab === "مكتملة"        && p.status !== "مكتمل")        return false;
    if (area   && !p.location.includes(area))   return false;
    if (type   && p.type !== type)              return false;
    return true;
  });

  return (
    <div className="flex flex-col w-full bg-surface">

      {/* ── Page Header ── */}
      <div className="relative w-full overflow-hidden bg-surface-container-lowest">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-96 rounded-full bg-gradient-to-b from-surface-container-high/40 via-surface-container-low/20 to-transparent blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-10 relative z-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6">
            <Link to="/" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">home</span>
              الرئيسية
            </Link>
            <span className="material-symbols-outlined text-[16px] text-outline rotate-180">chevron_left</span>
            <span className="font-label-md text-label-md text-secondary font-semibold">مشروعاتنا</span>
          </nav>

          {/* Header + Stats */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container text-secondary mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="font-label-sm text-label-sm font-semibold tracking-wide">المشروعات الاستثمارية الفاخرة</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mb-3">
                اكتشف مشروعاتنا الاستثمارية
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                نقدّم تشكيلة متنوعة من المشروعات العقارية الفاخرة في أرقى المناطق بمصر مع ضمانات استثمارية كاملة وخطط سداد مرنة.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-container-low p-4 rounded-xl shadow-sm shrink-0">
              {[{v:"14",l:"مشروع نشط"},{v:"4",l:"مدن رئيسية"},{v:"480+",l:"وحدة متاحة"},{v:"+18B",l:"استثمارات ج.م",gold:true}].map(s => (
                <div key={s.l} className="flex flex-col text-right px-3 py-1">
                  <span className={`font-financial-numeric text-financial-numeric font-bold ${s.gold?"text-secondary":"text-primary"}`}>{s.v}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Filters + Grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full flex flex-col gap-8">

        {/* Status Tabs + View toggle */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {TABS.map(t => (
              <button key={t.label} onClick={() => setActiveTab(t.label)}
                className={`px-5 py-2.5 rounded-lg font-title-md text-title-md transition-all flex items-center gap-2 shrink-0 shadow-sm ${activeTab===t.label?"bg-primary-container text-on-primary":"bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-on-surface"}`}>
                <span>{t.label}</span>
                <span className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm ${activeTab===t.label?"bg-white/20 text-secondary-fixed":"bg-surface-container text-on-surface-variant"}`}>{t.count}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block font-label-md text-label-md text-on-surface-variant">
              عرض <strong className="text-on-surface">{filtered.length}</strong> من {PROJECTS.length} مشروع
            </span>
            <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-lg">
              <button onClick={() => setViewMode("grid")} className={`p-2 rounded-md transition-colors ${viewMode==="grid"?"bg-surface-container-lowest shadow-sm text-on-surface":"text-on-surface-variant hover:bg-surface-container"}`}>
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
              </button>
              <button onClick={() => setViewMode("list")} className={`p-2 rounded-md transition-colors ${viewMode==="list"?"bg-surface-container-lowest shadow-sm text-on-surface":"text-on-surface-variant hover:bg-surface-container"}`}>
                <span className="material-symbols-outlined text-[20px]">view_list</span>
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-4 lg:p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-secondary text-[20px]">tune</span>
            <span className="font-title-md text-title-md text-on-surface font-semibold">تصفية المشروعات</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:"المنطقة", icon:"location_on", val:area,   set:setArea,   opts:AREAS,   ph:"كافة المناطق" },
              { label:"النوع",   icon:"home_work",   val:type,   set:setType,   opts:TYPES,   ph:"جميع الأنواع" },
              { label:"الميزانية", icon:"payments",  val:budget, set:setBudget, opts:BUDGETS, ph:"النطاق السعري" },
            ].map(f => (
              <div key={f.label} className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[16px]">{f.icon}</span>{f.label}
                </label>
                <div className="relative">
                  <select value={f.val} onChange={e=>f.set(e.target.value)} className="w-full h-11 pr-4 pl-10 rounded-lg bg-surface-container-low text-on-surface font-title-md text-title-md appearance-none focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer">
                    <option value="">{f.ph}</option>
                    {f.opts.map(o=><option key={o}>{o}</option>)}
                  </select>
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[20px]">keyboard_arrow_down</span>
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant">إجراء</label>
              <button onClick={() => { setArea(""); setType(""); setBudget(""); setActiveTab("الكل"); }} className="h-11 px-4 rounded-lg bg-surface-container text-on-surface-variant font-title-md text-title-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">refresh</span>إعادة ضبط
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className={`${viewMode==="grid"?"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6":"flex flex-col gap-4"}`}>
          {filtered.map(p => viewMode === "grid" ? (
            <div key={p.id} className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
                <div className="absolute top-3 right-3 flex gap-2">
                  {p.badge && <span className="px-2.5 py-1 rounded-full bg-secondary text-on-primary font-label-sm text-label-sm font-bold shadow">{p.badge}</span>}
                  <span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold ${STATUS_COLORS[p.status]||""}`}>{p.status}</span>
                </div>
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-label-sm text-label-sm text-white/80">نسبة الإنجاز</span>
                    <span className="font-label-sm text-label-sm text-secondary-fixed font-bold">{p.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary-fixed rounded-full" style={{ width: p.progress + "%" }} />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="font-label-md text-label-md text-on-surface-variant mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[16px]">location_on</span>{p.location}
                </p>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-1 leading-tight">{p.name}</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mb-4">{p.nameEn}</p>
                <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-outline-variant/30 text-center">
                  {[{i:"straighten",l:"المساحة",v:p.area+" م²"},{i:"holiday_village",l:"الوحدات",v:p.units},{i:"event_available",l:"التسليم",v:p.delivery}].map(m=>(
                    <div key={m.l} className="flex flex-col items-center gap-0.5">
                      <span className="material-symbols-outlined text-secondary text-[18px]">{m.i}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{m.l}</span>
                      <span className="font-title-md text-title-md text-on-surface font-semibold text-[13px] leading-tight">{m.v}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">يبدأ من</p>
                    <p className="font-financial-numeric text-financial-numeric text-on-surface font-bold">{p.price} <span className="font-label-md text-label-md text-on-surface-variant">ج.م</span></p>
                  </div>
                  <Link to={"/projects/"+p.id} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all text-sm">
                    تفاصيل<span className="material-symbols-outlined text-[16px]">arrow_left_alt</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div key={p.id} className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-all flex">
              <div className="w-56 flex-shrink-0 overflow-hidden hidden sm:block relative">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-l from-surface-container-lowest/20 to-transparent" />
              </div>
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <p className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1 mb-1"><span className="material-symbols-outlined text-secondary text-[16px]">location_on</span>{p.location}</p>
                      <h3 className="font-title-lg text-title-lg text-on-surface font-bold">{p.name}</h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">{p.nameEn}</p>
                    </div>
                    <div className="flex gap-2">
                      {p.badge && <span className="px-2.5 py-1 rounded-full bg-secondary text-on-primary font-label-sm text-label-sm font-bold">{p.badge}</span>}
                      <span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold ${STATUS_COLORS[p.status]||""}`}>{p.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 text-on-surface-variant flex-wrap mb-3">
                    {[{i:"straighten",l:p.area+" م²"},{i:"holiday_village",l:p.units+" وحدة"},{i:"event_available",l:p.delivery},{i:"check_circle",l:p.available+" متاحة"}].map(m=>(
                      <span key={m.l} className="flex items-center gap-1.5 font-body-md text-body-md"><span className="material-symbols-outlined text-secondary text-[18px]">{m.i}</span>{m.l}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden"><div className="h-full bg-secondary rounded-full" style={{ width: p.progress+"%" }} /></div>
                    <span className="font-label-sm text-label-sm text-secondary font-bold">{p.progress}% منجز</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-outline-variant/30">
                  <div><p className="font-label-sm text-label-sm text-on-surface-variant">يبدأ من</p><p className="font-financial-numeric text-financial-numeric text-on-surface font-bold">{p.price} <span className="font-label-md text-label-md text-on-surface-variant">ج.م</span></p></div>
                  <Link to={"/projects/"+p.id} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all text-sm">
                    تفاصيل المشروع<span className="material-symbols-outlined text-[16px]">arrow_left_alt</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-[64px] text-outline mb-4">search_off</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">لا توجد مشروعات مطابقة</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">جرّب تعديل معايير البحث أو إعادة ضبط الفلاتر</p>
            <button onClick={() => { setArea(""); setType(""); setBudget(""); setActiveTab("الكل"); }} className="px-6 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all">
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}

        {/* CTA Banner */}
        <div className="rounded-2xl bg-primary-container overflow-hidden relative mt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-container/80" />
          <div className="relative p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-primary font-bold mb-2">هل تبحث عن فرصة استثمارية بمواصفات خاصة؟</h3>
              <p className="font-body-lg text-body-lg text-on-primary/75">فريق مستشارينا جاهز لتصميم باقة استثمارية مخصصة تناسب احتياجاتك وميزانيتك.</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-secondary text-on-primary font-title-lg text-title-lg hover:bg-on-secondary-container transition-all shadow-lg whitespace-nowrap flex-shrink-0">
              <span>تواصل مع مستشار</span>
              <span className="material-symbols-outlined text-[20px]">arrow_left_alt</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
