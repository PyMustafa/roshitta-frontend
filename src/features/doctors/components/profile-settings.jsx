import { useState, useRef } from "react"
import PersonalDetails from "./personal-details"
import ProfilePhoto from "./profile-photo"
import DocumentSection from "./document-section"
import ChangePassword from "./ChangePassword"
import { Button } from "@/components/ui/button"
import { updateMyProfile, getMyProfile } from "../../../api/profiles/doctor"
import { useAuth } from "../../../context/auth/AuthContext"
import { toast } from "react-hot-toast"

export default function ProfileSettings() {
    const [submitting, setSubmitting] = useState(false)
    const personalDetailsRef = useRef()
    const profilePhotoRef = useRef()
    const { updateUserData } = useAuth()

    const handleSubmit = async () => {
        try {
            setSubmitting(true)
            
            // Get the form data from personal-details component
            const personalData = personalDetailsRef.current?.getFormData()
            
            if (!personalData) {
                toast.error("Could not retrieve form data")
                setSubmitting(false)
                return
            }
            
            // Get image file if uploaded
            const imageFile = profilePhotoRef.current?.getImageFile()
            
            // Check if we need to use FormData (for file upload) or regular JSON payload
            if (imageFile) {
                console.log('Preparing to upload profile with image file', {
                    fileName: imageFile.name, 
                    fileType: imageFile.type,
                    fileSize: imageFile.size,
                    specialty_id: personalData.specialty_id,
                    user_id: personalData.user_id
                })
                
                // Create FormData for multipart/form-data request
                const formData = new FormData()
                
                // Required fields
                if (!personalData.user_id) {
                    toast.error("Missing required field: user_id")
                    setSubmitting(false)
                    return
                }
                
                if (!personalData.specialty_id) {
                    toast.error("Missing required field: specialty_id")
                    setSubmitting(false)
                    return
                }
                
                // Add all the text fields
                formData.append("user_id", personalData.user_id)
                formData.append("specialty_id", personalData.specialty_id)
                formData.append("license_number", personalData.license_number || "")
                
                // Add profile_id to help backend identify this is the same doctor
                if (personalData.profile_id) {
                    formData.append("profile_id", personalData.profile_id)
                }
                
                if (personalData.years_of_experience) {
                    formData.append("years_of_experience", personalData.years_of_experience)
                }
                
                if (personalData.appointment_duration) {
                    formData.append("appointment_duration", personalData.appointment_duration)
                }
                
                if (personalData.consultation_fee) {
                    formData.append("consultation_fee", personalData.consultation_fee)
                }
                
                if (personalData.bio) {
                    formData.append("bio", personalData.bio)
                }
                
                if (personalData.education) {
                    formData.append("education", personalData.education)
                }
                
                formData.append("is_available", personalData.is_available)
                
                // Add the file
                formData.append("profile_image", imageFile)
                
                console.log('FormData prepared for submission - keys included:', 
                    Array.from(formData.keys()))
                
                try {
                    await updateMyProfile(formData, true) // Pass true to indicate multipart/form-data
                    toast.success("Profile updated successfully with new image")
                    
                    // Fetch updated profile data and update auth context
                    try {
                        const updatedProfile = await getMyProfile();
                        
                        // Update localStorage directly as a fallback
                        try {
                            if (updatedProfile.profile_image) {
                                const userData = JSON.parse(localStorage.getItem('user'));
                                if (userData) {
                                    userData.profile_image = updatedProfile.profile_image;
                                    localStorage.setItem('user', JSON.stringify(userData));
                                }
                            }
                        } catch (localStorageError) {
                            console.error('Error updating localStorage:', localStorageError);
                        }
                        
                        updateUserData({ profile_image: updatedProfile.profile_image });
                    } catch (err) {
                        console.error('Error updating user context:', err);
                    }
                } catch (uploadError) {
                    console.error('Profile image upload failed:', uploadError)
                    
                    // Log detailed error information
                    if (uploadError.response) {
                        console.error('Response error data:', uploadError.response.data)
                        console.error('Response status:', uploadError.response.status)
                        console.error('Response headers:', uploadError.response.headers)
                    }
                    
                    throw uploadError
                }
                
            } else {
                // Regular JSON payload for no file upload
                // Prepare the data for submission - match the API request body structure exactly
                const profileData = {
                    user_id: personalData.user_id,
                    profile_image: personalData.profile_image || null,
                    specialty_id: personalData.specialty_id,
                    license_number: personalData.license_number || "",
                    years_of_experience: personalData.years_of_experience ? parseInt(personalData.years_of_experience) : null,
                    appointment_duration: personalData.appointment_duration ? parseInt(personalData.appointment_duration) : null,
                    consultation_fee: personalData.consultation_fee || "0",
                    bio: personalData.bio || "",
                    education: personalData.education || "",
                    is_available: personalData.is_available !== undefined ? personalData.is_available : true,
                    // Add profile_id to help backend identify this is the same doctor
                    profile_id: personalData.profile_id || ""
                }
                
                // Required fields that must be included regardless of value
                const requiredFields = ['user_id', 'specialty_id', 'license_number'];
                
                // Submit only non-empty values, but always include required fields
                const dataToSubmit = Object.entries(profileData)
                    .filter(([key, value]) => requiredFields.includes(key) || (value !== "" && value !== null))
                    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
                
                console.log("Submitting profile data:", dataToSubmit)
                
                await updateMyProfile(dataToSubmit)
                toast.success("Profile updated successfully")
                
                // Fetch updated profile data and update auth context
                try {
                    const updatedProfile = await getMyProfile();
                    
                    // Update localStorage directly as a fallback
                    try {
                        if (updatedProfile.profile_image) {
                            const userData = JSON.parse(localStorage.getItem('user'));
                            if (userData) {
                                userData.profile_image = updatedProfile.profile_image;
                                localStorage.setItem('user', JSON.stringify(userData));
                            }
                        }
                    } catch (localStorageError) {
                        console.error('Error updating localStorage:', localStorageError);
                    }
                    
                    updateUserData({ profile_image: updatedProfile.profile_image });
                } catch (err) {
                    console.error('Error updating user context:', err);
                }
            }
            
            setSubmitting(false)
        } catch (error) {
            console.error("Error updating profile:", error)
            let errorMessage = "Failed to update profile"
            
            // Try to extract error message from the response
            if (error.response?.data) {
                if (typeof error.response.data === 'object') {
                    console.error('Full error object:', error.response.data)
                    
                    // Check for specific profile_image errors
                    if (error.response.data.profile_image) {
                        errorMessage = `Profile image error: ${error.response.data.profile_image}`
                        console.error('Profile image error details:', error.response.data.profile_image)
                    } else {
                        const firstError = Object.entries(error.response.data)[0]
                        if (firstError && firstError.length > 0) {
                            const [field, messages] = firstError
                            if (Array.isArray(messages) && messages.length > 0) {
                                errorMessage = `${field}: ${messages[0]}`
                            } else if (typeof messages === 'string') {
                                errorMessage = `${field}: ${messages}`
                            }
                        }
                    }
                } else if (typeof error.response.data === 'string') {
                    errorMessage = error.response.data
                }
            } else if (error.message) {
                errorMessage = error.message
            }
            
            toast.error(errorMessage)
            setSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="container">
                <div className="p-6">
                    <div className="space-y-6">
                        <PersonalDetails ref={personalDetailsRef} />
                        <DocumentSection />
                        <ProfilePhoto ref={profilePhotoRef} />
                        <ChangePassword />
                        <div className="flex justify-end mt-6">
                            <div>
                                <Button 
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="bg-emerald-500 hover:bg-emerald-600"
                                >
                                    {submitting ? (
                                        <>
                                            <span className="mr-2">Saving...</span>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </>
                                    ) : "Save Changes"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}