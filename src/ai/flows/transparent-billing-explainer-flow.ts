'use server';
/**
 * @fileOverview A Genkit flow for explaining hospital bills.
 *
 * - explainBillItems - A function that handles the explanation of hospital bill items.
 * - TransparentBillingExplainerInput - The input type for the explainBillItems function.
 * - TransparentBillingExplainerOutput - The return type for the explainBillItems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const BillItemSchema = z.object({
  name: z.string().describe('The name of the medical service or item.'),
  amount: z.number().describe('The cost of the medical service or item in local currency.'),
});

const TransparentBillingExplainerInputSchema = z.object({
  billItems: z.array(BillItemSchema).describe('A list of items on the hospital bill.'),
});

export type TransparentBillingExplainerInput = z.infer<typeof TransparentBillingExplainerInputSchema>;

// Output Schema
const ExplainedBillItemSchema = z.object({
  name: z.string().describe('The name of the medical service or item.'),
  amount: z.number().describe('The cost of the medical service or item in local currency.'),
  explanation: z.string().describe('A clear, easy-to-understand explanation of the charge.'),
  averageMarketCostRange: z.string().optional().describe('The typical cost range for this service or item in the market. Format: "₹XXX–₹YYY"'),
  isHigherThanAverage: z.boolean().optional().describe('True if the bill amount is higher than the average market cost, false otherwise.'),
});

const TransparentBillingExplainerOutputSchema = z.object({
  explainedBillItems: z.array(ExplainedBillItemSchema).describe('A list of explained hospital bill items.'),
});

export type TransparentBillingExplainerOutput = z.infer<typeof TransparentBillingExplainerOutputSchema>;

// Wrapper function
export async function explainBillItems(
  input: TransparentBillingExplainerInput
): Promise<TransparentBillingExplainerOutput> {
  return transparentBillingExplainerFlow(input);
}

// Genkit Prompt
const prompt = ai.definePrompt({
  name: 'transparentBillingExplainerPrompt',
  input: {schema: TransparentBillingExplainerInputSchema},
  output: {schema: TransparentBillingExplainerOutputSchema},
  prompt: `You are an AI assistant specialized in explaining hospital bills to patients clearly and empathetically.
For each bill item provided, generate a concise explanation, provide an estimated average market cost range (if applicable and you have knowledge of it, otherwise omit), and indicate if the charged amount is higher than the average market cost.

Here are the bill items:
{{#each billItems}}
- Name: {{{name}}}
  Amount: {{{amount}}}
{{/each}}

Please return the explanation in a structured JSON format matching the output schema.`,
});

// Genkit Flow
const transparentBillingExplainerFlow = ai.defineFlow(
  {
    name: 'transparentBillingExplainerFlow',
    inputSchema: TransparentBillingExplainerInputSchema,
    outputSchema: TransparentBillingExplainerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to get output from prompt.');
    }
    return output;
  }
);
