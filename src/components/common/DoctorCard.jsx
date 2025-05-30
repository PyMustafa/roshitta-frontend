import { useNavigate } from "react-router-dom"; // استدعيه
const DoctorCard = ({ doctor }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/doctor-profile/${doctor.id}`); // Use doctor.id instead of doctor.uid
  };
    return (
    <div 
    onClick={handleClick}
    className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] transition-all duration-300 w-full">             {/* Doctor Image with light blue background */}
        <div className="bg-[#EAEFFF] h-60 flex items-center justify-center p-4">
          <img 
            src={doctor.profile_image} 
            alt={doctor.first_name}
            className="h-full object-contain "
            style={{
                transform: 'translateY(8%)'
              }}
          />
        </div>
  
        {/* Doctor Info */}
        <div className="p-4">
          {/* Availability Status */}
          <div className="flex items-center gap-2 text-sm text-green-500 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <p>Available</p>
          </div>
  
          {/* Name and Specialty */}
          <h3 className="text-lg font-medium text-[#262626]">{doctor.first_name}</h3>
          <p className="text-sm text-[#5C5C5C] mb-1">{doctor.specialty_name}</p>
  
          
        </div>
      </div>
    );
  };
  
  export default DoctorCard;