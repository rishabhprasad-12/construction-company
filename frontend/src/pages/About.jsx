import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Building2,
  ShieldCheck,
  Target,
  Users,
  Eye,
  CheckCircle2,
} from "lucide-react";

import SectionHeading from "../components/common/SectionHeading"

const About = () => {
  const values = [
    {
      icon: <ShieldCheck size={24} />,
      title: "Quality First",
      description:
        "We focus on quality materials, skilled workmanship and attention to detail at every stage.",
    },
    {
      icon: <Users size={24} />,
      title: "Client Focused",
      description:
        "We listen to your requirements and work closely with you throughout the project.",
    },
    {
      icon: <Award size={24} />,
      title: "Built to Last",
      description:
        "Our goal is to create spaces that are functional, durable and designed for the future.",
    },
  ];

  const stats = [
    {
      value: "100+",
      label: "Projects Completed",
    },
    {
      value: "10+",
      label: "Years of Experience",
    },
    {
      value: "50+",
      label: "Skilled Professionals",
    },
    {
      value: "100%",
      label: "Commitment to Quality",
    },
  ];

  const reasons = [
    "Experienced and skilled construction professionals",
    "Transparent communication throughout the project",
    "Focus on quality, safety and long-term value",
    "Practical solutions tailored to your requirements",
  ];

  return (
    <main className="bg-slate-50">
      {/* Page Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
            About Us
          </p>

          <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Building spaces with purpose and precision
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            We bring together planning, craftsmanship and practical experience
            to deliver construction solutions built around your needs.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl bg-slate-200">
            <img
              src="/images/about-company.jpg"
              alt="Construction team at work"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Our Story
            </p>

            <h2 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">
              Construction built on trust and commitment
            </h2>

            <div className="mt-6 space-y-4 leading-7 text-slate-600">
              <p>
                We believe every successful project begins with a clear
                understanding of the client's needs. Our approach combines
                careful planning, skilled execution and consistent
                communication.
              </p>

              <p>
                From residential spaces to larger construction projects, we work
                to create solutions that balance functionality, quality and
                long-term value.
              </p>

              <p>
                Our focus is simple: deliver work that our clients can trust and
                spaces they can be proud of.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="rounded-2xl bg-slate-950 p-7 sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-slate-950">
              <Target size={24} />
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              Our Mission
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white">
              Deliver quality without compromise
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              To provide reliable construction services through quality
              workmanship, transparent communication and a strong commitment to
              client satisfaction.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-slate-950">
              <Eye size={24} />
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Our Vision
            </p>

            <h2 className="mt-3 text-2xl font-bold text-slate-950">
              Build a better future, one project at a time
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              To become a trusted construction partner known for dependable
              work, modern solutions and long-term relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Our Values
            </p>

            <h2 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">
              The principles behind our work
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  {value.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  {value.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Why Choose Us
            </p>

            <h2 className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">
              A reliable partner from planning to completion
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Construction projects require more than just execution. They
              require coordination, communication and a commitment to doing
              things properly.
            </p>

            <div className="mt-7 space-y-4">
              {reasons.map((reason) => (
                <div key={reason} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-amber-500"
                  />

                  <p className="text-sm leading-6 text-slate-600">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950 p-8 sm:p-10">
            <Building2 size={40} className="text-amber-500" />

            <h3 className="mt-6 text-2xl font-bold text-white">
              Have a project in mind?
            </h3>

            <p className="mt-4 leading-7 text-slate-400">
              Tell us about your requirements and let's discuss how we can help
              bring your project to life.
            </p>

            <Link
              to="/quote"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Get a Quote
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="border-y border-slate-200 bg-white py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-slate-950 sm:text-4xl">
                {stat.value}
              </p>

              <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-950 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
            Let's Build Together
          </p>

          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to start your next project?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">
            Share your requirements with us and take the first step toward
            building something great.
          </p>

          <Link
            to="/quote"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            Start Your Project
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
