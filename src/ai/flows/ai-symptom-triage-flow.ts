'use server';
/**
 * @fileOverview An AI symptom triage system that analyzes reported symptoms to recommend appropriate hospital departments and urgency levels, including emergency alerts.
 *
 * - aiSymptomTriage - A function that handles the AI symptom triage process.
 * - AISymptomTriageInput - The input type for the aiSymptomTriage function.
 * - AISymptomTriageOutput - The return type for the aiSymptomTriage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AISymptomTriageInputSchema = z.object({
  symptoms: z
    .array(z.string())
    .describe('A list of symptoms reported by the patient.'),
  duration: z
    .enum(['Today', '1–3 days', 'More than 3 days'])
    .describe('Duration of symptoms.'),
  severity: z.enum(['Mild', 'Moderate', 'Severe']).describe('Severity of symptoms.').default('Moderate'),
});
export type AISymptomTriageInput = z.infer<typeof AISymptomTriageInputSchema>;

const AISymptomTriageOutputSchema = z.object({
  recommendedDepartment: z.string().describe('The recommended hospital department.'),
  urgencyLevel: z.string().describe('The urgency level for seeking medical attention.').default('Moderate'),
  estimatedWaitTimeMinutes: z.number().describe('Estimated wait time in minutes.'),
  confidencePercentage: z.number().describe('Confidence percentage for the estimated wait time.').min(0).max(100),
  emergencyAlert: z
    .boolean()
    .describe('True if an emergency is detected, requiring immediate attention.'),
  emergencyMessage: z
    .string()
    .optional()
    .describe('Message to display if an emergency is detected.'),
});
export type AISymptomTriageOutput = z.infer<typeof AISymptomTriageOutputSchema>;

export async function aiSymptomTriage(
  input: AISymptomTriageInput
): Promise<AISymptomTriageOutput> {
  return aiSymptomTriageFlow(input);
}

const aiSymptomTriagePrompt = ai.definePrompt({
  name: 'aiSymptomTriagePrompt',
  input: { schema: AISymptomTriageInputSchema },
  output: { schema: AISymptomTriageOutputSchema },
  prompt: `You are an AI healthcare triage system. Your goal is to analyze patient symptoms and provide a recommendation for the appropriate hospital department, urgency level, estimated wait time, and an emergency alert if necessary.

Here are the patient's reported symptoms:
Symptoms: {{{symptoms}}}
Duration: {{{duration}}}
Severity: {{{severity}}}

Based on this information, provide the following:
- A recommended hospital department (e.g., General Medicine, Emergency, Cardiology, Orthopedics).
- An urgency level (e.g., Low, Moderate, High, Critical).
- An estimated wait time in minutes.
- A confidence percentage for the estimated wait time.
- Determine if an emergency alert is necessary. If the symptoms include 'Chest Pain' or 'Severe Breathing Difficulty' (or similar critical symptoms),
  set 'emergencyAlert' to true and 'emergencyMessage' to "Emergency Detected — Please proceed immediately to Emergency Ward."
  Otherwise, set 'emergencyAlert' to false and omit 'emergencyMessage'.

Ensure your output adheres strictly to the AISymptomTriageOutputSchema.
`,
});

const aiSymptomTriageFlow = ai.defineFlow(
  {
    name: 'aiSymptomTriageFlow',
    inputSchema: AISymptomTriageInputSchema,
    outputSchema: AISymptomTriageOutputSchema,
  },
  async (input) => {
    const { output } = await aiSymptomTriagePrompt(input);
    return output!;
  }
);
