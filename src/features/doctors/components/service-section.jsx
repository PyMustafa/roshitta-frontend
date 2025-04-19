import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

export default function ServicesSection() {
  const [services, setServices] = useState([
    { id: 1, name: "Teeth Whitening" },
    { id: 2, name: "Dental Fillings" },
  ])

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log(`Edit service with id: ${id}`)
  }

  const handleDelete = (id) => {
    setServices(services.filter((service) => service.id !== id))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Memberships</CardTitle>
        <Button className="bg-blue-500 hover:bg-blue-600">Add Now</Button>
      </CardHeader>
      <CardContent>
        <h3 className="font-medium mb-4">Your Memberships</h3>

        <div className="space-y-2">
          {services.map((service) => (
            <div key={service.id} className="flex items-center justify-between p-4 border rounded-md">
              <span>{service.name}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => handleEdit(service.id)}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-red-500 text-white hover:bg-red-600"
                  onClick={() => handleDelete(service.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <Button className="bg-emerald-500 hover:bg-emerald-600">Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}
