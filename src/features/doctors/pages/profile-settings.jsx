import ProfileSettings from "../components/profile-settings.jsx"
import { Sidebar } from "../components/sidebar.jsx"

export default function ProfileSettingsPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="col-span-1 md:col-span-3">
          <Sidebar />
        </div>
        <div className="col-span-1 md:col-span-9">
          <ProfileSettings />
        </div>
      </div>
    </div>
  )
}