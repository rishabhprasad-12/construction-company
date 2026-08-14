import { ShieldCheck, Clock3, Users, BadgeCheck } from "lucide-react";

import SectionHeading from "../common/SectionHeading";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Quality First",
    description:
      "We maintain high standards of quality throughout planning, construction and final delivery.",
  },
  {
    icon: Clock3,
    title: "On-Time Delivery",
    description:
      "Clear planning and consistent project monitoring help us keep projects moving on schedule.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description:
      "Our professionals bring practical construction knowledge and attention to detail to every project.",
  },
  {
    icon: BadgeCheck,
    title: "Reliable Results",
    description:
      "We focus on durable solutions, transparent communication and long-term client satisfaction.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-slate-950 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built on quality, trust and accountability"
          description="Construction is more than putting materials together. It's about creating spaces people can rely on for years to come."
          align="left"
          theme="dark"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-slate-950">
                  <Icon size={22} />
                </div>

                <h3 className="mt-6 text-lg font-bold text-white">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
