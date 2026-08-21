import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import AccountSidebar from "../components/account/AccountSidebar";

const CustomerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <AccountSidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="min-w-0 flex-1">
        {/* Mobile Header */}
        <div className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Open account menu"
          >
            <Menu size={24} />
          </button>

          <h1 className="ml-3 text-sm font-semibold text-slate-900">
            My Account
          </h1>
        </div>

        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CustomerLayout;
