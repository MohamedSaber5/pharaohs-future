import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import unitService from '@services/unit.service.js';

const STATUS_STYLE = {
  "متاح":  "bg-green-100 text-green-800",
  "محجوز": "bg-amber-100 text-amber-800",
  "مباع":  "bg-red-100 text-red-800",
};
const PH = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80";

function UnitCard({ u }) {
  const img = u.images?.[0] || PH;
  const proj = u.project;
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img src={img} alt={u.type} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={e=>{e.target.src=PH}} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[12px] font-bold ${STATUS_STYLE[u.status]||"bg-neutral-100 text-neutral-700"}`}>{u.status}</span>
        <div className="absolute bottom-3 right-3">
          <p className="text-[11px] text-white/70">{proj?.name}</p>
          <p className="text-[13px] font-bold text-white">{proj?.location}</p>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[16px] font-bold text-neutral-900 mb-1">{u.type}</h3>
        <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-neutral-100">
          {[
            {i:"straighten",     v:u.area+"م²"},
            {i:"layers",         v:"دور "+u.floor},
            {i:"bed",            v:(u.rooms||0)+" غرف"},
          ].map(m=>(
            <div key={m.i} className="flex flex-col items-center text-center gap-0.5">
              <span className="material-symbols-outlined text-[18px]" style={{color:'#775a1a'}}>{m.i}</span>
              <span className="text-[12px] font-semibold text-neutral-700">{m.v}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-[11px] text-neutral-400">السعر</p>
            <p className="text-[17px] font-bold text-neutral-900">{Number(u.price).toLocaleString()} <span className="text-[12px] font-normal text-neutral-400">ج.م</span></p>
          </div>
          <Link to={"/properties/"+u._id}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-[13px] font-bold text-white hover:opacity-90 transition-all"
            style={{background:u.status==="متاح"?"#000e1f":"#6b7280"}}>
            {u.status==="متاح" ? "احجز" : "تفاصيل"}
            <span className="material-symbols-outlined text-[16px]">arrow_left_alt</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  const [units,    setUnits]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [status,   setStatus]   = useState('الكل');
  const [type,     setType]     = useState('الكل');
  const [project,  setProject]  = useState('الكل');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = {};
        if (status  !== 'الكل')  params.status  = status;
        if (search) params.search = search;
        const res = await unitService.getAll(params);
        setUnits(res?.data ?? res ?? []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();
  }, [status, search]);

  const projects = ['الكل', ...new Set(units.map(u=>u.project?.name).filter(Boolean))];
  const types    = ['الكل', ...new Set(units.map(u=>u.type).filter(Boolean))];

  const filtered = units.filter(u => {
    if (type    !== 'الكل' && u.type           !== type)           return false;
    if (project !== 'الكل' && u.project?.name  !== project)        return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-50" dir="rtl">
      {/* Hero */}
      <div className="relative bg-[#000e1f] overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{backgroundImage:"url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80')",backgroundSize:"cover",backgroundPosition:"center"}} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{background:"rgba(201,149,42,0.15)",border:"1px solid rgba(201,149,42,0.3)"}}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{background:"#c9952a"}} />
            <span className="text-[12px] font-semibold uppercase tracking-widest" style={{color:"#c9952a"}}>الوحدات المتاحة</span>
          </div>
          <h1 className="text-white font-bold text-[36px] md:text-[48px] leading-tight mb-3">الوحدات المتاحة</h1>
          <p className="text-white/60 text-[17px] max-w-lg">اختر وحدتك المثالية من بين مجموعتنا المتنوعة في أرقى المشروعات</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col gap-7">
        {/* Filters bar */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="relative flex-1">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="بحث..."
              className="w-full h-11 pr-10 pl-4 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 focus:border-[#775a1a] transition-all" />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[20px]">search</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {["الكل","متاح","محجوز","مباع"].map(s=>(
              <button key={s} onClick={()=>setStatus(s)}
                className={`h-9 px-4 rounded-lg text-[13px] font-semibold transition-all ${status===s?"text-white":"text-neutral-500 bg-neutral-100 hover:bg-neutral-200"}`}
                style={status===s?{background:"#000e1f"}:{}}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary filters */}
        <div className="flex items-center gap-3 flex-wrap">
          {projects.length > 1 && projects.map(p=>(
            <button key={p} onClick={()=>setProject(p)}
              className={`h-8 px-3.5 rounded-full text-[12px] font-semibold transition-all ${project===p?"text-white":"text-neutral-600 bg-white border border-neutral-200 hover:border-[#775a1a]"}`}
              style={project===p?{background:"#775a1a"}:{}}>
              <span className="material-symbols-outlined text-[14px] align-middle ml-1">apartment</span>{p}
            </button>
          ))}
        </div>

        {/* Count */}
        {!loading && (
          <p className="text-[14px] text-neutral-500">
            عرض <span className="font-bold text-neutral-800">{filtered.length}</span> وحدة
            {status!=="الكل" && <span className="text-[#775a1a] font-semibold"> — {status}</span>}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i=>(
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm">
                <div className="h-48 bg-neutral-100 animate-pulse" />
                <div className="p-5 flex flex-col gap-3">
                  <div className="h-4 bg-neutral-100 animate-pulse rounded-lg w-2/3" />
                  <div className="h-4 bg-neutral-100 animate-pulse rounded-lg w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-neutral-100">
            <span className="material-symbols-outlined text-[64px] text-neutral-300 mb-4">holiday_village</span>
            <h3 className="text-[20px] font-bold text-neutral-700 mb-2">لا توجد وحدات</h3>
            <p className="text-[14px] text-neutral-400 mb-5">لا توجد وحدات تطابق معايير البحث</p>
            <button onClick={()=>{setStatus('الكل');setType('الكل');setProject('الكل');setSearch('');}}
              className="h-10 px-6 rounded-xl font-bold text-white text-[13px] hover:opacity-90" style={{background:'#000e1f'}}>
              إعادة ضبط الفلاتر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(u => <UnitCard key={u._id} u={u} />)}
          </div>
        )}
      </div>
    </div>
  );
}