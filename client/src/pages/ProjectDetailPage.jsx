import { useEffect, useRef } from 'react';

/**
 * ProjectDetailPage
 * Auto-generated from Stitch HTML design — preserves exact Tailwind classes & layout
 */
const ProjectDetailPage = () => {
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
<!-- Top Breadcrumb & Quick Anchor -->
<div className="w-full bg-surface-container-low/70 py-3">
<div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
<div className="flex items-center gap-2">
<a className="hover:text-primary transition-colors" href="#">الرئيسية</a>
<span className="text-outline-variant font-label-sm">/</span>
<a className="hover:text-primary transition-colors" href="#">مشروعاتنا</a>
<span className="text-outline-variant font-label-sm">/</span>
<span className="text-secondary font-title-md text-title-md font-semibold">أبراج حورس الاستثمارية - العاصمة الإدارية</span>
</div>
<div className="hidden sm:flex items-center gap-3">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          متاح للتعاقد الفوري (المرحلة الثانية)
        </span>
<span className="text-outline-variant">|</span>
<span className="font-financial-numeric text-title-md text-primary font-bold">كود المرجع: HR-CBD-2025</span>
</div>
</div>
</div>
<!-- Project Header & Meta Ribbon -->
<section className="w-full bg-surface-container-lowest shadow-sm py-8">
<div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
<!-- Title & Location Identity -->
<div className="flex flex-col gap-3">
<div className="flex flex-wrap items-center gap-2.5">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
            ترخيص وزاري رقم 842 / 2022
          </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">domain</span>
            العاصمة الإدارية الجديدة - منطقة الأعمال المركزية CBD
          </span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">event_available</span>
            التسليم التعاقدي: الربع الرابع 2026
          </span>
</div>
<div className="flex items-baseline gap-4 mt-1">
<h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">أبراج حورس الاستثمارية</h1>
<span className="text-secondary font-title-lg text-title-lg tracking-normal font-medium">(Horus Investment Towers CBD)</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[20px]">pin_drop</span>
          إطلالة مباشرة على النهر الأخضر ومحور محمد بن زايد الشمالي - بجوار البرج الأيقوني
        </p>
</div>
<!-- Financial Highlight & CTAs -->
<div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 p-5 rounded-xl bg-surface-container-low">
<div className="flex flex-col lg:text-left">
<span className="font-label-md text-label-md text-on-surface-variant">الأسعار الاستثمارية المعتمدة تبدأ من</span>
<div className="flex items-baseline gap-2 mt-0.5">
<span className="font-financial-numeric text-headline-sm text-primary font-bold">7,450,000</span>
<span className="font-title-md text-title-md text-secondary font-semibold">ج.م</span>
<span className="font-label-sm text-label-sm text-outline mr-2">(خطط سداد تصل 8 سنوات - مقدم 10%)</span>
</div>
</div>
<div className="flex items-center gap-3 w-full sm:w-auto">
<button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 h-12 px-6 rounded-md bg-primary text-on-primary font-title-md text-title-md shadow-md hover:bg-primary-container transition-all" onclick="document.getElementById('inventory-section').scrollIntoView({behavior: 'smooth'})">
<span>تصفح الوحدات المتاحة (68)</span>
<span className="material-symbols-outlined text-[20px]">arrow_downward</span>
</button>
<button className="inline-flex items-center justify-center gap-2 h-12 px-4 rounded-md bg-surface-container-lowest text-primary font-title-md text-title-md hover:bg-surface-container transition-all shadow-sm" title="تحميل البروشور والمخطط">
<span className="material-symbols-outlined text-secondary text-[20px]">picture_as_pdf</span>
<span className="hidden sm:inline">كتالوج المشروع (PDF)</span>
</button>
<button className="w-12 h-12 rounded-md bg-surface-container-lowest text-on-surface flex items-center justify-center hover:bg-surface-container transition-all shadow-sm" title="حفظ بالمفضلة">
<span className="material-symbols-outlined text-secondary text-[22px]">bookmark_border</span>
</button>
<button className="w-12 h-12 rounded-md bg-surface-container-lowest text-on-surface flex items-center justify-center hover:bg-surface-container transition-all shadow-sm" title="مشاركة">
<span className="material-symbols-outlined text-[20px]">share</span>
</button>
</div>
</div>
</div>
</section>
<!-- Architectural Gallery Bento Grid -->
<section className="w-full max-w-7xl mx-auto px-6 lg:px-12 pt-8">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[560px]">
<!-- Main Masterpiece Image -->
<div className="lg:col-span-8 relative h-[360px] lg:h-full rounded-xl overflow-hidden shadow-lg group">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Cinematic architectural rendering of modern luxury Horus Towers in New Administrative Capital Cairo with crystalline curtain glass walls, grand tiered water fountain plazas, palm tree landscaped courtyards, luxury sports cars, bright sunny Egyptian sky with azure tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-x7ASy2wXzBdHN3PhGIpdzDAB2xVMdiG2vt_dJIT5_Bs-E1S3qVv2XI3DH7y2PMuX8wxElZZg1HpE5pIDRdjJLmCda4_ph7jRqM3IKHIdVDnDWjKBHWTV3swrTaG-Sp1fdzvB4doVro8WeBu8jhLsr9TWqj6osqyzLYjsd7MpWmnRcALF1QfVns-CBKEe2pbSmNTjGZMTxeWoFzYAp1KXKSYQyD34YvKx4vyNP0OjhxRoLOKVskxapw"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent pointer-events-none"></div>
<div className="absolute bottom-6 right-6 left-6 flex items-end justify-between text-on-primary">
<div className="flex flex-col gap-1 max-w-lg">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed">الواجهة الرئيسية للنهر الأخضر</span>
<h3 className="font-headline-sm text-headline-sm font-bold leading-snug">تصميم معماري انسيابي يحاكي شموخ الصروح الفرعونية بلمسة تكنولوجية فائقة</h3>
</div>
<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/70 backdrop-blur-md text-on-primary font-label-md text-label-md">
<span className="material-symbols-outlined text-secondary-fixed text-[18px]">photo_camera</span>
            رؤية بانورامية 360°
          </span>
</div>
</div>
<!-- 4 Secondary Preview Thumbnails -->
<div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-2 gap-4 h-full">
<!-- Thumb 1 -->
<div className="relative h-44 lg:h-[272px] rounded-xl overflow-hidden shadow-sm group">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Luxurious interior living room of Horus towers penthouse overlooking illuminated Cairo skyline, polished travertine stone marble floors, brass lighting fixtures, designer furniture in warm beige and deep navy palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLJpiMksaASPJY57swoKtbNUtqIMe5KhMiy9i9Rj6fhA_g_WLgoGm_tP-K4pMbIeHt1OnUDxQfVPt2rbY3YkDntumLpGM7ga7MrhTgL96jGvjGK6ULKd8Z0wTc_aMqybKe5afZnlLgeDkNU26gJCDtqM-XK---BKGCGS5bJoYfULDbtUwoiQ-3HInexSdK2P0Bb1QxdQlqG9NfEqZhj1AQ1Ay53Q-TU3q4JVuDdIAp0vh2thhY-mD6cA"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent"></div>
<span className="absolute bottom-3 right-3 text-on-primary font-title-md text-title-md font-semibold">بنتهاوس ملكي</span>
</div>
<!-- Thumb 2 -->
<div className="relative h-44 lg:h-[272px] rounded-xl overflow-hidden shadow-sm group">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Executive business lounge and monumental lobby in luxury Horus commercial tower with triple height ceiling, Egyptian alabaster pillars, refined acoustic wall panels, elegant concierge reception desk." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO7gFs5Y_50Yk4kYvgWm7Uav1Qx9i3vOEvSBMWl53ziluvs2PY7tFtl4IF9gpvF5NRxOBuNGHKKxG5E1shlag9Cjn-Fax_PVIj4URttxCDEemLBMyVwoa0vgaZXYTTHYwnl_kqPoYF3iJlBRNbsHEtBARm1Mq_TaEUSUodMMFg6mnBKD2VFbUnWkXLxNfTc0SMAx2HO2JX2y7wQayX8lH4OvsSZ0eVcFvygiEbPKAPt8F-FMRbPP2A8g"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent"></div>
<span className="absolute bottom-3 right-3 text-on-primary font-title-md text-title-md font-semibold">بهو الاستقبال التنفيذي</span>
</div>
<!-- Thumb 3 -->
<div className="relative h-44 lg:h-[272px] rounded-xl overflow-hidden shadow-sm group">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Rooftop infinity swimming pool on 35th floor of Horus luxury skyscrapers, teak wood deck, sunken sun loungers, sunset golden hour warm glow over the New Capital central park horizon." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0UxisUY36fZRWjPOfBGP11OLTZ1-of1-ke2G216rZbnLUaWh1sb1sDqTdgZRZxlpPb8CQKZsnC7NuabtPl3cy_IVnbUU30Kwv8SHIKDWA22iDgyZMBsMPLdQYa3LjDCQVVQ807b0f2C-_ZchIC52O_Rs-wymGcpUzsNkHYLrPcGD6CmX_u1uKThBh5OWBT5N3YUliyhIG_bNHTOSCNJZpOFbyEpqorAPFNbHU3SGz_p3qLz2Pvdl_RQ"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent"></div>
<span className="absolute bottom-3 right-3 text-on-primary font-title-md text-title-md font-semibold">مسبح السحاب إنفينيتي</span>
</div>
<!-- Thumb 4 with More Overlay -->
<div className="relative h-44 lg:h-[272px] rounded-xl overflow-hidden shadow-sm cursor-pointer group">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Atmospheric twilight architectural rendering of Horus Towers with dramatic vertical linear facade illumination, reflecting glass facade, manicured palm walkways and luxury retail boulevard." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc8_ZKA1NKpzPHzhPeQqdSmgigUaqd7dGc_OWU3e782azLXWw8X1hhwLiFdp6CNHEXR0KwduSmkhIOhvbbnjocKomQnqaeoreuYKXtC0WV2zWyF-KHpWUEWSji9O9-B0CsYkFPslPBo50TDVC0k9khQ689h7WRhMddcDFUnLlcsjmxXHUySbxpLQHZq0aeJgKNl8Q-QoMuL5phfzOV546EpHf1N1v7LfNyKjZ2lSY1pOB81fUjFIHxYQ"/>
<div className="absolute inset-0 bg-primary/75 group-hover:bg-primary/65 transition-colors flex flex-col items-center justify-center text-center p-4">
<span className="material-symbols-outlined text-secondary-fixed text-[36px] mb-1">collections</span>
<span className="text-on-primary font-title-lg text-title-lg font-bold">+28 صورة إضافية</span>
<span className="text-on-primary-container font-label-sm text-label-sm mt-1">وجولة افتراضية تفاعلية</span>
</div>
</div>
</div>
</div>
</section>
<!-- Key Metrics & Performance Indicators Bar -->
<section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-10">
<div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-surface-container-lowest p-6 rounded-xl shadow-md">
<!-- Metric 1 -->
<div className="flex flex-col gap-1 pr-3">
<span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[18px]">apartment</span>
          إجمالي الوحدات بالمشروع
        </span>
<div className="flex items-baseline gap-1 mt-1">
<span className="font-financial-numeric text-headline-md text-primary font-bold">240</span>
<span className="font-label-sm text-label-sm text-outline">وحدة متكاملة</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">برجان إداري وسكني فندقي</span>
</div>
<!-- Metric 2 -->
<div className="flex flex-col gap-1 pr-3">
<span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
          الوحدات المتاحة للتعاقد
        </span>
<div className="flex items-baseline gap-1 mt-1">
<span className="font-financial-numeric text-headline-md text-emerald-700 font-bold">68</span>
<span className="font-label-sm text-label-sm text-emerald-600 font-bold">(28.3%)</span>
</div>
<span className="font-label-sm text-label-sm text-outline">جاهزة للاختيار الفوري</span>
</div>
<!-- Metric 3 -->
<div className="flex flex-col gap-1 pr-3">
<span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-amber-600 text-[18px]">schedule</span>
          قيد الحجز المبدئي
        </span>
<div className="flex items-baseline gap-1 mt-1">
<span className="font-financial-numeric text-headline-md text-amber-700 font-bold">24</span>
<span className="font-label-sm text-label-sm text-amber-600 font-bold">(10.0%)</span>
</div>
<span className="font-label-sm text-label-sm text-outline">فترة تأكيد 48 ساعة</span>
</div>
<!-- Metric 4 -->
<div className="flex flex-col gap-1 pr-3">
<span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-primary text-[18px]">handshake</span>
          تم البيع والتعاقد
        </span>
<div className="flex items-baseline gap-1 mt-1">
<span className="font-financial-numeric text-headline-md text-primary font-bold">148</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">(61.7%)</span>
</div>
<span className="font-label-sm text-label-sm text-outline">محافظ مستثمرين معتمدة</span>
</div>
<!-- Metric 5: Progress Bar -->
<div className="col-span-2 md:col-span-1 flex flex-col gap-1 pr-3 justify-center">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant font-medium">تقدم الإنشاءات</span>
<span className="font-financial-numeric text-title-md text-secondary font-bold">42%</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden my-1">
<div className="bg-secondary h-full rounded-full" style="width: 42%"></div>
</div>
<span className="font-label-sm text-label-sm text-outline">وفق مراجعة هيئة المجتمعات - Q4 2024</span>
</div>
</div>
</section>
<!-- Interactive Section Tabs Navigation -->
<div className="sticky top-20 z-40 w-full bg-surface-container-lowest/95 backdrop-blur-md shadow-sm">
<div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-start gap-8 overflow-x-auto no-scrollbar py-3">
<button className="font-title-md text-title-md text-primary font-bold pb-2 relative shrink-0 border-b-2 border-secondary" onclick="showTab('tab-overview')">
        نظرة عامة والمواصفات
      </button>
<button className="font-title-md text-title-md text-on-surface-variant hover:text-primary transition-colors pb-2 shrink-0" onclick="showTab('tab-masterplan')">
        المخطط العام والماستر بلان
      </button>
<button className="font-title-md text-title-md text-on-surface-variant hover:text-primary transition-colors pb-2 shrink-0" onclick="showTab('tab-amenities')">
        المرافق والخدمات الفندقية
      </button>
<button className="font-title-md text-title-md text-on-surface-variant hover:text-primary transition-colors pb-2 shrink-0" onclick="showTab('tab-units')">
        نماذج الوحدات والأسعار
      </button>
<button className="font-title-md text-title-md text-on-surface-variant hover:text-primary transition-colors pb-2 shrink-0" onclick="showTab('tab-location')">
        الموقع الجغرافي والوصول
      </button>
</div>
</div>
<!-- Main Content Layout (Split Detail & Inquiry Sidebar) -->
<div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
<!-- Left/Center Main Column (8 cols in RTL) -->
<div className="lg:col-span-8 flex flex-col gap-12">
<!-- Section 1: Overview & Vision -->
<section className="flex flex-col gap-5" id="tab-overview">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">architecture</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-primary font-bold">رؤية المشروع والمواصفات المعمارية</h2>
</div>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          تعتبر <strong className="text-primary font-semibold">أبراج حورس الاستثمارية</strong> صرحاً معمارياً استثنائياً يُعيد صياغة المشهد الحضري لمنطقة الأعمال المركزية (CBD) في العاصمة الإدارية الجديدة. يرتكز البرجان الشامخان على قاعدة تجارية فسيحة (Podium) تقدم مزيجاً فريداً بين المكاتب الإدارية العالمية ومقرات البنوك الاستثمارية، إلى جانب أجنحة وشقق فندقية مدارة تحت إشراف مشغل ضيافة عالمي ذي سمعة راسخة.
        </p>
<!-- Engineering Bullet Points Mosaic -->
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
<div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-4">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[22px]">energy_savings_leaf</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary font-bold">استدامة معتمدة LEED Gold</span>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">توليد 35% من استهلاك الطاقة عبر الخلايا الشمسية المدمجة بالواجهات والأسطح.</p>
</div>
</div>
<div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-4">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[22px]">speed</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary font-bold">مصاعد ذكية فائقة السرعة</span>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">12 مصعداً ذكياً بنظام التوجيه المسبق بسرعة 6 أمتار/ثانية وتخصيص لكبار الشخصيات.</p>
</div>
</div>
<div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-4">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[22px]">window</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary font-bold">واجهات زجاجية حرارية مزدوجة</span>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">عزل تام للصوت والحرارة بنفاذية ضوء استثنائية وزاوية رؤية 270 درجة نحو النهر الأخضر.</p>
</div>
</div>
<div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex items-start gap-4">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[22px]">memory</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary font-bold">نظام إدارة المبنى BMS الكامل</span>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">تحكم ذكي في درجات الحرارة، الإضاءة، أنظمة الإنذار والإطفاء عبر الذكاء الاصطناعي.</p>
</div>
</div>
</div>
</section>
<!-- Section 2: Interactive Master Plan & Zoning -->
<section className="flex flex-col gap-5" id="tab-masterplan">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">layers</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-primary font-bold">المخطط العام والتقسيم الهيكلي</h2>
</div>
<span className="font-label-sm text-label-sm text-secondary font-semibold">مساحة الأرض الإجمالية: 18,500 م²</span>
</div>
<!-- Masterplan Interactive Card -->
<div className="relative bg-surface-container-lowest rounded-xl p-6 shadow-md overflow-hidden">
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
<!-- Zone A -->
<div className="p-4 rounded-lg bg-surface-container-low transition-all cursor-pointer hover:bg-secondary-container/20">
<div className="flex items-center justify-between mb-2">
<span className="font-title-md text-title-md text-primary font-bold">البرج الأول (A)</span>
<span className="px-2 py-0.5 rounded text-[11px] font-bold bg-primary text-on-primary">38 طابق</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">شقق وأجنحة فندقية فاخرة ومرافق سبا مخصصة للمقيمين.</p>
</div>
<!-- Zone B -->
<div className="p-4 rounded-lg bg-surface-container-low transition-all cursor-pointer hover:bg-secondary-container/20">
<div className="flex items-center justify-between mb-2">
<span className="font-title-md text-title-md text-primary font-bold">البرج الثاني (B)</span>
<span className="px-2 py-0.5 rounded text-[11px] font-bold bg-secondary text-on-secondary">32 طابق</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">مكاتب شركات عالمية، قاعات مؤتمرات، ومقرات بنكية حصرية.</p>
</div>
<!-- Zone Podium -->
<div className="p-4 rounded-lg bg-surface-container-low transition-all cursor-pointer hover:bg-secondary-container/20">
<div className="flex items-center justify-between mb-2">
<span className="font-title-md text-title-md text-primary font-bold">البوديوم التجاري</span>
<span className="px-2 py-0.5 rounded text-[11px] font-bold bg-surface-container-high text-primary">4 طوابق</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">محلات تجارية فاخرة، مطاعم عالمية ولاجون مائي راقص.</p>
</div>
</div>
<!-- Masterplan Schematic Diagram -->
<div className="relative w-full h-80 rounded-xl overflow-hidden bg-primary-container">
<img className="w-full h-full object-cover opacity-60" data-alt="Architectural master site plan blueprint schematic of Horus luxury towers showing tower A residential, tower B commercial office and podium retail with landscaped garden plazas, vehicle access roads, drop off roundabouts and water features." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzZK1_wF9KTj_6-XH4Qma31O2dGlviavHmc4UzVbIC4F9cuYB2i_42f0Squd-SgVJlhbQNZ28DMFWxpz4mONQ3H-iU_-4BfVCLcQKGdzjUHNoxkoz_UzAxg8AeTK9TDiyXkQaX5cTBL45BI6ppVbYaXY7tWkUsiQg-drN-Yo7j6NjqXjW3TtlKN-o4BSIqJ8oZ-aieSNOxa7vzSqalHtxrlQ1YcmoYAR2oA0mH3NGW0hVJeKD1BmbvCQ"/>
<!-- Overlay Markers -->
<div className="absolute top-1/4 right-1/4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md shadow-lg">
<span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
<span className="font-label-sm text-label-sm text-primary font-bold">البرج السكني A</span>
</div>
<div className="absolute top-1/3 left-1/4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md shadow-lg">
<span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
<span className="font-label-sm text-label-sm text-primary font-bold">برج المال والأعمال B</span>
</div>
<div className="absolute bottom-8 right-1/3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md shadow-lg">
<span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
<span className="font-label-sm text-label-sm text-primary font-bold">النافورة الراقصة والممشى السياحي</span>
</div>
</div>
</div>
</section>
<!-- Section 3: Project Features & Amenities -->
<section className="flex flex-col gap-6" id="tab-amenities">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">room_service</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-primary font-bold">المرافق والخدمات الفندقية الحصرية</h2>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
<!-- Amenity 1 -->
<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center gap-3 group hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[26px]">pool</span>
</div>
<span className="font-title-md text-title-md text-primary font-bold">مسبح معلق بالطابق 35</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">إطلالة مفتوحة على النهر الأخضر</span>
</div>
<!-- Amenity 2 -->
<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center gap-3 group hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[26px]">spa</span>
</div>
<span className="font-title-md text-title-md text-primary font-bold">نادي صحي وسبا 5 نجوم</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">غرف ساونا وحمامات تركية</span>
</div>
<!-- Amenity 3 -->
<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center gap-3 group hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[26px]">flight_takeoff</span>
</div>
<span className="font-title-md text-title-md text-primary font-bold">مهبط طائرات هليكوبتر</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">مجهز لكبار الشخصيات ورجال الأعمال</span>
</div>
<!-- Amenity 4 -->
<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center gap-3 group hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[26px]">security</span>
</div>
<span className="font-title-md text-title-md text-primary font-bold">أمن ذكي وحراسة 24/7</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">بوابات بصمة وتعرف على الوجوه</span>
</div>
<!-- Amenity 5 -->
<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center gap-3 group hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[26px]">meeting_room</span>
</div>
<span className="font-title-md text-title-md text-primary font-bold">قاعات اجتماعات VIP</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">تقنيات فيديو كونفرانس فائقة</span>
</div>
<!-- Amenity 6 -->
<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center gap-3 group hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[26px]">local_parking</span>
</div>
<span className="font-title-md text-title-md text-primary font-bold">جراج ذكي 4 طوابق</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">استيعاب 1,200 سيارة بنظام حجز</span>
</div>
<!-- Amenity 7 -->
<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center gap-3 group hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[26px]">ev_station</span>
</div>
<span className="font-title-md text-title-md text-primary font-bold">شواحن سيارات كهربائية</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">محطات فائقة السرعة DC</span>
</div>
<!-- Amenity 8 -->
<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center text-center gap-3 group hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[26px]">restaurant</span>
</div>
<span className="font-title-md text-title-md text-primary font-bold">مطاعم روف عالمية</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">أرقى العلامات بمذاق فاخر</span>
</div>
</div>
</section>
<!-- Section 4: Available Property Inventory & Models -->
<section className="flex flex-col gap-6" id="inventory-section">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">view_quilt</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-primary font-bold">نماذج الوحدات والأسعار المعتمدة</h2>
<p className="font-label-md text-label-md text-on-surface-variant mt-0.5">اختر نموذج وحدتك للاطلاع على المخطط والمواصفات الفورية</p>
</div>
</div>
<span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-primary font-label-md text-label-md font-semibold">
            68 وحدة متاحة حالياً
          </span>
</div>
<!-- Inventory Units Cards -->
<div className="flex flex-col gap-4">
<!-- Unit 1 -->
<div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
<div className="flex items-center gap-4">
<div className="w-20 h-20 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-secondary text-[32px]">king_bed</span>
</div>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<h4 className="font-title-lg text-title-lg text-primary font-bold">شقة فندقية فاخرة (غرفة نوم واحدة)</h4>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 24 متاحة
                  </span>
</div>
<div className="flex items-center gap-4 text-on-surface-variant font-label-md text-label-md">
<span>المساحة: <strong>65 - 90 م²</strong></span>
<span>•</span>
<span>الطوابق: <strong>8 إلى 22</strong></span>
<span>•</span>
<span>تشطيب فندقي كامل بالتكييفات</span>
</div>
</div>
</div>
<div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-6 pt-3 md:pt-0">
<div className="flex flex-col text-right md:text-left">
<span className="font-label-sm text-label-sm text-outline">يبدأ السعر من</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-title-lg text-primary font-bold">7,450,000</span>
<span className="font-label-md text-label-md text-secondary">ج.م</span>
</div>
<span className="font-label-sm text-label-sm text-secondary">مقدم 10% (745,000 ج.م)</span>
</div>
<button className="h-10 px-4 rounded-md bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-colors shrink-0">
                حجز الوحدة
              </button>
</div>
</div>
<!-- Unit 2 -->
<div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
<div className="flex items-center gap-4">
<div className="w-20 h-20 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-secondary text-[32px]">hotel</span>
</div>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<h4 className="font-title-lg text-title-lg text-primary font-bold">أجنحة رويال سويت (غرفتين نوم + صالة)</h4>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 26 متاحة
                  </span>
</div>
<div className="flex items-center gap-4 text-on-surface-variant font-label-md text-label-md">
<span>المساحة: <strong>115 - 145 م²</strong></span>
<span>•</span>
<span>الطوابق: <strong>12 إلى 30</strong></span>
<span>•</span>
<span>شرفة بانورامية مباشرة على النهر</span>
</div>
</div>
</div>
<div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-6 pt-3 md:pt-0">
<div className="flex flex-col text-right md:text-left">
<span className="font-label-sm text-label-sm text-outline">يبدأ السعر من</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-title-lg text-primary font-bold">11,200,000</span>
<span className="font-label-md text-label-md text-secondary">ج.م</span>
</div>
<span className="font-label-sm text-label-sm text-secondary">مقدم 10% (1,120,000 ج.م)</span>
</div>
<button className="h-10 px-4 rounded-md bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-colors shrink-0">
                حجز الوحدة
              </button>
</div>
</div>
<!-- Unit 3 -->
<div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
<div className="flex items-center gap-4">
<div className="w-20 h-20 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-secondary text-[32px]">fitbit_spinning</span>
</div>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<h4 className="font-title-lg text-title-lg text-primary font-bold">بنتهاوس ملكي حصري (Sky Penthouse)</h4>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> 8 وحدات متبقية
                  </span>
</div>
<div className="flex items-center gap-4 text-on-surface-variant font-label-md text-label-md">
<span>المساحة: <strong>280 - 380 م²</strong></span>
<span>•</span>
<span>الطابق 36 &amp; 37</span>
<span>•</span>
<span>مسبح ومصعد خاص ورووف جاردن</span>
</div>
</div>
</div>
<div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-6 pt-3 md:pt-0">
<div className="flex flex-col text-right md:text-left">
<span className="font-label-sm text-label-sm text-outline">يبدأ السعر من</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-title-lg text-primary font-bold">18,500,000</span>
<span className="font-label-md text-label-md text-secondary">ج.م</span>
</div>
<span className="font-label-sm text-label-sm text-secondary">مقدم 15% (2,775,000 ج.م)</span>
</div>
<button className="h-10 px-4 rounded-md bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-colors shrink-0">
                طلب معاينة خاصة
              </button>
</div>
</div>
<!-- Unit 4 -->
<div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
<div className="flex items-center gap-4">
<div className="w-20 h-20 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-secondary text-[32px]">corporate_fare</span>
</div>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2">
<h4 className="font-title-lg text-title-lg text-primary font-bold">مكاتب إدارية ذكية ومقرات شركات</h4>
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 10 وحدات متاحة
                  </span>
</div>
<div className="flex items-center gap-4 text-on-surface-variant font-label-md text-label-md">
<span>المساحة: <strong>85 - 220 م²</strong></span>
<span>•</span>
<span>برج B للأعمال</span>
<span>•</span>
<span>شهادة LEED ومعايير ESG العالمية</span>
</div>
</div>
</div>
<div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-6 pt-3 md:pt-0">
<div className="flex flex-col text-right md:text-left">
<span className="font-label-sm text-label-sm text-outline">يبدأ السعر من</span>
<div className="flex items-baseline gap-1">
<span className="font-financial-numeric text-title-lg text-primary font-bold">8,800,000</span>
<span className="font-label-md text-label-md text-secondary">ج.م</span>
</div>
<span className="font-label-sm text-label-sm text-secondary">عائد استثماري إيجاري ثلاثي</span>
</div>
<button className="h-10 px-4 rounded-md bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-colors shrink-0">
                حجز المقر الإداري
              </button>
</div>
</div>
</div>
</section>
<!-- Section 5: Location Map & Connectivity -->
<section className="flex flex-col gap-6" id="tab-location">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">explore</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-primary font-bold">الموقع الاستراتيجي ومحاور الوصول</h2>
<p className="font-label-md text-label-md text-on-surface-variant mt-0.5">قلب العاصمة الإدارية الجديدة - محاط بأهم المعالم والمحاور الوطنية</p>
</div>
</div>
<!-- Stylized Map Container -->
<div className="relative w-full h-80 rounded-xl overflow-hidden shadow-md" data-location="New Administrative Capital, Cairo, Egypt" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6MxgUIBA0PyOoXJrxFl4V6nqLKKxNlhrmxtNWIdhmD0Hyay-CYwF6gyYnug423aj9VBH5pZOrg9ny5v5l1Ya8rR4GbfHQvrZM3GcGeAFMuZTnePYZPUUkRSlPeSlUX_BJhPalhy_fZuSGiM7H56h4eNkf3cBMAz73bu2siMex4W3iRc_VN2MsXcNfFRTfaSPbRi9nXFZzxyFRwDqiPlmn0ipsNt1m2R-AB7nbzvydltDsQ9MjRSi_tA')">
<div className="absolute inset-0 bg-primary/30"></div>
<div className="absolute top-4 right-4 bg-surface-container-lowest/95 backdrop-blur-md px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[24px]">location_on</span>
<div className="flex flex-col text-right">
<span className="font-title-md text-title-md text-primary font-bold">موقع أبراج حورس CBD</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">محور بن زايد الشمالي تقاطع الدائري الأوسطي</span>
</div>
</div>
</div>
<!-- Travel Distance Badges -->
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[20px]">directions_subway</span>
</div>
<div className="flex flex-col">
<span className="font-financial-numeric text-title-md text-primary font-bold">3 دقائق</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">عن محطة المونوريل المركزية</span>
</div>
</div>
<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[20px]">account_balance</span>
</div>
<div className="flex flex-col">
<span className="font-financial-numeric text-title-md text-primary font-bold">5 دقائق</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">عن الحي الحكومي ومجلس النواب</span>
</div>
</div>
<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary shrink-0">
<span className="material-symbols-outlined text-[20px]">flight</span>
</div>
<div className="flex flex-col">
<span className="font-financial-numeric text-title-md text-primary font-bold">20 دقيقة</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">عن مطار القاهرة الدولي الجديد</span>
</div>
</div>
</div>
</section>
</div>
<!-- Right Sidebar Column (4 cols in RTL) - Financial Simulator & Inquiries -->
<div className="lg:col-span-4 flex flex-col gap-6">
<!-- Interactive Financial Calculator Card -->
<div className="bg-surface-container-lowest rounded-xl p-6 shadow-md flex flex-col gap-5 sticky top-36">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">calculate</span>
</div>
<div>
<h3 className="font-title-lg text-title-lg text-primary font-bold">حاسبة السداد والاستثمار</h3>
<span className="font-label-sm text-label-sm text-on-surface-variant">محاكاة فورية لخطط الأقساط المرنة</span>
</div>
</div>
<!-- Calculator Form Fields -->
<div className="flex flex-col gap-4">
<div className="flex flex-col gap-1.5 text-right">
<label className="font-label-md text-label-md text-on-surface">نوع الوحدة المطلوبة</label>
<div className="h-12 bg-surface-container-low rounded-md px-3 flex items-center justify-between text-on-surface font-body-md text-body-md cursor-pointer">
<span>شقة فندقية 1 غرفة (7.45M ج.م)</span>
<span className="material-symbols-outlined text-[20px] text-outline">expand_more</span>
</div>
</div>
<div className="flex flex-col gap-1.5 text-right">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface">دفعة المقدم (10% - 30%)</label>
<span className="font-financial-numeric text-title-md text-secondary font-bold">10% (745,000 ج.م)</span>
</div>
<input className="w-full accent-secondary cursor-pointer h-2 bg-surface-container rounded-lg appearance-none" max="30" min="10" step="5" type="range" value="10"/>
</div>
<div className="flex flex-col gap-1.5 text-right">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface">مدة السداد بالأقساط</label>
<span className="font-financial-numeric text-title-md text-secondary font-bold">8 سنوات (متساوية)</span>
</div>
<div className="grid grid-cols-4 gap-2 text-center font-label-md text-label-md">
<button className="py-2 rounded-md bg-surface-container text-on-surface hover:bg-secondary-container/30">4 سنوات</button>
<button className="py-2 rounded-md bg-surface-container text-on-surface hover:bg-secondary-container/30">6 سنوات</button>
<button className="py-2 rounded-md bg-primary text-on-primary font-bold">8 سنوات</button>
<button className="py-2 rounded-md bg-surface-container text-on-surface hover:bg-secondary-container/30">10 سنوات</button>
</div>
</div>
<!-- Calculation Result Summary -->
<div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2 mt-2">
<div className="flex items-center justify-between font-label-md text-label-md">
<span className="text-on-surface-variant">القسط الربع سنوي التقريبي:</span>
<span className="font-financial-numeric text-title-md text-primary font-bold">209,530 ج.م</span>
</div>
<div className="flex items-center justify-between font-label-md text-label-md">
<span className="text-on-surface-variant">تاريخ القسط الأول بعد التعاقد:</span>
<span className="text-on-surface font-semibold">فبراير 2025</span>
</div>
<div className="flex items-center justify-between font-label-md text-label-md">
<span className="text-on-surface-variant">خصم الكاش (الدفع النقدي):</span>
<span className="font-label-md text-label-md text-emerald-700 font-bold">خصم فوري 25%</span>
</div>
</div>
<!-- Submit Lead Button -->
<button className="w-full h-12 rounded-md bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-md mt-1">
<span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
<span>تثبيت جدول السداد وتخصيص الوحدة</span>
</button>
</div>
<div className="flex items-center justify-center gap-2 text-on-surface-variant font-label-sm text-label-sm pt-2">
<span className="material-symbols-outlined text-secondary text-[16px]">verified_user</span>
<span>معتمد ومطابق للائحة البنك المركزي المصري للتمويل</span>
</div>
</div>
<!-- Developer Credentials Card -->
<div className="bg-surface-container-lowest rounded-xl p-6 shadow-md flex flex-col gap-4">
<h4 className="font-title-md text-title-md text-primary font-bold">المطور والاستشاري الهندسي</h4>
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-primary-container text-secondary-fixed flex items-center justify-center font-bold text-headline-sm">
            م.ف
          </div>
<div className="flex flex-col text-right">
<span className="font-title-md text-title-md text-primary font-bold">مستقبل الفراعنة للتطوير العقاري</span>
<span className="font-label-sm text-label-sm text-secondary">خبرة تمتد لأكثر من 28 عاماً في التشييد الفاخر</span>
</div>
</div>
<div className="flex flex-col gap-2 pt-2 text-on-surface-variant font-body-md text-body-md">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md">الاستشاري الهندسي العام:</span>
<span className="text-primary font-medium">مكتب دار الهندسة (Shair &amp; Partners)</span>
</div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md">إدارة وتشغيل الفندق:</span>
<span className="text-primary font-medium">مجموعة شيراتون للضيافة الدولية</span>
</div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md">المقاول التنفيذي للإنشاءات:</span>
<span className="text-primary font-medium">تحالف أوراسكوم - حسن علام</span>
</div>
</div>
<button className="w-full h-10 rounded-md bg-surface-container text-primary font-title-md text-title-md hover:bg-surface-container-high transition-colors mt-2">
          سجل إنجازات وسابقة أعمال المطور
        </button>
</div>
<!-- Quick Contact Assistant Card -->
<div className="bg-gradient-to-br from-primary-container to-primary rounded-xl p-6 text-on-primary shadow-lg flex flex-col gap-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary text-primary-container flex items-center justify-center font-bold">
<span className="material-symbols-outlined text-[22px]">support_agent</span>
</div>
<div className="flex flex-col text-right">
<span className="font-title-md text-title-md font-bold">مستشارك العقاري الخاص</span>
<span className="font-label-sm text-label-sm text-on-primary-container">متاح الآن لتقديم استشارة استثمارية</span>
</div>
</div>
<p className="font-body-md text-body-md text-on-primary-container">
          هل ترغب في جولة ميدانية لموقع المشروع أو مناقشة تخصيص وحدة تجارية كبرى؟
        </p>
<div className="flex flex-col gap-2 pt-1">
<a className="h-11 rounded-md bg-secondary text-on-secondary font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-secondary-fixed transition-colors" href="tel:+20228409000">
<span className="material-symbols-outlined text-[20px]">call</span>
<span>اتصال مباشر: 9000 2840 2 20+</span>
</a>
<button className="h-11 rounded-md bg-surface-container-lowest/15 backdrop-blur-md text-on-primary font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-surface-container-lowest/25 transition-colors">
<span className="material-symbols-outlined text-[20px]">chat</span>
<span>محادثة واتساب فورية VIP</span>
</button>
</div>
</div>
</div>
</div>
<!-- Related Projects Section (مشروعات أخرى للمطور) -->
<section className="w-full bg-surface-container-low py-16">
<div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-8">
<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
<div className="flex flex-col gap-2 text-right">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">محفظة استثمارات متميزة</span>
<h3 className="font-headline-md text-headline-md text-primary font-bold">صروح معمارية أخرى قد تهمك</h3>
</div>
<a className="inline-flex items-center gap-2 font-title-md text-title-md text-secondary hover:text-primary transition-colors" href="#">
<span>عرض كافة المشروعات (14 مشروع)</span>
<span className="material-symbols-outlined text-[18px]">arrow_back</span>
</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<!-- Project 1: Lotus Lagoon Ras El Hekma -->
<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md flex flex-col group hover:shadow-xl transition-all">
<div className="relative h-64 w-full overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Breathtaking Mediterranean luxury coastal resort Lotus Lagoon in Ras El Hekma Egypt with private white sand turquoise beach, cascading private pool villas at sunset, palms, golden light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyQH1woy6wCAkCN_X6AgRmXynMUo5rMDND9nRjyKFhWvYS0mGQNLz1YNhd7HxsAwmj3IWu1y3D28yQ-d3zuxsG6_D2UXD2dBQ1UkTrSy4-RGn1vMkWms-2m2XJq2Nkcoc8bsPQFz918igdeDMGAIh4mP0fad-en-xmkVQeXJNWTitD4FUuCyOFCwbaYDr5WDeY-NbFNNVBuvm4cK9j7znBfj7AyL_ROw1N2KeG8qs60CvfWbXFEmaFVQ"/>
<span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-on-primary font-label-sm text-label-sm font-semibold">
              الساحل الشمالي - رأس الحكمة
            </span>
</div>
<div className="p-6 flex flex-col gap-4 text-right">
<div className="flex items-center justify-between">
<h4 className="font-headline-sm text-headline-sm text-primary font-bold">منتجع لوتس لاجون (Lotus Lagoon)</h4>
<span className="text-secondary font-financial-numeric text-title-lg font-bold">من 9.8M ج.م</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
              فلل وشاليهات فاخرة متدرجة الارتفاع بإطلالة مباشرة على بحيرات صناعية كريستالية والشاطئ الفيروزي مع تسليم مفروش بالكامل.
            </p>
<div className="pt-2 flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant">مقدم 10% وتقسيط حتى 7 سنوات</span>
<a className="inline-flex items-center gap-1 font-title-md text-title-md text-primary hover:text-secondary transition-colors" href="#">
<span>تفاصيل المشروع</span>
<span className="material-symbols-outlined text-[16px]">arrow_back</span>
</a>
</div>
</div>
</div>
<!-- Project 2: Pharaohs Greens New Cairo -->
<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md flex flex-col group hover:shadow-xl transition-all">
<div className="relative h-64 w-full overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Modern high-end residential compound Pharaohs Greens in New Cairo Fifth Settlement featuring luxury modern stone villas, golf course greens, botanical water parks, club house." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7nSnqr1Y-jDTv8yvgWZpFI72QZu6aDvTjP5g2qlL9rrKAnKGEQpo-DphF5cQvpfLBKGH_ekJExj-T_HQ0jia8ajDhXFt9l2hcodCmpxSCqZAFyFuC48vuZNan6hikZjMDZAMQ51dfS3p3SjYbzh0mPuaDBH0WCiNWMnxPtM_ZI4wl-GCjWJArx8rLcCF3GW_yQkku02MF9vFqK6eWCpDhlLY6e7FfP25n2ar3_dobRwCkfPmH1I_pLg"/>
<span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-on-primary font-label-sm text-label-sm font-semibold">
              القاهرة الجديدة - التجمع الخامس
            </span>
</div>
<div className="p-6 flex flex-col gap-4 text-right">
<div className="flex items-center justify-between">
<h4 className="font-headline-sm text-headline-sm text-primary font-bold">كمبوند الفراعنة جرينز (Pharaohs Greens)</h4>
<span className="text-secondary font-financial-numeric text-title-lg font-bold">من 14.5M ج.م</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
              مجتمع سكني متكامل يضم تاون هاوس وفلل مستقلة محاطة بملاعب جولف عالمية ومساحات خضراء شاسعة بجوار الجامعة الأمريكية.
            </p>
<div className="pt-2 flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant">مقدم 5% وتقسيط حتى 8 سنوات</span>
<a className="inline-flex items-center gap-1 font-title-md text-title-md text-primary hover:text-secondary transition-colors" href="#">
<span>تفاصيل المشروع</span>
<span className="material-symbols-outlined text-[16px]">arrow_back</span>
</a>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Sticky Bottom Fast Action Bar (Floating Bar) -->
<div className="sticky bottom-4 z-40 max-w-5xl mx-auto w-[92%] bg-primary/95 backdrop-blur-xl text-on-primary rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-secondary text-primary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px]">domain</span>
</div>
<div className="flex flex-col text-right">
<span className="font-title-md text-title-md text-on-primary font-bold">جاهز للاستثمار في أبراج حورس؟</span>
<span className="font-label-sm text-label-sm text-on-primary-container">تتوفر وحدات بإطلالة بانورامية فورية وبخطط سداد بدون فوائد</span>
</div>
</div>
<div className="flex items-center gap-3 w-full sm:w-auto">
<button className="flex-1 sm:flex-none h-11 px-5 rounded-md bg-secondary text-on-secondary font-title-md text-title-md hover:bg-secondary-fixed transition-colors whitespace-nowrap" onclick="document.getElementById('inventory-section').scrollIntoView({behavior: 'smooth'})">
        حجز واستعلام مباشر
      </button>
<a className="flex-1 sm:flex-none h-11 px-5 rounded-md bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-on-primary font-title-md text-title-md flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap" href="tel:+20228409000">
<span className="material-symbols-outlined text-[18px]">phone</span>
<span>طلب مكالمة</span>
</a>
</div>
</div>
</div>
<script>
  function showTab(tabId) {
    const target = document.getElementById(tabId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
</script></main><footer className="w-full bg-surface-container-lowest text-on-surface shadow-[0_-1px_12px_rgba(16,36,58,0.03)]"><div className="max-w-7xl mx-auto px-6 lg:px-12 pt-space-xl pb-space-lg"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl pb-space-xl"><div className="lg:col-span-2 flex flex-col gap-space-md"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-secondary-fixed"><span className="material-symbols-outlined text-[22px]">account_balance</span></div><div className="flex flex-col text-right"><span className="font-title-lg text-title-lg text-primary">مستقبل الفراعنة</span><span className="font-label-sm text-label-sm text-secondary">صرح التشييد والاستثمار العقاري الفاخر</span></div></div><p className="font-body-md text-body-md text-on-surface-variant max-w-md leading-relaxed">نؤسس لمعايير هندسية خالدة تجسد عظمة الحضارة المصرية العريقة وتترجمها إلى مجمعات سكنية واستثمارية فائقة الفخامة وفق أرقى النظم العالمية للبناء الذكي والاستدامة المؤسسية.</p><div className="flex items-center gap-3 pt-space-xs"><div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-secondary-container hover:text-on-secondary-container transition-colors"><span className="material-symbols-outlined text-[18px]">call</span></div><div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-secondary-container hover:text-on-secondary-container transition-colors"><span className="material-symbols-outlined text-[18px]">mail</span></div><div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-secondary-container hover:text-on-secondary-container transition-colors"><span className="material-symbols-outlined text-[18px]">location_on</span></div></div></div><div className="flex flex-col gap-space-sm"><h4 className="font-title-md text-title-md text-primary font-bold">أبرز الوجهات والمشروعات</h4><ul className="flex flex-col gap-2.5 text-on-surface-variant font-body-md text-body-md"><li><a className="hover:text-secondary transition-colors" href="#">العاصمة الإدارية الجديدة</a></li><li><a className="hover:text-secondary transition-colors" href="#">القاهرة الجديدة والتجمع</a></li><li><a className="hover:text-secondary transition-colors" href="#">الساحل الشمالي المميز</a></li><li><a className="hover:text-secondary transition-colors" href="#">مدينة الشيخ زايد</a></li><li><a className="hover:text-secondary transition-colors" href="#">الأبراج الإدارية المتكاملة</a></li></ul></div><div className="flex flex-col gap-space-sm"><h4 className="font-title-md text-title-md text-primary font-bold">علاقات المستثمرين</h4><ul className="flex flex-col gap-2.5 text-on-surface-variant font-body-md text-body-md"><li><a className="hover:text-secondary transition-colors" href="#">المحافظ العقارية الاستثمارية</a></li><li><a className="hover:text-secondary transition-colors" href="#">تقارير العوائد والأداء المالي</a></li><li><a className="hover:text-secondary transition-colors" href="#">الامتثال وحماية المستهلك</a></li><li><a className="hover:text-secondary transition-colors" href="#">معايير البنك المركزي المصري</a></li><li><a className="hover:text-secondary transition-colors" href="#">الاستشارات المالية للأصول</a></li></ul></div><div className="flex flex-col gap-space-sm"><h4 className="font-title-md text-title-md text-primary font-bold">مركز التواصل المباشر</h4><div className="flex flex-col gap-3 font-body-md text-body-md text-on-surface-variant"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-[20px]">support_agent</span><span className="font-financial-numeric text-financial-numeric text-primary">+20 2 2840 9000</span></div><p className="font-label-md text-label-md text-outline">مركز الخدمة والاستفسارات الفاخرة متاح على مدار الساعة طوال أيام الأسبوع.</p><div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-1"><span className="font-label-sm text-label-sm text-secondary font-bold">ترخيص هيئة المجتمعات العمرانية</span><span className="font-label-sm text-label-sm text-on-surface-variant">سجل تطوير عقاري معتمد رقم 4892/2021</span></div></div></div></div><div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-label-md text-label-md"><div className="flex items-center gap-space-md flex-wrap justify-center"><span className="text-primary font-bold">جميع الحقوق محفوظة © 2025</span><span>شركة مستقبل الفراعنة للاستثمار والتطوير العقاري ش.م.م.</span></div><div className="flex items-center gap-space-md"><a className="hover:text-on-surface transition-colors" href="#">سياسة الخصوصية</a><span className="text-outline-variant">•</span><a className="hover:text-on-surface transition-colors" href="#">الشروط والأحكام</a><span className="text-outline-variant">•</span><a className="hover:text-on-surface transition-colors" href="#">ميثاق الحوكمة</a></div></div></div></footer>`;

export default ProjectDetailPage;
