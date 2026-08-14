import React from "react";
import Hero from "../components/home/Hero";
import ServicesPreview from "../components/home/ServicePreview";
import FeaturedProjects from "../components/home/FeaturedProjects";
import WhyChooseUs from "../components/home/WhyChooseUs";
import WorkProcess from "../components/home/WorkProcess";
import CTA from "../components/home/CTA";

const Home = () => {
  return (
    <>
      <Hero />

      <ServicesPreview />

      <FeaturedProjects />

      <WhyChooseUs />

      <WorkProcess />

      <CTA />
    </>
  );
};

export default Home;
