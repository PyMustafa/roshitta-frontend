export const InformationSettings = () => {
    return (
      <div className="bg-white rounded-lg border border-gray-300 p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label> */}
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="First Name"
            />
          </div>
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label> */}
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Last Name"
            />
          </div>
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label> */}
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mobile Number"
            />
          </div>
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">Email</label> */}
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label> */}
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label> */}
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label> */}
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label> */}
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Emergency Contact"
            />
          </div>
          <div className="md:col-span-2">
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">Address</label> */}
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Address"
            />
          </div>
        </div>
      </div>
    );
  };