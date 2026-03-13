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
  ShieldAlert,
} from 'lucide-react';
import type {
  AISymptomTriageInput,
  AISymptomTriageOutput,
} from '@/ai/flows/ai-symptom-triage-flow';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

type Symptom =
  | 'Fever'
  | 'Chest Pain'
  | 'Headache'
  | 'Stomach Pain'
  | 'Injury';
const allSymptoms: { name: Symptom; icon: React.ElementType }[] = [
  { name: 'Fever', icon: Thermometer },
  { name: 'Chest Pain', icon: HeartPulse },
  { name: 'Headache', icon: Brain },
  { name: 'Stomach Pain', icon: ShieldAlert },
  { name: 'Injury', icon: Bone },
];

type Severity = 'Mild' | 'Moderate' | 'Severe';
const severities: Severity[] = ['Mild', 'Moderate', 'Severe'];

type Duration = 'Today' | '1–3 days' | 'More than 3 days';
const durations: Duration[] = ['Today', '1–3 days', 'More than 3 days'];

export default function SymptomCheckerClient({
  analyzeSymptomsAction,
}: {
  analyzeSymptomsAction: (
    data: AISymptomTriageInput
  ) => Promise<AISymptomTriageOutput>;
}) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [symptomDescription, setSymptomDescription] = useState('');
  const [duration, setDuration] = useState<Duration>('Today');
  const [severity, setSeverity] = useState<Severity>('Moderate');
  const [result, setResult] = useState<AISymptomTriageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSymptomToggle = (symptom: Symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0 && !symptomDescription) {
      setError('Please select at least one symptom or describe how you are feeling.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const response = await analyzeSymptomsAction({
        symptoms: selectedSymptoms,
        symptomsDescription,
        duration,
        severity,
      });
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze symptoms. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setSymptomDescription('');
    setDuration('Today');
    setSeverity('Moderate');
    setResult(null);
    setError(null);
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 pt-16 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-xl font-semibold">Analyzing your symptoms...</h2>
        <p className="text-muted-foreground">Our AI is determining the best course of action.</p>
      </div>
    )
  }

  if (result) {
    if (result.emergencyAlert) {
      return (
         <Alert variant="destructive" className="border-2 text-center">
            <AlertCircle className="h-6 w-6" />
            <AlertTitle className="text-xl font-bold">Emergency Detected!</AlertTitle>
            <AlertDescription className="text-base">
              {result.emergencyMessage || 'Please proceed immediately to the Emergency Ward.'}
            </AlertDescription>
            <Button onClick={handleReset} variant="outline" className="mt-6">Check Different Symptoms</Button>
          </Alert>
      )
    }
    return (
      <Card className="w-full animate-in fade-in-0 zoom-in-95">
        <CardHeader>
          <CardTitle className="text-center text-2xl">AI Triage Result</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <Building className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Recommended Department</p>
                <p className="text-lg font-bold">{result.recommendedDepartment}</p>
              </div>
            </div>
          </div>
           <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Urgency Level</p>
                <p className="text-lg font-bold">{result.urgencyLevel}</p>
              </div>
            </div>
          </div>
           <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Estimated Wait Time</p>
                <p className="text-lg font-bold">{result.estimatedWaitTimeMinutes} minutes</p>
                {result.confidencePercentage && (
                  <Badge variant="secondary">Confidence: {result.confidencePercentage}%</Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-4">
             <Button asChild size="lg" className="w-full">
               <Link href="/queue/token">Join Queue</Link>
             </Button>
             <Button onClick={handleReset} variant="outline" className="w-full">Start Over</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
       <header className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
          AI Symptom Check
        </h1>
        <p className="text-muted-foreground">
          Let us know how you're feeling.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <Label className="text-lg font-semibold">What are your main symptoms?</Label>
           <p className="text-sm text-muted-foreground">Select any that apply. This helps our AI get started.</p>
          <div className="grid grid-cols-3 gap-3">
            {allSymptoms.map(({ name, icon: Icon }) => (
              <Button
                key={name}
                type="button"
                variant={selectedSymptoms.includes(name) ? 'default' : 'outline'}
                className="h-20 flex-col gap-2"
                onClick={() => handleSymptomToggle(name)}
              >
                <Icon className="h-6 w-6" />
                <span>{name}</span>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Can you describe your symptoms in more detail?</Label>
          <Textarea
            placeholder="e.g., 'I have a sharp pain in my upper abdomen that gets worse after eating...'"
            value={symptomDescription}
            onChange={(e) => setSymptomDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-semibold">Duration of symptoms?</Label>
          <RadioGroup value={duration} onValueChange={(v: Duration) => setDuration(v)} className="flex gap-4">
            {durations.map((d) => (
              <div key={d} className="flex items-center space-x-2">
                 <RadioGroupItem value={d} id={d} />
                 <Label htmlFor={d} className="cursor-pointer">{d}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-semibold">How severe is it?</Label>
          <RadioGroup value={severity} onValueChange={(v: Severity) => setSeverity(v)} className="grid grid-cols-3 gap-2">
            {severities.map((s) => (
              <div key={s}>
                <RadioGroupItem value={s} id={s} className="sr-only" />
                <Label htmlFor={s} className={cn(
                    `flex cursor-pointer items-center justify-center rounded-md border-2 p-3 text-sm font-medium hover:bg-accent/20`,
                    severity === s ? 'border-primary bg-primary/10' : 'border-muted'
                )}>
                  {s}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
             <>
              Analyze Symptoms <Send className="ml-2 h-4 w-4" />
             </>
          )}
        </Button>
      </form>
    </div>
  );
}
