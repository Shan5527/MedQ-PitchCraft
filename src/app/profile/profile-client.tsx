'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, PlusCircle, Settings, ChevronRight, Phone, Droplets, Heart, Activity, Weight, FileText } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Legend } from 'recharts';
import type { ImagePlaceholder } from '@/lib/placeholder-images';

type UserProfile = {
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  emergencyContact: string;
  avatar?: ImagePlaceholder;
};

const iconMap = {
    Heart,
    Droplets,
    Activity,
    Weight,
};

export default function ProfileClient({ userProfile, healthOverview, healthTrendsData, medicalRecords }: any) {
    const bpChartConfig = {
      systolic: { label: 'Systolic', color: 'hsl(var(--chart-1))' },
      diastolic: { label: 'Diastolic', color: 'hsl(var(--chart-2))' },
    } satisfies ChartConfig;

    const bsChartConfig = {
      level: { label: 'Blood Sugar', color: 'hsl(var(--chart-1))' },
    } satisfies ChartConfig;

    const hrChartConfig = {
        rate: { label: 'Heart Rate', color: 'hsl(var(--chart-1))' },
    } satisfies ChartConfig;

    return (
        <div className="space-y-6 pb-6">
            {/* Profile Header */}
            <Card className="overflow-hidden">
                <CardHeader className="bg-primary/10 flex-row items-center gap-4 p-4">
                     {userProfile.avatar && (
                        <Image
                            src={userProfile.avatar.imageUrl}
                            alt={userProfile.avatar.description}
                            width={80}
                            height={80}
                            className="rounded-full border-4 border-white shadow-sm"
                            data-ai-hint={userProfile.avatar.imageHint}
                        />
                    )}
                    <div>
                        <CardTitle className="text-2xl font-bold text-primary">{userProfile.name}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            {userProfile.age} / {userProfile.gender}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-primary" />
                        <div>
                            <p className="text-muted-foreground">Blood Group</p>
                            <p className="font-semibold">{userProfile.bloodGroup}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <div>
                            <p className="text-muted-foreground">Emergency</p>
                            <p className="font-semibold">{userProfile.emergencyContact}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Health Overview */}
            <div>
                <h2 className="text-xl font-bold mb-4 px-1">Health Overview</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {healthOverview.map((item: any) => {
                       const Icon = iconMap[item.icon as keyof typeof iconMap] || Activity;
                       const getStatusVariant = (status: string) => {
                           if (status.toLowerCase() === 'high' || status.toLowerCase() === 'low') return 'warning';
                           return 'success';
                       }
                       return (
                        <Card key={item.metric} className="shadow-sm text-center">
                            <CardContent className="p-4">
                                <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                                <p className="text-lg font-bold">{item.value} <span className="text-sm text-muted-foreground font-normal">{item.unit}</span></p>
                                <p className="text-sm text-muted-foreground">{item.metric}</p>
                                 <Badge variant={getStatusVariant(item.status)} className="mt-2">{item.status}</Badge>
                            </CardContent>
                        </Card>
                       )
                    })}
                </div>
            </div>

            {/* Health Trends */}
            <div>
                 <h2 className="text-xl font-bold mb-4 px-1">Health Trends</h2>
                 <Tabs defaultValue="bp" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="bp">Blood Pressure</TabsTrigger>
                        <TabsTrigger value="bs">Blood Sugar</TabsTrigger>
                        <TabsTrigger value="hr">Heart Rate</TabsTrigger>
                    </TabsList>
                    <TabsContent value="bp">
                        <Card>
                            <CardHeader>
                                <CardTitle>Blood Pressure</CardTitle>
                                <CardDescription>Last 7 days</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={bpChartConfig} className="h-[200px] w-full">
                                    <LineChart data={healthTrendsData.bloodPressure}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                                        <YAxis />
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Legend />
                                        <Line dataKey="systolic" type="monotone" stroke="var(--color-systolic)" strokeWidth={2} dot={false} />
                                        <Line dataKey="diastolic" type="monotone" stroke="var(--color-diastolic)" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="bs">
                        <Card>
                            <CardHeader>
                                <CardTitle>Blood Sugar</CardTitle>
                                <CardDescription>Last 7 days</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={bsChartConfig} className="h-[200px] w-full">
                                    <LineChart data={healthTrendsData.bloodSugar}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                                        <YAxis />
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Line dataKey="level" type="monotone" stroke="var(--color-level)" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>
                     <TabsContent value="hr">
                        <Card>
                            <CardHeader>
                                <CardTitle>Heart Rate</CardTitle>
                                <CardDescription>Last 7 days</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={hrChartConfig} className="h-[200px] w-full">
                                    <LineChart data={healthTrendsData.heartRate}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                                        <YAxis />
                                        <Tooltip content={<ChartTooltipContent />} />
                                        <Line dataKey="rate" type="monotone" stroke="var(--color-rate)" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>
                 </Tabs>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload Report</Button>
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Health Reading</Button>
            </div>

            {/* Medical Records */}
            <div>
                <h2 className="text-xl font-bold mb-4 px-1">Medical Records</h2>
                <Accordion type="single" collapsible className="w-full space-y-2">
                    <AccordionItem value="visits" className="rounded-lg border bg-card px-4">
                        <AccordionTrigger>Past Visits</AccordionTrigger>
                        <AccordionContent>
                           {medicalRecords.pastVisits.map((visit: any, i: number) => (
                                <p key={i}>{visit.date} - {visit.diagnosis} with {visit.doctor}</p>
                           ))}
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="conditions" className="rounded-lg border bg-card px-4">
                        <AccordionTrigger>Diagnosed Conditions</AccordionTrigger>
                        <AccordionContent>
                            {medicalRecords.diagnosedConditions.map((cond: any, i: number) => (
                                <p key={i}>{cond.name} (Since {cond.since}) - Status: {cond.status}</p>
                           ))}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="meds" className="rounded-lg border bg-card px-4">
                        <AccordionTrigger>Prescribed Medications</AccordionTrigger>
                        <AccordionContent>
                             {medicalRecords.medications.map((med: any, i: number) => (
                                <p key={i}>{med.name} {med.dosage}, {med.frequency}</p>
                           ))}
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="reports" className="rounded-lg border bg-card px-4">
                        <AccordionTrigger>Uploaded Reports</AccordionTrigger>
                        <AccordionContent>
                            {medicalRecords.uploadedReports.map((report: any, i: number) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-primary" />
                                        <span>{report.name} ({report.date})</span>
                                    </div>
                                    <Button variant="link">View</Button>
                                </div>
                           ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            
             {/* Settings Access */}
            <div>
                 <h2 className="text-xl font-bold mb-4 px-1">Settings & Privacy</h2>
                 <Card>
                    <CardContent className="p-2">
                        <div className="flex flex-col">
                            <SettingsLink title="Account Settings" />
                            <SettingsLink title="Notification Preferences" />
                            <SettingsLink title="Data Sharing Permissions" />
                            <SettingsLink title="Privacy Policy" />
                        </div>
                    </CardContent>
                 </Card>
            </div>
        </div>
    );
}

const SettingsLink = ({ title }: { title: string }) => (
    <button className="flex items-center justify-between w-full p-3 hover:bg-secondary/50 rounded-md">
        <span>{title}</span>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </button>
)
