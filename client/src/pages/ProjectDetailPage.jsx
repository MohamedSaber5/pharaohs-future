import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import projectService  from '@services/project.service.js';
import unitService     from '@services/unit.service.js';

const STATUS_COLORS = { "متاح":"bg-green-100 text-green-800","محجوز":"bg-amber-100 text-amber-800","مباع":"bg-red-100 text-red-800" };
const PH = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project,  setProject]  = useState(null);
  const [units,    setUnits]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError('');
      try {
        const [pr, un] = await Promise.all([
          projectService.getById(id),
          unitService.getAll({ project: id }),
        ]);
        setProject(pr?.data ?? pr);
        setUnits(un?.data ?? un ?? []);
      } catch { setError('تعذّر تحميل بيانات المشروع'); }
      finally   { setLoading(false); }
    };
    load();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-neutral-50 flex flex-col gap-6 p-8 animate-pulse">
      <div className="h-80 bg-neutral-200 rounded-2xl" />
      <div className="h-6 bg-neutral-200 rounded-lg w-1/2" />
      <div className="h-4 bg-neutral-200 rounded-lg w-3/4" />
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <span className="material-symbols-outlined text-[64px] text-neutral-300">error</span>
      <p className="text-[18px] font-bold text-neutral-600">{error || 'المشروع غير موجود'}</p>
      <Link to="/projects" className="h-10 px-6 rounded-xl bg-neutral-900 text-white text-[14px] font-bold">العودة للمشروعات</Link>
    </div>
  );

  const images = project.images?.length ? project.images : [PH];
  const availableUnits = units.filter(u => u.status === 'متاح');

  return (
    <div className="min-h-screen bg-neutral-50" dir="rtl">
      {/* Image Gallery */}
      <div className="relative bg-[#000e1f]">
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-[420px]">
            <div className="lg:col-span-2 rounded-2xl overflow-hidden relative group cursor-pointer">
              <img src={images[activeImg]} alt={project.name} className="w-full h-full object-cover" onError={e=>{e.target.src=PH}} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="hidden lg:flex flex-col gap-3">
              {images.slice(1,4).map((img,i) => (
                <div key={i} onClick={()=>setActiveImg(i+1)} className={`flex-1 rounded-xl overflow-hidden cursor-pointer transition-all ${activeImg===i+1?'ring-2 ring-amber-400':''}`}>
                  <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" onError={e=>{e.target.src=PH}} />
                </div>
              ))}
              {images.length > 4 && (
                <div className="flex-1 rounded-xl overflow-hidden relative cursor-pointer" onClick={()=>setActiveImg(4)}>
                  <img src={images[4]} className="w-full h-full object-cover" onError={e=>{e.target.src=PH}} />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-[18px]">+{images.length-4} صور</span>
                  </div>
                </div>
              )}
              {images.length === 1 && [1,2].map(i=>(
                <div key={i} className="flex-1 rounded-xl bg-neutral-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-neutral-600 text-[32px]">image</span>
                </div>
              ))}
            </div>
          </div>

          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {images.map((img,i)=>(
                <button key={i} onClick={()=>setActiveImg(i)} className={`w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all ${activeImg===i?'ring-2 ring-amber-400 scale-105':''}`}>
                  <img src={img} className="w-full h-full object-cover" onError={e=>{e.target.src=PH}} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-10 flex flex-col lg:flex-row gap-10">
        {/* Main content */}
        <div className="flex-1 flex flex-col gap-8">

          {/* Title + badges */}
          <div>
            <div className="flex items-center gap-2 text-[13px] text-neutral-500 mb-2 flex-wrap">
              <Link to="/projects" className="hover:text-neutral-800 transition-colors">المشروعات</Link>
              <span>›</span>
              <span className="text-neutral-800 font-semibold">{project.name}</span>
            </div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-[13px] font-bold ${
                project.status==="مكتمل"?"bg-green-100 text-green-800":
                project.status==="تحت الإنشاء"?"bg-blue-100 text-blue-800":
                "bg-amber-100 text-amber-800"
              }`}>{project.status}</span>
              {project.type && <span className="px-3 py-1 rounded-full text-[13px] font-medium bg-neutral-100 text-neutral-700">{project.type}</span>}
            </div>
            <h1 className="text-[30px] md:text-[40px] font-bold text-neutral-900 leading-tight mb-1">{project.name}</h1>
            {project.nameEn && <p className="text-[16px] text-neutral-400 mb-3">{project.nameEn}</p>}
            <div className="flex items-center gap-2 text-neutral-600 text-[15px]">
              <span className="material-symbols-outlined text-[18px]" style={{color:'#775a1a'}}>location_on</span>
              {project.location}
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-neutral-800">نسبة الإنجاز</p>
              <p className="text-[24px] font-bold" style={{color:'#775a1a'}}>{project.progress||0}%</p>
            </div>
            <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{width:(project.progress||0)+'%',background:'linear-gradient(90deg,#775a1a,#c9952a)'}} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-5">
              {[
                {label:"المساحة الكلية",  value:project.totalArea?project.totalArea+" م²":"—"},
                {label:"إجمالي الوحدات", value:(project.unitCount??project.totalUnits??0)+" وحدة"},
                {label:"موعد التسليم",   value:project.delivery||"—"},
              ].map(s=>(
                <div key={s.label} className="text-center">
                  <p className="text-[11px] text-neutral-400 mb-0.5">{s.label}</p>
                  <p className="text-[15px] font-bold text-neutral-800">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <div className="bg-white rounded-2xl border border-neutral-100 p-5 shadow-sm">
              <h2 className="text-[18px] font-bold text-neutral-900 mb-3">عن المشروع</h2>
              <p className="text-[15px] text-neutral-600 leading-relaxed">{project.description}</p>
            </div>
          )}

          {/* Units */}
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <h2 className="text-[18px] font-bold text-neutral-900">الوحدات المتاحة</h2>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-[13px] font-bold">{availableUnits.length} متاحة</span>
            </div>
            {units.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-14 text-center">
                <span className="material-symbols-outlined text-[48px] text-neutral-300 mb-3">holiday_village</span>
                <p className="text-[16px] font-bold text-neutral-600 mb-1">لا توجد وحدات مضافة بعد</p>
                <p className="text-[13px] text-neutral-400">يتم حالياً إعداد قائمة الوحدات</p>
              </div>
            ) : (
              <div className="p-4 flex flex-col gap-3">
                {units.map(u=>(
                  <Link to={'/properties/'+u._id} key={u._id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 hover:border-amber-300 hover:shadow-md transition-all group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'rgba(119,90,26,0.1)'}}>
                      <span className="material-symbols-outlined text-[22px]" style={{color:'#775a1a'}}>holiday_village</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-bold text-neutral-800">{u.type} — {u.area} م²</p>
                      <p className="text-[12px] text-neutral-500">الدور {u.floor} | {u.rooms||'—'} غرف | {u.finishing}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <p className="text-[15px] font-bold text-neutral-900">{Number(u.price).toLocaleString()} <span className="text-[12px] font-normal text-neutral-400">ج.م</span></p>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${STATUS_COLORS[u.status]||"bg-neutral-100 text-neutral-600"}`}>{u.status}</span>
                    </div>
                    <span className="material-symbols-outlined text-neutral-300 group-hover:text-amber-600 transition-colors">arrow_left_alt</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 flex flex-col gap-5 flex-shrink-0">
          {/* Price card */}
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5 sticky top-24">
            <p className="text-[13px] text-neutral-500 mb-1">السعر يبدأ من</p>
            <p className="text-[28px] font-bold text-neutral-900 mb-0.5">
              {project.startPrice ? Number(project.startPrice).toLocaleString() : "اتصل بنا"}
              {project.startPrice>0 && <span className="text-[16px] font-normal text-neutral-400 mr-1">ج.م</span>}
            </p>
            {project.license && <p className="text-[12px] text-neutral-400 mb-4">ترخيص: {project.license}</p>}
            <Link to={'/projects/'+id+'/units'} onClick={e=>{e.preventDefault();document.querySelector('#units-section')?.scrollIntoView({behavior:'smooth'})}}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl font-bold text-white text-[15px] hover:opacity-90 transition-all shadow-md"
              style={{background:'#000e1f'}}>
              <span className="material-symbols-outlined text-[20px]">holiday_village</span>استعرض الوحدات
            </Link>
            <Link to="/contact" className="mt-3 w-full h-11 flex items-center justify-center gap-2 rounded-xl font-semibold text-neutral-700 text-[14px] hover:bg-neutral-100 transition-all border border-neutral-200">
              <span className="material-symbols-outlined text-[18px]">call</span>تواصل معنا
            </Link>
          </div>

          {/* Info card */}
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-5">
            <h3 className="font-bold text-neutral-900 mb-4">معلومات المشروع</h3>
            <div className="flex flex-col gap-3">
              {[
                {icon:"apartment",       label:"المطوّر",     value:project.developer||"مستقبل الفراعنة"},
                {icon:"verified",        label:"الحالة",      value:project.status},
                {icon:"straighten",      label:"المساحة",    value:project.totalArea?project.totalArea+" م²":"—"},
                {icon:"event_available", label:"التسليم",     value:project.delivery||"—"},
              ].map(i=>(
                <div key={i.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{background:'rgba(119,90,26,0.1)'}}>
                    <span className="material-symbols-outlined text-[18px]" style={{color:'#775a1a'}}>{i.icon}</span>
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-400">{i.label}</p>
                    <p className="text-[13px] font-semibold text-neutral-800">{i.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}