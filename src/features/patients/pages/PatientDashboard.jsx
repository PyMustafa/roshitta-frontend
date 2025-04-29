import React, { useState, useEffect } from 'react';
import { Calendar, Clock, UserIcon } from 'lucide-react';
import { FaCalendarCheck, FaFileMedical, FaUserMd } from 'react-icons/fa';
import ReservationTable from "../components/ReservationTable";
import { useAuth } from '../../../context/auth/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import ViewPrescriptionModal from '../../../components/common/ViewPrescriptionModal';

// API imports
import { appointments, medical, profiles } from '../../../api';

function PatientDashboard() {
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for dashboard data
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    totalDoctors: 0
  });
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [currentMedications, setCurrentMedications] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch profile data
        const profileData = await profiles.patient.getMyProfile();

        // Fetch today's appointments
        const todayData = await appointments.patient.getMyTodayAppointments();
        setTodayAppointments(todayData.results || []);

        // Fetch upcoming appointments
        const upcomingData = await appointments.patient.getMyUpcomingAppointments();
        setUpcomingAppointments(upcomingData.results || []);

        // Fetch all appointments for stats
        const allAppointments = await appointments.patient.getMyAppointments();

        // Calculate stats
        const allAppts = allAppointments.results || [];
        const completed = allAppts.filter(app => app.status === 'completed').length;
        const pending = allAppts.filter(app => ['pending', 'confirmed'].includes(app.status)).length;

        // Get unique doctors
        const uniqueDoctors = new Set(allAppts.map(app => app.doctor?.id)).size;

        setStats({
          totalAppointments: allAppts.length,
          pendingAppointments: pending,
          completedAppointments: completed,
          totalDoctors: uniqueDoctors
        });

        // Fetch prescriptions
        const prescriptionsData = await medical.prescriptions.getPrescriptions({
          patient: profileData.uid
        });

        setPrescriptions(prescriptionsData.results || []);

        // If there are prescriptions, set the most recent one as selected
        if (prescriptionsData.results && prescriptionsData.results.length > 0) {
          const latestPrescription = prescriptionsData.results[0];
          const prescriptionDetails = await medical.prescriptions.getPrescription(latestPrescription.id);
          const medicines = await medical.prescriptions.getPrescriptionMedicines(latestPrescription.id);

          // Format prescription for modal view
          setSelectedPrescription({
            id: prescriptionDetails.id,
            prescription_date: new Date(prescriptionDetails.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }),
            doctor: {
              name: prescriptionDetails.doctor?.name || "Unknown Doctor"
            },
            patient: {
              name: prescriptionDetails.patient?.name || currentUser?.first_name + " " + currentUser?.last_name || "Patient"
            },
            appointment: {
              date: prescriptionDetails.appointment ? new Date(prescriptionDetails.appointment?.date).toLocaleDateString('en-US') : 'N/A'
            },
            notes: prescriptionDetails.notes || "No additional notes",
            medicines: medicines.results.map(med => ({
              id: med.id,
              medicine_name: med.medicine?.name || "Unknown Medicine",
              dosage: med.dosage || "As directed",
              frequency: med.frequency || "As needed",
              duration: med.duration || "As needed",
              instructions: med.instructions || "Follow doctor's instructions"
            }))
          });

          // Set current medications from the most recent prescription
          setCurrentMedications(medicines.results.map(med => ({
            name: med.medicine?.name || "Unknown Medicine",
            dosage: med.dosage || "As directed",
            schedule: med.frequency || "As needed",
            endDate: "Ongoing"
          })));
        }
      } catch (err) {
        console.error('Error fetching patient dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser) {
      fetchPatientData();
    }
  }, [currentUser]);

  if (!currentUser || currentUser.user_type !== 'patient') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full">
      {/* Welcome Banner */}
      <div className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {currentUser?.first_name || 'Patient'}!
            </h1>
            <p className="mt-1 text-blue-100">
              Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="hidden md:block bg-white/10 p-3 rounded-lg backdrop-blur-sm">
            <Calendar className="h-8 w-8" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg text-red-700 text-center">
          {error}
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <FaCalendarCheck className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-gray-500 text-sm">Total Appointments</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.totalAppointments}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-yellow-100 mr-3">
                  <Clock className="h-4 w-4 text-yellow-600" />
                </div>
                <span className="text-gray-500 text-sm">Pending</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.pendingAppointments}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 mr-3">
                  <FaFileMedical className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-500 text-sm">Completed</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.completedAppointments}</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-purple-100 mr-3">
                  <FaUserMd className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-gray-500 text-sm">Doctors</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.totalDoctors}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Today's Appointments */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Today's Appointments</h2>
                <Link to="/patient/appointments" className="text-sm text-blue-600 hover:underline">
                  View All
                </Link>
              </div>

              {todayAppointments.length > 0 ? (
                <div className="space-y-3">
                  {todayAppointments.map((appt) => (
                    <div key={appt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <UserIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Dr. {appt.doctor?.name || 'Doctor'}</p>
                          <p className="text-sm text-gray-500">
                            {appt.doctor?.specialty_name || 'Specialist'} •
                            {new Date(appt.appointment_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${appt.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No appointments scheduled for today</p>
              )}
            </div>

            {/* Current Medications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Current Medications</h2>
                {selectedPrescription && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Prescription
                  </button>
                )}
              </div>

              {currentMedications.length > 0 ? (
                <div className="space-y-3">
                  {currentMedications.map((med, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <p className="font-medium">{med.name}</p>
                        <p className="text-sm text-gray-500">{med.dosage}</p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{med.schedule}</p>
                      <p className="text-xs text-gray-400 mt-1">Until: {med.endDate}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No active medications</p>
              )}
            </div>
          </div>

          {/* Upcoming Appointments Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Reservations</h2>
            </div>
            <ReservationTable apiData={upcomingAppointments} />
          </div>
        </>
      )}

      {/* Prescription Modal */}
      {selectedPrescription && (
        <ViewPrescriptionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          prescription={selectedPrescription}
        />
      )}
    </div>
  );
}

export default PatientDashboard;


