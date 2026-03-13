'use server';

import {
  explainBillItems,
  TransparentBillingExplainerInput,
  TransparentBillingExplainerOutput,
} from '@/ai/flows/transparent-billing-explainer-flow';
import BillingClient from './billing-client';

export default async function BillingPage() {
  async function analyzeBillImageAction(
    data: TransparentBillingExplainerInput
  ): Promise<TransparentBillingExplainerOutput> {
    'use server';
    // AI image processing can be slow, so no artificial delay is needed.
    return await explainBillItems(data);
  }

  return <BillingClient analyzeBillImageAction={analyzeBillImageAction} />;
}
