'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSession } from 'next-auth/react'
import { Upload } from "lucide-react";


const Uploaddata = () => {

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [dob, setDob] = useState('');
  const [bloodSugarLevel, setBloodSugarLevel] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [hasInsurance, setHasInsurance] = useState(false);
  const router = useRouter()

  const { data: session, status } = useSession()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "authenticated" && session?.user) {
      try {
        const response = await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            height,
            weight,
            allergies,
            bloodType,
            dob,
            bloodSugarLevel,
            medicalHistory,
            hasInsurance,
          }),
        });

        if (response.ok) {

          setHeight('');
          setWeight('');
          setAllergies('');
          setBloodType('');
          setDob('');
          setBloodSugarLevel('');
          setMedicalHistory('');
          setHasInsurance(false);
          router.refresh()
        } else {
          console.error('Submission failed:', response.statusText);
        }
      } catch (error) {
        console.error('Submission error:', error);
      }
    } else {
      console.error('User not authenticated');
    }
  };
  return (
    <div className=''>
      <Dialog>
        <DialogTrigger>
          <div className='text-blue-600 rounded-md px-5 pt-1 my-1 ' title='update'>
          <Upload className='h-5' />
          </div>
        </DialogTrigger>

        <DialogContent className='h-5/6 overflow-auto mt-5 mb-5'>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md h-8 border border-neutral-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                  Height (cm)
                </label>
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md h-8 border border-neutral-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md h-8 border border-neutral-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                  Allergies
                </label>
                <textarea
                  id="allergies"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  required
                  className="mt-1 h-20 block w-full rounded-md border border-neutral-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">
                  Blood Type
                </label>
                <select
                  id="bloodType"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md h-8 border border-neutral-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label htmlFor="bloodSugarLevel" className="block text-sm font-medium text-gray-700">
                  Blood Sugar Level (mg/dL)
                </label>
                <input
                  type="number"
                  id="bloodSugarLevel"
                  value={bloodSugarLevel}
                  onChange={(e) => setBloodSugarLevel(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md h-8 border border-neutral-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">
                  Medical History
                </label>
                <textarea
                  id="medicalHistory"
                  value={medicalHistory}
                  onChange={(e) => setMedicalHistory(e.target.value)}
                  required
                  className="mt-1 h-20 block w-full rounded-md border border-neutral-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasInsurance"
                  checked={hasInsurance}
                  onChange={(e) => setHasInsurance(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="hasInsurance" className="ml-2 block text-sm text-gray-700">
                  Do you have health insurance?
                </label>
              </div>

              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>

            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}


export default Uploaddata
