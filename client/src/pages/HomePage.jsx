import { Link } from "react-router-dom";
import { HiArrowRight, HiLocationMarker } from "react-icons/hi";

/**
 * HomePage - Landing page for Pharaohs Future
 * Full UI will be implemented from Figma design
 */
const HomePage = () => {
  return (
    <div className="bg-dark-950">
      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950"
        />
        {/* Decorative radial glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-500/5 blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-sm font-medium mb-8 animate-fade-in">
            <HiLocationMarker className="w-4 h-4" />
            <span>Egypt's Premier Real Estate Developer</span>
          </div>

          {/* Headline */}
          <h1 className="section-title text-5xl md:text-6xl lg:text-7xl mb-6 animate-slide-up">
            Build Your{" "}
            <span className="gold-gradient">Future</span>
            <br />
            With Ancient Wisdom
          </h1>

          {/* Subheadline */}
          <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up">
            Discover premium real estate opportunities across Egypt. From luxury
            residences to high-yield investments — your dream property awaits.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Link
              id="hero-explore-btn"
              to="/properties"
              className="btn-primary text-base px-8 py-4 gap-2"
            >
              Explore Properties
              <HiArrowRight className="w-5 h-5" />
            </Link>
            <Link
              id="hero-contact-btn"
              to="/contact"
              className="btn-secondary text-base px-8 py-4"
            >
              Contact Our Team
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Properties Sold" },
              { number: "15+", label: "Years Experience" },
              { number: "50+", label: "Ongoing Projects" },
              { number: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-display font-bold gold-gradient">
                  {stat.number}
                </p>
                <p className="text-dark-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Projects Placeholder ────────────────────────── */}
      <section id="featured-projects" className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-subtitle mb-4">Our Portfolio</p>
          <h2 className="section-title text-4xl mb-6">Featured Projects</h2>
          <p className="text-dark-400 max-w-xl mx-auto mb-12">
            Full project listings will be loaded here from the Figma design and API.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card h-64 flex items-center justify-center">
                <p className="text-dark-500 text-sm">Project Card {i}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
