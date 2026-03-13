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
  symptomsDescription: z
    .string()
    .optional()
    .describe("A free-text description of the patient's symptoms."),
  duration: z
    .enum(['Today', '1–3 days', 'More than 3 days'])
    .describe('Duration of symptoms.'),
  severity: z
    .enum(['Mild', 'Moderate', 'Severe'])
    .describe('Severity of symptoms.')
    .default('Moderate'),
});
export type AISymptomTriageInput = z.infer<typeof AISymptomTriageInputSchema>;

const AISymptomTriageOutputSchema = z.object({
  recommendedDepartment: z
    .string()
    .describe('The recommended hospital department.'),
  urgencyLevel: z
    .string()
    .describe('The urgency level for seeking medical attention.')
    .default('Moderate'),
  estimatedWaitTimeMinutes: z
    .number()
    .describe('Estimated wait time in minutes.'),
  confidencePercentage: z
    .number()
    .describe('Confidence percentage for the estimated wait time.')
    .min(0)
    .max(100),
  emergencyAlert: z
    .boolean()
    .describe(
      'True if an emergency is detected, requiring immediate attention.'
    ),
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
  prompt: `You are a sophisticated AI healthcare triage system. Your goal is to conduct a detailed analysis of patient symptoms to recommend the most appropriate hospital department, an accurate urgency level, an estimated wait time, and issue an emergency alert for critical conditions.

Analyze the combination of structured symptom tags and the patient's free-text description. The free-text description provides crucial context that should be weighed heavily.

Patient's reported information:
Symptom Tags: {{{symptoms}}}
Symptom Description: {{{symptomsDescription}}}
Duration: {{{duration}}}
Severity: {{{severity}}}

Based on a comprehensive analysis of all the information provided, provide the following:
- Recommended Hospital Department: (e.g., General Medicine, Emergency, Cardiology, Neurology, Orthopedics, Gastroenterology). Your recommendation should be precise.
- Urgency Level: (e.g., Low, Moderate, High, Critical).
- Estimated Wait Time (in minutes): Provide a realistic estimate.
- Confidence Percentage: Your confidence in the estimation and recommendation.
- Emergency Alert: If symptoms suggest a life-threatening condition (e.g., signs of stroke, heart attack, severe breathing difficulty, major trauma), set 'emergencyAlert' to true and 'emergencyMessage' to "Emergency Detected — Your symptoms may indicate a critical condition. Please proceed immediately to the Emergency Ward or call for an ambulance." Otherwise, set 'emergencyAlert' to false.

Pay close attention to nuanced descriptions in the free-text field. For example, "crushing chest pain radiating to the left arm" is far more critical than a simple 'Chest Pain' tag.

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
    if (!output) {
      throw new Error(
        'The AI model could not provide an analysis. Please try describing your symptoms in more detail.'
      );
    }
    return output;
  }
);
