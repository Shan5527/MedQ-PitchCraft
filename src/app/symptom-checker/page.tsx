'use server';

import {
  aiSymptomTriage,
  AISymptomTriageInput,
  AISymptomTriageOutput,
} from '@/ai/flows/ai-symptom-triage-flow';
import SymptomCheckerClient from './symptom-checker-client';

async function analyzeSymptoms(
  data: AISymptomTriageInput
): Promise<AISymptomTriageOutput> {
  'use server';
  // Add a delay to simulate network latency for a better UX
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return await aiSymptomTriage(data);
}

export default async function SymptomCheckerPage() {
  return <SymptomCheckerClient analyzeSymptomsAction={analyzeSymptoms} />;
}
