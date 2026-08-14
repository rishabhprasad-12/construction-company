import { Link } from "react-router-dom";

import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-950 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
                <span className="font-bold text-slate-950">AB</span>
              </div>
              <div>
                <h2 className="font-bold">Anithix.Build</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  Construction
                </p>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Building quality spaces with reliable construction, thoughtful
              planning, and a commitment to excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/about"
                className="text-sm text-slate-400 hover:text-amber-500"
              >
                About Us
              </Link>

              <Link
                to="/services"
                className="text-sm text-slate-400 hover:text-amber-500"
              >
                Services
              </Link>

              <Link
                to="/projects"
                className="text-sm text-slate-400 hover:text-amber-500"
              >
                Projects
              </Link>

              <Link
                to="/careers"
                className="text-sm text-slate-400 hover:text-amber-500"
              >
                Careers
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/services"
                className="text-sm text-slate-400 hover:text-amber-500"
              >
                Residential Construction
              </Link>

              <Link
                to="/services"
                className="text-sm text-slate-400 hover:text-amber-500"
              >
                Commercial Construction
              </Link>

              <Link
                to="/services"
                className="text-sm text-slate-400 hover:text-amber-500"
              >
                Renovation & Remodeling
              </Link>

              <Link
                to="/services"
                className="text-sm text-slate-400 hover:text-amber-500"
              >
                Architectural Planning
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={18} className="mt-2 shrink-0 text-amber-500" />
                <p className="text-sm leading-6 text-slate-400">
                  Guwahati, Assam <br /> India
                </p>
              </div>

              <a
                href="tel:+91 8200600080"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-white"
              >
                <Phone size={18} className="text-amber-500" />
                +91 8200600080
              </a>

              <a
                href="mailto:info@anithixbuild"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-white"
              >
                <Mail size={18} className="text-amber-500" />
                info@anithixbuild
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Anithix.BUild Construction. All rights
            reserved.
          </p>

          <Link to="/quote" className="inline-flex items-center gap-1 text-sm font-medium text-amber-500 hover:text-amber-400">
            Start your project <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
