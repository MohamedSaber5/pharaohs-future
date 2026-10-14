import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectService from '@services/project.service.js';

const STATUS_COLORS = { "قيد البيع":"bg-amber-100 text-amber-800","مكتمل":"bg-green-100 text-green-800","تحت الإنشاء":"bg-blue-100 text-blue-800" };

function ProjectCard({ p }) {
  const img = p.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80";
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-lg transition-all group flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <img src={img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
          <span className={`px-2.5 py-1 rounded-full text-[12px] font-bold ${STATUS_COLORS[p.status]||"bg-neutral-100 text-neutral-700"}`}>{p.status}</span>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-20 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width:(p.progress||0)+"%" }} />
            </div>
            <span className="text-white text-[11px] font-bold">{p.progress||0}%</span>
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-[13px] text-neutral-500 mb-2">
          <span className="material-symbols-outlined text-[16px]" style={{ color:"#775a1a" }}>location_on</span>{p.location}
        </div>
        <h3 className="text-[17px] font-bold text-neutral-900 mb-1 leading-tight">{p.name}</h3>
        {p.nameEn && <p className="text-[12px] text-neutral-400 mb-3">{p.nameEn}</p>}
        <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-neutral-100 text-center">
          {[
            {i:"straighten",      l:"المساحة",  v:(p.totalArea?p.totalArea+"م²":"—")},
            {i:"holiday_village", l:"الوحدات",  v:(p.unitCount??p.totalUnits??0)+" وحدة"},
            {i:"event_available", l:"التسليم",  v:p.delivery||"—"},
          ].map(m=>(
            <div key={m.l} className="flex flex-col items-center gap-0.5">
              <span className="material-symbols-outlined text-[18px]" style={{ color:"#775a1a" }}>{m.i}</span>
              <span className="text-[11px] text-neutral-400">{m.l}</span>
              <span className="text-[12px] font-bold text-neutral-800 leading-tight">{m.v}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-[11px] text-neutral-400">سعر يبدأ من</p>
            <p className="text-[16px] font-bold" style={{ color:"#000e1f" }}>
              {p.startPrice ? Number(p.startPrice).toLocaleString() : "اتصل بنا"}
              {p.startPrice > 0 && <span className="text-[12px] text-neutral-400 font-normal mr-1">ج.م</span>}
            </p>
          </div>
          <Link to={"/projects/"+p._id}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-bold text-white hover:opacity-90 transition-all"
            style={{ background:"#000e1f" }}>
            عرض <span className="material-symbols-outlined text-[16px]">arrow_left_alt</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [status,   setStatus]   = useState('الكل');
  const [type,     setType]     = useState('الكل');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = {};
        if (status !== 'الكل') params.status = status;
        if (search) params.search = search;
        const res = await projectService.getAll(params);
        setProjects(res?.data ?? res ?? []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [status, search]);

  const types   = ['الكل', ...new Set(projects.map(p=>p.type).filter(Boolean))];
  const filtered = type === 'الكل' ? projects : projects.filter(p => p.type === type);

  return (
    <div className="flex flex-col bg-neutral-50 min-h-screen" dir="rtl">
      {/* Hero */}
      <div className="relative bg-[#000e1f] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage:"url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80')",backgroundSize:"cover",backgroundPosition:"center" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background:"rgba(201,149,42,0.15)",border:"1px solid rgba(201,149,42,0.3)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:"#c9952a" }} />
            <span className="text-[12px] font-semibold uppercase tracking-widest" style={{ color:"#c9952a" }}>محفظتنا العقارية</span>
          </div>
          <h1 className="text-white font-bold text-[36px] md:text-[52px] leading-tight mb-4">مشروعاتنا</h1>
          <p className="text-white/60 text-[18px] max-w-xl">اكتشف مجموعة مشروعاتنا المتميزة في أرقى مناطق مصر</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 w-full flex flex-col gap-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="relative flex-1">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث عن مشروع..."
              className="w-full h-11 pr-10 pl-4 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] transition-all" />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[20px]">search</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {["الكل","قيد البيع","تحت الإنشاء","مكتمل"].map(s=>(
              <button key={s} onClick={()=>setStatus(s)}
                className={`h-9 px-4 rounded-lg text-[13px] font-semibold transition-all ${status===s?"text-white":"text-neutral-500 bg-neutral-100 hover:bg-neutral-200"}`}
                style={status===s?{background:"#000e1f"}:{}}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Type filter */}
        {types.length > 1 && (
          <div className="flex items-center gap-2 flex-wrap">
            {types.map(t=>(
              <button key={t} onClick={()=>setType(t)}
                className={`h-8 px-3.5 rounded-full text-[12px] font-semibold transition-all ${type===t?"text-white":"text-neutral-600 bg-white border border-neutral-200 hover:border-[#775a1a] hover:text-[#775a1a]"}`}
                style={type===t?{background:"#775a1a"}:{}}>
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i=>(
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm">
                <div className="h-52 bg-neutral-100 animate-pulse" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-4 bg-neutral-100 animate-pulse rounded-lg w-3/4" />
                  <div className="h-4 bg-neutral-100 animate-pulse rounded-lg w-1/2" />
                  <div className="h-8 bg-neutral-100 animate-pulse rounded-lg mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="material-symbols-outlined text-[64px] text-neutral-300 mb-4">search_off</span>
            <h3 className="text-[20px] font-bold text-neutral-700 mb-2">لا توجد مشروعات</h3>
            <p className="text-[14px] text-neutral-400">جرّب تغيير معايير البحث</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => <ProjectCard key={p._id} p={p} />)}
          </div>
        )}

        {/* Stats bar */}
        {!loading && filtered.length > 0 && (
          <div className="text-center text-[14px] text-neutral-400">
            يتم عرض <span className="font-bold text-neutral-700">{filtered.length}</span> مشروع
          </div>
        )}
      </div>
    </div>
  );
}