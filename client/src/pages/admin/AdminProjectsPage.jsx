import { useEffect, useRef } from 'react';

/**
 * AdminProjectsPage
 * Auto-generated from Stitch HTML design — preserves exact Tailwind classes & layout
 */
const AdminProjectsPage = () => {
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

const html = `<aside className="fixed right-0 top-0 h-full w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between select-none"><div className="flex flex-col flex-1 overflow-hidden"><div className="p-space-lg flex items-center gap-space-sm bg-surface-container-low"><div className="w-11 h-11 rounded-lg bg-primary-container text-secondary-fixed flex items-center justify-center shadow-md flex-shrink-0"><span className="material-symbols-outlined text-[24px]">account_balance</span></div><div className="flex flex-col min-w-0"><span className="font-title-md text-title-md text-primary font-bold truncate leading-tight">مستقبل الفراعنة</span><span className="font-label-sm text-label-sm text-secondary truncate mt-0.5">للاستثمار والتطوير العقاري</span><span className="font-label-sm text-label-sm text-on-primary-container bg-surface-container-high px-space-xs py-0.5 rounded text-center mt-1.5 self-start font-semibold">الإدارة والتحكم العليا</span></div></div><nav className="flex-1 px-space-md py-space-sm overflow-y-auto flex flex-col gap-1" data-active-classes="bg-primary-container text-on-primary font-semibold shadow-sm"><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="overview" href="#"><span className="material-symbols-outlined text-[20px]">dashboard</span><span className="font-title-md text-title-md">نظرة عامة</span></a><a aria-current="page" className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg transition-colors bg-primary-container text-on-primary font-semibold shadow-sm" data-path="projects-management" href="#"><span className="material-symbols-outlined text-[20px]">apartment</span><span className="font-title-md text-title-md">المشروعات</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="buildings-floors" href="#"><span className="material-symbols-outlined text-[20px]">domain</span><span className="font-title-md text-title-md">المباني والأدوار</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="units-inventory" href="#"><span className="material-symbols-outlined text-[20px]">holiday_village</span><span className="font-title-md text-title-md">الوحدات</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="reservations" href="#"><span className="material-symbols-outlined text-[20px]">event_available</span><span className="font-title-md text-title-md">الحجوزات</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="clients-investors" href="#"><span className="material-symbols-outlined text-[20px]">groups</span><span className="font-title-md text-title-md">العملاء والمستثمرون</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="sales-crm" href="#"><span className="material-symbols-outlined text-[20px]">badge</span><span className="font-title-md text-title-md">موظفو المبيعات</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="lead-distribution" href="#"><span className="material-symbols-outlined text-[20px]">hub</span><span className="font-title-md text-title-md">توزيع العملاء</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="assignment-logs" href="#"><span className="material-symbols-outlined text-[20px]">swap_horiz</span><span className="font-title-md text-title-md">سجل التعيينات</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="reports" href="#"><span className="material-symbols-outlined text-[20px]">monitoring</span><span className="font-title-md text-title-md">التقارير والتحليلات</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="audit-log" href="#"><span className="material-symbols-outlined text-[20px]">policy</span><span className="font-title-md text-title-md">سجل العمليات والأمان</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="settings" href="#"><span className="material-symbols-outlined text-[20px]">settings</span><span className="font-title-md text-title-md">الإعدادات</span></a></nav></div><div className="p-space-md bg-surface-container-high/60 flex items-center justify-between gap-space-xs"><div className="flex items-center gap-space-xs min-w-0"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div className="flex flex-col min-w-0"><span className="font-label-md text-label-md text-on-surface font-semibold truncate">مدير النظام التنفيذي</span><span className="font-label-sm text-label-sm text-on-surface-variant truncate">مشرف الصلاحيات العامة</span></div></div><button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button></div></aside><main className="relative pt-16 w-full px-space-lg py-space-lg bg-surface"><div className="flex flex-col w-full gap-space-lg select-none">
<!-- Top Command & Action Bar -->
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden">
<div className="absolute -left-12 -top-12 w-48 h-48 bg-secondary-fixed/20 rounded-full blur-2xl pointer-events-none"></div>
<div className="flex items-start gap-space-md min-w-0 z-10">
<div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-secondary-fixed shadow-md flex-shrink-0">
<span className="material-symbols-outlined text-[28px]">apartment</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-label-sm text-label-sm text-secondary bg-surface-container-high px-2 py-0.5 rounded font-semibold tracking-wider">سجل المحافظ العقارية</span>
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">تحديث فوري للسوق</span>
</div>
<h1 className="font-headline-md text-headline-md text-primary font-bold tracking-tight mt-0.5">إدارة المشروعات والمحافظ الاستثمارية</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
          متابعة وإدارة الأصول العقارية المركزية، الأبراج السكنية والتجارية، وتوزيع الوحدات الإنشائية ضمن معايير التطوير الفاخر.
        </p>
</div>
</div>
<!-- Global CTA Buttons -->
<div className="flex items-center flex-wrap gap-space-sm z-10 self-start lg:self-center">
<button className="h-11 px-space-md rounded-lg bg-surface-container-high text-primary hover:bg-surface-container font-title-md text-title-md flex items-center gap-space-xs transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">print</span>
<span>طباعة الجرد العقاري</span>
</button>
<button className="h-11 px-space-md rounded-lg bg-surface-container-low text-primary hover:bg-surface-container-high font-title-md text-title-md flex items-center gap-space-xs transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">download</span>
<span>تصدير الكتالوج العام</span>
</button>
<button className="h-11 px-space-lg rounded-lg bg-primary hover:bg-primary-container text-on-primary font-title-md text-title-md flex items-center gap-space-xs transition-all shadow-md group" onclick="openProjectModal()" type="button">
<span className="material-symbols-outlined text-[20px] text-secondary-fixed group-hover:rotate-90 transition-transform">add_circle</span>
<span className="font-semibold">إضافة مشروع جديد</span>
</button>
</div>
</div>
<!-- Portfolio Metric Indicators (Bento Grid) -->
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
<!-- Card 1 -->
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant font-medium">إجمالي المشروعات الاستثمارية</span>
<div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
</div>
</div>
<div className="mt-space-md flex items-baseline gap-space-xs">
<span className="font-display-lg text-headline-lg font-bold text-primary font-financial-numeric">14</span>
<span className="font-title-md text-title-md text-on-surface-variant font-medium">مشروعاً معتمداً</span>
</div>
<div className="mt-space-md flex items-center justify-between pt-space-sm bg-surface-container-low/60 -mx-space-lg -mb-space-lg px-space-lg py-2">
<span className="font-label-sm text-label-sm text-on-surface-variant">قيمة الأصول الرأسمالية</span>
<span className="font-financial-numeric text-label-md text-secondary font-bold">42.8 مليار ج.م</span>
</div>
</div>
<!-- Card 2 -->
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant font-medium">قيد التنفيذ والبيع الفوري</span>
<div className="w-10 h-10 rounded-lg bg-secondary-fixed/40 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">construction</span>
</div>
</div>
<div className="mt-space-md flex items-baseline gap-space-xs">
<span className="font-display-lg text-headline-lg font-bold text-primary font-financial-numeric">9</span>
<span className="font-title-md text-title-md text-secondary font-semibold">مشروعات نشطة</span>
</div>
<div className="mt-space-md flex items-center justify-between pt-space-sm bg-surface-container-low/60 -mx-space-lg -mb-space-lg px-space-lg py-2">
<span className="font-label-sm text-label-sm text-on-surface-variant">المناطق: العاصمة، التجمع، زايد، الساحل</span>
<span className="font-label-sm text-label-sm text-primary font-bold">64.2% المحفظة</span>
</div>
</div>
<!-- Card 3 -->
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant font-medium">طروحات قادمة (تراخيص)</span>
<div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-[20px]">upcoming</span>
</div>
</div>
<div className="mt-space-md flex items-baseline gap-space-xs">
<span className="font-display-lg text-headline-lg font-bold text-primary font-financial-numeric">3</span>
<span className="font-title-md text-title-md text-on-surface-variant font-medium">مشروعات مرتقبة</span>
</div>
<div className="mt-space-md flex items-center justify-between pt-space-sm bg-surface-container-low/60 -mx-space-lg -mb-space-lg px-space-lg py-2">
<span className="font-label-sm text-label-sm text-on-surface-variant">تلال إيزيس 2، مارينا ريزيدنس</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">طرح Q4 2024</span>
</div>
</div>
<!-- Card 4 -->
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant font-medium">مكتملة ومسلمة بالكامل</span>
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">verified</span>
</div>
</div>
<div className="mt-space-md flex items-baseline gap-space-xs">
<span className="font-display-lg text-headline-lg font-bold text-primary font-financial-numeric">2</span>
<span className="font-title-md text-title-md text-on-surface-variant font-medium">تسليم تعاقدي 100%</span>
</div>
<div className="mt-space-md flex items-center justify-between pt-space-sm bg-surface-container-low/60 -mx-space-lg -mb-space-lg px-space-lg py-2">
<span className="font-label-sm text-label-sm text-on-surface-variant">الفراعنة جاردنز، الكرنك بلازا</span>
<span className="font-label-sm text-label-sm text-primary font-bold">صفر شكاوى</span>
</div>
</div>
</div>
<!-- Filtration & Search Controls Bar -->
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
<!-- Immediate Search Input -->
<div className="relative flex-1 max-w-lg">
<span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
<input className="w-full h-11 pr-11 pl-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-all" id="projectSearchInput" onkeyup="filterProjectTable()" placeholder="ابحث باسم المشروع، الكود الإنشائي (مثل FP-101)، أو المنطقة الجغرافية..." type="text"/>
</div>
<!-- Filter Dropdowns & Sorting -->
<div className="flex flex-wrap items-center gap-space-sm">
<!-- Geographic Region Filter -->
<div className="flex items-center gap-1.5 bg-surface-container-low px-space-sm rounded-lg h-11">
<span className="material-symbols-outlined text-secondary text-[18px]">location_on</span>
<select className="bg-transparent text-on-surface font-title-md text-title-md focus:outline-none cursor-pointer" id="regionFilter" onchange="filterProjectTable()">
<option value="all">كافة مناطق أسوان</option>
<option value="أسوان الجديدة">أسوان الجديدة (الحي الثاني - المقر)</option>
<option value="الحي الأول">أسوان الجديدة - الحي الأول</option>
<option value="الحي الثالث">أسوان الجديدة - الحي الثالث</option>
<option value="كورنيش النيل">كورنيش النيل بأسوان</option>
</select>
</div>
<!-- Project Status Filter -->
<div className="flex items-center gap-1.5 bg-surface-container-low px-space-sm rounded-lg h-11">
<span className="material-symbols-outlined text-secondary text-[18px]">tune</span>
<select className="bg-transparent text-on-surface font-title-md text-title-md focus:outline-none cursor-pointer" id="statusFilter" onchange="filterProjectTable()">
<option value="all">كافة الحالات الإنشائية</option>
<option value="قيد التنفيذ والبيع">قيد التنفيذ والبيع</option>
<option value="طرح حصري قادم">طرح حصري قادم</option>
<option value="مكتمل ومسلم">مكتمل ومسلم بالكامل</option>
<option value="متوقف مؤقتاً">متوقف مؤقتاً</option>
</select>
</div>
<!-- Sorter -->
<div className="flex items-center gap-1.5 bg-surface-container-low px-space-sm rounded-lg h-11">
<span className="material-symbols-outlined text-on-surface-variant text-[18px]">sort</span>
<select className="bg-transparent text-on-surface font-title-md text-title-md focus:outline-none cursor-pointer">
<option>الأحدث إطلاقاً</option>
<option>الأعلى إنجازاً</option>
<option>الأكثر إجمالي وحدات</option>
<option>الأعلى قيمة تسويقية</option>
</select>
</div>
<!-- View Switcher -->
<div className="flex items-center bg-surface-container-low p-1 rounded-lg">
<button className="w-9 h-9 rounded bg-surface-container-lowest text-primary flex items-center justify-center shadow-xs" type="button">
<span className="material-symbols-outlined text-[20px]">table_rows</span>
</button>
<button className="w-9 h-9 rounded text-on-surface-variant hover:text-primary flex items-center justify-center" type="button">
<span className="material-symbols-outlined text-[20px]">grid_view</span>
</button>
</div>
</div>
</div>
<!-- Enterprise Projects Table Layout -->
<div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
<div className="overflow-x-auto w-full">
<table className="w-full text-right border-collapse" id="projectsMasterTable">
<thead>
<tr className="bg-surface-container-low/70 text-on-surface-variant font-label-md text-label-md tracking-wide">
<th className="py-space-md px-space-lg font-semibold min-w-[280px]">المشروع والكود التعريفي</th>
<th className="py-space-md px-space-md font-semibold min-w-[170px]">الموقع الاستراتيجي</th>
<th className="py-space-md px-space-sm font-semibold text-center min-w-[100px]">المباني</th>
<th className="py-space-md px-space-sm font-semibold text-center min-w-[120px]">إجمالي الوحدات</th>
<th className="py-space-md px-space-md font-semibold min-w-[200px]">الوحدات المتاحة ونسبة الإشغال</th>
<th className="py-space-md px-space-sm font-semibold text-center min-w-[90px]">المحجوزة</th>
<th className="py-space-md px-space-sm font-semibold text-center min-w-[90px]">المباعة</th>
<th className="py-space-md px-space-md font-semibold text-center min-w-[130px]">حالة المشروع</th>
<th className="py-space-md px-space-lg font-semibold text-left min-w-[130px]">الإجراءات</th>
</tr>
</thead>
<tbody className="divide-y-0 text-body-md font-body-md" id="projectsTableBody">
<!-- Row 1: Pharaohs Plaza -->
<tr className="hover:bg-surface-container-low/40 transition-colors group">
<td className="py-space-md px-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-14 h-14 rounded-lg overflow-hidden bg-surface-container-high flex-shrink-0 relative shadow-sm">
<div className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-300" data-alt="Modern architectural rendering of Pharaohs Plaza luxury residential and commercial high-rise towers in the new administrative capital Cairo with warm gold sunset lighting, marble podium, and expansive reflecting pools." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCl74dHkgX_KNWp9V9K32XbXUEr6ugHkIiwhlOCvgx9fWkx9i0p8oodq539grfx8PvYNgIhBywx8wJoIognPIWk4D9a-mDcJwQbArFItY_DXJNPIaxD6CQuhzfUN-eeKyB4ur7ErKjU1pPdpEcnLieHAw5lbH9NO_qKhdIHg8MRI2ikYsz4GGq-LbJ3Jy_vBMTav6Tc6rWE8CZREEkDTmESmsiOhDh06H-BYHghlaf0SLhy3i3zCuUOxA')"></div>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-lg text-title-lg font-bold text-primary truncate">كمبوند الفراعنة بلازا</span>
<div className="flex items-center gap-2 mt-0.5">
<span className="font-label-sm text-label-sm text-secondary font-mono tracking-wider">FP-101</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">سكني فندقي / تجاري</span>
</div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary font-semibold">العاصمة الإدارية</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">منطقة الأعمال المركزية CBD</span>
</div>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-primary">6</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">أبراج</span>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-primary">520</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">وحدة معتمدة</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col gap-1.5">
<div className="flex items-center justify-between font-label-md text-label-md">
<span className="font-bold text-primary font-financial-numeric">114 <span className="text-on-surface-variant font-normal">متبقية</span></span>
<span className="text-secondary font-bold font-financial-numeric">78% مباع</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-primary rounded-full" style="width: 78%"></div>
</div>
</div>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-secondary">38</span>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-primary">368</span>
</td>
<td className="py-space-md px-space-md text-center">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-medium">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
                قيد التنفيذ والبيع
              </span>
</td>
<td className="py-space-md px-space-lg text-left">
<div className="flex items-center justify-end gap-1">
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="معاينة المخطط العام" type="button">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-colors" onclick="openProjectModal('كمبوند الفراعنة بلازا', 'FP-101')" title="تعديل المشروع" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="إدارة الوحدات والأدوار" type="button">
<span className="material-symbols-outlined text-[18px]">domain</span>
</button>
</div>
</td>
</tr>
<!-- Row 2: Isis Dunes / Telal Isis -->
<tr className="hover:bg-surface-container-low/40 transition-colors group bg-surface-container-low/20">
<td className="py-space-md px-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-14 h-14 rounded-lg overflow-hidden bg-surface-container-high flex-shrink-0 relative shadow-sm">
<div className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-300" data-alt="Luxury architectural villas nestled in lush manicured rolling landscapes of New Cairo with minimalist white limestone facades, floor-to-ceiling panoramic glass, infinity private pools, and subtle ambient warm lighting." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCC2RMz5jlFfiO5bVO9VWKcHQqCpqxFYqYeprVHpKa_GKBkcyTYFaWx32G5960KajIPB25u8LBN-3v5gtzqXcY9gDtiwVDjSwwHIQCn4FLR3xjcJiP3FKtsWOPVmMSgaz_oWOU3eRPLDRc7fEGgbICb8821yR94FOrBT5dlCiC4xUS-pueU7Yjy7dhG57ixxTDy12UaOIL5mxIRv9B-Bz0uevVIOZecvZ3SROSHGyeBORXp8_9JiTcrog')"></div>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-lg text-title-lg font-bold text-primary truncate">تلال إيزيس ريزيدنس (م2)</span>
<div className="flex items-center gap-2 mt-0.5">
<span className="font-label-sm text-label-sm text-secondary font-mono tracking-wider">TI-204</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">فيلات وتوين هاوس</span>
</div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary font-semibold">أسوان الجديدة</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">الحي الثاني - المقر الرئيسي</span>
</div>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-primary">18</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">مجمع فيلات</span>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-primary">180</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">وحدة معتمدة</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col gap-1.5">
<div className="flex items-center justify-between font-label-md text-label-md">
<span className="font-bold text-primary font-financial-numeric">180 <span className="text-on-surface-variant font-normal">قيد الطرح</span></span>
<span className="text-secondary font-bold font-financial-numeric">0% مباع</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-secondary-fixed-dim rounded-full" style="width: 4%"></div>
</div>
</div>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-secondary">24</span>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-primary">0</span>
</td>
<td className="py-space-md px-space-md text-center">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed font-label-md text-label-md font-medium">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
                طرح حصري قادم
              </span>
</td>
<td className="py-space-md px-space-lg text-left">
<div className="flex items-center justify-end gap-1">
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="معاينة المخطط العام" type="button">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-colors" onclick="openProjectModal('تلال إيزيس ريزيدنس (م2)', 'TI-204')" title="تعديل المشروع" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="إدارة الوحدات والأدوار" type="button">
<span className="material-symbols-outlined text-[18px]">domain</span>
</button>
</div>
</td>
</tr>
<!-- Row 3: Marina Mediterranean North Coast -->
<tr className="hover:bg-surface-container-low/40 transition-colors group">
<td className="py-space-md px-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-14 h-14 rounded-lg overflow-hidden bg-surface-container-high flex-shrink-0 relative shadow-sm">
<div className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-300" data-alt="Ultra-luxury Mediterranean beachfront resort in Ras El Hekma with modern organic stepped terraces, crystal blue lagoons, private yacht docks, and fine white sand architecture under midday sun." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQCNVIMrlvUJSrtpAsXlvPODV9XlSdyY3gi1Sn36vcj4fRNFFCDmyGAX_XqVbXxnvrGSDXB2DvoDHoeXptlFZtQfKbeF1NGelfv0eAjoY7lBpMa_3NqJd0qLtny_pbh4OoV2YcIf2wt_3hJtOyD62UtW6tKOqwxF_ZaS_-uqoVhXKWnYdaNrGH70g2MjLvOvLxmoufQnew8oJEnftbJTxh-GOYz_fNfarORMuljwIfHjpraBLyb6VCIQ')"></div>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-lg text-title-lg font-bold text-primary truncate">منتجع مارينا ريزيدنس الفاخر</span>
<div className="flex items-center gap-2 mt-0.5">
<span className="font-label-sm text-label-sm text-secondary font-mono tracking-wider">MR-308</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">شاليهات وشقق شاطئية</span>
</div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary font-semibold">الساحل الشمالي</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">خليج رأس الحكمة - كم 192</span>
</div>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-primary">12</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">مبنى ساحلي</span>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-primary">340</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">وحدة معتمدة</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col gap-1.5">
<div className="flex items-center justify-between font-label-md text-label-md">
<span className="font-bold text-primary font-financial-numeric">45 <span className="text-on-surface-variant font-normal">متبقية</span></span>
<span className="text-secondary font-bold font-financial-numeric">86% مباع</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-primary rounded-full" style="width: 86%"></div>
</div>
</div>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-secondary">19</span>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-primary">276</span>
</td>
<td className="py-space-md px-space-md text-center">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-medium">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
                قيد التنفيذ والبيع
              </span>
</td>
<td className="py-space-md px-space-lg text-left">
<div className="flex items-center justify-end gap-1">
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="معاينة المخطط العام" type="button">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-colors" onclick="openProjectModal('منتجع مارينا ريزيدنس الفاخر', 'MR-308')" title="تعديل المشروع" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="إدارة الوحدات والأدوار" type="button">
<span className="material-symbols-outlined text-[18px]">domain</span>
</button>
</div>
</td>
</tr>
<!-- Row 4: Zayed Sky Towers -->
<tr className="hover:bg-surface-container-low/40 transition-colors group">
<td className="py-space-md px-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-14 h-14 rounded-lg overflow-hidden bg-surface-container-high flex-shrink-0 relative shadow-sm">
<div className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-300" data-alt="Sleek glass executive corporate headquarters and branded residences in Sheikh Zayed City featuring architectural cantilever balconies, polished granite plazas, and royal brass accents." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAliFHJ4QLIgBR-mTowX-q2JVgVt4cxM8m2rar0-1DmdAN2z4eIbvse-Xv7UC0Vjif534PHGafOOQjry6LEIttXUSJuDHFNe8anbtM3g0oxinQ0e-NFXnQXpyDUFXMaSk45qXORygrPuvu-Qzmo9bNa8kWxRLnlDzu_20PNNkRaQ-isg7Td8sukM0PAcir2YM_GXyyVTeptUKysAPe8ETzqMOxJlFsoPag-Skg_OZ1mYVPnn9q3_G3mgw')"></div>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-lg text-title-lg font-bold text-primary truncate">زايد تاورز الفاخرة</span>
<div className="flex items-center gap-2 mt-0.5">
<span className="font-label-sm text-label-sm text-secondary font-mono tracking-wider">ZT-402</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">مكاتب إدارية وتجارية</span>
</div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary font-semibold">الشيخ زايد</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">محور 26 يوليو - مدخل 2</span>
</div>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-primary">3</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">أبراج إدارية</span>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-primary">210</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">وحدة معتمدة</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col gap-1.5">
<div className="flex items-center justify-between font-label-md text-label-md">
<span className="font-bold text-primary font-financial-numeric">28 <span className="text-on-surface-variant font-normal">متبقية</span></span>
<span className="text-secondary font-bold font-financial-numeric">85% مباع</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-primary rounded-full" style="width: 85%"></div>
</div>
</div>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-secondary">12</span>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-primary">170</span>
</td>
<td className="py-space-md px-space-md text-center">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-medium">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
                قيد التنفيذ والبيع
              </span>
</td>
<td className="py-space-md px-space-lg text-left">
<div className="flex items-center justify-end gap-1">
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="معاينة المخطط العام" type="button">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-colors" onclick="openProjectModal('زايد تاورز الفاخرة', 'ZT-402')" title="تعديل المشروع" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="إدارة الوحدات والأدوار" type="button">
<span className="material-symbols-outlined text-[18px]">domain</span>
</button>
</div>
</td>
</tr>
<!-- Row 5: Karnak Plaza (Completed) -->
<tr className="hover:bg-surface-container-low/40 transition-colors group">
<td className="py-space-md px-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-14 h-14 rounded-lg overflow-hidden bg-surface-container-high flex-shrink-0 relative shadow-sm">
<div className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-300" data-alt="Completed residential community Karnak Plaza in Cairo with stone porticos, symmetrical water fountains, manicured desert gardens, and contemporary classical Egyptian architectural touches." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDeo6XuV4SfTHkhA-gurjCkxXjJD50QpQA4JmJKEr-P1QQsT9u9ylCnaZiqCHL6mIk2X9nhdor9_7aVV-sJogObrIz9tDadAJ3Npec9qPTRJ5VpA9V44CFnffaZp-NLQMR3FNbLAHc974TpbW0mqvg4-sSPgPNLJfA--EL4vBwtawecGsXwffmFlpK9sEWdd49OFzvV96wG4UCN16zlAzHQhPtIvC6T23Xqv_0iacVmeqv70cqj3J0Tqw')"></div>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-lg text-title-lg font-bold text-primary truncate">الكرنك بلازا ريزيدنس</span>
<div className="flex items-center gap-2 mt-0.5">
<span className="font-label-sm text-label-sm text-secondary font-mono tracking-wider">KP-088</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">سكني عائلي فاخر</span>
</div>
</div>
</div>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary font-semibold">أسوان الجديدة</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">الحي الأول المتميز</span>
</div>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-primary">8</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">عمارات</span>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-primary">160</span>
<span className="font-label-sm text-label-sm text-on-surface-variant block">وحدة معتمدة</span>
</td>
<td className="py-space-md px-space-md">
<div className="flex flex-col gap-1.5">
<div className="flex items-center justify-between font-label-md text-label-md">
<span className="font-bold text-primary font-financial-numeric">0 <span className="text-on-surface-variant font-normal">متبقية</span></span>
<span className="text-secondary font-bold font-financial-numeric">100% مباع</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-primary rounded-full" style="width: 100%"></div>
</div>
</div>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-secondary">0</span>
</td>
<td className="py-space-md px-space-sm text-center">
<span className="font-financial-numeric text-title-md font-bold text-primary">160</span>
</td>
<td className="py-space-md px-space-md text-center">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-medium">
<span className="w-2 h-2 rounded-full bg-outline"></span>
                مكتمل ومسلم
              </span>
</td>
<td className="py-space-md px-space-lg text-left">
<div className="flex items-center justify-end gap-1">
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="معاينة المخطط العام" type="button">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-colors" onclick="openProjectModal('الكرنك بلازا ريزيدنس', 'KP-088')" title="تعديل المشروع" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" title="إدارة الوحدات والأدوار" type="button">
<span className="material-symbols-outlined text-[18px]">domain</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Table Footer / Pagination -->
<div className="p-space-md bg-surface-container-low/60 flex flex-col sm:flex-row items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
<span>عرض 5 من إجمالي 14 مشروعاً استثمارياً</span>
</div>
<div className="flex items-center gap-1">
<button className="w-9 h-9 rounded-lg bg-surface-container-lowest text-on-surface flex items-center justify-center hover:bg-surface-container shadow-xs" type="button">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
<button className="w-9 h-9 rounded-lg bg-primary text-on-primary font-bold text-label-md flex items-center justify-center" type="button">1</button>
<button className="w-9 h-9 rounded-lg bg-surface-container-lowest text-on-surface font-semibold text-label-md flex items-center justify-center hover:bg-surface-container shadow-xs" type="button">2</button>
<button className="w-9 h-9 rounded-lg bg-surface-container-lowest text-on-surface font-semibold text-label-md flex items-center justify-center hover:bg-surface-container shadow-xs" type="button">3</button>
<button className="w-9 h-9 rounded-lg bg-surface-container-lowest text-on-surface flex items-center justify-center hover:bg-surface-container shadow-xs" type="button">
<span className="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
</div>
</div>
</div>
<!-- Interactive Project Creation & Editing Modal (Drawer / Overlay) -->
<div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm hidden items-center justify-center p-space-md sm:p-space-lg overflow-y-auto" id="projectModal">
<div className="w-full max-w-4xl bg-surface-container-lowest rounded-xl shadow-xl flex flex-col overflow-hidden my-auto max-h-[942px]">
<!-- Modal Header -->
<div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-secondary-fixed">
<span className="material-symbols-outlined text-[22px]">domain_add</span>
</div>
<div className="flex flex-col">
<h2 className="font-title-lg text-title-lg font-bold text-primary" id="modalTitle">إضافة مشروع استثماري جديد</h2>
<span className="font-label-sm text-label-sm text-on-surface-variant">تكويد الأصول العقارية المركزية وفق المعايير الإنشائية القياسية</span>
</div>
</div>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" onclick="closeProjectModal()" type="button">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<!-- Modal Body (Scrollable Form) -->
<form className="p-space-lg overflow-y-auto flex flex-col gap-space-lg" id="projectForm" onsubmit="event.preventDefault(); saveProject();">
<!-- Intelligent Notice Banner -->
<div className="p-space-md rounded-xl bg-surface-container-high/60 flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[22px] flex-shrink-0 mt-0.5">info</span>
<p className="font-body-md text-body-md text-on-surface">
<strong className="font-semibold text-primary">ملاحظة هندسية مؤتمتة:</strong> يتم احتساب أعداد الوحدات والمساحات التراكمية ونسب الإشغال بصورة آلية وفورية بمجرد ربط الأبراج والمباني عبر صفحة "المباني والأدوار"، لضمان تكامل القيود المحاسبية ومنع التضارب.
          </p>
</div>
<!-- Section 1: Basic Information -->
<div className="flex flex-col gap-space-sm">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-title-md text-title-md font-bold text-primary">البيانات الإنشائية والتعريفية</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div>
<label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">اسم المشروع بالعربية *</label>
<input className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary transition-all" id="inputProjNameAr" placeholder="مثال: أبراج النيل الكبرى" required="" type="text"/>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">اسم المشروع بالإنجليزية (Commercial Name)</label>
<input className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary transition-all text-left" dir="ltr" id="inputProjNameEn" placeholder="Grand Nile Towers" type="text"/>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">الكود المرجعي للمشروع (ERP Code) *</label>
<input className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md uppercase font-mono focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary transition-all text-left" dir="ltr" id="inputProjCode" placeholder="GN-500" required="" type="text"/>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mt-space-xs">
<div>
<label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">تصنيف التطوير العقاري</label>
<select className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all" id="inputProjCategory">
<option>سكني فاخر متكامل الخدمات</option>
<option>إداري ومقرات شركات كبرى</option>
<option>تجاري وترفيهي (Mall / Hub)</option>
<option>منتجع ساحلي وضيافة فندقية</option>
<option>متعدد الاستخدامات (Mixed-Use Complex)</option>
</select>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">مساحة الأرض الإجمالية (م² / فدان)</label>
<input className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary transition-all" placeholder="مثال: 45 فدان (189,000 م²)" type="text"/>
</div>
</div>
<div className="mt-space-xs">
<label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">الوصف المعماري التعريفي للمشروع</label>
<textarea className="w-full p-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary transition-all resize-none" placeholder="موجز فلسفة التصميم المعماري، الرؤية الهندسية، واستهداف شرائح المستثمرين والعملاء..." rows="3"></textarea>
</div>
</div>
<!-- Section 2: Location & Geographic Coordinates -->
<div className="flex flex-col gap-space-sm pt-space-xs">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-title-md text-title-md font-bold text-primary">الموقع الجغرافي والإحداثيات</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div>
<label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">المحافظة / المدينة *</label>
<select className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all" id="inputProjCity">
<option>أسوان الجديدة - الحي الثاني</option>
<option>أسوان الجديدة - الحي الأول</option>
<option>أسوان الجديدة - الحي الثالث</option>
<option>كورنيش النيل بأسوان</option>
<option>حي اللوتس وزهرة النيل</option>
</select>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">المنطقة والحي الاستراتيجي</label>
<input className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary transition-all" placeholder="مثال: الحي المالي - القطعة 14" type="text"/>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">الإحداثيات الجغرافية (Lat, Lng)</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px]">my_location</span>
<input className="w-full h-11 pr-3.5 pl-10 rounded-lg bg-surface-container-low text-on-surface font-mono font-body-md text-body-md text-left focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary transition-all" dir="ltr" placeholder="30.0131, 31.7089" type="text"/>
</div>
</div>
</div>
</div>
<!-- Section 3: Media & Architectural Masterplan Documents -->
<div className="flex flex-col gap-space-sm pt-space-xs">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-title-md text-title-md font-bold text-primary">الوسائط والمخطط العام (Master Plan)</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<!-- Cover Upload Area -->
<div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-colors group">
<span className="material-symbols-outlined text-[36px] text-secondary group-hover:scale-110 transition-transform">add_photo_alternate</span>
<span className="font-title-md text-title-md font-semibold text-primary mt-2">الصورة الرئيسية للواجهة المعمارية</span>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">PNG, JPG بحد أقصى 15 ميجابايت (دقة 4K موصى بها)</span>
</div>
<!-- PDF Master Plan Upload -->
<div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-colors group">
<span className="material-symbols-outlined text-[36px] text-primary group-hover:scale-110 transition-transform">picture_as_pdf</span>
<span className="font-title-md text-title-md font-semibold text-primary mt-2">رفع المخطط الهندسي العام (PDF Master Plan)</span>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">يتضمن توزيع قطع الأراضي ومحاور الحركة والمرافق</span>
</div>
</div>
</div>
<!-- Section 4: Project Amenities & Smart Tags -->
<div className="flex flex-col gap-space-sm pt-space-xs">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-title-md text-title-md font-bold text-primary">المرافق والتجهيزات الفاخرة المعتمدة</span>
</div>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
<label className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-2 cursor-pointer hover:bg-surface-container-high transition-colors">
<input checked="" className="accent-primary rounded w-4 h-4" type="checkbox"/>
<span className="font-label-md text-label-md text-on-surface">أمن وذكاء 24/7</span>
</label>
<label className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-2 cursor-pointer hover:bg-surface-container-high transition-colors">
<input checked="" className="accent-primary rounded w-4 h-4" type="checkbox"/>
<span className="font-label-md text-label-md text-on-surface">مسبح معلق</span>
</label>
<label className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-2 cursor-pointer hover:bg-surface-container-high transition-colors">
<input className="accent-primary rounded w-4 h-4" type="checkbox"/>
<span className="font-label-md text-label-md text-on-surface">مهبط طائرات</span>
</label>
<label className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-2 cursor-pointer hover:bg-surface-container-high transition-colors">
<input checked="" className="accent-primary rounded w-4 h-4" type="checkbox"/>
<span className="font-label-md text-label-md text-on-surface">شواحن EV</span>
</label>
<label className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-2 cursor-pointer hover:bg-surface-container-high transition-colors">
<input checked="" className="accent-primary rounded w-4 h-4" type="checkbox"/>
<span className="font-label-md text-label-md text-on-surface">جراجات هيدروليكية</span>
</label>
<label className="p-space-sm rounded-lg bg-surface-container-low flex items-center gap-2 cursor-pointer hover:bg-surface-container-high transition-colors">
<input className="accent-primary rounded w-4 h-4" type="checkbox"/>
<span className="font-label-md text-label-md text-on-surface">شهادة LEED خضراء</span>
</label>
</div>
</div>
<!-- Section 5: Timeline & Sales Launch -->
<div className="flex flex-col gap-space-sm pt-space-xs">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-title-md text-title-md font-bold text-primary">الجدول الزمني ومراحل الإطلاق</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div>
<label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">حالة المشروع الحالية</label>
<select className="w-full h-11 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary transition-all" id="inputProjStatus">
<option value="قيد التنفيذ والبيع">قيد التنفيذ والبيع</option>
<option value="طرح حصري قادم">طرح حصري قادم</option>
<option value="مكتمل ومسلم">مكتمل ومسلم بالكامل</option>
<option value="متوقف مؤقتاً">متوقف مؤقتاً للتراخيص</option>
</select>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">تاريخ الإطلاق الرسمي (Launch Date)</label>
<input className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary transition-all" type="date" value="2024-11-01"/>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5">تاريخ التسليم التعاقدي المتوقع (Handover)</label>
<input className="w-full h-11 px-3.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary transition-all" type="date" value="2027-06-30"/>
</div>
</div>
</div>
<!-- Modal Actions Footer -->
<div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-md mt-space-md bg-surface-container-low/50 -mx-space-lg -mb-space-lg p-space-lg">
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[18px] text-secondary">verified_user</span>
<span>سيتم توثيق كافة بيانات الاعتماد في سجل التدقيق والأمان المؤسسي فوراً.</span>
</div>
<div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
<button className="h-11 px-space-lg rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-title-md text-title-md transition-colors shadow-xs" onclick="closeProjectModal()" type="button">
              إلغاء الأمر
            </button>
<button className="h-11 px-space-lg rounded-lg bg-surface-container text-primary hover:bg-surface-container-high font-title-md text-title-md transition-colors" onclick="saveAsDraft()" type="button">
              حفظ كمسودة غير منشورة
            </button>
<button className="h-11 px-space-xl rounded-lg bg-primary hover:bg-primary-container text-on-primary font-title-md text-title-md font-bold transition-all shadow-md flex items-center gap-2" type="submit">
<span className="material-symbols-outlined text-[18px] text-secondary-fixed">save</span>
<span>حفظ ونشر المشروع</span>
</button>
</div>
</div>
</form>
</div>
</div>
</div>
<script>
  function openProjectModal(name, code) {
    const modal = document.getElementById('projectModal');
    const title = document.getElementById('modalTitle');
    const inputName = document.getElementById('inputProjNameAr');
    const inputCode = document.getElementById('inputProjCode');
    
    if (name && code) {
      title.innerText = 'تعديل بيانات المشروع: ' + name;
      inputName.value = name;
      inputCode.value = code;
    } else {
      title.innerText = 'إضافة مشروع استثماري جديد';
      document.getElementById('projectForm').reset();
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }

  function saveProject() {
    const name = document.getElementById('inputProjNameAr').value;
    const code = document.getElementById('inputProjCode').value;
    alert('تم حفظ واعتماد بيانات المشروع بنجاح: ' + name + ' (' + code + ')');
    closeProjectModal();
  }

  function saveAsDraft() {
    alert('تم حفظ المسودة بنجاح في سجل المشروعات قيد المراجعة.');
    closeProjectModal();
  }

  function filterProjectTable() {
    const searchVal = document.getElementById('projectSearchInput').value.toLowerCase().trim();
    const regionVal = document.getElementById('regionFilter').value;
    const statusVal = document.getElementById('statusFilter').value;
    
    const rows = document.querySelectorAll('#projectsTableBody tr');
    
    rows.forEach(row => {
      const rowText = row.innerText.toLowerCase();
      const matchesSearch = !searchVal || rowText.includes(searchVal);
      const matchesRegion = (regionVal === 'all') || rowText.includes(regionVal.toLowerCase());
      const matchesStatus = (statusVal === 'all') || rowText.includes(statusVal.toLowerCase());
      
      if (matchesSearch && matchesRegion && matchesStatus) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  // Keyboard shortcut listener (ESC to close modal)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });
</script></main>`;

export default AdminProjectsPage;
