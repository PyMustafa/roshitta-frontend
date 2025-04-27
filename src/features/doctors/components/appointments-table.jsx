import { useState, useEffect } from "react"
import { Pencil, Plus, X, Check } from "lucide-react"

export function AppointmentsTable() {
  const [schedules, setSchedules] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clinics, setClinics] = useState([])
  const [formData, setFormData] = useState({
    clinicName: "",
    day: [],
    startHour: "",
    endHour: ""
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const daysOfWeek = [
    "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
  ]

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        // Using mock data for now
        setClinics([
          { id: 'clinic-1', name: 'Madinat Nassr Clinic' },
          { id: 'clinic-2', name: 'New Giza Clinic' },
        ])
      } catch (error) {
        console.error('Error fetching clinics:', error)
      }
    }
    
    fetchClinics()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDayToggle = (day) => {
    setFormData(prev => {
      if (prev.day.includes(day)) {
        return {
          ...prev,
          day: prev.day.filter(d => d !== day)
        }
      } else {
        return {
          ...prev,
          day: [...prev.day, day]
        }
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (isEditing) {
      const updatedSchedules = schedules.map(schedule => 
        schedule.id === editingId ? { ...formData, id: editingId } : schedule
      )
      setSchedules(updatedSchedules)
    } else {
      const newSchedule = {
        id: schedules.length + 1,
        ...formData
      }
      setSchedules([...schedules, newSchedule])
    }
    
    setFormData({
      clinicName: "",
      day: [],
      startHour: "",
      endHour: ""
    })
    setIsEditing(false)
    setEditingId(null)
    setIsModalOpen(false)
  }
  
  const handleEditClick = (schedule) => {
    setFormData({
      clinicName: schedule.clinicName,
      day: Array.isArray(schedule.day) ? schedule.day : [schedule.day],
      startHour: schedule.startHour,
      endHour: schedule.endHour
    })
    setIsEditing(true)
    setEditingId(schedule.id)
    setIsModalOpen(true)
  }
  
  const handleAddNewClick = () => {
    setFormData({
      clinicName: "",
      day: [],
      startHour: "",
      endHour: ""
    })
    setIsEditing(false)
    setEditingId(null)
    setIsModalOpen(true)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Clinics Schedule</h2>
        <button 
          onClick={handleAddNewClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center text-sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Schedule
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-white/75 flex items-center justify-center z-50 border-rounded border-gray-400">
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
              {isEditing ? 'Edit Clinic Schedule' : 'Add New Clinic Schedule'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700 mb-1">
                    Clinic Name
                  </label>
                  <select
                    id="clinicName"
                    name="clinicName"
                    value={formData.clinicName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25 focus:border-primary-500"
                    required
                  >
                    <option value="">Select Clinic</option>
                    {clinics.map((clinic) => (
                      <option key={clinic.id} value={clinic.name}>
                        {clinic.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Days
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {daysOfWeek.map((day) => (
                      <div 
                        key={day} 
                        onClick={() => handleDayToggle(day)}
                        className={`cursor-pointer px-3 py-2 rounded-md border ${
                          formData.day.includes(day) 
                            ? 'bg-blue-100 border-blue-500' 
                            : 'border-gray-300 hover:bg-gray-50'
                        } flex items-center justify-between`}
                      >
                        <span>{day}</span>
                        {formData.day.includes(day) && (
                          <Check className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                    ))}
                  </div>
                  {formData.day.length === 0 && (
                    <p className="text-sm text-red-500 mt-1">Please select at least one day</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startHour" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Hour
                    </label>
                    <input
                      type="time"
                      id="startHour"
                      name="startHour"
                      value={formData.startHour}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25 focus:border-primary-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="endHour" className="block text-sm font-medium text-gray-700 mb-1">
                      End Hour
                    </label>
                    <input
                      type="time"
                      id="endHour"
                      name="endHour"
                      value={formData.endHour}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25 focus:border-primary-500"
                      required
                    />
                  </div>
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
                  disabled={formData.day.length === 0}
                >
                  {isEditing ? 'Update Schedule' : 'Save Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b border-gray-100">
              <th className="px-6 py-4 font-medium">Clinic Name</th>
              <th className="px-6 py-4 font-medium">Days</th>
              <th className="px-6 py-4 font-medium">Start Hour</th>
              <th className="px-6 py-4 font-medium">End Hour</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No schedules found. Click "Add Schedule" to create one.
                </td>
              </tr>
            ) : (
              schedules.map((schedule) => (
                <tr key={schedule.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-700">{schedule.clinicName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(schedule.day) ? schedule.day.map(day => (
                        <span key={day} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {day}
                        </span>
                      )) : (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {schedule.day}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{schedule.startHour}</td>
                  <td className="px-6 py-4 text-gray-600">{schedule.endHour}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleEditClick(schedule)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center text-sm"
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
