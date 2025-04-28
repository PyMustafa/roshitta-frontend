// src/pages/ContactUsPage.jsx
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ContactUs from '../components/common/ContactUs';

const ContactUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default ContactUsPage;