import React from 'react';
import Navbar from '../components/common/Navbar';
import HeaderSection from '../components/common/HeaderSection';
import SpecialtiesSection from '../components/common/SpecialtiesSection';
import DoctorsSection from '../components/common/DoctorsSection';
import AppointmentSection from '../components/common/AppointmentSection';
import FeaturesSection from '../components/common/FeaturesSection';
import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <HeaderSection />
      <SpecialtiesSection />
      <DoctorsSection />
      <AppointmentSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Home;