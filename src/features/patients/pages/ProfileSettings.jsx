import { InformationSettings } from '../components/information-settings';
import { ProfilePhotoSettings } from '../components/profilephoto-settings';

export const ProfileSettings = () => {
  const handleSaveChanges = () => {
    console.log('Changes saved');
  };

  return (
    <div className="w-full">
      <div className="border border-gray-300 p-6 rounded-xl">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

          <InformationSettings />

          <ProfilePhotoSettings />

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveChanges}
              className="bg-[#5F6fff] text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
