import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Featured from "./Featured";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className='w-full'>
      <Header page='home' />
      <HeroSection />
      <Featured />
      <Footer />
    </div>
  );
};

export default LandingPage;
