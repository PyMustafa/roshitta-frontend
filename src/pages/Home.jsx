import React from 'react';
import Navbar from '../components/common/Navbar';
import HeaderSection from '../components/common/HeaderSection';
import SpecialtiesSection from '../components/common/SpecialtiesSection';
import DoctorsSection from '../components/common/DoctorsSection';

const Home = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <HeaderSection />
      <SpecialtiesSection />
      <DoctorsSection />
      
    </div>
  );
};

export default Home;