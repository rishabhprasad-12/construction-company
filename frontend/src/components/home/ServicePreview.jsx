import { useEffect, useState } from "react";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import SectionHeading from "../common/SectionHeading";
import ServiceCard from "./ServiceCard";
import { getServices } from "../../services/serviceService";

import CardCarousel from "../common/CardCarousel";

const ServicesPreview = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await getServices();

        setServices(response?.data || []);
      } catch (error) {
        console.error(error?.response?.data?.message);

        setError("Unable to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <section className="bg-slate-100 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Construction expertise built around your needs"
          description="From new construction to renovation and planning, we provide practical solutions with quality at every stage."
        />

        {/* Loading */}
        {loading && (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200"
              >
                <div className="aspect-[4/3] bg-slate-200" />

                <div className="space-y-3 p-6">
                  <div className="h-3 w-20 rounded bg-slate-200" />
                  <div className="h-5 w-40 rounded bg-slate-200" />
                  <div className="h-3 w-32 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-12 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && services.length === 0 && (
          <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-slate-500">No featured projects available.</p>
          </div>
        )}

        {/* Services */}
        {!loading && !error && services.length > 0 && (
          <div className="mt-12">
            <CardCarousel
              desktopSlides={3}
              tabletSlides={2}
              totalSlides={services.length}
            >
              {services.map((service) => (
                <div key={service._id} className="px-3">
                  <ServiceCard service={service} />
                </div>
              ))}
            </CardCarousel>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-amber-500"
          >
            View all services
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
