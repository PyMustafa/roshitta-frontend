import PersonalDetails from "./personal-details"
import ProfilePhoto from "./profile-photo"
import DocumentSection from "./document-section"
import ChangePassword from "./ChangePassword"
import { Button } from "@/components/ui/button"

export default function ProfileSettings() {
return (
    <div className="space-y-6">

        <div className="container">
            <div className="p-6">
                    <div className="space-y-6">
                        <PersonalDetails />
                        <DocumentSection />
                        <ProfilePhoto />
                        <ChangePassword />
                        <div className="flex justify-end mt-6">
                            <div>
                                <Button className="bg-emerald-500 hover:bg-emerald-600">Save Changes</Button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
)
}