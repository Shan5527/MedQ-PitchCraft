'use client';

import { useState } from 'react';
import {
  AlertCircle,
  Clock,
  Loader2,
  Building,
  AlertTriangle,
  ArrowLeft,
  Send,
} from 'lucide-react';
import type {
  AISymptomTriageInput,
  AISymptomTriageOutput,
} from '@/ai/flows/ai-symptom-triage-flow';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

type Step =
  | 'start'
  | 'emergencyCheck'
  | 'triageForm'
  | 'loading'
  | 'result'
  | 'emergency';

const TOTAL_FORM_STEPS = 5;

// Main component
export default function SymptomCheckerClient({
  analyzeSymptomsAction,
}: {
  analyzeSymptomsAction: (
    data: AISymptomTriageInput
  ) => Promise<AISymptomTriageOutput>;
}) {
  const [step, setStep] = useState<Step>('start');
  const [formStep, setFormStep] = useState(1);
  const [answers, setAnswers] = useState<Partial<AISymptomTriageInput>>({});
  const [result, setResult] = useState<AISymptomTriageOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => setStep('emergencyCheck');

  const handleEmergencyCheck = (isEmergency: boolean) => {
    if (isEmergency) {
      setStep('emergency');
    } else {
      setStep('triageForm');
      setFormStep(1);
    }
  };

  const handleTriageSubmit = async () => {
    setError(null);
    setResult(null);
    setStep('loading');

    try {
      const response = await analyzeSymptomsAction(answers);
      setResult(response);
      setStep('result');
    } catch (err: any) {
      setError(err.message || 'Failed to analyze symptoms. Please try again.');
      setStep('triageForm'); // Go back to form on error
    }
  };

  const updateAnswer = (key: keyof AISymptomTriageInput, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const nextFormStep = () =>
    setFormStep((prev) => Math.min(prev + 1, TOTAL_FORM_STEPS));
  const prevFormStep = () => setFormStep((prev) => Math.max(prev - 1, 1));

  const handleReset = () => {
    setStep('start');
    setAnswers({});
    setResult(null);
    setError(null);
    setFormStep(1);
  };

  const renderContent = () => {
    switch (step) {
      case 'start':
        return <StartScreen onStart={handleStart} />;
      case 'emergencyCheck':
        return <EmergencyCheckScreen onComplete={handleEmergencyCheck} />;
      case 'emergency':
        return <EmergencyScreen />;
      case 'triageForm':
        return (
          <TriageForm
            formStep={formStep}
            answers={answers}
            updateAnswer={updateAnswer}
            nextStep={nextFormStep}
            prevStep={prevFormStep}
            onSubmit={handleTriageSubmit}
            error={error}
          />
        );
      case 'loading':
        return <LoadingScreen />;
      case 'result':
        return <ResultScreen result={result} onReset={handleReset} />;
      default:
        return <StartScreen onStart={handleStart} />;
    }
  };

  return <div className="space-y-6">{renderContent()}</div>;
}

// Common UI Components
const ScreenHeader = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <header className="text-center">
    <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
      {title}
    </h1>
    {description && (
      <p className="text-muted-foreground mt-1">{description}</p>
    )}
  </header>
);

// Initial & Emergency Screens
const emergencySymptoms = [
  'Severe chest pain',
  'Difficulty breathing',
  'Uncontrolled bleeding',
  'Loss of consciousness',
  'Stroke symptoms (face drooping, slurred speech)',
  'Severe injury',
];

const StartScreen = ({ onStart }: { onStart: () => void }) => (
  <div className="text-center pt-8">
    <ScreenHeader
      title="AI Symptom Check"
      description="Answer a few questions to find the right care, fast."
    />
    <Button size="lg" className="mt-8" onClick={onStart}>
      Start Health Assessment
    </Button>
  </div>
);

const EmergencyCheckScreen = ({
  onComplete,
}: {
  onComplete: (isEmergency: boolean) => void;
}) => (
  <div className="space-y-6">
    <ScreenHeader
      title="Emergency Check"
      description="First, let's rule out a life-threatening emergency."
    />
    <Card>
      <CardHeader>
        <CardTitle>Are you experiencing any of these?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {emergencySymptoms.map((symptom) => (
          <div
            key={symptom}
            className="flex items-center space-x-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
          >
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span className="font-medium text-red-600">{symptom}</span>
          </div>
        ))}
      </CardContent>
    </Card>
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="destructive"
        size="lg"
        onClick={() => onComplete(true)}
      >
        Yes, I have one of these
      </Button>
      <Button variant="outline" size="lg" onClick={() => onComplete(false)}>
        No, I don't
      </Button>
    </div>
  </div>
);

const EmergencyScreen = () => (
  <Alert variant="destructive" className="text-center p-6">
    <AlertTriangle className="h-8 w-8 mx-auto" />
    <AlertTitle className="text-2xl font-bold mt-4">
      Emergency Detected
    </AlertTitle>
    <AlertDescription className="text-base mt-2">
      Based on your symptoms, please call for an ambulance or go to the nearest
      Emergency Department immediately.
    </AlertDescription>
    <div className="mt-6 flex flex-col gap-3">
      <Button
        size="lg"
        className="bg-white text-destructive hover:bg-gray-100 border-2 border-destructive"
      >
        Call Ambulance
      </Button>
      <Button variant="outline" size="lg">
        Find Nearest ER
      </Button>
    </div>
  </Alert>
);

// Triage Form Wizard Component
const TriageForm = ({
  formStep,
  answers,
  updateAnswer,
  nextStep,
  prevStep,
  onSubmit,
  error,
}: any) => {
  const renderFormStep = () => {
    switch (formStep) {
      case 1:
        return <FormStep1 answers={answers} updateAnswer={updateAnswer} />;
      case 2:
        return <FormStep2 answers={answers} updateAnswer={updateAnswer} />;
      case 3:
        return <FormStep3 answers={answers} updateAnswer={updateAnswer} />;
      case 4:
        return <FormStep4 answers={answers} updateAnswer={updateAnswer} />;
      case 5:
        return <FormStep5 answers={answers} updateAnswer={updateAnswer} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <span>Triage Questions</span>
          <span>
            Step {formStep} of {TOTAL_FORM_STEPS}
          </span>
        </div>
        <Progress value={(formStep / TOTAL_FORM_STEPS) * 100} />
      </div>

      {renderFormStep()}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={prevStep} disabled={formStep === 1}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        {formStep < TOTAL_FORM_STEPS ? (
          <Button onClick={nextStep}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button size="lg" onClick={onSubmit}>
            Analyze Symptoms <Send className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

// Form Question Components
const FormQuestion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2 rounded-lg border p-4">
    <Label className="font-semibold text-base">{title}</Label>
    <div className="pt-2">{children}</div>
  </div>
);

const RadioQuestion = ({
  value,
  onValueChange,
  options,
}: {
  value: string;
  onValueChange: (v: string) => void;
  options: string[];
}) => (
  <RadioGroup
    value={value}
    onValueChange={onValueChange}
    className="flex flex-wrap gap-4"
  >
    {options.map((opt) => (
      <div key={opt} className="flex items-center space-x-2">
        <RadioGroupItem value={opt} id={opt.replace(/\s+/g, '')} />
        <Label htmlFor={opt.replace(/\s+/g, '')} className="font-normal">
          {opt}
        </Label>
      </div>
    ))}
  </RadioGroup>
);

const CheckboxQuestion = ({
  value = [],
  onValueChange,
  options,
}: {
  value: string[];
  onValueChange: (v: string) => void;
  options: string[];
}) => (
  <div className="space-y-2">
    {options.map((opt) => (
      <div key={opt} className="flex items-center space-x-2">
        <Checkbox
          id={opt.replace(/\s+/g, '')}
          checked={value.includes(opt)}
          onCheckedChange={() => onValueChange(opt)}
        />
        <Label htmlFor={opt.replace(/\s+/g, '')} className="font-normal">
          {opt}
        </Label>
      </div>
    ))}
  </div>
);

// Form Steps
const FormStep1 = ({ answers, updateAnswer }: any) => (
  <div className="space-y-4">
    <FormQuestion title="What is your main health concern today?">
      <Select
        value={answers.mainConcern}
        onValueChange={(v) => updateAnswer('mainConcern', v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a concern..." />
        </SelectTrigger>
        <SelectContent>
          {[
            'Fever',
            'Chest pain',
            'Headache',
            'Breathing problem',
            'Stomach pain',
            'Injury',
            'Skin problem',
            'Mental health concern',
            'Joint or muscle pain',
            'Other',
          ].map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormQuestion>

    <FormQuestion title="How severe are your symptoms?">
      <RadioQuestion
        value={answers.symptomSeverity}
        onValueChange={(v) => updateAnswer('symptomSeverity', v)}
        options={['Mild', 'Moderate', 'Severe', 'Worst pain imaginable']}
      />
    </FormQuestion>

    <FormQuestion title="How long have you had this symptom?">
      <RadioQuestion
        value={answers.symptomDuration}
        onValueChange={(v) => updateAnswer('symptomDuration', v)}
        options={[
          'Less than 24 hours',
          '1–3 days',
          '4–7 days',
          'More than a week',
          'More than a month',
        ]}
      />
    </FormQuestion>

    <FormQuestion title="Are your symptoms getting worse?">
      <RadioQuestion
        value={answers.symptomProgression}
        onValueChange={(v) => updateAnswer('symptomProgression', v)}
        options={[
          'Improving',
          'Staying the same',
          'Getting worse slowly',
          'Getting worse quickly',
        ]}
      />
    </FormQuestion>

    <FormQuestion title="If you have pain, rate it from 0 (no pain) to 10 (worst imaginable).">
      <div className="flex items-center gap-4">
        <Slider
          value={[answers.painScale ?? 0]}
          onValueChange={([v]) => updateAnswer('painScale', v)}
          max={10}
          step={1}
        />
        <span className="font-bold text-lg text-primary w-8 text-center">
          {answers.painScale ?? 0}
        </span>
      </div>
    </FormQuestion>
  </div>
);

const FormStep2 = ({ answers, updateAnswer }: any) => (
  <div className="space-y-4">
    <FormQuestion title="Are you having trouble breathing?">
      <RadioQuestion
        value={answers.breathingCheck}
        onValueChange={(v) => updateAnswer('breathingCheck', v)}
        options={['No', 'Mild difficulty', 'Moderate difficulty', 'Severe difficulty']}
      />
    </FormQuestion>
    <FormQuestion title="Have you fainted or lost consciousness?">
      <RadioQuestion
        value={answers.consciousnessCheck}
        onValueChange={(v) => updateAnswer('consciousnessCheck', v)}
        options={['No', 'Yes']}
      />
    </FormQuestion>
    <FormQuestion title="Are you experiencing uncontrolled bleeding?">
      <RadioQuestion
        value={answers.bleedingCheck}
        onValueChange={(v) => updateAnswer('bleedingCheck', v)}
        options={['No', 'Yes']}
      />
    </FormQuestion>
    <FormQuestion title="Do you currently have a fever?">
      <RadioQuestion
        value={answers.feverCheck}
        onValueChange={(v) => updateAnswer('feverCheck', v)}
        options={['No', 'Mild fever (below 38.5°C)', 'High fever (above 38.5°C)']}
      />
    </FormQuestion>
  </div>
);

const FormStep3 = ({ answers, updateAnswer }: any) => {
  const handleMultiSelect = (key: keyof AISymptomTriageInput, value: string) => {
    const current = (answers[key] as string[]) || [];
    const newValues = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    updateAnswer(key, newValues);
  };

  return (
    <div className="space-y-4">
      <FormQuestion title="Are you experiencing any of these infection symptoms?">
        <CheckboxQuestion
          value={answers.infectionSymptoms as string[]}
          onValueChange={(v) => handleMultiSelect('infectionSymptoms', v)}
          options={['Cough', 'Vomiting', 'Diarrhea', 'Rash', 'None']}
        />
      </FormQuestion>
      <FormQuestion title="Are you experiencing any of these neurological symptoms?">
        <CheckboxQuestion
          value={answers.neurologicalSymptoms as string[]}
          onValueChange={(v) => handleMultiSelect('neurologicalSymptoms', v)}
          options={['Confusion', 'Slurred speech', 'Numbness', 'Vision problems', 'None']}
        />
      </FormQuestion>
      <FormQuestion title="Are you experiencing any of these heart-related signals?">
        <CheckboxQuestion
          value={answers.heartRiskSignals as string[]}
          onValueChange={(v) => handleMultiSelect('heartRiskSignals', v)}
          options={['Chest pressure', 'Pain spreading to arm', 'Sweating', 'Nausea', 'None']}
        />
      </FormQuestion>
      <FormQuestion title="Are you experiencing any of these digestive signals?">
        <CheckboxQuestion
          value={answers.digestiveSignals as string[]}
          onValueChange={(v) => handleMultiSelect('digestiveSignals', v)}
          options={[
            'Persistent Vomiting',
            'Severe stomach pain',
            'Blood in stool',
            'Persistent diarrhea',
            'None',
          ]}
        />
      </FormQuestion>
    </div>
  );
};

const FormStep4 = ({ answers, updateAnswer }: any) => {
  const handleMultiSelect = (key: keyof AISymptomTriageInput, value: string) => {
    const current = (answers[key] as string[]) || [];
    const newValues = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    updateAnswer(key, newValues);
  };
  return (
    <div className="space-y-4">
      <FormQuestion title="Did this happen after an accident or injury?">
        <RadioQuestion
          value={answers.injuryContext}
          onValueChange={(v) => updateAnswer('injuryContext', v)}
          options={['Yes', 'No']}
        />
      </FormQuestion>
      <FormQuestion title="What is your age group?">
        <RadioQuestion
          value={answers.age}
          onValueChange={(v) => updateAnswer('age', v)}
          options={['Child (0-17)', 'Adult (18-64)', 'Elderly (65+)']}
        />
      </FormQuestion>
      <FormQuestion title="Do you have any of these pre-existing conditions?">
        <CheckboxQuestion
          value={answers.existingConditions as string[]}
          onValueChange={(v) => handleMultiSelect('existingConditions', v)}
          options={['Heart disease', 'Diabetes', 'Asthma', 'Hypertension', 'None']}
        />
      </FormQuestion>
      <FormQuestion title="For women: are you currently pregnant?">
        <RadioQuestion
          value={answers.pregnancyStatus}
          onValueChange={(v) => updateAnswer('pregnancyStatus', v)}
          options={['Yes', 'No', 'Not sure / Not applicable']}
        />
      </FormQuestion>
    </div>
  );
};

const FormStep5 = ({ answers, updateAnswer }: any) => (
  <div className="space-y-4">
    <FormQuestion title="Are you able to continue daily activities?">
      <RadioQuestion
        value={answers.functionalImpact}
        onValueChange={(v) => updateAnswer('functionalImpact', v)}
        options={['Yes, normally', 'With difficulty', 'Not able to function']}
      />
    </FormQuestion>
    <FormQuestion title="Are your symptoms preventing sleep?">
      <RadioQuestion
        value={answers.sleepImpact}
        onValueChange={(v) => updateAnswer('sleepImpact', v)}
        options={['Yes', 'No']}
      />
    </FormQuestion>
    <FormQuestion title="Is this the first time this symptom has occurred?">
      <RadioQuestion
        value={answers.symptomFrequency}
        onValueChange={(v) => updateAnswer('symptomFrequency', v)}
        options={['Yes', 'No, it has happened before', 'It happens often']}
      />
    </FormQuestion>
    <FormQuestion title="Do you feel your condition is serious or life-threatening?">
      <RadioQuestion
        value={answers.finalConcern}
        onValueChange={(v) => updateAnswer('finalConcern', v)}
        options={['Yes', 'No', 'Not sure']}
      />
    </FormQuestion>
  </div>
);

// Loading and Result Screens
const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center space-y-4 pt-16 text-center">
    <Loader2 className="h-12 w-12 animate-spin text-primary" />
    <h2 className="text-xl font-semibold">Analyzing your symptoms...</h2>
    <p className="text-muted-foreground">
      Our AI is determining the best course of action.
    </p>
  </div>
);

const ResultScreen = ({
  result,
  onReset,
}: {
  result: AISymptomTriageOutput | null;
  onReset: () => void;
}) => {
  if (!result) return null;

  const getUrgencyBadgeVariant = () => {
    switch (result.urgencyLevel) {
      case 'Critical':
        return 'destructive';
      case 'High':
        return 'warning';
      case 'Moderate':
        return 'default';
      case 'Low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <ScreenHeader title="AI Triage Analysis" />

      {result.highPriorityAlert && (
        <Alert variant="warning" className="flex items-start gap-3 p-4">
          <AlertTriangle className="h-6 w-6 mt-1" />
          <div>
            <AlertTitle className="font-bold text-lg">
              High Priority Case
            </AlertTitle>
            <AlertDescription>
              Your case is being fast-tracked. Please proceed to the hospital.
            </AlertDescription>
          </div>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recommendation</span>
            <Badge variant={getUrgencyBadgeVariant()} className="text-sm">
              {result.urgencyLevel} Urgency
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-lg">
            <Building className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">
                Recommended Department
              </p>
              <p className="font-semibold">{result.recommendedDepartment}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <Clock className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">
                Estimated Wait Time
              </p>
              <p className="font-semibold">
                {result.estimatedWaitTimeMinutes} minutes
              </p>
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm font-medium">AI Explanation</p>
            <p className="text-muted-foreground text-sm">
              {result.explanation}
            </p>
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
      <Button onClick={onReset} variant="ghost" className="w-full">
        Start Over
      </Button>
    </div>
  );
};

// Dummy ChevronRight for now
const ChevronRight = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
