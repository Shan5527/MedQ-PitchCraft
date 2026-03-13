import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BedDouble, Bed, AlertTriangle, Hospital as HospitalIcon } from 'lucide-react';
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
    const hospitalIllustration = placeholderImages.find(p => p.id === 'hospital-illustration');

    return (
        <div className="flex flex-col space-y-6">
            <Card className="border-none bg-primary/10 text-center shadow-none">
              <CardContent className="p-6">
                 {hospitalIllustration && (
                    <Image
                        src={hospitalIllustration.imageUrl}
                        alt={hospitalIllustration.description}
                        width={300}
                        height={300}
                        className="mx-auto w-48 object-contain rounded-lg"
                        data-ai-hint={hospitalIllustration.imageHint}
                    />
                )}
                <h1 className="mt-4 text-2xl font-bold tracking-tight text-primary font-headline">
                    Available Beds Nearby
                </h1>
                <p className="text-muted-foreground">
                    Real-time bed availability in your area.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
                {hospitals.map((hospital) => (
                    <Card key={hospital.name} className="shadow-sm">
                        <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
                            <div>
                               <CardTitle className="text-lg flex items-center gap-2">
                                <HospitalIcon className="h-5 w-5 text-primary" />
                                {hospital.name}
                               </CardTitle>
                            </div>
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
