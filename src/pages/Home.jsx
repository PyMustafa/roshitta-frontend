import React from 'react';
import HeaderSection from '../components/common/HeaderSection';
import Navbar from '../components/common/Navbar';

const Home = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <HeaderSection />
      
      <section className="py-12 bg-white-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        </div>
      </section>
    </div>
  );
};

export default Home;