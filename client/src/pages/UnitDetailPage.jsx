import { useEffect, useRef } from 'react';

/**
 * UnitDetailPage
 * Auto-generated from Stitch HTML design — preserves exact Tailwind classes & layout
 */
const UnitDetailPage = () => {
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

const html = `<header className="fixed top-0 w-full z-50 bg-primary-container shadow-[0_4px_20px_-4px_rgba(16,36,58,0.25)]"><div className="h-20 w-full px-margin flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-lg"><a className="flex items-center gap-space-sm cursor-pointer" data-path="home" href="#"><img alt="شعار مستقبل الفراعنة" className="w-9 h-9 rounded-full object-cover ring-1 ring-secondary-fixed/40" src="https://lh3.googleusercontent.com/aida/AEtjO1VWx6jKJknNE_QHLGa2wu5RINLHC-tKjGblBP8IV-4NQjOVIGwFAC7lqrZ7kLJ0Z8I_sd0DxnAiL7bB_nTIrRbp2AxnBlN1-z9QXsIHyyRIoxNJ1p8pBrxJ5JaMv2PBxrvYQ2qmybfZmDQFu9VinTWK60x1eGvoYztE593XMsNleq-G0VSoY-0u_DKSHikfzMYlirkYn5shbwPwY6fSpc7TcYQC2aY5qmH1WRyG-S-K3ihr6iqUdKTH0Ek"/><div className="flex flex-col"><span className="font-title-lg text-title-lg text-on-primary leading-tight font-bold">مستقبل الفراعنة</span><span className="font-label-sm text-label-sm text-secondary-fixed leading-tight">للاستثمار والتطوير العقاري</span></div></a></div><nav className="hidden lg:flex items-center gap-space-lg" data-active-classes="text-secondary-fixed border-b-2 border-secondary font-bold"><a className="text-on-primary-container hover:text-on-primary font-title-md text-title-md transition-colors py-space-xs" data-path="home" href="#">الرئيسية</a><a className="text-on-primary-container hover:text-on-primary font-title-md text-title-md transition-colors py-space-xs" data-path="projects" href="#">مشروعاتنا</a><a className="text-on-primary-container hover:text-on-primary font-title-md text-title-md transition-colors py-space-xs" data-path="available-units" href="#">الوحدات المتاحة</a><a className="text-on-primary-container hover:text-on-primary font-title-md text-title-md transition-colors py-space-xs" data-path="about-us" href="#">من نحن</a><a className="text-on-primary-container hover:text-on-primary font-title-md text-title-md transition-colors py-space-xs" data-path="contact" href="#">تواصل معنا</a></nav><div className="flex items-center gap-space-sm"><div className="flex items-center gap-space-xs bg-primary/50 px-space-sm py-space-xs rounded-lg text-secondary-fixed"><span className="material-symbols-outlined text-base">payments</span><span className="font-label-md text-label-md font-bold">ج.م EGP</span></div><a className="flex items-center gap-space-xs bg-secondary text-on-secondary hover:bg-secondary/90 px-space-md py-space-xs rounded-lg font-label-md text-label-md font-semibold transition-all shadow-sm" data-path="auth" href="#"><span className="material-symbols-outlined text-base">lock_open</span><span>تسجيل الدخول / إنشاء حساب</span></a></div></div></header><main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full pb-space-xl">
<!-- Dynamic Notification / Status Toast Container -->
<div className="fixed bottom-6 left-6 z-50 transform translate-y-32 opacity-0 transition-all duration-300 pointer-events-none flex items-center gap-space-sm bg-primary text-on-primary px-space-md py-space-sm rounded-xl shadow-xl" id="toastNotification">
<span className="material-symbols-outlined text-secondary-fixed text-lg" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span className="font-label-md text-label-md" id="toastMessage">تم الحفظ في قائمة المفضلة</span>
</div>
<!-- Breadcrumb & Top Bar -->
<section className="w-full bg-surface-container-low py-space-md">
<div className="w-full px-margin flex flex-wrap items-center justify-between gap-space-md">
<!-- Breadcrumb -->
<nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
<a className="hover:text-primary transition-colors flex items-center gap-1" href="#">
<span className="material-symbols-outlined text-sm">home</span>
          الرئيسية
        </a>
<span className="text-outline-variant font-bold">/</span>
<a className="hover:text-primary transition-colors" href="#">المشروعات العقارية</a>
<span className="text-outline-variant font-bold">/</span>
<a className="hover:text-primary transition-colors" href="#">أبراج حورس الاستثمارية</a>
<span className="text-outline-variant font-bold">/</span>
<span className="text-primary font-bold">وحدة HOR-PH01</span>
</nav>
<!-- Unit Reference Code Pill -->
<div className="flex items-center gap-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant">كود الوحدة المعماري:</span>
<span className="bg-surface-container-lowest text-primary font-bold font-label-md text-label-md px-space-sm py-1 rounded-lg shadow-sm tracking-wider">HR-PH01-CBD</span>
</div>
</div>
</section>
<!-- Hero Header Block -->
<section className="w-full bg-surface-container-lowest py-space-lg shadow-sm">
<div className="w-full px-margin flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div className="flex flex-col gap-space-xs">
<div className="flex flex-wrap items-center gap-space-sm">
<!-- Availability Badge -->
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#065F46] font-label-sm text-label-sm font-bold">
<span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            متاح للتعاقد والحجز الفوري
          </span>
<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container/50 text-secondary font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-xs">hotel_class</span>
            إصدار ملكي محدود (Royal Signature)
          </span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">بنتهاوس ملكي بانورامي فندقي (Penthouse Suite HOR-PH01)</h1>
<p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-base">domain</span>
<span>مشروع أبراج حورس الاستثمارية - منطقة الأعمال المركزية CBD، النهر الأخضر، العاصمة الإدارية الجديدة</span>
</p>
</div>
<!-- Action Utilities -->
<div className="flex items-center gap-space-sm self-start lg:self-center">
<button className="flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all text-on-surface font-label-md text-label-md" id="favBtn" onclick="toggleFavorite()">
<span className="material-symbols-outlined text-base transition-colors" id="favIcon">favorite_border</span>
<span id="favLabel">حفظ الوحدة</span>
</button>
<button className="flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all text-on-surface font-label-md text-label-md" onclick="shareUnit()">
<span className="material-symbols-outlined text-base">share</span>
<span>مشاركة</span>
</button>
<a className="flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all font-label-md text-label-md shadow-sm" href="#payment-calculator">
<span className="material-symbols-outlined text-base text-secondary-fixed">file_download</span>
<span>تحميل المخطط (PDF)</span>
</a>
</div>
</div>
</section>
<!-- Visual Media & Interactive Floor Plan Gallery -->
<section className="w-full px-margin py-space-lg">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
<!-- Main Visual Display Canvas (8 cols) -->
<div className="lg:col-span-8 flex flex-col gap-space-sm">
<div className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden shadow-lg bg-primary">
<!-- Current Active Slide View -->
<img className="w-full h-full object-cover transition-opacity duration-300" data-alt="Ultra luxury modern duplex penthouse terrace at dusk overlooking the Egyptian New Administrative Capital skyline with private infinity pool and sunken lounge firepit, floor to ceiling glass facade, alabaster flooring, palm trees, warm ambient golden lighting" id="mainDisplayImg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK6rheU06QaN-yozTLyPFcahiT1MGoQdnn65HMG9YZ89TzOPlEzPRlEaFmBpOGe6ZOrtEN0ezSyC8soKoybDmG1AzyRAeY_b9MkvvJT9Uu5TJk6VZdQjbCOX0_OFwWpjDk4KIDGgLzOhH-bNBakVCX9SphwGg7QZ_TuDIZRUd89YvLFyhPj2IJE5jZKDy4dDmYiuI2oM34wMUi0ZjkAMFdsjW_yFbNOoG088DezE7oxC7PVOHq4-T4Ag"/>
<!-- Subtle Gradient Scrim -->
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none"></div>
<!-- Top-Left Visual Controls -->
<div className="absolute top-4 left-4 flex items-center gap-space-xs z-10">
<button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/85 backdrop-blur-md text-on-primary hover:bg-primary transition-all font-label-sm text-label-sm shadow-md" onclick="openVirtualTour()">
<span className="material-symbols-outlined text-secondary-fixed text-base">360</span>
<span>جولة تفاعلية 360°</span>
</button>
<button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/85 backdrop-blur-md text-on-primary hover:bg-primary transition-all font-label-sm text-label-sm shadow-md" onclick="zoomPlan()">
<span className="material-symbols-outlined text-secondary-fixed text-base">zoom_in</span>
<span>تكبير المخطط</span>
</button>
</div>
<!-- Bottom Caption on Image -->
<div className="absolute bottom-4 right-4 left-4 flex items-end justify-between z-10 pointer-events-none">
<div className="text-on-primary">
<span className="text-secondary-fixed font-label-sm text-label-sm block" id="activeImageTag">المشهد البانورامي الخارجي</span>
<p className="font-title-lg text-title-lg font-bold" id="activeImageTitle">تراس البنتهاوس مع مسبح خاص وإطلالة الشفق على النهر الأخضر</p>
</div>
<span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-on-primary font-label-sm text-label-sm">
<span id="activeImageIndex">1</span> / 4
            </span>
</div>
</div>
<!-- Gallery Selector Strip -->
<div className="grid grid-cols-4 gap-space-xs md:gap-space-sm">
<button className="gallery-thumb group relative h-20 md:h-24 rounded-xl overflow-hidden transition-all shadow-sm ring-2 ring-secondary bg-surface-container-high" onclick="switchGallery(0, this)">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Panoramic modern luxury penthouse terrace with illuminated private swimming pool and comfortable lounge seating during sunset" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeZ8aZ3YHhiYDt0nx4YFLquNBNiPWZFVqXCElDRCNoYlw070kBng-2hHh_M9uO-NkCuvUQPZ3lPoDMUV4wS4GTTypOF0dJU6gg0IDSlNLiNKtkXqFzItMj5UtsnGsgWx9a1zJnBECwcp0_tkRjwlByK6DtEftJxP6jScmT85qkO22Jb2zGyMXjXyPx_0e9fREP1_kLkttAwAw0Nd2YhvIVMx5vFXlxe-l3So-a9WDLujcXNUcc9udbzw"/>
<div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors"></div>
<span className="absolute bottom-1 right-1 text-[10px] md:text-label-sm font-label-sm text-on-primary bg-primary/80 px-1.5 py-0.5 rounded">التراس الملكي</span>
</button>
<button className="gallery-thumb group relative h-20 md:h-24 rounded-xl overflow-hidden transition-all shadow-sm bg-surface-container-high opacity-75 hover:opacity-100" onclick="switchGallery(1, this)">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Spacious high ceiling penthouse master bedroom suite with king bed, walk-in Italian dressing room, contemporary alabaster accents and panoramic city window view" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUqFOWufJ0bqJwdvIpVQnAF1kN5XHmylrH_s-ToGdrvILTod53MZ1Pwku1hQfOR6F7q1dR6aQ9F8Ym3spNmtAeT1foLhSfjXEnewSK2VYoofOdSN0XglgoWZe5YsITXpRDg60WDZJaIZFVRG9GEw6j4nM-UrACYgHNtiVhY1fVVsvve6pKqvYgQ9xN-lU9zQPq6GwJKgL3C-HnoFKUIHNpvLJ3Lkdpom2ndwDalwQipvAhvbHnkP_A8Q"/>
<div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors"></div>
<span className="absolute bottom-1 right-1 text-[10px] md:text-label-sm font-label-sm text-on-primary bg-primary/80 px-1.5 py-0.5 rounded">جناح الماستر</span>
</button>
<button className="gallery-thumb group relative h-20 md:h-24 rounded-xl overflow-hidden transition-all shadow-sm bg-surface-container-high opacity-75 hover:opacity-100" onclick="switchGallery(2, this)">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Five-star hotel grade penthouse marble bathroom with freestanding soaking jacuzzi tub, brass gold fittings and panoramic corner glass view" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW9H6QQJpOW-2RNEABImXDp_TU_3Vx2YxtajnYW8dElRGaw94le3IdFixp47cNY6BUtqTbqOAbVsjeUKYeObS5_VLezezRRi_NhWEMaKgOkZNVyqWnprZEkOFkcLNHJCIn_10p00vNHidVMK8mo8LqVcNIWFT-EFgxJlSAILs6j_cQhn3h5YQTrzMZ8OT6f0OdRAiHr9o4e_AG1_wsrxRT0CO3tDqX1Sr78-tq4f5CMI5uO8BpesjuCQ"/>
<div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors"></div>
<span className="absolute bottom-1 right-1 text-[10px] md:text-label-sm font-label-sm text-on-primary bg-primary/80 px-1.5 py-0.5 rounded">الحمام الرخامي</span>
</button>
<button className="gallery-thumb group relative h-20 md:h-24 rounded-xl overflow-hidden transition-all shadow-sm bg-surface-container-high opacity-75 hover:opacity-100" onclick="switchGallery(3, this)">
<div className="w-full h-full flex flex-col items-center justify-center bg-primary-container text-on-primary p-2">
<span className="material-symbols-outlined text-secondary-fixed text-2xl">architecture</span>
<span className="text-[10px] md:text-label-sm font-label-sm text-center font-bold">المخطط المعماري 2D</span>
</div>
<span className="absolute bottom-1 right-1 text-[10px] md:text-label-sm font-label-sm text-secondary-fixed bg-primary/90 px-1.5 py-0.5 rounded">الأبعاد 380م²</span>
</button>
</div>
</div>
<!-- Architectural Highlights & Quick Specs Card (4 cols) -->
<div className="lg:col-span-4 flex flex-col gap-space-sm justify-between">
<!-- Highlights Box -->
<div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between pb-space-xs">
<h3 className="font-title-md text-title-md font-bold text-primary flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary">verified</span>
              مميزات التصميم المعماري
            </h3>
<span className="text-secondary font-label-sm text-label-sm font-bold bg-secondary-fixed/30 px-2 py-0.5 rounded">VIP Duplex</span>
</div>
<div className="flex flex-col gap-2.5">
<div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-container-low">
<span className="material-symbols-outlined text-secondary text-xl mt-0.5">apartment</span>
<div>
<span className="font-label-md text-label-md font-bold text-on-surface block">دوبلكس بسقف مضاعف (Double-Height)</span>
<span className="font-body-md text-body-md text-on-surface-variant text-xs">ارتفاع سقف 7.2 متر في الريسيبشن مع واجهات زجاجية بالكامل عازلة للصوت والحرارة.</span>
</div>
</div>
<div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-container-low">
<span className="material-symbols-outlined text-secondary text-xl mt-0.5">pool</span>
<div>
<span className="font-label-md text-label-md font-bold text-on-surface block">إنفينيتي بول خاص بالروف (Private Sky Pool)</span>
<span className="font-body-md text-body-md text-on-surface-variant text-xs">مسبح حراري مدفأ بإطلالة علوية مع منطقة شواء وبرجولا خشبية مقاومة للمناخ.</span>
</div>
</div>
<div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-container-low">
<span className="material-symbols-outlined text-secondary text-xl mt-0.5">elevator</span>
<div>
<span className="font-label-md text-label-md font-bold text-on-surface block">مصعد بانورامي خاص ببصمة ذكية</span>
<span className="font-body-md text-body-md text-on-surface-variant text-xs">وصول مباشر من بهو كبار الزوار ومنطقة الجراج الخاص مباشرة إلى ردهة الوحدة.</span>
</div>
</div>
<div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface-container-low">
<span className="material-symbols-outlined text-secondary text-xl mt-0.5">smart_toy</span>
<div>
<span className="font-label-md text-label-md font-bold text-on-surface block">نظام أتمتة منزلي كامل KNX Smart Home</span>
<span className="font-body-md text-body-md text-on-surface-variant text-xs">تحكم لمسي وصوتي شامل في التكييف المركزي، الإضاءة الخافتة والستائر ونظام الصوت المحيطي.</span>
</div>
</div>
</div>
</div>
<!-- Quick Investment Assurance Box -->
<div className="bg-primary text-on-primary p-space-md rounded-2xl shadow-sm flex flex-col justify-between gap-space-sm">
<div className="flex items-center gap-space-xs text-secondary-fixed">
<span className="material-symbols-outlined text-xl">shield_locked</span>
<span className="font-label-md text-label-md font-bold">عقد استثماري ثلاثي معتمد</span>
</div>
<p className="font-body-md text-body-md text-on-primary-container text-xs leading-relaxed">
            تشمل الوحدة حصة قانونية كاملة في الأرض، مع خيار الإدارة والتشغيل الفندقي بعائد إيجاري دولاري متوقع 12% سنوياً من شركة الإدارة الفندقية العالمية.
          </p>
<div className="flex items-center justify-between text-xs pt-2">
<span className="text-on-primary-container">تاريخ التسليم التعاقدي:</span>
<span className="font-bold text-secondary-fixed font-financial-numeric text-sm">الربع الرابع 2026</span>
</div>
</div>
</div>
</div>
</section>
<!-- Key Specs Metric Grid (6 High-precision metrics) -->
<section className="w-full px-margin py-space-sm">
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-space-sm">
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-2">
<div className="flex items-center justify-between">
<span className="text-secondary font-label-sm text-label-sm">المساحة الكلية</span>
<span className="material-symbols-outlined text-on-surface-variant text-xl">square_foot</span>
</div>
<div>
<span className="font-financial-numeric text-financial-numeric text-primary font-bold">380</span>
<span className="text-on-surface-variant font-label-sm text-label-sm mr-1">م² مغطى</span>
<p className="text-xs text-secondary font-label-sm">+ 85 م² روف وتراس</p>
</div>
</div>
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-2">
<div className="flex items-center justify-between">
<span className="text-secondary font-label-sm text-label-sm">الطوابق</span>
<span className="material-symbols-outlined text-on-surface-variant text-xl">layers</span>
</div>
<div>
<span className="font-financial-numeric text-financial-numeric text-primary font-bold">34 و 35</span>
<span className="text-on-surface-variant font-label-sm text-label-sm mr-1">دوبلكس</span>
<p className="text-xs text-on-surface-variant">أعلى نقطة بالبرج</p>
</div>
</div>
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-2">
<div className="flex items-center justify-between">
<span className="text-secondary font-label-sm text-label-sm">الغرف والأجنحة</span>
<span className="material-symbols-outlined text-on-surface-variant text-xl">king_bed</span>
</div>
<div>
<span className="font-financial-numeric text-financial-numeric text-primary font-bold">4</span>
<span className="text-on-surface-variant font-label-sm text-label-sm mr-1">أجنحة ماستر</span>
<p className="text-xs text-on-surface-variant">+ جناح ضيوف مستقل</p>
</div>
</div>
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-2">
<div className="flex items-center justify-between">
<span className="text-secondary font-label-sm text-label-sm">الحمامات والخدمات</span>
<span className="material-symbols-outlined text-on-surface-variant text-xl">bathtub</span>
</div>
<div>
<span className="font-financial-numeric text-financial-numeric text-primary font-bold">5 + 1</span>
<span className="text-on-surface-variant font-label-sm text-label-sm mr-1">حمامات</span>
<p className="text-xs text-on-surface-variant">غرفة مساعدة بحمام</p>
</div>
</div>
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-2">
<div className="flex items-center justify-between">
<span className="text-secondary font-label-sm text-label-sm">التشطيب والتأثيث</span>
<span className="material-symbols-outlined text-on-surface-variant text-xl">countertops</span>
</div>
<div>
<span className="font-title-md text-title-md text-primary font-bold">ألترا سوبر لوكس</span>
<p className="text-xs text-on-surface-variant">فندقي بالفرش والتكييف</p>
</div>
</div>
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-2">
<div className="flex items-center justify-between">
<span className="text-secondary font-label-sm text-label-sm">الإطلالة المباشرة</span>
<span className="material-symbols-outlined text-on-surface-variant text-xl">visibility</span>
</div>
<div>
<span className="font-title-md text-title-md text-primary font-bold">270° بانوراما</span>
<p className="text-xs text-secondary font-bold">البرج الأيقوني والنهر</p>
</div>
</div>
</div>
</section>
<!-- Two-Column Layout: Main Details vs Sticky Booking Card -->
<section className="w-full px-margin py-space-lg">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
<!-- MAIN DETAILS COLUMN (Right column in RTL: 8 cols) -->
<div className="lg:col-span-8 flex flex-col gap-space-xl">
<!-- Architectural Overview -->
<article className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md">
<h2 className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-2xl">home_work</span>
            نظرة عامة على البنتهاوس الملكي (Penthouse HOR-PH01)
          </h2>
<div className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed flex flex-col gap-3">
<p>
              يقدم بنتهاوس HOR-PH01 في أبراج حورس الاستثمارية نموذجاً استثنائياً للرفاهية الرأسية المعاصرة في قلب منطقة الأعمال المركزية (CBD). صُممت هذه الوحدة لتجسيد فلسفة الفخامة المعمارية المصرية التي تجمع بين الاتساع الجريء والخصوصية الملكية المطلقة. تحتل الوحدة الطابقين الأخيرين 34 و 35 بإطلالة كاشفة مفتوحة لا تُحجب بزاوية 270 درجة على النهر الأخضر وامتداد البرج الأيقوني.
            </p>
<p>
              يتميز الدور السفلي بردهة استقبال فسيحة ومجلس ملكي مفتوح بارتفاع أسقف مزدوج يصل إلى 7.2 أمتار يحيط به زجاج ألماني ثلاثي الطبقات مانع للحرارة وممتص للصوت، مما يوفر هدوءاً فائقاً وسط نبض العاصمة. كما يشتمل الدور العلوي على الأجنحة الملكية الخاصة، مع ممر معلق زجاجي يطل على منطقة الاستقبال، ومخرج مباشر إلى التراس العلوي المزود بمسبح خاص مدفأ ومنطقة استجمام متكاملة.
            </p>
</div>
</article>
<!-- Detailed Room Dimensions & Layout Table -->
<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<h2 className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-2xl">straighten</span>
              المخطط التفصيلي وتوزيع المساحات الداخلية
            </h2>
<span className="font-label-sm text-label-sm text-on-surface-variant">مساحة صافية 100% مطابقة للكود الهندسي</span>
</div>
<div className="overflow-x-auto rounded-xl">
<table className="w-full text-right font-body-md text-body-md">
<thead className="bg-surface-container font-bold text-primary">
<tr>
<th className="p-3">الفراغ المعماري</th>
<th className="p-3">المستوى / الطابق</th>
<th className="p-3">الأبعاد التقريبية</th>
<th className="p-3">المساحة الصافية</th>
<th className="p-3">نوعية الأرضيات والتكسيات</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container-high text-on-surface-variant">
<tr className="hover:bg-surface-container-low transition-colors">
<td className="p-3 font-bold text-primary flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
                    صالون الاستقبال والداينينج الملكي
                  </td>
<td className="p-3">الطابق 34 السفلي</td>
<td className="p-3 font-financial-numeric" dir="ltr">11.5m x 8.2m</td>
<td className="p-3 font-financial-numeric font-bold text-primary">94.3 م²</td>
<td className="p-3">رخام كرارة إيطالي مستورد فاخر</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="p-3 font-bold text-primary flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
                    جناح الماستر الرئاسي (Master Suite)
                  </td>
<td className="p-3">الطابق 35 العلوي</td>
<td className="p-3 font-financial-numeric" dir="ltr">8.0m x 6.0m</td>
<td className="p-3 font-financial-numeric font-bold text-primary">48.0 م²</td>
<td className="p-3">باركيه أرو طبيعي معزول صوتياً</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="p-3 font-bold text-primary flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
                    أجنحة النوم الإضافية (3 أجنحة ملحقة)
                  </td>
<td className="p-3">الطابق 34 و 35</td>
<td className="p-3 font-financial-numeric" dir="ltr">5.2m x 4.8m (لكل جناح)</td>
<td className="p-3 font-financial-numeric font-bold text-primary">75.0 م²</td>
<td className="p-3">خشب HDF معالج مخصص للأجنحة</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="p-3 font-bold text-primary flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
                    المطبخ الرئيسي (Show &amp; Dirty Kitchen)
                  </td>
<td className="p-3">الطابق 34 السفلي</td>
<td className="p-3 font-financial-numeric" dir="ltr">6.0m x 4.2m</td>
<td className="p-3 font-financial-numeric font-bold text-primary">25.2 م²</td>
<td className="p-3">بورسلين إسباني مع أجهزة Miele مدمجة</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="p-3 font-bold text-primary flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
                    تراس الروف ومحيط المسبح الخاص
                  </td>
<td className="p-3">الطابق 35 الروف العلوي</td>
<td className="p-3 font-financial-numeric" dir="ltr">12.5m x 6.8m</td>
<td className="p-3 font-financial-numeric font-bold text-primary">85.0 م²</td>
<td className="p-3">أرضيات WPC خشبية مقاومة للعوامل الجوية</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="p-3 font-bold text-primary flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
                    جناح الضيوف وغرفة المساعدة المنزلية
                  </td>
<td className="p-3">الطابق 34 السفلي</td>
<td className="p-3 font-financial-numeric" dir="ltr">4.0m x 3.5m</td>
<td className="p-3 font-financial-numeric font-bold text-primary">14.0 م²</td>
<td className="p-3">سيراميك كليوباترا فرز أول</td>
</tr>
</tbody>
</table>
</div>
</div>
<!-- Amenities & Premium Inclusions -->
<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md">
<h2 className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-2xl">room_service</span>
            الخدمات والمرافق الفندقية الحصرية المشمولة مع البنتهاوس
          </h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
<div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low">
<div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined">garage</span>
</div>
<div>
<span className="font-label-md text-label-md font-bold text-primary block">موقفين سيارات مغطى إلكتروني</span>
<span className="font-body-md text-body-md text-on-surface-variant text-xs">نقاط شحن كهربائية للسيارات EV في الطابق B1.</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low">
<div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined">spa</span>
</div>
<div>
<span className="font-label-md text-label-md font-bold text-primary block">عضوية نادي صحي وسبا 5 نجوم</span>
<span className="font-body-md text-body-md text-on-surface-variant text-xs">اشتراك عائلي مجاني مدى الحياة في النادي المعلق للبرج.</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low">
<div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined">concierge</span>
</div>
<div>
<span className="font-label-md text-label-md font-bold text-primary block">خدمة كونسيرج ومساعد شخصي 24/7</span>
<span className="font-body-md text-body-md text-on-surface-variant text-xs">حجز طيران خاص، سيارات ليموزين وخدمات ضيافة.</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-low">
<div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined">lock_clock</span>
</div>
<div>
<span className="font-label-md text-label-md font-bold text-primary block">نظام أمني ثلاثي المستويات</span>
<span className="font-body-md text-body-md text-on-surface-variant text-xs">تحكم في الصعود البيومتري وغرفة طوارئ مصفحة مدمجة.</span>
</div>
</div>
</div>
</div>
<!-- Interactive Payment & Installment Calculator -->
<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md" id="payment-calculator">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
<div>
<h2 className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-2xl">calculate</span>
                حاسبة أنظمة السداد والأقساط التفاعلية
              </h2>
<p className="font-body-md text-body-md text-on-surface-variant text-xs mt-1">خصص خطة الدفع الأنسب لمحفظتك الاستثمارية واكتشف الخصومات النقدية الفورية</p>
</div>
<div className="flex items-center gap-2 bg-secondary/10 px-3 py-1.5 rounded-lg text-secondary">
<span className="material-symbols-outlined text-base">savings</span>
<span className="font-label-md text-label-md font-bold">خصم الكاش النقدي: 20% (3,700,000 ج.م)</span>
</div>
</div>
<!-- Base Total Price Banner -->
<div className="p-space-md rounded-xl bg-primary text-on-primary flex flex-wrap items-center justify-between gap-space-sm">
<div>
<span className="text-on-primary-container font-label-sm text-label-sm block">السعر الأساسي الإجمالي للوحدة:</span>
<span className="font-financial-numeric text-financial-numeric text-secondary-fixed text-2xl font-bold">18,500,000</span>
<span className="text-on-primary-container text-sm mr-1">جنيه مصري</span>
</div>
<div className="text-left">
<span className="text-on-primary-container font-label-sm text-label-sm block">سعر السداد الفوري (الكاش):</span>
<span className="font-financial-numeric text-financial-numeric text-on-primary text-xl font-bold">14,800,000</span>
<span className="text-on-primary-container text-xs mr-1">ج.م فقط</span>
</div>
</div>
<!-- Sliders and Inputs -->
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg pt-2">
<!-- Down Payment Selector -->
<div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-xl">
<div className="flex justify-between items-center">
<label className="font-title-md text-title-md font-bold text-primary">نسبة الدفعة المقدمة:</label>
<span className="bg-secondary text-on-secondary px-2.5 py-0.5 rounded font-bold font-financial-numeric text-sm" id="dpPercentBadge">10%</span>
</div>
<input className="w-full h-2 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-secondary" id="dpSlider" max="30" min="10" oninput="calculateInstallments()" step="5" type="range" value="10"/>
<div className="flex justify-between text-xs text-on-surface-variant font-financial-numeric">
<span>10% (1,850,000 ج.م)</span>
<span>20% (3,700,000 ج.م)</span>
<span>30% (5,550,000 ج.م)</span>
</div>
</div>
<!-- Installment Years Selector -->
<div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-xl">
<div className="flex justify-between items-center">
<label className="font-title-md text-title-md font-bold text-primary">فترة سداد الأقساط:</label>
<span className="bg-primary text-on-primary px-2.5 py-0.5 rounded font-bold font-financial-numeric text-sm" id="yearsBadge">8 سنوات</span>
</div>
<input className="w-full h-2 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary" id="yearsSlider" max="10" min="5" oninput="calculateInstallments()" step="1" type="range" value="8"/>
<div className="flex justify-between text-xs text-on-surface-variant font-financial-numeric">
<span>5 سنوات</span>
<span>7 سنوات</span>
<span>10 سنوات</span>
</div>
</div>
</div>
<!-- Real-Time Calculation Results -->
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm pt-2">
<div className="p-3.5 rounded-xl bg-surface-container flex flex-col justify-between">
<span className="text-on-surface-variant font-label-sm text-label-sm">الدفعة المقدمة المطلوبة الآن:</span>
<div className="mt-1">
<span className="font-financial-numeric text-financial-numeric font-bold text-primary text-lg" id="calculatedDP">1,850,000</span>
<span className="text-xs text-on-surface-variant mr-1">ج.م</span>
</div>
</div>
<div className="p-3.5 rounded-xl bg-surface-container flex flex-col justify-between">
<span className="text-on-surface-variant font-label-sm text-label-sm">القسط ربع السنوي المتساوي:</span>
<div className="mt-1">
<span className="font-financial-numeric text-financial-numeric font-bold text-secondary text-lg" id="calculatedQuarterly">520,312</span>
<span className="text-xs text-on-surface-variant mr-1">ج.م / 3 أشهر</span>
</div>
</div>
<div className="p-3.5 rounded-xl bg-surface-container flex flex-col justify-between">
<span className="text-on-surface-variant font-label-sm text-label-sm">القسط الشهري التقديري:</span>
<div className="mt-1">
<span className="font-financial-numeric text-financial-numeric font-bold text-primary text-lg" id="calculatedMonthly">173,437</span>
<span className="text-xs text-on-surface-variant mr-1">ج.م / شهر</span>
</div>
</div>
</div>
<div className="p-3 rounded-lg bg-surface-container-low flex items-center gap-2 text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-secondary text-base">info</span>
<span>بدون أي فوائد بنكية أو مصاريف إدارية خفية. يتم السداد بشيكات بنكية مقاصة مقبولة الدفع بعد توقيع العقود.</span>
</div>
</div>
<!-- Project Location & Proximity Map -->
<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<h2 className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-2xl">location_on</span>
              موقع البرج وسهولة الوصول الاستراتيجي
            </h2>
<span className="font-label-sm text-label-sm text-secondary font-bold">منطقة الأعمال المركزية CBD</span>
</div>
<!-- Location Map Pipeline -->
<div className="w-full h-72 bg-cover bg-center rounded-xl shadow-inner relative overflow-hidden flex items-end p-space-md" data-location="Central Business District, New Administrative Capital, Cairo, Egypt" style="">
<div className="bg-primary/90 backdrop-blur-md text-on-primary p-space-sm rounded-xl flex items-center gap-space-sm max-w-md shadow-lg">
<span className="material-symbols-outlined text-secondary-fixed text-2xl">explore</span>
<div className="text-xs">
<span className="font-bold block text-sm">أبراج حورس الاستثمارية</span>
<span>تقاطع محور محمد بن زايد الشمالي مع النهر الأخضر مباشرة أمام محطة المونوريل المركزية.</span>
</div>
</div>
</div>
<!-- Proximity Distances -->
<div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm">
<div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
<span className="text-xs text-on-surface-variant">محور بن زايد الشمالي</span>
<span className="font-bold text-primary text-sm flex items-center gap-1">
<span className="material-symbols-outlined text-secondary text-base">directions_car</span>
                دقيقة واحدة فقط
              </span>
</div>
<div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
<span className="text-xs text-on-surface-variant">محطة المونوريل المركزية</span>
<span className="font-bold text-primary text-sm flex items-center gap-1">
<span className="material-symbols-outlined text-secondary text-base">tram</span>
                3 دقائق سيراً
              </span>
</div>
<div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
<span className="text-xs text-on-surface-variant">حي المال والأعمال والبنوك</span>
<span className="font-bold text-primary text-sm flex items-center gap-1">
<span className="material-symbols-outlined text-secondary text-base">account_balance</span>
                5 دقائق
              </span>
</div>
<div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
<span className="text-xs text-on-surface-variant">مطار العاصمة الدولي</span>
<span className="font-bold text-primary text-sm flex items-center gap-1">
<span className="material-symbols-outlined text-secondary text-base">flight_takeoff</span>
                20 دقيقة
              </span>
</div>
</div>
</div>
<!-- Similar / Alternative Units Carousel -->
<div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<h2 className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-2xl">grid_view</span>
              وحدات فاخرة بديلة ومماثلة في نفس المشروع
            </h2>
<a className="text-secondary font-label-md text-label-md font-bold hover:underline flex items-center gap-1" href="#">
<span>عرض كل الوحدات</span>
<span className="material-symbols-outlined text-sm">arrow_back</span>
</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<!-- Alternative Card 1 -->
<div className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow">
<div className="relative h-44 w-full">
<img className="w-full h-full object-cover" data-alt="Modern high floor duplex residence in Cairo with open balcony overlooking the central business district towers at dawn" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPUKrWMY6kNsCjeLg5vxQGvWwPNxUtJBaApYYOU00e8Adj-0Q_grWQcRGhSWHojA0pAeFzhgRkfNsvMPxd3D7i-1p9N2-ID4eDZbYAbDoaP6Pt22owKCWv_YSE89UAYZ4f2wveJWRoDyJAeH_QNKPWMQl1SGJIf3cfCg_pO1UjL6RtrssKjc5E5WM8rX-KK7FKMh-SdTYOsbX--WUyhosPs4uM1AB6YnB_xMXb-lTcHPGifTWyq_j-mw"/>
<span className="absolute top-2 right-2 bg-emerald-600 text-white font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold">متاح للحجز</span>
<span className="absolute bottom-2 left-2 bg-primary/80 backdrop-blur-sm text-white font-financial-numeric text-sm px-2 py-0.5 rounded">كود: HR-DP04</span>
</div>
<div className="p-space-sm flex flex-col justify-between flex-1 gap-2">
<div>
<h3 className="font-title-md text-title-md font-bold text-primary">دوبلكس جاردن سكاي (Sky Garden Duplex)</h3>
<p className="text-xs text-on-surface-variant">الدور 26 و 27 • مساحة 295 م² • 3 غرف نوم ماستر</p>
</div>
<div className="flex items-center justify-between pt-2">
<span className="font-financial-numeric text-financial-numeric font-bold text-primary">13,900,000 ج.م</span>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-highest hover:bg-secondary hover:text-white transition-colors text-primary font-label-sm text-label-sm font-bold">
                    معاينة الوحدة
                  </button>
</div>
</div>
</div>
<!-- Alternative Card 2 -->
<div className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow">
<div className="relative h-44 w-full">
<img className="w-full h-full object-cover" data-alt="Luxury corner penthouse apartment in modern tower with private outdoor jacuzzi terrace and panoramic city skyline view" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLfWlPhEYtidS2t3sYFZ3DErxfgKt_D16pd2SVc2lOOBi9C-83P9jJugF_vRmpEpriftRTxzpaGcTzujxnwaBe5ZSWjE0Ab6pEirFhbv7XRKVgaDzoUDZOWRdM1fPmLd5o-_6LEK4dc04ZzY1WTBEGklELmtL790d1MFE90Yio31TiXJRDj4cc2X8iGgsJeaUOycmi2ZO7zpYiz4rciAQz2dkiPkPODl3f9e6tMnWv-YD_Nvc0Zpt15A"/>
<span className="absolute top-2 right-2 bg-amber-600 text-white font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold">قيد الحجز المؤقت</span>
<span className="absolute bottom-2 left-2 bg-primary/80 backdrop-blur-sm text-white font-financial-numeric text-sm px-2 py-0.5 rounded">كود: HR-PH02</span>
</div>
<div className="p-space-sm flex flex-col justify-between flex-1 gap-2">
<div>
<h3 className="font-title-md text-title-md font-bold text-primary">بنتهاوس كورنر شرقي (Sunrise Penthouse)</h3>
<p className="text-xs text-on-surface-variant">الدور 32 • مساحة 340 م² • 4 غرف نوم • جاكوزي خارجي</p>
</div>
<div className="flex items-center justify-between pt-2">
<span className="font-financial-numeric text-financial-numeric font-bold text-primary">16,200,000 ج.م</span>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-highest hover:bg-secondary hover:text-white transition-colors text-primary font-label-sm text-label-sm font-bold">
                    معاينة الوحدة
                  </button>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- STICKY BOOKING SUMMARY CARD (Left column in RTL: 4 cols) -->
<aside className="lg:col-span-4 sticky top-24 flex flex-col gap-space-md">
<!-- Main Reservation Card -->
<div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-xl flex flex-col gap-space-md border-t-4 border-secondary">
<!-- Card Header & Live Unit Status -->
<div className="flex items-start justify-between pb-space-xs border-b border-surface-container">
<div>
<span className="text-xs font-bold text-secondary uppercase tracking-wider block">بطاقة الحجز والتعاقد</span>
<h2 className="font-headline-sm text-headline-sm font-bold text-primary">وحدة بنتهاوس HOR-PH01</h2>
</div>
<div className="flex flex-col items-end">
<span className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full font-bold">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                متاحة للتعاقد
              </span>
<span className="text-[10px] text-on-surface-variant mt-1">مؤمنة بضمان الحجز</span>
</div>
</div>
<!-- Price & Plan Summary -->
<div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2">
<div className="flex items-baseline justify-between">
<span className="text-xs text-on-surface-variant">إجمالي قيمة الوحدة:</span>
<div>
<span className="font-financial-numeric text-financial-numeric text-primary font-bold text-xl">18,500,000</span>
<span className="text-xs text-secondary font-bold mr-1">ج.م</span>
</div>
</div>
<div className="flex items-center justify-between text-xs pt-1 border-t border-surface-container">
<span className="text-on-surface-variant">الدفعة الأولى (10%):</span>
<span className="font-bold text-primary font-financial-numeric" id="summaryDP">1,850,000 ج.م</span>
</div>
<div className="flex items-center justify-between text-xs">
<span className="text-on-surface-variant">قسط ربع سنوي (8 سنوات):</span>
<span className="font-bold text-secondary font-financial-numeric" id="summaryQuarterly">520,312 ج.م</span>
</div>
<div className="flex items-center justify-between text-xs">
<span className="text-on-surface-variant">وديعة الصيانة (تُدفع عند الاستلام):</span>
<span className="font-bold text-on-surface font-financial-numeric">8% (1,480,000 ج.م)</span>
</div>
</div>
<!-- Primary CTA Button (Instant Reservation) -->
<div className="flex flex-col gap-2">
<button className="w-full h-12 bg-secondary hover:bg-secondary/90 text-on-secondary rounded-xl font-title-md text-title-md font-bold transition-all shadow-md flex items-center justify-center gap-2" onclick="openBookingModal()">
<span className="material-symbols-outlined text-xl">credit_card</span>
<span>احجز هذه الوحدة فوراً (مقدم 100,000 ج.م)</span>
</button>
<span className="text-[11px] text-center text-on-surface-variant block">مبلغ جدية الحجز مسترد بالكامل لمدة 14 يوماً وفق قانون حماية المستهلك</span>
</div>
<!-- Smart Assigned Sales WhatsApp Block -->
<div className="p-space-sm rounded-xl bg-primary text-on-primary flex flex-col gap-space-xs relative overflow-hidden">
<!-- Background Decorative Accent -->
<div className="absolute -left-6 -bottom-6 w-20 h-20 bg-secondary/20 rounded-full blur-xl pointer-events-none"></div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="relative w-10 h-10 rounded-full overflow-hidden border border-secondary-fixed">
<img className="w-full h-full object-cover" data-alt="Portrait of senior Egyptian male real estate investment consultant in sharp formal business suit, smiling confidently" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp7WP0RxxU6n_N-BGSm1lERjHA1l3Ps61MBrx1cNMunzKQKSMFtZuLtkY4-FTImrsXtqbSYCDqzhJRSj5PkAWGhUBUSpKo424fwDGMz966YWp-atYLvBvgdlnV2UM6q8Gdx4ygU95qjgHgNraECziWE7R1vxC9U6qFvfNuOdvzore2qyRWo7WMDe7BLDxS1k_WHY1uoDwiBcXvR8-v1iB5E4RF-AARrrGxeC7hBlV63xtBL2aIIp86bg"/>
<span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-primary"></span>
</div>
<div>
<span className="text-xs text-secondary-fixed block font-bold">مستشارك العقاري المخصص:</span>
<span className="font-title-md text-title-md font-bold text-on-primary">أ. كريم السيوفي</span>
</div>
</div>
<span className="text-[10px] bg-white/10 text-secondary-fixed px-2 py-0.5 rounded font-bold">VIP Advisor</span>
</div>
<div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1">
<span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
<span>متصل الآن • متوسط الرد خلال 3 دقائق</span>
</div>
<!-- WhatsApp Action Button -->
<a className="w-full py-2.5 mt-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-label-md text-label-md font-bold transition-all shadow flex items-center justify-center gap-2" href="https://wa.me/201098765432?text=أرغب%20في%20الاستفسار%20وحجز%20البنتهاوس%20HOR-PH01%20في%20أبراج%20حورس" rel="noopener noreferrer" target="_blank">
<svg className="w-5 h-5 fill-current" viewbox="0 0 24 24">
<path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.771.865 2.796.865 3.182 0 5.768-2.587 5.768-5.766 0-3.18-2.586-5.652-5.768-5.652zm3.398 8.169c-.141.397-.714.734-1.021.782-.294.047-.678.078-2.193-.548-1.938-.801-3.186-2.775-3.282-2.905-.096-.13-.787-1.047-.787-1.993 0-.946.495-1.411.671-1.603.176-.192.384-.24.512-.24.128 0 .256.002.368.008.12.006.279-.045.437.334.16.385.545 1.332.593 1.428.048.096.08.209.016.337-.064.128-.096.208-.192.32-.096.113-.203.252-.29.338-.097.095-.198.199-.086.391.112.192.497.82 1.066 1.328.733.655 1.352.858 1.544.954.192.096.304.08.416-.048.113-.128.48-559.608-.751.128-.192.256-.16.432-.096.176.064 1.12.528 1.312.624.192.096.32.144.368.224.048.08.048.464-.093.861z"></path>
</svg>
<span>تواصل عبر واتساب (+20 10 9876 5432)</span>
</a>
</div>
<!-- Quick Request Call-Back Form -->
<div className="flex flex-col gap-2 pt-2 border-t border-surface-container">
<span className="font-title-md text-title-md font-bold text-primary">طلب اتصال فوري من المبيعات</span>
<form className="flex flex-col gap-2" onsubmit="handleQuickInquiry(event)">
<input className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface text-sm focus:outline-none focus:ring-1 focus:ring-secondary" id="clientName" placeholder="الاسم ثلاثي" required="" type="text"/>
<input className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface text-sm focus:outline-none focus:ring-1 focus:ring-secondary" dir="ltr" id="clientPhone" placeholder="رقم الهاتف (واتساب)" required="" type="tel"/>
<button className="w-full h-10 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold transition-all" type="submit">
                اتصلوا بي الآن
              </button>
</form>
</div>
<!-- Legal & Banking Compliance Badges -->
<div className="pt-2 border-t border-surface-container flex flex-col gap-1.5 text-[11px] text-on-surface-variant">
<div className="flex items-center gap-1.5 text-secondary font-bold">
<span className="material-symbols-outlined text-sm">verified_user</span>
<span>حساب ضمان بنكي مقيد (Escrow Account)</span>
</div>
<p>جميع المدفوعات والشيكات تودع في الحساب المقيد للمشروع بالبنك الأهلي المصري تحت إشراف هيئة المجتمعات العمرانية الجديدة.</p>
</div>
</div>
<!-- Safe Transaction Disclaimer -->
<div className="p-3 bg-surface-container-low rounded-xl flex items-center gap-2 text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-base text-secondary">gavel</span>
<span>عقد موثق بالسجل العيني ومطابق للائحة العقارية المصرية.</span>
</div>
</aside>
</div>
</section>
<!-- Interactive Reservation Modal (Initially Hidden) -->
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm hidden transition-all duration-300" id="bookingModal">
<div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl p-space-lg shadow-2xl flex flex-col gap-space-md border-t-4 border-secondary max-h-[921px] overflow-y-auto">
<div className="flex items-center justify-between pb-2 border-b border-surface-container">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-2xl">lock</span>
<h3 className="font-headline-sm text-headline-sm font-bold text-primary">تأكيد حجز البنتهاوس HOR-PH01</h3>
</div>
<button className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary" onclick="closeBookingModal()">
<span className="material-symbols-outlined text-base">close</span>
</button>
</div>
<div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between text-xs">
<div>
<span className="text-on-surface-variant block">مبلغ جدية الحجز القابل للاسترداد:</span>
<span className="font-bold text-primary text-base font-financial-numeric">100,000 ج.م</span>
</div>
<span className="bg-secondary-fixed/50 text-secondary font-bold px-2 py-1 rounded">حجز حصري لمدة 72 ساعة</span>
</div>
<form className="flex flex-col gap-space-sm text-right" onsubmit="submitReservation(event)">
<div>
<label className="font-label-md text-label-md font-bold text-primary block mb-1">الاسم الكامل (كما في بطاقة الرقم القومي أو الجواز):</label>
<input className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface text-sm focus:ring-1 focus:ring-secondary focus:outline-none" placeholder="أدخل اسمك الرباعي" required="" type="text"/>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
<div>
<label className="font-label-md text-label-md font-bold text-primary block mb-1">الرقم القومي / رقم جواز السفر:</label>
<input className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface text-sm focus:ring-1 focus:ring-secondary focus:outline-none" dir="ltr" placeholder="14 رقم قومي أو رقم الجواز" required="" type="text"/>
</div>
<div>
<label className="font-label-md text-label-md font-bold text-primary block mb-1">رقم الهاتف الجوال:</label>
<input className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface text-sm focus:ring-1 focus:ring-secondary focus:outline-none" dir="ltr" placeholder="+20 100 000 0000" required="" type="tel"/>
</div>
</div>
<div>
<label className="font-label-md text-label-md font-bold text-primary block mb-1">البريد الإلكتروني لإرسال مسودة العقد:</label>
<input className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface text-sm focus:ring-1 focus:ring-secondary focus:outline-none" dir="ltr" placeholder="your.name@domain.com" required="" type="email"/>
</div>
<div>
<label className="font-label-md text-label-md font-bold text-primary block mb-1">وسيلة سداد جدية الحجز:</label>
<div className="grid grid-cols-3 gap-2">
<label className="flex items-center gap-1.5 p-2 bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container text-xs">
<input checked="" className="accent-secondary" name="payMethod" type="radio"/>
<span>بطاقة بنكية (فيزا/ماستر)</span>
</label>
<label className="flex items-center gap-1.5 p-2 bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container text-xs">
<input className="accent-secondary" name="payMethod" type="radio"/>
<span>تحويل بنكي رسمي</span>
</label>
<label className="flex items-center gap-1.5 p-2 bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container text-xs">
<input className="accent-secondary" name="payMethod" type="radio"/>
<span>شيك مقبول الدفع</span>
</label>
</div>
</div>
<div className="flex items-start gap-2 pt-2">
<input className="mt-1 accent-secondary" id="termsCheck" required="" type="checkbox"/>
<label className="text-xs text-on-surface-variant leading-relaxed" htmlFor="termsCheck">
            أقر باطلاعي وموافقتي على شروط التعاقد وحجز الوحدات المعمول بها في شركة مستقبل الفراعنة ولائحة هيئة المجتمعات العمرانية الجديدة.
          </label>
</div>
<div className="flex items-center gap-space-sm pt-2">
<button className="flex-1 h-12 rounded-xl bg-secondary hover:bg-secondary/90 text-on-secondary font-title-md text-title-md font-bold transition-all shadow-md" type="submit">
            تأكيد الدفع ومتابعة الحجز
          </button>
<button className="px-5 h-12 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-bold transition-colors" onclick="closeBookingModal()" type="button">
            إلغاء
          </button>
</div>
</form>
</div>
</div>
<!-- Interactive JavaScript -->
<script>
    // Gallery Assets Data
    const galleryItems = [
      {
        alt: "Ultra luxury modern duplex penthouse terrace at dusk overlooking the Egyptian New Administrative Capital skyline with private infinity pool and sunken lounge firepit, floor to ceiling glass facade, alabaster flooring, palm trees, warm ambient golden lighting",
        tag: "المشهد البانورامي الخارجي",
        title: "تراس البنتهاوس مع مسبح خاص وإطلالة الشفق على النهر الأخضر"
      },
      {
        alt: "Spacious high ceiling penthouse master bedroom suite with king bed, walk-in Italian dressing room, contemporary alabaster accents and panoramic city window view",
        tag: "الجناح الرئاسي",
        title: "جناح الماستر الملكي مع غرفة ملابس إيطالية وإطلالة مفتوحة"
      },
      {
        alt: "Five-star hotel grade penthouse marble bathroom with freestanding soaking jacuzzi tub, brass gold fittings and panoramic corner glass view",
        tag: "التشطيبات الفندقية",
        title: "حمام الماستر الرخامي بالجاكوزي وتجهيزات ألمانية فاخرة"
      },
      {
        alt: "Detailed modern architectural 2D duplex floor plan of a luxury penthouse showing room dimensions, private pool deck, bedrooms, double height living area and balconies",
        tag: "المخطط الهندسي 2D",
        title: "المخطط المعماري الكامل للوحدة بمساحة 380 م² + 85 م² روف"
      }
    ];

    function switchGallery(index, btn) {
      const mainImg = document.getElementById('mainDisplayImg');
      const tag = document.getElementById('activeImageTag');
      const title = document.getElementById('activeImageTitle');
      const idx = document.getElementById('activeImageIndex');
      
      // Update image and text
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.setAttribute('data-alt', galleryItems[index].alt);
        tag.textContent = galleryItems[index].tag;
        title.textContent = galleryItems[index].title;
        idx.textContent = index + 1;
        mainImg.style.opacity = '1';
      }, 150);

      // Update thumbnail active ring
      document.querySelectorAll('.gallery-thumb').forEach(el => {
        el.classList.remove('ring-2', 'ring-secondary', 'opacity-100');
        el.classList.add('opacity-75');
      });
      if(btn) {
        btn.classList.add('ring-2', 'ring-secondary', 'opacity-100');
        btn.classList.remove('opacity-75');
      }
    }

    // Dynamic Payment Calculator
    const basePrice = 18500000;

    function calculateInstallments() {
      const dpPercent = parseInt(document.getElementById('dpSlider').value);
      const years = parseInt(document.getElementById('yearsSlider').value);

      document.getElementById('dpPercentBadge').textContent = dpPercent + '%';
      document.getElementById('yearsBadge').textContent = years + ' سنوات';

      const dpAmount = (basePrice * dpPercent) / 100;
      const remainingAmount = basePrice - dpAmount;
      const totalQuarters = years * 4;
      const quarterlyPayment = Math.round(remainingAmount / totalQuarters);
      const monthlyPayment = Math.round(quarterlyPayment / 3);

      const formattedDP = dpAmount.toLocaleString('en-US');
      const formattedQuarterly = quarterlyPayment.toLocaleString('en-US');
      const formattedMonthly = monthlyPayment.toLocaleString('en-US');

      document.getElementById('calculatedDP').textContent = formattedDP;
      document.getElementById('calculatedQuarterly').textContent = formattedQuarterly;
      document.getElementById('calculatedMonthly').textContent = formattedMonthly;

      // Update sticky booking card summary
      document.getElementById('summaryDP').textContent = formattedDP + ' ج.م';
      document.getElementById('summaryQuarterly').textContent = formattedQuarterly + ' ج.م';
    }

    // Modal Handlers
    function openBookingModal() {
      const modal = document.getElementById('bookingModal');
      modal.classList.remove('hidden');
    }

    function closeBookingModal() {
      const modal = document.getElementById('bookingModal');
      modal.classList.add('hidden');
    }

    function submitReservation(e) {
      e.preventDefault();
      closeBookingModal();
      showToast('تم تسجيل طلب الحجز المؤكد رقم #RES-9421، سيتواصل معكم المستشار أ. كريم السيوفي فوراً لإتمام التحويل البنكي.');
    }

    function handleQuickInquiry(e) {
      e.preventDefault();
      const name = document.getElementById('clientName').value;
      showToast('شكراً ' + name + '، سيقوم فريق المبيعات بالاتصال بك خلال أقل من 5 دقائق.');
      document.getElementById('clientName').value = '';
      document.getElementById('clientPhone').value = '';
    }

    // Favorite Toggle
    let isFav = false;
    function toggleFavorite() {
      isFav = !isFav;
      const favIcon = document.getElementById('favIcon');
      const favLabel = document.getElementById('favLabel');
      if (isFav) {
        favIcon.textContent = 'favorite';
        favIcon.classList.add('text-error');
        favIcon.style.fontVariationSettings = "'FILL' 1";
        favLabel.textContent = 'محفوظة في المفضلة';
        showToast('تمت إضافة الوحدة HOR-PH01 إلى قائمة الوحدات المفضلة');
      } else {
        favIcon.textContent = 'favorite_border';
        favIcon.classList.remove('text-error');
        favIcon.style.fontVariationSettings = "'FILL' 0";
        favLabel.textContent = 'حفظ الوحدة';
        showToast('تمت إزالة الوحدة من المفضلة');
      }
    }

    // Share action
    function shareUnit() {
      if (navigator.share) {
        navigator.share({
          title: 'بنتهاوس ملكي HOR-PH01 - أبراج حورس الاستثمارية',
          text: 'شاهد تفاصيل ومخطط البنتهاوس الفاخر في العاصمة الإدارية الجديدة',
          url: window.location.href,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('تم نسخ رابط الوحدة إلى الحافظة بنجاح');
      }
    }

    // Toast Messenger
    function showToast(msg) {
      const toast = document.getElementById('toastNotification');
      const text = document.getElementById('toastMessage');
      text.textContent = msg;
      toast.classList.remove('translate-y-32', 'opacity-0', 'pointer-events-none');
      setTimeout(() => {
        toast.classList.add('translate-y-32', 'opacity-0', 'pointer-events-none');
      }, 4000);
    }

    function openVirtualTour() {
      showToast('جاري تشغيل المشغل الافتراضي 360° بجودة Ultra HD...');
    }

    function zoomPlan() {
      switchGallery(3, document.querySelectorAll('.gallery-thumb')[3]);
      showToast('تم عرض وتكبير المخطط الهندسي التفصيلي للأبعاد');
    }

    // Initial calculation trigger
    document.addEventListener('DOMContentLoaded', () => {
      calculateInstallments();
    });
  </script>
</div></main><footer className="w-full bg-primary-container text-on-primary pt-space-xl pb-space-lg"><div className="w-full px-margin"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-xl"><div className="flex flex-col gap-space-md"><div className="flex items-center gap-space-sm"><img alt="شعار مستقبل الفراعنة" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1VWx6jKJknNE_QHLGa2wu5RINLHC-tKjGblBP8IV-4NQjOVIGwFAC7lqrZ7kLJ0Z8I_sd0DxnAiL7bB_nTIrRbp2AxnBlN1-z9QXsIHyyRIoxNJ1p8pBrxJ5JaMv2PBxrvYQ2qmybfZmDQFu9VinTWK60x1eGvoYztE593XMsNleq-G0VSoY-0u_DKSHikfzMYlirkYn5shbwPwY6fSpc7TcYQC2aY5qmH1WRyG-S-K3ihr6iqUdKTH0Ek"/><span className="font-title-lg text-title-lg text-on-primary font-bold">مستقبل الفراعنة</span></div><p className="font-body-md text-body-md text-on-primary-container leading-relaxed">صرح استثماري وتطوير عقاري مصري رائد يرتكز على إرث معماري خالد ويقود التحول الرقمي لمحفظة الأصول السكنية والتجارية الاستثمارية.</p><div className="flex items-center gap-space-xs text-secondary-fixed font-label-md text-label-md"><span className="material-symbols-outlined text-base">verified_user</span><span>ترخيص هيئة المجتمعات العمرانية رقم 4829 / ج.م</span></div></div><div className="flex flex-col gap-space-md"><span className="font-title-md text-title-md text-secondary-fixed border-r-2 border-secondary pr-space-xs">بوابات المستثمرين والعملاء</span><div className="flex flex-col gap-space-sm"><a className="text-on-primary-container hover:text-on-primary text-body-md font-body-md transition-colors" data-path="projects" href="#">مشروعاتنا الرائدة</a><a className="text-on-primary-container hover:text-on-primary text-body-md font-body-md transition-colors" data-path="available-units" href="#">الوحدات المتاحة والمخططات</a><a className="text-on-primary-container hover:text-on-primary text-body-md font-body-md transition-colors" data-path="about-us" href="#">عن الشركة وفريق العمل</a><a className="text-on-primary-container hover:text-on-primary text-body-md font-body-md transition-colors" data-path="contact" href="#">التواصل والمبيعات</a></div></div><div className="flex flex-col gap-space-md"><span className="font-title-md text-title-md text-secondary-fixed border-r-2 border-secondary pr-space-xs">الامتثال والمعاملات البنكية</span><p className="font-body-md text-body-md text-on-primary-container leading-relaxed">كافة التحويلات والحجوزات البنكية خاضعة لرقابة البنك المركزي المصري ومعايير حماية المستثمر العقاري وفق اللائحة التنفيذية رقم 119.</p><div className="flex items-center gap-space-md text-on-primary-container"><span className="material-symbols-outlined text-2xl">lock</span><span className="material-symbols-outlined text-2xl">security</span><span className="material-symbols-outlined text-2xl">assured_workload</span><span className="material-symbols-outlined text-2xl">receipt_long</span></div></div><div className="flex flex-col gap-space-md"><span className="font-title-md text-title-md text-secondary-fixed border-r-2 border-secondary pr-space-xs">المقر الرئيسي والتواصل</span><div className="flex flex-col gap-space-xs text-on-primary-container text-body-md font-body-md"><div className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-base text-secondary">location_on</span><span>القطاع المالي، العاصمة الإدارية الجديدة، القاهرة</span></div><div className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-base text-secondary">call</span><span className="text-right font-financial-numeric text-financial-numeric" dir="ltr">+20 2 2840 9000</span></div><div className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-base text-secondary">mail</span><span>invest@pharaohsfutures.com.eg</span></div></div></div></div><div className="pt-space-lg flex flex-col md:flex-row items-center justify-between text-on-primary-container font-label-md text-label-md gap-space-md"><p>© 2025 شركة مستقبل الفراعنة للاستثمار والتطوير العقاري. جميع الحقوق محفوظة.</p><div className="flex items-center gap-space-lg"><a className="hover:text-on-primary transition-colors" href="#">سياسة الخصوصية وسرية المستثمر</a><a className="hover:text-on-primary transition-colors" href="#">الشروط والأحكام التعاقدية</a><a className="hover:text-on-primary transition-colors" href="#">بوابة السداد الإلكتروني المعتمدة</a></div></div></div></footer>`;

export default UnitDetailPage;
