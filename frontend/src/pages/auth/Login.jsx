import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setServerError("");

      const response = await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      const user = response.user || response.data?.user;

      // If user was redirected to login from a protected page
      const from = location.state?.from?.pathname;

      if (from) {
        navigate(from, { replace: true });
        return;
      }

      // Role-based redirect
      if (user?.role === "admin") {
        navigate("/admin/dashboard", {
          replace: true,
        });
      } else {
        navigate("/account", {
          replace: true,
        });
      }
    } catch (error) {
      const backendErrors = error.response?.data?.errors;

      if (Array.isArray(backendErrors)) {
        const formattedErrors = {};

        backendErrors.forEach((item) => {
          formattedErrors[item.field] = item.message;
        });

        setErrors(formattedErrors);
      } else {
        setServerError(
          error.response?.data?.message || "Invalid email or password",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
                <span className="text-lg font-bold text-slate-800">AB</span>
              </div>

              <div>
                <h1 className="text-lg font-bold leading-none text-amber-500">
                  Anithix.Build
                </h1>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2rem] text-slate-400">
                  Construction
                </p>
              </div>
            </Link>

            <h1 className="mt-8 text-3xl font-bold tracking-tight text-slate-950">
              Welcome back
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Sign in to manage your account, quotations and job applications.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
                  errors.email
                    ? "border-red-400 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                }`}
              />

              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mt-5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`w-full rounded-xl border px-4 py-3 pr-12 text-sm outline-none transition ${
                    errors.password
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">{serverError}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}

              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Register */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="font-semibold text-amber-600 hover:text-amber-500"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
