import { useState } from 'react';
import { Link } from 'react-router-dom';

const UNITS = [
  { id:1, type:"شقة 3 غرف نوم فاخرة", project:"أبراج حورس", location:"العاصمة الإدارية — CBD", area:210, floor:18, price:"5,200,000", finishing:"سوبر لوكس", status:"متاح", rooms:3, baths:2, parking:1, img:"https://lh3.googleusercontent.com/aida-public/AB6AXuCPXkPc2KaLFiRV8RHJQhqfstMFlyq8dBqmhxBFocqKU8pB6mxFWJQdKJbYH0h6yCqBJIDjzC5o6OAIqz-VBvC3JV3QGJCDjOANvPEMNXi3tFdaBb0yqjj69JaxpBeTxXLhvRkJUWZS2kDxO4wXomD72DPIhFBq4E2pNChVNfhBIVa1b7UzWbxCxS0j0tQH04JF3VB_bdIPMeRNVw" },
  { id:2, type:"بنتهاوس 4 غرف نوم",    project:"سيتيا",       location:"القاهرة الجديدة — Golden Square", area:380, floor:24, price:"9,500,000", finishing:"تشطيب فندقي",status:"متاح",   rooms:4, baths:3, parking:2, img:"https://lh3.googleusercontent.com/aida-public/AB6AXuCq7bUFXb2v6zfL4o9YIVqfH59ePMYGVqLBxMoJeZ69J6hHNcJMoFY9MZfD8S9t4jMiCAnzjdSK4GWJJ7h33o9hVQ3-5VCa0c_cFLiF_rkS_xQI9x3WjrKkRGP0YkFl4H3sxfJpHpDhpKXvBfJ5EoRSdlwL7ztcMiHBLjI1IsTz6fHENs4_Sf3Wep9VRi4nzH9Ei1gDl0RaLqz9M" },
  { id:3, type:"شقة 2 غرف نوم",        project:"الملكية",     location:"الشيخ زايد — حدائق الأهرام",    area:145, floor:7,  price:"3,100,000", finishing:"نصف تشطيب",  status:"متاح",   rooms:2, baths:1, parking:1, img:"https://lh3.googleusercontent.com/aida-public/AB6AXuCgN7gJIFTUPxhAD01uGXvKqLy_wgWfGgp5D9GHJFmpqB5MHvTSPBi6XSF-LtmJj7zOq5N3kUBHE0ilfAzJOhgdHWRi_6S2RhCbJlILRhwMxD0EfBDjH8tN3Wg9fJd8sVH-ZX7Gi7r-RiSmUuaXFcGDhv1m_h5E0gYaxcqIoW_Mgg0lMunRqAP3KRBzDxRnnVdABB_1VoITNIHhY" },
  { id:4, type:"مكتب تنفيذي",           project:"أبراج حورس", location:"العاصمة الإدارية — CBD",         area:320, floor:22, price:"7,400,000", finishing:"Core & Shell", status:"متاح",  rooms:0, baths:2, parking:2, img:"https://lh3.googleusercontent.com/aida-public/AB6AXuATa4Oi0yS3kNRr9mqsKyGZ9KGvNs9D7VXdLif8ppgdccHMYATEOM3UtfCyjUGxEwIDJYKbwr9pTJZr3rx9eP6VbPxYArgcxur_UnXZTzZjEyA7NemszADlJ4BSmuNbNe6IfXr83qE-1nZhM5N-7qgB-awykAk1gA7dBBPxyNvTbc96PqW79x9iDlAPSOCYi5nDU5tidE3MgEL-rpTPl4shrCLB52IRNhgjy4FczXjTS34wph2WKzOHqw" },
  { id:5, type:"شاليه ساحلي 3 غرف",    project:"المونتريال",  location:"الساحل الشمالي — الكيلو 94",    area:180, floor:1,  price:"4,800,000", finishing:"سوبر لوكس",  status:"محجوز", rooms:3, baths:2, parking:1, img:"https://lh3.googleusercontent.com/aida-public/AB6AXuCPXkPc2KaLFiRV8RHJQhqfstMFlyq8dBqmhxBFocqKU8pB6mxFWJQdKJbYH0h6yCqBJIDjzC5o6OAIqz-VBvC3JV3QGJCDjOANvPEMNXi3tFdaBb0yqjj69JaxpBeTxXLhvRkJUWZS2kDxO4wXomD72DPIhFBq4E2pNChVNfhBIVa1b7UzWbxCxS0j0tQH04JF3VB_bdIPMeRNVw" },
  { id:6, type:"شقة 1 غرفة (ستوديو)",  project:"أكاديمية بارك", location:"العاصمة الإدارية — R7",      area:75,  floor:4,  price:"1,250,000", finishing:"نصف تشطيب",  status:"متاح",   rooms:1, baths:1, parking:0, img:"https://lh3.googleusercontent.com/aida-public/AB6AXuCq7bUFXb2v6zfL4o9YIVqfH59ePMYGVqLBxMoJeZ69J6hHNcJMoFY9MZfD8S9t4jMiCAnzjdSK4GWJJ7h33o9hVQ3-5VCa0c_cFLiF_rkS_xQI9x3WjrKkRGP0YkFl4H3sxfJpHpDhpKXvBfJ5EoRSdlwL7ztcMiHBLjI1IsTz6fHENs4_Sf3Wep9VRi4nzH9Ei1gDl0RaLqz9M" },
];

const AREAS = ["العاصمة الإدارية","القاهرة الجديدة","الشيخ زايد","الساحل الشمالي","الزمالك"];
const TYPES = ["شقة","بنتهاوس","مكتب","شاليه","فيلا","ستوديو"];
const FINISHING = ["سوبر لوكس","تشطيب فندقي","نصف تشطيب","Core & Shell"];
const BUDGETS = ["أقل من 2 مليون","2–5 مليون","5–10 مليون","أكثر من 10 مليون"];

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [area, setArea]     = useState("");
  const [type, setType]     = useState("");
  const [finish, setFinish] = useState("");
  const [budget, setBudget] = useState("");
  const [sort, setSort]     = useState("الأحدث");

  const filtered = UNITS.filter(u => {
    if (search && !u.type.includes(search) && !u.project.includes(search) && !u.location.includes(search)) return false;
    if (area   && !u.location.includes(area))     return false;
    if (type   && !u.type.includes(type))          return false;
    if (finish && u.finishing !== finish)           return false;
    return true;
  });

  return (
    <div className="flex flex-col w-full bg-surface">

      {/* Header */}
      <div className="relative w-full bg-surface-container-lowest overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-96 rounded-full bg-gradient-to-b from-surface-container-high/40 to-transparent blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-10 relative z-10">
          <nav className="flex items-center gap-2 mb-6 font-label-md text-label-md text-on-surface-variant">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">home</span>الرئيسية</Link>
            <span className="material-symbols-outlined text-[16px] text-outline rotate-180">chevron_left</span>
            <span className="text-secondary font-semibold">الوحدات المتاحة</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container text-secondary mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="font-label-sm text-label-sm font-semibold">الوحدات الاستثمارية المتاحة</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mb-3">استعرض الوحدات المتاحة</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                تشكيلة متنوعة من الشقق والمكاتب والوحدات التجارية في أرقى المشروعات العقارية بمصر.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 bg-surface-container-low p-4 rounded-xl shadow-sm shrink-0">
              {[{v:"480+",l:"وحدة متاحة"},{v:"14",l:"مشروع"},{v:"4",l:"مدن رئيسية"}].map(s=>(
                <div key={s.l} className="flex flex-col text-right px-2">
                  <span className="font-financial-numeric text-financial-numeric text-primary font-bold">{s.v}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full flex flex-col lg:flex-row gap-8">

        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm p-5 sticky top-24">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">tune</span>
                <span className="font-title-lg text-title-lg text-on-surface font-bold">فلاتر البحث</span>
              </div>
              <button onClick={() => { setArea(""); setType(""); setFinish(""); setBudget(""); setSearch(""); }} className="font-label-sm text-label-sm text-secondary hover:underline">إعادة ضبط</button>
            </div>

            {/* Search */}
            <div className="mb-5">
              <label className="font-label-md text-label-md text-on-surface-variant mb-1.5 block">بحث نصي</label>
              <div className="relative">
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="نوع الوحدة أو المشروع..." className="w-full h-11 pr-10 pl-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-secondary" />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
              </div>
            </div>

            {/* Filter selects */}
            {[
              { label:"المنطقة", icon:"location_on", val:area,   set:setArea,   opts:AREAS,     ph:"كافة المناطق" },
              { label:"نوع الوحدة", icon:"home_work", val:type,  set:setType,   opts:TYPES,     ph:"جميع الأنواع" },
              { label:"التشطيب", icon:"construction", val:finish,set:setFinish, opts:FINISHING, ph:"كل مستويات التشطيب" },
              { label:"الميزانية", icon:"payments",   val:budget, set:setBudget, opts:BUDGETS,   ph:"النطاق السعري" },
            ].map(f=>(
              <div key={f.label} className="mb-4">
                <label className="font-label-md text-label-md text-on-surface-variant mb-1.5 flex items-center gap-1.5">
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

            {/* Consultation CTA */}
            <div className="mt-6 p-4 rounded-xl bg-primary-container text-center">
              <span className="material-symbols-outlined text-secondary-fixed text-[32px] mb-2 block">support_agent</span>
              <p className="font-title-md text-title-md text-on-primary font-bold mb-1">تحتاج مساعدة؟</p>
              <p className="font-body-md text-body-md text-on-primary/75 mb-3">مستشارنا يساعدك في اختيار الوحدة المثالية</p>
              <Link to="/contact" className="block w-full h-10 rounded-lg bg-secondary text-on-primary font-title-md text-title-md flex items-center justify-center gap-1 hover:bg-on-secondary-container transition-all">
                تواصل معنا <span className="material-symbols-outlined text-[18px]">arrow_left_alt</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Units List */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          {/* Sort + count */}
          <div className="flex items-center justify-between">
            <p className="font-body-md text-body-md text-on-surface-variant">
              عرض <strong className="text-on-surface">{filtered.length}</strong> وحدة
            </p>
            <div className="relative">
              <select value={sort} onChange={e=>setSort(e.target.value)} className="h-10 pr-4 pl-10 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md appearance-none focus:outline-none cursor-pointer">
                {["الأحدث","السعر: الأقل أولاً","السعر: الأعلى أولاً","المساحة: الأكبر"].map(s=><option key={s}>{s}</option>)}
              </select>
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]">keyboard_arrow_down</span>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-[64px] text-outline mb-4">search_off</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">لا توجد وحدات مطابقة</h3>
              <button onClick={() => { setArea(""); setType(""); setFinish(""); setBudget(""); setSearch(""); }} className="mt-4 px-6 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all">إعادة ضبط الفلاتر</button>
            </div>
          ) : filtered.map(u => (
            <div key={u.id} className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row">
              {/* Image */}
              <div className="w-full sm:w-64 flex-shrink-0 overflow-hidden relative aspect-[4/3] sm:aspect-auto">
                <img src={u.img} alt={u.type} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent sm:bg-gradient-to-l" />
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold ${u.status==="متاح"?"bg-green-100 text-green-800":"bg-orange-100 text-orange-800"}`}>{u.status}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-[16px]">location_on</span>
                    {u.project} · {u.location}
                  </p>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-3">{u.type}</h3>

                  {/* Specs grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {[
                      {icon:"straighten",     label:"المساحة",   value:u.area+" م²"},
                      {icon:"layers",         label:"الدور",     value:"الدور "+u.floor},
                      {icon:"construction",   label:"التشطيب",   value:u.finishing},
                      ...(u.rooms>0?[{icon:"bed",label:"غرف النوم",value:u.rooms+" غرف"}]:[{icon:"business",label:"نوع",value:"تجاري"}]),
                    ].map(s=>(
                      <div key={s.label} className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low">
                        <span className="material-symbols-outlined text-secondary text-[18px]">{s.icon}</span>
                        <div>
                          <p className="font-label-sm text-label-sm text-on-surface-variant leading-none mb-0.5">{s.label}</p>
                          <p className="font-title-md text-title-md text-on-surface font-semibold text-[13px]">{s.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">السعر الإجمالي</p>
                    <p className="font-financial-numeric text-financial-numeric text-on-surface font-bold text-xl">{u.price} <span className="font-label-md text-label-md text-on-surface-variant">ج.م</span></p>
                    <p className="font-label-sm text-label-sm text-secondary">مقدم 10% = {Math.round(parseInt(u.price.replace(/,/g,""))*0.1).toLocaleString()} ج.م</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center hover:bg-secondary-container transition-all" title="حفظ">
                      <span className="material-symbols-outlined text-secondary text-[20px]">bookmark_border</span>
                    </button>
                    <Link to={"/properties/"+u.id} className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all">
                      تفاصيل الوحدة<span className="material-symbols-outlined text-[18px]">arrow_left_alt</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}