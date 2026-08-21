import { useState } from "react";
import { Send } from "lucide-react";

import { createQuote } from "../../services/quoteService";
import { useAuth } from "../../context/AuthContext";

const QuoteForm = ({ serviceTitle, projectTitle }) => {
  const {user} = useAuth();

  const initialFormData = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    projectType: "",
    location: "",
    estimatedBudget: "",
    projectDescription: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.projectType) {
      newErrors.projectType = "Please select a project type";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = "Please describe your project";
    }

    if (!formData.estimatedBudget) {
      newErrors.estimatedBudget = "Please select an estimated budget";
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
      setSubmitting(true);

      const quoteData = {
        ...formData,
        preferredStartDate: formData.preferredStartDate || undefined,
      };

      await createQuote(quoteData);

      setSuccess(true);
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error("Failed to submit quote:", error);

      /*
        Supports backend responses like:

        {
          success: false,
          message: "Validation failed",
          errors: [
            {
              field: "email",
              message: "Invalid email"
            }
          ]
        }
      */

      const backendErrors = error.response?.data?.errors;

      if (Array.isArray(backendErrors)) {
        const formattedErrors = {};

        backendErrors.forEach((errorItem) => {
          formattedErrors[errorItem.field] = errorItem.message;
        });

        setErrors(formattedErrors);
      } else {
        setServerError(
          error.response?.data?.message ||
            "Something went wrong. Please try again.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-green-200 bg-white p-8 text-center sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
          ✓
        </div>

        <h2 className="mt-5 text-2xl font-bold text-slate-950">
          Request submitted successfully
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
          Thank you for sharing your project details. Our team will review your
          request and get in touch with you.
        </p>

        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm font-semibold text-amber-500 hover:text-amber-600"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
    >
      {/* Selected project */}
      {(serviceTitle || projectTitle) && (
        <div className="mb-7 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
            Interested in
          </p>

          <p className="mt-1 font-semibold text-slate-900">{serviceTitle || projectTitle}</p>
        </div>
      )}

      {serverError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">{serverError}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
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

        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="Enter your phone number"
        />

        <SelectField
          label="Project Type"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          error={errors.projectType}
        >
          <option value="">Select project type</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Renovation">Renovation</option>
          <option value="Other">Other</option>
        </SelectField>

        <FormField
          label="Project Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          error={errors.location}
          placeholder="City, State"
        />

        <SelectField
          label="Estimated Budget"
          name="estimatedBudget"
          value={formData.estimatedBudget}
          onChange={handleChange}
          error={errors.estimatedBudget}
        >
          <option value="">Select budget range</option>
          <option value="Under ₹5 Lakhs">Under ₹5 Lakhs</option>
          <option value="₹5 - ₹10 Lakhs">₹5 - ₹10 Lakhs</option>
          <option value="₹10 - ₹25 Lakhs">₹10 - ₹25 Lakhs</option>
          <option value="₹25 - ₹50 Lakhs">₹25 - ₹50 Lakhs</option>
          <option value="Above ₹50 Lakhs">Above ₹50 Lakhs</option>
        </SelectField>
      </div>

      <div className="mt-5">
        <label className="text-sm font-medium text-slate-700">
          Tell us about your project
        </label>

        <textarea
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
          rows={6}
          placeholder="Describe your project, requirements, timeline or anything else you'd like us to know..."
          className={`mt-2 w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ${
            errors.projectDescription
              ? "border-red-400 focus:ring-2 focus:ring-red-100"
              : "border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
          }`}
        />

        {errors.projectDescription && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.projectDescription}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          "Submitting..."
        ) : (
          <>
            Send Project Request
            <Send size={17} />
          </>
        )}
      </button>
    </form>
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

const SelectField = ({ label, name, value, onChange, error, children }) => {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ${
          error
            ? "border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
        }`}
      >
        {children}
      </select>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default QuoteForm;
