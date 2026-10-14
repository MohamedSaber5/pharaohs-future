import { Link } from "react-router-dom";

const footerLinks = {
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Our Projects", to: "/projects" },
    { label: "Careers", to: "/careers" },
    { label: "News", to: "/news" },
  ],
  Properties: [
    { label: "All Properties", to: "/properties" },
    { label: "Residential", to: "/properties?type=residential" },
    { label: "Commercial", to: "/properties?type=commercial" },
    { label: "Investment", to: "/properties?type=investment" },
  ],
  Support: [
    { label: "Contact Us", to: "/contact" },
    { label: "FAQ", to: "/faq" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
  ],
};

/**
 * Footer - site-wide footer with links and brand info
 */
const Footer = () => {
  return (
    <footer className="bg-dark-900 border-t border-dark-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center font-display font-bold text-white text-lg">
                PF
              </div>
              <div>
                <p className="font-display font-bold text-dark-50 text-lg leading-none">
                  Pharaohs Future
                </p>
                <p className="text-xs text-dark-400 uppercase tracking-widest">
                  Real Estate
                </p>
              </div>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed">
              Building tomorrow's landmarks with the legacy of ancient wisdom.
              Premium real estate development across Egypt.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-dark-50 font-semibold text-sm uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-dark-400 hover:text-brand-400 text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Pharaohs Future Real Estate. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-dark-500 text-xs">Built with</span>
            <span className="text-brand-500 text-xs font-medium mx-1">♦</span>
            <span className="text-dark-500 text-xs">in Egypt</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
