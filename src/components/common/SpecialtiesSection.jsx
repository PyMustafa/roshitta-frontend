import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getSpecialties } from "../../api/profiles/specialty";

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

// Static specialty images and icons mapping
const specialtyImages = {
  "Orthopedic": { image: OrthopedicImg, icon: OrthopedicIcon },
  "Laboratory": { image: LaboratoryImg, icon: LaboratoryIcon },
  "Ultrasound": { image: UltrasoundImg, icon: UltrasoundIcon },
  "Urology": { image: UrologyImg, icon: UrologyIcon },
  "Ophthalmology": { image: OphthalmologyImg, icon: OphthalmologyIcon },
  "Cardiologist": { image: CardiologistImg, icon: CardiologistIcon },
  "Dentist": { image: DentistImg, icon: DentistIcon },
  "Neurology": { image: NeurologyImg, icon: NeurologyIcon },
};

// Default fallback images
const defaultImage = OrthopedicImg;
const defaultIcon = OrthopedicIcon;

// Updated SpecialtyCard component with programmatic navigation
const SpecialtyCard = ({ id, name, doctors_count, image, icon }) => {
  const navigate = useNavigate();

  const handleSpecialtyClick = () => {
    navigate({
      pathname: '/doctors',
      search: `?specialty=${encodeURIComponent(name)}`,
    });
  };

  return (
    <div className="flex flex-col items-center px-1.5 md:px-2">
      <div
        onClick={handleSpecialtyClick}
        className="w-full cursor-pointer"
      >
        <div className="relative rounded-xl overflow-hidden shadow-md h-[160px] md:h-[180px] w-full bg-white group">
          <img
            src={image}
            alt={`${name}`}
            className="h-full w-full object-cover rounded-xl transition-all duration-300 group-hover:brightness-50"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-500 group-hover:scale-x-[-1]">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-white shadow-md border border-gray-200 group-hover:bg-[#09e5ab] transition-colors">
              <img
                src={icon}
                alt={`${name} icon`}
                className="w-2/3 h-2/3 object-contain transition duration-300 group-hover:brightness-0 group-hover:invert"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 text-center px-1">
        <h3 className="text-sm md:text-base font-bold text-gray-900">
          <div
            onClick={handleSpecialtyClick}
            className="hover:text-[#09e5ab] transition-colors cursor-pointer"
          >
            {name}
          </div>
        </h3>
        <p className="text-xs md:text-sm mt-1 text-gray-500">
          {doctors_count === 0 ? "No Doctors" : `${doctors_count} Doctor${doctors_count !== 1 ? "s" : ""}`}
        </p>
      </div>
    </div>
  );
};

// Main SpecialtiesSection component
const SpecialtiesSection = () => {
  const sliderRef = React.useRef(null);
  const [specialtiesData, setSpecialtiesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setLoading(true);
        const data = await getSpecialties();
        const specialties = Array.isArray(data) ? data : data.results || [];

        // Map API specialties to display data with images
        const specialtiesWithImages = specialties.map(specialty => {
          // Get the image and icon based on specialty name, or use defaults
          const assets = specialtyImages[specialty.name] || { image: defaultImage, icon: defaultIcon };

          return {
            id: specialty.id,
            name: specialty.name,
            doctors_count: specialty.doctors_count || 0,
            image: assets.image,
            icon: assets.icon
          };
        });

        setSpecialtiesData(specialtiesWithImages);
      } catch (error) {
        console.error('Error fetching specialties:', error);
        // Fallback to static data
        setSpecialtiesData(
          Object.entries(specialtyImages).map(([name, assets]) => ({
            name,
            doctors_count: 0,
            image: assets.image,
            icon: assets.icon
          }))
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20px'
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px'
        }
      }
    ]
  };

  return (
    <section className="py-8 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 md:mb-8 mt-4 md:mt-6">
          <span className="inline-block bg-[#5F6FFF] text-white text-sm md:text-lg px-3 py-1 rounded-full">
            • Top Specialties •
          </span>
          <p className="text-2xl md:text-4xl text-black font-bold mt-2 md:mt-3">
            Highlighting the Care & Support
          </p>
        </div>

        <div className="relative">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#09e5ab]"></div>
            </div>
          ) : (
            <Slider ref={sliderRef} {...settings}>
              {specialtiesData.map((specialty, index) => (
                <SpecialtyCard key={specialty.id || index} {...specialty} />
              ))}
            </Slider>
          )}

          <div className="flex justify-center mt-4 md:mt-6 gap-4">
            <button
              onClick={() => sliderRef.current.slickPrev()}
              className="p-2 md:p-3 rounded-full bg-gray-100 hover:bg-[#09e5ab] hover:text-white transition-colors w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
            >
              ❮
            </button>
            <button
              onClick={() => sliderRef.current.slickNext()}
              className="p-2 md:p-3 rounded-full bg-gray-100 hover:bg-[#09e5ab] hover:text-white transition-colors w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
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