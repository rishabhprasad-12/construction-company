import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { getServicesById } from "../services/serviceService";

const ServiceDetails = () => {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getServicesById(id);

        const serviceData =
          response.data?.service || response.service || response.data;

        setService(serviceData);
      } catch (error) {
        console.error("Failed to fetch service:", error);

        setError(
          error.response?.data?.message || "Unable to load this service.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return <ServiceDetailsSkeleton />;
  }

  if (error || !service) {
    return (
      <main className="bg-slate-50 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h1 className="text-2xl font-bold text-slate-950">
            Service not found
          </h1>

          <p className="mt-3 text-slate-500">
            {error ||
              "The service you're looking for doesn't exist or is no longer available."}
          </p>

          <Link
            to="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <ArrowLeft size={17} />
            Back to services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50">
      {/* Back Navigation */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft size={17} />
            Back to services
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-white pb-12 pt-8 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Content */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
                Our Service
              </p>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {service.title}
              </h1>

              <p className="mt-6 leading-8 text-slate-600">
                {service.description}
              </p>

              <Link
                to="/quote"
                state={{
                  serviceTitle: service.title,
                }}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
              >
                Get a Quote
                <ArrowRight size={17} />
              </Link>
            </div>

            {/* Image */}
            <div className="overflow-hidden rounded-2xl bg-slate-200">
              {service.image ? (
                <img
                  src={service.image}
                  alt={service.title}
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center text-slate-400">
                  No image available
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {service.features?.length > 0 && (
        <section className="py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            {/* Left */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
                What We Offer
              </p>

              <h2 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">
                Everything you need for your project
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Our service is designed to provide a structured and reliable
                approach from planning through completion.
              </p>
            </div>

            {/* Features List */}
            <div className="grid gap-4 sm:grid-cols-2">
              {service.features.map((feature, index) => (
                <div
                  key={`${feature}-${index}`}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-5"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-amber-500"
                  />

                  <p className="text-sm leading-6 text-slate-600">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
            Ready to get started?
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-bold text-slate-950 sm:text-3xl">
            Let's discuss your project requirements
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            Tell us about your project and our team will help you explore the
            right solution.
          </p>

          <Link
            to="/quote"
            state={{
              serviceTitle: service.title,
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Request a Quote
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
};

const ServiceDetailsSkeleton = () => {
  return (
    <main className="bg-slate-50">
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl animate-pulse px-4 sm:px-6 lg:px-8">
          <div className="h-5 w-32 rounded bg-slate-200" />

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div>
              <div className="h-12 w-3/4 rounded bg-slate-200" />

              <div className="mt-6 space-y-3">
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-5/6 rounded bg-slate-200" />
                <div className="h-4 w-4/6 rounded bg-slate-200" />
              </div>

              <div className="mt-8 h-12 w-40 rounded-xl bg-slate-200" />
            </div>

            <div className="aspect-[4/3] rounded-2xl bg-slate-200" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetails;
