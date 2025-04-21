import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const MedicalHistoryForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'diagnosis',
    date: '',
    diagnosis: '',
    symptoms: '',
    prescription: '',
    prescriptionFile: null,
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'prescriptionFile') {
      setFormData(prev => ({
        ...prev,
        prescriptionFile: files[0] || null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: `#MH${Math.floor(1000 + Math.random() * 9000)}`
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 w-full mb-6 relative">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <FaTimes className="text-lg" />
      </button>

      <h2 className="text-xl font-bold text-gray-800 mb-6">Add Medical History Entry</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div >
            <label className="block text-gray-700 text-sm font-medium mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-40 px-3  py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="diagnosis">Diagnosis</option>
              <option value="disease">Disease</option>
              <option value="surgery">Surgery</option>
              <option value="allergy">Allergy</option>
              <option value="test_result">Test Result</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">Symptoms</label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">Diagnosis</label>
            <textarea
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#5F6FFF]  text-white px-4 py-2 rounded-md "
          >
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicalHistoryForm;
