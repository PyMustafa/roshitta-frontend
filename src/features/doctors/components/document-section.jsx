import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function DocumentSection() {
  const [languages, setLanguages] = useState(["English", "French", "German"])

  const removeLanguage = (language) => {
    setLanguages(languages.filter((lang) => lang !== language))
  }

  return (
    <Card className="border-gray-200"> 
      <CardHeader>
        <CardTitle>Bio & Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Bio</label>
          <Input 
            placeholder="Enter your bio here" 
            className="border-primary-100 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Consultation Fees</label>
          <Input 
            placeholder="500" 
            type="number"
            className="border-primary-100 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">Education</label>
          <div className="relative">
            <Textarea
              className="min-h-[150px] border-gray-300 focus:ring-1 focus:ring-primary-500 focus:ring-opacity-25"
              placeholder="Write a short description about your education"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
