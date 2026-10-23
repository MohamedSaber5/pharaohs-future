import { Link } from 'react-router-dom';
import { useLanguage } from '@context/LanguageContext.jsx';
import logoSrc from '@assets/images/really-logo.png';
import { PyramidIcon, PharaohPatternBackground, ScarabIcon, LotusIcon, AnkhIcon } from '@components/ui/PharaohIcons.jsx';

export default function AboutPage() {
  const { t, isRTL, dir } = useLanguage();

  const pillars = [
    {
      icon: <ScarabIcon className="w-6 h-6 text-[#c9952a]" />,
      title: t("about.pillar1Title", "الأصالة والإبداع المعماري"),
      desc: t("about.pillar1Desc", "تصاميم تستمد هيبتها من الهوية الفرعونية الممزوجة بأحدث أساليب العمارة الحديثة العالمية."),
    },
    {
      icon: <AnkhIcon className="w-6 h-6 text-[#c9952a]" />,
      title: t("about.pillar2Title", "الجودة الفائقة والاستدامة"),
      desc: t("about.pillar2Desc", "بيئات سكنية صحية وخضراء تعتمد على الطاقة النظيفة وتكنولوجيا المدن الذكية الموفرة."),
    },
    {
      icon: <PyramidIcon className="w-6 h-6 text-[#c9952a]" />,
      title: t("about.pillar3Title", "الالتزام الصارم بالمواعيد"),
      desc: t("about.pillar3Desc", "احترام عقود التسليم والالتزام الدقيق بجدول التنفيذ والتراخيص المعتمدة بالشهر العقاري."),
    },
    {
      icon: <LotusIcon className="w-6 h-6 text-[#c9952a]" />,
      title: t("about.pillar4Title", "أعلى عائد استثماري"),
      desc: t("about.pillar4Desc", "اختيار مواقع استراتيجية بأسوان الجديدة تضمن نمواً متصاعداً ومستداماً لقيمة العقار."),
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#f8f9fc] text-neutral-900" dir={dir}>
      
      {/* ── 1. HERO BANNER ── */}
      <div className="relative w-full bg-[#000e1f] overflow-hidden border-b border-[#c9952a]/20">
        <PharaohPatternBackground className="opacity-10" />

        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#c9952a]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#775a1a]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
          <img
            src={logoSrc}
            alt={t("brand.name", "مستقبل الفراعنة")}
            className="h-20 w-auto mx-auto mb-6 object-contain"
          />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 bg-white/10 backdrop-blur-md border border-[#c9952a]/40 shadow-sm mx-auto">
            <PyramidIcon className="w-4 h-4 text-[#f0d897]" />
            <span className="text-xs font-bold text-[#f0d897] tracking-wider">
              {t("about.badge", "صرح الفراعنة للتطوير والاستثمار العقاري")}
            </span>
          </div>

          <h1 className="text-white font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
            {t("about.heroTitle", "عراقة التاريخ تُعانق هندسة المستقبل")}
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("about.heroSubtitle", "نستلهم من عبقرية الأجداد الفراعنة في البناء والخلود، لنشيد مجتمعات سكنية واستثمارية حديثة ترتقي بحياة الأجيال القادمة.")}
          </p>
        </div>
      </div>

      {/* ── 2. VISION & MISSION ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-13 h-13 rounded-2xl bg-[#000e1f] text-[#c9952a] flex items-center justify-center mb-6 shadow-md">
              <PyramidIcon className="w-7 h-7 text-[#f0d897]" />
            </div>
            <h2 className="text-2xl font-black text-[#000e1f] mb-3">
              {t("about.visionTitle", "رؤيتنا الاستراتيجية")}
            </h2>
            <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
              {t("about.visionDesc", "أن نكون المطور العقاري الأكثر ثقة ومصداقية في مصر والشرق الأوسط، من خلال تشييد صروح معمارية تدمج بين الأصالة المصرية القديمة، وأحدث تكنولوجيا البناء المستدام والمدن الذكية.")}
            </p>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="w-13 h-13 rounded-2xl bg-[#000e1f] text-[#c9952a] flex items-center justify-center mb-6 shadow-md">
              <LotusIcon className="w-7 h-7 text-[#f0d897]" />
            </div>
            <h2 className="text-2xl font-black text-[#000e1f] mb-3">
              {t("about.missionTitle", "رسالتنا للمستثمرين")}
            </h2>
            <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
              {t("about.missionDesc", "تمكين العملاء والمستثمرين من اقتناء وحدات تحقق أعلى عائد استثماري استثنائي، مع توفير أسلوب حياة استثنائي يجمع بين الفخامة والأمان والدقة الصارمة في مواعيد التسليم.")}
            </p>
          </div>

        </div>

        {/* ── 3. FOUR REGAL PILLARS ── */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9952a]/15 text-[#775a1a] text-xs font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#c9952a]" />
            {t("about.pillarsBadge", "قيم راسخة كالجرانيت")}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#000e1f]">
            {t("about.pillarsTitle", "المعايير الأربعة لمستقبل الفراعنة")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white p-6 rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#000e1f] flex items-center justify-center mb-5">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-bold text-[#000e1f] mb-2">{pillar.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{pillar.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-xs font-bold text-[#c9952a]">
                <span>{isRTL ? "معيار معتمد" : "Certified Standard"}</span>
                <span className="material-symbols-outlined text-[15px]">verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── 4. CTA BANNER ── */}
        <div className="bg-[#000e1f] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-[#c9952a]/40 shadow-2xl">
          <PharaohPatternBackground className="opacity-15" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c9952a]/20 border border-[#c9952a]/40 text-[#f0d897] text-xs font-bold mb-3 shadow-sm">
                <span className="material-symbols-outlined text-[16px]">stars</span>
                <span>{isRTL ? "فرصتك الذهبية للاستثمار العقاري بأسوان الجديدة" : "Your Golden Real Estate Investment in New Aswan"}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black mb-3 text-[#f0d897] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-tight leading-tight">
                {isRTL ? "كن جزءاً من تاريخ المستقبل" : "Be Part of Tomorrow's History"}
              </h3>
              <p className="text-white/90 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
                {isRTL
                  ? "استكشف مشاريعنا السكنية والتجارية الاستثنائية في قلب أسوان الجديدة وتواصل مع مستشارينا المعتمدين لبدء رحلتك الاستثمارية الناجحة اليوم."
                  : "Explore our prestigious residential and commercial developments in the heart of New Aswan and connect with certified advisors to launch your investment journey today."}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="h-13 px-7 rounded-2xl font-black text-xs sm:text-sm text-[#000e1f] flex items-center gap-2.5 shadow-xl transition-all pharaoh-gold-gradient hover:scale-105 active:scale-100"
              >
                <span>{t("home.exploreProjects", "استكشف المشاريع")}</span>
                <span className={`material-symbols-outlined text-[19px] ${!isRTL ? "rotate-180" : ""}`}>
                  arrow_left_alt
                </span>
              </Link>
              <Link
                to="/contact"
                className="h-13 px-7 rounded-2xl font-bold text-xs sm:text-sm text-white border border-white/30 hover:bg-white/10 flex items-center gap-2 transition-all"
              >
                <span>{t("nav.contact", "تواصل معنا")}</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
