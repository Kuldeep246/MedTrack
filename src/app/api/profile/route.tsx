import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/db';
import { decrypt, encrypt } from '@/lib/crypto'; 


export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const healthProfile = await prisma.healthProfile.findUnique({
            where: { userId: session.user.id },
        });

        if (!healthProfile) {
            const dummyHealthProfile = {
                dob: 'Not provided',               
                height: 0,                         
                weight: 0,                         
                allergies: 'Not provided',         
                bloodType: 'Not provided',         
                bloodSugarLevel: 0,               
                medicalHistory: 'Not provided',    
                hasInsurance: false,                
            };
        
            return NextResponse.json(dummyHealthProfile, { status: 200 });
        }
        const decryptedProfile = {
            ...healthProfile,
            allergies: decrypt(healthProfile.allergies),
            medicalHistory: decrypt(healthProfile.medicalHistory),
        };
        return NextResponse.json(decryptedProfile, { status: 200 });
    } catch (error) {
        console.error('Error fetching health profile:', error);
        return NextResponse.json({ error: 'Error fetching health profile' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const { dob, height, weight, allergies, bloodType, bloodSugarLevel, medicalHistory, hasInsurance } = data;

        const encryptedAllergies = encrypt(allergies);
        const encryptedMedicalHistory = encrypt(medicalHistory);

        const healthProfile = await prisma.healthProfile.upsert({
            where: { userId: session.user.id },
            update: {
                dob: new Date(dob),  
                height: parseInt(height, 10), 
                weight: parseInt(weight, 10), 
                allergies:encryptedAllergies,
                bloodSugarLevel: parseInt(bloodSugarLevel, 10), 
                medicalHistory:encryptedMedicalHistory,
                hasInsurance
            },
            create: {
                userId: session.user.id,
                dob: new Date(dob), 
                height: parseInt(height, 10), 
                weight: parseInt(weight, 10),  
                allergies:encryptedAllergies,
                bloodType,
                bloodSugarLevel: parseInt(bloodSugarLevel, 10), 
                medicalHistory:encryptedMedicalHistory,
                hasInsurance
            },
        });

        return NextResponse.json(healthProfile, { status: 201 });
    } catch (error) {
        console.error('Error saving health profile:', error);
        return NextResponse.json({ error: 'Error saving health profile' }, { status: 500 });
    }
}
