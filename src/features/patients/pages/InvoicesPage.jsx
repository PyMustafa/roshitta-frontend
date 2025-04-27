import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';

const InvoicesPage = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const invoices = [
    { 
      id: '#5871', 
      date: '18 Apr 2025', 
      amount: '$101.00',
      details: {
        issuedDate: '18 Apr 2025',
        products: [
          { name: 'Consultation fee', price: '$101.00' }
        ],
        appointmentTime: '10:10 am',
        appointmentDate: '2025-04-26',
        location: 'The Family Dentistry Clinic',
        doctorName: 'Dr Darren Elder',
        patientName: 'Emily Rival',
        email: 'patientdemo@example.com',
        phone: '4545435',
        paymentMethod: 'Check payments'
      }
    },
  ];

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* <Sidebar className="hidden lg:block col-span-1" /> */}
        
      <h1 className="text-2xl font-bold text-gray-800 ml-140 mb-6">Invoices</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-300 ml-140 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="col-span-3 font-medium text-gray-700">Order ID</div>
          <div className="col-span-4 font-medium text-gray-700">Created date</div>
          <div className="col-span-3 font-medium text-gray-700">Amount</div>
          <div className="col-span-2 font-medium text-gray-700">Action</div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <div 
              key={invoice.id} 
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-100 transition-colors"
            >
              <div className="col-span-3 text-gray-900 font-medium">{invoice.id}</div>
              <div className="col-span-4 text-gray-600">{invoice.date}</div>
              <div className="col-span-3 text-gray-900">{invoice.amount}</div>
              <div className="col-span-2">
                <button 
                  onClick={() => handleViewInvoice(invoice)}
                  className="text-green-500 hover:text-green-700 focus:outline-none"
                >
                  <div className='w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 hover:bg-[#5F6FFF] border border-gray-200 '>🔗</div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedInvoice && (
  <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
    <div 
      className="absolute inset-0 bg-gray-100 opacity-50 backdrop-blur-xs" 
      onClick={closeModal}
    ></div>
    
    <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl relative z-10">
      <button 
        onClick={closeModal}
        className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
            
            <div className="p-6">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">View Invoice</h2>
              </div>

              <hr className="border-gray-300 my-4" />

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">ROSHITTA</h3>
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold text-gray-700">Billing From</h4>
                    <p className="text-gray-600">
                      {selectedInvoice.details.patientName}<br />
                      K Street. 1667 K Street NW.<br />
                      Washington, WA, 20005
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-gray-700 font-medium">Invoice No: {selectedInvoice.id}</p>
                  <p className="text-gray-600">Issued: {selectedInvoice.details.issuedDate}</p>
                </div>
              </div>

              <hr className="border-gray-300 my-4" />

              <div className="mb-6">
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Invoice Details</h4>
                  
                  <div className="flex border-b border-gray-200 bg-gray-100 p-2">
                    <div className="flex-1 text-gray-700 font-medium">Product</div>
                    <div className="border-l border-gray-200"></div>
                    <div className="flex-1 text-right text-gray-700 font-medium">Total</div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Appointment time</span>
                      <span>10:10 am</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Appointment date</span>
                      <span>2025-04-26</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Address</span>
                      <span>The Family Dentistry Clinic</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Doctor name</span>
                      <span>Dr Darren</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Patient name</span>
                      <span>Emily Rival</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Patient email</span>
                      <span>patientdemo@example.com</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Patient phone number</span>
                      <span>4545435</span>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between">
                      <strong>Consultation fee:</strong>
                      <span>$101.00</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <strong>Payment Method:</strong>
                      <span>Check payments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;