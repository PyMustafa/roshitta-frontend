import { useState } from 'react';
import { User, CalendarDays, Phone, Eye } from 'lucide-react';
import Avatar from '../../../components/common/Avatar';
import ViewPrescriptionModal from '../../../components/common/ViewPrescriptionModal';
import { getPrescriptionByPatient } from '../../../api/medical/prescriptions';
import { toast } from 'react-hot-toast';

/**
 * Patient card component for displaying patient information
 * 
 * @param {Object} props - The component props
 * @param {Object} props.patient - Patient data
 * @param {boolean} props.hasPrescription - Whether the patient has a prescription
 * @returns {JSX.Element} The component
 */
const PatientCard = ({ patient, hasPrescription = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!patient) return null;

  const handleViewPrescription = async () => {
    try {
      setLoading(true);
      // Get prescription for this patient
      const prescription = await getPrescriptionByPatient(patient.id);
      
      if (prescription) {
        setPrescriptionData(prescription);
        setIsViewModalOpen(true);
      } else {
        toast.error('No prescription found for this patient');
      }
    } catch (error) {
      console.error('Error fetching prescription:', error);
      toast.error('Failed to load prescription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md border border-gray-200 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5">
        <div className="flex items-start">
          <div className="mr-4">
            <Avatar 
              src={patient.profile_image} 
              alt={`${patient.first_name} ${patient.last_name}`}
              size={56}
            />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {patient.first_name} {patient.last_name}
            </h3>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <User className="w-4 h-4 mr-2 text-gray-400" />
                {patient.gender || 'Not specified'}
              </div>
              
              {patient.appointment_date && (
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarDays className="w-4 h-4 mr-2 text-gray-400" />
                  Last visit: {new Date(patient.appointment_date).toLocaleDateString()}
                </div>
              )}
              
              {patient.phone_number && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  {patient.phone_number}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className={`flex justify-end mt-4 ${isHovered ? 'opacity-100' : 'opacity-70'} transition-opacity duration-300`}>
          {hasPrescription && (
            <button
              onClick={handleViewPrescription}
              disabled={loading}
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors duration-200 disabled:opacity-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Prescription
            </button>
          )}
        </div>
      </div>

      {/* View Prescription Modal */}
      {prescriptionData && (
        <ViewPrescriptionModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          prescription={{
            ...prescriptionData,
            prescription_date: new Date(prescriptionData.created_at).toLocaleDateString(),
            doctor: { name: prescriptionData.doctor_name || 'Your Doctor' },
            patient: { name: `${patient.first_name} ${patient.last_name}` },
            appointment: { date: prescriptionData.appointment_date || new Date().toLocaleDateString() }
          }}
        />
      )}
    </div>
  );
};

export default PatientCard; 