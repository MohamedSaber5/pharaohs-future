import HeroSection            from "@components/sections/home/HeroSection.jsx";
import FeaturedProjectsSection from "@components/sections/home/FeaturedProjectsSection.jsx";
import VisionSection           from "@components/sections/home/VisionSection.jsx";
import CTASection              from "@components/sections/home/CTASection.jsx";

/**
 * HomePage — الصفحة الرئيسية لمستقبل الفراعنة
 * الأقسام: Hero → المشروعات المختارة → رؤيتنا → CTA
 */
const HomePage = () => (
  <main>
    <HeroSection />
    <FeaturedProjectsSection />
    <VisionSection />
    <CTASection />
  </main>
);

export default HomePage;
