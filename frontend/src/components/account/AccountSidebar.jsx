import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileText,
  BriefcaseBusiness,
  LogOut,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const AccountSidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      name: "Overview",
      path: "/account",
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: "My Profile",
      path: "/account/profile",
      icon: User,
    },
    {
      name: "My Quotations",
      path: "/account/quotations",
      icon: FileText,
    },
    {
      name: "My Applications",
      path: "/account/applications",
      icon: BriefcaseBusiness,
    },
  ];

  const handleLogout = () => {
    logout();
    closeSidebar?.();
    navigate("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2rem] text-amber-500">
              Customer
            </p>

            <h2 className="mt-1 text-lg font-bold text-white">My Account</h2>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-amber-500 text-slate-950"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-800 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AccountSidebar;
