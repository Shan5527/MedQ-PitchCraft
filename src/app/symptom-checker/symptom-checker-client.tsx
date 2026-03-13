'use client';

import { useState } from 'react';
import {
  AlertCircle,
  Clock,
  HeartPulse,
  Loader2,
  Send,
  Building,
  Thermometer,
  Brain,
  Bone,
  Shield,
  Wind,
  Layers,
  Heart,
  Smile,
  Bandage,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import type {
  AISymptomTriageInput,
  AISymptomTriageOutput,
  SymptomCategory,
} from '@/ai/flows/ai-symptom-triage-flow';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

type Step =
  | 'start'
  | 'emergencyCheck'
  | 'categorySelect'
  | 'followUp'
  | 'loading'
  | 'result'
  | 'emergency';

const symptomCategories: { name: SymptomCategory; label: string; icon: React.ElementType }[] = [
    { name: 'General', label: 'General', icon: Thermometer },
    { name: 'Respiratory', label: 'Respiratory', icon: Wind },
    { name: 'Cardiac', label: 'Cardiac', icon: HeartPulse },
    { name: 'Digestive', label: 'Digestive', icon: Shield },
    { name: 'Neurological', label: 'Neurological', icon: Brain },
    { name: 'Skin', label: 'Skin', icon: Layers },
    { name: 'Orthopedic', label: 'Orthopedic', icon: Bone },
    { name: 'WomensHealth', label: "Women's Health", icon: Heart },
    { name: 'MentalHealth', label: 'Mental Health', icon: Smile },
    { name: 'Injury', label: 'Injury', icon: Bandage },
];

const emergencySymptoms = [
    'Severe chest pain',
    'Difficulty breathing',
    'Uncontrolled bleeding',
    'Loss of consciousness',
    'Stroke symptoms (face drooping, slurred speech)',
    'Severe injury',
];

export default function SymptomCheckerClient({
  analyzeSymptomsAction,
}: {
  analyzeSymptomsAction: (
    data: AISymptomTriageInput
  ) => Promise<AISymptomTriageOutput>;
}) {
  const [step, setStep] = useState<Step>('start');
  const [selectedCategory, setSelectedCategory] = useState<SymptomCategory | null>(null);
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, any>>({});
  const [result, setResult] = useState<AISymptomTriageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => setStep('emergencyCheck');

  const handleEmergencyCheck = (isEmergency: boolean) => {
    if (isEmergency) {
        setStep('emergency');
    } else {
        setStep('categorySelect');
    }
  };

  const handleCategorySelect = (category: SymptomCategory) => {
    setSelectedCategory(category);
    setFollowUpAnswers({});
    setStep('followUp');
  };

  const handleFollowUpSubmit = async (answers: Record<string, any>) => {
    if (!selectedCategory) return;
    setError(null);
    setIsLoading(true);
    setResult(null);
    setStep('loading');

    try {
      const response = await analyzeSymptomsAction({
        symptomCategory: selectedCategory,
        followUpAnswers: answers,
      });
      setResult(response);
      setStep('result');
    } catch (err: any) {
      setError(err.message || 'Failed to analyze symptoms. Please try again.');
      setStep(selectedCategory ? 'followUp' : 'categorySelect'); // Go back to previous step
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep('start');
    setSelectedCategory(null);
    setFollowUpAnswers({});
    setResult(null);
    setError(null);
    setIsLoading(false);
  };
  
  const renderContent = () => {
    switch(step) {
        case 'start':
            return <StartScreen onStart={handleStart} />;
        case 'emergencyCheck':
            return <EmergencyCheckScreen onComplete={handleEmergencyCheck} />;
        case 'emergency':
            return <EmergencyScreen />;
        case 'categorySelect':
            return <CategorySelectScreen onSelect={handleCategorySelect} />;
        case 'followUp':
            if (!selectedCategory) {
                handleReset();
                return null;
            }
            return <FollowUpScreen category={selectedCategory} onSubmit={handleFollowUpSubmit} error={error} />;
        case 'loading':
            return <LoadingScreen />;
        case 'result':
            return <ResultScreen result={result} onReset={handleReset} />;
        default:
            return <StartScreen onStart={handleStart} />;
    }
  }

  return <div className="space-y-6">{renderContent()}</div>;
}

const ScreenHeader = ({ title, description }: { title: string; description?: string }) => (
    <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
    </header>
);

const StartScreen = ({ onStart }: { onStart: () => void }) => (
    <div className="text-center pt-8">
        <ScreenHeader title="AI Symptom Check" description="Answer a few questions so we can guide you to the right care." />
        <Button size="lg" className="mt-8" onClick={onStart}>Start Health Assessment</Button>
    </div>
);

const EmergencyCheckScreen = ({ onComplete }: { onComplete: (isEmergency: boolean) => void }) => (
    <div className="space-y-6">
        <ScreenHeader title="Check for Emergency Symptoms" description="Are you experiencing any of the following?" />
        <Card>
            <CardContent className="pt-6 space-y-4">
                {emergencySymptoms.map(symptom => (
                    <div key={symptom} className="flex items-center space-x-3 p-3 bg-red-50/50 border border-destructive/20 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <span className="font-medium text-destructive-foreground/90">{symptom}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-4">
            <Button variant="destructive" size="lg" onClick={() => onComplete(true)}>Yes, I have these</Button>
            <Button variant="outline" size="lg" onClick={() => onComplete(false)}>No</Button>
        </div>
    </div>
);

const EmergencyScreen = () => (
    <Alert variant="destructive" className="text-center">
        <AlertTriangle className="h-6 w-6" />
        <AlertTitle className="text-xl font-bold">Emergency Detected</AlertTitle>
        <AlertDescription className="text-base">
            Please proceed immediately to the Emergency Department or call for an ambulance.
        </AlertDescription>
        <div className="mt-6 flex flex-col gap-3">
             <Button variant="default" size="lg" className="bg-white text-destructive hover:bg-gray-100 border-2 border-destructive">
                Call Hospital
            </Button>
            <Button variant="outline" size="lg">Navigate to Emergency Room</Button>
        </div>
    </Alert>
);

const CategorySelectScreen = ({ onSelect }: { onSelect: (category: SymptomCategory) => void }) => (
    <div className="space-y-6">
        <ScreenHeader title="What symptoms are you experiencing?" />
        <div className="grid grid-cols-2 gap-4">
            {symptomCategories.map(({ name, label, icon: Icon }) => (
                <button
                    key={name}
                    onClick={() => onSelect(name)}
                    className="flex h-24 w-full flex-col items-center justify-center space-y-2 rounded-lg border-2 bg-card text-center shadow-sm transition-colors hover:border-primary hover:bg-primary/5"
                >
                    <Icon className="h-8 w-8 text-primary" />
                    <span className="text-sm font-semibold">{label}</span>
                </button>
            ))}
        </div>
    </div>
);


const FollowUpScreen = ({ category, onSubmit, error }: { category: SymptomCategory, onSubmit: (answers: any) => void, error: string | null }) => {
    const [answers, setAnswers] = useState<Record<string, any>>({});
    
    const setAnswer = (key: string, value: any) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const handleMultiSelect = (key: string, value: string) => {
        const current = answers[key] || [];
        const newValues = current.includes(value) ? current.filter((v: string) => v !== value) : [...current, value];
        setAnswer(key, newValues);
    }
    
    // In a real app, these would be more comprehensive and driven by a config
    const renderQuestions = () => {
        switch (category) {
            case 'General':
                return (
                    <div className="space-y-6">
                        <div>
                            <Label className="font-semibold">Temperature above 38°C (100.4°F)?</Label>
                            <RadioGroup value={answers.hasHighTemp} onValueChange={(v) => setAnswer('hasHighTemp', v === 'true')} className="flex gap-4 mt-2">
                                <div className="flex items-center space-x-2"><RadioGroupItem value="true" id="temp-yes" /><Label htmlFor="temp-yes">Yes</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="false" id="temp-no" /><Label htmlFor="temp-no">No</Label></div>
                            </RadioGroup>
                        </div>
                        <div>
                            <Label className="font-semibold">How long have you had the fever?</Label>
                             <RadioGroup value={answers.duration} onValueChange={(v) => setAnswer('duration', v)} className="flex gap-4 mt-2">
                                <div className="flex items-center space-x-2"><RadioGroupItem value="Today" id="dur-1" /><Label htmlFor="dur-1">Today</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="1-3 days" id="dur-2" /><Label htmlFor="dur-2">1–3 days</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="More than 3 days" id="dur-3" /><Label htmlFor="dur-3">More than 3 days</Label></div>
                            </RadioGroup>
                        </div>
                        <div>
                             <Label className="font-semibold">Other symptoms:</Label>
                             <div className="mt-2 space-y-2">
                                {['Cough', 'Headache', 'Body pain', 'Vomiting', 'Loss of appetite'].map(symptom => (
                                    <div key={symptom} className="flex items-center space-x-2">
                                        <Checkbox id={`os-${symptom}`} checked={(answers.otherSymptoms || []).includes(symptom)} onCheckedChange={() => handleMultiSelect('otherSymptoms', symptom)} />
                                        <Label htmlFor={`os-${symptom}`} className="font-normal">{symptom}</Label>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                );
            case 'Cardiac':
                 return (
                    <div className="space-y-6">
                        <div>
                            <Label className="font-semibold">Pain type:</Label>
                             <RadioGroup value={answers.painType} onValueChange={(v) => setAnswer('painType', v)} className="flex gap-4 mt-2">
                                {['Sharp', 'Pressure', 'Burning'].map(type => (
                                     <div key={type} className="flex items-center space-x-2"><RadioGroupItem value={type} id={`pt-${type}`} /><Label htmlFor={`pt-${type}`}>{type}</Label></div>
                                ))}
                            </RadioGroup>
                        </div>
                        <div>
                            <Label className="font-semibold">Pain location:</Label>
                             <RadioGroup value={answers.painLocation} onValueChange={(v) => setAnswer('painLocation', v)} className="flex gap-4 mt-2">
                                {['Center', 'Left side', 'Right side'].map(loc => (
                                     <div key={loc} className="flex items-center space-x-2"><RadioGroupItem value={loc} id={`pl-${loc}`} /><Label htmlFor={`pl-${loc}`}>{loc}</Label></div>
                                ))}
                            </RadioGroup>
                        </div>
                         <div>
                             <Label className="font-semibold">Other symptoms:</Label>
                             <div className="mt-2 space-y-2">
                                {['Shortness of breath', 'Sweating', 'Nausea'].map(symptom => (
                                    <div key={symptom} className="flex items-center space-x-2">
                                        <Checkbox id={`os-${symptom}`} checked={(answers.otherSymptoms || []).includes(symptom)} onCheckedChange={() => handleMultiSelect('otherSymptoms', symptom)} />
                                        <Label htmlFor={`os-${symptom}`} className="font-normal">{symptom}</Label>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                );
            default:
                return <p className="text-center text-muted-foreground">Follow-up questions for this category are not yet configured. Please proceed to join a queue for a general consultation.</p>;
        }
    };

    return (
        <div className="space-y-6">
            <ScreenHeader title={`Follow-Up Questions: ${symptomCategories.find(c => c.name === category)?.label}`} />
            <Card>
                <CardContent className="pt-6">
                    {renderQuestions()}
                </CardContent>
            </Card>
             {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
            <Button size="lg" className="w-full" onClick={() => onSubmit(answers)}>
                Analyze Symptoms <Send className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
}

const LoadingScreen = () => (
    <div className="flex flex-col items-center justify-center space-y-4 pt-16 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-xl font-semibold">Analyzing your symptoms...</h2>
        <p className="text-muted-foreground">Our AI is determining the best course of action.</p>
    </div>
);

const ResultScreen = ({ result, onReset }: { result: AISymptomTriageOutput | null, onReset: () => void }) => {
    if (!result) return null;

    const getUrgencyBadgeVariant = () => {
        switch (result.urgencyLevel) {
            case 'Critical': return 'destructive';
            case 'High': return 'warning';
            case 'Moderate': return 'default';
            case 'Low': return 'success';
            default: return 'secondary';
        }
    }

    return (
        <div className="space-y-6">
            <ScreenHeader title="AI Risk Analysis Result" />

            {result.highPriorityAlert && (
                 <Alert variant="warning" className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6" />
                    <div>
                        <AlertTitle className="font-bold">High Priority Case</AlertTitle>
                        <AlertDescription>You will be placed in a fast-track queue.</AlertDescription>
                    </div>
                </Alert>
            )}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Recommendation</span>
                        <Badge variant={getUrgencyBadgeVariant()} className="text-sm">{result.urgencyLevel} Urgency</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center gap-3 text-lg">
                        <Building className="h-6 w-6 text-primary" />
                        <div>
                            <p className="text-sm text-muted-foreground">Recommended Department</p>
                            <p className="font-semibold">{result.recommendedDepartment}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3 text-lg">
                        <Clock className="h-6 w-6 text-primary" />
                        <div>
                            <p className="text-sm text-muted-foreground">Estimated Wait Time</p>
                            <p className="font-semibold">{result.estimatedWaitTimeMinutes} minutes</p>
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <p className="text-sm font-medium">Explanation</p>
                        <p className="text-muted-foreground text-sm">{result.explanation}</p>
                    </div>
                </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
                <Button asChild size="lg">
                    <Link href="/queue/token">Join Queue</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/beds">Find Nearby Hospital</Link>
                </Button>
            </div>
             <Button onClick={onReset} variant="ghost" className="w-full">Start Over</Button>
        </div>
    );
};
