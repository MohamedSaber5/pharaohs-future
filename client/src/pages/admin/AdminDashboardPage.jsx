import { useEffect, useRef } from 'react';

/**
 * AdminDashboardPage
 * Auto-generated from Stitch HTML design — preserves exact Tailwind classes & layout
 */
const AdminDashboardPage = () => {
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

const html = `<aside className="fixed right-0 top-0 h-full w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between select-none"><div className="flex flex-col flex-1 overflow-hidden"><div className="p-space-lg flex items-center gap-space-sm bg-surface-container-low"><div className="w-11 h-11 rounded-lg bg-primary-container text-secondary-fixed flex items-center justify-center shadow-md flex-shrink-0"><span className="material-symbols-outlined text-[24px]">account_balance</span></div><div className="flex flex-col min-w-0"><span className="font-title-md text-title-md text-primary font-bold truncate leading-tight">مستقبل الفراعنة</span><span className="font-label-sm text-label-sm text-secondary truncate mt-0.5">للاستثمار والتطوير العقاري</span><span className="font-label-sm text-label-sm text-on-primary-container bg-surface-container-high px-space-xs py-0.5 rounded text-center mt-1.5 self-start font-semibold">الإدارة والتحكم العليا</span></div></div><nav className="flex-1 px-space-md py-space-sm overflow-y-auto flex flex-col gap-1" data-active-classes="bg-primary-container text-on-primary font-semibold shadow-sm"><a aria-current="page" className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg transition-colors bg-primary-container text-on-primary font-semibold shadow-sm" data-path="overview" href="#"><span className="material-symbols-outlined text-[20px]">dashboard</span><span className="font-title-md text-title-md">نظرة عامة</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="projects-management" href="#"><span className="material-symbols-outlined text-[20px]">apartment</span><span className="font-title-md text-title-md">المشروعات</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="buildings-floors" href="#"><span className="material-symbols-outlined text-[20px]">domain</span><span className="font-title-md text-title-md">المباني والأدوار</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="units-inventory" href="#"><span className="material-symbols-outlined text-[20px]">holiday_village</span><span className="font-title-md text-title-md">الوحدات</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="reservations" href="#"><span className="material-symbols-outlined text-[20px]">event_available</span><span className="font-title-md text-title-md">الحجوزات</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="clients-investors" href="#"><span className="material-symbols-outlined text-[20px]">groups</span><span className="font-title-md text-title-md">العملاء والمستثمرون</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="sales-crm" href="#"><span className="material-symbols-outlined text-[20px]">badge</span><span className="font-title-md text-title-md">موظفو المبيعات</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="lead-distribution" href="#"><span className="material-symbols-outlined text-[20px]">hub</span><span className="font-title-md text-title-md">توزيع العملاء</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="assignment-logs" href="#"><span className="material-symbols-outlined text-[20px]">swap_horiz</span><span className="font-title-md text-title-md">سجل التعيينات</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="reports" href="#"><span className="material-symbols-outlined text-[20px]">monitoring</span><span className="font-title-md text-title-md">التقارير والتحليلات</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="audit-log" href="#"><span className="material-symbols-outlined text-[20px]">policy</span><span className="font-title-md text-title-md">سجل العمليات والأمان</span></a><a className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" data-path="settings" href="#"><span className="material-symbols-outlined text-[20px]">settings</span><span className="font-title-md text-title-md">الإعدادات</span></a></nav></div><div className="p-space-md bg-surface-container-high/60 flex items-center justify-between gap-space-xs"><div className="flex items-center gap-space-xs min-w-0"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><div className="flex flex-col min-w-0"><span className="font-label-md text-label-md text-on-surface font-semibold truncate">مدير النظام التنفيذي</span><span className="font-label-sm text-label-sm text-on-surface-variant truncate">مشرف الصلاحيات العامة</span></div></div><button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button></div></aside><main className="relative pt-16 w-full px-space-lg py-space-lg bg-surface"><div className="flex flex-col w-full">
<!-- Top Command & Filter Deck -->
<div className="flex flex-col gap-space-lg mb-space-xl">
<!-- Header with Live Pulse and Primary Actions -->
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div className="flex flex-col">
<div className="flex items-center gap-space-sm mb-1">
<div className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></div>
<span className="font-label-sm text-label-sm text-secondary font-bold tracking-wider">نظام الإدارة التشغيلي المباشر</span>
<span className="text-outline-variant font-label-sm text-label-sm">•</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">آخر تحديث متزامن: منذ دقيقتين</span>
<span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded text-primary font-semibold">سجلات موثقة</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">لوحة التحكم الرئيسية والتحليلات التشغيلية</h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-1">
          رصد إجمالي المحفظة الاستثمارية، وتيرة التدفق النقدي، وأداء إغلاق الحجوزات التعاقدية لشركة مستقبل الفراعنة للتطوير العقاري.
        </p>
</div>
<div className="flex items-center gap-space-sm flex-wrap self-start lg:self-center">
<button className="h-11 px-space-md rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container text-body-md font-body-md font-semibold transition-all shadow-sm flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-[18px] text-secondary">file_download</span>
<span>تصدير Excel</span>
</button>
<button className="h-11 px-space-md rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container text-body-md font-body-md font-semibold transition-all shadow-sm flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-[18px] text-secondary">picture_as_pdf</span>
<span>تقرير PDF</span>
</button>
<button className="h-11 px-space-md rounded-lg bg-primary text-on-primary hover:bg-primary-container text-body-md font-body-md font-semibold transition-all shadow-md flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-[18px]">add_circle</span>
<span>حجز استثماري جديد</span>
</button>
</div>
</div>
<!-- Architectural Multi-Filter Surface -->
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col xl:flex-row gap-space-md items-stretch xl:items-center justify-between">
<div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg self-start">
<button className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold shadow-sm" type="button">آخر 30 يوماً</button>
<button className="px-space-md py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md" type="button">آخر 7 أيام</button>
<button className="px-space-md py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md" type="button">اليوم</button>
<button className="px-space-md py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md" type="button">مخصص</button>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm flex-1 xl:max-w-3xl">
<div className="flex flex-col">
<label className="font-label-sm text-label-sm text-on-surface-variant mb-1">المشروع المستهدف</label>
<div className="relative">
<select className="w-full h-10 pr-9 pl-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest transition-all">
<option>كافة المشروعات المعتمدة (06)</option>
<option>أبراج حورس الأيقونية - العاصمة</option>
<option>منتجع لوتس لاجون - البحر الأحمر</option>
<option>كمبوند الفراعنة جرينز - الشيخ زايد</option>
<option>تلال إيزيس الفاخرة - التجمع</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-secondary pointer-events-none">domain</span>
</div>
</div>
<div className="flex flex-col">
<label className="font-label-sm text-label-sm text-on-surface-variant mb-1">مستشار المبيعات</label>
<div className="relative">
<select className="w-full h-10 pr-9 pl-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest transition-all">
<option>كافة مستشاري المبيعات (24)</option>
<option>أ. كريم السيوفي (فريق النخبة)</option>
<option>د. شريف ممدوح (كبار العملاء UHNW)</option>
<option>أ. منى زهران (الاستثمار الدولي)</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-secondary pointer-events-none">badge</span>
</div>
</div>
<div className="flex flex-col">
<label className="font-label-sm text-label-sm text-on-surface-variant mb-1">حالة الحجز</label>
<div className="relative">
<select className="w-full h-10 pr-9 pl-4 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest transition-all">
<option>كافة حالات الحجز التشغيلية</option>
<option>مؤكد ومدفوع مقدماً</option>
<option>معلق قيد السداد والتحقق</option>
<option>مهلة قاربت الانتهاء</option>
<option>ملغي / مسترد</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-secondary pointer-events-none">filter_list</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-xs self-end xl:self-center">
<button className="h-10 w-10 flex items-center justify-center rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors" title="إعادة تعيين المرشحات" type="button">
<span className="material-symbols-outlined text-[20px]">restart_alt</span>
</button>
</div>
</div>
</div>
<!-- Operational Critical Alert Bar -->
<div className="mb-space-xl p-space-md rounded-xl bg-tertiary text-on-tertiary shadow-md flex flex-col md:flex-row items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md w-full md:w-auto">
<div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 text-on-secondary">
<span className="material-symbols-outlined text-[26px]">timer</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-2">
<span className="font-title-lg text-title-lg font-bold text-secondary-fixed">تنبيهات حرجة: 6 صفقات أوشكت مهلتها التعاقدية على الانقضاء</span>
<span className="font-label-sm text-label-sm bg-error text-on-error px-2 py-0.5 rounded-full font-bold">أقل من 6 ساعات</span>
</div>
<p className="font-body-md text-body-md text-surface-container-low mt-0.5">
          إجمالي القيمة المعرضة للإلغاء التلقائي: <strong>74,600,000 ج.م</strong> موزعة على وحدات البنتهاوس والفلل في مشروع أبراج حورس.
        </p>
</div>
</div>
<div className="flex items-center gap-space-sm w-full md:w-auto justify-end">
<button className="h-10 px-space-md rounded-lg bg-secondary text-primary font-body-md text-body-md font-bold hover:bg-secondary-fixed transition-colors flex items-center gap-1.5 shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
<span>اتصال فوري بالمشترين</span>
</button>
<button className="h-10 px-space-sm rounded-lg bg-surface-container-high/20 hover:bg-surface-container-high/30 text-surface-container-lowest font-body-md text-body-md transition-colors" type="button">
        معاينة القائمة
      </button>
</div>
</div>
<!-- KPI Grid: 8 Cohesive Metrics -->
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
<!-- KPI 1 -->
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-md text-label-md text-on-surface-variant font-semibold">إجمالي الوحدات المسجلة</span>
<div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">apartment</span>
</div>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-financial-numeric text-[32px] text-primary font-bold">480</span>
<span className="font-label-md text-label-md text-on-surface-variant">وحدة عقارية</span>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between">
<span className="font-label-sm text-label-sm text-secondary font-bold">عبر 6 مشروعات كبرى</span>
<span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded">100% المحفظة</span>
</div>
</div>
<!-- KPI 2 -->
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-md text-label-md text-on-surface-variant font-semibold">الوحدات الجاهزة والمتاحة</span>
<div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">door_front</span>
</div>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-financial-numeric text-[32px] text-primary font-bold">164</span>
<span className="font-label-md text-label-md text-on-surface-variant">وحدة شاغرة</span>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between">
<span className="font-label-sm text-label-sm text-secondary font-bold">متاح للبيع الفوري</span>
<span className="font-label-sm text-label-sm text-on-surface bg-surface-container px-2 py-0.5 rounded font-semibold">34.1% النسبة</span>
</div>
</div>
<!-- KPI 3 -->
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-md text-label-md text-on-surface-variant font-semibold">الحجوزات المعلقة</span>
<div className="w-9 h-9 rounded-lg bg-secondary-fixed/40 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">pending_actions</span>
</div>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-financial-numeric text-[32px] text-primary font-bold">52</span>
<span className="font-label-md text-label-md text-on-surface-variant">طلب تدقيق</span>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between">
<span className="font-label-sm text-label-sm text-secondary font-bold">بانتظار توقيع الشيكات</span>
<span className="font-label-sm text-label-sm text-error bg-error-container/40 px-2 py-0.5 rounded font-semibold">6 حرجة</span>
</div>
</div>
<!-- KPI 4 -->
<div className="bg-primary-container text-on-primary p-space-lg rounded-xl shadow-md flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-md text-label-md text-surface-container-high font-semibold">الحجوزات المؤكدة</span>
<div className="w-9 h-9 rounded-lg bg-surface-container-lowest/10 flex items-center justify-center text-secondary-fixed">
<span className="material-symbols-outlined text-[20px]">verified</span>
</div>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-financial-numeric text-[32px] text-secondary-fixed font-bold">86</span>
<span className="font-label-md text-label-md text-surface-container-high">عقد سارٍ</span>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between">
<span className="font-financial-numeric text-[15px] text-on-primary font-bold">1.84 مليار ج.م</span>
<span className="font-label-sm text-label-sm text-secondary-fixed bg-surface-container-lowest/15 px-2 py-0.5 rounded">محصلة تعاقدية</span>
</div>
</div>
<!-- KPI 5 -->
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-md text-label-md text-on-surface-variant font-semibold">إجمالي حركة الحجوزات</span>
<div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">stacked_bar_chart</span>
</div>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-financial-numeric text-[32px] text-primary font-bold">160</span>
<span className="font-label-md text-label-md text-on-surface-variant">عملية مسجلة</span>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between">
<div className="flex items-center gap-1 text-secondary font-bold font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span>+18.5% نمو شهري</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">مقارنة بالشهر السابق</span>
</div>
</div>
<!-- KPI 6 -->
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-md text-label-md text-on-surface-variant font-semibold">نسبة التحويل الفعلي للمؤكد</span>
<div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">conversion_path</span>
</div>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-financial-numeric text-[32px] text-primary font-bold">61.4%</span>
<span className="font-label-md text-label-md text-on-surface-variant">معدل الإغلاق</span>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between">
<span className="font-label-sm text-label-sm text-secondary font-bold">هدف الإدارة: 55%</span>
<span className="font-label-sm text-label-sm text-on-surface bg-surface-container px-2 py-0.5 rounded font-semibold">+6.4% تميز</span>
</div>
</div>
<!-- KPI 7 -->
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-md text-label-md text-on-surface-variant font-semibold">حجوزات منتهية الصلاحية</span>
<div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-outline">
<span className="material-symbols-outlined text-[20px]">event_busy</span>
</div>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-financial-numeric text-[32px] text-outline font-bold">08</span>
<span className="font-label-md text-label-md text-on-surface-variant">انقضت المهلة</span>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">تم إرجاعها للمخزون</span>
<span className="font-label-sm text-label-sm text-outline-variant bg-surface-container px-2 py-0.5 rounded">5.0%</span>
</div>
</div>
<!-- KPI 8 -->
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-md text-label-md text-on-surface-variant font-semibold">الحجوزات الملغاة</span>
<div className="w-9 h-9 rounded-lg bg-error-container/50 flex items-center justify-center text-error">
<span className="material-symbols-outlined text-[20px]">cancel</span>
</div>
</div>
<div className="flex items-baseline gap-space-xs">
<span className="font-financial-numeric text-[32px] text-error font-bold">14</span>
<span className="font-label-md text-label-md text-on-surface-variant">طلب إلغاء</span>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between">
<span className="font-label-sm text-label-sm text-error font-bold">استرداد بنكي مكتمل</span>
<span className="font-label-sm text-label-sm text-error bg-error-container/40 px-2 py-0.5 rounded font-semibold">8.8%</span>
</div>
</div>
</div>
<!-- Deep Visual Analytics Bento: Charts & Distributions -->
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-xl">
<!-- Area Chart: Booking Flux Over Current Month (8 Cols) -->
<div className="lg:col-span-8 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
<div>
<div className="flex items-center gap-2">
<h2 className="font-title-lg text-title-lg text-primary font-bold">منحنى تطور وتدفق الحجوزات والمبيعات</h2>
<span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded text-secondary font-semibold">تحليل يومي</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">مقارنة الحجوزات المسجلة حديثاً مقابل التعاقدات المؤكدة رسمياً خلال الشهر الجاري</p>
</div>
<div className="flex items-center gap-space-md self-start">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-sm bg-primary"></span>
<span className="font-label-sm text-label-sm text-on-surface font-medium">مؤكد وموثق</span>
</div>
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-sm bg-secondary"></span>
<span className="font-label-sm text-label-sm text-on-surface font-medium">حجز مبدئي</span>
</div>
</div>
</div>
<!-- High Precision SVG Chart -->
<div className="w-full h-72 relative my-space-sm flex items-end">
<svg className="w-full h-full overflow-visible" preserveaspectratio="none" viewbox="0 0 780 240">
<defs>
<lineargradient id="primaryAreaGrad" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#10243a" stop-opacity="0.25"></stop>
<stop offset="100%" stop-color="#10243a" stop-opacity="0.00"></stop>
</lineargradient>
<lineargradient id="goldAreaGrad" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#775a1a" stop-opacity="0.20"></stop>
<stop offset="100%" stop-color="#775a1a" stop-opacity="0.00"></stop>
</lineargradient>
</defs>
<!-- Horizontal Guides -->
<line stroke="#d3e4fe" stroke-dasharray="4 4" stroke-width="1" x1="0" x2="780" y1="40" y2="40"></line>
<line stroke="#d3e4fe" stroke-dasharray="4 4" stroke-width="1" x1="0" x2="780" y1="100" y2="100"></line>
<line stroke="#d3e4fe" stroke-dasharray="4 4" stroke-width="1" x1="0" x2="780" y1="160" y2="160"></line>
<line stroke="#d3e4fe" stroke-width="1" x1="0" x2="780" y1="220" y2="220"></line>
<!-- Gold Line Area (Initial Bookings) -->
<path d="M 0,190 Q 60,160 130,130 T 260,110 T 390,80 T 520,95 T 650,45 T 780,30 L 780,220 L 0,220 Z" fill="url(#goldAreaGrad)"></path>
<path d="M 0,190 Q 60,160 130,130 T 260,110 T 390,80 T 520,95 T 650,45 T 780,30" fill="none" stroke="#775a1a" stroke-width="2.5"></path>
<!-- Deep Navy Area (Confirmed) -->
<path d="M 0,210 Q 60,185 130,165 T 260,140 T 390,115 T 520,110 T 650,85 T 780,55 L 780,220 L 0,220 Z" fill="url(#primaryAreaGrad)"></path>
<path d="M 0,210 Q 60,185 130,165 T 260,140 T 390,115 T 520,110 T 650,85 T 780,55" fill="none" stroke="#10243a" stroke-width="3"></path>
<!-- Key Coordinate Nodes -->
<circle cx="260" cy="110" fill="#ffffff" r="4" stroke="#775a1a" stroke-width="2.5"></circle>
<circle cx="260" cy="140" fill="#ffffff" r="4" stroke="#10243a" stroke-width="2.5"></circle>
<circle cx="520" cy="95" fill="#ffffff" r="4" stroke="#775a1a" stroke-width="2.5"></circle>
<circle cx="520" cy="110" fill="#ffffff" r="4" stroke="#10243a" stroke-width="2.5"></circle>
<circle cx="780" cy="30" fill="#775a1a" r="5" stroke="#ffffff" stroke-width="2"></circle>
<circle cx="780" cy="55" fill="#10243a" r="5" stroke="#ffffff" stroke-width="2"></circle>
</svg>
</div>
<!-- Chart Foot Legend Timestamps -->
<div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant pt-space-xs">
<span>01 أكتوبر</span>
<span>06 أكتوبر</span>
<span>12 أكتوبر</span>
<span>18 أكتوبر</span>
<span>24 أكتوبر</span>
<span>30 أكتوبر (اليوم)</span>
</div>
</div>
<!-- Status Distribution Donut Chart (4 Cols) -->
<div className="lg:col-span-4 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-1">
<h2 className="font-title-lg text-title-lg text-primary font-bold">توزيع حالات الحجز</h2>
<span className="material-symbols-outlined text-secondary text-[20px]">pie_chart</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">التقسيم النسبي لعدد 160 طلباً</p>
</div>
<!-- Donut Visual SVG -->
<div className="relative flex items-center justify-center my-space-md">
<svg className="w-48 h-48 -rotate-90" viewbox="0 0 100 100">
<!-- Background circle track -->
<circle cx="50" cy="50" fill="transparent" r="38" stroke="#eff4ff" stroke-width="14"></circle>
<!-- Confirmed: 53.7% = 128.3 strokeDasharray of 238.76 total circumference -->
<circle cx="50" cy="50" fill="transparent" r="38" stroke="#10243a" stroke-dasharray="128.2 238.7" stroke-dashoffset="0" stroke-width="14"></circle>
<!-- Pending: 32.5% = 77.6 -->
<circle cx="50" cy="50" fill="transparent" r="38" stroke="#775a1a" stroke-dasharray="77.6 238.7" stroke-dashoffset="-128.2" stroke-width="14"></circle>
<!-- Cancelled: 8.8% = 21.0 -->
<circle cx="50" cy="50" fill="transparent" r="38" stroke="#ba1a1a" stroke-dasharray="21.0 238.7" stroke-dashoffset="-205.8" stroke-width="14"></circle>
<!-- Expired: 5.0% = 11.9 -->
<circle cx="50" cy="50" fill="transparent" r="38" stroke="#74777d" stroke-dasharray="11.9 238.7" stroke-dashoffset="-226.8" stroke-width="14"></circle>
</svg>
<div className="absolute flex flex-col items-center justify-center text-center">
<span className="font-financial-numeric text-[24px] text-primary font-bold leading-none">160</span>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-1">إجمالي الحجوزات</span>
</div>
</div>
<!-- Status Labels List -->
<div className="flex flex-col gap-space-xs pt-space-xs">
<div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-primary"></span>
<span className="font-body-md text-body-md text-on-surface font-medium">مؤكدة رسمياً (86)</span>
</div>
<span className="font-financial-numeric text-body-md font-bold text-primary">53.7%</span>
</div>
<div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-secondary"></span>
<span className="font-body-md text-body-md text-on-surface font-medium">معلقة قيد التدقيق (52)</span>
</div>
<span className="font-financial-numeric text-body-md font-bold text-secondary">32.5%</span>
</div>
<div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-error"></span>
<span className="font-body-md text-body-md text-on-surface font-medium">ملغاة ومستردة (14)</span>
</div>
<span className="font-financial-numeric text-body-md font-bold text-error">8.8%</span>
</div>
<div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-outline"></span>
<span className="font-body-md text-body-md text-on-surface font-medium">منتهية الصلاحية (08)</span>
</div>
<span className="font-financial-numeric text-body-md font-bold text-outline">5.0%</span>
</div>
</div>
</div>
</div>
<!-- Dual Pillar Section: Project Comparison & Top Sales Advisors -->
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-xl">
<!-- Project Benchmark Matrix (7 Cols) -->
<div className="lg:col-span-7 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-md">
<div>
<h2 className="font-title-lg text-title-lg text-primary font-bold">مقارنة أداء المشروعات الاستثمارية</h2>
<p className="font-body-md text-body-md text-on-surface-variant">معدلات إشغال الحجوزات مقابل القيمة الإجمالية للمبيعات</p>
</div>
<button className="text-secondary font-label-md text-label-md font-semibold hover:underline flex items-center gap-1" type="button">
<span>تقرير تفصيلي</span>
<span className="material-symbols-outlined text-[16px]">chevron_left</span>
</button>
</div>
<!-- Matrix Rows -->
<div className="flex flex-col gap-space-md">
<!-- Project 1 -->
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[22px]">corporate_fare</span>
<span className="font-title-md text-title-md font-bold text-primary">أبراج حورس الأيقونية (Horus Towers)</span>
</div>
<span className="font-financial-numeric text-title-md font-bold text-primary">780,000,000 ج.م</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>محجوز 58 من أصل 80 وحدة</span>
<span className="font-semibold text-secondary">72.5% محقق</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-secondary rounded-full" style="width: 72.5%"></div>
</div>
</div>
<!-- Project 2 -->
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[22px]">beach_access</span>
<span className="font-title-md text-title-md font-bold text-primary">منتجع لوتس لاجون (Lotus Lagoon Resort)</span>
</div>
<span className="font-financial-numeric text-title-md font-bold text-primary">520,500,000 ج.م</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>محجوز 44 من أصل 65 وحدة</span>
<span className="font-semibold text-secondary">67.7% محقق</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-secondary rounded-full" style="width: 67.7%"></div>
</div>
</div>
<!-- Project 3 -->
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[22px]">park</span>
<span className="font-title-md text-title-md font-bold text-primary">كمبوند الفراعنة جرينز (Pharaohs Greens)</span>
</div>
<span className="font-financial-numeric text-title-md font-bold text-primary">340,200,000 ج.م</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>محجوز 38 من أصل 75 وحدة</span>
<span className="font-semibold text-secondary">50.6% محقق</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-secondary rounded-full" style="width: 50.6%"></div>
</div>
</div>
<!-- Project 4 -->
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[22px]">villa</span>
<span className="font-title-md text-title-md font-bold text-primary">تلال إيزيس الفاخرة (Isis Hills)</span>
</div>
<span className="font-financial-numeric text-title-md font-bold text-primary">202,100,000 ج.م</span>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span>محجوز 20 من أصل 40 وحدة</span>
<span className="font-semibold text-secondary">50.0% محقق</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
<div className="h-full bg-secondary rounded-full" style="width: 50.0%"></div>
</div>
</div>
</div>
</div>
<!-- Sales Advisors League & Conversion Leaders (5 Cols) -->
<div className="lg:col-span-5 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-md">
<div>
<h2 className="font-title-lg text-title-lg text-primary font-bold">لوحة شرف مستشاري المبيعات</h2>
<p className="font-body-md text-body-md text-on-surface-variant">تصنيف التميز حسب قيمة العقود ونسبة التحويل</p>
</div>
<span className="material-symbols-outlined text-secondary text-[24px]">military_tech</span>
</div>
<div className="flex flex-col gap-space-md">
<!-- Advisor 1: Karim El-Sioufy -->
<div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-high/40">
<div className="flex items-center gap-space-sm">
<div className="relative">
<div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold">
                ك.س
              </div>
<span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-primary font-bold text-[11px] flex items-center justify-center">1</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-1.5">
<span className="font-title-md text-title-md text-primary font-bold">أ. كريم السيوفي</span>
<span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">فريق النخبة • 28 صفقة مغلقة</span>
</div>
</div>
<div className="flex flex-col text-left">
<span className="font-financial-numeric text-title-md font-bold text-primary">420.5 م ج.م</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">تحويل 78.4%</span>
</div>
</div>
<!-- Advisor 2: Dr. Sherif Mamdouh -->
<div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low">
<div className="flex items-center gap-space-sm">
<div className="relative">
<div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold">
                ش.م
              </div>
<span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-outline-variant text-on-surface font-bold text-[11px] flex items-center justify-center">2</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary font-bold">د. شريف ممدوح</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">محفظة UHNW • 22 صفقة</span>
</div>
</div>
<div className="flex flex-col text-left">
<span className="font-financial-numeric text-title-md font-bold text-primary">385.0 م ج.م</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">تحويل 72.1%</span>
</div>
</div>
<!-- Advisor 3: Mona Zahran -->
<div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low">
<div className="flex items-center gap-space-sm">
<div className="relative">
<div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold">
                م.ز
              </div>
<span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary-fixed text-primary font-bold text-[11px] flex items-center justify-center">3</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary font-bold">أ. منى زهران</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">الاستثمار الدولي • 19 صفقة</span>
</div>
</div>
<div className="flex flex-col text-left">
<span className="font-financial-numeric text-title-md font-bold text-primary">310.2 م ج.م</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">تحويل 65.5%</span>
</div>
</div>
</div>
<div className="mt-space-md pt-space-xs text-center">
<button className="w-full py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-md text-label-md text-primary font-semibold transition-colors" type="button">
          عرض ترتيب باقي المستشارين (21)
        </button>
</div>
</div>
</div>
<!-- Operational Reservations & Transaction Activity Stream -->
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm mb-space-xl flex flex-col">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
<div>
<h2 className="font-title-lg text-title-lg text-primary font-bold">سجل العمليات والتعيينات اللحظية المعتمدة</h2>
<p className="font-body-md text-body-md text-on-surface-variant">متابعة آخر التغييرات والحجوزات المسجلة عبر البوابة المركزية</p>
</div>
<div className="flex items-center gap-2">
<span className="font-label-sm text-label-sm text-on-surface-variant">فرز حسب:</span>
<select className="h-9 px-space-sm rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none">
<option>الأحدث تدويناً</option>
<option>الأعلى قيمة تعاقدية</option>
<option>الحالات العاجلة فقط</option>
</select>
</div>
</div>
<!-- Architectural Stream Table -->
<div className="overflow-x-auto">
<table className="w-full text-right border-collapse">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md">
<th className="py-3 px-space-md rounded-r-lg">كود الوحدة والنوع</th>
<th className="py-3 px-space-md">المشروع</th>
<th className="py-3 px-space-md">المستثمر / العميل</th>
<th className="py-3 px-space-md">القيمة الإجمالية</th>
<th className="py-3 px-space-md">مستشار التعاقد</th>
<th className="py-3 px-space-md">حالة الإجراء</th>
<th className="py-3 px-space-md rounded-l-lg text-left">التاريخ والتوقيت</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container font-body-md text-body-md">
<!-- Row 1 -->
<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md font-bold text-primary">HR-PENT-402</span>
<span className="font-label-sm text-label-sm bg-surface-container px-1.5 py-0.5 rounded text-secondary font-semibold">بنتهاوس ملكي</span>
</div>
</td>
<td className="py-3.5 px-space-md font-medium text-on-surface">أبراج حورس الأيقونية</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col">
<span className="font-bold text-primary">مجموعة السعدي القابضة</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">مستثمر استراتيجي</span>
</div>
</td>
<td className="py-3.5 px-space-md font-financial-numeric text-title-md font-bold text-primary">38,500,000 ج.م</td>
<td className="py-3.5 px-space-md">أ. كريم السيوفي</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm font-bold bg-surface-container text-primary">
<span className="w-2 h-2 rounded-full bg-primary"></span>
                حجز مؤكد
              </span>
</td>
<td className="py-3.5 px-space-md text-left font-label-sm text-label-sm text-on-surface-variant">اليوم، 14:32 م</td>
</tr>
<!-- Row 2 -->
<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md font-bold text-primary">LL-VIL-108</span>
<span className="font-label-sm text-label-sm bg-surface-container px-1.5 py-0.5 rounded text-secondary font-semibold">فيلا شاطئية</span>
</div>
</td>
<td className="py-3.5 px-space-md font-medium text-on-surface">منتجع لوتس لاجون</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col">
<span className="font-bold text-primary">د. هشام طلعت رضوان</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">عميل VIP</span>
</div>
</td>
<td className="py-3.5 px-space-md font-financial-numeric text-title-md font-bold text-primary">24,200,000 ج.م</td>
<td className="py-3.5 px-space-md">د. شريف ممدوح</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm font-bold bg-secondary-fixed/50 text-secondary">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
                معلق (4 س باقية)
              </span>
</td>
<td className="py-3.5 px-space-md text-left font-label-sm text-label-sm text-on-surface-variant">اليوم، 11:15 ص</td>
</tr>
<!-- Row 3 -->
<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md font-bold text-primary">PG-DUP-210</span>
<span className="font-label-sm text-label-sm bg-surface-container px-1.5 py-0.5 rounded text-secondary font-semibold">دوبلكس جاردن</span>
</div>
</td>
<td className="py-3.5 px-space-md font-medium text-on-surface">كمبوند الفراعنة جرينز</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col">
<span className="font-bold text-primary">السيدة نوران كمال الجوهري</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">حجز شخصي أول</span>
</div>
</td>
<td className="py-3.5 px-space-md font-financial-numeric text-title-md font-bold text-primary">16,800,000 ج.م</td>
<td className="py-3.5 px-space-md">أ. منى زهران</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm font-bold bg-surface-container text-primary">
<span className="w-2 h-2 rounded-full bg-primary"></span>
                حجز مؤكد
              </span>
</td>
<td className="py-3.5 px-space-md text-left font-label-sm text-label-sm text-on-surface-variant">أمس، 18:40 م</td>
</tr>
<!-- Row 4 -->
<tr className="hover:bg-surface-container-low/60 transition-colors">
<td className="py-3.5 px-space-md">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md font-bold text-primary">IH-TWN-014</span>
<span className="font-label-sm text-label-sm bg-surface-container px-1.5 py-0.5 rounded text-secondary font-semibold">تاون هاوس</span>
</div>
</td>
<td className="py-3.5 px-space-md font-medium text-on-surface">تلال إيزيس الفاخرة</td>
<td className="py-3.5 px-space-md">
<div className="flex flex-col">
<span className="font-bold text-primary">م. عمر عبد العزيز</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">مغترب - الإمارات</span>
</div>
</td>
<td className="py-3.5 px-space-md font-financial-numeric text-title-md font-bold text-primary">14,500,000 ج.م</td>
<td className="py-3.5 px-space-md">أ. منى زهران</td>
<td className="py-3.5 px-space-md">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm font-bold bg-error-container/40 text-error">
<span className="w-2 h-2 rounded-full bg-error"></span>
                ملغي (طلب استرداد)
              </span>
</td>
<td className="py-3.5 px-space-md text-left font-label-sm text-label-sm text-on-surface-variant">أمس، 12:20 م</td>
</tr>
</tbody>
</table>
</div>
<!-- Table Footer Navigation -->
<div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-md mt-space-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant">عرض 1 إلى 4 من أصل 160 سجلاً نشطاً</span>
<div className="flex items-center gap-1">
<button className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
<button className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold text-label-sm" type="button">1</button>
<button className="w-8 h-8 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container font-label-sm" type="button">2</button>
<button className="w-8 h-8 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container font-label-sm" type="button">3</button>
<button className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
</div>
</div>
</div>
</div></main>`;

export default AdminDashboardPage;
