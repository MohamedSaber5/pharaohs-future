import { useEffect, useRef } from 'react';

/**
 * AuthPage
 * Auto-generated from Stitch HTML design — preserves exact Tailwind classes & layout
 */
const AuthPage = () => {
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

const html = `<main className="w-full min-h-screen"><div className="flex flex-col w-full">
<div className="w-full min-h-[calc(100vh-2rem)] flex flex-col lg:flex-row bg-surface p-4 lg:p-8 gap-6">
<!-- Left Column (Visual Showcase 45% width) -->
<div className="w-full lg:w-[45%] flex flex-col justify-between relative rounded-xl overflow-hidden shadow-xl bg-primary-container min-h-[640px] lg:min-h-auto">
<div className="absolute inset-0 z-0 bg-cover bg-center" data-alt="A luxurious architectural rendering of ultra-modern high-rise residential towers bathed in warm Egyptian golden hour sunlight. Manicured palm groves, cascading infinity water fountains, shimmering resort pools, and refined marble pathways reflect timeless grandeur and sophisticated engineering." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCLdMmPX-vO5-R9bcn4nmeCZJz6nboJVuQCDVvIAj0LyPqqO_18qqdrMh7pE3Lk9pb9JjXe_SNxKUEKQaIZpcT3MCpNvxyD7-qOq7jzH3oYPixQ1N515910aBCpqapCRvMBk9LVgKhnCPmVZC5vqRyrqRx231czNSd_saansPEozIaluoU41Unn9-duqa2Ij8sCJ4JeNhefZ6YRIyK2RkmhUFcyjnyYWasp2xUtrn-VaH7N0sfTTZj4-Q')"></div>
<!-- Architectural Gradient Overlays -->
<div className="absolute inset-0 z-10 bg-gradient-to-t from-primary via-primary-container/85 to-primary-container/40"></div>
<div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/30 via-transparent to-transparent"></div>
<!-- Top Badge / Header within showcase -->
<div className="relative z-20 p-6 lg:p-10 flex items-center justify-between">
<div className="inline-flex items-center gap-3 bg-surface-container-lowest/15 backdrop-blur-md px-4 py-2 rounded-full border-0 shadow-sm">
<span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim animate-pulse"></span>
<span className="font-label-md text-label-md text-on-primary">بوابة المستثمرين المعتمدة</span>
</div>
<div className="flex items-center gap-2 text-surface-container-high opacity-80 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[18px] text-secondary-fixed">verified</span>
<span>منظومة موثقة رقمياً</span>
</div>
</div>
<!-- Center & Bottom Visual Storytelling -->
<div className="relative z-20 p-6 lg:p-10 space-y-6">
<!-- Floating Luxury Testimonial Card -->
<div className="bg-primary/85 backdrop-blur-xl p-6 rounded-xl shadow-2xl relative overflow-hidden">
<div className="absolute top-0 right-0 w-24 h-1 bg-secondary-container"></div>
<span className="material-symbols-outlined text-secondary-fixed text-[36px] mb-2 block opacity-70">format_quote</span>
<p className="font-headline-sm text-headline-sm text-on-primary font-bold leading-snug mb-3">
            بوابتك الحصرية للاستثمار في أكثر المشروعات المعمارية تميزاً في مصر.
          </p>
<p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
            تجسيد حقيقي للفخامة المعمارية والتراث المستدام عبر بنية تحتية رقمية فائقة التطور تتيح لك التحكم الكامل في استثماراتك العقارية.
          </p>
</div>
<!-- Key Benefits List with Gold Accents -->
<div className="space-y-3.5 pt-2">
<div className="flex items-start gap-3.5 bg-surface-container-lowest/10 backdrop-blur-sm p-3.5 rounded-lg">
<div className="w-9 h-9 rounded-lg bg-secondary/30 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-secondary-fixed text-[20px]" style="font-variation-settings: 'FILL' 1;">analytics</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-on-primary font-semibold">متابعة حية لمراحل بناء وحجوزات وحداتك</h4>
<p className="font-label-md text-label-md text-surface-container-high opacity-90">تقارير تصوير جوي أسبوعية وجداول تنفيذ مطابقة للمعايير الهندسية الدولية.</p>
</div>
</div>
<div className="flex items-start gap-3.5 bg-surface-container-lowest/10 backdrop-blur-sm p-3.5 rounded-lg">
<div className="w-9 h-9 rounded-lg bg-secondary/30 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-secondary-fixed text-[20px]" style="font-variation-settings: 'FILL' 1;">payments</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-on-primary font-semibold">استلام إشعارات الأقساط وخطط السداد الرقمية</h4>
<p className="font-label-md text-label-md text-surface-container-high opacity-90">سداد إلكتروني معتمد مع إصدار إيصالات فورية موثقة بنكياً.</p>
</div>
</div>
<div className="flex items-start gap-3.5 bg-surface-container-lowest/10 backdrop-blur-sm p-3.5 rounded-lg">
<div className="w-9 h-9 rounded-lg bg-secondary/30 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-secondary-fixed text-[20px]" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-on-primary font-semibold">أولوية الوصول للطروحات الجديدة والمشروعات الحصرية</h4>
<p className="font-label-md text-label-md text-surface-container-high opacity-90">دعوات خاصة لفعاليات كبار المستثمرين والمزايا الاستثمارية المغلقة.</p>
</div>
</div>
</div>
<!-- Footer Trust Metric -->
<div className="flex items-center justify-between pt-4 text-surface-container-high">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary-fixed-dim text-[20px]">shield</span>
<span className="font-label-sm text-label-sm">حماية البيانات وفق معايير GDPR والبنك المركزي</span>
</div>
<span className="font-financial-numeric text-[13px] text-secondary-fixed opacity-90">100% SECURE &amp; ENCRYPTED</span>
</div>
</div>
</div>
<!-- Right Column (Interactive Authentication Suite 55% width) -->
<div className="w-full lg:w-[55%] flex flex-col justify-between bg-surface-container-lowest rounded-xl p-6 lg:p-12 shadow-sm relative">
<!-- Top Navigation & Brand Header -->
<div className="flex items-center justify-between pb-8">
<div className="flex items-center gap-3">
<div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center shadow-md">
<span className="material-symbols-outlined text-secondary-container text-[26px]">apartment</span>
</div>
<div>
<h1 className="font-title-lg text-title-lg text-primary font-bold tracking-tight">مستقبل الفراعنة</h1>
<p className="font-label-sm text-label-sm text-on-surface-variant">للاستثمار والتطوير العقاري الفاخر</p>
</div>
</div>
<a className="inline-flex items-center gap-1.5 font-label-md text-label-md text-secondary hover:text-on-secondary-fixed-variant transition-colors group" href="#">
<span>العودة للرئيسية</span>
<span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_left_alt</span>
</a>
</div>
<!-- Interactive Tabbed Switcher -->
<div className="w-full">
<div className="flex items-center p-1.5 bg-surface-container-low rounded-xl mb-8">
<button className="flex-1 py-3 px-4 rounded-lg font-title-md text-title-md font-semibold transition-all shadow-sm bg-primary text-on-primary" id="tab-login-btn" onclick="switchAuthTab('login')">
            تسجيل الدخول
          </button>
<button className="flex-1 py-3 px-4 rounded-lg font-title-md text-title-md font-semibold transition-all text-on-surface-variant hover:text-primary" id="tab-register-btn" onclick="switchAuthTab('register')">
            إنشاء حساب مستثمر
          </button>
<button className="flex-1 py-3 px-4 rounded-lg font-title-md text-title-md font-semibold transition-all text-on-surface-variant hover:text-primary" id="tab-otp-btn" onclick="switchAuthTab('otp')">
            التحقق ورمز الأمان
          </button>
</div>
<!-- ==================== TAB 1: LOGIN VIEW ==================== -->
<div className="space-y-6 block" id="tab-content-login">
<div>
<h2 className="font-headline-md text-headline-md text-primary font-bold mb-1">مرحباً بعودتك إلى منصة المستثمرين</h2>
<p className="font-body-md text-body-md text-on-surface-variant">أدخل بيانات حسابك لإدارة استثماراتك العقارية وحجوزاتك بكل سهولة وأمان</p>
</div>
<form className="space-y-5" onsubmit="event.preventDefault(); switchAuthTab('otp');">
<!-- Identifier Field (Phone / Email) -->
<div className="space-y-1.5 text-right">
<label className="block font-label-md text-label-md text-on-surface font-semibold">رقم الهاتف المصري أو البريد الإلكتروني</label>
<div className="relative flex items-center">
<div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-on-surface-variant">
<span className="material-symbols-outlined text-[20px]">person</span>
</div>
<input className="w-full h-12 pr-11 pl-20 bg-surface-container-lowest rounded-md text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-secondary focus:bg-surface-bright shadow-sm" placeholder="name@example.com أو 01xxxxxxxxx" type="text" value="01098765432"/>
<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center gap-1.5 text-outline text-label-md">
<span className="font-label-sm text-label-sm font-semibold text-secondary">EG +20</span>
<span className="text-[14px]">🇪🇬</span>
</div>
</div>
<div className="flex items-center gap-1 text-[#065F46] font-label-sm text-label-sm pt-0.5">
<span className="material-symbols-outlined text-[14px]">check_circle</span>
<span>تم التعرف على حساب المستثمر المعتمد</span>
</div>
</div>
<!-- Password Field -->
<div className="space-y-1.5 text-right">
<label className="block font-label-md text-label-md text-on-surface font-semibold">كلمة المرور</label>
<div className="relative flex items-center">
<div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-on-surface-variant">
<span className="material-symbols-outlined text-[20px]">lock</span>
</div>
<input className="w-full h-12 pr-11 pl-11 bg-surface-container-lowest rounded-md text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-secondary focus:bg-surface-bright shadow-sm" id="login-pass-input" type="password" value="Pharaohs@2025#"/>
<button className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-outline hover:text-primary transition-colors" onclick="togglePasswordVisibility('login-pass-input', this)" type="button">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
</div>
<!-- Remember & Forgot Password Link -->
<div className="flex items-center justify-between pt-1">
<label className="flex items-center gap-2 cursor-pointer select-none">
<input checked="" className="w-4 h-4 rounded text-secondary focus:ring-secondary accent-primary" type="checkbox"/>
<span className="font-body-md text-body-md text-on-surface">تذكر بياناتي على هذا الجهاز</span>
</label>
<button className="font-label-md text-label-md text-secondary hover:text-on-secondary-fixed-variant font-medium" onclick="switchAuthTab('otp')" type="button">
                نسيت كلمة المرور؟
              </button>
</div>
<!-- Primary Login Action Button -->
<button className="w-full h-12 bg-primary text-on-primary font-title-md text-title-md font-semibold rounded-md hover:bg-primary-container hover:shadow-lg transition-all flex items-center justify-center gap-2 group" type="submit">
<span>تسجيل الدخول إلى حسابك</span>
<span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">login</span>
</button>
</form>
<!-- Social / Unified Identity Divider -->
<div className="relative my-6">
<div className="absolute inset-0 flex items-center">
<div className="w-full bg-surface-container h-[1px]"></div>
</div>
<div className="relative flex justify-center text-xs">
<span className="bg-surface-container-lowest px-4 text-on-surface-variant font-label-md text-label-md">أو الدخول عبر الخدمات المعتمدة</span>
</div>
</div>
<!-- Fast Login Options -->
<div className="grid grid-cols-2 gap-3.5">
<button className="h-11 px-4 bg-surface-container-low hover:bg-surface-container text-primary rounded-md font-label-md text-label-md font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-sm">
<span className="material-symbols-outlined text-secondary text-[20px]">fingerprint</span>
<span>الهوية الرقمية الموحدة</span>
</button>
<button className="h-11 px-4 bg-surface-container-low hover:bg-surface-container text-primary rounded-md font-label-md text-label-md font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-sm">
<svg className="w-4 h-4" viewbox="0 0 24 24">
<path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"></path>
<path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"></path>
<path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05"></path>
<path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"></path>
</svg>
<span>حساب Google للأعمال</span>
</button>
</div>
</div>
<!-- ==================== TAB 2: REGISTER VIEW ==================== -->
<div className="space-y-6 hidden" id="tab-content-register">
<div>
<h2 className="font-headline-md text-headline-md text-primary font-bold mb-1">فتح حساب مستثمر معتمد</h2>
<p className="font-body-md text-body-md text-on-surface-variant">انضم لمحفظة النخبة واستفد من خطط السداد الحصرية والفرص العقارية ذات العائد المرتفع</p>
</div>
<form className="space-y-4 text-right" onsubmit="event.preventDefault(); switchAuthTab('otp');">
<!-- Full Name -->
<div className="space-y-1">
<label className="block font-label-md text-label-md text-on-surface font-semibold">الاسم الثلاثي أو اسم الكيان الاستثماري</label>
<div className="relative flex items-center">
<div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-on-surface-variant">
<span className="material-symbols-outlined text-[20px]">badge</span>
</div>
<input className="w-full h-12 pr-11 pl-4 bg-surface-container-lowest rounded-md text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-secondary shadow-sm" placeholder="مثال: كريم حازم عبد العزيز" type="text"/>
</div>
</div>
<!-- Two Columns: Mobile & Official Email -->
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="space-y-1">
<label className="block font-label-md text-label-md text-on-surface font-semibold">رقم الهاتف المحمول</label>
<div className="relative flex items-center">
<input className="w-full h-12 pr-3 pl-16 bg-surface-container-lowest rounded-md text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-secondary shadow-sm" placeholder="01xxxxxxxxx" type="tel"/>
<div className="absolute inset-y-0 left-0 pl-3 flex items-center text-outline font-label-sm text-label-sm">
<span>+20 EG</span>
</div>
</div>
</div>
<div className="space-y-1">
<label className="block font-label-md text-label-md text-on-surface font-semibold">البريد الإلكتروني الرسمي</label>
<input className="w-full h-12 px-3.5 bg-surface-container-lowest rounded-md text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-secondary shadow-sm" placeholder="investor@domain.com" type="email"/>
</div>
</div>
<!-- Password & Confirmation -->
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="space-y-1">
<label className="block font-label-md text-label-md text-on-surface font-semibold">كلمة المرور الجديدة</label>
<input className="w-full h-12 px-3.5 bg-surface-container-lowest rounded-md text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-secondary shadow-sm" placeholder="••••••••••••" type="password"/>
</div>
<div className="space-y-1">
<label className="block font-label-md text-label-md text-on-surface font-semibold">تأكيد كلمة المرور</label>
<input className="w-full h-12 px-3.5 bg-surface-container-lowest rounded-md text-on-surface font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-secondary shadow-sm" placeholder="••••••••••••" type="password"/>
</div>
</div>
<!-- Password Strength Meter -->
<div className="p-3 bg-surface-container-low rounded-lg space-y-1.5">
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-on-surface-variant">مؤشر أمان كلمة المرور:</span>
<span className="text-[#065F46] font-semibold">قوية ومطابقة للمعايير</span>
</div>
<div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden flex gap-1">
<div className="w-1/3 h-full bg-[#10B981] rounded-full"></div>
<div className="w-1/3 h-full bg-[#10B981] rounded-full"></div>
<div className="w-1/3 h-full bg-[#10B981] rounded-full"></div>
</div>
<p className="font-label-sm text-label-sm text-on-surface-variant">يجب أن تتضمن 8 رموز على الأقل مع أحرف كبيرة وأرقام ورمز خاص (@, #, $).</p>
</div>
<!-- Legal & Data Protection Checkbox -->
<div className="pt-1">
<label className="flex items-start gap-2.5 cursor-pointer select-none">
<input checked="" className="w-4 h-4 mt-1 rounded text-secondary focus:ring-secondary accent-primary shrink-0" type="checkbox"/>
<span className="font-label-md text-label-md text-on-surface-variant leading-relaxed">
                  أوافق على <a className="text-secondary underline font-semibold" href="#">الشروط والأحكام العامة</a> وسياسة حماية بيانات المستثمرين وسرية التعاملات المالية طبقا لضوابط البنك المركزي المصري.
                </span>
</label>
</div>
<!-- Register Button -->
<button className="w-full h-12 bg-primary text-on-primary font-title-md text-title-md font-semibold rounded-md hover:bg-primary-container hover:shadow-lg transition-all flex items-center justify-center gap-2 group mt-2" type="submit">
<span>إنشاء حساب مستثمر جديد</span>
<span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_left_alt</span>
</button>
</form>
</div>
<!-- ==================== TAB 3: OTP / 2FA VIEW ==================== -->
<div className="space-y-6 hidden" id="tab-content-otp">
<div>
<div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-full text-secondary font-label-sm text-label-sm font-semibold mb-2">
<span className="material-symbols-outlined text-[16px]">verified_user</span>
<span>التحقق الثنائي المشفر (2FA)</span>
</div>
<h2 className="font-headline-md text-headline-md text-primary font-bold mb-1">تأكيد رقم الهاتف عبر رمز التحقق</h2>
<p className="font-body-md text-body-md text-on-surface-variant">
              تم إرسال رمز أمان مؤقت مكوّن من 6 أرقام عبر رسالة SMS نصية إلى الرقم:
              <span className="font-financial-numeric text-primary font-bold mx-1" dir="ltr">+20 10 •••• ••32</span>
</p>
</div>
<!-- 6 Digit OTP Input Visual -->
<div className="space-y-4 py-2">
<div className="flex justify-between items-center gap-2 max-w-md mx-auto" dir="ltr">
<input className="w-12 h-14 text-center font-financial-numeric text-2xl font-bold bg-surface-container-low text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm" maxlength="1" type="text" value="8"/>
<input className="w-12 h-14 text-center font-financial-numeric text-2xl font-bold bg-surface-container-low text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm" maxlength="1" type="text" value="4"/>
<input className="w-12 h-14 text-center font-financial-numeric text-2xl font-bold bg-surface-container-low text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm" maxlength="1" type="text" value="2"/>
<input className="w-12 h-14 text-center font-financial-numeric text-2xl font-bold bg-surface-container-low text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm" maxlength="1" type="text" value="9"/>
<input className="w-12 h-14 text-center font-financial-numeric text-2xl font-bold bg-surface-container-lowest text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm" maxlength="1" placeholder="•" type="text"/>
<input className="w-12 h-14 text-center font-financial-numeric text-2xl font-bold bg-surface-container-lowest text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm" maxlength="1" placeholder="•" type="text"/>
</div>
<!-- Resend Timer State -->
<div className="flex items-center justify-between text-label-md font-label-md max-w-md mx-auto pt-2">
<span className="text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
<span>إعادة إرسال الرمز خلال:</span>
</span>
<span className="font-financial-numeric text-secondary font-bold" id="otp-timer">00:48 ثانية</span>
</div>
</div>
<!-- Actions -->
<div className="space-y-3 pt-2">
<button className="w-full h-12 bg-primary text-on-primary font-title-md text-title-md font-semibold rounded-md hover:bg-primary-container hover:shadow-lg transition-all flex items-center justify-center gap-2" onclick="switchAuthTab('login')">
<span className="material-symbols-outlined text-[20px]">check_circle</span>
<span>تأكيد الرمز والدخول إلى المنصة</span>
</button>
<button className="w-full h-11 bg-transparent hover:bg-surface-container-low text-on-surface-variant font-label-md text-label-md font-semibold rounded-md transition-colors flex items-center justify-center gap-1" onclick="switchAuthTab('login')">
<span>تغيير رقم الهاتف أو وسيلة التحقق</span>
</button>
</div>
<!-- Security Notice -->
<div className="p-3.5 bg-surface-container-low rounded-lg flex items-start gap-2.5">
<span className="material-symbols-outlined text-secondary text-[20px] shrink-0">info</span>
<p className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
              يرجى عدم مشاركة رمز التحقق مع أي شخص بما في ذلك موظفي خدمة المستثمرين. كود الأمان مخصص لاستخدامك الشخصي فقط.
            </p>
</div>
</div>
</div>
<!-- Footer Help & Institutional Badges -->
<div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[18px] text-secondary">support_agent</span>
<span>دعم كبار العملاء المباشر: </span>
<span className="font-financial-numeric font-bold text-primary" dir="ltr">19822</span>
</div>
<div className="flex items-center gap-4 text-outline font-label-sm text-label-sm">
<a className="hover:text-primary transition-colors" href="#">سياسة الخصوصية</a>
<span>•</span>
<a className="hover:text-primary transition-colors" href="#">شروط الاستخدام</a>
<span>•</span>
<a className="hover:text-primary transition-colors" href="#">الأسئلة الشائعة</a>
</div>
</div>
</div>
</div>
</div>
<script>
  function switchAuthTab(tabName) {
    const loginContent = document.getElementById('tab-content-login');
    const registerContent = document.getElementById('tab-content-register');
    const otpContent = document.getElementById('tab-content-otp');
    
    const loginBtn = document.getElementById('tab-login-btn');
    const registerBtn = document.getElementById('tab-register-btn');
    const otpBtn = document.getElementById('tab-otp-btn');

    const defaultBtnClass = 'flex-1 py-3 px-4 rounded-lg font-title-md text-title-md font-semibold transition-all text-on-surface-variant hover:text-primary';
    const activeBtnClass = 'flex-1 py-3 px-4 rounded-lg font-title-md text-title-md font-semibold transition-all shadow-sm bg-primary text-on-primary';

    // Hide all
    loginContent.classList.add('hidden');
    registerContent.classList.add('hidden');
    otpContent.classList.add('hidden');

    loginBtn.className = defaultBtnClass;
    registerBtn.className = defaultBtnClass;
    otpBtn.className = defaultBtnClass;

    if (tabName === 'login') {
      loginContent.classList.remove('hidden');
      loginBtn.className = activeBtnClass;
    } else if (tabName === 'register') {
      registerContent.classList.remove('hidden');
      registerBtn.className = activeBtnClass;
    } else if (tabName === 'otp') {
      otpContent.classList.remove('hidden');
      otpBtn.className = activeBtnClass;
    }
  }

  function togglePasswordVisibility(inputId, buttonElem) {
    const input = document.getElementById(inputId);
    const icon = buttonElem.querySelector('.material-symbols-outlined');
    if (input.type === 'password') {
      input.type = 'text';
      icon.textContent = 'visibility_off';
    } else {
      input.type = 'password';
      icon.textContent = 'visibility';
    }
  }
</script></main>`;

export default AuthPage;
