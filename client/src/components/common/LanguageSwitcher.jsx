import { useLanguage } from "@context/LanguageContext.jsx";

export default function LanguageSwitcher({ variant = "button", className = "" }) {
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === "ar";

  if (variant === "compact") {
    return (
      <button
        onClick={toggleLanguage}
        type="button"
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer text-xs font-bold ${
          isArabic
            ? "bg-white/5 border-white/10 text-white/80 hover:text-[#f0d897] hover:border-[#c9952a]/40 hover:bg-white/10"
            : "bg-[#c9952a]/20 border-[#c9952a]/40 text-[#f0d897] hover:bg-[#c9952a]/30"
        } ${className}`}
        title={isArabic ? "Switch to English" : "التحويل للغة العربية"}
      >
        <span className="material-symbols-outlined text-[16px] text-[#c9952a]">language</span>
        <span className="tracking-wide">{isArabic ? "EN" : "عربي"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      className={`group flex items-center gap-2 h-10 px-3.5 rounded-2xl border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-100 ${
        isArabic
          ? "bg-white/5 border-white/15 text-white/90 hover:text-white hover:border-[#c9952a]/50 hover:bg-white/10"
          : "bg-white/10 border-[#c9952a]/40 text-[#f0d897] hover:bg-white/15 hover:border-[#c9952a]/70"
      } ${className}`}
      title={isArabic ? "Switch to English" : "التحويل إلى اللغة العربية"}
    >
      <span className="material-symbols-outlined text-[18px] text-[#c9952a] transition-transform duration-300 group-hover:rotate-45">
        language
      </span>
      <span className="text-[12.5px] font-bold tracking-wide">
        {isArabic ? "English" : "العربية"}
      </span>
      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-white/10 text-white/60 group-hover:text-[#c9952a] group-hover:bg-[#c9952a]/15 transition-colors">
        {isArabic ? "EN" : "AR"}
      </span>
    </button>
  );
}
