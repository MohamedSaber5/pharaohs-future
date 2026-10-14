import { useEffect, useRef } from 'react';

/**
 * HomePage
 * Auto-generated from Stitch HTML design — preserves exact Tailwind classes & layout
 */
const HomePage = () => {
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

const html = `<header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(16,36,58,0.06)]"><div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-lg"><a className="flex items-center gap-3 group" data-path="home" href="#"><div className="w-11 h-11 rounded-lg bg-primary-container flex items-center justify-center text-secondary-fixed shadow-[0_2px_10px_rgba(16,36,58,0.15)]"><span className="material-symbols-outlined text-[24px]">account_balance</span></div><div className="flex flex-col text-right"><span className="font-title-lg text-title-lg text-primary tracking-tight leading-tight">مستقبل الفراعنة</span><span className="font-label-sm text-label-sm text-secondary tracking-normal">للاستثمار والتطوير العقاري</span></div></a><nav className="hidden xl:flex items-center gap-space-lg mr-space-md" data-active-classes="text-secondary font-title-md"><a aria-current="page" className="transition-colors py-2 text-secondary font-title-md" data-path="home" href="#">الرئيسية</a><a className="font-title-md text-title-md text-on-surface-variant hover:text-on-surface transition-colors py-2" data-path="projects-portfolio" href="#">مشروعاتنا</a><a className="font-title-md text-title-md text-on-surface-variant hover:text-on-surface transition-colors py-2" data-path="available-inventory" href="#">الوحدات المتاحة</a><a className="font-title-md text-title-md text-on-surface-variant hover:text-on-surface transition-colors py-2" data-path="about-us" href="#">من نحن</a><a className="font-title-md text-title-md text-on-surface-variant hover:text-on-surface transition-colors py-2" data-path="contact-us" href="#">تواصل معنا</a></nav></div><div className="flex items-center gap-space-md"><div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low text-on-surface"><span className="material-symbols-outlined text-secondary text-[18px]">payments</span><span className="font-label-md text-label-md text-secondary">ج.م</span><span className="font-label-sm text-label-sm text-outline">EGP</span></div><div className="flex items-center gap-2"><a className="hidden md:inline-flex items-center justify-center h-10 px-4 rounded-lg font-title-md text-title-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="sign-in" href="#">تسجيل الدخول</a><a className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all shadow-[0_4px_16px_-4px_rgba(16,36,58,0.25)]" data-path="register" href="#">إنشاء حساب جديد</a></div><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]"><div className="flex flex-col w-full">
<!-- 1. HERO SECTION -->
<section className="relative w-full -mt-20 overflow-hidden bg-primary-container text-on-primary">
<!-- Cinematic Background Visual -->
<div className="absolute inset-0 w-full h-full bg-cover bg-center scale-105 transition-transform duration-1000 ease-out" data-alt="Ultra-luxury cliffside modern villa at warm sunset overlooking calm sea waters and coastal mountains. The villa features expansive floor-to-ceiling glass walls with warm interior illumination, cantilevered architectural levels, an infinity pool reflecting the golden orange and purple twilight sky, palm trees, sunken lounge fire pits, and premium travertine marble terraces matching royal Egyptian architectural elegance." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuATa4Oi0yS3kNRr9mqsKyGZ9KGvNs9D7VXdLif8ppgdccHMYATEOM3UtfCyjUGxEwIDJYKbwr9pTJZr3rx9eP6VbPxYArgcxur_UnXZTzZjEyA7NemszADlJ4BSmuNbNe6IfXr83qE-1nZhM5N-7qgB-awykAk1gA7dBBPxyNvTbc96PqW79x9iDlAPSOCYi5nDU5tidE3MgEL-rpTPl4shrCLB52IRNhgjy4FczXjTS34wph2WKzOHqw')">
</div>
<!-- Scrim & Architectural Ambient Lighting -->
<div className="absolute inset-0 bg-gradient-to-t from-primary via-primary-container/80 to-primary-container/60"></div>
<div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent"></div>
<div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>
<!-- Hero Content -->
<div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-36 lg:pb-44 flex flex-col justify-center min-h-[901px]">
<!-- Architectural Overline -->
<div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container-lowest/10 backdrop-blur-md border-0 w-fit mb-6 shadow-sm">
<span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider">الصرح المعماري الأول للاستثمار الفاخر</span>
</div>
<!-- Main Headline -->
<h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-on-primary max-w-4xl tracking-tight leading-tight lg:leading-[1.15] mb-6">
        ابدأ مستقبلَك العقاري مع <span className="text-secondary-fixed">مستقبل الفراعنة</span>
</h1>
<!-- Supporting Statement -->
<p className="font-body-lg text-body-lg text-inverse-on-surface max-w-2xl leading-relaxed mb-10">
        نبتكر مجتمعات سكنية واستثمارية فائقة الفخامة بمعايير عالمية تجمع بين عراقة التراث ورؤية المستقبل المعماري المستدام. استكشف نخبة المشاريع واحجز وحدتك بمرونة تعاقدية استثنائية وبأعلى عوائد رأسمالية في مصر.
      </p>
<!-- Action Steppers -->
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
<a className="inline-flex items-center justify-center gap-3 h-14 px-8 rounded-lg bg-secondary text-on-primary font-title-lg text-title-lg shadow-xl shadow-secondary/20 hover:bg-on-secondary-container transition-all group" href="#projects">
<span>اكتشف مشروعاتنا</span>
<span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_left_alt</span>
</a>
<a className="inline-flex items-center justify-center gap-3 h-14 px-8 rounded-lg bg-surface-container-lowest/15 backdrop-blur-md text-on-primary font-title-lg text-title-lg hover:bg-surface-container-lowest/25 transition-all" href="#available-units">
<span className="material-symbols-outlined text-secondary-fixed text-[22px]">domain</span>
<span>استكشف الوحدات المتاحة</span>
</a>
</div>
<!-- Institutional Trust Badges Strip -->
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-8 max-w-3xl">
<div className="flex items-center gap-3.5 bg-surface-container-lowest/5 backdrop-blur-sm p-3.5 rounded-xl">
<div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary-fixed">
<span className="material-symbols-outlined text-[22px]">history_edu</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-primary font-bold">+25 عاماً</span>
<span className="font-label-md text-label-md text-on-primary-container">من الريادة المعمارية الموثقة</span>
</div>
</div>
<div className="flex items-center gap-3.5 bg-surface-container-lowest/5 backdrop-blur-sm p-3.5 rounded-xl">
<div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary-fixed">
<span className="material-symbols-outlined text-[22px]">verified</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-primary font-bold">100% الالتزام</span>
<span className="font-label-md text-label-md text-on-primary-container">تسليم في الموعد التعاقدي</span>
</div>
</div>
<div className="flex items-center gap-3.5 bg-surface-container-lowest/5 backdrop-blur-sm p-3.5 rounded-xl">
<div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary-fixed">
<span className="material-symbols-outlined text-[22px]">gavel</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-primary font-bold">تراخيص معتمدة</span>
<span className="font-label-md text-label-md text-on-primary-container">قرارات وزارية وهيئة المجتمعات</span>
</div>
</div>
</div>
</div>
</section>
<!-- 2. LUXURY HORIZONTAL SEARCH PANEL (Overlapping Floating Bar) -->
<section className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 -mt-14 w-full">
<div className="bg-surface-container-lowest rounded-2xl shadow-2xl p-6 lg:p-8">
<!-- Search Intent Tabs -->
<div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6" id="search-tabs">
<button className="search-tab active px-6 py-2.5 rounded-full font-title-md text-title-md bg-primary-container text-on-primary flex items-center gap-2 transition-all shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">cottage</span>
<span>شراء سكني</span>
</button>
<button className="search-tab px-6 py-2.5 rounded-full font-title-md text-title-md bg-surface-container-low text-on-surface hover:bg-surface-container transition-all flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-[18px]">corporate_fare</span>
<span>استثمار تجاري وإداري</span>
</button>
<button className="search-tab px-6 py-2.5 rounded-full font-title-md text-title-md bg-surface-container-low text-on-surface hover:bg-surface-container transition-all flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-[18px]">pool</span>
<span>فيلات وشاليهات ساحلية</span>
</button>
</div>
<!-- Filters Grid -->
<form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
<!-- Area Selector -->
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[16px]">location_on</span>
<span>المدينة / المنطقة</span>
</label>
<div className="relative">
<select className="w-full h-12 pr-4 pl-10 rounded-lg bg-surface-container-low text-on-surface font-title-md text-title-md appearance-none focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-secondary cursor-pointer">
<option value="">كافة الوجهات العقارية</option>
<option value="new-capital">العاصمة الإدارية الجديدة (R7 &amp; CBD)</option>
<option value="new-cairo">القاهرة الجديدة - التجمع (Golden Square)</option>
<option value="north-coast">الساحل الشمالي - رأس الحكمة</option>
<option value="zayed">مدينة الشيخ زايد وغرب القاهرة</option>
</select>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[20px]">keyboard_arrow_down</span>
</div>
</div>
<!-- Property Type -->
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[16px]">home_work</span>
<span>نوع الوحدة</span>
</label>
<div className="relative">
<select className="w-full h-12 pr-4 pl-10 rounded-lg bg-surface-container-low text-on-surface font-title-md text-title-md appearance-none focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-secondary cursor-pointer">
<option value="">جميع الأنماط</option>
<option value="villa">فيلا مستقلة (Stand-alone Villa)</option>
<option value="penthouse">بنتهاوس بانورامي (Penthouse)</option>
<option value="duplex">دوبلكس مع حديقة (Garden Duplex)</option>
<option value="townhouse">تاون هاوس عصري (Townhouse)</option>
<option value="luxury-apartment">شقة فندقية فاخرة (Luxury Apartment)</option>
</select>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[20px]">keyboard_arrow_down</span>
</div>
</div>
<!-- Rooms Count -->
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[16px]">bed</span>
<span>عدد الغرف</span>
</label>
<div className="relative">
<select className="w-full h-12 pr-4 pl-10 rounded-lg bg-surface-container-low text-on-surface font-title-md text-title-md appearance-none focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-secondary cursor-pointer">
<option value="">أي عدد غرف</option>
<option value="1-2">1 - 2 غرف نوم</option>
<option value="3">3 غرف نوم رئيسية</option>
<option value="4+">4 غرف فاخرة فأكثر</option>
</select>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[20px]">keyboard_arrow_down</span>
</div>
</div>
<!-- Budget Range -->
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[16px]">payments</span>
<span>النطاق الاستثماري</span>
</label>
<div className="relative">
<select className="w-full h-12 pr-4 pl-10 rounded-lg bg-surface-container-low text-on-surface font-title-md text-title-md appearance-none focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-secondary cursor-pointer">
<option value="">جميع الميزانيات</option>
<option value="5-10">من 5 إلى 10 ملايين ج.م</option>
<option value="10-20">من 10 إلى 20 مليون ج.م</option>
<option value="20-35">من 20 إلى 35 مليون ج.م</option>
<option value="35+">35+ مليون ج.م فما فوق</option>
</select>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[20px]">keyboard_arrow_down</span>
</div>
</div>
<!-- Submit Button -->
<div className="flex flex-col">
<button className="w-full h-12 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-title-md text-title-md flex items-center justify-center gap-2 shadow-lg shadow-primary-container/20 transition-all" type="submit">
<span className="material-symbols-outlined text-[20px]">search</span>
<span>بحث عن الوحدات المتاحة</span>
</button>
</div>
</form>
</div>
</section>
<!-- 3. STATS STRIP / KEY METRICS -->
<section className="w-full py-16 bg-surface mt-10">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
<!-- Metric 1 -->
<div className="flex flex-col items-start p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary mb-4">
<span className="material-symbols-outlined text-[28px]">apartment</span>
</div>
<span className="font-financial-numeric text-[36px] leading-tight text-primary font-bold">+14</span>
<span className="font-title-md text-title-md text-on-surface font-semibold mt-1">مشروع استثماري وسكني</span>
<p className="font-label-md text-label-md text-on-surface-variant mt-1">مجمعات مصممة وفق أحدث طرز العمارة الدولية</p>
</div>
<!-- Metric 2 -->
<div className="flex flex-col items-start p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary mb-4">
<span className="material-symbols-outlined text-[28px]">key</span>
</div>
<span className="font-financial-numeric text-[36px] leading-tight text-secondary font-bold">+480</span>
<span className="font-title-md text-title-md text-on-surface font-semibold mt-1">وحدة مطروحة للتسليم</span>
<p className="font-label-md text-label-md text-on-surface-variant mt-1">خيارات استلام فوري وقيد الإنشاء المتقدم</p>
</div>
<!-- Metric 3 -->
<div className="flex flex-col items-start p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary mb-4">
<span className="material-symbols-outlined text-[28px]">group</span>
</div>
<span className="font-financial-numeric text-[36px] leading-tight text-primary font-bold">+12,500</span>
<span className="font-title-md text-title-md text-on-surface font-semibold mt-1">عميل ومستثمر يثقون بنا</span>
<p className="font-label-md text-label-md text-on-surface-variant mt-1">مجتمع نخبة العائلات وكبار المستثمرين العقاريين</p>
</div>
<!-- Metric 4 -->
<div className="flex flex-col items-start p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary mb-4">
<span className="material-symbols-outlined text-[28px]">handshake</span>
</div>
<span className="font-financial-numeric text-[36px] leading-tight text-secondary font-bold">98.4%</span>
<span className="font-title-md text-title-md text-on-surface font-semibold mt-1">نسبة رضا العملاء والالتزام</span>
<p className="font-label-md text-label-md text-on-surface-variant mt-1">وفاء كامل بالمواصفات الهندسية والجداول الزمنية</p>
</div>
</div>
</div>
</section>
<!-- 4. FEATURED PROJECTS SECTION -->
<section className="w-full py-20 bg-surface-container-low" id="projects">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
<!-- Section Header -->
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
<div className="flex flex-col max-w-2xl">
<div className="flex items-center gap-2 mb-2">
<span className="w-8 h-0.5 bg-secondary"></span>
<span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">مشروعاتنا الرائدة</span>
</div>
<h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary tracking-tight">
            وجهات استثمارية وسكنية تعيد تعريف الرفاهية
          </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            محفظة عقارية منتقاة بعناية في أرقى المواقع الجغرافية الاستراتيجية في مصر، تمتاز بتصميم معماري استثنائي وبنية تحتية فائقة الذكاء.
          </p>
</div>
<a className="inline-flex items-center gap-2 font-title-md text-title-md text-secondary hover:text-on-secondary-container transition-colors self-start md:self-auto" href="#">
<span>عرض كافة المشروعات (14)</span>
<span className="material-symbols-outlined text-[20px]">arrow_back</span>
</a>
</div>
<!-- Projects Grid -->
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
<!-- Project 1: Horus Towers (Capital) -->
<article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
<div className="relative h-72 w-full overflow-hidden">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Modern ultra-luxury high-rise residential towers in Cairo with grand cascading fountains, sparkling multi-tiered blue swimming pools, lush date palms, flowering bougainvillea gardens, paved walking promenades, and wealthy residents strolling under radiant bright Egyptian daylight with deep blue skies." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcR-6D_6ayvvGP_Q9MQe9DbamGJ5euASTMQo3lPiA8tPygGKmfSLiyukQT4qKgxU5nVw6J3nyijDfY1Smm43EmVByMzB8yCiPLY6m3IOem6xGy2rWVtv8ICXEhPKabpqEGh69LfmP5QNF2PY80DQHxOMTAjCeej1r-RGifDBIswSef-BgCtrAFwg43a5sd9FJrq5wnMRRdw2J_P6jzTk7GfwTGO1VY1KA0YBK766d3vSoO-WzwIsyoyg')">
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
<!-- Badges -->
<div className="absolute top-4 right-4 flex items-center gap-2">
<span className="px-3.5 py-1.5 rounded-full bg-primary-container/90 text-on-primary font-label-sm text-label-sm backdrop-blur-md">
                العاصمة الإدارية (R7)
              </span>
<span className="px-3 py-1.5 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm flex items-center gap-1.5 shadow-sm">
<span className="w-2 h-2 rounded-full bg-emerald-500"></span>
<span>تسليم 2026</span>
</span>
</div>
<!-- Units Counter Pill -->
<div className="absolute bottom-4 right-4">
<span className="px-3 py-1.5 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-md text-label-md font-semibold">
                48 وحدة متاحة حالياً
              </span>
</div>
</div>
<div className="p-6 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mb-2">
<span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
<span>مباشرة على المحور المركزي والنهر الأخضر</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors mb-2">
                أبراج حورس الاستثمارية
              </h3>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4">
                صرح أيقوني متعدد الاستخدامات يوفر شققاً فندقية وبنتهاوس ومكاتب تجارية فاخرة تطل مباشرة على النهر الأخضر والأيقونة السكنية.
              </p>
<!-- Amenities Tags -->
<div className="flex flex-wrap gap-2 mb-6">
<span className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">water</span> بحيرات مائية
                </span>
<span className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">fitness_center</span> نادي صحي متكامل
                </span>
<span className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">security</span> أمن وتحكم ذكي 24/7
                </span>
</div>
</div>
<div className="pt-4 border-t-0 bg-surface-container-low -mx-6 -mb-6 p-6 flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">يبدأ سعر الوحدات من</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-financial-numeric text-primary">7,450,000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">ج.م</span>
</div>
</div>
<button className="h-11 px-5 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all flex items-center gap-1">
<span>تفاصيل المشروع</span>
<span className="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
</div>
</div>
</article>
<!-- Project 2: Lotus Lagoon Residence (Ras El Hekma) -->
<article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
<div className="relative h-72 w-full overflow-hidden">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Exquisite luxury beachfront standalone villas and private residences in Ras El Hekma North Coast Egypt. Infinity pools seamlessly meet turquoise Mediterranean waters, sandy beaches, modern white stone architectural silhouettes, palm trees, and elegant outdoor dining cabanas at golden afternoon light." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWrxwc7lCwvm5SwbKrXCWV0fPtXuxZuv_9-jPjCL4dwy6aKOVSa8vXXjGhqcuzExJbXdl2OSkg-Jjl-HEgtXU0iNEcDlviICdH9VV8cHk98WsQBMj4gKDgre6cd0Fk_qRsg_EvG5LbL1F3HsrbFjvME_wz1iaub1J9Bqn7hPMBf2Dh77Rx6CUSl-ajHLnebqpO4rlaVbJ_v4hIsH2Ryjs8zd_Hfw0w-KJ7nv5ODJbY5GXoe65GMFhgng')">
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
<!-- Badges -->
<div className="absolute top-4 right-4 flex items-center gap-2">
<span className="px-3.5 py-1.5 rounded-full bg-primary-container/90 text-on-primary font-label-sm text-label-sm backdrop-blur-md">
                الساحل الشمالي (رأس الحكمة)
              </span>
<span className="px-3 py-1.5 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm flex items-center gap-1.5 shadow-sm">
<span className="w-2 h-2 rounded-full bg-amber-500"></span>
<span>جاهز للمعاينة الحية</span>
</span>
</div>
<div className="absolute bottom-4 right-4">
<span className="px-3 py-1.5 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-md text-label-md font-semibold">
                32 وحدة متاحة حالياً
              </span>
</div>
</div>
<div className="p-6 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mb-2">
<span className="material-symbols-outlined text-[16px] text-secondary">beach_access</span>
<span>شاطئ خاص برمال بيضاء ومياهاً فيروزية</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors mb-2">
                كمبوند لوتس لاجون ريزيدنس
              </h3>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4">
                منتجع سكني ساحلي خاص يضم فيلات مستقلة وشاليهات فارهة تحيط بها بحيرات كريستالية شاسعة تضمن خصوصية تامة وإطلالات بحرية مفتوحة.
              </p>
<!-- Amenities Tags -->
<div className="flex flex-wrap gap-2 mb-6">
<span className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">pool</span> لاجونز كريستالية
                </span>
<span className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">sailing</span> مارينا لليخوت
                </span>
<span className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">restaurant</span> مطاعم شاطئية عالمية
                </span>
</div>
</div>
<div className="pt-4 border-t-0 bg-surface-container-low -mx-6 -mb-6 p-6 flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">يبدأ سعر الوحدات من</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-financial-numeric text-primary">12,900,000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">ج.م</span>
</div>
</div>
<button className="h-11 px-5 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all flex items-center gap-1">
<span>تفاصيل المشروع</span>
<span className="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
</div>
</div>
</article>
<!-- Project 3: Pharaohs Greens (Golden Square) -->
<article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
<div className="relative h-72 w-full overflow-hidden">
<div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Magnificent contemporary architectural compound in New Cairo Golden Square featuring luxury townhouses and palatial modern standalone villas, framed by rolling golf greens, manicured botanical courtyards, stone water fountains, and floor-to-ceiling glass pavilions in morning natural sunlight." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAj-qM_2XQd0Z3alE1owsNXM5zU0EiZmLpmJongaMsKmkLXm2Gi8wEVt9TGignBMA3KcKrOZpUyL7zS-5lvsRHDDiEfGi6XGxTIKMuscUTzneLlMBN54g2hQ2ESUB_5EgcWviCdQsEJu8RfHeqwRi45lH_rYr_FVHd5v-UBKNDLjvqM26BSZG5HbUKpLSUqFTNO899tly4ZQh7EuYHQ6AVS0oaL2_BPBFy32F9zCcyDwE5Y-6QAD3-_FQ')">
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
<!-- Badges -->
<div className="absolute top-4 right-4 flex items-center gap-2">
<span className="px-3.5 py-1.5 rounded-full bg-primary-container/90 text-on-primary font-label-sm text-label-sm backdrop-blur-md">
                القاهرة الجديدة (Golden Square)
              </span>
<span className="px-3 py-1.5 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm flex items-center gap-1.5 shadow-sm">
<span className="w-2 h-2 rounded-full bg-blue-500"></span>
<span>تسليم 2025</span>
</span>
</div>
<div className="absolute bottom-4 right-4">
<span className="px-3 py-1.5 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-md text-label-md font-semibold">
                19 وحدة متاحة حالياً
              </span>
</div>
</div>
<div className="p-6 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm mb-2">
<span className="material-symbols-outlined text-[16px] text-secondary">park</span>
<span>قلب المربع الذهبي - بالقرب من الجامعة الأمريكية</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors mb-2">
                الفراعنة جرينز ريزيدنس
              </h3>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4">
                مجتمع مسوّر فائق الهدوء والخصوصية يضم تاون هاوس وفيلات منفصلة، مع مساحات خضراء تشكل 82% من المساحة الإجمالية للمشروع.
              </p>
<!-- Amenities Tags -->
<div className="flex flex-wrap gap-2 mb-6">
<span className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">golf_course</span> ملاعب ونادي اجتماعي
                </span>
<span className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">solar_power</span> طاقة شمسية مستدامة
                </span>
<span className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">local_convenience_store</span> مركز تجاري راقٍ
                </span>
</div>
</div>
<div className="pt-4 border-t-0 bg-surface-container-low -mx-6 -mb-6 p-6 flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">يبدأ سعر الوحدات من</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-financial-numeric text-primary">16,800,000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">ج.م</span>
</div>
</div>
<button className="h-11 px-5 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all flex items-center gap-1">
<span>تفاصيل المشروع</span>
<span className="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
</div>
</div>
</article>
</div>
</div>
</section>
<!-- 5. FEATURED AVAILABLE UNITS SECTION -->
<section className="w-full py-20 bg-surface" id="available-units">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
<!-- Section Title & Interactive Quick Filter -->
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
<div className="flex flex-col max-w-xl">
<div className="flex items-center gap-2 mb-2">
<span className="w-8 h-0.5 bg-secondary"></span>
<span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider">الحجز والاستلام المباشر</span>
</div>
<h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary tracking-tight">
            وحدات مميزة متاحة للحجز الفوري
          </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
            اكتشف نماذج مختارة من أفخم الوحدات السكنية الجاهزة للتعاقد بجدول أقساط ميسر.
          </p>
</div>
<!-- Quick filter chips -->
<div className="flex items-center gap-2 flex-wrap">
<button className="px-4 py-2 rounded-full font-title-md text-title-md bg-primary-container text-on-primary">جميع الوحدات</button>
<button className="px-4 py-2 rounded-full font-title-md text-title-md bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors">فيلات مستقلة</button>
<button className="px-4 py-2 rounded-full font-title-md text-title-md bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors">بنتهاوس فاخر</button>
<button className="px-4 py-2 rounded-full font-title-md text-title-md bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors">دوبلكس بحديقة</button>
</div>
</div>
<!-- Unit Cards Grid -->
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<!-- Unit Card 1: Royal Penthouse -->
<div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
<div className="relative h-64 w-full">
<div className="w-full h-full bg-cover bg-center" data-alt="Interior luxury living room of a high floor royal penthouse apartment overlooking panoramic views of modern towers, green river parks, double-height ceilings, designer Italian marble flooring, bespoke furniture, and golden sunset rays passing through floor-to-ceiling glass." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqrgg8h1LlZjIdM1lwzH0u5iypIwRLH1NgUFBl7f3LJSCWg2lyBWHRHk9vkMJyV8mqp6xrcx6yPgy1enRgAg8gVqmpxRuz0we7_flr0ILpMPgcyWrZBAYtJZPeZd9I36a_YqEjKu3zD6zrzrjXzFLB067qbI50tGAmyQh_ARg7EDY_PGwHS-fWSjIa8kGwkjigeVbvT1UV0oOZCxJH6vPQjNxY8Zwou4x6tjOrvqi_zf3iWsPCelnqew')">
</div>
<!-- Status Badge: Available -->
<div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-label-sm text-label-sm shadow-sm">
<span className="w-2 h-2 rounded-full bg-emerald-500"></span>
<span>متاح للبيع الفوري</span>
</div>
<!-- Plan Type Code -->
<div className="absolute bottom-4 left-4 bg-primary-container/85 backdrop-blur-md px-3 py-1 rounded text-on-primary font-label-sm text-label-sm">
              كود: NC-PH-402
            </div>
</div>
<div className="p-6 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-2">
<span className="font-label-md text-label-md text-secondary font-semibold">أبراج حورس - العاصمة الإدارية</span>
<span className="font-label-sm text-label-sm text-outline">الدور 24 البانورامي</span>
</div>
<h4 className="font-title-lg text-title-lg text-primary font-bold mb-3">
                بنتهاوس ملكي ببانوراما النهر الأخضر
              </h4>
<!-- Architectural Spec Pills -->
<div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-surface-container-low mb-6 text-center">
<div className="flex flex-col items-center">
<span className="font-financial-numeric text-[16px] text-primary">380 م²</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">المساحة الكلية</span>
</div>
<div className="flex flex-col items-center">
<span className="font-financial-numeric text-[16px] text-primary">4 غرف</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">+ جناح خدم</span>
</div>
<div className="flex flex-col items-center">
<span className="font-financial-numeric text-[16px] text-primary">5 حمامات</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">ماستر ديلوكس</span>
</div>
</div>
<!-- Installment Notice -->
<div className="flex items-center justify-between p-3 rounded-lg bg-surface-container mb-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">calendar_month</span>
<span className="font-label-md text-label-md text-on-surface">قسط ربع سنوي:</span>
</div>
<span className="font-financial-numeric text-[16px] text-secondary font-bold">518,000 ج.م</span>
</div>
</div>
<!-- Financial Action Footer -->
<div className="pt-4 flex flex-col gap-3">
<div className="flex items-baseline justify-between">
<span className="font-label-sm text-label-sm text-outline">السعر الإجمالي للوحدة:</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-[24px] text-primary font-bold">18,500,000</span>
<span className="font-label-md text-label-md text-secondary font-bold">ج.م</span>
</div>
</div>
<button className="w-full h-12 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-md">
<span className="material-symbols-outlined text-[20px]">event_seat</span>
<span>حجز موعد للمعاينة الحية</span>
</button>
</div>
</div>
</div>
<!-- Unit Card 2: Sky Villa Zayed -->
<div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
<div className="relative h-64 w-full">
<div className="w-full h-full bg-cover bg-center" data-alt="Modern geometric stone sky villa in Sheikh Zayed Egypt with illuminated private infinity plunge pool on roof terrace, lush landscaped garden on ground floor, luxury lounge furniture, and panoramic sunset desert skyline views." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFosIynMC6u4uTd-oJqLv0bkZGC3iheP7uHLMcpbC2SXZT_n2Ir7wNZq15_lJmyZoLJix-qGELd2EXNFp0cvxHYVz8_jJfPPtsY31VP2bJz8GAGvlVsxNnMxWzUN0Ogoom1fmKpy2ONq02HDfj4UD3UGwYYsDXXi-npNZxkBc4Mn9hlHIjFQFdQmd_bAJFVU_52MR3o8nQYRfps-nzQsapckniqf0Q9m4QneuaiNFb7gR1qFBTCt1RHQ')">
</div>
<div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-label-sm text-label-sm shadow-sm">
<span className="w-2 h-2 rounded-full bg-amber-500"></span>
<span>متاح للحجز (3 وحدات متبقية)</span>
</div>
<div className="absolute bottom-4 left-4 bg-primary-container/85 backdrop-blur-md px-3 py-1 rounded text-on-primary font-label-sm text-label-sm">
              كود: ZY-SV-108
            </div>
</div>
<div className="p-6 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-2">
<span className="font-label-md text-label-md text-secondary font-semibold">كمبوند فرعونيك هايتس - الشيخ زايد</span>
<span className="font-label-sm text-label-sm text-outline">إطلالة خاصة على الوادي</span>
</div>
<h4 className="font-title-lg text-title-lg text-primary font-bold mb-3">
                فيلا مستقلة فاخرة (Sky Villa)
              </h4>
<div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-surface-container-low mb-6 text-center">
<div className="flex flex-col items-center">
<span className="font-financial-numeric text-[16px] text-primary">450 م²</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">+220 م² حديقة</span>
</div>
<div className="flex flex-col items-center">
<span className="font-financial-numeric text-[16px] text-primary">5 غرف</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">ماستر سويت</span>
</div>
<div className="flex flex-col items-center">
<span className="font-financial-numeric text-[16px] text-primary">6 حمامات</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">+ غرفة سائق</span>
</div>
</div>
<div className="flex items-center justify-between p-3 rounded-lg bg-surface-container mb-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">calendar_month</span>
<span className="font-label-md text-label-md text-on-surface">نظام السداد:</span>
</div>
<span className="font-financial-numeric text-[16px] text-secondary font-bold">10% مقدم - 8 سنوات</span>
</div>
</div>
<div className="pt-4 flex flex-col gap-3">
<div className="flex items-baseline justify-between">
<span className="font-label-sm text-label-sm text-outline">السعر الإجمالي للوحدة:</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-[24px] text-primary font-bold">29,200,000</span>
<span className="font-label-md text-label-md text-secondary font-bold">ج.م</span>
</div>
</div>
<button className="w-full h-12 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-md">
<span className="material-symbols-outlined text-[20px]">event_seat</span>
<span>حجز موعد للمعاينة الحية</span>
</button>
</div>
</div>
</div>
<!-- Unit Card 3: North Coast Lagoon Duplex -->
<div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
<div className="relative h-64 w-full">
<div className="w-full h-full bg-cover bg-center" data-alt="Ground floor duplex apartment opening directly into a private crystal lagoon beach with sparkling clear turquoise water, manicured emerald lawn, outdoor stone sun deck with luxury loungers, and bright summer sunshine." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMMaGhUqAc2erIoBQX3vOWWRIwftuiZ6zwIX_dE7n4FBpRqXxXLmEEd3E_7DLa0nCulFtPAv7anXYk3JuqTnUTx2Ag72vtRx1Z39vP87kTSrBWsvEkABVjMODcW8PwZUPPmgaGWUpR16vMTY8PrSL0ulTxcpGawy1FZsHq8PJ1R3iZrVOp79tdxnvT64aQImErKfT5TAcYlKypLqlxEYz9aRUPcmwAspnKrc_99pmEapt7OoyXNeSmxg')">
</div>
<div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-label-sm text-label-sm shadow-sm">
<span className="w-2 h-2 rounded-full bg-emerald-500"></span>
<span>متاح - 5% مقدم فقط</span>
</div>
<div className="absolute bottom-4 left-4 bg-primary-container/85 backdrop-blur-md px-3 py-1 rounded text-on-primary font-label-sm text-label-sm">
              كود: RH-DP-204
            </div>
</div>
<div className="p-6 flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-2">
<span className="font-label-md text-label-md text-secondary font-semibold">لوتس لاجون - رأس الحكمة</span>
<span className="font-label-sm text-label-sm text-outline">مباشرة على اللاجون</span>
</div>
<h4 className="font-title-lg text-title-lg text-primary font-bold mb-3">
                دوبلكس أرضي مع حديقة ولاجون خاص
              </h4>
<div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-surface-container-low mb-6 text-center">
<div className="flex flex-col items-center">
<span className="font-financial-numeric text-[16px] text-primary">260 م²</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">+95 م² حديقة</span>
</div>
<div className="flex flex-col items-center">
<span className="font-financial-numeric text-[16px] text-primary">3 غرف</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">جميعها ماستر</span>
</div>
<div className="flex flex-col items-center">
<span className="font-financial-numeric text-[16px] text-primary">4 حمامات</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">تشطيب ألترا سوبر</span>
</div>
</div>
<div className="flex items-center justify-between p-3 rounded-lg bg-surface-container mb-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">calendar_month</span>
<span className="font-label-md text-label-md text-on-surface">الاستلام المجدول:</span>
</div>
<span className="font-financial-numeric text-[16px] text-secondary font-bold">صيف 2026 كامل التشطيب</span>
</div>
</div>
<div className="pt-4 flex flex-col gap-3">
<div className="flex items-baseline justify-between">
<span className="font-label-sm text-label-sm text-outline">السعر الإجمالي للوحدة:</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-[24px] text-primary font-bold">12,900,000</span>
<span className="font-label-md text-label-md text-secondary font-bold">ج.م</span>
</div>
</div>
<button className="w-full h-12 rounded-lg bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-md">
<span className="material-symbols-outlined text-[20px]">event_seat</span>
<span>حجز موعد للمعاينة الحية</span>
</button>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- 6. WHY CHOOSE US (ARCHITECTURAL PILLARS) -->
<section className="w-full py-24 bg-surface-container-low">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
<div className="text-center max-w-3xl mx-auto mb-16">
<span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider block mb-2">المعايير المؤسسية الفاخرة</span>
<h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary tracking-tight">
          لماذا تختار الاستثمار والعيش مع مستقبل الفراعنة؟
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
          نضع بين يديك منظومة تطوير عقاري متكاملة تضمن الأمان القانوني التام، الاستدامة البيئية، وتعظيم العائد المالي لأصولك الاستثمارية.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
<!-- Pillar 1 -->
<div className="p-8 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col items-start group">
<div className="w-14 h-14 rounded-xl bg-secondary-container/40 text-on-secondary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[32px]">architecture</span>
</div>
<h3 className="font-title-lg text-title-lg text-primary font-bold mb-3">
            هندسة وتشطيبات بمعايير دولية
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            استخدام خامات مستوردة عالية الجودة وأنظمة ذكاء اصطناعي لإدارة الطاقة والمياه لضمان أدنى تكلفة تشغيل وأعلى مستويات الفخامة.
          </p>
</div>
<!-- Pillar 2 -->
<div className="p-8 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col items-start group">
<div className="w-14 h-14 rounded-xl bg-secondary-container/40 text-on-secondary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[32px]">price_change</span>
</div>
<h3 className="font-title-lg text-title-lg text-primary font-bold mb-3">
            خطط سداد مرنة حتى 10 سنوات
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            تسهيلات استثمارية تلائم تطلعاتك المالية بمقدمات تبدأ من 5% وأقساط متساوية بدون فوائد بنكية مركبة ترهق تدفقاتك النقدية.
          </p>
</div>
<!-- Pillar 3 -->
<div className="p-8 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col items-start group">
<div className="w-14 h-14 rounded-xl bg-secondary-container/40 text-on-secondary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[32px]">trending_up</span>
</div>
<h3 className="font-title-lg text-title-lg text-primary font-bold mb-3">
            عائد استثماري وإدارة فندقية
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            نقدم حلول إعادة التأجير وإدارة الممتلكات عبر شراكات مع كبرى العلامات الفندقية العالمية لضمان تدفق عوائد إيجارية مجزية بالعملات الأجنبية.
          </p>
</div>
<!-- Pillar 4 -->
<div className="p-8 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-lg transition-all flex flex-col items-start group">
<div className="w-14 h-14 rounded-xl bg-secondary-container/40 text-on-secondary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[32px]">policy</span>
</div>
<h3 className="font-title-lg text-title-lg text-primary font-bold mb-3">
            أمان قانوني واعتمادات حكومية
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            أراضٍ مسجلة بنسبة 100% وحاصلة على كافة القرارات الوزارية والتراخيص الإنشائية من هيئة المجتمعات العمرانية لحفظ كامل حقوقك.
          </p>
</div>
</div>
</div>
</section>
<!-- 7. CLIENT TESTIMONIALS -->
<section className="w-full py-20 bg-surface">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
<div>
<span className="font-label-md text-label-md text-secondary font-bold uppercase tracking-wider block mb-2">ثقة كبار الملاك والمستثمرين</span>
<h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary tracking-tight">
            قصص وتجارب عملاء مستقبل الفراعنة
          </h2>
</div>
<div className="flex items-center gap-2">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary cursor-pointer hover:bg-secondary-container transition-colors">
<span className="material-symbols-outlined text-[20px]">chevron_right</span>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary cursor-pointer hover:bg-secondary-container transition-colors">
<span className="material-symbols-outlined text-[20px]">chevron_left</span>
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<!-- Testimonial 1 -->
<div className="p-8 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-1 text-secondary mb-4">
<span className="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span className="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span className="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span className="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span className="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
<p className="font-body-lg text-body-lg text-on-surface leading-relaxed mb-6">
              "تجربتي في شراء بنتهاوس في أبراج حورس فاقت كافة توقعاتي. الدقة المتناهية في مواعيد التنفيذ وجودة الواجهات الزجاجية تعكس احترافية من الطراز الأول في السوق المصري."
            </p>
</div>
<div className="flex items-center gap-4 pt-6 border-t border-surface-container">
<div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold">
              د.م
            </div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary font-bold">د. محمود رضوان</span>
<span className="font-label-md text-label-md text-on-surface-variant">استشاري جراحة القلب - مالك وحدة بأبراج حورس</span>
</div>
</div>
</div>
<!-- Testimonial 2 -->
<div className="p-8 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-1 text-secondary mb-4">
<span className="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span className="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span className="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span className="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span className="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
<p className="font-body-lg text-body-lg text-on-surface leading-relaxed mb-6">
              "كمستثمر يدير محفظة أصول متنوعة، أقدر بشدة الالتزام المالي وعقود الشراكة الآمنة لشركة مستقبل الفراعنة. استثماري في الساحل الشمالي حقق لي عائداً رأسمالياً تجاوز 42% في 18 شهراً فقط."
            </p>
</div>
<div className="flex items-center gap-4 pt-6 border-t border-surface-container">
<div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold">
              ع.ش
            </div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary font-bold">المهندس عاصم الشناوي</span>
<span className="font-label-md text-label-md text-on-surface-variant">رجل أعمال ومستثمر عقاري دولي</span>
</div>
</div>
</div>
<!-- Testimonial 3 -->
<div className="p-8 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-1 text-secondary mb-4">
<span className="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span className="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span className="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span className="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
<span className="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">star</span>
</div>
<p className="font-body-lg text-body-lg text-on-surface leading-relaxed mb-6">
              "الهدوء والتصميم البيئي في كمبوند الفراعنة جرينز بالتجمع وفر لعائلتي نمط حياة استثنائي. الأطفال يستمتعون بمساحات الحدائق الآمنة، والخدمات على أعلى مستوى من الرقي."
            </p>
</div>
<div className="flex items-center gap-4 pt-6 border-t border-surface-container">
<div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold">
              ن.س
            </div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary font-bold">أ. نادية السويدي</span>
<span className="font-label-md text-label-md text-on-surface-variant">سيدة أعمال ومقيمة بكمبوند جرينز</span>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- 8. VIP CONSULTATION CTA BANNER -->
<section className="w-full py-20 bg-surface mb-6">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
<div className="relative rounded-3xl bg-primary-container text-on-primary overflow-hidden p-8 sm:p-12 lg:p-16 shadow-2xl">
<!-- Golden ambient decorative glow -->
<div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>
<div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-secondary-fixed/15 blur-3xl pointer-events-none"></div>
<div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
<div className="lg:col-span-7 flex flex-col gap-4">
<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/10 backdrop-blur-md w-fit">
<span className="material-symbols-outlined text-secondary-fixed text-[18px]">workspace_premium</span>
<span className="font-label-sm text-label-sm text-secondary-fixed">خدمة كبار المستثمرين VIP</span>
</div>
<h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-primary font-bold leading-tight">
              هل تبحث عن استشارة استثمارية خاصة أو عقار استثنائي بمواصفات محددة؟
            </h2>
<p className="font-body-lg text-body-lg text-inverse-on-surface max-w-xl leading-relaxed">
              فريق كبار المستشارين العقاريين جاهز لترتيب جولة ميدانية حصرية في مواقع المشروعات أو تقديم دراسة جدوى استثمارية مخصصة لمحفظتك المالية بسرية وتفانٍ كاملين.
            </p>
</div>
<div className="lg:col-span-5 bg-surface-container-lowest text-on-surface rounded-2xl p-6 sm:p-8 shadow-xl">
<h3 className="font-title-lg text-title-lg text-primary font-bold mb-2">طلب استشارة كبار العملاء</h3>
<p className="font-label-md text-label-md text-on-surface-variant mb-6">سيقوم مستشار المحافظ العقارية بالتواصل معك خلال 15 دقيقة</p>
<form className="flex flex-col gap-4">
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md text-on-surface-variant">الاسم بالكامل</label>
<div className="relative">
<input className="w-full h-12 pr-10 pl-4 rounded-lg bg-surface-container-low text-on-surface font-title-md text-title-md focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-secondary" placeholder="مثال: د. إبراهيم كمال" required="" type="text"/>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">person</span>
</div>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md text-on-surface-variant">رقم الهاتف الجوال</label>
<div className="relative">
<input className="w-full h-12 pr-4 pl-10 rounded-lg bg-surface-container-low text-on-surface font-financial-numeric text-financial-numeric text-right focus:outline-none focus:bg-surface-container focus:ring-1 focus:ring-secondary" dir="ltr" placeholder="+20 100 000 0000" required="" type="tel"/>
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">call</span>
</div>
</div>
<button className="w-full h-12 rounded-lg bg-secondary text-on-primary hover:bg-on-secondary-container font-title-lg text-title-lg transition-all shadow-lg shadow-secondary/20 flex items-center justify-center gap-2 mt-2" type="submit">
<span>طلب اتصال من مستشار عقاري</span>
<span className="material-symbols-outlined text-[20px]">send</span>
</button>
<div className="flex items-center justify-center gap-2 text-center text-outline font-label-sm text-label-sm mt-1">
<span className="material-symbols-outlined text-[16px]">lock</span>
<span>بياناتك الاستثمارية مشفرة ومحمية بخصوصية تامة</span>
</div>
</form>
</div>
</div>
</div>
</div>
</section>
<!-- Interactive Tabs Vanilla JS -->
<script>
    document.addEventListener('DOMContentLoaded', () => {
      const searchTabs = document.querySelectorAll('#search-tabs .search-tab');
      searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          searchTabs.forEach(t => {
            t.classList.remove('bg-primary-container', 'text-on-primary', 'shadow-sm');
            t.classList.add('bg-surface-container-low', 'text-on-surface');
          });
          tab.classList.remove('bg-surface-container-low', 'text-on-surface');
          tab.classList.add('bg-primary-container', 'text-on-primary', 'shadow-sm');
        });
      });
    });
  </script>
</div></main><footer className="w-full bg-surface-container-lowest text-on-surface shadow-[0_-1px_12px_rgba(16,36,58,0.03)]"><div className="max-w-7xl mx-auto px-6 lg:px-12 pt-space-xl pb-space-lg"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl pb-space-xl"><div className="lg:col-span-2 flex flex-col gap-space-md"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-secondary-fixed"><span className="material-symbols-outlined text-[22px]">account_balance</span></div><div className="flex flex-col text-right"><span className="font-title-lg text-title-lg text-primary">مستقبل الفراعنة</span><span className="font-label-sm text-label-sm text-secondary">صرح التشييد والاستثمار العقاري الفاخر</span></div></div><p className="font-body-md text-body-md text-on-surface-variant max-w-md leading-relaxed">نؤسس لمعايير هندسية خالدة تجسد عظمة الحضارة المصرية العريقة وتترجمها إلى مجمعات سكنية واستثمارية فائقة الفخامة وفق أرقى النظم العالمية للبناء الذكي والاستدامة المؤسسية.</p><div className="flex items-center gap-3 pt-space-xs"><div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-secondary-container hover:text-on-secondary-container transition-colors"><span className="material-symbols-outlined text-[18px]">call</span></div><div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-secondary-container hover:text-on-secondary-container transition-colors"><span className="material-symbols-outlined text-[18px]">mail</span></div><div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-secondary-container hover:text-on-secondary-container transition-colors"><span className="material-symbols-outlined text-[18px]">location_on</span></div></div></div><div className="flex flex-col gap-space-sm"><h4 className="font-title-md text-title-md text-primary font-bold">أبرز الوجهات والمشروعات</h4><ul className="flex flex-col gap-2.5 text-on-surface-variant font-body-md text-body-md"><li><a className="hover:text-secondary transition-colors" href="#">العاصمة الإدارية الجديدة</a></li><li><a className="hover:text-secondary transition-colors" href="#">القاهرة الجديدة والتجمع</a></li><li><a className="hover:text-secondary transition-colors" href="#">الساحل الشمالي المميز</a></li><li><a className="hover:text-secondary transition-colors" href="#">مدينة الشيخ زايد</a></li><li><a className="hover:text-secondary transition-colors" href="#">الأبراج الإدارية المتكاملة</a></li></ul></div><div className="flex flex-col gap-space-sm"><h4 className="font-title-md text-title-md text-primary font-bold">علاقات المستثمرين</h4><ul className="flex flex-col gap-2.5 text-on-surface-variant font-body-md text-body-md"><li><a className="hover:text-secondary transition-colors" href="#">المحافظ العقارية الاستثمارية</a></li><li><a className="hover:text-secondary transition-colors" href="#">تقارير العوائد والأداء المالي</a></li><li><a className="hover:text-secondary transition-colors" href="#">الامتثال وحماية المستهلك</a></li><li><a className="hover:text-secondary transition-colors" href="#">معايير البنك المركزي المصري</a></li><li><a className="hover:text-secondary transition-colors" href="#">الاستشارات المالية للأصول</a></li></ul></div><div className="flex flex-col gap-space-sm"><h4 className="font-title-md text-title-md text-primary font-bold">مركز التواصل المباشر</h4><div className="flex flex-col gap-3 font-body-md text-body-md text-on-surface-variant"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-[20px]">support_agent</span><span className="font-financial-numeric text-financial-numeric text-primary">+20 2 2840 9000</span></div><p className="font-label-md text-label-md text-outline">مركز الخدمة والاستفسارات الفاخرة متاح على مدار الساعة طوال أيام الأسبوع.</p><div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1"><span className="font-label-sm text-label-sm text-secondary font-bold">ترخيص هيئة المجتمعات العمرانية</span><span className="font-label-sm text-label-sm text-on-surface-variant">سجل تطوير عقاري معتمد رقم 4892/2021</span></div></div></div></div><div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-label-md text-label-md"><div className="flex items-center gap-space-md flex-wrap justify-center"><span className="text-primary font-bold">جميع الحقوق محفوظة © 2025</span><span>شركة مستقبل الفراعنة للاستثمار والتطوير العقاري ش.م.م.</span></div><div className="flex items-center gap-space-md"><a className="hover:text-on-surface transition-colors" href="#">سياسة الخصوصية</a><span className="text-outline-variant">•</span><a className="hover:text-on-surface transition-colors" href="#">الشروط والأحكام</a><span className="text-outline-variant">•</span><a className="hover:text-on-surface transition-colors" href="#">ميثاق الحوكمة</a></div></div></div></footer>`;

export default HomePage;
