import React from "react";

export default function Tabs({ tabs, activeTab, setActiveTab }) {
    return(

        <div className="flex flex-col md:flex-row border-b border-gray-200">
            {tabs.map((tab) => (
                <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 text-center py-2 px-4 text-sm font-medium ${
                    activeTab === tab.id
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-500 hover:text-gray-700"
            
                    }`}
                >
                {tab.label}
                </button>
            ))}
        </div>
    )
}