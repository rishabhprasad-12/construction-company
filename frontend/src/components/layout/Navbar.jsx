import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { Menu, X, Phone, ArrowRight } from "lucide-react";

import Button from "../common/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Careers",
      path: "/careers",
    },
    {
      name: "Contacts",
      path: "/contacts",
    },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
            <span className="text-lg font-bold text-slate-800">AB</span>
          </div>

          <div>
            <h1 className="text-lg font-bold leading-none text-white">
              Anithix.Build
            </h1>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2rem] text-slate-400">
              Construction
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-amber-500"
                    : "text-amber-300 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+918200600080"
            className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
          >
            <Phone size={16} />
            <span>+91 8200600080</span>
          </a>

          <Button to="/quote">
            Get a Quote
            <ArrowRight size={17} className="ml-2" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-slate-800 bg-slate-950 lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `border-b border-slate-800 py-4 text-sm font-medium ${
                      isActive ? "text-amber-500" : "text-slate-300"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="mt-5">
              <Button to={"/quote"} className="w-full" onClick={closeMenu}>
                Get a Quote
                <ArrowRight size={17} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
