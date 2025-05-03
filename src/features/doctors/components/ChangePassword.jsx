import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { changePassword } from "../../../api/auth/password"
import { toast } from "react-hot-toast"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useAuth } from "../../../context/auth/AuthContext"

export default function ChangePassword() {
    const { logout } = useAuth()
    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: ""
    })
    
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    })
    
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing again
        if (error) setError(null)
    }

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }))
    }

    const validateForm = () => {
        if (!formData.current_password) return "Current password is required"
        if (!formData.new_password) return "New password is required"
        if (!formData.confirm_password) return "Please confirm your new password"
        
        if (formData.new_password !== formData.confirm_password) {
            return "New passwords do not match"
        }
        
        if (formData.new_password.length < 8) {
            return "Password must be at least 8 characters long"
        }
        
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Validate form
        const validationError = validateForm()
        if (validationError) {
            setError(validationError)
            toast.error(validationError)
            return
        }
        
        try {
            setSubmitting(true)
            setError(null)
            
            // Prepare payload for API call
            const payload = {
                old_password: formData.current_password,
                new_password: formData.new_password
            }
            
            // This will throw an error if the API call fails
            await changePassword(payload)
            
            // Only runs if the API call is successful
            const successMessage = "Password changed successfully. You'll be logged out."
            toast.success(successMessage, {
                duration: 4000, // Show for a bit longer
            })
            console.log("Password changed successfully, showing toast:", successMessage)
            
            // Reset form after successful submission
            setFormData({
                current_password: "",
                new_password: "",
                confirm_password: ""
            })
            
            // Log the user out after a delay
            setTimeout(() => {
                logout()
            }, 3000)
            
        } catch (err) {
            console.error("Error changing password:", err)
            
            // Handle different error formats
            let errorMessage = "Failed to change password. Please try again."
            
            if (err.response?.data) {
                // DRF often returns errors in this format
                if (typeof err.response.data === 'object') {
                    // Could be { old_password: ["Invalid password."] }
                    const firstError = Object.values(err.response.data)[0]
                    if (Array.isArray(firstError) && firstError.length > 0) {
                        errorMessage = firstError[0]
                    } else if (typeof firstError === 'string') {
                        errorMessage = firstError
                    }
                    
                    // Also handle non_field_errors or detail
                    if (err.response.data.non_field_errors) {
                        errorMessage = err.response.data.non_field_errors[0]
                    } else if (err.response.data.detail) {
                        errorMessage = err.response.data.detail
                    }
                } else if (typeof err.response.data === 'string') {
                    errorMessage = err.response.data
                }
            } else if (err.message) {
                errorMessage = err.message
            }
            
            setError(errorMessage)
            toast.error(errorMessage)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Card className="border-gray-200">
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Current Password</label>
                            <div className="relative">
                                <Input 
                                    type={showPassword.current ? "text" : "password"}
                                    name="current_password"
                                    value={formData.current_password}
                                    onChange={handleChange}
                                    placeholder="Enter current password" 
                                    className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25 pr-10"
                                />
                                <button 
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    onClick={() => togglePasswordVisibility('current')}
                                >
                                    {showPassword.current ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">New Password</label>
                            <div className="relative">
                                <Input 
                                    type={showPassword.new ? "text" : "password"}
                                    name="new_password"
                                    value={formData.new_password}
                                    onChange={handleChange}
                                    placeholder="Enter new password" 
                                    className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25 pr-10"
                                />
                                <button 
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    onClick={() => togglePasswordVisibility('new')}
                                >
                                    {showPassword.new ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
                        </div>
                
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">Confirm New Password</label>
                            <div className="relative">
                                <Input 
                                    type={showPassword.confirm ? "text" : "password"}
                                    name="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    placeholder="Confirm new password" 
                                    className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25 pr-10"
                                />
                                <button 
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                >
                                    {showPassword.confirm ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                
                        <div className="flex justify-end items-end">
                            <Button 
                                type="submit"
                                disabled={submitting}
                                className="bg-blue-500 hover:bg-blue-600"
                            >
                                {submitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : "Change Password"}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}