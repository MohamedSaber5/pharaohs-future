import { useState, useEffect } from "react";
import adminService from "@services/admin.service.js";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    companyPhone: "",
    companyWhatsapp: "",
    companyEmail: "",
    companyAddress: "",
    googleMapsUrl: "",
    workingHours: "",
    homeFeaturedProjectsCount: 3,
    facebookUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await adminService.getSettings();
      const data = res?.data ?? res ?? {};
      setForm({
        companyPhone: data.companyPhone || "01000000000",
        companyWhatsapp: data.companyWhatsapp || "01000000000",
        companyEmail: data.companyEmail || "info@pharaohsfuture.com",
        companyAddress: (data.companyAddress && !data.companyAddress.includes("القاهرة") && !data.companyAddress.includes("التجمع")) ? data.companyAddress : "أسوان الجديدة - الحي الثاني (المقر الرئيسي)",
        googleMapsUrl: data.googleMapsUrl || "https://maps.google.com/?q=أسوان+الجديدة+الحي+الثاني",
        workingHours: data.workingHours || "السبت - الخميس: 9:00 ص - 6:00 م",
        homeFeaturedProjectsCount: data.homeFeaturedProjectsCount ?? 3,
        facebookUrl: data.facebookUrl || "",
        instagramUrl: data.instagramUrl || "",
        linkedinUrl: data.linkedinUrl || "",
      });
    } catch {
      toast.error("تعذر تحميل إعدادات الموقع");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "homeFeaturedProjectsCount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminService.updateSettings(form);
      toast.success("تم حفظ إعدادات الموقع بنجاح ✅");
    } catch (err) {
      toast.error(err?.response?.data?.message || "فشل حفظ الإعدادات");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex flex-col gap-6" dir="rtl">
        <div className="h-10 w-64 bg-neutral-200 animate-pulse rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-neutral-200 animate-pulse rounded-2xl" />
          <div className="h-64 bg-neutral-200 animate-pulse rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6" style={{ background: "#f8f9fa", minHeight: "100vh" }} dir="rtl">
      
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#000e1f] text-[#f0d897] flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[26px]">tune</span>
          </div>
          <div>
            <h1 className="text-[22px] font-black text-neutral-900">إعدادات وهوية الموقع</h1>
            <p className="text-[13px] text-neutral-500 mt-0.5">
              التحكم في بيانات التواصل الرسمية للشركة، ساعات العمل، وعدد المشاريع المعروضة بالصفحة الرئيسية
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="h-11 px-6 rounded-xl font-bold text-sm text-[#000e1f] flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 transition-all cursor-pointer"
          style={{ background: "linear-gradient(135deg, #f0d897 0%, #c9952a 50%, #b07d1f 100%)" }}
        >
          <span className="material-symbols-outlined text-[20px]">save</span>
          <span>{saving ? "جارٍ الحفظ..." : "حفظ كافة التعديلات"}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* ── ROW 1: DISPLAY SETTINGS (FEATURED PROJECTS) ── */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-neutral-100">
            <span className="material-symbols-outlined text-[#c9952a] text-[22px]">view_carousel</span>
            <h2 className="text-[16px] font-bold text-neutral-900">إعدادات الصفحة الرئيسية والعرض</h2>
          </div>

          <div className="max-w-2xl">
            <label className="block text-xs font-bold text-neutral-700 mb-2">
              عدد المشاريع المميزة المعروضة في الصفحة الرئيسية:
            </label>
            
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {[3, 4, 6].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setForm((p) => ({ ...p, homeFeaturedProjectsCount: num }))}
                  className={`h-11 px-5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                    form.homeFeaturedProjectsCount === num
                      ? "bg-[#000e1f] text-[#f0d897] border-[#000e1f] shadow-md"
                      : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {form.homeFeaturedProjectsCount === num ? "check_circle" : "radio_button_unchecked"}
                  </span>
                  <span>{num} مشاريع {num === 3 && "(الموصى به)"}</span>
                </button>
              ))}

              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 font-semibold">أو رقم مخصص:</span>
                <input
                  type="number"
                  name="homeFeaturedProjectsCount"
                  min="1"
                  max="12"
                  value={form.homeFeaturedProjectsCount}
                  onChange={handleChange}
                  className="w-20 h-11 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-center font-bold text-sm text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white"
                />
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 bg-neutral-50 p-3 rounded-xl border border-neutral-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c9952a] text-[18px]">info</span>
              <span>
                تحديد 3 مشاريع فقط يضمن سرعة فائقة في تحميل الموقع ويقلل استهلاك استعلامات قاعدة البيانات وتكلفة النقل.
              </span>
            </p>
          </div>
        </div>

        {/* ── ROW 2: CONTACT DETAILS & WORKING HOURS ── */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-neutral-100">
            <span className="material-symbols-outlined text-[#c9952a] text-[22px]">contact_phone</span>
            <h2 className="text-[16px] font-bold text-neutral-900">بيانات التواصل الرسمية وساعات العمل</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                رقم هاتف الشركة الرسمي:
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="companyPhone"
                  value={form.companyPhone}
                  onChange={handleChange}
                  placeholder="010XXXXXXXX"
                  className="w-full h-11 pr-10 pl-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all"
                />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]">
                  call
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                رقم الواتساب الرسمي (خدمة العملاء):
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="companyWhatsapp"
                  value={form.companyWhatsapp}
                  onChange={handleChange}
                  placeholder="010XXXXXXXX"
                  className="w-full h-11 pr-10 pl-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all"
                />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 text-[18px]">
                  chat
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                البريد الإلكتروني الرسمي:
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="companyEmail"
                  value={form.companyEmail}
                  onChange={handleChange}
                  placeholder="info@pharaohsfuture.com"
                  className="w-full h-11 pr-10 pl-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all"
                />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]">
                  mail
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                مواعيد وساعات العمل الرسمية:
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="workingHours"
                  value={form.workingHours}
                  onChange={handleChange}
                  placeholder="السبت - الخميس: 9:00 ص - 6:00 م"
                  className="w-full h-11 pr-10 pl-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all"
                />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]">
                  schedule
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                عنوان المقر الرئيسي للشركة:
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="companyAddress"
                  value={form.companyAddress}
                  onChange={handleChange}
                  placeholder="أسوان الجديدة - الحي الثاني — مصر"
                  className="w-full h-11 pr-10 pl-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all"
                />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]">
                  location_on
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                رابط خرائط جوجل (Google Maps Link) لمقر الشركة:
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="googleMapsUrl"
                  value={form.googleMapsUrl}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full h-11 pr-10 pl-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all"
                />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]">
                  map
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">يظهر هذا الرابط للزوار في صفحة التواصل والصفحة الرئيسية لتمكينهم من الوصول للمقر بسهولة.</p>
            </div>
          </div>
        </div>

        {/* ── ROW 3: SOCIAL MEDIA LINKS ── */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-neutral-100">
            <span className="material-symbols-outlined text-[#c9952a] text-[22px]">share</span>
            <h2 className="text-[16px] font-bold text-neutral-900">روابط منصات التواصل الاجتماعي</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                رابط صفحة فيسبوك (Facebook):
              </label>
              <input
                type="url"
                name="facebookUrl"
                value={form.facebookUrl}
                onChange={handleChange}
                placeholder="https://facebook.com/pharaohsfuture"
                className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                رابط إنستغرام (Instagram):
              </label>
              <input
                type="url"
                name="instagramUrl"
                value={form.instagramUrl}
                onChange={handleChange}
                placeholder="https://instagram.com/pharaohsfuture"
                className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                رابط لينكد إن (LinkedIn):
              </label>
              <input
                type="url"
                name="linkedinUrl"
                value={form.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/company/pharaohsfuture"
                className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* ── SAVE ACTION FOOTER ── */}
        <div className="flex items-center justify-end gap-4 p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm">
          <button
            type="submit"
            disabled={saving}
            className="h-12 px-8 rounded-xl font-bold text-sm text-[#000e1f] flex items-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 transition-all cursor-pointer"
            style={{ background: "linear-gradient(135deg, #f0d897 0%, #c9952a 50%, #b07d1f 100%)" }}
          >
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>{saving ? "جارٍ الحفظ..." : "حفظ التغييرات الآن"}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
