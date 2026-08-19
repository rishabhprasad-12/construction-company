import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, FileText, Upload } from "lucide-react";

import { getCareerById } from "../services/careerService";
import { createJobApplication } from "../services/jobApplicationService";

const JobApplication = () => {
  const { id } = useParams();

  const [career, setCareer] = useState(null);
  const [loadingCareer, setLoadingCareer] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const response = await getCareerById(id);

        const careerData =
          response.data?.career || response.career || response.data;

        setCareer(careerData);
      } catch (error) {
        console.error(error);

        setServerError(
          error.response?.data?.message || "Unable to load this job.",
        );
      } finally {
        setLoadingCareer(false);
      }
    };

    fetchCareer();
  }, [id]);

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
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    setFormData((prev) => ({
      ...prev,
      resume: file || null,
    }));

    setErrors((prev) => ({
      ...prev,
      resume: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.resume) {
      newErrors.resume = "Resume is required";
    }

    if (formData.coverLetter.length > 2000) {
      newErrors.coverLetter = "Cover letter cannot exceed 2000 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("career", id);
      data.append("name", formData.name.trim());
      data.append("email", formData.email.trim());
      data.append("phone", formData.phone.trim());

      if (formData.coverLetter.trim()) {
        data.append("coverLetter", formData.coverLetter.trim());
      }

      data.append("resume", formData.resume);

      await createJobApplication(data);

      setSuccess(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        coverLetter: "",
        resume: null,
      });

      setErrors({});
    } catch (error) {
      console.error("Application submission failed:", error);

      const backendErrors = error.response?.data?.errors;

      if (Array.isArray(backendErrors)) {
        const formattedErrors = {};

        backendErrors.forEach((item) => {
          formattedErrors[item.field] = item.message;
        });

        setErrors(formattedErrors);
      } else {
        setServerError(
          error.response?.data?.message || "Unable to submit your application.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingCareer) {
    return (
      <main className="min-h-[70vh] bg-slate-50 p-6">
        <div className="mx-auto max-w-3xl animate-pulse">
          <div className="h-8 w-48 rounded bg-slate-200" />
          <div className="mt-6 h-12 w-2/3 rounded bg-slate-200" />
          <div className="mt-10 h-96 rounded-2xl bg-slate-200" />
        </div>
      </main>
    );
  }

  if (!career) {
    return (
      <main className="bg-slate-50 py-20">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-950">Job not found</h1>

          <p className="mt-3 text-slate-500">
            {serverError || "This position is no longer available."}
          </p>

          <Link
            to="/careers"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft size={17} />
            Back to careers
          </Link>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="bg-slate-50 py-20">
        <div className="mx-auto max-w-xl px-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={32} />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-950">
              Application submitted
            </h1>

            <p className="mt-3 leading-7 text-slate-500">
              Thank you for applying for the <strong>{career.title}</strong>{" "}
              position. Our team will review your application.
            </p>

            <Link
              to="/careers"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white"
            >
              Browse Other Positions
              <ArrowLeft size={17} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            to={`/careers/${career._id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-950"
          >
            <ArrowLeft size={17} />
            Back to job
          </Link>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
            Apply Now
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            {career.title}
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            {career.department} · {career.location}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
          >
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Your information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Fill in your details below to apply for this position.
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <FormField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Enter your name"
              />

              <FormField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
              />

              <div className="sm:col-span-2">
                <FormField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Resume */}
            <div className="mt-6">
              <label className="text-sm font-medium text-slate-700">
                Resume
              </label>

              <label
                htmlFor="resume"
                className={`mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-5 py-8 text-center transition ${
                  errors.resume
                    ? "border-red-300 bg-red-50"
                    : "border-slate-200 hover:border-amber-400 hover:bg-amber-50/30"
                }`}
              >
                <Upload size={25} className="text-slate-400" />

                <span className="mt-3 text-sm font-medium text-slate-700">
                  {formData.resume
                    ? formData.resume.name
                    : "Upload your resume"}
                </span>

                <span className="mt-1 text-xs text-slate-400">
                  PDF, DOC or DOCX
                </span>

                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {errors.resume && (
                <p className="mt-1.5 text-xs text-red-500">{errors.resume}</p>
              )}
            </div>

            {/* Cover Letter */}
            <div className="mt-6">
              <label
                htmlFor="coverLetter"
                className="text-sm font-medium text-slate-700"
              >
                Cover Letter
                <span className="ml-1 text-slate-400">(Optional)</span>
              </label>

              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={7}
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Tell us why you would be a good fit..."
                className={`mt-2 w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ${
                  errors.coverLetter
                    ? "border-red-400"
                    : "border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                }`}
              />

              <div className="mt-1 flex justify-between">
                {errors.coverLetter ? (
                  <p className="text-xs text-red-500">{errors.coverLetter}</p>
                ) : (
                  <span />
                )}

                <span className="text-xs text-slate-400">
                  {formData.coverLetter.length}/2000
                </span>
              </div>
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <FileText size={18} className="mt-0.5 shrink-0 text-red-500" />

                <p className="text-sm text-red-600">{serverError}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-7 w-full rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting Application..." : "Submit Application"}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              By submitting this application, you confirm that the information
              provided is accurate.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ${
          error
            ? "border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
        }`}
      />

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default JobApplication;
