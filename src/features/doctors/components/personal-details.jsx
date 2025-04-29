import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getMyProfile, updateMyProfile } from "../../../api/profiles/doctor"
import { toast } from "react-hot-toast"
import { Switch } from "@/components/ui/switch"

const PersonalDetails = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    phone_number: "",
    license_number: "",
    specialty_name: "",
    specialty_id: "",
    user_id: "",
    years_of_experience: "",
    consultation_fee: "",
    appointment_duration: "",
    bio: "",
    education: "",
    profile_image: null,
    is_available: true,
    profile_id: ""
  })

  useImperativeHandle(ref, () => ({
    getFormData: () => formData
  }))

  useEffect(() => {
    fetchDoctorProfile()
  }, [])

  const fetchDoctorProfile = async () => {
    try {
      setLoading(true)
      const data = await getMyProfile()
      setFormData({
        first_name: data.user_first_name || "",
        last_name: data.user_last_name || "",
        gender: data.gender || "",
        phone_number: data.phone_number || "",
        license_number: data.license_number || "",
        specialty_name: data.specialty_name || "",
        specialty_id: data.specialty_id || "",
        user_id: data.user_id || "",
        years_of_experience: data.years_of_experience?.toString() || "",
        consultation_fee: data.consultation_fee?.toString() || "",
        appointment_duration: data.appointment_duration?.toString() || "",
        bio: data.bio || "",
        education: data.education || "",
        profile_image: data.profile_image || null,
        is_available: data.is_available !== undefined ? data.is_available : true,
        profile_id: data.id || ""
      })
      setLoading(false)
    } catch (error) {
      console.error("Error fetching doctor profile:", error)
      toast.error("Failed to load profile data")
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Card className="border-gray-200">
      <CardHeader className="bg-white">
        <CardTitle className="text-gray-900">Personal Details</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">First Name</label>
              <Input 
                value={formData.first_name}
                onChange={(e) => handleChange("first_name", e.target.value)}
                placeholder="John" 
                className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Last Name</label>
              <Input 
                value={formData.last_name}
                onChange={(e) => handleChange("last_name", e.target.value)}
                placeholder="Smith" 
                className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Gender</label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleChange("gender", value)}
              >
                <SelectTrigger className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="male" className="hover:bg-primary-50">Male</SelectItem>
                  <SelectItem value="female" className="hover:bg-primary-50">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Phone Number</label>
              <Input 
                value={formData.phone_number}
                onChange={(e) => handleChange("phone_number", e.target.value)}
                placeholder="01xxxxxxxxx" 
                className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">License Number</label>
              <Input
                value={formData.license_number}
                onChange={(e) => handleChange("license_number", e.target.value)}
                placeholder="e.g. LIC-5348141"
                className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Speciality</label>
              <Input 
                value={formData.specialty_name}
                onChange={(e) => handleChange("specialty_name", e.target.value)}
                placeholder="e.g. Orthopedics"
                className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Years of Experience</label>
              <Input 
                value={formData.years_of_experience}
                onChange={(e) => handleChange("years_of_experience", e.target.value)}
                type="number"
                placeholder="e.g. 10"
                className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Consultation Fee (EGP)</label>
              <Input 
                value={formData.consultation_fee}
                onChange={(e) => handleChange("consultation_fee", e.target.value)}
                type="number"
                placeholder="e.g. 417.00"
                className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Appointment Duration (minutes)</label>
              <Input 
                value={formData.appointment_duration}
                onChange={(e) => handleChange("appointment_duration", e.target.value)}
                type="number"
                placeholder="e.g. 15"
                className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
              />
            </div>
            
            <div className="flex items-center">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2 text-gray-700">Available for Appointments</label>
                <div className="flex items-center">
                  <Switch 
                    checked={formData.is_available} 
                    onCheckedChange={(checked) => handleChange("is_available", checked)} 
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    {formData.is_available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium mb-2 text-gray-700">Education</label>
              <Input 
                value={formData.education}
                onChange={(e) => handleChange("education", e.target.value)}
                placeholder="e.g. M.D. from Medical University, 2001"
                className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium mb-2 text-gray-700">Bio</label>
              <textarea 
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="Brief description of your experience and expertise"
                rows={4}
                className="w-full border-gray-300 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
})

export default PersonalDetails
