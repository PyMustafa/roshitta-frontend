import React from "react"
import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, AlertCircle } from "lucide-react"
import { getMyProfile } from "../../../api/profiles/doctor"
import { toast } from "react-hot-toast"

// Maximum file size in bytes (2MB)
const MAX_FILE_SIZE = 2 * 1024 * 1024
// Allowed MIME types
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

const ProfilePhoto = forwardRef((props, ref) => {
  const [file, setFile] = useState({})
  const [actualFile, setActualFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useImperativeHandle(ref, () => ({
    getImageFile: () => actualFile
  }))

  useEffect(() => {
    fetchProfileImage()
  }, [])

  const fetchProfileImage = async () => {
    try {
      setLoading(true)
      const data = await getMyProfile()
      if (data.profile_image) {
        setFile({
          name: "Current profile image",
          size: "",
          preview: data.profile_image
        })
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching profile image:", error)
      toast.error("Failed to load profile image")
      setLoading(false)
    }
  }

  const validateFile = (selectedFile) => {
    // Check file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      return `File size exceeds 2MB limit (${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB)`
    }
    
    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      return `File type '${selectedFile.type}' is not supported. Please use JPEG, PNG, GIF or WebP.`
    }
    
    return null
  }

  const handleFileChange = (e) => {
    setError(null)
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      
      // Validate file
      const validationError = validateFile(selectedFile)
      if (validationError) {
        setError(validationError)
        toast.error(validationError)
        e.target.value = null // Reset the input
        return
      }
      
      console.log('Selected image file:', {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
      })
      
      setActualFile(selectedFile)
      setFile({
        name: selectedFile.name,
        size: `${(selectedFile.size / 1024).toFixed(2)} KB`,
        preview: URL.createObjectURL(selectedFile),
      })
    }
  }

  const handleRemoveFile = () => {
    setFile({ name: "", size: "", preview: "" })
    setActualFile(null)
    setError(null)
  }

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle>Profile Photo</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <div className="flex items-center gap-4">
              <Button variant="outline" className="text-primary-500 border-primary-500 hover:bg-primary-50">
                <label htmlFor="file-upload" className="cursor-pointer">
                  SELECT FILE
                  <input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/jpeg,image/png,image/gif,image/webp" 
                    onChange={handleFileChange} 
                  />
                </label>
              </Button>
              <p className="text-gray-500 text-sm">
                <span className="block">Drop files here to upload</span>
                <span className="block text-xs">Accepted formats: JPEG, PNG, GIF, WebP (max 2MB)</span>
              </p>
            </div>

            {file.preview && (
              <div className="space-y-2">
                <div className="relative">
                  <img
                    src={file.preview || "/placeholder.svg"}
                    alt="Profile preview"
                    width={400}
                    height={200}
                    className="object-cover max-h-[200px] rounded-md"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.size}</p>
                  </div>
                  <button onClick={handleRemoveFile} className="text-error-500 hover:text-error-700">
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
})

export default ProfilePhoto
