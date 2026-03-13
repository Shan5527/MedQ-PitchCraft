import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function LiveQueueTrackerPage() {
    const nextTokens = ["B19", "B20", "B21", "B22"];
    const userToken = "B23";

    return (
        <div className="flex flex-col space-y-6 text-center">
            <header>
                <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
                    Live Queue Tracker
                </h1>
                <p className="text-muted-foreground">
                    General Medicine Department
                </p>
            </header>

            <Card className="bg-accent text-accent-foreground">
                <CardContent className="p-6">
                    <p className="text-sm font-medium">Now Serving</p>
                    <p className="text-8xl font-bold tracking-tighter">B18</p>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4 text-left">Next Tokens</h3>
                    <div className="flex justify-around items-end space-x-2">
                        {nextTokens.map((token) => (
                             <div key={token} className="flex flex-col items-center">
                                <Badge variant="secondary" className="text-lg px-3 py-1">{token}</Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            
            <Card className="border-2 border-primary ring-4 ring-primary/20">
                <CardContent className="p-6">
                    <p className="text-sm font-medium text-primary">Your Token</p>
                    <p className="text-7xl font-bold tracking-tighter text-primary">{userToken}</p>
                </CardContent>
            </Card>
            
            <p className="text-lg">
                You will be called in approximately <span className="font-bold text-primary">10 minutes</span>.
            </p>
        </div>
    );
}
