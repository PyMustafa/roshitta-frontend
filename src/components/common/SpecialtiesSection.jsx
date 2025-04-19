import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import OrthopedicImg from "../../assets/HomePage/Orthopedic.png";
import LaboratoryImg from "../../assets/HomePage/Laboratory.png";
import OphthalmologyImg from "../../assets/HomePage/Ophthalmology.png";
import NeurologyImg from "../../assets/HomePage/Neurology.png";
import DentistImg from "../../assets/HomePage/Dentist.png";
import CardiologistImg from "../../assets/HomePage/Cardiologist.png";
import UltrasoundImg from "../../assets/HomePage/Ultrasound.png";
import UrologyImg from "../../assets/HomePage/Urology.png";

import OrthopedicIcon from "../../assets/HomePage/Orthopedic_icon.svg";
import LaboratoryIcon from "../../assets/HomePage/Laboratory_icon.svg";
import OphthalmologyIcon from "../../assets/HomePage/Ophthalmology_icon.svg";
import NeurologyIcon from "../../assets/HomePage/Neurology_icon.svg";
import DentistIcon from "../../assets/HomePage/Dentist_icon.svg";
import CardiologistIcon from "../../assets/HomePage/Cardiologist_icon.svg";
import UltrasoundIcon from "../../assets/HomePage/Ultrasound_icon.svg";
import UrologyIcon from "../../assets/HomePage/Urology_icon.svg";

const specialties = [
  { name: "Orthopedic", doctors: 1, image: OrthopedicImg, icon: OrthopedicIcon },
  { name: "Laboratory", doctors: 0, image: LaboratoryImg, icon: LaboratoryIcon },
  { name: "Ultrasound", doctors: 0, image: UltrasoundImg, icon: UltrasoundIcon },
  { name: "Urology", doctors: 1, image: UrologyImg, icon: UrologyIcon },
  { name: "Ophthalmology", doctors: 1, image: OphthalmologyImg, icon: OphthalmologyIcon },
  { name: "Cardiologist", doctors: 4, image: CardiologistImg, icon: CardiologistIcon },
  { name: "Dentist", doctors: 1, image: DentistImg, icon: DentistIcon },
  { name: "Neurology", doctors: 0, image: NeurologyImg, icon: NeurologyIcon },
];

const SpecialtyCard = ({ name, doctors, image, icon }) => (
  <div className="flex flex-col items-center group px-1.5">
    <div className="relative rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:brightness-50 h-[180px] w-full bg-white">
      <img
        src={image}
        alt={`${name}`}
        className="h-full w-full object-cover rounded-xl"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-500 group-hover:scale-x-[-1]">
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-md border border-gray-200 group-hover:bg-[#5F6FFF] transition-colors">
          <img
            src={icon}
            alt={`${name} icon`}
            className="w-2/3 h-2/3 object-contain transition duration-300 group-hover:brightness-0 group-hover:invert"
          />
        </div>
      </div>
    </div>
    <div className="mt-3 text-center">
      <h3 className="text-base font-bold text-gray-900">
        <a href={`/specialty/${name}`} className="hover:text-[#09e5ab] transition-colors">
          {name}
        </a>
      </h3>
      <p className="text-sm mt-1 text-gray-500">
        {doctors === 0 ? "No Doctors" : `${doctors} Doctor${doctors !== 1 ? "s" : ""}`}
      </p>
    </div>
  </div>
);

const SpecialtiesSection = () => {
  const sliderRef = React.useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1600, settings: { slidesToShow: 7 } },
      { breakpoint: 1440, settings: { slidesToShow: 6 } },
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 mt-6">
          <span className="inline-block bg-[#5F6FFF] text-white text-lg px-3 py-1 rounded-full">
            • Top Specialties •
          </span>
          <p className="text-4xl text-black font-bold mt-3">
            Highlighting the Care & Support
          </p>
        </div>

        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {specialties.map((specialty, index) => (
              <SpecialtyCard key={index} {...specialty} />
            ))}
          </Slider>

          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => sliderRef.current.slickPrev()}
              className="p-3 rounded-full bg-gray-100 hover:bg-[#09e5ab] hover:text-white transition-colors w-10 h-10 flex items-center justify-center"
            >
              ❮
            </button>
            <button
              onClick={() => sliderRef.current.slickNext()}
              className="p-3 rounded-full bg-gray-100 hover:bg-[#09e5ab] hover:text-white transition-colors w-10 h-10 flex items-center justify-center"
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
