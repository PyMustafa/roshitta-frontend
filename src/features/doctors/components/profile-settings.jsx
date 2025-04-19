import { useState } from "react"
import PersonalDetails from "./personal-details"
import ServicesSection from "./service-section"
import ProfilePhoto from "./profile-photo"
import DocumentSection from "./document-section"

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("personal")

return (
    <div className="space-y-6">

        <div className="container">
            <div className="flex flex-col md:flex-row justify-evenly items-center mb-4">
                <button
                    onClick={() => setActiveTab("personal")}
                    className={`border rounded px-6 py-4 font-medium text-sm cursor-pointer ${
                        activeTab === "personal" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                    }`}
                >
                    Personal Details
                </button>
                <button
                    onClick={() => setActiveTab("experience")}
                    className={`border rounded px-6 py-4 font-medium text-sm cursor-pointer ${
                        activeTab === "experience" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                    }`}
                >
                    Experience & Education
                </button>
                <button
                    onClick={() => setActiveTab("awards")}
                    className={`border rounded px-6 py-4 font-medium text-sm cursor-pointer ${
                        activeTab === "awards" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                    }`}
                >
                    Awards
                </button>
                <button
                    onClick={() => setActiveTab("gallery")}
                    className={`border rounded px-6 py-4 font-medium text-sm cursor-pointer ${
                        activeTab === "gallery" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                    }`}
                >
                    Gallery
                </button>
                <button
                    onClick={() => setActiveTab("location")}
                    className={`border rounded px-6 py-4 font-medium text-sm cursor-pointer ${
                        activeTab === "location" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                    }`}
                >
                    Default Location
                </button>
            </div>

            <div className="p-6">
                {activeTab === "personal" && (
                    <div className="space-y-6">
                        <PersonalDetails />
                        <DocumentSection />
                        <ProfilePhoto />
                        <ServicesSection />
                    </div>
                )}
                {activeTab === "experience" && (
                    <div className="p-6 border rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Experience & Education</h2>
                        <p className="text-gray-500">Experience and education content will go here.</p>
                    </div>
                )}
                {activeTab === "awards" && (
                    <div className="p-6 border rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Awards</h2>
                        <p className="text-gray-500">Awards content will go here.</p>
                    </div>
                )}
                {activeTab === "gallery" && (
                    <div className="p-6 border rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Gallery</h2>
                        <p className="text-gray-500">Gallery content will go here.</p>
                    </div>
                )}
                {activeTab === "location" && (
                    <div className="p-6 border rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Default Location</h2>
                        <p className="text-gray-500">Location content will go here.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
)
}
