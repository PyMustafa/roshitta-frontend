import contactImage from '../../assets/contact_us.png';

const ContactUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* العنوان */}
      <div className="text-center text-2xl pt-10 text-[#707070]">
        <p>CONTACT <span className="text-gray-700 font-semibold">US</span></p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-10 mb-28">
        <img 
          className="w-full md:max-w-[360px] rounded-lg object-cover"
          src={contactImage}
          alt="Prescripto Office"
        />

        <div className="flex flex-col justify-center items-start gap-6 text-sm">
          <div>
            <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
            <p className="text-gray-500 mt-2">
            15 Tahrir Square<br />
            Downtown, Cairo 11511, Egypt
            </p>
          </div>

          <div>
            <p className="text-gray-500">Tel: (+20) 000 0000000</p>
            <p className="text-gray-500">Email: roshitta@gmail.com</p>
          </div>

          <div className="mt-4">
            <p className="font-semibold text-lg text-gray-600">CAREERS AT PRESCRIPTO</p>
            <p className="text-gray-500 mt-2">
              Learn more about our teams and job openings.
            </p>
          </div>

          <button className="border  border-gray-200 border-black rounded-full  px-8 py-3 text-sm hover:bg-[#5F6FFF] hover:text-white transition-all duration-300 cursor-pointer">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;