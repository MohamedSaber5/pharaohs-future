import { useEffect, useRef } from 'react';

/**
 * ProjectsPage
 * Auto-generated from Stitch HTML design — preserves exact Tailwind classes & layout
 */
const ProjectsPage = () => {
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

const html = `<header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(16,36,58,0.06)]"><div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-lg"><a className="flex items-center gap-3 group" data-path="home" href="#"><div className="w-11 h-11 rounded-lg bg-primary-container flex items-center justify-center text-secondary-fixed shadow-[0_2px_10px_rgba(16,36,58,0.15)]"><span className="material-symbols-outlined text-[24px]">account_balance</span></div><div className="flex flex-col text-right"><span className="font-title-lg text-title-lg text-primary tracking-tight leading-tight">مستقبل الفراعنة</span><span className="font-label-sm text-label-sm text-secondary tracking-normal">للاستثمار والتطوير العقاري</span></div></a><nav className="hidden xl:flex items-center gap-space-lg mr-space-md" data-active-classes="text-secondary font-title-md"><a className="font-title-md text-title-md text-on-surface-variant hover:text-on-surface transition-colors py-2" data-path="home" href="#">الرئيسية</a><a className="font-title-md text-title-md text-on-surface-variant hover:text-on-surface transition-colors py-2" data-path="projects-portfolio" href="#">مشروعاتنا</a><a className="font-title-md text-title-md text-on-surface-variant hover:text-on-surface transition-colors py-2" data-path="available-inventory" href="#">الوحدات المتاحة</a><a className="font-title-md text-title-md text-on-surface-variant hover:text-on-surface transition-colors py-2" data-path="about-us" href="#">من نحن</a><a className="font-title-md text-title-md text-on-surface-variant hover:text-on-surface transition-colors py-2" data-path="contact-us" href="#">تواصل معنا</a></nav></div><div className="flex items-center gap-space-md"><div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface"><span className="material-symbols-outlined text-secondary text-[18px]">payments</span><span className="font-label-md text-label-md text-secondary">ج.م</span><span className="font-label-sm text-label-sm text-outline">EGP</span></div><div className="flex items-center gap-2"><a className="hidden md:inline-flex items-center justify-center h-10 px-4 rounded-lg font-title-md text-title-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="sign-in" href="#">تسجيل الدخول</a><a className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all shadow-[0_4px_16px_-4px_rgba(16,36,58,0.25)]" data-path="register" href="#">إنشاء حساب جديد</a></div><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]"><div className="flex flex-col w-full">
<!-- Top Ambient Glow & Architectural Pattern Background -->
<div className="relative w-full overflow-hidden bg-surface-container-lowest">
<div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-96 rounded-full bg-gradient-to-b from-surface-container-high/40 via-surface-container-low/20 to-transparent blur-3xl pointer-events-none"></div>
<div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-10 relative z-10">
<!-- Breadcrumb -->
<nav aria-label="مسار التصفح" className="flex items-center gap-2 mb-6">
<a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1" href="#">
<span className="material-symbols-outlined text-[18px]">home</span>
          الرئيسية
        </a>
<span className="material-symbols-outlined text-[16px] text-outline rotate-180">chevron_left</span>
<span className="font-label-md text-label-md text-secondary font-semibold">مشروعاتنا</span>
</nav>
<!-- Page Header & Hero Intro -->
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-0">
<div className="max-w-3xl">
<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container text-secondary mb-4 shadow-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm font-semibold tracking-wide">المحفظة العقارية الحصرية</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-primary tracking-tight mb-3">
            اكتشف مشروعاتنا الاستثمارية
          </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            صروح معمارية واستثمارية استثنائية في أكثر المواقع الاستراتيجية تميزاً في مصر، مصممة بأعلى معايير الاستدامة والفخامة العالمية وروح التراث الخالد.
          </p>
</div>
<!-- Quick Stats Strip -->
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-container-low p-4 rounded-xl shadow-[0_4px_20px_-4px_rgba(16,36,58,0.04)]">
<div className="flex flex-col text-right px-3 py-1">
<span className="font-financial-numeric text-financial-numeric text-primary">14</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">مشروع رائد</span>
</div>
<div className="flex flex-col text-right px-3 py-1">
<span className="font-financial-numeric text-financial-numeric text-primary">4</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">مدن رئيسية</span>
</div>
<div className="flex flex-col text-right px-3 py-1">
<span className="font-financial-numeric text-financial-numeric text-primary">480+</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">وحدة للحجز</span>
</div>
<div className="flex flex-col text-right px-3 py-1">
<span className="font-financial-numeric text-financial-numeric text-secondary font-bold">+18B</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">استثمارات ج.م</span>
</div>
</div>
</div>
</div>
</div>
<!-- Main Content Area: Controls, Search, Project Grid -->
<div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full flex flex-col gap-8">
<!-- Status Tabs Filter -->
<div className="flex items-center justify-between flex-wrap gap-4 pb-2">
<div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full md:w-auto" id="status-tabs">
<button className="px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md shadow-sm transition-all hover:bg-primary flex items-center gap-2 shrink-0" type="button">
<span>الكل</span>
<span className="px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container/20 text-secondary-fixed">14</span>
</button>
<button className="px-5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface-variant font-title-md text-title-md hover:bg-surface-container hover:text-on-surface transition-all flex items-center gap-2 shrink-0 shadow-sm" type="button">
<span>قيد التنفيذ والبيع</span>
<span className="px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container text-on-surface-variant">9</span>
</button>
<button className="px-5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface-variant font-title-md text-title-md hover:bg-surface-container hover:text-on-surface transition-all flex items-center gap-2 shrink-0 shadow-sm" type="button">
<span>مشاريع قادمة</span>
<span className="px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container text-on-surface-variant">3</span>
</button>
<button className="px-5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface-variant font-title-md text-title-md hover:bg-surface-container hover:text-on-surface transition-all flex items-center gap-2 shrink-0 shadow-sm" type="button">
<span>مكتملة ومسلمة</span>
<span className="px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container text-on-surface-variant">2</span>
</button>
</div>
<!-- View Switch & Active Counter -->
<div className="flex items-center gap-4 mr-auto">
<div className="hidden sm:flex items-center text-label-md font-label-md text-on-surface-variant">
          عرض <span className="font-bold text-primary px-1">6</span> من أصل <span className="font-bold text-primary px-1">14</span> مشروع
        </div>
<div className="flex items-center bg-surface-container-low p-1 rounded-lg">
<button className="p-1.5 rounded bg-surface-container-lowest text-primary shadow-sm hover:text-secondary" title="عرض شبكي" type="button">
<span className="material-symbols-outlined text-[20px]">grid_view</span>
</button>
<button className="p-1.5 rounded text-outline hover:text-primary transition-colors" title="عرض القائمة" type="button">
<span className="material-symbols-outlined text-[20px]">view_agenda</span>
</button>
</div>
</div>
</div>
<!-- Search & Advanced Filter Console -->
<div className="bg-surface-container-lowest rounded-xl p-5 shadow-[0_4px_24px_-4px_rgba(16,36,58,0.06)] flex flex-col gap-4">
<!-- Search Input row -->
<div className="relative w-full">
<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline text-[22px]">search</span>
<input className="w-full h-12 pr-12 pl-4 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-all" id="project-search-input" placeholder="ابحث باسم المشروع، المنطقة أو المعلم الشهير (مثال: العاصمة الإدارية، لاجون، النهر الأخضر)..." type="text"/>
<button className="absolute left-2.5 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md bg-surface-container text-on-surface-variant hover:text-primary font-label-sm text-label-sm transition-colors" type="button">
          بحث فوري
        </button>
</div>
<!-- Dropdown Filters Grid -->
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
<!-- Location Filter -->
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md text-on-surface-variant text-right">الموقع والمدينة</label>
<div className="relative">
<select className="w-full h-11 px-3.5 pr-9 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface appearance-none focus:outline-none cursor-pointer">
<option value="all">كل الوجهات الاستثمارية</option>
<option value="nac">العاصمة الإدارية الجديدة (CBD &amp; Green River)</option>
<option value="nc">القاهرة الجديدة - التجمع الخامس (Golden Square)</option>
<option value="nc-north">الساحل الشمالي (رأس الحكمة وسيدي حنيش)</option>
<option value="zed">الشيخ زايد ومدينة السادس من أكتوبر</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">location_on</span>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[18px]">expand_more</span>
</div>
</div>
<!-- Project Status Filter -->
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md text-on-surface-variant text-right">حالة التنفيذ والتسليم</label>
<div className="relative">
<select className="w-full h-11 px-3.5 pr-9 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface appearance-none focus:outline-none cursor-pointer">
<option value="all">جميع الحالات</option>
<option value="ready">جاهز للاستلام الفوري</option>
<option value="construction">قيد الإنشاء (تسليم 2025/2026)</option>
<option value="launch">طرح حصري جديد (مرحلة أولى)</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">engineering</span>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[18px]">expand_more</span>
</div>
</div>
<!-- Development Type -->
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md text-on-surface-variant text-right">نوع التطوير العقاري</label>
<div className="relative">
<select className="w-full h-11 px-3.5 pr-9 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface appearance-none focus:outline-none cursor-pointer">
<option value="all">جميع الأنواع المعمارية</option>
<option value="residential">مجمعات سكنية فاخرة وفيلات</option>
<option value="commercial">أبراج إدارية وتجارية متعددة الاستخدام</option>
<option value="resort">منتجعات فندقية ولاجون ساحلي</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">apartment</span>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[18px]">expand_more</span>
</div>
</div>
<!-- Price Range Filter -->
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md text-on-surface-variant text-right">النطاق السعري التقديري</label>
<div className="relative">
<select className="w-full h-11 px-3.5 pr-9 rounded-lg bg-surface-container-low font-body-md text-body-md text-on-surface appearance-none focus:outline-none cursor-pointer">
<option value="all">جميع النطاقات السعرية</option>
<option value="5-10">من 5,000,000 إلى 10,000,000 ج.م</option>
<option value="10-20">من 10,000,000 إلى 20,000,000 ج.م</option>
<option value="20plus">أكثر من 20,000,000 ج.م (قصور وفيلات)</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[20px]">monetization_on</span>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[18px]">expand_more</span>
</div>
</div>
</div>
<!-- Sorting Bar and Reset -->
<div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t-0">
<div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
<span className="text-on-surface font-semibold">ترتيب حسب:</span>
<a className="px-2.5 py-1 rounded bg-surface-container-high text-primary font-semibold" href="#">الأحدث طرحاً</a>
<a className="px-2.5 py-1 rounded hover:bg-surface-container text-on-surface-variant transition-colors" href="#">السعر: من الأقل للأعلى</a>
<a className="px-2.5 py-1 rounded hover:bg-surface-container text-on-surface-variant transition-colors" href="#">السعر: من الأعلى للأقل</a>
<a className="px-2.5 py-1 rounded hover:bg-surface-container text-on-surface-variant transition-colors" href="#">الوحدات الأكثر مبيعاً</a>
</div>
<button className="inline-flex items-center gap-1.5 text-secondary hover:text-on-secondary-container font-label-md text-label-md font-semibold transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">restart_alt</span>
          إعادة ضبط الفلاتر
        </button>
</div>
</div>
<!-- Responsive Projects Grid (6 Luxury Projects) -->
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg w-full">
<!-- Card 1: أبراج حورس الاستثمارية -->
<article className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(16,36,58,0.06)] hover:shadow-[0_12px_36px_-6px_rgba(16,36,58,0.12)] transition-all duration-300 group">
<!-- Visual Container with Badge -->
<div className="relative h-64 w-full overflow-hidden bg-surface-container">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Modern ultra-luxurious corporate skyscraper complex in New Administrative Capital Egypt, gleaming glass facades with warm Egyptian golden brass mashrabiya lattice accents, panoramic cascading landscaped water features and reflecting pools at dusk, crystal clear architectural rendering style, cinematic atmospheric lighting." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAWtizpE0TMGEDuHPLBdTbtyaOXLFYpgDvaMwN6XSK7b4yxL9ftX4fa8eKNlJ-fG8wqRBTFlJ1FPaHecstyRdG-R0o9MXI6iLTRkfJg08TizRl2C4GrQ6zU_HFo4HzfG4TWTpCxlGkicQipxoD3aSoWBy6QLSPBCU4i0-dF6eZaDNSKw3SkdB09h-1YRWrzPi2uYtaliT9EuI-cxpVIvKZQ3pcyGPjcD94O0gXdE9LGSldB9WZZh1VSAA')"></div>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-black/20"></div>
<!-- Top Badges -->
<div className="absolute top-4 right-4 flex items-center gap-2">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/95 text-secondary-fixed text-label-sm font-label-sm shadow-md backdrop-blur-md">
<span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
              قيد الإنشاء - تسليم 2026
            </span>
</div>
<div className="absolute top-4 left-4">
<button className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-primary flex items-center justify-center transition-colors shadow-sm" title="إضافة للمفضلة">
<span className="material-symbols-outlined text-[18px]">bookmark_border</span>
</button>
</div>
<!-- Bottom Image Tag -->
<div className="absolute bottom-3 right-4 left-4 flex items-center justify-between text-on-primary">
<span className="inline-flex items-center gap-1 text-label-sm font-label-sm bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
<span className="material-symbols-outlined text-[16px] text-secondary-fixed">park</span>
              إطلالة مباشرة على النهر الأخضر
            </span>
<span className="font-label-sm text-label-sm text-secondary-fixed">CBD Zone</span>
</div>
</div>
<!-- Card Content Body -->
<div className="p-5 flex flex-col flex-1 justify-between gap-4">
<div>
<div className="flex items-center gap-1.5 text-secondary text-label-sm font-label-sm mb-1">
<span className="material-symbols-outlined text-[16px]">location_on</span>
              العاصمة الإدارية الجديدة • منطقة الأعمال المركزية
            </div>
<h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors mb-2">
              أبراج حورس الاستثمارية
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 leading-relaxed">
              برج تجاري وإداري متكامل يجمع بين الشقق الفندقية ومقرات كبرى البنوك والشركات الدولية بإطلالة بانورامية غير منقطعة.
            </p>
</div>
<!-- Feature Pills -->
<div className="grid grid-cols-3 gap-2 py-3 bg-surface-container-low rounded-lg text-center">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">الوحدات المتاحة</span>
<span className="font-title-md text-title-md text-primary font-bold">68 وحدة</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">أنظمة التقسيط</span>
<span className="font-title-md text-title-md text-primary font-bold">حتى 8 سنوات</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">المساحات تبدأ</span>
<span className="font-title-md text-title-md text-primary font-bold">75 م²</span>
</div>
</div>
<!-- Financial Price & CTA actions -->
<div className="pt-2 flex flex-col gap-3">
<div className="flex items-baseline justify-between">
<span className="font-label-sm text-label-sm text-outline">السعر الافتتاحي:</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-financial-numeric text-primary">7,450,000</span>
<span className="font-label-md text-label-md text-secondary font-bold">ج.م</span>
</div>
</div>
<div className="grid grid-cols-2 gap-2 pt-1">
<a className="h-11 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary flex items-center justify-center transition-all shadow-[0_2px_8px_rgba(16,36,58,0.15)]" href="#">
                تفاصيل المشروع
              </a>
<a className="h-11 rounded-lg bg-surface-container text-primary font-title-md text-title-md hover:bg-secondary-container hover:text-on-secondary-container flex items-center justify-center transition-all" href="#">
                استكشف الوحدات (68)
              </a>
</div>
</div>
</div>
</article>
<!-- Card 2: كمبوند لوتس لاجون ريزيدنس -->
<article className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(16,36,58,0.06)] hover:shadow-[0_12px_36px_-6px_rgba(16,36,58,0.12)] transition-all duration-300 group">
<!-- Visual Container with Badge -->
<div className="relative h-64 w-full overflow-hidden bg-surface-container">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Exquisite luxury Mediterranean coastal beachfront villas and resort bungalows in Ras El Hekma North Coast Egypt, sunset golden light over turquoise crystal lagoon pools, sleek sand-toned stone architecture with palm trees, modern loungers, seamless indoor outdoor luxury lifestyle." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAihFM-NLC69zt4WOoCdBI1G5uEep0x6iKxV-i1lNzBfXUc4HdV043MKCCUpO4Ypkj-FHeN6B8suRtiJiVJGIMj5Qei59CGJzQ7Xkd9rne9SWUQRBsHpbVoYRs9I27QxRUa-ma39INfc0Vq8sRvfw1LGu2Aj13N43HYl7kq22zimZGcfAz0ZieOMqHV2jHdeGdCYFOVRGe8GVPe5KEX7RJv_HZEv01zZ_a2okYJ5xBnvV3mi2-OY_JD1g')"></div>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-black/20"></div>
<!-- Top Badges -->
<div className="absolute top-4 right-4 flex items-center gap-2">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 text-label-sm font-label-sm shadow-md backdrop-blur-md">
<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              طرح صيف 2025 - حجز فوري
            </span>
</div>
<div className="absolute top-4 left-4">
<button className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-primary flex items-center justify-center transition-colors shadow-sm" title="إضافة للمفضلة">
<span className="material-symbols-outlined text-[18px]">bookmark_border</span>
</button>
</div>
<!-- Bottom Image Tag -->
<div className="absolute bottom-3 right-4 left-4 flex items-center justify-between text-on-primary">
<span className="inline-flex items-center gap-1 text-label-sm font-label-sm bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
<span className="material-symbols-outlined text-[16px] text-secondary-fixed">waves</span>
              شاطئ رملي خاص ولاجون كريستالي
            </span>
<span className="font-label-sm text-label-sm text-secondary-fixed">كم 204</span>
</div>
</div>
<!-- Card Content Body -->
<div className="p-5 flex flex-col flex-1 justify-between gap-4">
<div>
<div className="flex items-center gap-1.5 text-secondary text-label-sm font-label-sm mb-1">
<span className="material-symbols-outlined text-[16px]">location_on</span>
              الساحل الشمالي • رأس الحكمة الفاخرة
            </div>
<h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors mb-2">
              لوتس لاجون ريزيدنس
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 leading-relaxed">
              مجمع فيلات وشاليهات شاطئية بتصميم إغريقي فرعوني حديث على أجمل شواطئ البحر الأبيض المتوسط مع مارينا يخوت خاصة.
            </p>
</div>
<!-- Feature Pills -->
<div className="grid grid-cols-3 gap-2 py-3 bg-surface-container-low rounded-lg text-center">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">الوحدات المتاحة</span>
<span className="font-title-md text-title-md text-primary font-bold">32 فيلا</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">مقدم التعاقد</span>
<span className="font-title-md text-title-md text-primary font-bold">5% فقط</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">تسليم المشروع</span>
<span className="font-title-md text-title-md text-primary font-bold">2027</span>
</div>
</div>
<!-- Financial Price & CTA actions -->
<div className="pt-2 flex flex-col gap-3">
<div className="flex items-baseline justify-between">
<span className="font-label-sm text-label-sm text-outline">السعر الافتتاحي:</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-financial-numeric text-primary">12,900,000</span>
<span className="font-label-md text-label-md text-secondary font-bold">ج.م</span>
</div>
</div>
<div className="grid grid-cols-2 gap-2 pt-1">
<a className="h-11 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary flex items-center justify-center transition-all shadow-[0_2px_8px_rgba(16,36,58,0.15)]" href="#">
                تفاصيل المشروع
              </a>
<a className="h-11 rounded-lg bg-surface-container text-primary font-title-md text-title-md hover:bg-secondary-container hover:text-on-secondary-container flex items-center justify-center transition-all" href="#">
                استكشف الوحدات (32)
              </a>
</div>
</div>
</div>
</article>
<!-- Card 3: الفراعنة جرينز ريزيدنس -->
<article className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(16,36,58,0.06)] hover:shadow-[0_12px_36px_-6px_rgba(16,36,58,0.12)] transition-all duration-300 group">
<!-- Visual Container with Badge -->
<div className="relative h-64 w-full overflow-hidden bg-surface-container">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Magnificent private residential sanctuary in New Cairo Golden Square, modern Egyptian luxury mansions with floor-to-ceiling glass windows, manicured private gardens, illuminated infinity pools, tranquil water streams, and warm beige stone exterior walls at twilight." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCK6lzstbMDe3aoomm5vAGnhhUi11f1Pm3Rn_IXgFlBwIcR9rl6LGNY_A8v-nwVm1J5oPyDGY6M-3lDQxHbHdMtrLVBVwsi_XpX3oCe6w-97n9odYOv9mMVrqsd22dGvMIFLpkV3MTXgQY7p0FrkiX2wKkFQMMxzauLWaKKwlXiFb3aANFCsgwzdCdrXHBC_cPuT_J58lD3BeWd1UD3NvNWTnrY9ENw929c2uO11nYEaFthE0UG6Tho0A')"></div>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-black/20"></div>
<!-- Top Badges -->
<div className="absolute top-4 right-4 flex items-center gap-2">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-label-sm shadow-md backdrop-blur-md">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
              مرحلة التسليم النهائي
            </span>
</div>
<div className="absolute top-4 left-4">
<button className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-primary flex items-center justify-center transition-colors shadow-sm" title="إضافة للمفضلة">
<span className="material-symbols-outlined text-[18px]">bookmark_border</span>
</button>
</div>
<!-- Bottom Image Tag -->
<div className="absolute bottom-3 right-4 left-4 flex items-center justify-between text-on-primary">
<span className="inline-flex items-center gap-1 text-label-sm font-label-sm bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
<span className="material-symbols-outlined text-[16px] text-secondary-fixed">school</span>
              بجوار الجامعة الأمريكية والنوادي
            </span>
<span className="font-label-sm text-label-sm text-secondary-fixed">Golden Square</span>
</div>
</div>
<!-- Card Content Body -->
<div className="p-5 flex flex-col flex-1 justify-between gap-4">
<div>
<div className="flex items-center gap-1.5 text-secondary text-label-sm font-label-sm mb-1">
<span className="material-symbols-outlined text-[16px]">location_on</span>
              القاهرة الجديدة • التجمع الخامس
            </div>
<h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors mb-2">
              الفراعنة جرينز ريزيدنس
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 leading-relaxed">
              مجمع سكني مغلق فائق الخصوصية محاط بمساحات خضراء شاسعة وبحيرات صناعية، يقدم تجربة عيش ارستقراطية هادئة.
            </p>
</div>
<!-- Feature Pills -->
<div className="grid grid-cols-3 gap-2 py-3 bg-surface-container-low rounded-lg text-center">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">الوحدات المتاحة</span>
<span className="font-title-md text-title-md text-primary font-bold">19 وحدة</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">الاستلام</span>
<span className="font-title-md text-title-md text-primary font-bold">فوري 2025</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">مساحة المباني</span>
<span className="font-title-md text-title-md text-primary font-bold">320 م² - 650 م²</span>
</div>
</div>
<!-- Financial Price & CTA actions -->
<div className="pt-2 flex flex-col gap-3">
<div className="flex items-baseline justify-between">
<span className="font-label-sm text-label-sm text-outline">السعر الافتتاحي:</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-financial-numeric text-primary">16,800,000</span>
<span className="font-label-md text-label-md text-secondary font-bold">ج.م</span>
</div>
</div>
<div className="grid grid-cols-2 gap-2 pt-1">
<a className="h-11 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary flex items-center justify-center transition-all shadow-[0_2px_8px_rgba(16,36,58,0.15)]" href="#">
                تفاصيل المشروع
              </a>
<a className="h-11 rounded-lg bg-surface-container text-primary font-title-md text-title-md hover:bg-secondary-container hover:text-on-secondary-container flex items-center justify-center transition-all" href="#">
                استكشف الوحدات (19)
              </a>
</div>
</div>
</div>
</article>
<!-- Card 4: تلال إيزيس الفندقية -->
<article className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(16,36,58,0.06)] hover:shadow-[0_12px_36px_-6px_rgba(16,36,58,0.12)] transition-all duration-300 group">
<!-- Visual Container with Badge -->
<div className="relative h-64 w-full overflow-hidden bg-surface-container">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Elevated panoramic architectural towers in Sheikh Zayed Cairo with terraced sky gardens, golden decorative solar louvers, grand hotel drop-off lobby, fountain plaza and view of sunset horizon, modern monumental Egyptian styling." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFnEZNTUALJyDpbl5vKFPZ36gwl0E4eZSdrcMQxB4Q0rh5R2uDlrQu0-yrwKDu45feaQrP8D7hLDU_RVBGea_GYLMuYpS12k95fHwA1bxoiVKCt8UGA4YfVGINvCs2VLTvbfkhkkxpiro723suuBEZ1SS3-iU-ZLf9_5Pp0PzUkZvREcWnM5rRZCb9BPIVm4i7kfkZdai8K37L8Fo7s4fK6c5X0JpW6C1I1c1ZS7lvL0ZhvVLvL3cpzQ')"></div>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-black/20"></div>
<!-- Top Badges -->
<div className="absolute top-4 right-4 flex items-center gap-2">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary text-label-sm font-label-sm shadow-md backdrop-blur-md">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
              مشروع قادم - فتح باب التسجيل
            </span>
</div>
<div className="absolute top-4 left-4">
<button className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-primary flex items-center justify-center transition-colors shadow-sm" title="إضافة للمفضلة">
<span className="material-symbols-outlined text-[18px]">bookmark_border</span>
</button>
</div>
<!-- Bottom Image Tag -->
<div className="absolute bottom-3 right-4 left-4 flex items-center justify-between text-on-primary">
<span className="inline-flex items-center gap-1 text-label-sm font-label-sm bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
<span className="material-symbols-outlined text-[16px] text-secondary-fixed">hotel</span>
              إدارة فندقية عالمية 5 نجوم
            </span>
<span className="font-label-sm text-label-sm text-secondary-fixed">وصلة دهشور</span>
</div>
</div>
<!-- Card Content Body -->
<div className="p-5 flex flex-col flex-1 justify-between gap-4">
<div>
<div className="flex items-center gap-1.5 text-secondary text-label-sm font-label-sm mb-1">
<span className="material-symbols-outlined text-[16px]">location_on</span>
              الشيخ زايد • طريق وصلة دهشور
            </div>
<h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors mb-2">
              تلال إيزيس الفندقية
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 leading-relaxed">
              أجنحة فندقية مفروشة بالكامل وبنتهاوس بإدارة مشغّل فندقي سويسري مع عائد استثماري إيجاري بالدولار والجنيه.
            </p>
</div>
<!-- Feature Pills -->
<div className="grid grid-cols-3 gap-2 py-3 bg-surface-container-low rounded-lg text-center">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">الوحدات المتاحة</span>
<span className="font-title-md text-title-md text-primary font-bold">45 جناح</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">العائد المتوقع</span>
<span className="font-title-md text-title-md text-primary font-bold">14% سنوياً</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">المساحات</span>
<span className="font-title-md text-title-md text-primary font-bold">60 م² - 210 م²</span>
</div>
</div>
<!-- Financial Price & CTA actions -->
<div className="pt-2 flex flex-col gap-3">
<div className="flex items-baseline justify-between">
<span className="font-label-sm text-label-sm text-outline">السعر الافتتاحي:</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-financial-numeric text-primary">9,200,000</span>
<span className="font-label-md text-label-md text-secondary font-bold">ج.م</span>
</div>
</div>
<div className="grid grid-cols-2 gap-2 pt-1">
<a className="h-11 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary flex items-center justify-center transition-all shadow-[0_2px_8px_rgba(16,36,58,0.15)]" href="#">
                تفاصيل المشروع
              </a>
<a className="h-11 rounded-lg bg-surface-container text-primary font-title-md text-title-md hover:bg-secondary-container hover:text-on-secondary-container flex items-center justify-center transition-all" href="#">
                استكشف الوحدات (45)
              </a>
</div>
</div>
</div>
</article>
<!-- Card 5: بوابة الكرنك بيزنس بارك -->
<article className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(16,36,58,0.06)] hover:shadow-[0_12px_36px_-6px_rgba(16,36,58,0.12)] transition-all duration-300 group">
<!-- Visual Container with Badge -->
<div className="relative h-64 w-full overflow-hidden bg-surface-container">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Futuristic low-rise corporate business park in New Cairo with cantilevered glass pavilions, monumental stone pylon entry gate, outdoor executive cafe terraces, solar panels, and luxury electric vehicles in courtyard." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuClvuvT3RosW14iQRZAlbDosCgEJL6BX6yQTBnl4wmtoxyHNd4MYQP8rC6tN9zzZdzb1eZK4GODRuOaogHWV-5YYXHY4n-BGico7p2dP1h2OcWPeqG9sazB_HIodC6XLjl-8Viu05qovhoV-nmWAq7a4dsYZHPP70nFK2vk9OBhd66WlkLUeYc_rgPnf-ns0tuj6nR8RQUXiNre4WjyN-I9w8PofDUUy0ygppaxmbaD1fePOU5Y92jffA')"></div>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-black/20"></div>
<!-- Top Badges -->
<div className="absolute top-4 right-4 flex items-center gap-2">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/90 text-on-primary text-label-sm font-label-sm shadow-md backdrop-blur-md">
<span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
              قيد الإنشاء 2025
            </span>
</div>
<div className="absolute top-4 left-4">
<button className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-primary flex items-center justify-center transition-colors shadow-sm" title="إضافة للمفضلة">
<span className="material-symbols-outlined text-[18px]">bookmark_border</span>
</button>
</div>
<!-- Bottom Image Tag -->
<div className="absolute bottom-3 right-4 left-4 flex items-center justify-between text-on-primary">
<span className="inline-flex items-center gap-1 text-label-sm font-label-sm bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
<span className="material-symbols-outlined text-[16px] text-secondary-fixed">domain</span>
              مباشرة على محور محمد بن زايد
            </span>
<span className="font-label-sm text-label-sm text-secondary-fixed">Commercial</span>
</div>
</div>
<!-- Card Content Body -->
<div className="p-5 flex flex-col flex-1 justify-between gap-4">
<div>
<div className="flex items-center gap-1.5 text-secondary text-label-sm font-label-sm mb-1">
<span className="material-symbols-outlined text-[16px]">location_on</span>
              القاهرة الجديدة • محور بن زايد
            </div>
<h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors mb-2">
              بوابة الكرنك بيزنس بارك
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 leading-relaxed">
              مجمع مقرات شركات ومراكز طبية ذكية مبني وفق شهادة الاستدامة LEED الذهبية لتوفير كفاءة تشغيلية بنسبة 35%.
            </p>
</div>
<!-- Feature Pills -->
<div className="grid grid-cols-3 gap-2 py-3 bg-surface-container-low rounded-lg text-center">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">الوحدات المتاحة</span>
<span className="font-title-md text-title-md text-primary font-bold">24 مقر</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">الاستخدام</span>
<span className="font-title-md text-title-md text-primary font-bold">إداري وطبي</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">مواقف السيارات</span>
<span className="font-title-md text-title-md text-primary font-bold">3 أدوار تحت الأرض</span>
</div>
</div>
<!-- Financial Price & CTA actions -->
<div className="pt-2 flex flex-col gap-3">
<div className="flex items-baseline justify-between">
<span className="font-label-sm text-label-sm text-outline">السعر الافتتاحي:</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-financial-numeric text-primary">6,100,000</span>
<span className="font-label-md text-label-md text-secondary font-bold">ج.م</span>
</div>
</div>
<div className="grid grid-cols-2 gap-2 pt-1">
<a className="h-11 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary flex items-center justify-center transition-all shadow-[0_2px_8px_rgba(16,36,58,0.15)]" href="#">
                تفاصيل المشروع
              </a>
<a className="h-11 rounded-lg bg-surface-container text-primary font-title-md text-title-md hover:bg-secondary-container hover:text-on-secondary-container flex items-center justify-center transition-all" href="#">
                استكشف الوحدات (24)
              </a>
</div>
</div>
</div>
</article>
<!-- Card 6: ريفييرا رمسيس كوست -->
<article className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_24px_-4px_rgba(16,36,58,0.06)] hover:shadow-[0_12px_36px_-6px_rgba(16,36,58,0.12)] transition-all duration-300 group">
<!-- Visual Container with Badge -->
<div className="relative h-64 w-full overflow-hidden bg-surface-container">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Exclusive ultra-luxury waterfront lagoon villas in El Gouna Red Sea Egypt, warm sunset casting amber reflections across tranquil private marina, contemporary Nubian and Egyptian architectural stone motifs, private yacht slips, evening pool deck illumination." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWKhwyWH1KarxTP7yQ__rgdMsMIe3bIsdokHX8gMx4AGGp76m9mxB3F1G1vKE2qxw5YJ-j4anqtMdd09czbo6hYU1S6kBBtRg5fyvElI5NVhKrHRpe4u_U_9uYfKdXCSP-nIp7fmib2hdJ5qCkV68X--KZAjJnzzGwj-t-Ik-9qoj_VkEixlVpiGS7i1Fco9cmCoQQHonmu9LFUyBvweP37CrzhWjfs_8AKzaSMyaJqK_4QeC9OvjwpA')"></div>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-black/20"></div>
<!-- Top Badges -->
<div className="absolute top-4 right-4 flex items-center gap-2">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface text-label-sm font-label-sm shadow-md backdrop-blur-md">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
              مكتمل ومسلم - إعادة بيع استثمارية
            </span>
</div>
<div className="absolute top-4 left-4">
<button className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-primary flex items-center justify-center transition-colors shadow-sm" title="إضافة للمفضلة">
<span className="material-symbols-outlined text-[18px]">bookmark_border</span>
</button>
</div>
<!-- Bottom Image Tag -->
<div className="absolute bottom-3 right-4 left-4 flex items-center justify-between text-on-primary">
<span className="inline-flex items-center gap-1 text-label-sm font-label-sm bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
<span className="material-symbols-outlined text-[16px] text-secondary-fixed">sailing</span>
              مرفأ يخوت خاص بالمنتجع
            </span>
<span className="font-label-sm text-label-sm text-secondary-fixed">Red Sea Coast</span>
</div>
</div>
<!-- Card Content Body -->
<div className="p-5 flex flex-col flex-1 justify-between gap-4">
<div>
<div className="flex items-center gap-1.5 text-secondary text-label-sm font-label-sm mb-1">
<span className="material-symbols-outlined text-[16px]">location_on</span>
              البحر الأحمر • منتجع الجونة
            </div>
<h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors mb-2">
              ريفييرا رمسيس كوست
            </h3>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 leading-relaxed">
              قصور عائمة وفيلات شاطئية مستقلة تطل مباشرة على المياه الصافية مع مهبط طائرات هليكوبتر ونادٍ لليخوت.
            </p>
</div>
<!-- Feature Pills -->
<div className="grid grid-cols-3 gap-2 py-3 bg-surface-container-low rounded-lg text-center">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">الوحدات المتاحة</span>
<span className="font-title-md text-title-md text-primary font-bold">8 فيلات نادرة</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">حالة التشطيب</span>
<span className="font-title-md text-title-md text-primary font-bold">مفروش بالكامل</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">المساحة</span>
<span className="font-title-md text-title-md text-primary font-bold">540 م²</span>
</div>
</div>
<!-- Financial Price & CTA actions -->
<div className="pt-2 flex flex-col gap-3">
<div className="flex items-baseline justify-between">
<span className="font-label-sm text-label-sm text-outline">السعر الافتتاحي:</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-financial-numeric text-primary">24,500,000</span>
<span className="font-label-md text-label-md text-secondary font-bold">ج.م</span>
</div>
</div>
<div className="grid grid-cols-2 gap-2 pt-1">
<a className="h-11 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary flex items-center justify-center transition-all shadow-[0_2px_8px_rgba(16,36,58,0.15)]" href="#">
                تفاصيل المشروع
              </a>
<a className="h-11 rounded-lg bg-surface-container text-primary font-title-md text-title-md hover:bg-secondary-container hover:text-on-secondary-container flex items-center justify-center transition-all" href="#">
                استكشف الوحدات (8)
              </a>
</div>
</div>
</div>
</article>
</div>
<!-- Empty State UI Component (Hidden by default, ready for filter logic) -->
<div className="hidden flex flex-col items-center justify-center p-12 bg-surface-container-lowest rounded-xl shadow-sm text-center" id="filter-empty-state">
<div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-4">
<span className="material-symbols-outlined text-[32px]">apartment</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-primary mb-2">لم نتمكن من العثور على مشروعات تطابق اختياراتك</h3>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-6 leading-relaxed">
        يرجى تجربة تعديل معايير البحث، أو إزالة بعض الفلاتر المحددة لاستعراض مشروعاتنا العقارية الأخرى في مختلف المدن.
      </p>
<button className="h-11 px-6 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all" type="button">
        إعادة تعيين الفلاتر
      </button>
</div>
<!-- Pagination & Load More Controls -->
<div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-2">
<div className="text-on-surface-variant font-label-md text-label-md">
        عرض <span className="text-primary font-bold">1 - 6</span> من إجمالي <span className="text-primary font-bold">14</span> مشروع استثماري
      </div>
<div className="flex items-center gap-2">
<button aria-label="الصفحة السابقة" className="w-10 h-10 rounded-lg bg-surface-container-low text-outline cursor-not-allowed flex items-center justify-center transition-colors" disabled="" type="button">
<span className="material-symbols-outlined text-[20px] rotate-180">chevron_right</span>
</button>
<button className="w-10 h-10 rounded-lg bg-primary-container text-on-primary font-bold flex items-center justify-center shadow-sm" type="button">
          1
        </button>
<button className="w-10 h-10 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-medium flex items-center justify-center transition-colors" type="button">
          2
        </button>
<button className="w-10 h-10 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-medium flex items-center justify-center transition-colors" type="button">
          3
        </button>
<button aria-label="الصفحة التالية" className="w-10 h-10 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container flex items-center justify-center transition-colors" type="button">
<span className="material-symbols-outlined text-[20px] rotate-180">chevron_left</span>
</button>
</div>
<button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-container text-primary hover:bg-secondary-container hover:text-on-secondary-container transition-all font-title-md text-title-md shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">expand_more</span>
        تحميل المزيد من المشروعات
      </button>
</div>
<!-- VIP Private Advisory Banner (Bottom CTA) -->
<div className="relative w-full rounded-2xl bg-primary-container overflow-hidden p-8 lg:p-12 shadow-[0_16px_40px_-8px_rgba(16,36,58,0.25)] text-on-primary my-4">
<!-- Decorative Backdrop Geometry -->
<div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-secondary/15 blur-3xl pointer-events-none"></div>
<div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-surface-tint/20 blur-3xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
<div className="max-w-2xl text-center lg:text-right">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-secondary-fixed mb-4">
<span className="material-symbols-outlined text-[16px]">stars</span>
<span className="font-label-sm text-label-sm">خدمات كبار المستثمرين UHNW</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-primary mb-3">
            هل تبحث عن فرصة استثمارية بمواصفات خاصة؟
          </h2>
<p className="font-body-lg text-body-lg text-inverse-primary leading-relaxed">
            يقدم فريق المستشارين العقاريين لشركة مستقبل الفراعنة دراسات جدوى مالية معمقة ومحافظ استثمارية صممت خصيصاً لتناسب تطلعاتكم الاستثمارية والائتمانية.
          </p>
</div>
<div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
<a className="w-full sm:w-auto h-12 px-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed font-title-md text-title-md hover:bg-secondary-fixed-dim transition-all flex items-center justify-center gap-2 shadow-lg" href="#">
<span className="material-symbols-outlined text-[20px]">calendar_month</span>
            حجز استشارة خاصة
          </a>
<a className="w-full sm:w-auto h-12 px-6 rounded-lg bg-white/10 text-on-primary hover:bg-white/20 transition-all font-title-md text-title-md flex items-center justify-center gap-2" href="#">
<span className="material-symbols-outlined text-[20px]">support_agent</span>
            محادثة فورية (واتساب)
          </a>
</div>
</div>
</div>
</div>
</div>
<script>
  // Simple interactive tab toggle feedback
  document.querySelectorAll('#status-tabs button').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelectorAll('#status-tabs button').forEach(b => {
        b.className = 'px-5 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface-variant font-title-md text-title-md hover:bg-surface-container hover:text-on-surface transition-all flex items-center gap-2 shrink-0 shadow-sm';
      });
      this.className = 'px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md shadow-sm transition-all hover:bg-primary flex items-center gap-2 shrink-0';
    });
  });
</script></main><footer className="w-full bg-surface-container-lowest text-on-surface shadow-[0_-1px_12px_rgba(16,36,58,0.03)]"><div className="max-w-7xl mx-auto px-6 lg:px-12 pt-space-xl pb-space-lg"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl pb-space-xl"><div className="lg:col-span-2 flex flex-col gap-space-md"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-secondary-fixed"><span className="material-symbols-outlined text-[22px]">account_balance</span></div><div className="flex flex-col text-right"><span className="font-title-lg text-title-lg text-primary">مستقبل الفراعنة</span><span className="font-label-sm text-label-sm text-secondary">صرح التشييد والاستثمار العقاري الفاخر</span></div></div><p className="font-body-md text-body-md text-on-surface-variant max-w-md leading-relaxed">نؤسس لمعايير هندسية خالدة تجسد عظمة الحضارة المصرية العريقة وتترجمها إلى مجمعات سكنية واستثمارية فائقة الفخامة وفق أرقى النظم العالمية للبناء الذكي والاستدامة المؤسسية.</p><div className="flex items-center gap-3 pt-space-xs"><div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-secondary-container hover:text-on-secondary-container transition-colors"><span className="material-symbols-outlined text-[18px]">call</span></div><div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-secondary-container hover:text-on-secondary-container transition-colors"><span className="material-symbols-outlined text-[18px]">mail</span></div><div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-secondary-container hover:text-on-secondary-container transition-colors"><span className="material-symbols-outlined text-[18px]">location_on</span></div></div></div><div className="flex flex-col gap-space-sm"><h4 className="font-title-md text-title-md text-primary font-bold">أبرز الوجهات والمشروعات</h4><ul className="flex flex-col gap-2.5 text-on-surface-variant font-body-md text-body-md"><li><a className="hover:text-secondary transition-colors" href="#">العاصمة الإدارية الجديدة</a></li><li><a className="hover:text-secondary transition-colors" href="#">القاهرة الجديدة والتجمع</a></li><li><a className="hover:text-secondary transition-colors" href="#">الساحل الشمالي المميز</a></li><li><a className="hover:text-secondary transition-colors" href="#">مدينة الشيخ زايد</a></li><li><a className="hover:text-secondary transition-colors" href="#">الأبراج الإدارية المتكاملة</a></li></ul></div><div className="flex flex-col gap-space-sm"><h4 className="font-title-md text-title-md text-primary font-bold">علاقات المستثمرين</h4><ul className="flex flex-col gap-2.5 text-on-surface-variant font-body-md text-body-md"><li><a className="hover:text-secondary transition-colors" href="#">المحافظ العقارية الاستثمارية</a></li><li><a className="hover:text-secondary transition-colors" href="#">تقارير العوائد والأداء المالي</a></li><li><a className="hover:text-secondary transition-colors" href="#">الامتثال وحماية المستهلك</a></li><li><a className="hover:text-secondary transition-colors" href="#">معايير البنك المركزي المصري</a></li><li><a className="hover:text-secondary transition-colors" href="#">الاستشارات المالية للأصول</a></li></ul></div><div className="flex flex-col gap-space-sm"><h4 className="font-title-md text-title-md text-primary font-bold">مركز التواصل المباشر</h4><div className="flex flex-col gap-3 font-body-md text-body-md text-on-surface-variant"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-[20px]">support_agent</span><span className="font-financial-numeric text-financial-numeric text-primary">+20 2 2840 9000</span></div><p className="font-label-md text-label-md text-outline">مركز الخدمة والاستفسارات الفاخرة متاح على مدار الساعة طوال أيام الأسبوع.</p><div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1"><span className="font-label-sm text-label-sm text-secondary font-bold">ترخيص هيئة المجتمعات العمرانية</span><span className="font-label-sm text-label-sm text-on-surface-variant">سجل تطوير عقاري معتمد رقم 4892/2021</span></div></div></div></div><div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-label-md text-label-md"><div className="flex items-center gap-space-md flex-wrap justify-center"><span className="text-primary font-bold">جميع الحقوق محفوظة © 2025</span><span>شركة مستقبل الفراعنة للاستثمار والتطوير العقاري ش.م.م.</span></div><div className="flex items-center gap-space-md"><a className="hover:text-on-surface transition-colors" href="#">سياسة الخصوصية</a><span className="text-outline-variant">•</span><a className="hover:text-on-surface transition-colors" href="#">الشروط والأحكام</a><span className="text-outline-variant">•</span><a className="hover:text-on-surface transition-colors" href="#">ميثاق الحوكمة</a></div></div></div></footer>`;

export default ProjectsPage;
