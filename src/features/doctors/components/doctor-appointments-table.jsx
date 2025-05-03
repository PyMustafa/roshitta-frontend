import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, AlertCircle, Filter, Search, FileText, MoreVertical, PlusCircle, Eye } from 'lucide-react';
import { getMyAppointments } from '../../../api/appointments/doctor';
import Pagination from '../../../components/common/Pagination';
import DoctorPrescriptionModal from '../../../components/common/DoctorPrescriptionModal';
import ViewPrescriptionModal from '../../../components/common/ViewPrescriptionModal';
import { createPrescription, addMedicineToPrescription, getPrescriptionByPatient } from '../../../api/medical/prescriptions';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../context/auth/AuthContext';

const ITEMS_PER_PAGE = 10;

export function DoctorAppointmentsTable() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchAppointments();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      
      const params = {
        limit: ITEMS_PER_PAGE,
        offset: (currentPage - 1) * ITEMS_PER_PAGE,
      };
      
      // Add search term if it exists
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      // Add status filter if it exists
      if (statusFilter) {
        params.status = statusFilter;
      }
      
      const data = await getMyAppointments(params);
      
      setAppointments(Array.isArray(data.results) ? data.results : []);
      setTotalItems(data.count || 0);
      setTotalPages(Math.ceil((data.count || 0) / ITEMS_PER_PAGE));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to load appointments");
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleAddPrescription = (appointment) => {
    // Validate that the appointment date is not in the future
    const appointmentDate = new Date(appointment.appointment_date || appointment.date);
    const today = new Date();
    
    if (appointmentDate > today) {
      toast.error("Cannot create prescriptions for future appointments");
      return;
    }

    setCurrentAppointment(appointment);
    setIsAddModalOpen(true);
  };

  const handleViewPrescription = async (patientId) => {
    try {
      setActionLoading(true);
      // Get prescription for this patient
      const prescription = await getPrescriptionByPatient(patientId);
      
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
      setActionLoading(false);
    }
  };

  const handleSavePrescription = async (prescriptionData) => {
    if (!currentAppointment) return;

    try {
      setActionLoading(true);
      
      // Ensure prescription date is not in the future
      const prescriptionDate = new Date(prescriptionData.prescription_date);
      const today = new Date();
      
      if (prescriptionDate > today) {
        toast.error("Prescription date cannot be in the future");
        setActionLoading(false);
        return;
      }

      // Step 1: Create the base prescription with the required fields from the API
      const prescriptionPayload = {
        appointment: currentAppointment.id,
        doctor: currentUser.id,
        patient: currentAppointment.patient?.id,
        prescription_date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
        notes: prescriptionData.notes || "",
      };
      
      toast.loading("Creating prescription...", { id: "prescription-create" });
      
      // Create the prescription
      const newPrescription = await createPrescription(prescriptionPayload);
      
      // Step 2: Add each medicine separately
      if (prescriptionData.medicines && prescriptionData.medicines.length > 0) {
        toast.loading(`Adding ${prescriptionData.medicines.length} medicines...`, { id: "prescription-medicines" });
        
        // Process medicines sequentially to avoid race conditions
        for (let i = 0; i < prescriptionData.medicines.length; i++) {
          const medicine = prescriptionData.medicines[i];
          
          const medicinePayload = {
            medicine_name: medicine.medicine_name,
            dosage: medicine.dosage,
            frequency: medicine.frequency,
            duration: medicine.duration,
            instructions: medicine.instructions
          };
          
          await addMedicineToPrescription(newPrescription.id, medicinePayload);
        }
        
        toast.dismiss("prescription-medicines");
      }
      
      toast.dismiss("prescription-create");
      toast.success('Prescription added successfully');
      
      // Refresh appointments to show updated prescription status
      fetchAppointments();
    } catch (error) {
      console.error('Error adding prescription:', error);
      
      // Handle specific validation errors from backend
      if (error.response?.data) {
        if (error.response.data.appointment) {
          toast.error(`Appointment error: ${error.response.data.appointment[0]}`);
        } else if (error.response.data.doctor) {
          toast.error(`Doctor error: ${error.response.data.doctor[0]}`);
        } else if (error.response.data.patient) {
          toast.error(`Patient error: ${error.response.data.patient[0]}`);
        } else if (error.response.data.prescription_date) {
          toast.error(`Date error: ${error.response.data.prescription_date[0]}`);
        } else if (error.response.data.non_field_errors) {
          toast.error(error.response.data.non_field_errors[0]);
        } else {
          toast.error('Failed to add prescription');
        }
      } else {
        toast.error('Failed to add prescription');
      }
    } finally {
      toast.dismiss("prescription-create");
      toast.dismiss("prescription-medicines");
      setActionLoading(false);
      setIsAddModalOpen(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    
    try {
      // Handle different time formats
      const time = timeString.includes('T') 
        ? new Date(timeString)
        : new Date(`2000-01-01T${timeString}`);
      
      return time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      console.error("Error formatting time:", e);
      return timeString;
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'scheduled': { color: 'bg-blue-100 text-blue-800', label: 'Scheduled' },
      'confirmed': { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
      'completed': { color: 'bg-gray-100 text-gray-800', label: 'Completed' },
      'cancelled': { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
      'no_show': { color: 'bg-yellow-100 text-yellow-800', label: 'No Show' },
    };

    const statusInfo = statusMap[status?.toLowerCase()] || { color: 'bg-gray-100 text-gray-800', label: status || 'Unknown' };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  // Check if appointment has a prescription
  const hasPrescription = (appointment) => {
    return appointment.has_prescription || false;
  };

  if (error) {
    return (
      <div className="flex justify-center items-center p-8 text-red-500">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header with title and filters */}
      <div className="p-5 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Appointments</h2>
          
          <div className="flex gap-2 items-center">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search patient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>
            
            {/* Status filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no_show">No Show</option>
              </select>
              <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Appointment list */}
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium">No appointments found</h3>
          <p className="mt-1">Try adjusting your filters or search criteria</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clinic
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.patient?.full_name || appointment.patient?.name || "Patient"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {appointment.patient?.email || appointment.patient?.phone || "No contact info"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(appointment.appointment_date || appointment.date)}</div>
                      <div className="text-sm text-gray-500">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-900">{appointment.clinic?.name || "No clinic"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(appointment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {/* Prescription buttons */}
                        {hasPrescription(appointment) ? (
                          <button 
                            onClick={() => handleViewPrescription(appointment.patient?.id)}
                            disabled={actionLoading}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Prescription"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleAddPrescription(appointment)}
                            disabled={
                              actionLoading || 
                              appointment.status?.toLowerCase() === 'cancelled' || 
                              appointment.status?.toLowerCase() === 'scheduled' // Prevent prescriptions for scheduled appointments
                            }
                            className={`${
                              appointment.status?.toLowerCase() === 'cancelled' || 
                              appointment.status?.toLowerCase() === 'scheduled'
                                ? 'text-gray-400 cursor-not-allowed' 
                                : 'text-green-600 hover:text-green-900'
                            }`}
                            title={
                              appointment.status?.toLowerCase() === 'scheduled'
                                ? "Cannot add prescription for scheduled appointments"
                                : "Add Prescription"
                            }
                          >
                            <PlusCircle className="h-4 w-4" />
                          </button>
                        )}
                        
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <FileText className="h-4 w-4" />
                        </button>
                        <button 
                          className="text-gray-500 hover:text-gray-900"
                          title="More Options"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalItems)} to {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems} appointments
              </div>
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </>
      )}

      {/* Add Prescription Modal */}
      {currentAppointment && (
        <DoctorPrescriptionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSavePrescription}
          initialData={{
            prescription_date: new Date().toLocaleDateString(),
            notes: '',
            medicines: [],
            doctor: { name: currentUser?.first_name + ' ' + currentUser?.last_name || 'Doctor' },
            patient: { name: currentAppointment.patient?.full_name || currentAppointment.patient?.name || 'Patient' },
            appointment: { date: formatDate(currentAppointment.appointment_date || currentAppointment.date) }
          }}
        />
      )}

      {/* View Prescription Modal */}
      {prescriptionData && (
        <ViewPrescriptionModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          prescription={{
            ...prescriptionData,
            prescription_date: new Date(prescriptionData.created_at).toLocaleDateString(),
            doctor: { name: prescriptionData.doctor_name || currentUser?.first_name + ' ' + currentUser?.last_name || 'Doctor' },
            patient: { name: prescriptionData.patient_name || 'Patient' },
            appointment: { date: prescriptionData.appointment_date || new Date().toLocaleDateString() }
          }}
        />
      )}
    </div>
  );
} 