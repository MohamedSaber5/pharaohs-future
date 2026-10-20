import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import unitService from "@services/unit.service.js";
import projectService from "@services/project.service.js";
import { getImageUrl } from "@utils/imageHelper.js";

const PH = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80";

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State (AC1)
  const [selectedProject, setSelectedProject] = useState(searchParams.get("project") || "");
  const [building, setBuilding] = useState(searchParams.get("building") || "");
  const [floor, setFloor] = useState(searchParams.get("floor") || "");
  const [rooms, setRooms] = useState(searchParams.get("rooms") || "");
  const [minArea, setMinArea] = useState(searchParams.get("minArea") || "");
  const [maxArea, setMaxArea] = useState(searchParams.get("maxArea") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // Sorting & Pagination (AC3)
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

  // Fetch units with AC1, AC2, AC3
  const fetchUnits = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        status: "متاح", // AC2: Only available units
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
    <div className="min-h-screen bg-neutral-50" dir="rtl">
      {/* Header Banner */}
      <div className="relative bg-[#000e1f] text-white pt-32 pb-16 px-6 lg:px-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 bg-[#775a1a]/20 border border-[#775a1a]/40">
            <span className="w-2 h-2 rounded-full bg-[#c9952a] animate-pulse" />
            <span className="text-[12px] font-semibold text-[#c9952a]">الوحدات المتاحة للحجز الفوري</span>
          </div>
          <h1 className="text-[32px] md:text-[44px] font-bold mb-3">ابحث عن وحدتك المثالية في أسوان</h1>
          <p className="text-white/70 text-[15px] max-w-2xl leading-relaxed">
            استعرض كافة الوحدات العقارية المتاحة حالياً مع إمكانية التصفية الدقيقة حسب المشروع والمبنى والطابق والمساحة ونطاق السعر.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar (AC1) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm sticky top-28">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#775a1a]">tune</span>
                  <h2 className="text-[17px] font-bold text-neutral-900">تصفية الوحدات</h2>
                </div>
                <button
                  onClick={handleReset}
                  className="text-[12px] font-semibold text-neutral-400 hover:text-red-600 transition-colors"
                >
                  إعادة ضبط
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {/* Compound / Project */}
                <div>
                  <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                    المشروع / الكمبوند
                  </label>
                  <select
                    value={selectedProject}
                    onChange={(e) => {
                      setSelectedProject(e.target.value);
                      setPage(1);
                    }}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] text-neutral-800 outline-none focus:border-[#775a1a] transition-all"
                  >
                    <option value="">جميع المشاريع</option>
                    {projects.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name} {p.location ? `(${p.location})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Building */}
                <div>
                  <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
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
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] text-neutral-800 outline-none focus:border-[#775a1a] transition-all"
                  />
                </div>

                {/* Floor & Rooms */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                      الطابق
                    </label>
                    <select
                      value={floor}
                      onChange={(e) => {
                        setFloor(e.target.value);
                        setPage(1);
                      }}
                      className="w-full h-11 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] text-neutral-800 outline-none focus:border-[#775a1a]"
                    >
                      <option value="">الكل</option>
                      <option value="0">الأرضي</option>
                      <option value="1">الأول</option>
                      <option value="2">الثاني</option>
                      <option value="3">الثالث</option>
                      <option value="4">الرابع</option>
                      <option value="5">الخامس+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                      الغرف
                    </label>
                    <select
                      value={rooms}
                      onChange={(e) => {
                        setRooms(e.target.value);
                        setPage(1);
                      }}
                      className="w-full h-11 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] text-neutral-800 outline-none focus:border-[#775a1a]"
                    >
                      <option value="">الكل</option>
                      <option value="1">1 غرفة</option>
                      <option value="2">2 غرفة</option>
                      <option value="3">3 غرف</option>
                      <option value="4">4+ غرف</option>
                    </select>
                  </div>
                </div>

                {/* Area Range */}
                <div>
                  <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
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
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] text-neutral-800 outline-none focus:border-[#775a1a]"
                    />
                    <input
                      type="number"
                      placeholder="إلى"
                      value={maxArea}
                      onChange={(e) => {
                        setMaxArea(e.target.value);
                        setPage(1);
                      }}
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] text-neutral-800 outline-none focus:border-[#775a1a]"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-[13px] font-bold text-neutral-700 mb-1.5">
                    نطاق السعر (ج.م.)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="من"
                      value={minPrice}
                      onChange={(e) => {
                        setMinPrice(e.target.value);
                        setPage(1);
                      }}
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] text-neutral-800 outline-none focus:border-[#775a1a]"
                    />
                    <input
                      type="number"
                      placeholder="إلى"
                      value={maxPrice}
                      onChange={(e) => {
                        setMaxPrice(e.target.value);
                        setPage(1);
                      }}
                      className="w-full h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] text-neutral-800 outline-none focus:border-[#775a1a]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid Area */}
          <div className="lg:col-span-3">
            {/* Top Bar: Results Count + Sorting */}
            <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 text-[14px] text-neutral-600 font-medium">
                <span>تم العثور على</span>
                <span className="font-bold text-[#775a1a] text-[16px]">{total}</span>
                <span>وحدة سكنية وتجارية متاحة</span>
              </div>

              {/* Sorting (AC3) */}
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-neutral-400 font-medium whitespace-nowrap">ترتيب حسب:</span>
                <select
                  value={`${sortBy}-${sortDir}`}
                  onChange={(e) => {
                    const [sb, sd] = e.target.value.split("-");
                    setSortBy(sb);
                    setSortDir(sd);
                    setPage(1);
                  }}
                  className="h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-[13px] font-semibold text-neutral-700 outline-none focus:border-[#775a1a] cursor-pointer"
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
                  <div key={i} className="h-80 bg-white rounded-3xl border border-neutral-100 animate-pulse" />
                ))}
              </div>
            ) : units.length === 0 ? (
              <div className="bg-white rounded-3xl border border-neutral-200/80 p-16 text-center shadow-sm">
                <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-[40px] text-neutral-400">filter_alt_off</span>
                </div>
                <h3 className="text-[20px] font-bold text-neutral-800 mb-2">لا توجد وحدات مطابقة</h3>
                <p className="text-[14px] text-neutral-500 max-w-md mx-auto mb-6">
                  لم نتمكن من العثور على وحدات متاحة تطابق خيارات التصفية الحالية. جرب توسيع نطاق البحث أو إعادة ضبط الفلاتر.
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-xl font-bold text-white text-[14px]"
                  style={{ background: "#000e1f" }}
                >
                  <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                  إعادة ضبط الفلاتر
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
                      className="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                    >
                      {/* Image Header */}
                      <div className="relative h-52 overflow-hidden bg-neutral-900">
                        <img
                          src={img}
                          alt={u.type}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = PH;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                        {/* Available Badge */}
                        <div className="absolute top-3.5 right-3.5">
                          <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-emerald-500 text-white shadow-md flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            متاح للحجز
                          </span>
                        </div>

                        {/* Project Name & Location */}
                        <div className="absolute bottom-3 right-3.5 left-3.5">
                          <p className="text-[12px] text-[#c9952a] font-semibold">
                            {proj?.name || "مشروع مميز"}
                          </p>
                          <p className="text-[14px] font-bold text-white flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-white/80">location_on</span>
                            {proj?.location || u.building || "أسوان"}
                          </p>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-[17px] font-bold text-neutral-900 group-hover:text-[#775a1a] transition-colors">
                            {u.type}
                          </h3>
                          {u.building && (
                            <span className="text-[11px] font-semibold bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded-lg">
                              {u.building}
                            </span>
                          )}
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-3 gap-2 py-3 mb-3 border-y border-neutral-100 text-center">
                          <div className="flex flex-col items-center">
                            <span className="material-symbols-outlined text-[18px] text-[#775a1a] mb-0.5">straighten</span>
                            <span className="text-[12px] font-bold text-neutral-800">{u.area} م²</span>
                            <span className="text-[10px] text-neutral-400">المساحة</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="material-symbols-outlined text-[18px] text-[#775a1a] mb-0.5">layers</span>
                            <span className="text-[12px] font-bold text-neutral-800">
                              {u.floor === 0 ? "الأرضي" : `الدور ${u.floor}`}
                            </span>
                            <span className="text-[10px] text-neutral-400">الطابق</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="material-symbols-outlined text-[18px] text-[#775a1a] mb-0.5">bed</span>
                            <span className="text-[12px] font-bold text-neutral-800">{u.rooms || 1} غرف</span>
                            <span className="text-[10px] text-neutral-400">الغرف</span>
                          </div>
                        </div>

                        {/* Payment Highlights */}
                        {(u.downPaymentPercent || u.installmentYears) && (
                          <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-4 bg-neutral-50 rounded-xl px-3 py-2">
                            <span>مقدم {u.downPaymentPercent || 10}%</span>
                            <span className="w-1 h-1 rounded-full bg-neutral-300" />
                            <span>تقسيط حتى {u.installmentYears || 5} سنوات</span>
                          </div>
                        )}

                        {/* Price & Action Button */}
                        <div className="flex items-center justify-between mt-auto pt-2">
                          <div>
                            <p className="text-[11px] text-neutral-400 font-medium">السعر الإجمالي</p>
                            <p className="text-[18px] font-black text-neutral-900">
                              {Number(u.price).toLocaleString()}
                              <span className="text-[12px] font-bold text-neutral-400 mr-1">ج.م.</span>
                            </p>
                          </div>
                          <Link
                            to={`/properties/${u._id}`}
                            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-[13px] font-bold text-white transition-all shadow-md hover:shadow-lg hover:opacity-90"
                            style={{ background: "#000e1f" }}
                          >
                            <span>تفاصيل وحجز</span>
                            <span className="material-symbols-outlined text-[16px]">arrow_left_alt</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls (AC3) */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="w-10 h-10 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-xl text-[13px] font-bold transition-all ${
                      page === p
                        ? "text-white shadow-md"
                        : "text-neutral-600 bg-white border border-neutral-200 hover:bg-neutral-50"
                    }`}
                    style={page === p ? { background: "#000e1f" } : {}}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="w-10 h-10 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
