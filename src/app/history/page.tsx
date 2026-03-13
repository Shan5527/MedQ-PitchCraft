import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Activity, FileText } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';


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

export default function VisitHistoryPage() {
    const illustration = placeholderImages.find(p => p.id === 'patient-reviewing-records');
    return (
        <div className="flex flex-col space-y-6">
            <header className="text-center space-y-4">
                {illustration && (
                    <Image
                        src={illustration.imageUrl}
                        alt={illustration.description}
                        width={600}
                        height={400}
                        data-ai-hint={illustration.imageHint}
                        className="w-48 h-32 mx-auto object-cover rounded-lg"
                    />
                )}
                <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
                    My Medical Visits
                </h1>
                <p className="text-muted-foreground">
                    A record of your past consultations.
                </p>
            </header>
            <div className="space-y-4">
                {visitHistory.map((visit, index) => (
                    <Card key={index} className="shadow-md">
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
    );
}
