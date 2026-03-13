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

const SymptomCategorySchema = z.enum([
  'General',
  'Respiratory',
  'Cardiac',
  'Digestive',
  'Neurological',
  'Skin',
  'Orthopedic',
  'WomensHealth',
  'MentalHealth',
  'Injury',
]);
export type SymptomCategory = z.infer<typeof SymptomCategorySchema>;

const AISymptomTriageInputSchema = z.object({
  symptomCategory: SymptomCategorySchema.describe(
    'The primary symptom category selected by the patient.'
  ),
  followUpAnswers: z
    .record(z.string(), z.union([z.string(), z.array(z.string()), z.boolean()]))
    .describe(
      'A key-value map of answers to dynamic follow-up questions related to the symptom category.'
    ),
});
export type AISymptomTriageInput = z.infer<typeof AISymptomTriageInputSchema>;

const AISymptomTriageOutputSchema = z.object({
  recommendedDepartment: z
    .string()
    .describe('The recommended hospital department.'),
  urgencyLevel: z
    .enum(['Low', 'Moderate', 'High', 'Critical'])
    .describe('The urgency level for seeking medical attention.'),
  estimatedWaitTimeMinutes: z
    .number()
    .describe('Estimated wait time in minutes.'),
  explanation: z
    .string()
    .describe('A brief, clear explanation for the recommendation.'),
  highPriorityAlert: z
    .boolean()
    .describe('True if the case is high priority and should be fast-tracked.'),
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
  prompt: `You are MediFlow, an advanced AI triage system for a hospital. Your primary function is to analyze patient-reported symptoms and provide a safe and accurate recommendation for care. You must act like a real hospital triage system, following a structured logic to determine the appropriate department and urgency.

**Triage Logic:**
1.  **Analyze Category and Answers:** The user provides a primary symptom category and answers to specific follow-up questions.
2.  **Risk Assessment:** Based on the combination of symptoms, determine the risk level. Pay close attention to high-risk combinations (e.g., 'Cardiac' category with 'Sharp' chest pain and 'Shortness of breath').
3.  **Department Recommendation:** Map the symptoms to the most appropriate hospital department (e.g., Cardiology, General Medicine, Neurology, Orthopedics, etc.).
4.  **Urgency Level:** Assign an urgency level: 'Low', 'Moderate', 'High', or 'Critical'.
5.  **High Priority Alert:** If the urgency is 'High' or 'Critical', set 'highPriorityAlert' to true.
6.  **Explanation:** Provide a clear, simple explanation for your recommendation.
7.  **Wait Time:** Estimate a realistic wait time in minutes based on the urgency and department.

**Patient's Reported Information:**
Symptom Category: {{{symptomCategory}}}
Follow-up Answers:
{{#each followUpAnswers}}
- {{ @key }}: {{{ this }}}
{{/each}}

Based on this, provide a structured JSON output. Ensure your response strictly adheres to the AISymptomTriageOutputSchema.
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
        'The AI model could not provide an analysis. Please try again with more details.'
      );
    }
    return output;
  }
);
