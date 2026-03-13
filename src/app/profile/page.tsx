import ProfileClient from './profile-client';
import { placeholderImages } from '@/lib/placeholder-images';

// Mock data for the profile page
const userProfile = {
    name: 'Anand Sharma',
    age: 34,
    gender: 'Male',
    bloodGroup: 'O+',
    emergencyContact: '+91 98765 43210',
    avatar: placeholderImages.find(p => p.id === 'user-avatar'),
};

const healthOverview = [
    { metric: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'Normal', icon: 'Heart' },
    { metric: 'Blood Sugar', value: '95', unit: 'mg/dL', status: 'Normal', icon: 'Droplets' },
    { metric: 'Heart Rate', value: '72', unit: 'bpm', status: 'Normal', icon: 'Activity' },
    { metric: 'Weight', value: '75', unit: 'kg', status: 'Normal', icon: 'Weight' },
];

const healthTrendsData = {
    bloodPressure: [
        { date: 'Mon', systolic: 120, diastolic: 80 },
        { date: 'Tue', systolic: 122, diastolic: 81 },
        { date: 'Wed', systolic: 118, diastolic: 79 },
        { date: 'Thu', systolic: 121, diastolic: 80 },
        { date: 'Fri', systolic: 123, diastolic: 82 },
        { date: 'Sat', systolic: 120, diastolic: 80 },
        { date: 'Sun', systolic: 119, diastolic: 79 },
    ],
    bloodSugar: [
        { date: 'Mon', level: 95 },
        { date: 'Tue', level: 98 },
        { date: 'Wed', level: 92 },
        { date: 'Thu', level: 105 },
        { date: 'Fri', level: 96 },
        { date: 'Sat', level: 94 },
        { date: 'Sun', level: 97 },
    ],
    heartRate: [
         { date: 'Mon', rate: 72 },
         { date: 'Tue', rate: 75 },
         { date: 'Wed', rate: 70 },
         { date: 'Thu', rate: 78 },
         { date: 'Fri', rate: 74 },
         { date: 'Sat', rate: 71 },
         { date: 'Sun', rate: 73 },
    ],
};

const medicalRecords = {
    pastVisits: [
        { date: '12 Mar 2026', doctor: 'Dr. Arjun Kumar', diagnosis: 'Viral Fever', hospital: 'Apollo Hospital' },
    ],
    diagnosedConditions: [
        { name: 'Hypertension', since: '2022', status: 'Managed' },
    ],
    medications: [
        { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily' },
    ],
    uploadedReports: [
        { name: 'Blood Test Report', date: '15 Feb 2026', type: 'PDF' },
    ],
};

export default function ProfilePage() {
    return (
        <ProfileClient 
            userProfile={userProfile}
            healthOverview={healthOverview}
            healthTrendsData={healthTrendsData}
            medicalRecords={medicalRecords}
        />
    );
}
