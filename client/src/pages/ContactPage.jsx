import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLanguage } from '@context/LanguageContext.jsx';
import logoSrc from '@assets/images/really-logo.png';
import { PyramidIcon, PharaohPatternBackground } from '@components/ui/PharaohIcons.jsx';
import adminService from '@services/admin.service.js';

export default function ContactPage() {
  const { t, isRTL, dir } = useLanguage();
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [settings, setSettings] = useState({
    companyPhone: "+20 2 2840 9000",
    companyWhatsapp: "+20 100 000 0000",
    companyEmail: "info@pharaohsfuture.com",
    companyAddress: isRTL ? "أسوان الجديدة - الحي الثاني (المقر الرئيسي)" : "New Aswan - Second District (Main HQ)",
    googleMapsUrl: "https://maps.google.com/?q=أسوان+الجديدة+الحي+الثاني",
    workingHours: isRTL ? "السبت – الخميس: من 9:00 ص حتى 9:00 م" : "Sat – Thu: 9:00 AM to 9:00 PM",
  });

  useEffect(() => {
    adminService
      .getSettings()
      .then((res) => {
        const d = res?.data ?? res;
        if (d) {
          const rawAddr = d.companyAddress || "";
          const isCairo = rawAddr.includes("القاهرة") || rawAddr.includes("التجمع");
          setSettings({
            companyPhone: d.companyPhone || "+20 2 2840 9000",
            companyWhatsapp: d.companyWhatsapp || "+20 100 000 0000",
            companyEmail: d.companyEmail || "info@pharaohsfuture.com",
            companyAddress: isCairo || !rawAddr
              ? (isRTL ? "أسوان الجديدة - الحي الثاني (المقر الرئيسي)" : "New Aswan - Second District (Main HQ)")
              : rawAddr,
            googleMapsUrl: d.googleMapsUrl || "https://maps.google.com/?q=أسوان+الجديدة+الحي+الثاني",
            workingHours: d.workingHours || (isRTL ? "السبت – الخميس: من 9:00 ص حتى 9:00 م" : "Sat – Thu: 9:00 AM to 9:00 PM"),
          });
        }
      })
      .catch(() => {});
  }, [isRTL]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = phone.trim();
    if (cleanPhone.length !== 11 || !/^(010|011|012|015)\d{8}$/.test(cleanPhone)) {
      toast.error(
        isRTL
          ? "رقم الهاتف يجب أن يتكون من 11 رقماً ويبدأ بـ (010 أو 011 أو 012 أو 015)"
          : "Phone number must be 11 digits starting with 010, 011, 012, or 015"
      );
      return;
    }
    setSent(true);
    toast.success(
      isRTL
        ? "تم إرسال رسالتك بنجاح! سيتواصل معك مستشار عقاري خلال دقائق."
        : "Your message has been sent successfully! An advisor will contact you within minutes."
    );
  };

  return (
    <div className="flex flex-col w-full bg-[#f8f9fc] text-neutral-900" dir={dir}>
      
      {/* ── HEADER BANNER ── */}
      <div className="relative w-full bg-[#000e1f] overflow-hidden border-b border-[#c9952a]/20">
        <PharaohPatternBackground className="opacity-10" />

        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#c9952a]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#775a1a]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 bg-white/10 backdrop-blur-md border border-[#c9952a]/40 shadow-sm mx-auto">
            <PyramidIcon className="w-4 h-4 text-[#f0d897]" />
            <span className="text-xs font-bold text-[#f0d897] tracking-wider">
              {isRTL ? "مركز الاتصال والاستشارات — مستقبل الفراعنة" : "VIP Advisory & Contact Center — Pharaohs Future"}
            </span>
          </div>

          <h1 className="text-white font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-3">
            {t("contact.title", "تواصل مع خبراء مستقبل الفراعنة")}
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t("contact.subtitle", "يسعدنا دائماً استقبال استفساراتكم وزيارتكم في مقرنا الرسمي بأسوان الجديدة")}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Info (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <img src={logoSrc} alt={t("brand.name", "مستقبل الفراعنة")} className="h-14 w-auto object-contain mb-4" />
              <h2 className="text-2xl font-black text-[#000e1f] mb-2">
                {isRTL ? "نحن هنا لخدمتك دائماً" : "We Are Always Here For You"}
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {isRTL
                  ? "سواء كنت تبحث عن استشارة استثمارية خاصة، أو تفاصيل وحدة محددة، مستشارونا مستعدون لتقديم رؤية شاملة ودقيقة."
                  : "Whether seeking exclusive investment advice or specific property details, our senior consultants provide comprehensive, tailored insights."}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { icon: "support_agent", label: t("footer.callDirect", "الخط الساخن المباشر"), value: settings.companyPhone, action: `tel:${settings.companyPhone}` },
                { icon: "chat", label: t("footer.whatsapp", "محادثة واتساب فورية"), value: settings.companyWhatsapp, action: `https://wa.me/${settings.companyWhatsapp.replace(/\D/g, '')}` },
                { icon: "mail", label: t("footer.email", "البريد الإلكتروني المعتمد"), value: settings.companyEmail, action: `mailto:${settings.companyEmail}` },
                { icon: "location_on", label: t("contact.headquarters", "المقر الرئيسي والمبيعات"), value: settings.companyAddress, action: settings.googleMapsUrl || "#" },
                { icon: "schedule", label: t("contact.workingHours", "مواعيد العمل الرسمية"), value: settings.workingHours, action: "#" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 rounded-xl bg-[#000e1f] text-[#c9952a] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">{c.icon}</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-neutral-500 mb-0.5">{c.label}</p>
                    {c.action.startsWith("http") || c.action.startsWith("tel:") || c.action.startsWith("mailto:") ? (
                      <a href={c.action} target={c.action.startsWith("http") ? "_blank" : undefined} rel={c.action.startsWith("http") ? "noreferrer" : undefined} className="text-sm font-black text-[#000e1f] hover:text-[#c9952a] transition-colors font-mono" dir="ltr">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-sm font-bold text-[#000e1f]">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/90 shadow-xl p-8 sm:p-10">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>
                <h3 className="text-2xl font-black text-[#000e1f] mb-2">
                  {isRTL ? "تم استلام رسالتك بنجاح!" : "Message Received Successfully!"}
                </h3>
                <p className="text-sm text-neutral-600 max-w-sm mb-6 leading-relaxed">
                  {isRTL
                    ? "شكراً لتواصلك مع مستقبل الفراعنة. سيقوم أحد مستشارينا بالاتصال بك هاتفياً خلال دقائق."
                    : "Thank you for reaching out to Pharaohs Future. A dedicated advisor will phone you shortly."}
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="h-11 px-6 rounded-xl font-bold text-xs text-[#000e1f] pharaoh-gold-gradient cursor-pointer shadow-md"
                >
                  {isRTL ? "إرسال رسالة أخرى" : "Send Another Message"}
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9952a]" />
                  <span className="text-xs font-bold text-[#775a1a]">
                    {t("contact.formTitle", "أرسل استفسارك مباشرة")}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#000e1f] mb-6">
                  {isRTL ? "أرسل رسالتك وسنرد فوراً" : "Send Your Inquiry & Get Quick Support"}
                </h3>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-700">
                      {t("contact.fullName", "الاسم بالكامل")} *
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder={isRTL ? "أدخل اسمك الكريم" : "Enter your full name"}
                      required
                      className="w-full h-12 px-4 rounded-xl border border-neutral-200 text-sm font-semibold outline-none bg-neutral-50 transition-all focus:border-[#c9952a] focus:bg-white text-neutral-900"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-700">
                      {t("contact.emailAddress", "البريد الإلكتروني")} *
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="example@domain.com"
                      required
                      className={`w-full h-12 px-4 rounded-xl border border-neutral-200 text-sm font-mono outline-none bg-neutral-50 transition-all focus:border-[#c9952a] focus:bg-white text-neutral-900 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-neutral-700">
                        {t("contact.phoneNumber", "رقم الهاتف المحمول")} *
                      </label>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {isRTL ? "11 رقماً يبدأ بـ 010/011/012/015" : "11 digits starting with 010/011/012/015"}
                      </span>
                    </div>
                    <input
                      value={phone}
                      onChange={(e) => {
                        const clean = e.target.value.replace(/\D/g, '').slice(0, 11);
                        setPhone(clean);
                      }}
                      type="tel"
                      dir="ltr"
                      placeholder="010XXXXXXXX"
                      required
                      className={`w-full h-12 px-4 rounded-xl border border-neutral-200 text-sm font-mono outline-none bg-neutral-50 transition-all focus:border-[#c9952a] focus:bg-white text-neutral-900 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-700">
                      {t("contact.message", "تفاصيل الرسالة أو الاستفسار")}
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={isRTL ? "اكتب هنا استفسارك أو رغبتك العقارية..." : "Write your inquiry or property requirements here..."}
                      rows={4}
                      className="w-full p-4 rounded-xl border border-neutral-200 text-xs font-medium outline-none bg-neutral-50 transition-all focus:border-[#c9952a] focus:bg-white text-neutral-900 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl font-bold text-sm text-[#000e1f] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 mt-2 pharaoh-gold-gradient cursor-pointer"
                  >
                    <span>{t("contact.sendButton", "إرسال الاستفسار الآن")}</span>
                    <span className={`material-symbols-outlined text-[18px] ${!isRTL ? "rotate-180" : ""}`}>
                      send
                    </span>
                  </button>

                  <p className="text-center text-[11px] text-neutral-500 mt-1 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-emerald-600">lock</span>
                    <span>
                      {isRTL
                        ? "بياناتك محفوظة بأعلى درجات الخصوصية والسرية المصرفية"
                        : "Your data is strictly protected with bank-level encryption & confidentiality"}
                    </span>
                  </p>
                </form>
              </>
            )}
          </div>

        </div>

        {/* ── HEADQUARTERS LOCATION & VISIT CARD ── */}
        <div className="mt-12 bg-white rounded-3xl border border-neutral-200/90 shadow-xl overflow-hidden">
          <div className="h-2.5 pharaoh-gold-gradient" />
          <div className="p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#000e1f] text-[#f0d897] flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="material-symbols-outlined text-[30px]">domain</span>
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9952a]/15 text-[#775a1a] text-xs font-bold mb-2">
                  <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                  <span>{t("contact.headquarters", "المقر الرئيسي لشركة مستقبل الفراعنة")}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#000e1f] mb-1">
                  {settings.companyAddress}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-xl">
                  {isRTL
                    ? "يسعدنا استقبالكم في مقر الشركة للاطلاع على المخططات المعمارية ونماذج الوحدات ومناقشة تفاصيل التعاقد مباشرة مع فريق المبيعات."
                    : "We are pleased to welcome you to our headquarters to explore architectural masterplans, physical unit mockups, and finalize contracts directly with senior consultants."}
                </p>
              </div>
            </div>

            {settings.googleMapsUrl && (
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="h-13 px-8 rounded-2xl font-bold text-xs sm:text-sm text-[#000e1f] flex items-center gap-2.5 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer whitespace-nowrap pharaoh-gold-gradient"
              >
                <span className="material-symbols-outlined text-[20px]">map</span>
                <span>{isRTL ? "فتح الموقع على خرائط Google" : "Open Location in Google Maps"}</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
