'use client'
import { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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
            } catch {
                setError('Error fetching health profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const bmi = healthProfile ? bmiCalculate(healthProfile.height, healthProfile.weight) : null;
    const formattedDob = healthProfile?.dob ? formatDate(healthProfile.dob) : '';

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="pt-5 sm:px-10 w-full space-y-4">
            <div className="grid gap-6">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Date of Birth</Label>
                        <div className="rounded-md border px-3 py-2 shadow-sm">{formattedDob}</div>
                    </div>
                    <div className="space-y-2">
                        <Label>BMI</Label>
                        <div className="rounded-md border px-3 py-2 shadow-sm">{bmi}</div>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Height (cm)</Label>
                        <div className="rounded-md border px-3 py-2 shadow-sm">{healthProfile?.height ?? 'Not provided'} {healthProfile?.height ? 'cm' : ''}</div>
                    </div>
                    <div className="space-y-2">
                        <Label>Weight (kg)</Label>
                        <div className="rounded-md border px-3 py-2 shadow-sm">{healthProfile?.weight ?? 'Not provided'} {healthProfile?.weight ? 'kg' : ''}</div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Allergies</Label>
                    <div className="rounded-md border px-3 py-2 shadow-sm">
                        {healthProfile?.allergies || 'None reported'}
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Blood Type</Label>
                        <div className="rounded-md border px-3 py-2 shadow-sm">{healthProfile?.bloodType || 'Not provided'}</div>
                    </div>
                    <div className="space-y-2">
                        <Label>Blood Sugar Level (mg/dL)</Label>
                        <div className="rounded-md border px-3 py-2 shadow-sm">
                            {healthProfile?.bloodSugarLevel ? `${healthProfile?.bloodSugarLevel} mg/dL` : 'Not provided'}
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Medical History</Label>
                    <ScrollArea className="h-[100px] rounded-md border">
                        <div className="p-3 text-sm">
                            {healthProfile?.medicalHistory || 'No significant medical history reported'}
                        </div>
                    </ScrollArea>
                </div>

                <div className="flex items-center justify-between">
                    <Label>Insurance</Label>
                    <Badge
                        variant="destructive"
                        className={
                            healthProfile?.hasInsurance === true
                                ? 'bg-green-600 text-white'
                                : healthProfile?.hasInsurance === false
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-500 text-white'
                        }
                    >
                        {healthProfile?.hasInsurance === true
                            ? 'Insured'
                            : healthProfile?.hasInsurance === false
                                ? 'Uninsured'
                                : 'Not specified'}
                    </Badge>
                </div>
            </div>
        </div>
    );
}
