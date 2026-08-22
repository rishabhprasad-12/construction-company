import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

import { createEnquiry } from "../../services/enquiryService";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.length > 150) {
      newErrors.subject = "Subject cannot exceed 150 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length > 2000) {
      newErrors.message = "Message cannot exceed 2000 characters";
    }

    if (formData.name.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters";
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

      const enquiryData = {
        ...formData,

        // Optional phone should not be sent if empty
        phone: formData.phone.trim() || undefined,
      };

      await createEnquiry(enquiryData);

      setSuccess(true);
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error("Failed to submit enquiry:", error);

      const backendErrors = error.response?.data?.errors;

      // Handles your global Mongoose validation response
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
      setLoading(false);
    }
  };

  return (
    <main className="bg-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
            Contact Us
          </p>

          <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Let's discuss your next project
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Have a question or planning a new project? Send us a message and our
            team will get back to you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] sm:px-6 lg:px-8">
          {/* Contact Information */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Get In Touch
            </p>

            <h2 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">
              We're here to help
            </h2>

            <p className="mt-5 max-w-md leading-7 text-slate-600">
              Whether you're planning a new construction project, renovation, or
              simply want to know more about our services, we'd love to hear
              from you.
            </p>

            <div className="mt-8 space-y-5">
              <ContactInfo
                icon={<Phone size={20} />}
                title="Call Us"
                value="+91 XXXXX XXXXX"
              />

              <ContactInfo
                icon={<Mail size={20} />}
                title="Email Us"
                value="hello@yourcompany.com"
              />

              <ContactInfo
                icon={<MapPin size={20} />}
                title="Visit Us"
                value="Your City, India"
              />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            {success ? (
              <SuccessState onReset={() => setSuccess(false)} />
            ) : (
              <form onSubmit={handleSubmit}>
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

                  <div className="sm:col-span-2">
                    <FormField
                      label="Phone Number (Optional)"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <FormField
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={errors.subject}
                      placeholder="What would you like to discuss?"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mt-5">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-slate-700"
                  >
                    Your Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={7}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className={`mt-2 w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm outline-none transition ${
                      errors.message
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                    }`}
                  />

                  <div className="mt-1.5 flex justify-between">
                    {errors.message ? (
                      <p className="text-xs text-red-500">{errors.message}</p>
                    ) : (
                      <span />
                    )}

                    <p className="text-xs text-slate-400">
                      {formData.message.length}/2000
                    </p>
                  </div>
                </div>

                {/* Server Error */}
                {serverError && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm text-red-600">{serverError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send size={17} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

const ContactInfo = ({ icon, title, value }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-950">{title}</h3>

        <p className="mt-1 text-sm text-slate-500">{value}</p>
      </div>
    </div>
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

const SuccessState = ({ onReset }) => {
  return (
    <div className="py-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
        ✓
      </div>

      <h2 className="mt-5 text-2xl font-bold text-slate-950">
        Message sent successfully
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
        Thank you for contacting us. Our team will review your enquiry and get
        back to you as soon as possible.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm font-semibold text-amber-500 hover:text-amber-600"
      >
        Send another message
      </button>
    </div>
  );
};

export default Contact;
