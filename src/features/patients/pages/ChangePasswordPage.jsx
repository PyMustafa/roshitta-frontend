import { ChangePasswordSettings } from '../components/changepassword-settings';

const ChangePasswordPage = () => {
  return (
    <div className="w-full">
      <div className="border border-gray-300 p-6 rounded-xl">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Change Password</h1>
          
          <ChangePasswordSettings />
          
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;