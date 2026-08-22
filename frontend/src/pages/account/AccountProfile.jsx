import { useEffect, useState } from "react";
import { User, Mail, Shield, Save, Loader2 } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../services/authService";

const AccountProfile = () => {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await updateProfile(user.id, formData);
      const updatedUser = response.data;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error(error?.response?.data?.message);
      setError(error?.response?.data?.message || "Unable to load User");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Page Header */}
      <div>
        <p className="text-sm font-semibold text-amber-600">ACCOUNT SETTINGS</p>

        <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your personal account information.
        </p>
      </div>

      {/* Profile Summary */}
      <section className="mt-8 rounded-2xl bg-slate-950 p-6 sm:p-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-amber-500 text-2xl font-bold text-slate-950">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          {/* User Info */}
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-white">
              {user?.name || "User"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">{user?.email}</p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1.5 text-xs font-medium text-amber-400">
              <Shield size={14} />
              {user?.role || "Customer"}
            </div>
          </div>
        </div>
      </section>

      {/* Profile Form */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
            <User size={22} />
          </div>

          <div>
            <h2 className="font-bold text-slate-950">Personal Information</h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your account details.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-5 sm:grid-cols-2"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-slate-700"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email Address
            </label>

            <div className="relative mt-2">
              <Mail
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>
          </div>

          {/* Account Role */}
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-slate-700">
              Account Type
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Shield size={18} className="text-slate-400" />

              <span className="text-sm text-slate-600 capitalize">
                {user?.role || "customer"}
              </span>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {loading && <Loader2 size={20} className="animate-spin" />}

              {loading ? (
                "Saving..."
              ) : (
                <div className="flex items-center gap-2">
                  <Save size={20} /> Save Change
                </div>
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AccountProfile;
