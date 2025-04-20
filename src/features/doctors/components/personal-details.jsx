import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PersonalDetails() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Select defaultValue="dr">
              <SelectTrigger>
                <SelectValue placeholder="Select title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dr">Dr</SelectItem>
                <SelectItem value="prof">Prof</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
            <Input placeholder="john" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <Input placeholder="smith" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Display Name</label>
            <Input placeholder="John Smith" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Speciality</label>
            <Input placeholder="BDS, MDS - Oral & Maxillofacial" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <Input placeholder="01xxxxxxxxx" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">License Number</label>
            <Input />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
