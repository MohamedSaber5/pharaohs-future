import { Link } from 'react-router-dom';
import logoSrc from '@assets/images/logo.png';

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Header */}
      <div className="relative w-full bg-[#000e1f] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage:"url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPXkPc2KaLFiRV8RHJQhqfstMFlyq8dBqmhxBFocqKU8pB6mxFWJQdKJbYH0h6yCqBJIDjzC5o6OAIqz-VBvC3JV3QGJCDjOANvPEMNXi3tFdaBb0yqjj69JaxpBeTxXLhvRkJUWZS2kDxO4wXomD72DPIhFBq4E2pNChVNfhBIVa1b7UzWbxCxS0j0tQH04JF3VB_bdIPMeRNVw')",backgroundSize:"cover",backgroundPosition:"center" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
          <img src={logoSrc} alt="مستقبل الفراعنة" className="h-20 w-auto mx-auto mb-8 object-contain" style={{ filter:"brightness(0) invert(1)" }} />
          <h1 className="text-white font-bold text-[36px] md:text-[52px] leading-tight mb-4">نبذة عنّا</h1>
          <p className="text-white/70 text-[18px] max-w-xl mx-auto">تعرّف على قصة مستقبل الفراعنة ورؤيتنا للاستثمار العقاري في مصر</p>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="flex-1 flex flex-col items-center justify-center py-28 px-6 text-center">
        <div className="w-24 h-24 rounded-3xl bg-[#000e1f]/5 flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-[48px] text-[#775a1a]">hourglass_empty</span>
        </div>
        <h2 className="text-[28px] font-bold text-[#000e1f] mb-4">قريباً...</h2>
        <p className="text-[16px] text-neutral-500 max-w-md leading-relaxed mb-8">
          نعمل على إعداد صفحة شاملة تحكي قصتنا وتُعرّف بفريقنا وقيمنا. تابعونا!
        </p>
        <Link to="/" className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-[#000e1f] text-white font-bold text-[15px] hover:bg-[#0d1f35] transition-all">
          <span className="material-symbols-outlined text-[20px]">home</span>العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
