
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import { UserSettings, getUserData, updateUserData } from '@/utils/localStorage';
import { loadDemoData } from '@/utils/demoData';

const Settings = () => {
  const [settings, setSettings] = useState<UserSettings>({
    name: '',
    email: '',
    currency: 'USD',
    notifications: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Load demo data
    loadDemoData();
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      const userData = getUserData();
      setSettings(userData.settings);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings({
      ...settings,
      [name]: checked
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update settings in localStorage
      updateUserData('settings', settings);
      setIsSaving(false);
      setSuccessMessage('Settings saved successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar ($)' },
    { code: 'EUR', name: 'Euro (€)' },
    { code: 'GBP', name: 'British Pound (£)' },
    { code: 'JPY', name: 'Japanese Yen (¥)' },
    { code: 'CAD', name: 'Canadian Dollar (C$)' },
    { code: 'AUD', name: 'Australian Dollar (A$)' },
    { code: 'CHF', name: 'Swiss Franc (Fr)' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-3xl">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-deep-charcoal mb-8">
            Account Settings
          </h1>
          
          <GlassCard>
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-5 bg-subtle-gray/20 rounded w-1/3"></div>
                    <div className="h-10 bg-subtle-gray/20 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Success Message */}
                {successMessage && (
                  <div className="mb-6 p-3 bg-soft-emerald/10 text-soft-emerald rounded-md animate-fade-in">
                    {successMessage}
                  </div>
                )}
                
                <div className="space-y-6">
                  {/* Profile Section */}
                  <div>
                    <h2 className="font-serif text-xl text-deep-charcoal mb-4">Profile Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-deep-charcoal/70 text-sm mb-2" htmlFor="name">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={settings.name}
                          onChange={handleInputChange}
                          className="w-full border border-subtle-gray bg-white/50 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-soft-gold"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-deep-charcoal/70 text-sm mb-2" htmlFor="email">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={settings.email}
                          onChange={handleInputChange}
                          className="w-full border border-subtle-gray bg-white/50 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-soft-gold"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Preferences Section */}
                  <div className="pt-6 border-t border-subtle-gray/20">
                    <h2 className="font-serif text-xl text-deep-charcoal mb-4">Preferences</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-deep-charcoal/70 text-sm mb-2" htmlFor="currency">
                          Currency
                        </label>
                        <select
                          id="currency"
                          name="currency"
                          value={settings.currency}
                          onChange={handleInputChange}
                          className="w-full border border-subtle-gray bg-white/50 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-soft-gold"
                        >
                          {currencies.map(currency => (
                            <option key={currency.code} value={currency.code}>{currency.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-deep-charcoal/70 text-sm mb-2" htmlFor="notifications">
                          Notifications
                        </label>
                        <div className="flex items-center mt-3">
                          <input
                            type="checkbox"
                            id="notifications"
                            name="notifications"
                            checked={settings.notifications}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-soft-gold border-subtle-gray rounded focus:ring-soft-gold"
                          />
                          <label htmlFor="notifications" className="ml-2 text-deep-charcoal/80">
                            Enable email notifications
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Security Section */}
                  <div className="pt-6 border-t border-subtle-gray/20">
                    <h2 className="font-serif text-xl text-deep-charcoal mb-4">Security</h2>
                    
                    <div className="space-y-4">
                      <button
                        type="button"
                        className="border border-subtle-gray text-deep-charcoal/80 font-medium px-4 py-2 rounded-md hover:bg-subtle-gray/10 transition-all duration-300"
                      >
                        Change Password
                      </button>
                      
                      <button
                        type="button"
                        className="border border-subtle-gray text-deep-charcoal/80 font-medium px-4 py-2 rounded-md hover:bg-subtle-gray/10 transition-all duration-300 ml-2"
                      >
                        Enable Two-Factor Authentication
                      </button>
                    </div>
                  </div>
                  
                  {/* Save Button */}
                  <div className="pt-6 border-t border-subtle-gray/20 flex justify-end">
                    <button
                      type="submit"
                      className="gold-btn"
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </GlassCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
