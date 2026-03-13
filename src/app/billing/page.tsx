'use server';

import {
  explainBillItems,
  TransparentBillingExplainerInput,
  TransparentBillingExplainerOutput,
} from '@/ai/flows/transparent-billing-explainer-flow';
import BillingClient from './billing-client';

async function getBillExplanation(
  data: TransparentBillingExplainerInput
): Promise<TransparentBillingExplainerOutput> {
  'use server';
  // Add a delay to simulate network latency for a better UX
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return await explainBillItems(data);
}

export default async function BillingPage() {
  return <BillingClient getBillExplanationAction={getBillExplanation} />;
}
