import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoSrc from "@assets/images/erasebg-transformed.png";
import adminService from "@services/admin.service.js";

export default function Footer() {
  const [settings, setSettings] = useState({
    companyPhone: "+20 2 2840 9000",
    companyWhatsapp: "201000000000",
    companyEmail: "info@pharaohsfuture.com",
    companyAddress: "أسوان الجديدة - الحي الثاني (المقر الرئيسي)",
    googleMapsUrl: "https://maps.google.com/?q=أسوان+الجديدة+الحي+الثاني",
    workingHours: "السبت - الخميس (9ص - 9م)",
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
            companyWhatsapp: d.companyWhatsapp || "201000000000",
            companyEmail: d.companyEmail || "info@pharaohsfuture.com",
            companyAddress: isCairo || !rawAddr ? "أسوان الجديدة - الحي الثاني (المقر الرئيسي)" : rawAddr,
            googleMapsUrl: d.googleMapsUrl || "https://maps.google.com/?q=أسوان+الجديدة+الحي+الثاني",
            workingHours: d.workingHours || "السبت - الخميس (9ص - 9م)",
          });
        }
      })
      .catch(() => {});
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "الرئيسية", path: "/" },
    { label: "المشاريع العقارية", path: "/projects" },
    { label: "الوحدات المتاحة", path: "/properties" },
    { label: "عن الشركة والريادة", path: "/about" },
    { label: "تواصل مع مستشار", path: "/contact" },
  ];

  const primeLocations = [
    { name: "أسوان الجديدة - الحي الثاني (المقر الرئيسي)", path: "/projects?city=aswan-2" },
    { name: "كورنيش النيل بأسوان الجديدة", path: "/projects?city=aswan-corniche" },
    { name: "الحي الأول بأسوان الجديدة", path: "/projects?city=aswan-1" },
    { name: "حي اللوتس وزهرة النيل", path: "/projects?city=aswan-lotus" },
    { name: "المحور الخدمي والمنطقة اللوجستية", path: "/projects?city=aswan-hub" },
  ];

  const cleanWhatsapp = (settings.companyWhatsapp || "201000000000").replace(/\D/g, "");

  const socialLinks = [
    { icon: "chat", title: "واتساب", href: `https://wa.me/${cleanWhatsapp}` },
    { icon: "call", title: "اتصال مباشر", href: `tel:${settings.companyPhone}` },
    { icon: "mail", title: "البريد الإلكتروني", href: `mailto:${settings.companyEmail}` },
    { icon: "location_on", title: "موقع المقر على الخريطة", href: settings.googleMapsUrl },
  ];

  return (
    <footer className="w-full bg-[#000e1f] text-white border-t border-white/10 relative overflow-hidden" dir="rtl">
      {/* Decorative ambient gold glow in background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#c9952a]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-[#775a1a]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-24 lg:pb-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">

          {/* 1. Brand & About Column (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={logoSrc}
                alt="مستقبل الفراعنة"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white">مستقبل الفراعنة</span>
                <span className="text-xs text-[#c9952a] font-medium tracking-wide">للاستثمار والتطوير العقاري</span>
              </div>
            </Link>

            <p className="text-sm text-white/65 leading-relaxed max-w-sm mt-1">
              مؤسسة تطويرية رائدة تُجسد الفخامة والابتكار في تطوير أرقى المجتمعات السكنية والمشاريع الاستثمارية في مصر بأعلى معايير الجودة العالمية.
            </p>

            {/* Social & Direct Contact Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  title={item.title}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/75 hover:text-[#c9952a] hover:bg-white/10 hover:border-[#c9952a]/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="material-symbols-outlined text-[19px]">{item.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* 2. Navigation Links (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9952a]" />
              روابط سريعة
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/60">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="hover:text-[#c9952a] hover:translate-x-[-3px] transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Prime Locations (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9952a]" />
              أهم الوجهات والمناطق
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/60">
              {primeLocations.map((loc) => (
                <li key={loc.name}>
                  <Link
                    to={loc.path}
                    className="hover:text-[#c9952a] hover:translate-x-[-3px] transition-all inline-block"
                  >
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact & Quick Support (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9952a]" />
              خدمة العملاء والاستفسارات
            </h4>
            
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#c9952a]/20 flex items-center justify-center text-[#c9952a] flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <div>
                  <p className="text-[11px] text-white/50">الخط الساخن المباشر</p>
                  <a href={`tel:${settings.companyPhone}`} className="text-sm font-bold text-white hover:text-[#c9952a] transition-colors font-mono">
                    {settings.companyPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#c9952a]/20 flex items-center justify-center text-[#c9952a] flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-white/50">البريد المعتمد</p>
                  <a href={`mailto:${settings.companyEmail}`} className="text-xs text-white/90 hover:text-[#c9952a] transition-colors truncate block font-mono">
                    {settings.companyEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#c9952a]/20 flex items-center justify-center text-[#c9952a] flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-white/50">المقر الرئيسي للشركة</p>
                  <p className="text-xs text-white/95 font-semibold leading-relaxed">
                    {settings.companyAddress}
                  </p>
                  {settings.googleMapsUrl && (
                    <a
                      href={settings.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#f0d897] hover:underline mt-1 font-bold"
                    >
                      <span>فتح الموقع على خرائط Google</span>
                      <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-1 border-t border-white/5 text-[11px] text-white/50 flex items-center justify-between">
                <span>أوقات العمل:</span>
                <span className="text-white/80 font-medium">{settings.workingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2 text-center sm:text-right">
            <span>جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
            <span className="text-[#c9952a] font-semibold">شركة مستقبل الفراعنة للاستثمار والتطوير العقاري</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">عن المؤسسة</Link>
            <span className="text-white/20">|</span>
            <Link to="/contact" className="hover:text-white transition-colors">اتصل بنا</Link>
            <span className="text-white/20">|</span>
            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#c9952a]/20 hover:text-[#c9952a] border border-white/10 transition-all text-white/70"
            >
              <span>للأعلى</span>
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
