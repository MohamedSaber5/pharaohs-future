import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import logoSrc from '@assets/images/erasebg-transformed.png';
import { PyramidIcon, PharaohPatternBackground } from '@components/ui/PharaohIcons.jsx';
import adminService from '@services/admin.service.js';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [settings, setSettings] = useState({
    companyPhone: "+20 2 2840 9000",
    companyWhatsapp: "+20 100 000 0000",
    companyEmail: "info@pharaohsfuture.com",
    companyAddress: "أسوان الجديدة - الحي الثاني (المقر الرئيسي)",
    googleMapsUrl: "https://maps.google.com/?q=أسوان+الجديدة+الحي+الثاني",
    workingHours: "السبت – الخميس: من 9:00 ص حتى 9:00 م",
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
            companyAddress: isCairo || !rawAddr ? "أسوان الجديدة - الحي الثاني (المقر الرئيسي)" : rawAddr,
            googleMapsUrl: d.googleMapsUrl || "https://maps.google.com/?q=أسوان+الجديدة+الحي+الثاني",
            workingHours: d.workingHours || "السبت – الخميس: من 9:00 ص حتى 9:00 م",
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = phone.trim();
    if (cleanPhone.length !== 11 || !/^(010|011|012|015)\d{8}$/.test(cleanPhone)) {
      toast.error("رقم الهاتف يجب أن يتكون من 11 رقماً ويبدأ بـ (010 أو 011 أو 012 أو 015)");
      return;
    }
    setSent(true);
    toast.success("تم إرسال رسالتك بنجاح! سيتواصل معك مستشار عقاري خلال دقائق.");
  };

  return (
    <div className="flex flex-col w-full bg-[#f8f9fc] text-neutral-900" dir="rtl">
      
      {/* ── HEADER BANNER ── */}
      <div className="relative w-full bg-[#000e1f] overflow-hidden border-b border-[#c9952a]/20">
        <PharaohPatternBackground className="opacity-10" />

        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#c9952a]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#775a1a]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 bg-white/10 backdrop-blur-md border border-[#c9952a]/40 shadow-sm mx-auto">
            <PyramidIcon className="w-4 h-4 text-[#f0d897]" />
            <span className="text-xs font-bold text-[#f0d897] tracking-wider">
              مركز الاتصال الملكي — مستقبل الفراعنة
            </span>
          </div>

          <h1 className="text-white font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-3">
            تواصل مع كبار مستشارينا العقاريين
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            فريقنا المعتمد متاح للإجابة على كافة استفساراتكم حول المشاريع وخطط السداد والاستثمار على مدار الساعة.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Info (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <img src={logoSrc} alt="مستقبل الفراعنة" className="h-14 w-auto object-contain mb-4" />
              <h2 className="text-2xl font-black text-[#000e1f] mb-2">نحن هنا لخدمتك دائماً</h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                سواء كنت تبحث عن استشارة استثمارية خاصة، أو تفاصيل وحدة محددة، مستشارونا مستعدون لتقديم رؤية شاملة ودقيقة.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { icon: "support_agent", label: "الخط الساخن المباشر", value: settings.companyPhone, action: `tel:${settings.companyPhone}` },
                { icon: "chat", label: "محادثة واتساب فورية", value: settings.companyWhatsapp, action: `https://wa.me/${settings.companyWhatsapp.replace(/\D/g, '')}` },
                { icon: "mail", label: "البريد الإلكتروني المعتمد", value: settings.companyEmail, action: `mailto:${settings.companyEmail}` },
                { icon: "location_on", label: "المقر الرئيسي والمبيعات", value: settings.companyAddress, action: settings.googleMapsUrl || "#" },
                { icon: "schedule", label: "مواعيد استقبال الاتصالات", value: settings.workingHours, action: "#" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-11 h-11 rounded-xl bg-[#000e1f] text-[#c9952a] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">{c.icon}</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-neutral-500 mb-0.5">{c.label}</p>
                    {c.action.startsWith("http") || c.action.startsWith("tel:") || c.action.startsWith("mailto:") ? (
                      <a href={c.action} target={c.action.startsWith("http") ? "_blank" : undefined} rel={c.action.startsWith("http") ? "noreferrer" : undefined} className="text-sm font-black text-[#000e1f] hover:text-[#c9952a] transition-colors font-mono">
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
                <h3 className="text-2xl font-black text-[#000e1f] mb-2">تم استلام رسالتك بنجاح!</h3>
                <p className="text-sm text-neutral-600 max-w-sm mb-6 leading-relaxed">
                  شكراً لتواصلك مع مستقبل الفراعنة. سيقوم أحد مستشارينا بالاتصال بك هاتفياً خلال دقائق.
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
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9952a]" />
                  <span className="text-xs font-bold text-[#775a1a]">نموذج الاستفسار المباشر</span>
                </div>
                <h3 className="text-2xl font-black text-[#000e1f] mb-6">أرسل رسالتك وسنرد فوراً</h3>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-700">الاسم بالكامل *</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="أدخل اسمك الكريم"
                      required
                      className="w-full h-12 px-4 rounded-xl border border-neutral-200 text-sm font-semibold outline-none bg-neutral-50 transition-all focus:border-[#c9952a] focus:bg-white text-neutral-900"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-700">البريد الإلكتروني *</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="example@domain.com"
                      required
                      className="w-full h-12 px-4 rounded-xl border border-neutral-200 text-sm font-mono outline-none bg-neutral-50 transition-all focus:border-[#c9952a] focus:bg-white text-neutral-900 text-right"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-neutral-700">رقم الهاتف المحمول (مصر) *</label>
                      <span className="text-[11px] font-mono text-neutral-400">11 رقماً يبدأ بـ 010/011/012/015</span>
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
                      className="w-full h-12 px-4 rounded-xl border border-neutral-200 text-sm font-mono outline-none bg-neutral-50 transition-all focus:border-[#c9952a] focus:bg-white text-neutral-900 text-right"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-neutral-700">تفاصيل الاستفسار أو الوحدة المطلوبة</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="اكتب هنا استفسارك أو رغبتك العقارية..."
                      rows={4}
                      className="w-full p-4 rounded-xl border border-neutral-200 text-xs font-medium outline-none bg-neutral-50 transition-all focus:border-[#c9952a] focus:bg-white text-neutral-900 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl font-bold text-sm text-[#000e1f] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 mt-2 pharaoh-gold-gradient cursor-pointer"
                  >
                    <span>إرسال الاستفسار الآن</span>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>

                  <p className="text-center text-[11px] text-neutral-500 mt-1 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-emerald-600">lock</span>
                    <span>بياناتك محفوظة بأعلى درجات الخصوصية والسرية المصرفية</span>
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
                  <span>المقر الرئيسي لشركة مستقبل الفراعنة</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#000e1f] mb-1">
                  {settings.companyAddress}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-xl">
                  يسعدنا استقبالكم في مقر الشركة للاطلاع على المخططات المعمارية ونماذج الوحدات ومناقشة تفاصيل التعاقد مباشرة مع فريق المبيعات.
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
                <span>فتح الموقع على خرائط Google</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
