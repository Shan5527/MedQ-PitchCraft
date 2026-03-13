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
  Thermometer,
  Activity,
  Heart,
  Brain,
  Bone,
  Smile,
  Venus,
  ClipboardList,
  Layers,
  Bandage,
  ChevronRight,
  Sparkles,
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
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

type Step =
  | 'start'
  | 'emergencyCheck'
  | 'triageForm'
  | 'mentalHealthFlow'
  | 'loading'
  | 'result'
  | 'emergency';

const TOTAL_FORM_STEPS = 6;

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
      setError(
        'The AI model could not provide an analysis. Please try again with more details.'
      );
      setStep('triageForm');
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
            setStep={setStep}
          />
        );
      case 'mentalHealthFlow':
        return (
          <MentalHealthFlow
            answers={answers}
            updateAnswer={updateAnswer}
            onSubmit={handleTriageSubmit}
            onBack={() => {
              setStep('triageForm');
              setFormStep(1);
            }}
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
}) => {
  return (
    <header className="text-center space-y-2">
      <h1 className="text-2xl font-bold tracking-tight text-primary font-headline">
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground mt-1 max-w-md mx-auto">
          {description}
        </p>
      )}
    </header>
  );
};

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
  <div className="text-center pt-8 space-y-8">
    <ScreenHeader
      title="Let’s understand how you're feeling."
      description="I’ll ask a few quick questions to guide you to the right care."
    />
    <div>
      <Button size="lg" className="w-full max-w-xs" onClick={onStart}>
        Start Health Check
      </Button>
      <p className="text-sm text-muted-foreground mt-2">
        Takes about 2 minutes.
      </p>
    </div>
  </div>
);

const EmergencyCheckScreen = ({
  onComplete,
}: {
  onComplete: (isEmergency: boolean) => void;
}) => (
  <div className="space-y-6">
    <ScreenHeader
      title="Check for Emergency Symptoms"
      description="First, let's rule out a life-threatening emergency. Are you experiencing any of the following?"
    />
    <Card>
      <CardContent className="space-y-4 p-4">
        {emergencySymptoms.map((symptom) => (
          <div
            key={symptom}
            className="flex items-center space-x-3 p-3 bg-destructive/10 text-destructive rounded-lg"
          >
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">{symptom}</span>
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
      Your symptoms may need immediate medical attention. Please proceed
      immediately to the Emergency Department.
    </AlertDescription>
    <div className="mt-6 flex flex-col gap-3">
      <Button
        size="lg"
        className="bg-white text-destructive hover:bg-gray-100 border-2 border-destructive"
      >
        Navigate to Emergency Room
      </Button>
      <Button variant="outline" size="lg">
        Call Hospital
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
  setStep,
}: any) => {
  const renderFormStep = () => {
    switch (formStep) {
      case 1:
        return (
          <FormStep1
            updateAnswer={updateAnswer}
            nextStep={nextStep}
            setStep={setStep}
          />
        );
      case 2:
        return (
          <FormStep2 answers={answers} updateAnswer={updateAnswer} />
        );
      case 3:
        return (
          <FormStep3 answers={answers} updateAnswer={updateAnswer} />
        );
      case 4:
        return (
          <FormStep4 answers={answers} updateAnswer={updateAnswer} />
        );
      case 5:
        return (
          <FormStep5 answers={answers} updateAnswer={updateAnswer} />
        );
      case 6:
        return (
          <FormStep6 answers={answers} updateAnswer={updateAnswer} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderFormStep()}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {formStep > 0 && (
        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outline"
            onClick={formStep === 1 ? () => window.location.reload() : prevStep}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />{' '}
            {formStep === 1 ? 'Cancel' : 'Previous'}
          </Button>
          {formStep < TOTAL_FORM_STEPS ? (
            <Button onClick={nextStep} size="lg">
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button size="lg" onClick={onSubmit}>
              Analyze Symptoms <Send className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
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
  <Card className="shadow-sm">
    <CardContent className="p-5">
      <Label className="font-semibold text-base">{title}</Label>
      <div className="pt-4">{children}</div>
    </CardContent>
  </Card>
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
    className="grid grid-cols-2 gap-3"
  >
    {options.map((opt) => (
      <Label
        key={opt}
        htmlFor={opt.replace(/\s+/g, '')}
        className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all"
      >
        <RadioGroupItem value={opt} id={opt.replace(/\s+/g, '')} />
        <span className="font-normal">{opt}</span>
      </Label>
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
  <div className="grid grid-cols-2 gap-3">
    {options.map((opt) => (
      <Label
        key={opt}
        htmlFor={opt.replace(/\s+/g, '')}
        className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all"
      >
        <Checkbox
          id={opt.replace(/\s+/g, '')}
          checked={value.includes(opt)}
          onCheckedChange={() => onValueChange(opt)}
        />
        <span className="font-normal">{opt}</span>
      </Label>
    ))}
  </div>
);

const symptomCategories = [
  { name: 'General Symptoms', icon: Thermometer, concern: 'Fever' },
  { name: 'Respiratory', icon: Activity, concern: 'Breathing problem' },
  { name: 'Cardiac', icon: Heart, concern: 'Chest pain' },
  { name: 'Digestive', icon: ClipboardList, concern: 'Stomach pain' },
  { name: 'Neurological', icon: Brain, concern: 'Headache' },
  { name: 'Skin', icon: Layers, concern: 'Skin problem' },
  { name: 'Orthopedic', icon: Bone, concern: 'Joint or muscle pain' },
  { name: 'Women’s Health', icon: Venus, concern: 'Pregnancy concerns' },
  { name: 'Mental Health', icon: Smile, concern: 'Mental health concern' },
  { name: 'Injury', icon: Bandage, concern: 'Injury' },
];

const FormStep1 = ({ updateAnswer, nextStep, setStep }: any) => {
  const handleSelectCategory = (concern: string) => {
    updateAnswer('mainConcern', concern);
    if (concern === 'Mental health concern') {
      setStep('mentalHealthFlow');
    } else {
      nextStep();
    }
  };
  return (
    <FormQuestion title="What’s bothering you today?">
      <div className="grid grid-cols-2 gap-3 pt-2">
        {symptomCategories.map(({ name, icon: Icon, concern }) => (
          <button
            key={name}
            onClick={() => handleSelectCategory(concern)}
            className="flex flex-col items-center justify-center space-y-2 p-4 border rounded-lg hover:bg-primary/5 hover:border-primary transition-colors text-center h-28"
          >
            <Icon className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium">{name}</span>
          </button>
        ))}
      </div>
    </FormQuestion>
  );
};

const FormStep2 = ({ answers, updateAnswer }: any) => (
  <div className="space-y-6">
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
        ]}
      />
    </FormQuestion>
    <FormQuestion title="If you have pain, rate it from 0 (no pain) to 10 (worst imaginable).">
      <div className="flex items-center gap-4 pt-2">
        <span className="font-bold text-lg text-muted-foreground w-8 text-center">
          0
        </span>
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

const FormStep3 = ({ answers, updateAnswer }: any) => (
  <div className="space-y-6">
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
    <FormQuestion title="Are you having trouble breathing?">
      <RadioQuestion
        value={answers.breathingCheck}
        onValueChange={(v) => updateAnswer('breathingCheck', v)}
        options={[
          'No',
          'Mild difficulty',
          'Moderate difficulty',
          'Severe difficulty',
        ]}
      />
    </FormQuestion>
    <FormQuestion title="Have you fainted or lost consciousness?">
      <RadioQuestion
        value={answers.consciousnessCheck}
        onValueChange={(v) => updateAnswer('consciousnessCheck', v)}
        options={['No', 'Yes']}
      />
    </FormQuestion>
    <FormQuestion title="Do you currently have a fever?">
      <RadioQuestion
        value={answers.feverCheck}
        onValueChange={(v) => updateAnswer('feverCheck', v)}
        options={['No', 'Mild fever', 'High fever']}
      />
    </FormQuestion>
  </div>
);

const FormStep4 = ({ answers, updateAnswer }: any) => {
  const handleMultiSelect = (
    key: keyof AISymptomTriageInput,
    value: string
  ) => {
    const current = (answers[key] as string[]) || [];
    const newValues = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    updateAnswer(key, newValues);
  };

  return (
    <div className="space-y-6">
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
          options={[
            'Confusion',
            'Slurred speech',
            'Numbness',
            'Vision problems',
            'None',
          ]}
        />
      </FormQuestion>
      <FormQuestion title="Are you experiencing any of these heart-related signals?">
        <CheckboxQuestion
          value={answers.heartRiskSignals as string[]}
          onValueChange={(v) => handleMultiSelect('heartRiskSignals', v)}
          options={[
            'Chest pressure',
            'Pain spreading to arm',
            'Sweating',
            'Nausea',
            'None',
          ]}
        />
      </FormQuestion>
    </div>
  );
};

const FormStep5 = ({ answers, updateAnswer }: any) => {
  const handleMultiSelect = (
    key: keyof AISymptomTriageInput,
    value: string
  ) => {
    const current = (answers[key] as string[]) || [];
    const newValues = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    updateAnswer(key, newValues);
  };
  return (
    <div className="space-y-6">
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
          options={[
            'Heart disease',
            'Diabetes',
            'Asthma',
            'Hypertension',
            'None',
          ]}
        />
      </FormQuestion>
    </div>
  );
};

const FormStep6 = ({ answers, updateAnswer }: any) => (
  <div className="space-y-6">
    <FormQuestion title="Are you able to continue daily activities?">
      <RadioQuestion
        value={answers.functionalImpact}
        onValueChange={(v) => updateAnswer('functionalImpact', v)}
        options={['Yes, normally', 'With difficulty', 'Not able to function']}
      />
    </FormQuestion>
    <FormQuestion title="Can you move normally?">
      <RadioQuestion
        value={answers.mobilityCheck}
        onValueChange={(v) => updateAnswer('mobilityCheck', v)}
        options={['Yes', 'Limited movement', 'Cannot move']}
      />
    </FormQuestion>
    <FormQuestion title="Do you feel your condition is serious?">
      <RadioQuestion
        value={answers.finalConcern}
        onValueChange={(v) => updateAnswer('finalConcern', v)}
        options={['Yes', 'No', 'Not sure']}
      />
    </FormQuestion>
  </div>
);

// Mental Health Flow
const mentalHealthQuestions = [
    { key: 'feelingNervous', text: 'Have you recently been feeling nervous, anxious, or on edge?' },
    { key: 'lostInterest', text: 'Have you recently felt little interest or pleasure in doing things you usually enjoy?' },
    { key: 'troubleSleeping', text: 'Have you recently had trouble falling asleep or staying asleep because of stress or worry?' },
    { key: 'feelingOverwhelmed', text: 'Have you recently felt overwhelmed by daily responsibilities or pressure?' },
    { key: 'feelingDown', text: 'Have you recently felt down, sad, or hopeless?' },
    { key: 'troubleConcentrating', text: 'Have you recently had difficulty concentrating on work, studies, or everyday tasks?' },
    { key: 'notCopingWell', text: 'Have you recently felt that you are not coping well with challenges in your life?' },
    { key: 'feelingTired', text: 'Have you recently felt unusually tired or without energy?' },
    { key: 'lostConfidence', text: 'Have you recently lost confidence in yourself?' },
    { key: 'feelingLonely', text: 'Have you recently felt lonely or emotionally unsupported?' },
];

const mentalHealthAnswerOptions = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'];

const MentalHealthFlow = ({ answers, updateAnswer, onSubmit, onBack }: any) => {
  const [questionIndex, setQuestionIndex] = useState(-1); // -1 for intro screen

  const handleAnswer = (key: string, value: string) => {
    updateAnswer(key, value);
    if (questionIndex < mentalHealthQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      onSubmit();
    }
  };

  const handleBack = () => {
    if (questionIndex > -1) {
        setQuestionIndex(questionIndex - 1);
    } else {
        onBack();
    }
  }

  const currentQuestion = mentalHealthQuestions[questionIndex];
  const progress = ((questionIndex + 1) / mentalHealthQuestions.length) * 100;

  if (questionIndex === -1) {
    return (
      <div className="text-center space-y-6">
        <ScreenHeader title="Mental Wellness Check" />
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">We would like to ask a few questions to understand how you have been feeling emotionally. Your responses help us provide better support.</p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={onBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
            <Button size="lg" onClick={() => setQuestionIndex(0)}>Begin</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <Progress value={progress} className="w-full" />
        <FormQuestion title={currentQuestion.text}>
            <RadioGroup
                value={answers[currentQuestion.key as keyof typeof answers]}
                onValueChange={(v) => handleAnswer(currentQuestion.key, v)}
                className="grid grid-cols-1 gap-3"
            >
                {mentalHealthAnswerOptions.map((opt) => (
                    <Label key={opt} htmlFor={opt.replace(/\s+/g, '')} className="flex items-center space-x-2 rounded-lg border p-3 cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all">
                        <RadioGroupItem value={opt} id={opt.replace(/\s+/g, '')} />
                        <span className="font-normal">{opt}</span>
                    </Label>
                ))}
            </RadioGroup>
        </FormQuestion>
         <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
    </div>
  );
};


// Loading and Result Screens
const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center space-y-4 pt-16 text-center">
    <Loader2 className="h-12 w-12 animate-spin text-primary" />
    <h2 className="text-xl font-semibold">Analyzing your symptoms...</h2>
    <p className="text-muted-foreground max-w-xs">
      Our AI is determining the best course of action. This may take a moment.
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

  const isMentalHealthResult = result.mentalWellnessLevel && result.mentalHealthRecommendations;

  if (isMentalHealthResult) {
    return (
      <div className="space-y-6">
        <ScreenHeader title="Mental Wellness Analysis" />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>AI Assessment</span>
               <Badge variant={getUrgencyBadgeVariant()} className="text-sm">
                {result.urgencyLevel} Concern
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Wellness Level</p>
              <p className="font-semibold text-xl">{result.mentalWellnessLevel}</p>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm font-medium">Recommendations</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                {result.mentalHealthRecommendations?.map((rec, i) => <li key={i}>{rec}</li>)}
              </ul>
            </div>
          </CardContent>
        </Card>
        
        {(result.urgencyLevel === 'Moderate' || result.urgencyLevel === 'High' || result.urgencyLevel === 'Critical') && (
           <Button asChild size="lg" className="w-full">
              <Link href="/experts">Talk to a Mental Health Expert</Link>
            </Button>
        )}

        <Button onClick={onReset} variant="ghost" className="w-full">
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ScreenHeader title="AI Risk Analysis Result" />

      {result.highPriorityAlert && (
        <Alert variant="warning" className="flex items-start gap-3 p-4">
          <AlertTriangle className="h-6 w-6 mt-1" />
          <div>
            <AlertTitle className="font-bold text-lg">
              High Priority Case
            </AlertTitle>
            <AlertDescription>
              Your case is being fast-tracked. You will be placed in a
              fast-track queue.
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
              <p className="font-semibold text-xl">
                {result.recommendedDepartment}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <Clock className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">
                Estimated Wait Time
              </p>
              <p className="font-semibold text-xl">
                {result.estimatedWaitTimeMinutes} minutes
              </p>
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm font-medium">AI Explanation</p>
            <p className="text-muted-foreground text-sm">
              {result.explanation} A doctor can help evaluate this further.
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
