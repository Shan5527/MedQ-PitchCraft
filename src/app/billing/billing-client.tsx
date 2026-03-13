'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
import {
  Loader2,
  Sparkles,
  AlertCircle,
  TrendingUp,
  Camera,
  Upload,
  QrCode,
  ArrowLeft,
} from 'lucide-react';
import type {
  TransparentBillingExplainerInput,
  TransparentBillingExplainerOutput,
} from '@/ai/flows/transparent-billing-explainer-flow';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

type Mode = 'start' | 'camera' | 'loading' | 'result';

export default function BillingClient({
  analyzeBillImageAction,
}: {
  analyzeBillImageAction: (
    data: TransparentBillingExplainerInput
  ) => Promise<TransparentBillingExplainerOutput>;
}) {
  const [mode, setMode] = useState<Mode>('start');
  const [result, setResult] = useState<TransparentBillingExplainerOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    if (mode === 'camera' && hasCameraPermission === null) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Error accessing camera:', err);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings.',
          });
          setMode('start');
        }
      };
      getCameraPermission();
    }
    
    // Cleanup function to stop camera when component unmounts or mode changes
    return () => {
      if (mode !== 'camera') {
        stopCamera();
      }
    };
  }, [mode, hasCameraPermission, toast, stopCamera]);


  const handleSubmit = async (photoDataUri: string) => {
    if (!photoDataUri) {
      setError('No image data provided to analyze.');
      return;
    }
    setError(null);
    setMode('loading');
    try {
      const response = await analyzeBillImageAction({ photoDataUri });
      setResult(response);
      setMode('result');
    } catch (err: any) {
      setError('The AI model could not provide an explanation. Please try again.');
      setMode('start');
    }
  };

  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUri = canvas.toDataURL('image/png');
        stopCamera();
        handleSubmit(dataUri);
      }
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUri = e.target?.result as string;
        handleSubmit(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setMode('start');
    setHasCameraPermission(null);
  };
  
  const renderStartScreen = () => (
     <div className="space-y-6">
      <header className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-primary font-headline">
          Understand Your Hospital Bill
        </h1>
        <p className="text-muted-foreground">
          Let AI explain your hospital charges. No more manual entry.
        </p>
      </header>
      
      <div className="grid grid-cols-1 gap-4 pt-4">
         <Button size="lg" className="h-24 flex-col" onClick={() => setMode('camera')}>
            <Camera className="h-8 w-8" />
            <span className="text-lg font-semibold mt-1">Scan with Camera</span>
         </Button>
         <Button size="lg" className="h-24 flex-col" variant="outline" onClick={handleUploadClick}>
            <Upload className="h-8 w-8" />
            <span className="text-lg font-semibold mt-1">Upload from Gallery</span>
         </Button>
         <Button size="lg" className="h-24 flex-col" variant="outline" onClick={() => setMode('camera')}>
            <QrCode className="h-8 w-8" />
            <span className="text-lg font-semibold mt-1">Scan QR / Barcode</span>
         </Button>
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
  
  const renderCameraScreen = () => (
    <div className="space-y-4">
       <header className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-primary font-headline">
          Position Bill in Frame
        </h1>
      </header>
      <div className="relative aspect-[9/16] w-full max-w-md mx-auto overflow-hidden rounded-lg border-4 border-primary bg-muted shadow-lg">
        <video ref={videoRef} className="h-full w-full object-cover" autoPlay playsInline muted />
         {hasCameraPermission === false && (
             <Alert variant="destructive" className="m-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Camera Access Denied</AlertTitle>
                <AlertDescription>Please enable camera access in your browser settings to continue.</AlertDescription>
            </Alert>
         )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={() => { stopCamera(); setMode('start'); }}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button size="lg" onClick={handleCapturePhoto} disabled={!hasCameraPermission}>
            <Camera className="mr-2 h-5 w-5" />
            Capture Bill
        </Button>
      </div>
    </div>
  );
  
  const renderLoadingScreen = () => (
      <div className="flex flex-col items-center justify-center space-y-4 pt-16 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-xl font-semibold">Explaining your bill...</h2>
        <p className="text-muted-foreground">Our AI is analyzing the image to make your bill easier to understand.</p>
      </div>
  );
  
  const renderResultScreen = () => (
      result && (
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
             {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
            <Button onClick={handleReset} variant="outline" className="w-full">Start Over</Button>
        </div>
      )
  );

  switch (mode) {
    case 'start':
      return renderStartScreen();
    case 'camera':
      return renderCameraScreen();
    case 'loading':
      return renderLoadingScreen();
    case 'result':
      return renderResultScreen();
    default:
       return renderStartScreen();
  }
}
