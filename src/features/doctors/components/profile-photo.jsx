import React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function ProfilePhoto() {
  const [file, setFile] = useState({
    name: "doctor-thumb-09.jpg",
    size: "25.61 KB",
    preview:
      "https://placeholder.com/400x200/000/fff?text=Doctor+Image",
  })

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile({
        name: selectedFile.name,
        size: `${(selectedFile.size / 1024).toFixed(2)} KB`,
        preview: URL.createObjectURL(selectedFile),
      })
    }
  }

  const handleRemoveFile = () => {
    setFile({ name: "", size: "", preview: "" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Photo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-50">
              <label htmlFor="file-upload" className="cursor-pointer">
                SELECT FILE
                <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </Button>
            <span className="text-gray-500">Drop files here to upload</span>
          </div>

          {file.preview && (
            <div className="space-y-2">
              <div className="relative">
                <img
                  src={file.preview || "/placeholder.svg"}
                  alt="Profile preview"
                  width={400}
                  height={200}
                  className="object-cover max-h-[200px]"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">{file.name}</p>
                  <p className="text-xs text-gray-500">File size: {file.size}</p>
                </div>
                <button onClick={handleRemoveFile} className="text-red-500 hover:text-red-700">
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
