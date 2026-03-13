import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { User, Forward } from 'lucide-react';
import Link from 'next/link';

export default function DigitalQueueTokenPage() {
    return (
        <div className="flex flex-col space-y-6">
            <header className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
                    Your Digital Token
                </h1>
                <p className="text-muted-foreground">
                    You are in the queue. We'll see you shortly.
                </p>
            </header>

            <Card className="w-full max-w-sm mx-auto shadow-2xl bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
                <CardHeader className="text-center pb-2">
                    <CardDescription className="text-primary-foreground/80">Token Number</CardDescription>
                    <CardTitle className="text-7xl font-bold tracking-tighter">B23</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                    <div className="rounded-lg bg-primary-foreground/10 p-4 space-y-3">
                        <div>
                            <p className="text-sm text-primary-foreground/80">Department</p>
                            <p className="font-semibold">General Medicine</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary-foreground/80"/>
                            <p>Dr. Arjun Kumar</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-sm text-primary-foreground/80">Patients Ahead</p>
                            <p className="text-2xl font-bold">5</p>
                        </div>
                        <div>
                            <p className="text-sm text-primary-foreground/80">Est. Wait Time</p>
                            <p className="text-2xl font-bold">18 min</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Queue Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                        <span>Now Serving: B18</span>
                        <span>Your Turn: B23</span>
                    </div>
                    <Progress value={(18 / 23) * 100} className="w-full" />
                </CardContent>
            </Card>

             <Button asChild size="lg" className="w-full">
               <Link href="/queue/live">
                 Track Live Queue <Forward className="ml-2 h-4 w-4" />
                </Link>
             </Button>
        </div>
    )
}
