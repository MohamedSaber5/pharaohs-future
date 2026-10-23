import { useState, useEffect } from "react";
import adminService from "@services/admin.service.js";
import { useLanguage } from "@context/LanguageContext.jsx";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const { t, isRTL, dir } = useLanguage();
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
      toast.error(isRTL ? "تعذر تحميل إعدادات الموقع" : "Failed to load website settings");
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
      toast.success(isRTL ? "تم حفظ إعدادات الموقع بنجاح ✅" : "Website settings saved successfully ✅");
    } catch (err) {
      toast.error(err?.response?.data?.message || (isRTL ? "فشل حفظ الإعدادات" : "Failed to save settings"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex flex-col gap-6" dir={dir}>
        <div className="h-10 w-64 bg-neutral-200 animate-pulse rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-neutral-200 animate-pulse rounded-2xl" />
          <div className="h-64 bg-neutral-200 animate-pulse rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6" style={{ background: "#f8f9fa", minHeight: "100vh" }} dir={dir}>
      
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#000e1f] text-[#f0d897] flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[26px]">tune</span>
          </div>
          <div>
            <h1 className="text-[22px] font-black text-neutral-900">
              {isRTL ? "إعدادات وهوية الموقع" : "Site Settings & Identity"}
            </h1>
            <p className="text-[13px] text-neutral-500 mt-0.5">
              {isRTL
                ? "التحكم في بيانات التواصل الرسمية للشركة، ساعات العمل، وعدد المشاريع المعروضة بالصفحة الرئيسية"
                : "Manage official company contact info, working hours, and featured projects count on the homepage"}
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
          <span>{saving ? (isRTL ? "جارٍ الحفظ..." : "Saving...") : (isRTL ? "حفظ كافة التعديلات" : "Save All Changes")}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* ── ROW 1: DISPLAY SETTINGS (FEATURED PROJECTS) ── */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-neutral-100">
            <span className="material-symbols-outlined text-[#c9952a] text-[22px]">view_carousel</span>
            <h2 className="text-[16px] font-bold text-neutral-900">
              {isRTL ? "إعدادات الصفحة الرئيسية والعرض" : "Homepage & Display Settings"}
            </h2>
          </div>

          <div className="max-w-2xl">
            <label className="block text-xs font-bold text-neutral-700 mb-2">
              {isRTL ? "عدد المشاريع المميزة المعروضة في الصفحة الرئيسية:" : "Featured projects count displayed on homepage:"}
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
                  <span>
                    {num} {isRTL ? "مشاريع" : "Projects"} {num === 3 && (isRTL ? "(الموصى به)" : "(Recommended)")}
                  </span>
                </button>
              ))}

              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500 font-semibold">
                  {isRTL ? "أو رقم مخصص:" : "Or custom number:"}
                </span>
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
                {isRTL
                  ? "تحديد 3 مشاريع فقط يضمن سرعة فائقة في تحميل الموقع ويقلل استهلاك استعلامات قاعدة البيانات وتكلفة النقل."
                  : "Selecting 3 projects ensures fast loading speeds and minimizes database query overhead."}
              </span>
            </p>
          </div>
        </div>

        {/* ── ROW 2: CONTACT DETAILS & WORKING HOURS ── */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-neutral-100">
            <span className="material-symbols-outlined text-[#c9952a] text-[22px]">contact_phone</span>
            <h2 className="text-[16px] font-bold text-neutral-900">
              {isRTL ? "بيانات التواصل الرسمية وساعات العمل" : "Official Contact Details & Working Hours"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                {isRTL ? "رقم هاتف الشركة الرسمي:" : "Official Company Phone:"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="companyPhone"
                  value={form.companyPhone}
                  onChange={handleChange}
                  placeholder="010XXXXXXXX"
                  className={`w-full h-11 ${isRTL ? "pr-10 pl-3.5" : "pl-10 pr-3.5"} rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all`}
                />
                <span className={`material-symbols-outlined absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]`}>
                  call
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                {isRTL ? "رقم الواتساب الرسمي (خدمة العملاء):" : "Official WhatsApp (Customer Service):"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="companyWhatsapp"
                  value={form.companyWhatsapp}
                  onChange={handleChange}
                  placeholder="010XXXXXXXX"
                  className={`w-full h-11 ${isRTL ? "pr-10 pl-3.5" : "pl-10 pr-3.5"} rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all`}
                />
                <span className={`material-symbols-outlined absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-emerald-600 text-[18px]`}>
                  chat
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                {isRTL ? "البريد الإلكتروني الرسمي:" : "Official Company Email:"}
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="companyEmail"
                  value={form.companyEmail}
                  onChange={handleChange}
                  placeholder="info@pharaohsfuture.com"
                  className={`w-full h-11 ${isRTL ? "pr-10 pl-3.5" : "pl-10 pr-3.5"} rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all`}
                />
                <span className={`material-symbols-outlined absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]`}>
                  mail
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                {isRTL ? "مواعيد وساعات العمل الرسمية:" : "Official Working Hours:"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="workingHours"
                  value={form.workingHours}
                  onChange={handleChange}
                  placeholder={isRTL ? "السبت - الخميس: 9:00 ص - 6:00 م" : "Sat - Thu: 9:00 AM - 6:00 PM"}
                  className={`w-full h-11 ${isRTL ? "pr-10 pl-3.5" : "pl-10 pr-3.5"} rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all`}
                />
                <span className={`material-symbols-outlined absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]`}>
                  schedule
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                {isRTL ? "عنوان المقر الرئيسي للشركة:" : "Official Headquarters Address:"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="companyAddress"
                  value={form.companyAddress}
                  onChange={handleChange}
                  placeholder={isRTL ? "أسوان الجديدة - الحي الثاني — مصر" : "New Aswan - Second District — Egypt"}
                  className={`w-full h-11 ${isRTL ? "pr-10 pl-3.5" : "pl-10 pr-3.5"} rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all`}
                />
                <span className={`material-symbols-outlined absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]`}>
                  location_on
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                {isRTL ? "رابط خرائط جوجل (Google Maps Link) لمقر الشركة:" : "Google Maps Link for HQ:"}
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="googleMapsUrl"
                  value={form.googleMapsUrl}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/?q=..."
                  className={`w-full h-11 ${isRTL ? "pr-10 pl-3.5" : "pl-10 pr-3.5"} rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-bold text-neutral-900 outline-none focus:border-[#c9952a] focus:bg-white transition-all`}
                />
                <span className={`material-symbols-outlined absolute ${isRTL ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]`}>
                  map
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                {isRTL
                  ? "يظهر هذا الرابط للزوار في صفحة التواصل والصفحة الرئيسية لتمكينهم من الوصول للمقر بسهولة."
                  : "This link allows visitors on the contact and home pages to navigate to the headquarters easily."}
              </p>
            </div>
          </div>
        </div>

        {/* ── ROW 3: SOCIAL MEDIA LINKS ── */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-neutral-100">
            <span className="material-symbols-outlined text-[#c9952a] text-[22px]">share</span>
            <h2 className="text-[16px] font-bold text-neutral-900">
              {isRTL ? "روابط منصات التواصل الاجتماعي" : "Social Media Links"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                {isRTL ? "رابط صفحة فيسبوك (Facebook):" : "Facebook Page URL:"}
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
                {isRTL ? "رابط إنستغرام (Instagram):" : "Instagram Profile URL:"}
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
                {isRTL ? "رابط لينكد إن (LinkedIn):" : "LinkedIn Profile URL:"}
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
        <div className={`flex items-center ${isRTL ? "justify-end" : "justify-end"} gap-4 p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm`}>
          <button
            type="submit"
            disabled={saving}
            className="h-12 px-8 rounded-xl font-bold text-sm text-[#000e1f] flex items-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 transition-all cursor-pointer"
            style={{ background: "linear-gradient(135deg, #f0d897 0%, #c9952a 50%, #b07d1f 100%)" }}
          >
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>{saving ? (isRTL ? "جارٍ الحفظ..." : "Saving...") : (isRTL ? "حفظ التغييرات الآن" : "Save Changes Now")}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
