import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BedDouble, Bed, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

type Hospital = {
    name: string;
    beds: { type: string; count: number; icon: React.ElementType }[];
    status: 'Available' | 'Limited';
};

const hospitals: Hospital[] = [
    {
        name: 'Apollo Hospital',
        beds: [
            { type: 'ICU Beds', count: 2, icon: BedDouble },
            { type: 'Oxygen Beds', count: 5, icon: Bed },
        ],
        status: 'Available',
    },
    {
        name: 'Government Medical College',
        beds: [
            { type: 'ICU Beds', count: 0, icon: BedDouble },
            { type: 'General Beds', count: 12, icon: Bed },
        ],
        status: 'Limited',
    },
    {
        name: 'Sunrise Hospital',
        beds: [
            { type: 'ICU Beds', count: 1, icon: BedDouble },
            { type: 'Ventilator Beds', count: 1, icon: Bed },
        ],
        status: 'Available',
    },
];

export default function BedFinderPage() {
    const illustration = placeholderImages.find(p => p.id === 'hospital-building');

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
                    Available Beds Nearby
                </h1>
                <p className="text-muted-foreground">
                    Real-time bed availability in your area.
                </p>
            </header>

            <div className="space-y-4">
                {hospitals.map((hospital) => (
                    <Card key={hospital.name} className="shadow-md">
                        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg">{hospital.name}</CardTitle>
                             <Badge variant={hospital.status === 'Available' ? 'success' : 'warning'}>
                                {hospital.status === 'Available' ? 
                                    <Bed className="mr-2 h-3 w-3" /> :
                                    <AlertTriangle className="mr-2 h-3 w-3" />
                                }
                                {hospital.status}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {hospital.beds.map((bed) => (
                                    <div key={bed.type} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <bed.icon className="h-4 w-4" />
                                            <span>{bed.type}</span>
                                        </div>
                                        <p className="font-bold text-lg">{bed.count} <span className="text-sm font-medium text-muted-foreground">available</span></p>
                                    </div>
                                ))}
                            </div>
                            <Button className="mt-4 w-full" variant="outline">
                                Reserve Bed
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
