import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLanguage } from '@context/LanguageContext.jsx';
import projectService from '@services/project.service.js';
import unitService from '@services/unit.service.js';
import adminService from '@services/admin.service.js';
import { getImageUrl } from '@utils/imageHelper.js';
import heroBgImg from '@assets/images/Abu Simbel Meets Nile Luxury.png';

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80';

const STATUS_BADGE = {
  'تحت الإنشاء': 'bg-blue-500/15 text-blue-300 border-blue-400/30',
  'قيد البيع': 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  'مكتمل': 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
};

const UNIT_STATUS_BADGE = {
  'متاح': 'bg-emerald-500/10 text-emerald-700 border border-emerald-200',
  'محجوز': 'bg-amber-500/10 text-amber-700 border border-amber-200',
  'مباع': 'bg-rose-500/10 text-rose-700 border border-rose-200',
};

export default function HomePage() {
  const navigate = useNavigate();
  const { t, isRTL, dir, tStatus, tType, formatPrice, formatArea } = useLanguage();

  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const [featuredUnits, setFeaturedUnits] = useState([]);
  const [unitsLoading, setUnitsLoading] = useState(true);

  // Search filter states
  const [activeTab, setActiveTab] = useState('all');
  const [cityFilter, setCityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  // Consultation form state
  const [consultName, setConsultName] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultSending, setConsultSending] = useState(false);

  const [settings, setSettings] = useState({
    companyAddress: isRTL ? "أسوان الجديدة - الحي الثاني (المقر الرئيسي)" : "New Aswan - Second District (Main HQ)",
    googleMapsUrl: "https://maps.google.com/?q=أسوان+الجديدة+الحي+الثاني",
  });

  useEffect(() => {
    // 1. Load real projects from MongoDB (3 featured projects by default or dynamic admin count)
    adminService
      .getSettings()
      .then((sRes) => {
        const d = sRes?.data ?? sRes;
        if (d) {
          const rawAddr = d.companyAddress || "";
          const isCairo = rawAddr.includes("القاهرة") || rawAddr.includes("التجمع");
          setSettings({
            companyAddress: isCairo || !rawAddr
              ? (isRTL ? "أسوان الجديدة - الحي الثاني (المقر الرئيسي)" : "New Aswan - Second District (Main HQ)")
              : rawAddr,
            googleMapsUrl: d.googleMapsUrl || "https://maps.google.com/?q=أسوان+الجديدة+الحي+الثاني",
          });
        }
        const count = d?.homeFeaturedProjectsCount || 3;
        return projectService.getAll({ limit: count }).then((res) => {
          const list = res?.data ?? res ?? [];
          setFeaturedProjects(Array.isArray(list) ? list.slice(0, count) : []);
        });
      })
      .catch(() => {
        projectService
          .getAll({ limit: 3 })
          .then((res) => {
            const list = res?.data ?? res ?? [];
            setFeaturedProjects(Array.isArray(list) ? list.slice(0, 3) : []);
          })
          .catch((err) => console.error("Error loading projects:", err));
      })
      .finally(() => setProjectsLoading(false));

    // 2. Load real units from MongoDB
    unitService
      .getAll({ limit: 6, status: 'all' })
      .then((res) => {
        const data = res?.data ?? res;
        const list = Array.isArray(data?.units) ? data.units : Array.isArray(data) ? data : [];
        setFeaturedUnits(list);
      })
      .catch((err) => console.error("Error loading units:", err))
      .finally(() => setUnitsLoading(false));
  }, [isRTL]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (cityFilter) params.append('city', cityFilter);
    if (typeFilter) params.append('type', typeFilter);
    if (priceFilter) params.append('price', priceFilter);
    navigate(`/properties?${params.toString()}`);
  };

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    if (!consultName.trim() || !consultPhone.trim()) {
      toast.error(t("home.consultError", "يرجى إدخال الاسم ورقم الهاتف للتواصل"));
      return;
    }
    setConsultSending(true);
    setTimeout(() => {
      setConsultSending(false);
      toast.success(t("home.consultSuccess", "تم استلام طلبك بنجاح! سيتواصل معك مستشار عقاري خلال دقائق."));
      setConsultName('');
      setConsultPhone('');
    }, 800);
  };

  return (
    <div className='flex flex-col w-full' dir={dir}>

      {/* ── 1. HERO SECTION (High Prestige, Atmospheric) ── */}
      <section className='relative w-full -mt-20 overflow-hidden bg-[#000e1f] text-white'>
        {/* Background image with layered gradients */}
        <div
          className='absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000'
          style={{ backgroundImage: `url(${heroBgImg})` }}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-[#000e1f] via-[#000e1f]/85 to-[#000e1f]/60' />
        <div className={`absolute inset-0 ${isRTL ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-[#000e1f]/95 via-[#000e1f]/80 to-transparent`} />

        {/* Ambient floating orbs */}
        <div className={`absolute top-1/4 ${isRTL ? "right-1/4" : "left-1/4"} w-96 h-96 rounded-full bg-[#c9952a]/10 blur-3xl pointer-events-none animate-float`} />
        <div className={`absolute bottom-1/4 ${isRTL ? "left-10" : "right-10"} w-80 h-80 rounded-full bg-[#775a1a]/15 blur-3xl pointer-events-none`} />

        <div className='relative max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-36 lg:pb-44 flex flex-col justify-center min-h-[800px]'>
          
          {/* Trust Badge */}
          <div className='inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 w-fit mb-6 shadow-sm hover:border-[#c9952a]/50 transition-all'>
            <span className='w-2.5 h-2.5 rounded-full bg-[#c9952a] animate-pulse' />
            <span className='text-xs font-semibold text-[#f0d897] tracking-wider'>
              {t("home.prestigeBadge", "شركة مستقبل الفراعنة — ريادة الاستثمار والتطوير العقاري")}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className='text-3xl sm:text-4xl lg:text-6xl font-black text-white max-w-4xl tracking-tight leading-[1.2] lg:leading-[1.18] mb-6'>
            {isRTL ? (
              <>
                نبني المستقبل ونبتكر في أرقى{' '}
                <span className='text-[#f0d897] font-black inline-block relative border-b-2 border-[#c9952a] pb-1 drop-shadow-[0_2px_15px_rgba(201,149,42,0.45)]'>
                  المجتمعات العقارية
                </span>
              </>
            ) : (
              <>
                Building the Future, Innovating in Premier{' '}
                <span className='text-[#f0d897] font-black inline-block relative border-b-2 border-[#c9952a] pb-1 drop-shadow-[0_2px_15px_rgba(201,149,42,0.45)]'>
                  Communities
                </span>
              </>
            )}
          </h1>

          <p className='text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed mb-10'>
            {t("home.heroSubtitle", "نقدم باقة مختارة واستثنائية من أرقى الوحدات السكنية والتجارية في أكثر المواقع حيوية بمصر، وفق أعلى معايير الجودة العالمية مع خطط استثمار وسداد ميسرة.")}
          </p>

          {/* Primary Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 mb-14'>
            <Link
              to='/projects'
              className='inline-flex items-center justify-center gap-3 h-14 px-8 rounded-2xl font-bold text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#c9952a]/20 hover:-translate-y-1 active:translate-y-0 group text-[#000e1f]'
              style={{ background: 'linear-gradient(135deg, #f0d897 0%, #c9952a 50%, #b07d1f 100%)' }}
            >
              <span>{t("home.exploreProjects", "استكشف المشاريع الكبرى")}</span>
              <span className={`material-symbols-outlined text-[20px] ${!isRTL ? "rotate-180" : "group-hover:-translate-x-1.5"} transition-transform duration-200`}>
                arrow_left_alt
              </span>
            </Link>

            <Link
              to='/properties'
              className='inline-flex items-center justify-center gap-3 h-14 px-8 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-base border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 active:translate-y-0'
            >
              <span className='material-symbols-outlined text-[#f0d897] text-[20px]'>domain</span>
              <span>{t("home.browseUnits", "تصفح الوحدات المتاحة")}</span>
            </Link>
          </div>

          {/* Value Badges with Subtle Glassmorphism */}
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-3xl'>
            {[
              { icon: 'history_edu', title: isRTL ? '+25 عاماً' : '+25 Years', desc: isRTL ? 'خبرة وريادة في السوق المصري' : 'Egyptian Market Leadership' },
              { icon: 'verified', title: isRTL ? '100% موثوق' : '100% Certified', desc: isRTL ? 'تراخيص بناء وقرارات وزارية' : 'Full Licenses & Registrations' },
              { icon: 'event_available', title: isRTL ? 'دقة في التسليم' : 'Strict Punctuality', desc: isRTL ? 'التزام صارم بالجداول الزمنية' : 'Precise Milestone Timelines' },
            ].map((item) => (
              <div
                key={item.title}
                className='flex items-center gap-3.5 bg-white/5 hover:bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:border-[#c9952a]/40 transition-all duration-300 hover:-translate-y-0.5'
              >
                <div className='w-11 h-11 rounded-xl bg-gradient-to-br from-[#c9952a]/30 to-[#775a1a]/20 border border-[#c9952a]/30 flex items-center justify-center text-[#f0d897] flex-shrink-0'>
                  <span className='material-symbols-outlined text-[22px]'>{item.icon}</span>
                </div>
                <div>
                  <p className='text-sm font-bold text-white'>{item.title}</p>
                  <p className='text-xs text-white/60'>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 2. SMART SEARCH & FILTER BAR (Modern Floating Box) ── */}
      <section className='relative z-20 max-w-7xl mx-auto px-6 lg:px-12 -mt-14 w-full'>
        <div className='bg-white rounded-3xl shadow-2xl border border-neutral-100 p-6 lg:p-8 backdrop-blur-xl'>
          
          {/* Category Tabs */}
          <div className='flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-neutral-100'>
            {[
              { id: 'all', label: t("home.searchAll", "كافة الوحدات"), icon: 'apps' },
              { id: 'apartments', label: t("home.searchResidential", "شقق سكنية فاخرة"), icon: 'apartment' },
              { id: 'villas', label: t("home.searchVillas", "فيلات ودوبلكس"), icon: 'corporate_fare' },
              { id: 'commercial', label: t("home.searchCommercial", "محلات ومقرات تجارية"), icon: 'storefront' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'apartments') setTypeFilter('شقة');
                  else if (tab.id === 'villas') setTypeFilter('فيلا');
                  else if (tab.id === 'commercial') setTypeFilter('تجاري');
                  else setTypeFilter('');
                }}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#000e1f] text-white shadow-md shadow-[#000e1f]/15'
                    : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <span className={`material-symbols-outlined text-[18px] ${activeTab === tab.id ? 'text-[#c9952a]' : 'text-neutral-400'}`}>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filter Form Controls */}
          <form onSubmit={handleSearchSubmit} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end'>
            
            {/* City */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold text-neutral-600 flex items-center gap-1.5'>
                <span className='material-symbols-outlined text-[#c9952a] text-[16px]'>location_on</span>
                {t("home.cityLabel", "المدينة / المنطقة")}
              </label>
              <div className='relative'>
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className={`w-full h-12 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-800 text-sm font-medium appearance-none focus:outline-none focus:border-[#c9952a] focus:bg-white transition-all cursor-pointer ${
                    isRTL ? "pr-4 pl-10" : "pl-4 pr-10"
                  }`}
                >
                  <option value=''>{t("home.allCities", "كافة أحياء ومناطق أسوان")}</option>
                  <option value='أسوان الجديدة'>{isRTL ? "أسوان الجديدة (الحي الثاني - المقر الرئيسي)" : "New Aswan (District 2 - Main HQ)"}</option>
                  <option value='الحي الأول'>{isRTL ? "أسوان الجديدة - الحي الأول" : "New Aswan - District 1"}</option>
                  <option value='الحي الثالث'>{isRTL ? "أسوان الجديدة - الحي الثالث" : "New Aswan - District 3"}</option>
                  <option value='كورنيش النيل'>{isRTL ? "كورنيش النيل بأسوان" : "Nile Corniche - Aswan"}</option>
                  <option value='حي اللوتس'>{isRTL ? "حي اللوتس وزهرة النيل" : "Lotus & Nile Flower District"}</option>
                </select>
                <span className={`material-symbols-outlined absolute top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[20px] ${
                  isRTL ? "left-3" : "right-3"
                }`}>
                  expand_more
                </span>
              </div>
            </div>

            {/* Unit Type */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold text-neutral-600 flex items-center gap-1.5'>
                <span className='material-symbols-outlined text-[#c9952a] text-[16px]'>home_work</span>
                {t("home.typeLabel", "نوع الوحدة")}
              </label>
              <div className='relative'>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className={`w-full h-12 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-800 text-sm font-medium appearance-none focus:outline-none focus:border-[#c9952a] focus:bg-white transition-all cursor-pointer ${
                    isRTL ? "pr-4 pl-10" : "pl-4 pr-10"
                  }`}
                >
                  <option value=''>{t("home.allTypes", "كافة الأنواع")}</option>
                  <option value='شقة'>{isRTL ? "شقة فاخرة" : "Luxury Apartment"}</option>
                  <option value='دوبلكس'>{isRTL ? "دوبلكس" : "Duplex"}</option>
                  <option value='بنتهاوس'>{isRTL ? "بنتهاوس" : "Penthouse"}</option>
                  <option value='فيلا'>{isRTL ? "فيلا مستقلة" : "Standalone Villa"}</option>
                  <option value='محل'>{isRTL ? "محل تجاري" : "Retail Shop"}</option>
                  <option value='مكتب'>{isRTL ? "مكتب إداري" : "Office Space"}</option>
                </select>
                <span className={`material-symbols-outlined absolute top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[20px] ${
                  isRTL ? "left-3" : "right-3"
                }`}>
                  expand_more
                </span>
              </div>
            </div>

            {/* Price Range */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-bold text-neutral-600 flex items-center gap-1.5'>
                <span className='material-symbols-outlined text-[#c9952a] text-[16px]'>payments</span>
                {t("home.priceLabel", "نطاق السعر الإجمالي")}
              </label>
              <div className='relative'>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className={`w-full h-12 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-800 text-sm font-medium appearance-none focus:outline-none focus:border-[#c9952a] focus:bg-white transition-all cursor-pointer ${
                    isRTL ? "pr-4 pl-10" : "pl-4 pr-10"
                  }`}
                >
                  <option value=''>{t("home.allPrices", "أي ميزانية")}</option>
                  <option value='under3m'>{isRTL ? "أقل من 3 مليون ج.م" : "Under 3M EGP"}</option>
                  <option value='3to6m'>{isRTL ? "3 إلى 6 مليون ج.م" : "3M to 6M EGP"}</option>
                  <option value='6to10m'>{isRTL ? "6 إلى 10 مليون ج.م" : "6M to 10M EGP"}</option>
                  <option value='above10m'>{isRTL ? "أكثر من 10 مليون ج.م" : "Above 10M EGP"}</option>
                </select>
                <span className={`material-symbols-outlined absolute top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[20px] ${
                  isRTL ? "left-3" : "right-3"
                }`}>
                  expand_more
                </span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type='submit'
              className='h-12 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-white cursor-pointer'
              style={{ background: '#000e1f' }}
            >
              <span className='material-symbols-outlined text-[#c9952a] text-[20px]'>search</span>
              <span>{t("home.searchButton", "بحث في الوحدات المتاحة")}</span>
            </button>
          </form>

        </div>
      </section>

      {/* ── 3. ARCHITECTURAL VALUE PROPOSITIONS (Why Pharaohs Future) ── */}
      <section className='max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 w-full'>
        <div className='text-center max-w-2xl mx-auto mb-12'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c9952a]/15 text-[#775a1a] text-xs font-bold mb-3'>
            <span className='w-2 h-2 rounded-full bg-[#c9952a]' />
            {t("home.heritageBadge", "معايير الريادة والتميز")}
          </div>
          <h2 className='text-2xl sm:text-3xl font-extrabold text-[#000e1f] leading-tight'>
            {isRTL ? (
              <>لماذا يختار كبار المستثمرين <span className='text-[#c9952a]'>مستقبل الفراعنة</span>؟</>
            ) : (
              <>Why Discerning Investors Choose <span className='text-[#c9952a]'>Pharaohs Future</span>?</>
            )}
          </h2>
          <p className='text-sm text-neutral-500 mt-2'>
            {t("home.heritageSub", "نضع بين أيديكم خبرة عريقة وحلولاً استثمارية مستدامة تضمن أقصى عوائد مالية وأعلى مستويات الرفاهية")}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {[
            {
              icon: 'diamond',
              title: t("home.pillar1Title", "تصاميم هندسية استثنائية"),
              desc: t("home.pillar1Desc", "مشاريع مصممة بالتعاون مع أكبر المكاتب الاستشارية العالمية لتوفير بيئة عصرية ذكية."),
            },
            {
              icon: 'trending_up',
              title: t("home.pillar3Title", "أعلى عائد استثماري (ROI)"),
              desc: t("home.pillar3Desc", "دراسات جدوى متقدمة تضمن نمواً متواصلاً في قيمة العقار وعوائد إيجارية مجزية."),
            },
            {
              icon: 'pin_drop',
              title: t("home.pillar2Title", "مواقع استراتيجية حيوية"),
              desc: t("home.pillar2Desc", "اختيار دقيق للمواقع في أسوان الجديدة القريبة من أهم المحاور الرئيسية والمناظر النيلية."),
            },
            {
              icon: 'handshake',
              title: t("home.pillar4Title", "التزام صارم بالتسليم"),
              desc: t("home.pillar4Desc", "أنظمة تقسيط مدروسة والتزام دقيق بالمواعيد بدون أي رسوم خفية مع تسهيلات مميزة."),
            },
          ].map((item) => (
            <div
              key={item.title}
              className='p-6 rounded-3xl bg-white border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between'
            >
              <div>
                <div className='w-13 h-13 rounded-2xl bg-[#000e1f] text-[#c9952a] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#c9952a]/20 transition-all duration-300'>
                  <span className='material-symbols-outlined text-[26px]'>{item.icon}</span>
                </div>
                <h3 className='text-base font-bold text-[#000e1f] mb-2 group-hover:text-[#c9952a] transition-colors'>
                  {item.title}
                </h3>
                <p className='text-xs text-neutral-500 leading-relaxed'>{item.desc}</p>
              </div>
              <div className='mt-4 pt-3 border-t border-neutral-50 flex items-center gap-1.5 text-xs font-bold text-[#c9952a]'>
                <span>{isRTL ? "معايير معتمدة" : "Certified Standard"}</span>
                <span className='material-symbols-outlined text-[16px]'>check_circle</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. FEATURED PROJECTS (From Real Database) ── */}
      <section id='projects' className='max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16 w-full'>
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10'>
          <div>
            <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#000e1f]/5 text-[#000e1f] text-xs font-bold mb-3'>
              <span className='material-symbols-outlined text-[#c9952a] text-[16px]'>apartment</span>
              {t("nav.projects", "المشاريع السكنية والاستثمارية")}
            </div>
            <h2 className='text-2xl sm:text-3xl font-extrabold text-[#000e1f] leading-tight'>
              {t("home.featuredProjectsTitle", "أحدث مشاريعنا المتميزة")}<br />
              <span className='text-[#c9952a]'>{t("home.featuredProjectsSub", "تصاميم معمارية تفوق التوقعات")}</span>
            </h2>
          </div>
          <Link
            to='/projects'
            className='inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs sm:text-sm font-bold hover:bg-[#000e1f] hover:text-white hover:border-[#000e1f] transition-all self-start md:self-auto group'
          >
            <span>{t("home.viewAllProjects", "عرض كافة المشاريع")}</span>
            <span className={`material-symbols-outlined text-[18px] ${!isRTL ? "rotate-180" : "group-hover:-translate-x-1"} transition-transform`}>
              arrow_left_alt
            </span>
          </Link>
        </div>

        {projectsLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm'>
                <div className='aspect-[4/3] bg-neutral-100 animate-pulse' />
                <div className='p-6 flex flex-col gap-3'>
                  <div className='h-4 bg-neutral-100 animate-pulse rounded-lg w-3/4' />
                  <div className='h-4 bg-neutral-100 animate-pulse rounded-lg w-1/2' />
                </div>
              </div>
            ))}
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className='col-span-3 flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-neutral-100'>
            <span className='material-symbols-outlined text-[56px] text-neutral-300 mb-4'>apartment</span>
            <h3 className='text-lg font-bold text-neutral-700 mb-1'>{t("projects.notFound", "لا توجد مشاريع مضافة بعد")}</h3>
            <p className='text-xs text-neutral-400'>{isRTL ? "يمكنك إدارة المشاريع وإضافتها من لوحة تحكم المسؤول" : "You can manage projects through the administration portal"}</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {featuredProjects.map((p) => {
              const pImg = p.images?.[0] ? getImageUrl(p.images[0]) : PLACEHOLDER_IMG;
              return (
                <div
                  key={p._id}
                  className='group bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between'
                >
                  <div>
                    {/* Project Image Banner */}
                    <div className='relative aspect-[4/3] overflow-hidden bg-neutral-100'>
                      <img
                        src={pImg}
                        alt={p.name}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                        onError={(e) => {
                          e.target.src = PLACEHOLDER_IMG;
                        }}
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-[#000e1f]/80 via-transparent to-transparent' />
                      
                      {/* Status Tag */}
                      <div className={`absolute top-3.5 ${isRTL ? "right-3.5" : "left-3.5"}`}>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${
                          STATUS_BADGE[p.status] || 'bg-white/90 text-neutral-800 border-white/20'
                        }`}>
                          {tStatus(p.status)}
                        </span>
                      </div>

                      {/* Location & Title On Image */}
                      <div className='absolute bottom-3.5 right-3.5 left-3.5'>
                        <p className='text-xs text-white/80 mb-1 flex items-center gap-1'>
                          <span className='material-symbols-outlined text-[#f0d897] text-[15px]'>location_on</span>
                          {p.location}
                        </p>
                        <p className='text-lg text-white font-bold leading-tight'>{p.name}</p>
                      </div>
                    </div>

                    {/* Project Specs */}
                    <div className='p-6'>
                      <div className='grid grid-cols-3 gap-2 pb-4 border-b border-neutral-100'>
                        {[
                          { i: 'straighten', l: t("properties.area", "المساحة"), v: p.totalArea ? formatArea(p.totalArea) : '-' },
                          { i: 'holiday_village', l: t("projects.unitsCount", "الوحدات"), v: `${p.unitCount ?? p.totalUnits ?? 0} ${isRTL ? "وحدة" : "Units"}` },
                          { i: 'event_available', l: t("projects.delivery", "التسليم"), v: p.delivery || '-' },
                        ].map((m) => (
                          <div key={m.l} className='flex flex-col items-center text-center gap-0.5 bg-neutral-50/70 p-2.5 rounded-2xl'>
                            <span className='material-symbols-outlined text-[18px] text-[#c9952a]'>
                              {m.i}
                            </span>
                            <span className='text-[10px] text-neutral-400 font-medium'>{m.l}</span>
                            <span className='text-xs font-bold text-neutral-800 leading-tight'>{m.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className='p-6 pt-0 flex items-center justify-between'>
                    <div>
                      <p className='text-[11px] text-neutral-400'>{t("projects.startingFrom", "يبدأ السعر من")}</p>
                      <p className='text-base font-extrabold text-[#000e1f] font-mono'>
                        {p.startPrice ? formatPrice(p.startPrice) : (isRTL ? "غير محدد" : "TBD")}
                      </p>
                    </div>
                    <Link
                      to={`/projects/${p._id}`}
                      className='inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-95 transition-all shadow-md group-hover:bg-[#c9952a] group-hover:text-[#000e1f]'
                      style={{ background: '#000e1f' }}
                    >
                      <span>{t("projects.viewDetails", "عرض التفاصيل")}</span>
                      <span className={`material-symbols-outlined text-[16px] ${!isRTL ? "rotate-180" : ""}`}>
                        arrow_left_alt
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── 5. STATS & MILESTONES (Prestige Navy Bar) ── */}
      <section className='bg-[#000e1f] py-16 text-white relative overflow-hidden'>
        <div className={`absolute top-0 ${isRTL ? "right-1/3" : "left-1/3"} w-80 h-80 rounded-full bg-[#c9952a]/10 blur-3xl pointer-events-none`} />
        <div className={`absolute bottom-0 ${isRTL ? "left-1/4" : "right-1/4"} w-80 h-80 rounded-full bg-[#775a1a]/10 blur-3xl pointer-events-none`} />

        <div className='relative max-w-7xl mx-auto px-6 lg:px-12'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 text-center'>
            {[
              { i: 'history_edu', v: '+25', l: t("home.statsYears", "عاماً من الريادة والخبرة") },
              { i: 'apartment', v: '+20', l: t("home.statsProjects", "مشروعاً عقارياً متكاملاً") },
              { i: 'holiday_village', v: '+2,000', l: t("home.statsDelivered", "وحدة تم تسليمها بنجاح") },
              { i: 'verified', v: '99%', l: t("home.statsClients", "نسبة رضا المستثمرين والعملاء") },
            ].map((s) => (
              <div key={s.l} className='flex flex-col items-center gap-2 p-4 rounded-3xl bg-white/5 border border-white/5 hover:border-[#c9952a]/30 transition-all'>
                <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c9952a]/20 to-transparent flex items-center justify-center text-[#f0d897] mb-1'>
                  <span className='material-symbols-outlined text-[24px]'>{s.i}</span>
                </div>
                <p className='text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight'>
                  {s.v}
                </p>
                <p className='text-xs sm:text-sm text-white/60 font-medium'>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. AVAILABLE REAL UNITS (From MongoDB) ── */}
      <section id='available-units' className='max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 w-full'>
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10'>
          <div>
            <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#000e1f]/5 text-[#000e1f] text-xs font-bold mb-3'>
              <span className='material-symbols-outlined text-[#c9952a] text-[16px]'>domain</span>
              {t("home.featuredUnitsTitle", "الوحدات العقارية المميزة")}
            </div>
            <h2 className='text-2xl sm:text-3xl font-extrabold text-[#000e1f] leading-tight'>
              {t("home.featuredUnitsTitle", "وحدات سكنية وتجارية مختارة")}<br />
              <span className='text-[#c9952a]'>{t("home.featuredUnitsSub", "متاحة للحجز والتعاقد الفوري")}</span>
            </h2>
          </div>
          <Link
            to='/properties'
            className='inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs sm:text-sm font-bold hover:bg-[#000e1f] hover:text-white hover:border-[#000e1f] transition-all self-start md:self-auto group'
          >
            <span>{t("home.viewAllUnits", "عرض كافة الوحدات")}</span>
            <span className={`material-symbols-outlined text-[18px] ${!isRTL ? "rotate-180" : "group-hover:-translate-x-1"} transition-transform`}>
              arrow_left_alt
            </span>
          </Link>
        </div>

        {unitsLoading ? (
          <div className='flex flex-col gap-4'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='bg-white rounded-3xl p-6 border border-neutral-100 animate-pulse h-44 shadow-sm' />
            ))}
          </div>
        ) : featuredUnits.length === 0 ? (
          <div className='bg-white rounded-3xl p-12 text-center border border-neutral-100 flex flex-col items-center justify-center shadow-sm'>
            <span className='material-symbols-outlined text-[48px] text-neutral-300 mb-3'>domain_disabled</span>
            <h3 className='text-base font-bold text-neutral-700 mb-1'>{t("properties.noUnitsFound", "لا توجد وحدات متاحة حالياً")}</h3>
            <p className='text-xs text-neutral-400 mb-4'>{isRTL ? "يمكنك إضافة وحدات جديدة من لوحة التحكم" : "You can add new properties via the admin panel"}</p>
            <Link
              to='/admin/projects'
              className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#000e1f] text-white text-xs font-bold'
            >
              {t("nav.manageProjects", "إدارة المشاريع والوحدات")}
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {featuredUnits.map((u) => {
              const uImg = u.images?.[0]
                ? getImageUrl(u.images[0])
                : u.project?.images?.[0]
                ? getImageUrl(u.project.images[0])
                : PLACEHOLDER_IMG;

              const projectName = u.project?.name || (isRTL ? 'مشروع متميز' : 'Prime Project');
              const location = u.project?.location || u.building || (isRTL ? 'أسوان الجديدة' : 'New Aswan');

              return (
                <div
                  key={u._id}
                  className='group bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between'
                >
                  <div>
                    {/* Unit Image */}
                    <div className='relative aspect-[16/10] overflow-hidden bg-neutral-100'>
                      <img
                        src={uImg}
                        alt={u.type}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                        onError={(e) => {
                          e.target.src = PLACEHOLDER_IMG;
                        }}
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
                      
                      <div className={`absolute top-3.5 ${isRTL ? "right-3.5" : "left-3.5"}`}>
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm ${
                          UNIT_STATUS_BADGE[u.status] || 'bg-white text-neutral-800'
                        }`}>
                          {tStatus(u.status)}
                        </span>
                      </div>

                      <div className='absolute bottom-3 right-3 left-3'>
                        <p className='text-[11px] text-white/80 truncate'>{projectName} — {location}</p>
                        <h3 className='text-base text-white font-bold leading-tight'>
                          {tType(u.type)} {u.rooms ? `(${u.rooms} ${isRTL ? "غرف" : "Rooms"})` : ''}
                        </h3>
                      </div>
                    </div>

                    {/* Unit Specs Pills */}
                    <div className='p-5'>
                      <div className='grid grid-cols-2 gap-2 text-xs text-neutral-600 mb-4'>
                        <span className='flex items-center gap-1.5 bg-neutral-50 p-2 rounded-xl font-medium'>
                          <span className='material-symbols-outlined text-[#c9952a] text-[16px]'>straighten</span>
                          {formatArea(u.area)}
                        </span>
                        <span className='flex items-center gap-1.5 bg-neutral-50 p-2 rounded-xl font-medium'>
                          <span className='material-symbols-outlined text-[#c9952a] text-[16px]'>layers</span>
                          {u.floor === 0 ? (isRTL ? "الأرضي" : "Ground") : (isRTL ? `الدور ${u.floor ?? 1}` : `Floor ${u.floor ?? 1}`)}
                        </span>
                        <span className='flex items-center gap-1.5 bg-neutral-50 p-2 rounded-xl font-medium'>
                          <span className='material-symbols-outlined text-[#c9952a] text-[16px]'>construction</span>
                          {u.finishing || (isRTL ? 'تشطيب فاخر' : 'Luxury Finishing')}
                        </span>
                        <span className='flex items-center gap-1.5 bg-neutral-50 p-2 rounded-xl font-medium'>
                          <span className='material-symbols-outlined text-[#c9952a] text-[16px]'>bathtub</span>
                          {u.bathrooms ? `${u.bathrooms} ${isRTL ? "حمام" : "Baths"}` : (isRTL ? 'حمام فاخر' : 'Luxury Bath')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className='p-5 pt-0 border-t border-neutral-100 flex items-center justify-between mt-2'>
                    <div>
                      <p className='text-[10px] text-neutral-400'>{t("properties.price", "السعر الإجمالي")}</p>
                      <p className='text-sm font-extrabold text-[#000e1f] font-mono'>
                        {formatPrice(u.price)}
                      </p>
                    </div>
                    <Link
                      to={`/properties/${u._id}`}
                      className='inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-[#000e1f] text-neutral-800 hover:text-white text-xs font-bold transition-all shadow-sm'
                    >
                      <span>{t("properties.viewUnit", "تفاصيل الوحدة")}</span>
                      <span className={`material-symbols-outlined text-[15px] ${!isRTL ? "rotate-180" : ""}`}>
                        arrow_left_alt
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── 7. HEADQUARTERS LOCATION SHOWCASE ── */}
      <section className='max-w-7xl mx-auto px-6 lg:px-12 py-12 w-full'>
        <div className='bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#c9952a]/40 shadow-2xl relative overflow-hidden'>
          {/* Top golden prestige accent bar */}
          <div className='absolute top-0 left-0 right-0 h-2.5 pharaoh-gold-gradient' />

          <div className='flex flex-col lg:flex-row items-center justify-between gap-8 pt-2'>
            <div className='flex items-start gap-5'>
              <div className='w-16 h-16 rounded-2xl bg-[#000e1f] border-2 border-[#c9952a] text-[#f0d897] flex items-center justify-center flex-shrink-0 shadow-lg'>
                <span className='material-symbols-outlined text-[34px]'>domain</span>
              </div>
              <div className='flex flex-col'>
                <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-black mb-3 self-start shadow-sm'>
                  <span className='material-symbols-outlined text-[#c9952a] text-[16px]'>pin_drop</span>
                  <span>{t("contact.headquarters", "المقر الرئيسي لشركة مستقبل الفراعنة للاستثمار والتطوير العقاري")}</span>
                </div>
                <h3 className='text-2xl sm:text-3xl font-black text-[#000e1f] mb-3 leading-tight tracking-tight'>
                  {settings.companyAddress}
                </h3>
                <p className='text-sm sm:text-base text-neutral-700 font-semibold max-w-2xl leading-relaxed'>
                  {isRTL
                    ? "يسعدنا تشريفكم لزيارة مقرنا الرسمي بأسوان الجديدة للتعرف على أحدث المشاريع المعمارية ونماذج الوحدات السكنية والتجارية، والتشاور مباشرة مع مستشارينا في صالة كبار العملاء."
                    : "We are pleased to welcome your visit to our official headquarters in New Aswan to explore architectural projects, review residential mockups, and consult with our VIP advisors."}
                </p>
              </div>
            </div>

            {settings.googleMapsUrl && (
              <a
                href={settings.googleMapsUrl}
                target='_blank'
                rel='noreferrer'
                className='h-14 px-8 rounded-2xl font-black text-sm text-[#000e1f] flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-100 transition-all duration-300 whitespace-nowrap cursor-pointer flex-shrink-0 pharaoh-gold-gradient'
              >
                <span className='material-symbols-outlined text-[24px]'>map</span>
                <span>{isRTL ? "فتح الموقع في خرائط Google" : "Open Location in Google Maps"}</span>
                <span className='material-symbols-outlined text-[18px]'>open_in_new</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── 8. VIP REAL ESTATE ADVISORY / CONTACT FORM ── */}
      <section className='relative overflow-hidden bg-[#000e1f] py-16 lg:py-24 text-white'>
        <div className='absolute inset-0 bg-gradient-to-br from-[#000e1f] via-[#10243a] to-[#000e1f] opacity-95' />
        <div className={`absolute top-0 ${isRTL ? "left-0" : "right-0"} w-96 h-96 rounded-full bg-[#c9952a]/10 ${isRTL ? "-translate-x-1/2" : "translate-x-1/2"} -translate-y-1/2 blur-3xl pointer-events-none`} />

        <div className='relative max-w-7xl mx-auto px-6 lg:px-12'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            
            {/* Advisory Info */}
            <div>
              <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#f0d897] border border-white/15 text-xs font-bold mb-6'>
                <span className='material-symbols-outlined text-[16px]'>support_agent</span>
                {t("home.consultTitle", "استشارة عقارية مجانية ومتخصصة")}
              </div>
              <h2 className='text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4'>
                {isRTL ? (
                  <>تبحث عن وحدة بمواصفات معينة؟<br /><span className='text-[#f0d897]'>فريق كبار المستشارين جاهز لمساعدتك</span></>
                ) : (
                  <>Seeking a Specific Property?<br /><span className='text-[#f0d897]'>Senior Real Estate Advisors Ready to Assist</span></>
                )}
              </h2>
              <p className='text-sm sm:text-base text-white/75 leading-relaxed mb-8'>
                {t("home.consultSub", "اترك بياناتك وسيتواصل معك مستشار عقاري متخصص لمناقشة أفضل الفرص الاستثمارية التي تناسب خطتك المالية.")}
              </p>

              <div className='flex flex-col gap-3.5'>
                {[
                  isRTL ? 'تحديد أفضل الخيارات الاستثمارية المناسبة لميزانيتك بدقة' : 'Identifying optimal investment options matching your budget',
                  isRTL ? 'شرح كامل لخطط السداد، جداول الأقساط، والخصومات المتاحة' : 'Complete breakdown of payment terms, installments, and discounts',
                  isRTL ? 'تنسيق معاينات حية للمواقع والمشاريع الإنشائية على أرض الواقع' : 'Arranging on-site physical tours of construction developments',
                ].map((feat) => (
                  <div key={feat} className='flex items-center gap-3'>
                    <div className='w-6 h-6 rounded-full bg-[#c9952a]/20 border border-[#c9952a]/40 flex items-center justify-center flex-shrink-0 text-[#f0d897]'>
                      <span className='material-symbols-outlined text-[15px]'>check</span>
                    </div>
                    <span className='text-sm text-white/85'>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form Card */}
            <div className='bg-white text-neutral-900 rounded-3xl p-7 lg:p-9 shadow-2xl border border-neutral-100'>
              <h3 className='text-xl font-black text-[#000e1f] mb-1'>
                {isRTL ? "طلب استشارة عقارية خاصة" : "Request VIP Property Advisory"}
              </h3>
              <p className='text-xs text-neutral-500 mb-6'>
                {isRTL ? "سيتواصل معك مستشار استثماري مخصص خلال أقل من 15 دقيقة" : "A dedicated property consultant will contact you within 15 minutes"}
              </p>
              
              <form className='flex flex-col gap-4' onSubmit={handleConsultSubmit}>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-xs font-bold text-neutral-700'>
                    {t("home.namePlaceholder", "الاسم بالكامل")}
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      placeholder={isRTL ? "مثال: م. أحمد عبد العزيز" : "e.g., Eng. Ahmed"}
                      className={`w-full h-12 rounded-xl bg-neutral-50 border border-neutral-200 text-sm font-medium focus:outline-none focus:border-[#c9952a] focus:bg-white transition-all ${
                        isRTL ? "pr-4 pl-10" : "pl-4 pr-10"
                      }`}
                    />
                    <span className={`material-symbols-outlined absolute top-1/2 -translate-y-1/2 text-neutral-400 text-[20px] ${
                      isRTL ? "left-3" : "right-3"
                    }`}>
                      person
                    </span>
                  </div>
                </div>

                <div className='flex flex-col gap-1.5'>
                  <label className='text-xs font-bold text-neutral-700'>
                    {t("home.phonePlaceholder", "رقم الهاتف المحمول")}
                  </label>
                  <div className='relative'>
                    <input
                      type='tel'
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      placeholder='+20 100 000 0000'
                      dir='ltr'
                      className={`w-full h-12 rounded-xl bg-neutral-50 border border-neutral-200 text-sm font-mono focus:outline-none focus:border-[#c9952a] focus:bg-white transition-all ${
                        isRTL ? "pr-4 pl-10 text-right" : "pl-4 pr-10 text-left"
                      }`}
                    />
                    <span className={`material-symbols-outlined absolute top-1/2 -translate-y-1/2 text-neutral-400 text-[20px] ${
                      isRTL ? "left-3" : "right-3"
                    }`}>
                      call
                    </span>
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={consultSending}
                  className='w-full h-12 rounded-xl font-bold text-sm text-[#000e1f] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50'
                  style={{ background: 'linear-gradient(135deg, #f0d897 0%, #c9952a 50%, #b07d1f 100%)' }}
                >
                  <span>{consultSending ? t("home.sending", "جارٍ إرسال الطلب...") : t("home.requestConsult", "إرسال طلب الاستشارة")}</span>
                  <span className={`material-symbols-outlined text-[19px] ${!isRTL ? "rotate-180" : ""}`}>send</span>
                </button>

                <div className='flex items-center justify-center gap-1.5 text-neutral-400 text-[11px] pt-1'>
                  <span className='material-symbols-outlined text-[14px] text-emerald-600'>verified_user</span>
                  <span>{isRTL ? "بياناتك محمية ومحفوظة بأعلى درجات السرية والخصوصية" : "Your data is fully encrypted with highest bank-grade privacy"}</span>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
