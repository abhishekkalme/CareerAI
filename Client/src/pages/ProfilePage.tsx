import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { UserProfile } from '../components/UserProfile';

export function ProfilePage() {
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    // Load profile data from localStorage
    const storedProfile = localStorage.getItem('careerAI_profile');
    if (storedProfile) {
      setInitialData(JSON.parse(storedProfile));
    }
  }, []);

  const handleProfileUpdate = (profileData: any) => {
    // Update localStorage with new profile data
    localStorage.setItem('careerAI_profile', JSON.stringify(profileData));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Your Profile</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Review and update your profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserProfile 
            initialData={initialData}
            onComplete={handleProfileUpdate}
          />
        </CardContent>
      </Card>
    </div>
  );
}