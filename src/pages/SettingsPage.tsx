import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, Bell, Shield, Palette, Globe, Smartphone, Save } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <Palette className="h-4 w-4" />
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="rounded-xl bg-card p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-6">Profile Information</h3>
              
              <div className="flex items-center gap-6 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {user?.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={user?.name?.split(' ')[0]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={user?.name?.split(' ')[1]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="territory">Territory</Label>
                  <Input id="territory" defaultValue={user?.territory || 'All Regions'} disabled />
                </div>
              </div>

              <Button className="btn-gradient-primary mt-6">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="rounded-xl bg-card p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-6">Notification Preferences</h3>
              
              <div className="space-y-6">
                {[
                  { title: 'Order Notifications', desc: 'Get notified when new orders are placed', enabled: true },
                  { title: 'Visit Reminders', desc: 'Receive reminders for scheduled visits', enabled: true },
                  { title: 'Target Alerts', desc: 'Get alerts when approaching or hitting targets', enabled: true },
                  { title: 'Team Updates', desc: 'Updates about team member activities', enabled: false },
                  { title: 'Weekly Reports', desc: 'Receive weekly performance summary', enabled: true },
                  { title: 'Marketing Messages', desc: 'Promotional updates and news', enabled: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.enabled} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-card p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-6">Notification Channels</h3>
              <div className="space-y-4">
                {[
                  { channel: 'Email', icon: '📧', enabled: true },
                  { channel: 'Push Notifications', icon: '🔔', enabled: true },
                  { channel: 'SMS', icon: '📱', enabled: false },
                  { channel: 'WhatsApp', icon: '💬', enabled: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-medium">{item.channel}</span>
                    </div>
                    <Switch defaultChecked={item.enabled} />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="rounded-xl bg-card p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-6">Change Password</h3>
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button className="btn-gradient-primary">Update Password</Button>
              </div>
            </div>

            <div className="rounded-xl bg-card p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-6">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Enable 2FA</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="rounded-xl bg-card p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-6">Active Sessions</h3>
              <div className="space-y-4">
                {[
                  { device: 'Chrome on Windows', location: 'Mumbai, India', current: true },
                  { device: 'Safari on iPhone', location: 'Mumbai, India', current: false },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{session.device}</p>
                        <p className="text-sm text-muted-foreground">{session.location}</p>
                      </div>
                    </div>
                    {session.current ? (
                      <span className="text-sm text-success font-medium">Current</span>
                    ) : (
                      <Button variant="outline" size="sm">Revoke</Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <div className="rounded-xl bg-card p-6 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-6">Display Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Language</p>
                    <p className="text-sm text-muted-foreground">Select your preferred language</p>
                  </div>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-40">
                      <Globe className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="mr">Marathi</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Currency</p>
                    <p className="text-sm text-muted-foreground">Set your display currency</p>
                  </div>
                  <Select defaultValue="inr">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">₹ INR</SelectItem>
                      <SelectItem value="usd">$ USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Compact Mode</p>
                    <p className="text-sm text-muted-foreground">Show more content on screen</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
