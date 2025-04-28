import { useState, useEffect } from "react"
import { Pencil, Plus, X, Check, Trash2, MapPin, Clock, Info, AlertTriangle } from "lucide-react"
import { api, profiles, clinics as clinicsApi } from "../../../api"

export function ClinicsTable() {
  const [clinics, setClinics] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [clinicToDelete, setClinicToDelete] = useState(null)
  const [cities, setCities] = useState([
    "Cairo", "Alexandria", "Giza", "Sharm El Sheikh", "Luxor", "Aswan", "Hurghada"
  ])
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    description: ""
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch doctor profile
  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        setLoading(true)
        
        // Use the API function from profiles module
        const data = await profiles.doctor.getMyProfile();
        console.log("Doctor profile response:", data); // Log the entire response for debugging
        
        // Get doctor ID from user.id
        const doctorId = data.user_id;
        
        if (!doctorId) {
          console.error("Could not find doctor ID in the response:", data);
          setError("Failed to retrieve doctor ID");
          setLoading(false);
          return;
        }
        
        setDoctor({
          ...data,
          id: doctorId // Ensure id is available at the top level
        });
        
        fetchDoctorClinics();
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
        setError("Failed to fetch doctor profile");
        setLoading(false);
      }
    }

    fetchDoctorProfile();
  }, []);

  // Fetch doctor clinics using the doctor ID
  const fetchDoctorClinics = async () => {
    try {
      setLoading(true);
      
      // Use the API function from profiles module
      const response = await profiles.doctor.getMyClinics();
      
      // Check if response is an array, if not, look for data property
      console.log("Clinics response:", response);
      const clinicsData = Array.isArray(response.results) 
        ? response.results 
        : (response?.results || []);
      
      setClinics(clinicsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching clinics:", error);
      setError("Failed to fetch clinics");
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true);
      
      if (isEditing) {
        // Update existing clinic using the API function
        await clinicsApi.updateClinic(editingId, formData);
        
        // Update local state
        const updatedClinics = Array.isArray(clinics) ? clinics.map(clinic => 
          clinic.id === editingId ? { ...formData, id: editingId, doctor: doctor.id } : clinic
        ) : [];
        setClinics(updatedClinics);
      } else {
        // Create new clinic - ensure we're using the correct doctor ID from the doctor state
        const doctorId = doctor?.id;
        
        if (!doctorId) {
          setError("Doctor ID not available. Please try again.");
          setLoading(false);
          return;
        }
        
        // Include doctor_id in the request body
        const clinicData = {
          ...formData,
          doctor: doctorId
        };
        
        console.log("Sending clinic data:", clinicData);
        
        // Use the API function from clinics module
        const newClinic = await clinicsApi.createClinic(clinicData);
        
        // Add new clinic to local state
        setClinics(prev => Array.isArray(prev) ? [...prev, newClinic] : [newClinic]);
      }
      
      // Reset form and close modal
      setFormData({
        name: "",
        address: "",
        city: "",
        description: ""
      });
      setIsEditing(false);
      setEditingId(null);
      setIsModalOpen(false);
      setLoading(false);
    } catch (error) {
      console.error("Error saving clinic:", error);
      setError("Failed to save clinic");
      setLoading(false);
    }
  }
  
  const handleEditClick = (clinic) => {
    setFormData({
      name: clinic.name,
      address: clinic.address,
      city: clinic.city,
      description: clinic.description
    })
    setIsEditing(true)
    setEditingId(clinic.id)
    setIsModalOpen(true)
  }
  
  const handleAddNewClick = () => {
    setFormData({
      name: "",
      address: "",
      city: "",
      description: ""
    })
    setIsEditing(false)
    setEditingId(null)
    setIsModalOpen(true)
  }

  // Open delete confirmation modal
  const handleDeleteClick = (clinic) => {
    setClinicToDelete(clinic);
    setIsDeleteModalOpen(true);
  };

  // Confirm deletion
  const confirmDelete = async () => {
    if (!clinicToDelete) return;
    
    try {
      setLoading(true);
      
      // Use the API function from clinics module
      await clinicsApi.deleteClinic(clinicToDelete.id);
      
      // Remove clinic from local state
      setClinics(prev => prev.filter(clinic => clinic.id !== clinicToDelete.id));
      
      // Close modal and reset
      setIsDeleteModalOpen(false);
      setClinicToDelete(null);
      setLoading(false);
    } catch (error) {
      console.error("Error deleting clinic:", error);
      setError("Failed to delete clinic");
      setLoading(false);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setClinicToDelete(null);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading clinics...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>
  }

  // Ensure clinics is always an array
  const clinicsList = Array.isArray(clinics) ? clinics : []

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">My Clinics</h2>
        <button 
          onClick={handleAddNewClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Clinic
        </button>
      </div>

      {/* Add/Edit Clinic Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fade-in">
            <button 
              onClick={() => {
                setIsModalOpen(false)
                setIsEditing(false)
                setEditingId(null)
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {isEditing ? 'Edit Clinic' : 'Add New Clinic'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Clinic Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25 focus:border-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25 focus:border-primary-500"
                    required
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setIsEditing(false)
                    setEditingId(null)
                  }}
                  className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                  disabled={loading}
                >
                  {isEditing ? 'Update Clinic' : 'Save Clinic'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fade-in">
            <div className="flex items-center justify-center mb-4 text-red-500">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="w-8 h-8" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">
              Delete Clinic
            </h3>
            
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete <span className="font-semibold">{clinicToDelete?.name}</span>? 
              This action cannot be undone.
            </p>
            
            <div className="flex justify-center space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md w-32"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md w-32 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clinics Card Grid */}
      <div className="p-4">
        {clinicsList.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            No clinics found. Click "Add Clinic" to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clinicsList.map((clinic) => (
              <div 
                key={clinic.id} 
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{clinic.name}</h3>
                  
                  <div className="flex items-start mb-2 text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>{clinic.address}</p>
                      <p className="font-medium">{clinic.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-4 text-gray-600">
                    <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="line-clamp-2">{clinic.description}</p>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button 
                      onClick={() => handleEditClick(clinic)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md flex items-center text-sm flex-1 justify-center"
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(clinic)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md flex items-center text-sm flex-1 justify-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 