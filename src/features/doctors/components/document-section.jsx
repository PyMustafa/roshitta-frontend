import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export default function DocumentSection() {
  const [languages, setLanguages] = useState(["English", "French", "German"])

  const removeLanguage = (language) => {
    setLanguages(languages.filter((lang) => lang !== language))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Document</label>
          <Input defaultValue="Document" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Starting Price</label>
          <Input defaultValue="1500" type="number" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <div className="relative">
            <Textarea
              className="min-h-[150px]"
              placeholder = "Write a short description about your services"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Select Languages</label>
          <div className="flex flex-wrap gap-2">
            {languages.map((language) => (
              <Badge key={language} variant="outline" className="py-2 px-3 bg-gray-100">
                {language}
                <button className="ml-2 text-gray-500 hover:text-gray-700" onClick={() => removeLanguage(language)}>
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
