import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="max-w-4xl">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground">Manage your manufacturing system preferences and configurations.</p>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>Configure system-wide settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" defaultValue="Manufacturing Corp" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="plant-location">Plant Location</Label>
                      <Input id="plant-location" defaultValue="Detroit, MI" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input id="admin-email" type="email" defaultValue="admin@manufacturing.com" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alert Settings</CardTitle>
                  <CardDescription>Configure when and how you receive alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Low Stock Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when inventory falls below minimum levels
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Shipment Delay Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when shipments are delayed</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Supplier Performance Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified about supplier performance issues</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data & Backup</CardTitle>
                  <CardDescription>Manage your data and backup settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">Automatically backup data daily</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Export Data</Label>
                      <p className="text-sm text-muted-foreground">Download your data as CSV or JSON</p>
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
