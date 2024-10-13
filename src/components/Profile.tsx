'use client'

import { useEffect, useState } from 'react';

interface HealthProfile {
    dob: string;
    height: number; 
    weight: number;
    allergies: string;
    bloodType: string;
    bloodSugarLevel: number;
    medicalHistory: string;
    hasInsurance: boolean;
}

function bmiCalculate(height: number, weight: number) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return parseFloat(bmi.toFixed(2));
}
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

export default function Profile() {
    const [healthProfile, setHealthProfile] = useState<HealthProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/profile', {
                    method: 'GET',
                });
                if (res.ok) {
                    const data: HealthProfile = await res.json();
                    setHealthProfile(data);
                } else {
                    setError('Failed to fetch health profile');
                }
            } catch (err) {
                setError('Error fetching health profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const bmi =healthProfile ? bmiCalculate(healthProfile.height, healthProfile.weight): null;
    const formattedDob = healthProfile?.dob ? formatDate(healthProfile.dob) : '';



    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="pt-5 sm:px-10 w-full space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth:</label>
                    <div className="mt-1 block w-full rounded-md border border-neutral-200 shadow-sm py-2 px-2 bg-white">
                        {formattedDob}
                    </div>
                </div>

                <div className='flex justify-evenly space-x-2 w-full'>
                    <div className='w-1/2'>
                        <label className="block text-sm font-medium text-gray-700">Height (cm):</label>
                        <div className="mt-1 block w-full rounded-md border border-neutral-200 shadow-sm py-2 px-2 bg-white">
                            {healthProfile?.height} cm
                        </div>
                    </div>

                    <div className='w-1/2'>
                        <label className="block text-sm font-medium text-gray-700">Weight (kg):</label>
                        <div className="mt-1 block w-full rounded-md border border-neutral-200 shadow-sm py-2 px-2 bg-white">
                            {healthProfile?.weight} kg
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">BMI:</label>
                    <div className="mt-1 block w-full rounded-md border border-neutral-200 shadow-sm py-2 px-2 bg-white">
                        {bmi || 'N/A'}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Allergies:</label>
                    <div className="mt-1 block w-full rounded-md border border-neutral-200 shadow-sm py-2 px-2 bg-white">
                        {healthProfile?.allergies || 'None'}
                    </div>
                </div>

                <div className='flex justify-evenly space-x-2 w-full'>
                    <div className='w-1/2'>
                        <label className="block text-sm font-medium text-gray-700">Blood Type:</label>
                        <div className="mt-1 block w-full rounded-md border border-neutral-200 shadow-sm py-2 px-2 bg-white">
                            {healthProfile?.bloodType}
                        </div>
                    </div>

                    <div className='w-1/2'>
                        <label className="block text-sm font-medium text-gray-700">Blood Sugar Level (mg/dL):</label>
                        <div className="mt-1 block w-full rounded-md border border-neutral-200 shadow-sm py-2 px-2 bg-white">
                            {healthProfile?.bloodSugarLevel} mg/dL
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Medical History:</label>
                    <div className="mt-1 block w-full text-sm max-h-48 overflow-hidden rounded-md border border-neutral-200 shadow-sm py-2 px-2 bg-white">
                        {healthProfile?.medicalHistory || 'No significant medical history'}
                    </div>
                </div>

                <div className="flex items-center">
                    <label className="block text-sm font-medium text-gray-700">Insurance:</label>
                    <div className="ml-2 block font-semibold text-gray-700">
                        {healthProfile?.hasInsurance ? 'Yes' : 'No'}
                    </div>
                </div>
            </div>
        </div>
    );
}
