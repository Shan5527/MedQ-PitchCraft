'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Loader2,
  Plus,
  Trash2,
  Sparkles,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import type {
  TransparentBillingExplainerInput,
  TransparentBillingExplainerOutput,
} from '@/ai/flows/transparent-billing-explainer-flow';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type BillItem = { name: string; amount: number };

const sampleBillItems: BillItem[] = [
    { name: 'Injection Charge', amount: 1200 },
    { name: 'Monitoring', amount: 2000 },
    { name: 'Consumables', amount: 900 },
];

export default function BillingClient({
  getBillExplanationAction,
}: {
  getBillExplanationAction: (
    data: TransparentBillingExplainerInput
  ) => Promise<TransparentBillingExplainerOutput>;
}) {
  const [billItems, setBillItems] = useState<BillItem[]>(sampleBillItems);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TransparentBillingExplainerOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddItem = () => {
    if (newItemName && newItemAmount) {
      setBillItems([
        ...billItems,
        { name: newItemName, amount: Number(newItemAmount) },
      ]);
      setNewItemName('');
      setNewItemAmount('');
    }
  };
  
  const handleRemoveItem = (index: number) => {
    setBillItems(billItems.filter((_, i) => i !== index));
  }

  const handleSubmit = async () => {
    if (billItems.length === 0) {
        setError('Please add at least one bill item.');
        return;
    }
    setError(null);
    setIsLoading(true);
    setResult(null);
    try {
        const response = await getBillExplanationAction({ billItems });
        setResult(response);
    } catch (err: any) {
        setError( 'The AI model could not provide an explanation. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 pt-16 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-xl font-semibold">Explaining your bill...</h2>
        <p className="text-muted-foreground">Our AI is making your bill easier to understand.</p>
      </div>
    )
  }

  if (result) {
    return (
        <div className="space-y-6">
            <header className="text-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
                    Your Explained Bill
                </h1>
            </header>
            <Accordion type="single" collapsible className="w-full space-y-2">
                {result.explainedBillItems.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index} className="rounded-lg border bg-card px-4">
                        <AccordionTrigger className="py-4 hover:no-underline">
                            <div className="flex w-full items-center justify-between">
                                <span className="font-semibold text-left">{item.name}</span>
                                <span className="text-lg font-bold text-primary">₹{item.amount.toLocaleString()}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-3 pb-4">
                            <p className="text-muted-foreground">{item.explanation}</p>
                            {item.averageMarketCostRange && (
                                <div className="rounded-md border p-3 text-sm">
                                    <p className="font-semibold">Average Market Cost</p>
                                    <p className="text-muted-foreground">{item.averageMarketCostRange}</p>
                                    {item.isHigherThanAverage && (
                                        <Badge variant="warning" className="mt-2 gap-1">
                                            <TrendingUp className="h-3 w-3" />
                                            Higher than average
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <Button onClick={() => setResult(null)} variant="outline" className="w-full">Start Over</Button>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
          Understand Your Hospital Bill
        </h1>
        <p className="text-muted-foreground">
          Let AI explain your hospital charges.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Bill Items</CardTitle>
          <CardDescription>Add items from your bill to get an explanation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {billItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 rounded-md border p-2">
                    <div className="flex-1 font-medium">{item.name}</div>
                    <div className="font-semibold">₹{item.amount.toLocaleString()}</div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => handleRemoveItem(index)}>
                        <Trash2 className="h-4 w-4"/>
                    </Button>
                </div>
            ))}
             {billItems.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-4">No items added yet.</p>
            )}
          </div>
          
          <div className="flex items-end gap-2 border-t pt-4">
            <div className="flex-1 space-y-1">
              <Label htmlFor="item-name">Item Name</Label>
              <Input id="item-name" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="e.g. Consultation Fee" />
            </div>
            <div className="w-32 space-y-1">
              <Label htmlFor="item-amount">Amount (₹)</Label>
              <Input id="item-amount" type="number" value={newItemAmount} onChange={(e) => setNewItemAmount(e.target.value)} placeholder="e.g. 1500" />
            </div>
            <Button variant="outline" size="icon" onClick={handleAddItem} className="h-10 w-10 flex-shrink-0">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

      <Button onClick={handleSubmit} disabled={isLoading || billItems.length === 0} size="lg" className="w-full">
        {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
             <Sparkles className="mr-2 h-4 w-4" />
        )}
        Explain My Bill
      </Button>
    </div>
  );
}
