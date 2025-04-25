import { Users, Calendar } from "lucide-react"

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
        <div className="flex-shrink-0 mr-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-pink-50 border-2 border-pink-500">
            <Users className="h-7 w-7 md:h-8 md:w-8 text-pink-500" />
          </div>
        </div>
        <div>
          <p className="text-gray-600 text-sm font-medium">Total Patients</p>
          <h3 className="text-2xl md:text-3xl font-semibold mt-1">24</h3>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
        <div className="flex-shrink-0 mr-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-blue-50 border-2 border-blue-500">
            <Calendar className="h-7 w-7 md:h-8 md:w-8 text-blue-500" />
          </div>
        </div>
        <div>
          <p className="text-gray-600 text-sm font-medium">Available balance</p>
          <h3 className="text-2xl md:text-3xl font-semibold mt-1">$4,135.50</h3>
        </div>
      </div>
    </div>
  )
}
