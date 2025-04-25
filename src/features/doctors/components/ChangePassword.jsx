import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"



export default function ChangePassword() {
    return (
        <Card className="border-gray-200">
        <CardHeader>
            <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Current Password</label>
                <Input 
                type="password"
                placeholder="Enter current password" 
                className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
                />
            </div>
    
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">New Password</label>
                <Input 
                type="password"
                placeholder="Enter new password" 
                className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
                />
            </div>
    
            <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Confirm New Password</label>
                <Input 
                type="password"
                placeholder="Confirm new password" 
                className="border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-200 focus:ring-opacity-25"
                />
            </div>
    
            <div className="flex justify-end mt-6">
                <Button className="bg-blue-500 hover:bg-blue-600">Change Password</Button>
            </div>
            </div>
        </CardContent>
        </Card>
    )
}