import { useEffect, useRef } from 'react';

/**
 * PropertiesPage
 * Auto-generated from Stitch HTML design — preserves exact Tailwind classes & layout
 */
const PropertiesPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Re-run any inline scripts from Stitch
    const scripts = containerRef.current?.querySelectorAll('script');
    scripts?.forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }, []);

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

const html = `<header className="fixed top-0 w-full z-50 bg-primary-container shadow-[0_4px_20px_-4px_rgba(16,36,58,0.25)]"><div className="h-20 w-full px-margin flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-lg"><a className="flex items-center gap-space-sm cursor-pointer" data-path="home" href="#"><img alt="شعار مستقبل الفراعنة" className="w-9 h-9 rounded-full object-cover ring-1 ring-secondary-fixed/40" src="https://lh3.googleusercontent.com/aida/AEtjO1VWx6jKJknNE_QHLGa2wu5RINLHC-tKjGblBP8IV-4NQjOVIGwFAC7lqrZ7kLJ0Z8I_sd0DxnAiL7bB_nTIrRbp2AxnBlN1-z9QXsIHyyRIoxNJ1p8pBrxJ5JaMv2PBxrvYQ2qmybfZmDQFu9VinTWK60x1eGvoYztE593XMsNleq-G0VSoY-0u_DKSHikfzMYlirkYn5shbwPwY6fSpc7TcYQC2aY5qmH1WRyG-S-K3ihr6iqUdKTH0Ek"/><div className="flex flex-col"><span className="font-title-lg text-title-lg text-on-primary leading-tight font-bold">مستقبل الفراعنة</span><span className="font-label-sm text-label-sm text-secondary-fixed leading-tight">للاستثمار والتطوير العقاري</span></div></a></div><nav className="hidden lg:flex items-center gap-space-lg" data-active-classes="text-secondary-fixed border-b-2 border-secondary font-bold"><a className="text-on-primary-container hover:text-on-primary font-title-md text-title-md transition-colors py-space-xs" data-path="home" href="#">الرئيسية</a><a className="text-on-primary-container hover:text-on-primary font-title-md text-title-md transition-colors py-space-xs" data-path="projects" href="#">مشروعاتنا</a><a className="text-on-primary-container hover:text-on-primary font-title-md text-title-md transition-colors py-space-xs" data-path="available-units" href="#">الوحدات المتاحة</a><a className="text-on-primary-container hover:text-on-primary font-title-md text-title-md transition-colors py-space-xs" data-path="about-us" href="#">من نحن</a><a className="text-on-primary-container hover:text-on-primary font-title-md text-title-md transition-colors py-space-xs" data-path="contact" href="#">تواصل معنا</a></nav><div className="flex items-center gap-space-sm"><div className="flex items-center gap-space-xs bg-primary/50 px-space-sm py-space-xs rounded-lg text-secondary-fixed"><span className="material-symbols-outlined text-base">payments</span><span className="font-label-md text-label-md font-bold">ج.م EGP</span></div><a className="flex items-center gap-space-xs bg-secondary text-on-secondary hover:bg-secondary/90 px-space-md py-space-xs rounded-lg font-label-md text-label-md font-semibold transition-all shadow-sm" data-path="auth" href="#"><span className="material-symbols-outlined text-base">lock_open</span><span>تسجيل الدخول / إنشاء حساب</span></a></div></div></header><main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">
<!-- Top Command & Filter Ribbon -->
<section className="w-full bg-surface-container-low px-margin py-space-lg shadow-sm">
<div className="max-w-[1440px] mx-auto flex flex-col gap-space-md">
<!-- Breadcrumb Navigation -->
<nav className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
<a className="hover:text-primary transition-colors flex items-center gap-1" href="#">
<span className="material-symbols-outlined text-sm">home</span>
<span>الرئيسية</span>
</a>
<span className="material-symbols-outlined text-xs">arrow_back_ios</span>
<span className="text-secondary font-semibold">الوحدات المتاحة</span>
</nav>
<!-- Section Title & Narrative -->
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div>
<h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
            تصفح وبحث الوحدات المتاحة
          </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-1 max-w-2xl">
            استكشف أرقى الشقق السكنية، الدوبلكس، والبنتهاوس في مشروعاتنا الاستثمارية الكبرى في العاصمة الإدارية، الساحل الشمالي، والشيخ زايد.
          </p>
</div>
<!-- Metric Counter Ribbon -->
<div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-sm rounded-lg shadow-sm self-start md:self-auto">
<div className="flex items-center gap-1 text-secondary">
<span className="material-symbols-outlined text-xl">domain_verification</span>
<span className="font-financial-numeric text-financial-numeric text-primary">34</span>
</div>
<span className="font-label-md text-label-md text-on-surface-variant">وحدة سكنية وتجارية متاحة للتعاقد الفوري</span>
</div>
</div>
<!-- Quick Search Bar & Action -->
<div className="w-full bg-surface-container-lowest p-space-xs rounded-xl shadow-md flex flex-col sm:flex-row items-center gap-space-xs">
<div className="flex-1 w-full flex items-center px-space-sm gap-space-xs text-on-surface-variant">
<span className="material-symbols-outlined text-secondary text-2xl">search</span>
<input className="w-full py-space-sm px-space-xs text-on-surface font-body-md text-body-md outline-none bg-transparent placeholder:text-outline-variant text-right" placeholder="ابحث برقم الوحدة مثل TEL-V09 أو اسم المشروع، البرج، أو نوع العقار..." type="text"/>
</div>
<div className="w-full sm:w-auto flex items-center gap-space-xs">
<button className="w-full sm:w-auto bg-primary hover:bg-primary-container text-on-primary px-space-lg py-space-sm rounded-lg font-title-md text-title-md font-semibold transition-all flex items-center justify-center gap-space-xs shadow-sm">
<span>تحديث النتائج</span>
<span className="material-symbols-outlined text-base">filter_list</span>
</button>
</div>
</div>
<!-- Active Filter Badges & View Switches -->
<div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
<div className="flex flex-wrap items-center gap-space-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant ml-space-xs">الفلاتر المطبقة:</span>
<div className="inline-flex items-center gap-1 bg-surface-container-highest px-space-sm py-0.5 rounded-full text-primary font-label-md text-label-md">
<span className="w-2 h-2 rounded-full bg-emerald-600"></span>
<span>المتاح فقط (34 وحدة)</span>
<button className="hover:text-error transition-colors flex items-center mr-1">
<span className="material-symbols-outlined text-xs">close</span>
</button>
</div>
<div className="inline-flex items-center gap-1 bg-surface-container-highest px-space-sm py-0.5 rounded-full text-primary font-label-md text-label-md">
<span>العاصمة الإدارية الجديدة</span>
<button className="hover:text-error transition-colors flex items-center mr-1">
<span className="material-symbols-outlined text-xs">close</span>
</button>
</div>
<div className="inline-flex items-center gap-1 bg-surface-container-highest px-space-sm py-0.5 rounded-full text-primary font-label-md text-label-md">
<span>3 غرف فأكثر</span>
<button className="hover:text-error transition-colors flex items-center mr-1">
<span className="material-symbols-outlined text-xs">close</span>
</button>
</div>
<button className="text-secondary hover:text-secondary-fixed-variant font-label-md text-label-md font-semibold underline underline-offset-4 mr-2">
            مسح الكل
          </button>
</div>
<!-- Controls: Sorter + View Mode -->
<div className="flex items-center gap-space-md">
<div className="flex items-center gap-space-xs">
<label className="font-label-md text-label-md text-on-surface-variant">الترتيب:</label>
<select className="bg-surface-container-lowest text-primary font-title-md text-title-md py-1.5 px-space-sm rounded-lg outline-none cursor-pointer shadow-sm">
<option selected="">الأحدث طرحاً للاستثمار</option>
<option>السعر: من الأقل للأعلى</option>
<option>السعر: من الأعلى للأقل</option>
<option>المساحة: الأكبر أولاً</option>
<option>الأقرب للتسليم التعاقدي</option>
</select>
</div>
<!-- Grid vs Table View -->
<div className="hidden sm:flex items-center bg-surface-container-lowest p-1 rounded-lg shadow-sm">
<button className="p-1.5 rounded-md bg-primary text-on-primary shadow-sm" title="عرض بطاقات">
<span className="material-symbols-outlined text-lg block">grid_view</span>
</button>
<button className="p-1.5 rounded-md text-on-surface-variant hover:text-primary transition-colors" title="عرض جدول تفصيلي">
<span className="material-symbols-outlined text-lg block">table_rows</span>
</button>
</div>
</div>
</div>
</div>
</section>
<!-- Main Content Layout (Sidebar + Results Mosaic) -->
<div className="w-full px-margin py-space-xl">
<div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-space-xl items-start">
<!-- ================= FILTER SIDEBAR (RIGHT ON RTL) ================= -->
<aside className="w-full lg:w-[320px] shrink-0 bg-surface-container-lowest p-space-lg rounded-xl shadow-md flex flex-col gap-space-lg sticky top-24">
<div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
<div className="flex items-center gap-space-xs text-primary font-title-lg text-title-lg font-bold">
<span className="material-symbols-outlined text-secondary">tune</span>
<span>تصفية متقدمة</span>
</div>
<button className="text-on-surface-variant hover:text-secondary font-label-md text-label-md transition-colors">
            إعادة ضبط
          </button>
</div>
<!-- Availability Status Radios -->
<div className="flex flex-col gap-space-xs">
<label className="font-title-md text-title-md text-primary font-semibold flex items-center justify-between">
<span>حالة توفر الوحدة</span>
<span className="font-label-sm text-label-sm text-secondary font-normal">مباشر</span>
</label>
<div className="flex flex-col gap-space-xs mt-1">
<label className="flex items-center gap-space-sm p-space-xs rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors bg-surface-container-low/60">
<input checked="" className="accent-secondary w-4 h-4 cursor-pointer" name="availability" type="radio"/>
<span className="flex-1 font-body-md text-body-md font-medium text-primary">المتاحة فقط (للحجز الفوري)</span>
<span className="font-financial-numeric text-label-md text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">34</span>
</label>
<label className="flex items-center gap-space-sm p-space-xs rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors">
<input className="accent-secondary w-4 h-4 cursor-pointer" name="availability" type="radio"/>
<span className="flex-1 font-body-md text-body-md text-on-surface-variant">قيد الحجز المبدئي (مهلة بنكية)</span>
<span className="font-financial-numeric text-label-md text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">6</span>
</label>
<label className="flex items-center gap-space-sm p-space-xs rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors">
<input className="accent-secondary w-4 h-4 cursor-pointer" name="availability" type="radio"/>
<span className="flex-1 font-body-md text-body-md text-on-surface-variant">عرض الأرشيف (بما في ذلك المباع)</span>
<span className="font-financial-numeric text-label-md text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">112</span>
</label>
</div>
</div>
<!-- Development Projects Multi-Select -->
<div className="flex flex-col gap-space-xs">
<label className="font-title-md text-title-md text-primary font-semibold">المشروع الاستثماري</label>
<div className="flex flex-col gap-space-xs mt-1">
<label className="flex items-center gap-space-sm cursor-pointer p-1">
<input checked="" className="accent-secondary w-4 h-4 rounded" type="checkbox"/>
<span className="flex-1 font-body-md text-body-md text-primary">أبراج حورس المركزية CBD (العاصمة)</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer p-1">
<input checked="" className="accent-secondary w-4 h-4 rounded" type="checkbox"/>
<span className="flex-1 font-body-md text-body-md text-primary">تلال إيزيس السكنية (الشيخ زايد)</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer p-1">
<input className="accent-secondary w-4 h-4 rounded" type="checkbox"/>
<span className="flex-1 font-body-md text-body-md text-on-surface-variant">لوتس لاجون ريزيدنس (الساحل الشمالي)</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer p-1">
<input className="accent-secondary w-4 h-4 rounded" type="checkbox"/>
<span className="flex-1 font-body-md text-body-md text-on-surface-variant">الفراعنة جرينز (القاهرة الجديدة - التجمع)</span>
</label>
</div>
</div>
<!-- Property Typology -->
<div className="flex flex-col gap-space-xs">
<label className="font-title-md text-title-md text-primary font-semibold">نمط الوحدة</label>
<div className="grid grid-cols-2 gap-space-xs mt-1">
<button className="py-space-xs px-space-sm rounded-lg text-center font-label-md text-label-md bg-primary text-on-primary font-medium">
              شقة فندقية
            </button>
<button className="py-space-xs px-space-sm rounded-lg text-center font-label-md text-label-md bg-surface-container-low hover:bg-surface-container text-on-surface font-medium transition-colors">
              بنتهاوس ملكي
            </button>
<button className="py-space-xs px-space-sm rounded-lg text-center font-label-md text-label-md bg-surface-container-low hover:bg-surface-container text-on-surface font-medium transition-colors">
              دوبلكس بحديقة
            </button>
<button className="py-space-xs px-space-sm rounded-lg text-center font-label-md text-label-md bg-surface-container-low hover:bg-surface-container text-on-surface font-medium transition-colors">
              فيلا مستقلة
            </button>
</div>
</div>
<!-- Bedroom Selector Pills -->
<div className="flex flex-col gap-space-xs">
<label className="font-title-md text-title-md text-primary font-semibold">عدد الغرف الرئيسية</label>
<div className="grid grid-cols-5 gap-1 mt-1">
<button className="py-space-xs rounded-lg text-center font-title-md text-title-md bg-surface-container-low hover:bg-surface-container text-on-surface">1</button>
<button className="py-space-xs rounded-lg text-center font-title-md text-title-md bg-surface-container-low hover:bg-surface-container text-on-surface">2</button>
<button className="py-space-xs rounded-lg text-center font-title-md text-title-md bg-primary text-on-primary font-bold">3</button>
<button className="py-space-xs rounded-lg text-center font-title-md text-title-md bg-primary text-on-primary font-bold">4</button>
<button className="py-space-xs rounded-lg text-center font-title-md text-title-md bg-surface-container-low hover:bg-surface-container text-on-surface">+5</button>
</div>
</div>
<!-- Price Range Slider & Inputs -->
<div className="flex flex-col gap-space-xs">
<div className="flex justify-between items-center">
<label className="font-title-md text-title-md text-primary font-semibold">النطاق السعري الإجمالي</label>
<span className="font-label-sm text-label-sm text-secondary font-bold">ج.م EGP</span>
</div>
<div className="flex items-center gap-space-xs mt-1">
<div className="flex-1 bg-surface-container-low p-space-xs rounded-lg">
<span className="block font-label-sm text-label-sm text-on-surface-variant">الحد الأدنى</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">5,000,000</span>
</div>
<span className="text-on-surface-variant font-bold">-</span>
<div className="flex-1 bg-surface-container-low p-space-xs rounded-lg">
<span className="block font-label-sm text-label-sm text-on-surface-variant">الحد الأقصى</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">35,000,000</span>
</div>
</div>
<input className="w-full accent-secondary mt-2 cursor-pointer" max="40000000" min="5000000" type="range" value="35000000"/>
</div>
<!-- Floor & Area Filters -->
<div className="flex flex-col gap-space-xs">
<label className="font-title-md text-title-md text-primary font-semibold">المساحة التعاقدية (م²)</label>
<div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
<span>من 90 م²</span>
<span>إلى 500 م²</span>
</div>
<input className="w-full accent-secondary cursor-pointer" max="500" min="90" type="range" value="450"/>
</div>
<!-- Payment Plan Structure -->
<div className="flex flex-col gap-space-xs">
<label className="font-title-md text-title-md text-primary font-semibold">تسهيلات السداد</label>
<select className="w-full bg-surface-container-low text-primary font-body-md text-body-md p-space-sm rounded-lg outline-none cursor-pointer">
<option>جميع خطط التقسيط المرنة</option>
<option>مقدم 5% مع تقسيط حتى 7 سنوات</option>
<option>مقدم 10% مع تقسيط حتى 8 سنوات</option>
<option>مقدم 15% مع تقسيط ممتد حتى 10 سنوات</option>
<option>سداد نقدي (خصم استثماري 25%)</option>
</select>
</div>
<!-- Filter Apply Action -->
<button className="w-full bg-primary hover:bg-primary-container text-on-primary py-space-sm rounded-lg font-title-md text-title-md font-semibold transition-all shadow-md flex items-center justify-center gap-space-xs mt-space-sm">
<span className="material-symbols-outlined text-xl">done_all</span>
<span>تطبيق الفلاتر (34 وحدة)</span>
</button>
</aside>
<!-- ================= RESULTS MOSAIC (LEFT ON RTL) ================= -->
<main className="flex-1 w-full flex flex-col gap-space-lg">
<!-- Informational Banner -->
<div className="w-full bg-primary-container text-on-primary p-space-md rounded-xl flex items-center justify-between gap-space-md shadow-sm">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-primary/80 flex items-center justify-center text-secondary-fixed shrink-0">
<span className="material-symbols-outlined text-2xl">verified</span>
</div>
<div>
<h2 className="font-title-lg text-title-lg font-bold">حجز بنكي رسمي ومباشر</h2>
<p className="font-body-md text-body-md text-on-primary-container">كافة الوحدات المدرجة خاضعة لأسعار الطرح الرسمي، مع إمكانية قفل الحجز ببطاقة الائتمان أو التحويل المصرفي المباشر بحساب الضمان (Escrow Account).</p>
</div>
</div>
<div className="hidden md:flex flex-col items-end shrink-0">
<span className="font-label-sm text-label-sm text-secondary-fixed">تحديث الأسعار</span>
<span className="font-financial-numeric text-financial-numeric text-white">اليوم 10:00 ص</span>
</div>
</div>
<!-- Real Estate Units Card Grid -->
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
<!-- UNIT 1: Penthouse Horus (AVAILABLE) -->
<article className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl group">
<div className="relative h-64 w-full overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Modern architectural luxury penthouse terrace at sunset overlooking a scenic lake with glass balustrades, lounge chairs, warm atmospheric recessed lighting, beige travertine stone facade in an Egyptian smart luxury development." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAknH1Gh3euMGlmIWqI-RATnbw_5jl1UCX-nJCqHXgFgvGkIDubjMBjq6mXOuogtDIOTHt6CniL8fwb-2BgOE8H1-zqqvGOLa9f76TONL81btfmKpiSWJ1Ix1STW4wOuHCYd65ThiyC07WpDDh1g4ZFaW0bC7s3JN8EfBlsdb8huR4ildUfbHbN8vqzF-Kir2HmanXXyPHZC2S8cfSbPNQysJvVEv2GMrLvHFN6zsYgeKKqCPJsV87LeA"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
<!-- Badges Container -->
<div className="absolute top-space-sm right-space-sm flex flex-col gap-1 items-start">
<span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full font-label-md text-label-md font-semibold bg-emerald-500/95 text-white shadow-sm backdrop-blur-sm">
<span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
<span>متاح للحجز الفوري</span>
</span>
<span className="px-space-xs py-0.5 rounded bg-primary/90 text-secondary-fixed font-label-sm text-label-sm">
                  كود: HOR-PH01
                </span>
</div>
<!-- Floor Indicator Overlay -->
<div className="absolute bottom-space-sm right-space-sm text-white">
<span className="font-label-sm text-label-sm text-secondary-fixed block">أبراج حورس CBD - العاصمة</span>
<h3 className="font-title-lg text-title-lg font-bold leading-tight">بنتهاوس ملكي بانوراما النهر الأخضر</h3>
</div>
</div>
<!-- Card Body / Features -->
<div className="p-space-md flex-1 flex flex-col justify-between gap-space-md">
<div className="grid grid-cols-3 gap-space-xs py-space-xs border-b border-surface-container text-center">
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-xl">straighten</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">380 م²</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">المساحة الإجمالية</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-xl">bed</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">4 غرف نوم</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">+ جناح ماستر</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-xl">bathtub</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">5 حمامات</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">طابق علوي 34</span>
</div>
</div>
<!-- Financial Breakdown -->
<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1">
<div className="flex items-baseline justify-between">
<span className="font-label-md text-label-md text-on-surface-variant">السعر الإجمالي للوحدة:</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-headline-sm text-primary font-bold">18,500,000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">ج.م</span>
</div>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1 border-t border-surface-container">
<span>مقدم 10% (1,850,000 ج.م)</span>
<span className="text-secondary font-semibold">قسط ربع سنوي: 518,000 ج.م / 8 سنوات</span>
</div>
</div>
<!-- CTAs -->
<div className="flex items-center gap-space-xs pt-space-xs">
<button className="flex-1 bg-primary hover:bg-secondary text-on-primary py-space-sm px-space-md rounded-lg font-title-md text-title-md font-semibold transition-all duration-300 flex items-center justify-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-base">shopping_cart_checkout</span>
<span>احجز الوحدة الآن</span>
</button>
<button className="bg-surface-container-high hover:bg-surface-container text-primary p-space-sm rounded-lg transition-colors" title="عرض التفاصيل والمخطط الهندسي">
<span className="material-symbols-outlined text-xl block">visibility</span>
</button>
</div>
</div>
</article>
<!-- UNIT 2: Sky Villa ISIS Hills (AVAILABLE) -->
<article className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl group">
<div className="relative h-64 w-full overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Magnificent luxury modern Egyptian villa with infinity swimming pool, palm trees, outdoor fire pit, evening glow under mountain view, limestone architecture with floor-to-ceiling glass windows." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYeXuWB4C8sg-rMdS9aSD54MMW6L6NaIwIt8Evbumo4wBRRtCGGDLdb3GMzOpvWYmFgMeaHiUkj0f7idS9ATlgGqSHTrzoY-MmlF2_ygDxYykBQHRAhPed5q_l-aSrO0khm0fDalgm8RvaOBzndfUlVEk2CyBrrTbXyoFB9Vq4M8bsC-i1Ou79jEajcS_m4WWvVxsCaBPsdwZX5C_tWUocEBek3RXIlehQlRh3_aqP79i7t1wxIFYiTw"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
<div className="absolute top-space-sm right-space-sm flex flex-col gap-1 items-start">
<span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full font-label-md text-label-md font-semibold bg-emerald-500/95 text-white shadow-sm backdrop-blur-sm">
<span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
<span>متاح للحجز الفوري</span>
</span>
<span className="px-space-xs py-0.5 rounded bg-primary/90 text-secondary-fixed font-label-sm text-label-sm">
                  كود: TEL-V09
                </span>
</div>
<div className="absolute bottom-space-sm right-space-sm text-white">
<span className="font-label-sm text-label-sm text-secondary-fixed block">تلال إيزيس - الشيخ زايد</span>
<h3 className="font-title-lg text-title-lg font-bold leading-tight">فيلا مستقلة Sky Villa مع حديقة خاصة</h3>
</div>
</div>
<div className="p-space-md flex-1 flex flex-col justify-between gap-space-md">
<div className="grid grid-cols-3 gap-space-xs py-space-xs border-b border-surface-container text-center">
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-xl">deck</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">450 م²</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">+ حديقة 220 م²</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-xl">king_bed</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">5 أجنحة</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">غرفة سائق ومربية</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-xl">bathtub</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">6 حمامات</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">حمام سباحة خاص</span>
</div>
</div>
<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1">
<div className="flex items-baseline justify-between">
<span className="font-label-md text-label-md text-on-surface-variant">السعر الإجمالي للوحدة:</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-headline-sm text-primary font-bold">29,200,000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">ج.م</span>
</div>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1 border-t border-surface-container">
<span>مقدم 10% (2,920,000 ج.م)</span>
<span className="text-secondary font-semibold">تقسيط مريح على 8 سنوات متساوية</span>
</div>
</div>
<div className="flex items-center gap-space-xs pt-space-xs">
<button className="flex-1 bg-primary hover:bg-secondary text-on-primary py-space-sm px-space-md rounded-lg font-title-md text-title-md font-semibold transition-all duration-300 flex items-center justify-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-base">shopping_cart_checkout</span>
<span>احجز الوحدة الآن</span>
</button>
<button className="bg-surface-container-high hover:bg-surface-container text-primary p-space-sm rounded-lg transition-colors" title="عرض التفاصيل والمخطط الهندسي">
<span className="material-symbols-outlined text-xl block">visibility</span>
</button>
</div>
</div>
</article>
<!-- UNIT 3: Lotus Lagoon Duplex (AVAILABLE) -->
<article className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl group">
<div className="relative h-64 w-full overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Prestigious waterfront duplex in a beach resort compound with crystal clear lagoon, palm trees, sun umbrellas, clean Egyptian coastal architecture in soft tones of sand and white." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkzDCBTLmninAZCzc7GTaCbk5aiLCQ0r_O8RNSGOfdMnbgp1yytkD6stTcrb12lQlJw8CLJxFrEEdz_OGH_oF-VOeP1LKOpjglP81juhilvXKJrgSA90QXX5m9E_7xJDrwh7yBH_RZUV5OhFkMe6k_jppishwQ5ubpe0SMJu-w7lWJBL5U-hc3xNA_ezhWD-19gbjY5116FMR504jwM3qUV1_znm79lJpulsrtm8dsK4be7Ksnttcf8A"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
<div className="absolute top-space-sm right-space-sm flex flex-col gap-1 items-start">
<span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full font-label-md text-label-md font-semibold bg-emerald-500/95 text-white shadow-sm backdrop-blur-sm">
<span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
<span>متاح للحجز الفوري</span>
</span>
<span className="px-space-xs py-0.5 rounded bg-primary/90 text-secondary-fixed font-label-sm text-label-sm">
                  كود: LOT-DP04
                </span>
</div>
<div className="absolute bottom-space-sm right-space-sm text-white">
<span className="font-label-sm text-label-sm text-secondary-fixed block">لوتس لاجون - الساحل الشمالي</span>
<h3 className="font-title-lg text-title-lg font-bold leading-tight">دوبلكس أرضي مع حديقة ولاجون كريستالي</h3>
</div>
</div>
<div className="p-space-md flex-1 flex flex-col justify-between gap-space-md">
<div className="grid grid-cols-3 gap-space-xs py-space-xs border-b border-surface-container text-center">
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-xl">space_dashboard</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">260 م²</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">+ حديقة 95 م²</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-xl">bed</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">3 غرف ماستر</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">تشطيب فاخر كامل</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-xl">pool</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">إطلالة لاجون</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">وصول مباشر للشاطئ</span>
</div>
</div>
<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1">
<div className="flex items-baseline justify-between">
<span className="font-label-md text-label-md text-on-surface-variant">السعر الإجمالي للوحدة:</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-headline-sm text-primary font-bold">12,900,000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">ج.م</span>
</div>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1 border-t border-surface-container">
<span>مقدم 5% فقط (645,000 ج.م)</span>
<span className="text-secondary font-semibold">تقسيط ميسر على 7 سنوات</span>
</div>
</div>
<div className="flex items-center gap-space-xs pt-space-xs">
<button className="flex-1 bg-primary hover:bg-secondary text-on-primary py-space-sm px-space-md rounded-lg font-title-md text-title-md font-semibold transition-all duration-300 flex items-center justify-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-base">shopping_cart_checkout</span>
<span>احجز الوحدة الآن</span>
</button>
<button className="bg-surface-container-high hover:bg-surface-container text-primary p-space-sm rounded-lg transition-colors" title="عرض التفاصيل والمخطط الهندسي">
<span className="material-symbols-outlined text-xl block">visibility</span>
</button>
</div>
</div>
</article>
<!-- UNIT 4: Pharaohs Greens Apartment (AVAILABLE) -->
<article className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl group">
<div className="relative h-64 w-full overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Luxury residential apartment building exterior with large glass balconies, overlooking an expansive green golf course and modern urban landscaping in New Cairo Egypt." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcCBURH4HoJnxnMi5wn2tVvjNvsWDgXRglWs-OYDZ4SjSkRMcs5cGNPS6DZP6Y79rRbNpZv5HAJsSjPn0HbYbgMSNUYymMr69CTlKhPXiMOWy0hCljrLJ5ldKTBifFxyKrkozzaL351-dyq8hL21GdXNBnIaEBWzB9uLgqmzLCy2vwAT-s0phf1DMU1Xz9e9kiM11hcZxn6-7MshG4zU6mKWy0ykbKf7MYqWAg0xqvM-_TGvQMsDFUrA"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
<div className="absolute top-space-sm right-space-sm flex flex-col gap-1 items-start">
<span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full font-label-md text-label-md font-semibold bg-emerald-500/95 text-white shadow-sm backdrop-blur-sm">
<span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
<span>متاح للحجز الفوري</span>
</span>
<span className="px-space-xs py-0.5 rounded bg-primary/90 text-secondary-fixed font-label-sm text-label-sm">
                  كود: PHG-A12
                </span>
</div>
<div className="absolute bottom-space-sm right-space-sm text-white">
<span className="font-label-sm text-label-sm text-secondary-fixed block">الفراعنة جرينز - التجمع الخامس</span>
<h3 className="font-title-lg text-title-lg font-bold leading-tight">شقة مميزة بإطلالة على الجولدن سكوير</h3>
</div>
</div>
<div className="p-space-md flex-1 flex flex-col justify-between gap-space-md">
<div className="grid grid-cols-3 gap-space-xs py-space-xs border-b border-surface-container text-center">
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-xl">straighten</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">195 م²</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">المساحة الإجمالية</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-xl">bedroom_parent</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">3 غرف</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">+ غرفة معيشة</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-xl">elevator</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">طابق 4</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">موقف سيارات مغطى</span>
</div>
</div>
<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1">
<div className="flex items-baseline justify-between">
<span className="font-label-md text-label-md text-on-surface-variant">السعر الإجمالي للوحدة:</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-headline-sm text-primary font-bold">9,450,000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">ج.م</span>
</div>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-1 border-t border-surface-container">
<span>مقدم 10% (945,000 ج.م)</span>
<span className="text-secondary font-semibold">أقساط متساوية على 8 سنوات</span>
</div>
</div>
<div className="flex items-center gap-space-xs pt-space-xs">
<button className="flex-1 bg-primary hover:bg-secondary text-on-primary py-space-sm px-space-md rounded-lg font-title-md text-title-md font-semibold transition-all duration-300 flex items-center justify-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-base">shopping_cart_checkout</span>
<span>احجز الوحدة الآن</span>
</button>
<button className="bg-surface-container-high hover:bg-surface-container text-primary p-space-sm rounded-lg transition-colors" title="عرض التفاصيل والمخطط الهندسي">
<span className="material-symbols-outlined text-xl block">visibility</span>
</button>
</div>
</div>
</article>
<!-- UNIT 5: PENDING/UNDER RESERVATION (Strict Rule Demo) -->
<article className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 opacity-95">
<div className="relative h-64 w-full overflow-hidden">
<img className="w-full h-full object-cover filter grayscale-[25%]" data-alt="Exterior architecture of modern penthouse with glass facade and architectural pergolas in Zayed Cairo luxury neighborhood under clear daylight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsBshQSJXYwCxOa2EyWCySVsBlV7Z7q8ZljcMz4UieZ_woGH19UPUuF-JgjoTBXUROaUWsrP9leDlga0pWHWTPX_sZb5Wt0854EzKN5M6v0YsAH9RYC-hS8Pd9RUEqqsOpR7uVS8jzDFI1ZSrDqTnGZtJUjwPSCuB2-uof-3FXMpWF0zc7Lldpq7ZkpcDX2HLcTe43DIIJNC6dXA7JieaaskPaH-eSccgdXIcn117ohKleNtOykaEyXQ"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>
<div className="absolute top-space-sm right-space-sm flex flex-col gap-1 items-start">
<span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full font-label-md text-label-md font-semibold bg-amber-500 text-white shadow-sm">
<span className="material-symbols-outlined text-sm">schedule</span>
<span>قيد الحجز المبدئي (مهلة 48 ساعة)</span>
</span>
<span className="px-space-xs py-0.5 rounded bg-primary/90 text-secondary-fixed font-label-sm text-label-sm">
                  كود: TEL-PH08
                </span>
</div>
<div className="absolute bottom-space-sm right-space-sm text-white">
<span className="font-label-sm text-label-sm text-secondary-fixed block">تلال إيزيس - الشيخ زايد</span>
<h3 className="font-title-lg text-title-lg font-bold leading-tight">بنتهاوس بانورامي ممتد - طابق 18</h3>
</div>
</div>
<div className="p-space-md flex-1 flex flex-col justify-between gap-space-md">
<div className="grid grid-cols-3 gap-space-xs py-space-xs border-b border-surface-container text-center">
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-on-surface-variant text-xl">straighten</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">285 م²</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">المساحة الإجمالية</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-on-surface-variant text-xl">bedroom_parent</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">3 غرف</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">+ روف خاص 70 م²</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-on-surface-variant text-xl">pending_actions</span>
<span className="font-financial-numeric text-label-md text-amber-700 font-bold">باقي 26 ساعة</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">لانتهاء المهلة</span>
</div>
</div>
<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1">
<div className="flex items-baseline justify-between">
<span className="font-label-md text-label-md text-on-surface-variant">السعر التعاقدي:</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-headline-sm text-on-surface-variant font-bold">14,200,000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">ج.م</span>
</div>
</div>
<p className="font-label-sm text-label-sm text-amber-800 bg-amber-50 px-2 py-1 rounded">
                  الوحدة معلقة لحين إنهاء إجراءات فحص الشيكات البنكية للمستثمر الحالي.
                </p>
</div>
<!-- Strictly Disabled CTA adhering to booking availability rules -->
<div className="flex items-center gap-space-xs pt-space-xs">
<button className="flex-1 bg-surface-container-high text-on-surface-variant/60 py-space-sm px-space-md rounded-lg font-title-md text-title-md font-semibold cursor-not-allowed flex items-center justify-center gap-1" disabled="">
<span className="material-symbols-outlined text-base">lock</span>
<span>الوحدة غير متاحة للحجز حالياً</span>
</button>
<button className="bg-surface-container-high hover:bg-surface-container text-primary p-space-sm rounded-lg transition-colors" title="عرض المواصفات وقائمة الانتظار">
<span className="material-symbols-outlined text-xl block">notifications</span>
</button>
</div>
</div>
</article>
<!-- UNIT 6: SOLD OUT UNIT (Strict Rule Demo) -->
<article className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col transition-all duration-300 opacity-80">
<div className="relative h-64 w-full overflow-hidden">
<img className="w-full h-full object-cover filter grayscale contrast-75" data-alt="Corner luxury modern townhouse facade with garden and stone finish in upscale New Cairo compound, warm daylight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMkYObxqpjWzyN3XY-6IRtidovMqKkCInWmBcCrG7a_veZ6ZJDgZz8SGLVtjEcs3O5Fc-8n-k9-L6VekYkJu8D91CdX1nX5ymJ50LaxmZ26qDAm_vm5urlhzEDJVLdqpO59P75IfgO7K8ZR5kmGb676hSEdxRMDKwhGGxGM38nQqF9OKemgfjP2IykglFmT2qZ93JX8FCoQdzjfvB7ClXrQES7CkbuzTXJAlipN0014IF9Yv2jRuAorw"/>
<div className="absolute inset-0 bg-primary/40 backdrop-blur-[1px]"></div>
<div className="absolute top-space-sm right-space-sm flex flex-col gap-1 items-start">
<span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full font-label-md text-label-md font-semibold bg-primary text-on-primary shadow-sm">
<span className="material-symbols-outlined text-sm">done_all</span>
<span>تم البيع وإبرام العقد</span>
</span>
<span className="px-space-xs py-0.5 rounded bg-surface/80 text-primary font-label-sm text-label-sm">
                  كود: PHG-TH07
                </span>
</div>
<div className="absolute bottom-space-sm right-space-sm text-white">
<span className="font-label-sm text-label-sm text-surface-variant block">الفراعنة جرينز - القاهرة الجديدة</span>
<h3 className="font-title-lg text-title-lg font-bold leading-tight">تاون هاوس كورنر - مساحة 310 م²</h3>
</div>
</div>
<div className="p-space-md flex-1 flex flex-col justify-between gap-space-md">
<div className="grid grid-cols-3 gap-space-xs py-space-xs border-b border-surface-container text-center">
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-outline text-xl">straighten</span>
<span className="font-financial-numeric text-label-md text-outline font-bold">310 م²</span>
<span className="font-label-sm text-label-sm text-outline-variant">المساحة</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-outline text-xl">bed</span>
<span className="font-financial-numeric text-label-md text-outline font-bold">4 غرف</span>
<span className="font-label-sm text-label-sm text-outline-variant">غرفة خدمات</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-outline text-xl">task_alt</span>
<span className="font-financial-numeric text-label-md text-outline font-bold">تم التسليم</span>
<span className="font-label-sm text-label-sm text-outline-variant">المالك: مستثمر</span>
</div>
</div>
<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1">
<div className="flex items-baseline justify-between">
<span className="font-label-md text-label-md text-outline">القيمة البيعية المسجلة:</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-headline-sm text-outline font-bold">16,800,000</span>
<span className="font-label-sm text-label-sm text-outline font-bold">ج.م</span>
</div>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant">
                  تم إتمام التعاقد النهائي وتوثيق الحصة في الأرض بمقر الهيئة.
                </p>
</div>
<!-- Strictly Sold Booking Button -->
<div className="flex items-center gap-space-xs pt-space-xs">
<button className="flex-1 bg-surface-container text-outline py-space-sm px-space-md rounded-lg font-title-md text-title-md font-semibold cursor-not-allowed flex items-center justify-center gap-1" disabled="">
<span className="material-symbols-outlined text-base">block</span>
<span>تم البيع بالكامل</span>
</button>
<button className="bg-surface-container-high hover:bg-surface-container text-primary p-space-sm rounded-lg transition-colors" title="عرض مواصفات المشروع المشابهة">
<span className="material-symbols-outlined text-xl block">travel_explore</span>
</button>
</div>
</div>
</article>
</div>
<!-- ================= PAGINATION & VIEW META ================= -->
<nav aria-label="تنقل الصفحات" className="w-full bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md mt-space-md">
<div className="flex items-center gap-space-xs text-on-surface-variant font-body-md text-body-md">
<span>عرض</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">1 - 6</span>
<span>من أصل</span>
<span className="font-financial-numeric text-label-md text-primary font-bold">34</span>
<span>وحدة متاحة</span>
</div>
<div className="flex items-center gap-1">
<button className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface-container-low hover:bg-surface-container text-primary transition-colors disabled:opacity-40" disabled="">
<span className="material-symbols-outlined text-lg">chevron_right</span>
</button>
<button className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-on-primary font-title-md text-title-md font-bold shadow-sm">
              1
            </button>
<button className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface-container-low hover:bg-surface-container text-primary font-title-md text-title-md font-medium transition-colors">
              2
            </button>
<button className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface-container-low hover:bg-surface-container text-primary font-title-md text-title-md font-medium transition-colors">
              3
            </button>
<span className="w-8 text-center text-on-surface-variant font-bold">...</span>
<button className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface-container-low hover:bg-surface-container text-primary font-title-md text-title-md font-medium transition-colors">
              6
            </button>
<button className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface-container-low hover:bg-surface-container text-primary transition-colors">
<span className="material-symbols-outlined text-lg">chevron_left</span>
</button>
</div>
<div className="flex items-center gap-space-xs">
<span className="font-label-md text-label-md text-on-surface-variant">لكل صفحة:</span>
<select className="bg-surface-container-low text-primary font-label-md text-label-md p-1.5 rounded-lg outline-none cursor-pointer">
<option>6 وحدات</option>
<option>12 وحدة</option>
<option>24 وحدة</option>
</select>
</div>
</nav>
<!-- Investor Confidence & Assistance Footer Callout -->
<div className="w-full bg-gradient-to-l from-surface-container-low to-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-lg">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-3xl">support_agent</span>
</div>
<div>
<h3 className="font-title-lg text-title-lg text-primary font-bold">هل تبحث عن مواصفات هندسية أو مساحة مخصصة؟</h3>
<p className="font-body-md text-body-md text-on-surface-variant">مستشارو الاستثمار العقاري متاحون لترتيب جولة معاينة خاصة بالموقع وإعداد دراسات العائد الإيجاري المتوقع.</p>
</div>
</div>
<div className="flex items-center gap-space-xs shrink-0 w-full md:w-auto">
<button className="w-full md:w-auto bg-primary hover:bg-secondary text-on-primary px-space-lg py-space-sm rounded-lg font-title-md text-title-md font-semibold transition-colors shadow-sm flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-base">call</span>
<span>تحدث مع مستشار المبيعات</span>
</button>
</div>
</div>
</main>
</div>
</div>
</div></main><footer className="w-full bg-primary-container text-on-primary pt-space-xl pb-space-lg"><div className="w-full px-margin"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-xl"><div className="flex flex-col gap-space-md"><div className="flex items-center gap-space-sm"><img alt="شعار مستقبل الفراعنة" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1VWx6jKJknNE_QHLGa2wu5RINLHC-tKjGblBP8IV-4NQjOVIGwFAC7lqrZ7kLJ0Z8I_sd0DxnAiL7bB_nTIrRbp2AxnBlN1-z9QXsIHyyRIoxNJ1p8pBrxJ5JaMv2PBxrvYQ2qmybfZmDQFu9VinTWK60x1eGvoYztE593XMsNleq-G0VSoY-0u_DKSHikfzMYlirkYn5shbwPwY6fSpc7TcYQC2aY5qmH1WRyG-S-K3ihr6iqUdKTH0Ek"/><span className="font-title-lg text-title-lg text-on-primary font-bold">مستقبل الفراعنة</span></div><p className="font-body-md text-body-md text-on-primary-container leading-relaxed">صرح استثماري وتطوير عقاري مصري رائد يرتكز على إرث معماري خالد ويقود التحول الرقمي لمحفظة الأصول السكنية والتجارية الاستثمارية.</p><div className="flex items-center gap-space-xs text-secondary-fixed font-label-md text-label-md"><span className="material-symbols-outlined text-base">verified_user</span><span>ترخيص هيئة المجتمعات العمرانية رقم 4829 / ج.م</span></div></div><div className="flex flex-col gap-space-md"><span className="font-title-md text-title-md text-secondary-fixed border-r-2 border-secondary pr-space-xs">بوابات المستثمرين والعملاء</span><div className="flex flex-col gap-space-sm"><a className="text-on-primary-container hover:text-on-primary text-body-md font-body-md transition-colors" data-path="projects" href="#">مشروعاتنا الرائدة</a><a className="text-on-primary-container hover:text-on-primary text-body-md font-body-md transition-colors" data-path="available-units" href="#">الوحدات المتاحة والمخططات</a><a className="text-on-primary-container hover:text-on-primary text-body-md font-body-md transition-colors" data-path="about-us" href="#">عن الشركة وفريق العمل</a><a className="text-on-primary-container hover:text-on-primary text-body-md font-body-md transition-colors" data-path="contact" href="#">التواصل والمبيعات</a></div></div><div className="flex flex-col gap-space-md"><span className="font-title-md text-title-md text-secondary-fixed border-r-2 border-secondary pr-space-xs">الامتثال والمعاملات البنكية</span><p className="font-body-md text-body-md text-on-primary-container leading-relaxed">كافة التحويلات والحجوزات البنكية خاضعة لرقابة البنك المركزي المصري ومعايير حماية المستثمر العقاري وفق اللائحة التنفيذية رقم 119.</p><div className="flex items-center gap-space-md text-on-primary-container"><span className="material-symbols-outlined text-2xl">lock</span><span className="material-symbols-outlined text-2xl">security</span><span className="material-symbols-outlined text-2xl">assured_workload</span><span className="material-symbols-outlined text-2xl">receipt_long</span></div></div><div className="flex flex-col gap-space-md"><span className="font-title-md text-title-md text-secondary-fixed border-r-2 border-secondary pr-space-xs">المقر الرئيسي والتواصل</span><div className="flex flex-col gap-space-xs text-on-primary-container text-body-md font-body-md"><div className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-base text-secondary">location_on</span><span>القطاع المالي، العاصمة الإدارية الجديدة، القاهرة</span></div><div className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-base text-secondary">call</span><span className="text-right font-financial-numeric text-financial-numeric" dir="ltr">+20 2 2840 9000</span></div><div className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-base text-secondary">mail</span><span>invest@pharaohsfutures.com.eg</span></div></div></div></div><div className="pt-space-lg flex flex-col md:flex-row items-center justify-between text-on-primary-container font-label-md text-label-md gap-space-md"><p>© 2025 شركة مستقبل الفراعنة للاستثمار والتطوير العقاري. جميع الحقوق محفوظة.</p><div className="flex items-center gap-space-lg"><a className="hover:text-on-primary transition-colors" href="#">سياسة الخصوصية وسرية المستثمر</a><a className="hover:text-on-primary transition-colors" href="#">الشروط والأحكام التعاقدية</a><a className="hover:text-on-primary transition-colors" href="#">بوابة السداد الإلكتروني المعتمدة</a></div></div></div></footer>`;

export default PropertiesPage;
