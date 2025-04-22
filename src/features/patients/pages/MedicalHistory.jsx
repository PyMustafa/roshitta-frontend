import React, { useState } from 'react';
import MedicalHistoryCard from '../components/MedicalHistoryCard';
import MedicalHistoryDetails from '../components/MedicalHistoryDetails';
import MedicalHistoryForm from "../components/MedicalHistoryForm";

import { Sidebar } from '../components/Sidebar';

const MedicalHistory = () => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const medicalHistory = [
    {
      id: '#MH001',
      type: 'diagnosis',
      date: '15 Mar 2025',
      diagnosis: 'Type 2 Diabetes',
      symptoms: 'Increased thirst, frequent urination',
      prescription: 'Metformin 500mg twice daily',
      notes: 'Patient advised to monitor blood sugar levels regularly'
    },
    {
      id: '#MH002',
      type: 'allergy',
      date: '10 Feb 2025',
      diagnosis: 'Penicillin Allergy',
      symptoms: 'Rash, difficulty breathing',
      prescription: 'Avoid all penicillin derivatives',
      notes: 'Patient carries epinephrine auto-injector'
    },
  ];

  return (
    <div className="my-6 container mx-auto grid grid-cols-4 gap-10">
      <Sidebar className="hidden lg:block col-span-1" />

      <div className="flex-1 p-6 border border-gray-300 col-span-3 my-4 rounded-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Medical History</h1>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-[#5F6FFF]  text-white px-4 py-2 rounded-md "
            >
              Add New Entry
            </button>
          </div>

          {showForm && (
            <MedicalHistoryForm 
              onClose={() => setShowForm(false)}
              onSubmit={(data) => {
                console.log(data);
                setShowForm(false);
              }}
            />
          )}

          <div className="">
            {selectedEntry && (
              <MedicalHistoryDetails 
                entry={selectedEntry} 
                onClose={() => setSelectedEntry(null)}
              />
            )}

            <div className="mt-6 space-y-4">
              {medicalHistory.map((entry) => (
                <MedicalHistoryCard 
                  key={entry.id} 
                  entry={entry}
                  onClick={() => setSelectedEntry(entry)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;