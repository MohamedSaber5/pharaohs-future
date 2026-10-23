import { getImageUrl } from "@utils/imageHelper.js";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@context/LanguageContext.jsx';
import projectService from '@services/project.service.js';
import { PyramidIcon, PharaohPatternBackground } from "@components/ui/PharaohIcons.jsx";

const STATUS_BADGE = {
  'تحت الإنشاء': 'bg-blue-500/15 text-blue-300 border-blue-400/30',
  'قيد البيع': 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  'مكتمل': 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
};

function ProjectCard({ p }) {
  const { t, isRTL, tStatus, formatPrice, formatArea } = useLanguage();
  const img = p.images?.[0] ? getImageUrl(p.images[0]) : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80";

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between">
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
          <img
            src={img}
            alt={p.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000e1f]/85 via-transparent to-transparent" />
          
          <div className={`absolute top-3.5 ${isRTL ? "right-3.5" : "left-3.5"} flex items-center gap-2`}>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${
              STATUS_BADGE[p.status] || "bg-white/90 text-neutral-800"
            }`}>
              {tStatus(p.status)}
            </span>
          </div>

          <div className="absolute bottom-3 right-3.5 left-3.5 flex items-end justify-between">
            <div>
              <p className="text-xs text-white/80 flex items-center gap-1 mb-0.5">
                <span className="material-symbols-outlined text-[#f0d897] text-[15px]">location_on</span>
                {p.location}
              </p>
              <h3 className="text-lg font-black text-white leading-tight">{p.name}</h3>
            </div>

            {p.progress > 0 && (
              <div className="flex flex-col items-end gap-1">
                <div className="h-2 w-20 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full pharaoh-gold-gradient rounded-full" style={{ width: `${p.progress || 0}%` }} />
                </div>
                <span className="text-[11px] font-bold text-[#f0d897] font-mono">{p.progress}%</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-2 pb-4 mb-4 border-b border-neutral-100 text-center">
            {[
              { i: "straighten", l: t("properties.area", "المساحة"), v: p.totalArea ? formatArea(p.totalArea) : "—" },
              { i: "holiday_village", l: t("projects.unitsCount", "الوحدات"), v: `${p.unitCount ?? p.totalUnits ?? 0} ${isRTL ? "وحدة" : "units"}` },
              { i: "event_available", l: t("projects.delivery", "التسليم"), v: p.delivery || "—" },
            ].map((m) => (
              <div key={m.l} className="flex flex-col items-center gap-0.5 bg-neutral-50/70 p-2.5 rounded-2xl">
                <span className="material-symbols-outlined text-[18px] text-[#c9952a]">{m.i}</span>
                <span className="text-[10px] text-neutral-500 font-medium">{m.l}</span>
                <span className="text-xs font-bold text-neutral-900 leading-tight">{m.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-neutral-400 font-bold">{t("projects.startingFrom", "يبدأ السعر من")}</p>
          <p className="text-base font-black text-[#000e1f] font-mono">
            {p.startPrice ? formatPrice(p.startPrice) : (isRTL ? "اتصل بنا" : "Contact Us")}
          </p>
        </div>
        <Link
          to={`/projects/${p._id}`}
          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-xs font-bold text-white transition-all shadow-md hover:opacity-95"
          style={{ background: "#000e1f" }}
        >
          <span>{t("projects.viewDetails", "عرض المشروع")}</span>
          <span className={`material-symbols-outlined text-[16px] ${!isRTL ? "rotate-180" : ""}`}>
            arrow_left_alt
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const { t, isRTL, dir } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [status,   setStatus]   = useState('all');
  const [type,     setType]     = useState('all');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = {};
        if (status !== 'all') params.status = status;
        if (search) params.search = search;
        const res = await projectService.getAll(params);
        setProjects(res?.data ?? res ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [status, search]);

  const types   = ['all', ...new Set(projects.map((p) => p.type).filter(Boolean))];
  const filtered = type === 'all' ? projects : projects.filter((p) => p.type === type);

  const statusFilters = [
    { key: "all", label: t("projects.all", "الكل") },
    { key: "قيد البيع", label: t("projects.forSale", "قيد البيع") },
    { key: "تحت الإنشاء", label: t("projects.underConstruction", "تحت الإنشاء") },
    { key: "مكتمل", label: t("projects.completed", "مكتمل") },
  ];

  return (
    <div className="flex flex-col bg-[#f8f9fc] min-h-screen text-neutral-900" dir={dir}>
      
      {/* ── HERO BANNER ── */}
      <div className="relative bg-[#000e1f] overflow-hidden border-b border-[#c9952a]/20">
        <PharaohPatternBackground className="opacity-10" />

        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#c9952a]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#775a1a]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-3 bg-white/10 backdrop-blur-md border border-[#c9952a]/40 shadow-sm">
            <PyramidIcon className="w-4 h-4 text-[#f0d897]" />
            <span className="text-xs font-bold text-[#f0d897] tracking-wider">
              {isRTL ? "صرح الفراعنة — المحفظة والمشاريع العقارية الكبرى" : "Pharaohs Landmark — Mega Real Estate Portfolio"}
            </span>
          </div>

          <h1 className="text-white font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-3">
            {t("projects.title", "المشروعات السكنية والاستثمارية")}
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed">
            {t("projects.subtitle", "اكتشف مشاريعنا الاستثنائية المطورة بأعلى معايير الهندسة والفخامة في أرقى المدن والمواقع بمصر.")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full flex flex-col gap-8">
        
        {/* ── SEARCH & STATUS FILTERS ── */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-5 flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="relative flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isRTL ? "ابحث عن مشروع أو موقع استراتيجي..." : "Search for a project or location..."}
              className={`w-full h-12 rounded-2xl border border-neutral-200 text-sm font-medium outline-none bg-neutral-50 focus:border-[#c9952a] focus:bg-white transition-all text-neutral-900 ${
                isRTL ? "pr-11 pl-4" : "pl-11 pr-4"
              }`}
            />
            <span className={`material-symbols-outlined absolute top-1/2 -translate-y-1/2 text-neutral-400 text-[22px] ${
              isRTL ? "right-3.5" : "left-3.5"
            }`}>
              search
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {statusFilters.map((s) => (
              <button
                key={s.key}
                onClick={() => setStatus(s.key)}
                className={`h-11 px-5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  status === s.key
                    ? "bg-[#000e1f] text-white shadow-md shadow-[#000e1f]/20"
                    : "text-neutral-700 bg-neutral-100 hover:bg-neutral-200/80"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── TYPE PILLS ── */}
        {types.length > 1 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-neutral-500">{t("home.typeLabel", "نوع العقار:")}</span>
            {types.map((tKey) => (
              <button
                key={tKey}
                onClick={() => setType(tKey)}
                className={`h-8 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  type === tKey
                    ? "bg-[#c9952a] text-[#000e1f] shadow-sm"
                    : "text-neutral-700 bg-white border border-neutral-200 hover:border-[#c9952a]"
                }`}
              >
                {tKey === "all" ? t("projects.all", "الكل") : tKey}
              </button>
            ))}
          </div>
        )}

        {/* ── PROJECTS GRID ── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-neutral-100 animate-pulse shadow-sm h-80" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-16 text-center shadow-sm flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[42px] text-neutral-400">apartment</span>
            </div>
            <h3 className="text-lg font-bold text-neutral-800 mb-1">{t("projects.notFound", "لا توجد مشروعات مطابقة")}</h3>
            <p className="text-xs text-neutral-500">{isRTL ? "جرّب تغيير كلمات البحث أو اختيار مرحلة أخرى من الفلاتر" : "Try changing your search terms or filter selection"}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProjectCard key={p._id} p={p} />
            ))}
          </div>
        )}

        {/* Stats bar */}
        {!loading && filtered.length > 0 && (
          <div className="text-center text-xs font-bold text-neutral-500">
            {isRTL ? (
              <>يتم عرض <span className="text-[#c9952a] font-mono text-sm">{filtered.length}</span> مشروع معتمد</>
            ) : (
              <>Displaying <span className="text-[#c9952a] font-mono text-sm">{filtered.length}</span> certified developments</>
            )}
          </div>
        )}

      </div>
    </div>
  );
}