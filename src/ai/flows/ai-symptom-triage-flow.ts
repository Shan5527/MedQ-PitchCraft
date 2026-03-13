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
  // 1. Primary Symptom
  mainConcern: z.string().optional().describe('The patient’s main health concern.'),

  // 2. Symptom Severity
  symptomSeverity: z.string().optional().describe('The severity of the symptoms (e.g., Mild, Moderate, Severe).'),
  
  // 3. Symptom Duration
  symptomDuration: z.string().optional().describe('How long the patient has had the symptom.'),
  
  // 4. Symptom Progression
  symptomProgression: z.string().optional().describe('Whether the symptoms are improving or getting worse.'),
  
  // 5. Pain Scale
  painScale: z.number().optional().describe('Pain rating from 0 to 10.'),
  
  // 6. Breathing Check
  breathingCheck: z.string().optional().describe('Whether the patient is having trouble breathing.'),
  
  // 7. Consciousness Check
  consciousnessCheck: z.string().optional().describe('Whether the patient has fainted or lost consciousness.'),
  
  // 8. Bleeding Check
  bleedingCheck: z.string().optional().describe('Whether the patient is experiencing uncontrolled bleeding.'),

  // 9. Fever Check
  feverCheck: z.string().optional().describe('Whether the patient has a fever.'),

  // 10. Infection Symptoms
  infectionSymptoms: z.array(z.string()).optional().describe('Associated symptoms like cough, vomiting, diarrhea, or rash.'),

  // 11. Neurological Symptoms
  neurologicalSymptoms: z.array(z.string()).optional().describe('Symptoms like confusion, slurred speech, numbness, or vision problems.'),

  // 12. Heart Risk Signals
  heartRiskSignals: z.array(z.string()).optional().describe('Symptoms like chest pressure, pain spreading to arm, sweating, or nausea.'),
  
  // 13. Digestive Signals
  digestiveSignals: z.array(z.string()).optional().describe('Symptoms like vomiting, severe stomach pain, blood in stool.'),
  
  // 14. Injury Context
  injuryContext: z.string().optional().describe('Whether the symptom occurred after an accident or injury.'),
  
  // 15. Mobility Check
  mobilityCheck: z.string().optional().describe('The patient’s ability to move normally.'),

  // 16. Mental Health Check
  mentalHealthCheck: z.array(z.string()).optional().describe('Mental health symptoms like severe anxiety, panic attacks, or thoughts of self-harm.'),

  // 17. Swelling Check
  swellingCheck: z.string().optional().describe('Whether there is severe swelling.'),
  
  // 18. Allergic Reaction Check
  allergicReactionCheck: z.array(z.string()).optional().describe('Signs of a severe allergic reaction.'),

  // 19. Pregnancy Status
  pregnancyStatus: z.string().optional().describe('Pregnancy status for female patients.'),

  // 20. Age
  age: z.string().optional().describe('The patient’s age group.'),

  // 21. Existing Conditions
  existingConditions: z.array(z.string()).optional().describe('Pre-existing medical conditions.'),

  // 22. Medication Use
  medicationUse: z.string().optional().describe('Whether the patient is currently taking medication.'),

  // 23. Recent Surgery
  recentSurgery: z.string().optional().describe('Whether the patient has had recent surgery.'),

  // 24. Infection Exposure
  infectionExposure: z.string().optional().describe('Recent exposure to a sick person.'),
  
  // 25. Travel History
  travelHistory: z.string().optional().describe('Recent travel history.'),
  
  // 26. Symptom Frequency
  symptomFrequency: z.string().optional().describe('How often the symptom occurs.'),

  // 27. Functional Impact
  functionalImpact: z.string().optional().describe('The symptom’s impact on daily activities.'),
  
  // 28. Sleep Impact
  sleepImpact: z.string().optional().describe('The symptom’s impact on sleep.'),

  // 29. Appetite Change
  appetiteChange: z.string().optional().describe('Recent changes in appetite.'),
  
  // 30. Final Concern
  finalConcern: z.string().optional().describe('Whether the patient feels their condition is serious.'),
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
  prompt: `You are MedQ, a world-class AI triage system for a modern hospital. Your purpose is to analyze a patient's responses to a universal 30-question medical questionnaire and determine the appropriate urgency, hospital department, and care recommendation. You must act like a real clinical triage engine.

**Core Triage Logic & Weighting:**

1.  **Emergency Red Flags (Highest Priority):**
    *   'Severe' or 'Worst pain imaginable' severity, especially if sudden.
    *   'Severe difficulty' breathing, 'Yes' to loss of consciousness, or 'Yes' to uncontrolled bleeding are **CRITICAL EMERGENCIES**. Route directly to the Emergency Room with 'Critical' urgency.
    *   Symptoms like confusion, slurred speech, severe chest pressure, or facial swelling are also high-risk indicators requiring 'High' or 'Critical' urgency.
    *   Thoughts of self-harm require an urgent 'High' priority referral to Mental Health/Psychiatry.

2.  **Urgency Score Calculation:**
    *   **High Urgency:** Combine factors like 'Severe' symptoms, 'Getting worse quickly', high pain scale (>7), new and concerning symptoms (e.g., neurological, cardiac), and significant functional impact.
    *   **Moderate Urgency:** Symptoms that are distressing but not immediately life-threatening. 'Moderate' severity, symptoms worsening slowly, or mild symptoms combined with risk factors (e.g., elderly, existing conditions).
    *   **Low Urgency:** 'Mild' symptoms, improving or stable condition, long duration (> 1 week), and minimal functional impact.

3.  **Department Routing:**
    *   **Cardiology:** For chest pain, palpitations, and heart risk signals.
    *   **Pulmonology/Respiratory:** For breathing problems, persistent cough.
    *   **Neurology:** For headaches, seizures, numbness, confusion, slurred speech.
    *   **Gastroenterology/Digestive:** For stomach pain, vomiting, blood in stool.
    *   **Orthopedics:** For injuries, joint/muscle pain, limited mobility.
    *   **Emergency Department:** For all critical red flags.
    *   **General Medicine:** For non-specific issues like fever, fatigue, or when other categories don't fit.
    *   **Dermatology:** For skin problems.
    *   **Psychiatry/Mental Health:** For anxiety, depression, self-harm thoughts.

**Patient's Completed Triage Form:**

---
**Symptoms, Severity & Duration**
{{#if mainConcern}}- Main Concern: {{{mainConcern}}}{{/if}}
{{#if symptomSeverity}}- Severity: {{{symptomSeverity}}}{{/if}}
{{#if symptomDuration}}- Duration: {{{symptomDuration}}}{{/if}}
{{#if symptomProgression}}- Progression: {{{symptomProgression}}}{{/if}}
{{#if painScale}}- Pain (0-10): {{{painScale}}}{{/if}}

**Red Flags & Specifics**
{{#if breathingCheck}}- Trouble Breathing: {{{breathingCheck}}}{{/if}}
{{#if consciousnessCheck}}- Lost Consciousness: {{{consciousnessCheck}}}{{/if}}
{{#if bleedingCheck}}- Uncontrolled Bleeding: {{{bleedingCheck}}}{{/if}}
{{#if feverCheck}}- Has Fever: {{{feverCheck}}}{{/if}}
{{#if injuryContext}}- Injury related: {{{injuryContext}}}{{/if}}
{{#if mobilityCheck}}- Mobility: {{{mobilityCheck}}}{{/if}}
{{#if swellingCheck}}- Severe Swelling: {{{swellingCheck}}}{{/if}}
{{#if infectionSymptoms}}- Infection Symptoms: {{#each infectionSymptoms}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}
{{#if neurologicalSymptoms}}- Neurological Symptoms: {{#each neurologicalSymptoms}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}
{{#if heartRiskSignals}}- Heart Risk Signals: {{#each heartRiskSignals}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}
{{#if digestiveSignals}}- Digestive Signals: {{#each digestiveSignals}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}
{{#if mentalHealthCheck}}- Mental Health Concerns: {{#each mentalHealthCheck}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}
{{#if allergicReactionCheck}}- Allergic Reaction Signs: {{#each allergicReactionCheck}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}

**Patient Context & Risk Factors**
{{#if age}}- Age Group: {{{age}}}{{/if}}
{{#if pregnancyStatus}}- Pregnancy Status: {{{pregnancyStatus}}}{{/if}}
{{#if existingConditions}}- Existing Conditions: {{#each existingConditions}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}
{{#if medicationUse}}- Taking Medication: {{{medicationUse}}}{{/if}}
{{#if recentSurgery}}- Recent Surgery: {{{recentSurgery}}}{{/if}}
{{#if infectionExposure}}- Exposed to Sickness: {{{infectionExposure}}}{{/if}}
{{#if travelHistory}}- Recent Travel: {{{travelHistory}}}{{/if}}

**Functional & Overall Impact**
{{#if symptomFrequency}}- Symptom Frequency: {{{symptomFrequency}}}{{/if}}
{{#if functionalImpact}}- Impact on Daily Activities: {{{functionalImpact}}}{{/if}}
{{#if sleepImpact}}- Impact on Sleep: {{{sleepImpact}}}{{/if}}
{{#if appetiteChange}}- Change in Appetite: {{{appetiteChange}}}{{/if}}
{{#if finalConcern}}- Patient's Own Assessment: {{{finalConcern}}}{{/if}}
---

Based on this comprehensive data, provide a structured JSON output. Set 'highPriorityAlert' to true if urgency is 'High' or 'Critical'. The explanation should be concise and justify your recommendation based on the provided symptoms.
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
