import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  Phone,
  ArrowRight,
  LogIn,
  LogOut,
  LayoutDashboard,
  User,
} from "lucide-react";

import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { user, loading, logout } = useAuth();

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

  const handleLogout = () => {
    logout();

    closeMenu();

    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
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

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-4 lg:flex">
          {/* Phone */}
          <a
            href="tel:+918200600080"
            className="flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
          >
            <Phone size={16} />

            <span>+91 8200600080</span>
          </a>

          {/* Wait while checking authentication */}
          {!loading && (
            <>
              {!user ? (
                <>
                  {/* Login */}
                  <Link
                    to="/auth/login"
                    className="flex items-center gap-2 text-sm font-medium text-amber-300 border border-amber-500 px-4 py-3 rounded-md transition hover:text-white"
                  >
                    <LogIn size={17} />
                    Login
                  </Link>

                  {/* Quote CTA */}
                  <Button to="/quote">
                    Get a Quote
                    <ArrowRight size={17} className="ml-2" />
                  </Button>
                </>
              ) : (
                <>
                  {/* Admin */}
                  {user.role === "admin" ? (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-2 text-sm font-medium text-amber-300 transition hover:text-white"
                    >
                      <LayoutDashboard size={17} />
                      Dashboard
                    </Link>
                  ) : (
                    /* Customer */
                    <Link
                      to="/account"
                      className="flex items-center gap-2 text-sm font-medium text-amber-300 transition hover:text-white"
                    >
                      <User size={17} />
                      My Account
                    </Link>
                  )}

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-red-400"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </>
              )}
            </>
          )}
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
            {/* Navigation Links */}
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

            {/* Mobile Auth Section */}
            {!loading && (
              <div className="mt-5 space-y-3">
                {!user ? (
                  <>
                    <Link
                      to="/auth/login"
                      onClick={closeMenu}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      <LogIn size={18} />
                      Login
                    </Link>

                    <Button to="/quote" className="w-full" onClick={closeMenu}>
                      Get a Quote
                      <ArrowRight size={17} />
                    </Button>
                  </>
                ) : (
                  <>
                    {user.role === "admin" ? (
                      <Link
                        to="/admin/dashboard"
                        onClick={closeMenu}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber-500/40 px-4 py-3 text-sm font-semibold text-amber-400"
                      >
                        <LayoutDashboard size={18} />
                        Admin Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/account"
                        onClick={closeMenu}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-3 text-sm font-semibold text-white"
                      >
                        <User size={18} />
                        My Account
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
