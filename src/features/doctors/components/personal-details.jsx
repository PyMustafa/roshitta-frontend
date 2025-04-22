import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PersonalDetails() {
  return (
    <Card className="border-gray-200">
      <CardHeader className="bg-white">
        <CardTitle className="text-gray-900">Personal Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">First Name</label>
            <Input 
              placeholder="john" 
              className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Last Name</label>
            <Input 
              placeholder="smith" 
              className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Gender</label>
            <Select>
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
              placeholder="01xxxxxxxxx" 
              className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">License Number</label>
            <Input
              placeholder="123456789"
              className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Speciality</label>
            <Input 
              placeholder="e.g. cardiologist"
              className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
