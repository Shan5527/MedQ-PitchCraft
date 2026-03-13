import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { placeholderImages } from '@/lib/placeholder-images';
import { AlertTriangle, Ambulance, Building, MessageCircle, Phone, Star } from 'lucide-react';
import Link from 'next/link';

const experts = [
    {
        name: 'Dr. Priya Sharma',
        specialization: 'General Physician',
        rating: 4.9,
        status: 'Online',
        avatarId: 'expert-avatar-1',
        type: 'Doctor'
    },
    {
        name: 'Nurse Raj Singh',
        specialization: 'Nurse Advisor',
        rating: 4.8,
        status: 'Online',
        avatarId: 'expert-avatar-2',
        type: 'Nurse'
    },
    {
        name: 'Dr. Anjali Mehta',
        specialization: 'Pediatrician',
        rating: 4.9,
        status: 'Available in 5 mins',
        avatarId: 'expert-avatar-3',
        type: 'Specialist'
    },
    {
        name: 'Dr. Vikram Rao',
        specialization: 'Cardiologist',
        rating: 4.7,
        status: 'Offline',
        avatarId: 'expert-avatar-4',
        type: 'Specialist'
    },
];


export default function ExpertListPage() {
    // This would be dynamic in a real app
    const highUrgency = true;

    return (
        <div className="space-y-6">
            <header className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
                    Talk to a Medical Expert
                </h1>
                <p className="text-muted-foreground">
                    Connect with qualified professionals for guidance.
                </p>
            </header>

            {highUrgency && (
                <Alert variant="destructive" className="space-y-4">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 mt-1" />
                        <div>
                            <AlertTitle className="font-bold">Urgent Action Recommended</AlertTitle>
                            <AlertDescription>
                                Your previous symptom check indicated signs that may require urgent attention.
                            </AlertDescription>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <Button variant="destructive" size="sm">
                            <Phone className="mr-2 h-4 w-4" /> Call Emergency
                        </Button>
                        <Button variant="outline" size="sm">
                            <Building className="mr-2 h-4 w-4" /> Find Hospital
                        </Button>
                        <Button variant="outline" size="sm">
                            <Ambulance className="mr-2 h-4 w-4" /> Ambulance
                        </Button>
                    </div>
                </Alert>
            )}

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="doctors">Doctors</TabsTrigger>
                    <TabsTrigger value="nurses">Nurses</TabsTrigger>
                    <TabsTrigger value="specialists">Specialists</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="space-y-4">
                {experts.map((expert) => {
                    const avatar = placeholderImages.find(p => p.id === expert.avatarId);
                    const isOnline = expert.status === 'Online';
                    
                    return (
                        <Card key={expert.name} className="shadow-sm">
                            <CardContent className="p-4 flex items-center gap-4">
                                {avatar && (
                                    <Avatar className="h-20 w-20 border-2 border-primary/20">
                                        <AvatarImage src={avatar.imageUrl} alt={expert.name} />
                                        <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className="flex-1 space-y-1">
                                    <h3 className="font-bold text-lg">{expert.name}</h3>
                                    <p className="text-sm text-muted-foreground">{expert.specialization}</p>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Badge variant={isOnline ? 'success' : 'secondary'}>{expert.status}</Badge>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                            <span className="font-semibold">{expert.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <div className="grid grid-cols-2 gap-0 border-t">
                                <Button asChild variant="ghost" className="rounded-none rounded-bl-lg h-12">
                                   <Link href="/experts/chat">
                                    <MessageCircle className="mr-2 h-5 w-5" /> Chat
                                   </Link>
                                </Button>
                                <Button asChild variant="ghost" className="rounded-none rounded-br-lg h-12 border-l">
                                   <Link href="#">
                                    <Phone className="mr-2 h-5 w-5" /> Call
                                   </Link>
                                </Button>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
