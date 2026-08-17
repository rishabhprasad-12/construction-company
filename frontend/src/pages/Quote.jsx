import { useLocation } from "react-router-dom";
import { CheckCircle2, ClipboardList, MessageSquare } from "lucide-react";

import SectionHeading from "../components/common/SectionHeading";
import QuoteForm from "../components/quote/QuoteForm";

const Quote = () => {
  const location = useLocation();

  const projectId = location.state?.projectId || "";
  const projectTitle = location.state?.projectTitle || "";

  return (
    <main className="bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading
            eyebrow="Start Your Project"
            title="Let's discuss your project"
            description="Tell us a little about what you have in mind, and we'll get back to you with the next steps."
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          {/* Left information */}
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              What happens next?
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Share your project requirements with us. Our team will review your
              details and contact you to discuss the next steps.
            </p>

            <div className="mt-8 space-y-6">
              <QuoteStep
                icon={<ClipboardList size={20} />}
                number="01"
                title="Share your requirements"
                description="Tell us about your project, location and requirements."
              />

              <QuoteStep
                icon={<MessageSquare size={20} />}
                number="02"
                title="We'll review your request"
                description="Our team will review the information you provide."
              />

              <QuoteStep
                icon={<CheckCircle2 size={20} />}
                number="03"
                title="We'll get in touch"
                description="We'll contact you to discuss your project and next steps."
              />
            </div>
          </div>

          {/* Form */}
          <QuoteForm projectId={projectId} projectTitle={projectTitle} />
        </div>
      </section>
    </main>
  );
};

const QuoteStep = ({ icon, number, title, description }) => {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-slate-950">
        {icon}
      </div>

      <div>
        <span className="text-xs font-bold text-amber-500">{number}</span>

        <h3 className="mt-1 font-semibold text-slate-900">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );
};

export default Quote;
