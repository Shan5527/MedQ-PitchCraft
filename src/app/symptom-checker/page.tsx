'use server';

import {
  aiSymptomTriage,
  AISymptomTriageInput,
  AISymptomTriageOutput,
} from '@/ai/flows/ai-symptom-triage-flow';
import SymptomCheckerClient from './symptom-checker-client';

export default async function SymptomCheckerPage() {
  async function analyzeSymptomsAction(
    data: AISymptomTriageInput
  ): Promise<AISymptomTriageOutput> {
    'use server';
    return await aiSymptomTriage(data);
  }

  return <SymptomCheckerClient analyzeSymptomsAction={analyzeSymptomsAction} />;
}
