import { useState } from 'react';
import logoSrc from '@assets/images/logo.png';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Header */}
      <div className="relative w-full bg-[#000e1f] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage:"url('https://lh3.googleusercontent.com/aida-public/AB6AXuCq7bUFXb2v6zfL4o9YIVqfH59ePMYGVqLBxMoJeZ69J6hHNcJMoFY9MZfD8S9t4jMiCAnzjdSK4GWJJ7h33o9hVQ3-5VCa0c_cFLiF_rkS_xQI9x3WjrKkRGP0YkFl4H3sxfJpHpDhpKXvBfJ5EoRSdlwL7ztcMiHBLjI1IsTz6fHENs4_Sf3Wep9VRi4nzH9Ei1gDl0RaLqz9M')",backgroundSize:"cover",backgroundPosition:"center" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
          <h1 className="text-white font-bold text-[36px] md:text-[52px] leading-tight mb-4">تواصل معنا</h1>
          <p className="text-white/70 text-[18px] max-w-xl mx-auto">فريقنا جاهز للإجابة على استفساراتك خلال 24 ساعة</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <div>
              <img src={logoSrc} alt="مستقبل الفراعنة" className="h-14 w-auto object-contain mb-6" />
              <h2 className="text-[24px] font-bold text-[#000e1f] mb-3">ابقَ على تواصل</h2>
              <p className="text-[15px] text-neutral-500 leading-relaxed">
                سواء كان لديك استفسار عن مشروع أو وحدة، أو تريد الحصول على استشارة مجانية، فريقنا جاهز لمساعدتك.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              {[
                { icon:"call",     label:"الهاتف",            value:"+20 100 000 0000" },
                { icon:"mail",     label:"البريد الإلكتروني", value:"info@pharaohs-future.com" },
                { icon:"location_on",label:"العنوان",         value:"القاهرة الجديدة — التجمع الخامس" },
                { icon:"schedule", label:"ساعات العمل",       value:"السبت – الخميس: 9ص – 6م" },
              ].map(c=>(
                <div key={c.label} className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                  <div className="w-11 h-11 rounded-xl bg-[#000e1f]/5 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[22px] text-[#775a1a]">{c.icon}</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-neutral-500 mb-0.5">{c.label}</p>
                    <p className="text-[15px] font-bold text-[#000e1f]">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl border border-neutral-100 shadow-lg p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[32px] text-green-600">check_circle</span>
                </div>
                <h3 className="text-[20px] font-bold text-[#000e1f] mb-2">تم الإرسال بنجاح!</h3>
                <p className="text-[14px] text-neutral-500">سيتواصل معك فريقنا خلال 24 ساعة</p>
              </div>
            ) : (
              <>
                <h3 className="text-[20px] font-bold text-[#000e1f] mb-6">أرسل رسالتك</h3>
                <form onSubmit={e=>{ e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
                  {[
                    { label:"الاسم الكامل",  ph:"محمد أحمد",              type:"text" },
                    { label:"البريد الإلكتروني", ph:"example@email.com",  type:"email" },
                    { label:"رقم الهاتف",    ph:"01xxxxxxxxx",             type:"tel" },
                  ].map(f=>(
                    <div key={f.label} className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-semibold text-neutral-700">{f.label}</label>
                      <input type={f.type} placeholder={f.ph} required
                        className="w-full h-12 px-4 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 transition-all focus:border-[#775a1a] focus:bg-white" />
                    </div>
                  ))}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-neutral-700">رسالتك</label>
                    <textarea rows={4} placeholder="اكتب رسالتك هنا..." required
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-[14px] outline-none bg-neutral-50 resize-none transition-all focus:border-[#775a1a] focus:bg-white" />
                  </div>
                  <button type="submit"
                    className="w-full h-12 rounded-xl bg-[#000e1f] text-white font-bold text-[15px] hover:bg-[#0d1f35] transition-all flex items-center justify-center gap-2 mt-2">
                    <span className="material-symbols-outlined text-[20px]">send</span>إرسال الرسالة
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
