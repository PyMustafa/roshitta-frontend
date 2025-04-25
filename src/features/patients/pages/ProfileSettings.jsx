import { InformationSettings } from '../components/information-settings';
import { ChangePasswordSettings } from '../components/changepassword-settings';
import { ProfilePhotoSettings } from '../components/profilephoto-settings';
import { Sidebar } from '../components/Sidebar';


export const ProfileSettings = () => {
  const handleSaveChanges = () => {
    console.log('Changes saved');
  };

  return (
    <div className=" my-6 container mx-auto  grid grid-cols-4  gap-10 ">
      
    <Sidebar className="hidden lg:block col-span-1" />

  <div className="flex-1 p-6 border border-gray-300 col-span-3 my-4 rounded-xl">

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

      <InformationSettings />
      <ChangePasswordSettings />
      <ProfilePhotoSettings />

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSaveChanges}
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
export default ProfileSettings;
