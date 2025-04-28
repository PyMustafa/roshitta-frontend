import aboutImage from '../../assets/about_us.png';

const AboutUsTitle = () => {
  return (
    <div className="text-center text-2xl pt-10 text-[#707070]">
      <p>
        ABOUT <span className="text-gray-700 font-semibold">US</span>
      </p>
    </div>
  );
};

const IntroSection = () => {
  return (
    <div className="my-10">
      {/* About Us Title */}
      <AboutUsTitle />

      {/* Intro Section */}
      <div className="flex flex-col md:flex-row gap-12 mt-10">
        {/* Left Image */}
        <img
          className="w-full md:max-w-[360px]"
          src={aboutImage}
          alt="About Prescripto"
        />

        {/* Right Text */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently.
            At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments
            and managing their health records.
          </p>

          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform,
            integrating the latest advancements to improve user experience and deliver superior service. Whether you're
            booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>

          <b className="text-gray-800">Our Vision</b>

          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap
            between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
