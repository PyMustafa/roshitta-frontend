import { useState } from "react";
import { Bell, Search, HelpCircle } from "lucide-react";
import { useAuth } from "../../../context/auth/AuthContext";

export function Header() {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }
  
  const doctorName = currentUser?.name || "Doctor";

  return (
    <header className="bg-white py-4 px-6 border-b border-gray-200 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">{greeting}, Dr. {doctorName}</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative max-w-xs">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-500" />
          </div>
          <input 
            type="text" 
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">3</span>
        </button>
        
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
          <HelpCircle className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </header>
  );
} 