import IntroSection from '../components/common/IntroSection';
import WhyChooseUs from '../components/common/WhyChooseUs';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex-grow max-w-6xl mx-auto px-4 py-12">
        {/* About Us Title */}
        <div className="text-center text-2xl pt-10 text-[#707070]">
        
        </div>

        {/* Intro Section */}
        <IntroSection />

        {/* Why Choose Us Section */}
        <WhyChooseUs />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
