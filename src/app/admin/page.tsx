import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminPage() {
    return (
        <div className="flex flex-col space-y-6">
            <header className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
                    Hospital Control Panel
                </h1>
                <p className="text-muted-foreground">
                    Admin dashboard for real-time updates.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Bed Availability</CardTitle>
                    <CardDescription>Update the number of available beds.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="icu-beds">ICU Beds</Label>
                            <Input id="icu-beds" type="number" defaultValue="2" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="oxygen-beds">Oxygen Beds</Label>
                            <Input id="oxygen-beds" type="number" defaultValue="5" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="general-beds">General Beds</Label>
                        <Input id="general-beds" type="number" defaultValue="10" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Queue Control</CardTitle>
                    <CardDescription>Update the current token being served.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Label htmlFor="now-serving">Now Serving Token</Label>
                    <Input id="now-serving" defaultValue="B18" />
                </CardContent>
            </Card>

            <Button size="lg">Update Status</Button>
        </div>
    );
}
