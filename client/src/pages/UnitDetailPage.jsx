import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const UNIT = {
  id:1, type:"شقة 3 غرف نوم فاخرة", project:"أبراج حورس الاستثمارية",
  location:"العاصمة الإدارية الجديدة — المنطقة التجارية CBD",
  area:210, floor:18, price:"5,200,000", finishing:"سوبر لوكس",
  status:"متاح", rooms:3, baths:2, parking:1,
  ref:"HR-APT-3BR-F18-210",
  desc:"وحدة سكنية فاخرة بمساحة 210 م² في الدور الثامن عشر من برج أ — أبراج حورس الاستثمارية، تطل على محور محمد بن زايد والمنطقة الخضراء مع تشطيب سوبر لوكس كامل وكيتشن ودش وبلكونة بانورامية.",
  features:["إطلالة بانورامية على المحور","تشطيب سوبر لوكس كامل","كيتشن مجهّز بالكامل","بلكونة واسعة 18 م²","مخزن خاص بالوحدة","موقف سيارة خاص"],
  imgs:[
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCPXkPc2KaLFiRV8RHJQhqfstMFlyq8dBqmhxBFocqKU8pB6mxFWJQdKJbYH0h6yCqBJIDjzC5o6OAIqz-VBvC3JV3QGJCDjOANvPEMNXi3tFdaBb0yqjj69JaxpBeTxXLhvRkJUWZS2kDxO4wXomD72DPIhFBq4E2pNChVNfhBIVa1b7UzWbxCxS0j0tQH04JF3VB_bdIPMeRNVw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCq7bUFXb2v6zfL4o9YIVqfH59ePMYGVqLBxMoJeZ69J6hHNcJMoFY9MZfD8S9t4jMiCAnzjdSK4GWJJ7h33o9hVQ3-5VCa0c_cFLiF_rkS_xQI9x3WjrKkRGP0YkFl4H3sxfJpHpDhpKXvBfJ5EoRSdlwL7ztcMiHBLjI1IsTz6fHENs4_Sf3Wep9VRi4nzH9Ei1gDl0RaLqz9M",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCgN7gJIFTUPxhAD01uGXvKqLy_wgWfGgp5D9GHJFmpqB5MHvTSPBi6XSF-LtmJj7zOq5N3kUBHE0ilfAzJOhgdHWRi_6S2RhCbJlILRhwMxD0EfBDjH8tN3Wg9fJd8sVH-ZX7Gi7r-RiSmUuaXFcGDhv1m_h5E0gYaxcqIoW_Mgg0lMunRqAP3KRBzDxRnnVdABB_1VoITNIHhY",
  ],
  plans:[
    {title:"نقدي", down:100, monthly:0, discount:10, note:"خصم 10% فوري"},
    {title:"5 سنوات", down:20, monthly:72000, discount:0, note:"20% مقدم + 60 قسط"},
    {title:"8 سنوات", down:15, monthly:53125, discount:0, note:"15% مقدم + 96 قسط"},
    {title:"10 سنوات", down:10, monthly:45833, discount:0, note:"10% مقدم + 120 قسط"},
  ],
};

const TABS = ["نظرة عامة","خطط السداد","مخطط الوحدة","الموقع"];

export default function UnitDetailPage() {
  const { id } = useParams();
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("نظرة عامة");
  const [selectedPlan, setSelectedPlan] = useState(1);

  return (
    <div className="flex flex-col w-full bg-surface">

      {/* Breadcrumb */}
      <div className="w-full bg-surface-container-low/70 py-3 border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
            <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <span className="text-outline-variant">/</span>
            <Link to="/properties" className="hover:text-primary transition-colors">الوحدات</Link>
            <span className="text-outline-variant">/</span>
            <span className="text-secondary font-title-md text-title-md font-semibold">{UNIT.type}</span>
          </div>
          <span className="hidden sm:block font-financial-numeric text-title-md text-primary font-bold">كود: {UNIT.ref}</span>
        </div>
      </div>

      {/* Unit Header */}
      <section className="w-full bg-surface-container-lowest shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 font-label-sm text-label-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />متاح للحجز الفوري
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px] text-secondary">apartment</span>{UNIT.project}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px] text-secondary">construction</span>{UNIT.finishing}
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">{UNIT.type}</h1>
            <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">pin_drop</span>{UNIT.location}
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              {[
                {icon:"straighten",label:"المساحة",value:UNIT.area+" م²"},
                {icon:"layers",label:"الدور",value:"الدور "+UNIT.floor},
                {icon:"bed",label:"غرف النوم",value:UNIT.rooms+" غرف"},
                {icon:"shower",label:"الحمامات",value:UNIT.baths+" حمامات"},
                {icon:"local_parking",label:"مواقف",value:UNIT.parking+" موقف"},
              ].map(s=>(
                <div key={s.label} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">{s.icon}</span>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant leading-none">{s.label}</p>
                    <p className="font-title-md text-title-md text-on-surface font-semibold">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price + CTAs */}
          <div className="flex flex-col gap-4 p-5 rounded-xl bg-surface-container-low min-w-[260px]">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant">السعر الإجمالي</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-financial-numeric text-headline-sm text-primary font-bold">{UNIT.price}</span>
                <span className="font-title-md text-title-md text-secondary font-semibold">ج.م</span>
              </div>
              <p className="font-label-sm text-label-sm text-secondary mt-1">أو ابدأ بـ 520,000 ج.م مقدم فقط</p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="w-full h-11 rounded-lg bg-secondary text-on-primary font-title-md text-title-md hover:bg-on-secondary-container transition-all shadow-md flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">event_available</span>احجز هذه الوحدة
              </button>
              <button className="w-full h-11 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface font-title-md text-title-md hover:bg-surface-container transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">call</span>اتصل بمستشار
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-surface-container">
            <img src={UNIT.imgs[activeImg]} alt="" className="w-full h-full object-cover transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            <div className="absolute bottom-4 left-4 flex gap-2">
              {UNIT.imgs.map((_,i)=>(
                <button key={i} onClick={()=>setActiveImg(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${activeImg===i?"bg-secondary-fixed scale-125":"bg-white/50"}`} />
              ))}
            </div>
          </div>
          <div className="grid grid-rows-2 gap-3">
            {UNIT.imgs.slice(1,3).map((img,i)=>(
              <div key={i} onClick={()=>setActiveImg(i+1)} className={`rounded-xl overflow-hidden cursor-pointer ring-2 transition-all ${activeImg===i+1?"ring-secondary":"ring-transparent hover:ring-secondary/50"}`}>
                <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-20 z-30 bg-surface border-b border-outline-variant/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-1 overflow-x-auto">
            {TABS.map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)} className={`px-5 py-4 font-title-md text-title-md whitespace-nowrap transition-all border-b-2 -mb-px ${activeTab===t?"border-secondary text-secondary":"border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant"}`}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full">

        {/* Overview */}
        {activeTab==="نظرة عامة" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-4">عن الوحدة</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">{UNIT.desc}</p>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold mb-4">مميزات الوحدة</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {UNIT.features.map(f=>(
                    <div key={f} className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
                      <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                      </div>
                      <span className="font-body-md text-body-md text-on-surface">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-lg overflow-hidden">
                <div className="bg-primary-container px-6 py-5">
                  <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold mb-1">احجز الآن</h3>
                  <p className="font-body-md text-body-md text-on-primary/75">أرسل طلب الحجز ويتم التواصل خلال 30 دقيقة</p>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  {["الاسم الكامل","رقم الهاتف","البريد الإلكتروني"].map((lbl,i)=>(
                    <div key={lbl} className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md text-on-surface-variant">{lbl}</label>
                      <div className="relative">
                        <input type={i===1?"tel":i===2?"email":"text"} placeholder={lbl} dir={i===1?"ltr":"rtl"} className="w-full h-11 pr-4 pl-10 rounded-lg bg-surface-container-low text-on-surface font-title-md text-title-md focus:outline-none focus:ring-1 focus:ring-secondary" />
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">{["person","call","mail"][i]}</span>
                      </div>
                    </div>
                  ))}
                  <button className="w-full h-11 rounded-lg bg-secondary text-on-primary font-title-md text-title-md hover:bg-on-secondary-container transition-all shadow-md flex items-center justify-center gap-2">
                    <span>إرسال طلب الحجز</span><span className="material-symbols-outlined text-[20px]">send</span>
                  </button>
                  <p className="text-center font-label-sm text-label-sm text-outline flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">lock</span>بياناتك محمية تماماً
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Plans */}
        {activeTab==="خطط السداد" && (
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-6">خطط السداد المتاحة لهذه الوحدة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {UNIT.plans.map((p,i)=>(
                <div key={p.title} onClick={()=>setSelectedPlan(i)} className={`p-5 rounded-2xl border cursor-pointer flex flex-col gap-3 transition-all hover:shadow-lg ${selectedPlan===i?"border-secondary bg-secondary-container/20 shadow-md":"border-outline-variant/30 bg-surface-container-lowest"}`}>
                  {i===1 && <span className="px-2 py-0.5 rounded-full bg-secondary text-on-primary font-label-sm text-label-sm font-bold w-fit">الأكثر اختياراً</span>}
                  <h3 className="font-title-lg text-title-lg text-on-surface font-bold">{p.title}</h3>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">المقدم</p>
                    <p className="font-financial-numeric text-financial-numeric text-primary font-bold text-2xl">{p.down}%</p>
                  </div>
                  {p.monthly>0 && (
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">القسط الشهري</p>
                      <p className="font-financial-numeric text-financial-numeric text-secondary font-bold">{p.monthly.toLocaleString()} ج.م</p>
                    </div>
                  )}
                  {p.discount>0 && <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-800 font-label-sm text-label-sm font-bold w-fit">خصم {p.discount}%</span>}
                  <p className="font-body-md text-body-md text-on-surface-variant text-[13px]">{p.note}</p>
                </div>
              ))}
            </div>
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <h3 className="font-title-lg text-title-lg text-on-surface font-bold mb-4">ملخص الخطة المختارة: {UNIT.plans[selectedPlan].title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {label:"سعر الوحدة",value:UNIT.price+" ج.م"},
                  {label:"نسبة المقدم",value:UNIT.plans[selectedPlan].down+"%"},
                  {label:"مبلغ المقدم",value:Math.round(5200000*UNIT.plans[selectedPlan].down/100).toLocaleString()+" ج.م"},
                  {label:"القسط الشهري",value:UNIT.plans[selectedPlan].monthly>0?UNIT.plans[selectedPlan].monthly.toLocaleString()+" ج.م":"—"},
                ].map(s=>(
                  <div key={s.label} className="p-4 rounded-xl bg-surface-container-lowest text-center">
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">{s.label}</p>
                    <p className="font-financial-numeric text-financial-numeric text-primary font-bold">{s.value}</p>
                  </div>
                ))}
              </div>
              <button className="mt-5 w-full sm:w-auto h-11 px-8 rounded-lg bg-secondary text-on-primary font-title-md text-title-md hover:bg-on-secondary-container transition-all shadow-md flex items-center justify-center gap-2">
                <span>احجز بهذه الخطة</span><span className="material-symbols-outlined text-[20px]">event_available</span>
              </button>
            </div>
          </div>
        )}

        {/* Floor Plan */}
        {activeTab==="مخطط الوحدة" && (
          <div className="flex flex-col items-center gap-6">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold self-start">مخطط الوحدة</h2>
            <div className="w-full max-w-2xl aspect-[4/3] rounded-2xl bg-surface-container-low border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-center p-8">
              <span className="material-symbols-outlined text-[64px] text-outline mb-4">architecture</span>
              <h3 className="font-title-lg text-title-lg text-on-surface font-bold mb-2">مخطط الوحدة (Floor Plan)</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">210 م² — 3 غرف + صالة + مطبخ + 2 حمام + بلكونة</p>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all">
                <span className="material-symbols-outlined text-[18px]">download</span>تحميل المخطط (PDF)
              </button>
            </div>
          </div>
        )}

        {/* Location */}
        {activeTab==="الموقع" && (
          <div className="flex flex-col gap-6">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">الموقع</h2>
            <div className="rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-low aspect-[16/7] flex items-center justify-center">
              <div className="text-center">
                <span className="material-symbols-outlined text-[64px] text-secondary mb-3 block">location_on</span>
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold mb-2">{UNIT.project}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{UNIT.location}</p>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg bg-primary text-on-primary font-title-md text-title-md hover:bg-primary-container transition-all">
                  <span className="material-symbols-outlined text-[18px]">map</span>فتح على خرائط Google
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}