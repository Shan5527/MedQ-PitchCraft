import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Activity, FileText } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';

type Visit = {
    date: string;
    doctor: string;
    diagnosis: string;
    prescription: string;
};

const visitHistory: Visit[] = [
    {
        date: '12 March 2026',
        doctor: 'Dr. Arjun Kumar',
        diagnosis: 'Viral Fever',
        prescription: 'Paracetamol',
    },
    {
        date: '28 January 2026',
        doctor: 'Dr. Priya Sharma',
        diagnosis: 'Common Cold',
        prescription: 'Antihistamines, Rest',
    },
    {
        date: '05 October 2025',
        doctor: 'Dr. Rohan Singh',
        diagnosis: 'Follow-up Checkup',
        prescription: 'Continue previous medication',
    },
];

export default function ProfilePage() {
    const userAvatar = placeholderImages.find(p => p.id === 'user-avatar');
    
    return (
        <div className="flex flex-col space-y-6">
            <Card className="text-center">
                <CardContent className="p-6">
                    {userAvatar && (
                        <Image
                            src={userAvatar.imageUrl}
                            alt={userAvatar.description}
                            width={100}
                            height={100}
                            className="mx-auto rounded-full"
                            data-ai-hint={userAvatar.imageHint}
                        />
                    )}
                    <h2 className="mt-4 text-2xl font-bold">Anand Sharma</h2>
                    <p className="text-muted-foreground">anand.sharma@example.com</p>
                    <Button variant="outline" className="mt-4">Edit Profile</Button>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-xl font-bold mb-4">My Medical Visits</h2>
                <div className="space-y-4">
                    {visitHistory.map((visit, index) => (
                        <Card key={index} className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">{visit.date}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-muted-foreground">Doctor</p>
                                        <p className="font-semibold">{visit.doctor}</p>
                                    </div>
                                </div>
                                 <div className="flex items-center gap-3 text-sm">
                                    <Activity className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-muted-foreground">Diagnosis</p>
                                        <p className="font-semibold">{visit.diagnosis}</p>
                                    </div>
                                </div>
                                 <div className="flex items-center gap-3 text-sm">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-muted-foreground">Prescription</p>
                                        <p className="font-semibold">{visit.prescription}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
