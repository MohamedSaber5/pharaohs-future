import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const PROJECT = {
  id:1,
  name:"أبراج حورس الاستثمارية",
  nameEn:"Horus Investment Towers (CBD)",
  location:"محور محمد بن زايد في قلب مربع القاهرة - المنطقة التجارية CBD",
  status:"تحت الإنشاء (مرحلة البناء الهيكلي المتقدم)",
  ref:"HR-CBD-2025",
  delivery:"الربع الرابع من 2026",
  startPrice:7450000,
  progress:62,
  developer:"مستقبل الفراعنة للاستثمار والتطوير العقاري",
  license:"رقم ترخيص 842 / 2022",
  units:68,
  area:"32,000",
  floors:28,
  types:"شقق سكنية، مكاتب تجارية، وحدات تجارية",
  desc:"مشروع متعدد الاستخدامات يضم برجين شاهقين على مساحة 32,000 م² في قلب منطقة CBD بالعاصمة الإدارية، يجمع بين الوحدات السكنية الفاخرة والمكاتب التجارية بتصميم معماري استثنائي يستلهم من الحضارة الفرعونية المصرية.",
  imgs:[
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCPXkPc2KaLFiRV8RHJQhqfstMFlyq8dBqmhxBFocqKU8pB6mxFWJQdKJbYH0h6yCqBJIDjzC5o6OAIqz-VBvC3JV3QGJCDjOANvPEMNXi3tFdaBb0yqjj69JaxpBeTxXLhvRkJUWZS2kDxO4wXomD72DPIhFBq4E2pNChVNfhBIVa1b7UzWbxCxS0j0tQH04JF3VB_bdIPMeRNVw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCq7bUFXb2v6zfL4o9YIVqfH59ePMYGVqLBxMoJeZ69J6hHNcJMoFY9MZfD8S9t4jMiCAnzjdSK4GWJJ7h33o9hVQ3-5VCa0c_cFLiF_rkS_xQI9x3WjrKkRGP0YkFl4H3sxfJpHpDhpKXvBfJ5EoRSdlwL7ztcMiHBLjI1IsTz6fHENs4_Sf3Wep9VRi4nzH9Ei1gDl0RaLqz9M",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCgN7gJIFTUPxhAD01uGXvKqLy_wgWfGgp5D9GHJFmpqB5MHvTSPBi6XSF-LtmJj7zOq5N3kUBHE0ilfAzJOhgdHWRi_6S2RhCbJlILRhwMxD0EfBDjH8tN3Wg9fJd8sVH-ZX7Gi7r-RiSmUuaXFcGDhv1m_h5E0gYaxcqIoW_Mgg0lMunRqAP3KRBzDxRnnVdABB_1VoITNIHhY",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuATa4Oi0yS3kNRr9mqsKyGZ9KGvNs9D7VXdLif8ppgdccHMYATEOM3UtfCyjUGxEwIDJYKbwr9pTJZr3rx9eP6VbPxYArgcxur_UnXZTzZjEyA7NemszADlJ4BSmuNbNe6IfXr83qE-1nZhM5N-7qgB-awykAk1gA7dBBPxyNvTbc96PqW79x9iDlAPSOCYi5nDU5tidE3MgEL-rpTPl4shrCLB52IRNhgjy4FczXjTS34wph2WKzOHqw",
  ],
  amenities:[
    {icon:"pool",label:"حمام سباحة لا نهائي"},
    {icon:"fitness_center",label:"مركز لياقة عالمي"},
    {icon:"restaurant",label:"مطعم فندقي"},
    {icon:"local_parking",label:"جراج 3 طوابق"},
    {icon:"security",label:"أمن وحراسة 24/7"},
    {icon:"elevator",label:"12 مصعد ذكي"},
    {icon:"business_center",label:"مركز أعمال"},
    {icon:"spa",label:"مركز سبا فاخر"},
    {icon:"sports_tennis",label:"ملاعب رياضية"},
  ],
  plans:[
    {title:"خطة 1 — نقدي", down:30, years:0, monthly:0, desc:"خصم 10% عند الدفع النقدي الكامل"},
    {title:"خطة 2 — 5 سنوات", down:20, years:5, monthly:125833, desc:"20% مقدم والباقي على 60 شهراً"},
    {title:"خطة 3 — 8 سنوات", down:15, years:8, monthly:92187, desc:"15% مقدم والباقي على 96 شهراً"},
    {title:"خطة 4 — 10 سنوات", down:10, years:10, monthly:80417, desc:"10% مقدم والباقي على 120 شهراً"},
  ],
  units_list:[
    {id:1, type:"Office Space", area:"85 م²", floor:7,  price:"1,950,000", finishing:"Core & Shell", status:"متاح"},
    {id:2, type:"شقة 2 غرف",    area:"145 م²",floor:12, price:"3,850,000", finishing:"سوبر لوكس",    status:"متاح"},
    {id:3, type:"شقة 3 غرف",    area:"210 م²",floor:18, price:"5,200,000", finishing:"سوبر لوكس",    status:"محجوز"},
    {id:4, type:"بنتهاوس",       area:"380 م²",floor:25, price:"9,800,000", finishing:"تشطيب فندقي",  status:"متاح"},
    {id:5, type:"مكتب تنفيذي",   area:"320 م²",floor:22, price:"7,400,000", finishing:"Core & Shell", status:"متاح"},
  ],
};

const TABS = ["نظرة عامة","الوحدات المتاحة","المميزات والخدمات","خطط السداد","الموقع"];

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("نظرة عامة");

  return (
    <div className="flex flex-col w-full bg-surface">

      {/* ── Breadcrumb Bar ── */}
      <div className="w-full bg-surface-container-low/70 py-3 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
            <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <span className="text-outline-variant">/</span>
            <Link to="/projects" className="hover:text-primary transition-colors">مشروعاتنا</Link>
            <span className="text-outline-variant">/</span>
            <span className="text-secondary font-title-md text-title-md font-semibold">أبراج حورس الاستثمارية</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              قيد البيع (المرحلة الثانية)
            </span>
            <span className="font-financial-numeric text-title-md text-primary font-bold">كود المشروع: HR-CBD-2025</span>
          </div>
        </div>
      </div>

      {/* ── Project Header ── */}
      <section className="w-full bg-surface-container-lowest shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                رقم الترخيص 842 / 2022
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px] text-secondary">domain</span>
                العاصمة الإدارية — المنطقة التجارية CBD
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px] text-secondary">event_available</span>
                التسليم المتوقع: ديسمبر 2026
              </span>
            </div>
            <div className="flex items-baseline gap-4 mt-1">
              <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">{PROJECT.name}</h1>
              <span className="text-secondary font-title-lg text-title-lg font-medium hidden md:inline">({PROJECT.nameEn})</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">pin_drop</span>
              {PROJECT.location}
            </p>
          </div>

          {/* Price + CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4 p-5 rounded-xl bg-surface-container-low min-w-[280px]">
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant">الاستثمار المقترح تبدأ الوحدات من</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-financial-numeric text-headline-sm text-primary font-bold">7,450,000</span>
                <span className="font-title-md text-title-md text-secondary font-semibold">ج.م</span>
                <span className="font-label-sm text-label-sm text-outline">(أقل دفعة مقدم 8 ملايين — مقدم 10%)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full">
              <button className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-md bg-primary text-on-primary font-title-md text-title-md shadow-md hover:bg-primary-container transition-all">
                <span>استعرض الوحدات (68)</span>
                <span className="material-symbols-outlined text-[20px]">arrow_downward</span>
              </button>
              <button className="w-11 h-11 rounded-md bg-surface-container-lowest flex items-center justify-center hover:bg-surface-container transition-all shadow-sm text-secondary" title="تحميل الكتالوج">
                <span className="material-symbols-outlined text-[22px]">picture_as_pdf</span>
              </button>
              <button className="w-11 h-11 rounded-md bg-surface-container-lowest flex items-center justify-center hover:bg-surface-container transition-all shadow-sm text-secondary" title="حفظ المشروع">
                <span className="material-symbols-outlined text-[22px]">bookmark_border</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
          {/* Main image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-surface-container group">
            <img src={PROJECT.imgs[activeImg]} alt="صورة المشروع" className="w-full h-full object-cover transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <span className="px-3 py-1.5 rounded-full bg-primary/80 backdrop-blur-sm text-on-primary font-label-sm text-label-sm font-semibold">{activeImg+1} / {PROJECT.imgs.length}</span>
            </div>
          </div>
          {/* Thumbnails */}
          <div className="grid grid-rows-3 gap-3">
            {PROJECT.imgs.slice(1,4).map((img,i) => (
              <div key={i} onClick={() => setActiveImg(i+1)} className={`relative rounded-xl overflow-hidden cursor-pointer aspect-video lg:aspect-auto ring-2 transition-all ${activeImg===i+1?"ring-secondary":"ring-transparent hover:ring-secondary/50"}`}>
                <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
        {/* Thumbnail strip */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
          {PROJECT.imgs.map((img,i) => (
            <div key={i} onClick={() => setActiveImg(i)} className={`w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer ring-2 transition-all ${activeImg===i?"ring-secondary":"ring-transparent hover:ring-secondary/50"}`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Tabs ── */}
      <div className="sticky top-20 z-30 bg-surface border-b border-outline-variant/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-1 overflow-x-auto">
            {TABS.map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-5 py-4 font-title-md text-title-md whitespace-nowrap transition-all border-b-2 -mb-px ${activeTab===t?"border-secondary text-secondary":"border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full">

        {/* Overview Tab */}
        {activeTab === "نظرة عامة" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Description */}
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-4">عن المشروع</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">{PROJECT.desc}</p>
              </div>

              {/* Key specs */}
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold mb-4">المواصفات الرئيسية</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    {icon:"straighten",     label:"المساحة الإجمالية", value:PROJECT.area+" م²"},
                    {icon:"apartment",      label:"عدد الأدوار",        value:PROJECT.floors+" دور"},
                    {icon:"holiday_village",label:"إجمالي الوحدات",    value:PROJECT.units+" وحدة"},
                    {icon:"construction",   label:"نوع التطوير",        value:"متعدد الاستخدامات"},
                    {icon:"event_available",label:"موعد التسليم",       value:PROJECT.delivery},
                    {icon:"verified",       label:"الترخيص",            value:PROJECT.license},
                  ].map(s => (
                    <div key={s.label} className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                      <span className="material-symbols-outlined text-secondary text-[22px] mb-2 block">{s.icon}</span>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">{s.label}</p>
                      <p className="font-title-md text-title-md text-on-surface font-semibold">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/30">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-title-lg text-title-lg text-on-surface font-bold">نسبة الإنجاز</h3>
                  <span className="font-financial-numeric text-financial-numeric text-secondary font-bold">{PROJECT.progress}%</span>
                </div>
                <div className="h-3 bg-surface-container rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-gradient-to-r from-secondary to-secondary-fixed rounded-full transition-all duration-1000" style={{ width: PROJECT.progress+"%" }} />
                </div>
                <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                  <span>بداية الإنشاء: يناير 2023</span>
                  <span>التسليم المتوقع: ديسمبر 2026</span>
                </div>
              </div>
            </div>

            {/* Sidebar — Inquiry Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-lg overflow-hidden">
                <div className="bg-primary-container px-6 py-5">
                  <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold mb-1">استفسر الآن</h3>
                  <p className="font-body-md text-body-md text-on-primary/75">يرد عليك مستشارنا خلال 30 دقيقة</p>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant">الاسم الكامل</label>
                    <div className="relative"><input placeholder="اسمك الكامل" className="w-full h-11 pr-4 pl-10 rounded-lg bg-surface-container-low text-on-surface font-title-md text-title-md focus:outline-none focus:ring-1 focus:ring-secondary" /><span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">person</span></div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant">رقم الهاتف</label>
                    <div className="relative"><input type="tel" placeholder="+20 100 000 0000" dir="ltr" className="w-full h-11 pr-4 pl-10 rounded-lg bg-surface-container-low text-on-surface font-financial-numeric text-financial-numeric text-right focus:outline-none focus:ring-1 focus:ring-secondary" /><span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">call</span></div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant">الميزانية التقريبية</label>
                    <div className="relative">
                      <select className="w-full h-11 pr-4 pl-10 rounded-lg bg-surface-container-low text-on-surface font-title-md text-title-md appearance-none focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer">
                        <option>حدّد الميزانية</option>
                        <option>3-6 مليون</option>
                        <option>6-10 مليون</option>
                        <option>+10 مليون</option>
                      </select>
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]">keyboard_arrow_down</span>
                    </div>
                  </div>
                  <button className="w-full h-11 rounded-lg bg-secondary text-on-primary font-title-md text-title-md hover:bg-on-secondary-container transition-all shadow-md flex items-center justify-center gap-2">
                    <span>إرسال الاستفسار</span>
                    <span className="material-symbols-outlined text-[20px]">send</span>
                  </button>
                  <div className="flex items-center gap-2 justify-center font-label-sm text-label-sm text-outline">
                    <span className="material-symbols-outlined text-[16px]">lock</span>بياناتك محمية تماماً
                  </div>

                  {/* Developer info */}
                  <div className="pt-4 border-t border-outline-variant/30">
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-2">المطوّر العقاري</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-secondary-fixed">
                        <span className="material-symbols-outlined text-[20px]">account_balance</span>
                      </div>
                      <div>
                        <p className="font-title-md text-title-md text-on-surface font-bold leading-tight">مستقبل الفراعنة</p>
                        <p className="font-label-sm text-label-sm text-on-surface-variant">+25 عاماً من الريادة</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Units Tab */}
        {activeTab === "الوحدات المتاحة" && (
          <div id="inventory-section" className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">{PROJECT.units} وحدة — {PROJECT.name}</h2>
              <Link to="/properties" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-outline-variant text-on-surface-variant font-title-md text-title-md hover:bg-surface-container transition-all text-sm">
                جميع الوحدات<span className="material-symbols-outlined text-[18px]">arrow_left_alt</span>
              </Link>
            </div>
            {PROJECT.units_list.map(u => (
              <div key={u.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-secondary text-[22px]">apartment</span>
                  </div>
                  <div>
                    <h3 className="font-title-lg text-title-lg text-on-surface font-bold">{u.type}</h3>
                    <div className="flex items-center gap-4 mt-1 font-label-md text-label-md text-on-surface-variant">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-secondary text-[16px]">straighten</span>{u.area}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-secondary text-[16px]">layers</span>الدور {u.floor}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-secondary text-[16px]">construction</span>{u.finishing}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm font-bold ${u.status==="متاح"?"bg-green-100 text-green-800":"bg-orange-100 text-orange-800"}`}>{u.status}</span>
                  <div className="text-left">
                    <p className="font-label-sm text-label-sm text-on-surface-variant">السعر</p>
                    <p className="font-financial-numeric text-financial-numeric text-on-surface font-bold">{u.price} <span className="font-label-md text-on-surface-variant">ج.م</span></p>
                  </div>
                  <Link to={"/properties/"+u.id} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all text-sm whitespace-nowrap">
                    تفاصيل<span className="material-symbols-outlined text-[16px]">arrow_left_alt</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Amenities Tab */}
        {activeTab === "المميزات والخدمات" && (
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-6">المميزات والخدمات</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROJECT.amenities.map(a => (
                <div key={a.label} className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 hover:border-secondary/30 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center flex-shrink-0 text-secondary">
                    <span className="material-symbols-outlined text-[24px]">{a.icon}</span>
                  </div>
                  <span className="font-title-md text-title-md text-on-surface font-semibold">{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Plans Tab */}
        {activeTab === "خطط السداد" && (
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-6">خطط السداد المتاحة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROJECT.plans.map((plan, i) => (
                <div key={plan.title} className={`p-5 rounded-2xl border flex flex-col gap-4 transition-all hover:shadow-lg ${i===1?"border-secondary bg-secondary-container/20":"border-outline-variant/30 bg-surface-container-lowest"}`}>
                  {i===1 && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-on-primary font-label-sm text-label-sm font-bold w-fit">الأكثر اختياراً</span>}
                  <h3 className="font-title-lg text-title-lg text-on-surface font-bold">{plan.title}</h3>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">المقدم</p>
                    <p className="font-financial-numeric text-financial-numeric text-primary font-bold text-2xl">{plan.down}%</p>
                  </div>
                  {plan.years > 0 && (
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">القسط الشهري (تقريبي)</p>
                      <p className="font-financial-numeric text-financial-numeric text-secondary font-bold">{plan.monthly.toLocaleString()} ج.م</p>
                    </div>
                  )}
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-[13px]">{plan.desc}</p>
                  <button className="mt-auto w-full h-10 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all text-sm">
                    اختر هذه الخطة
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Location Tab */}
        {activeTab === "الموقع" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">الموقع الجغرافي</h2>
            <div className="rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-low aspect-[16/7] flex items-center justify-center">
              <div className="text-center">
                <span className="material-symbols-outlined text-[64px] text-secondary mb-3 block">location_on</span>
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold mb-2">العاصمة الإدارية الجديدة</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">محور محمد بن زايد — المنطقة التجارية المركزية CBD</p>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg bg-primary text-on-primary font-title-md text-title-md hover:bg-primary-container transition-all">
                  <span className="material-symbols-outlined text-[18px]">map</span>فتح على خرائط Google
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[{icon:"directions_car",label:"القاهرة الجديدة",val:"35 دقيقة"},{icon:"flight",label:"مطار القاهرة",val:"40 دقيقة"},{icon:"local_mall",label:"مول الصعيد",val:"10 دقائق"},{icon:"school",label:"الجامعة الأمريكية",val:"15 دقيقة"}].map(l => (
                <div key={l.label} className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-center">
                  <span className="material-symbols-outlined text-secondary text-[24px] mb-2 block">{l.icon}</span>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">{l.label}</p>
                  <p className="font-title-md text-title-md text-on-surface font-bold">{l.val}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
