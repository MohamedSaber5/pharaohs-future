import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import unitService from "@services/unit.service.js";
import projectService from "@services/project.service.js";
import { getImageUrl } from "@utils/imageHelper.js";
import { PyramidIcon, PharaohPatternBackground, LotusIcon } from "@components/ui/PharaohIcons.jsx";

const PH = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80";

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State
  const [selectedProject, setSelectedProject] = useState(searchParams.get("project") || "");
  const [building, setBuilding] = useState(searchParams.get("building") || "");
  const [floor, setFloor] = useState(searchParams.get("floor") || "");
  const [rooms, setRooms] = useState(searchParams.get("rooms") || "");
  const [minArea, setMinArea] = useState(searchParams.get("minArea") || "");
  const [maxArea, setMaxArea] = useState(searchParams.get("maxArea") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // Sorting & Pagination
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "createdAt");
  const [sortDir, setSortDir] = useState(searchParams.get("sortDir") || "desc");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  // Data
  const [units, setUnits] = useState([]);
  const [projects, setProjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch projects list for dropdown
  useEffect(() => {
    projectService
      .getAll({ limit: 100 })
      .then((res) => {
        const list = res?.data?.projects ?? res?.data ?? res ?? [];
        setProjects(Array.isArray(list) ? list : []);
      })
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  // Fetch units
  const fetchUnits = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        status: "متاح",
        page,
        limit: 9,
        sortBy,
        sortDir,
      };

      if (selectedProject) params.project = selectedProject;
      if (building) params.building = building;
      if (floor) params.floor = floor;
      if (rooms) params.rooms = rooms;
      if (minArea) params.minArea = minArea;
      if (maxArea) params.maxArea = maxArea;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await unitService.getAll(params);
      const data = res?.data ?? res;

      if (data?.units) {
        setUnits(data.units);
        setTotal(data.total || data.units.length);
        setTotalPages(data.pages || 1);
      } else if (Array.isArray(data)) {
        const available = data.filter((u) => u.status === "متاح");
        setUnits(available);
        setTotal(available.length);
        setTotalPages(Math.ceil(available.length / 9) || 1);
      } else {
        setUnits([]);
        setTotal(0);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Error fetching units:", err);
      setUnits([]);
    } finally {
      setLoading(false);
    }
  }, [selectedProject, building, floor, rooms, minArea, maxArea, minPrice, maxPrice, sortBy, sortDir, page]);

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  // Reset all filters
  const handleReset = () => {
    setSelectedProject("");
    setBuilding("");
    setFloor("");
    setRooms("");
    setMinArea("");
    setMaxArea("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("createdAt");
    setSortDir("desc");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-neutral-900" dir="rtl">
      
      {/* ── HEADER BANNER ── */}
      <div className="relative bg-[#000e1f] text-white pt-32 pb-16 px-6 lg:px-12 overflow-hidden border-b border-[#c9952a]/20">
        <PharaohPatternBackground className="opacity-10" />

        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#c9952a]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#775a1a]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-3 bg-white/10 backdrop-blur-md border border-[#c9952a]/40 shadow-sm">
            <PyramidIcon className="w-4 h-4 text-[#f0d897]" />
            <span className="text-xs font-bold text-[#f0d897] tracking-wider">
              صرح الفراعنة — قائمة الوحدات المتاحة للحجز والتعاقد الفوري
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-3">
            ابحث عن وحدتك العقارية الاستثنائية
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-3xl leading-relaxed">
            استعرض باقة مختارة من أرقى الوحدات السكنية والتجارية مع إمكانية التصفية الدقيقة وفق المشروع، المساحة، عدد الغرف، ونطاق السعر.
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm sticky top-28">
              
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#c9952a]">tune</span>
                  <h2 className="text-base font-black text-neutral-900">تصفية الوحدات</h2>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs font-bold text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  إعادة ضبط
                </button>
              </div>

              <div className="flex flex-col gap-4">
                
                {/* Compound / Project */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    المشروع / الصرح العقاري
                  </label>
                  <div className="relative">
                    <select
                      value={selectedProject}
                      onChange={(e) => {
                        setSelectedProject(e.target.value);
                        setPage(1);
                      }}
                      className="w-full h-11 pr-3.5 pl-9 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="">جميع المشاريع</option>
                      {projects.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name} {p.location ? `(${p.location})` : ""}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[18px]">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Building */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    المبنى / العمارة
                  </label>
                  <input
                    type="text"
                    value={building}
                    onChange={(e) => {
                      setBuilding(e.target.value);
                      setPage(1);
                    }}
                    placeholder="مثال: عمارة B3 أو برج الأمل"
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all"
                  />
                </div>

                {/* Floor & Rooms */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      الطابق
                    </label>
                    <div className="relative">
                      <select
                        value={floor}
                        onChange={(e) => {
                          setFloor(e.target.value);
                          setPage(1);
                        }}
                        className="w-full h-11 pr-3 pl-8 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="">الكل</option>
                        <option value="0">الأرضي</option>
                        <option value="1">الأول</option>
                        <option value="2">الثاني</option>
                        <option value="3">الثالث</option>
                        <option value="4">الرابع</option>
                        <option value="5">الخامس+</option>
                      </select>
                      <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[18px]">
                        expand_more
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      الغرف
                    </label>
                    <div className="relative">
                      <select
                        value={rooms}
                        onChange={(e) => {
                          setRooms(e.target.value);
                          setPage(1);
                        }}
                        className="w-full h-11 pr-3 pl-8 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="">الكل</option>
                        <option value="1">1 غرفة</option>
                        <option value="2">2 غرفة</option>
                        <option value="3">3 غرف</option>
                        <option value="4">4+ غرف</option>
                      </select>
                      <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-[18px]">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                {/* Area Range */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    المساحة (م²)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="من"
                      value={minArea}
                      onChange={(e) => {
                        setMinArea(e.target.value);
                        setPage(1);
                      }}
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-mono text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white"
                    />
                    <input
                      type="number"
                      placeholder="إلى"
                      value={maxArea}
                      onChange={(e) => {
                        setMaxArea(e.target.value);
                        setPage(1);
                      }}
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-mono text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                    نطاق السعر (ج.م.)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="أدنى سعر"
                      value={minPrice}
                      onChange={(e) => {
                        setMinPrice(e.target.value);
                        setPage(1);
                      }}
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-mono text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white"
                    />
                    <input
                      type="number"
                      placeholder="أعلى سعر"
                      value={maxPrice}
                      onChange={(e) => {
                        setMaxPrice(e.target.value);
                        setPage(1);
                      }}
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-mono text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Main Grid Area */}
          <div className="lg:col-span-3">
            
            {/* Top Bar: Results Count + Sorting */}
            <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-neutral-700 font-bold">
                <span>تم العثور على</span>
                <span className="font-extrabold text-[#c9952a] text-base font-mono">{total}</span>
                <span>وحدة سكنية وتجارية متاحة</span>
              </div>

              {/* Sorting */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 font-bold whitespace-nowrap">ترتيب حسب:</span>
                <select
                  value={`${sortBy}-${sortDir}`}
                  onChange={(e) => {
                    const [sb, sd] = e.target.value.split("-");
                    setSortBy(sb);
                    setSortDir(sd);
                    setPage(1);
                  }}
                  className="h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-800 outline-none focus:border-[#c9952a] cursor-pointer"
                >
                  <option value="createdAt-desc">الأحدث إضافة</option>
                  <option value="price-asc">السعر: من الأقل للأعلى</option>
                  <option value="price-desc">السعر: من الأعلى للأقل</option>
                  <option value="area-asc">المساحة: من الأصغر للأكبر</option>
                  <option value="area-desc">المساحة: من الأكبر للأصغر</option>
                </select>
              </div>
            </div>

            {/* Units List */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-80 bg-white rounded-3xl border border-neutral-100 animate-pulse shadow-sm" />
                ))}
              </div>
            ) : units.length === 0 ? (
              <div className="bg-white rounded-3xl border border-neutral-200/90 p-16 text-center shadow-sm">
                <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-[40px] text-neutral-400">filter_alt_off</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">لا توجد وحدات مطابقة للخيارات</h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto mb-6">
                  لم نتمكن من العثور على وحدات تطابق هذه المعايير. يمكنك توسيع نطاق البحث أو الضغط على إعادة الضبط.
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-xl font-bold text-white text-xs cursor-pointer shadow-md"
                  style={{ background: "#000e1f" }}
                >
                  <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                  <span>إعادة ضبط الفلاتر</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {units.map((u) => {
                  const img = u.images?.[0]
                    ? getImageUrl(u.images[0])
                    : u.project?.images?.[0]
                    ? getImageUrl(u.project.images[0])
                    : PH;
                  const proj = u.project;

                  return (
                    <div
                      key={u._id}
                      className="bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Image Header */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                          <img
                            src={img}
                            alt={u.type}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                              e.target.src = PH;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />

                          {/* Available Badge */}
                          <div className="absolute top-3.5 right-3.5">
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-md flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              متاح للحجز
                            </span>
                          </div>

                          {/* Project Name & Location */}
                          <div className="absolute bottom-3 right-3.5 left-3.5">
                            <p className="text-xs text-[#f0d897] font-bold truncate">
                              {proj?.name || "مشروع مميز"}
                            </p>
                            <p className="text-xs text-white/90 font-medium flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">location_on</span>
                              {proj?.location || u.building || "مصر"}
                            </p>
                          </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-base font-extrabold text-neutral-900 group-hover:text-[#c9952a] transition-colors">
                              {u.type}
                            </h3>
                            {u.building && (
                              <span className="text-[11px] font-bold bg-neutral-100 text-neutral-700 px-2.5 py-0.5 rounded-lg border border-neutral-200">
                                {u.building}
                              </span>
                            )}
                          </div>

                          {/* Specs Grid */}
                          <div className="grid grid-cols-3 gap-2 py-3 mb-3 border-y border-neutral-100 text-center">
                            <div className="flex flex-col items-center bg-neutral-50/70 p-2 rounded-xl">
                              <span className="material-symbols-outlined text-[18px] text-[#c9952a] mb-0.5">straighten</span>
                              <span className="text-xs font-bold text-neutral-900 font-mono">{u.area} م²</span>
                              <span className="text-[10px] text-neutral-500 font-medium">المساحة</span>
                            </div>
                            <div className="flex flex-col items-center bg-neutral-50/70 p-2 rounded-xl">
                              <span className="material-symbols-outlined text-[18px] text-[#c9952a] mb-0.5">layers</span>
                              <span className="text-xs font-bold text-neutral-900">
                                {u.floor === 0 ? "الأرضي" : `الدور ${u.floor}`}
                              </span>
                              <span className="text-[10px] text-neutral-500 font-medium">الطابق</span>
                            </div>
                            <div className="flex flex-col items-center bg-neutral-50/70 p-2 rounded-xl">
                              <span className="material-symbols-outlined text-[18px] text-[#c9952a] mb-0.5">bed</span>
                              <span className="text-xs font-bold text-neutral-900">{u.rooms || 1} غرف</span>
                              <span className="text-[10px] text-neutral-500 font-medium">الغرف</span>
                            </div>
                          </div>

                          {/* Payment Highlights */}
                          {(u.downPaymentPercent || u.installmentYears) && (
                            <div className="flex items-center justify-between text-xs text-neutral-600 mb-4 bg-neutral-50 rounded-xl px-3 py-2 font-medium">
                              <span>مقدم {u.downPaymentPercent || 10}%</span>
                              <span className="w-1 h-1 rounded-full bg-neutral-300" />
                              <span>تقسيط {u.installmentYears || 5} سنوات</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price & Action Button */}
                      <div className="p-5 pt-0 border-t border-neutral-100 flex items-center justify-between mt-auto">
                        <div>
                          <p className="text-[10px] text-neutral-400 font-bold">السعر الإجمالي</p>
                          <p className="text-base font-black text-neutral-900 font-mono">
                            {Number(u.price).toLocaleString()}
                            <span className="text-xs text-neutral-600 font-sans font-normal mr-1">ج.م.</span>
                          </p>
                        </div>
                        <Link
                          to={`/properties/${u._id}`}
                          className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-xs font-bold text-white transition-all shadow-md hover:opacity-90"
                          style={{ background: "#000e1f" }}
                        >
                          <span>عرض وتفاصيل</span>
                          <span className="material-symbols-outlined text-[15px]">arrow_left_alt</span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="h-10 px-4 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-neutral-700 disabled:opacity-40 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  السابق
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      page === num
                        ? "bg-[#000e1f] text-white shadow-md shadow-[#000e1f]/20"
                        : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="h-10 px-4 rounded-xl border border-neutral-200 bg-white text-xs font-bold text-neutral-700 disabled:opacity-40 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  التالي
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
