import { placeholderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
    const logo = placeholderImages.find(p => p.id === 'logo');
    return (
        <div className="space-y-12 max-w-3xl mx-auto">
            <header className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-primary font-headline lg:text-5xl">
                    About MedQ
                </h1>
                <p className="text-xl text-muted-foreground">
                    From symptoms to treatment — without the chaos.
                </p>
            </header>
            
            <div className="flex justify-center">
                 {logo && (
                    <Link href="/" className="flex items-center gap-4">
                        <div className="relative h-24 w-24 rounded-lg bg-white p-2 shadow-md">
                            <Image
                                src={logo.imageUrl}
                                alt="MedQ Logo"
                                fill
                                className="object-contain"
                                data-ai-hint={logo.imageHint}
                            />
                        </div>
                        <span className="text-6xl font-bold font-headline whitespace-nowrap">MedQ</span>
                    </Link>
                 )}
            </div>

            <article className="prose prose-lg max-w-none mx-auto space-y-6 text-foreground/80">
                <p>
                    In a world where healthcare can feel fragmented, confusing, and stressful, MedQ was born from a simple mission: to empower every individual to navigate their health journey with confidence and clarity. We believe that access to the right care at the right time should be simple, not overwhelming.
                </p>
                <h2 className="text-3xl font-bold mt-8 mb-4 font-headline text-foreground">Our Vision</h2>
                <p>
                    We envision a future where technology bridges the gap between patients and providers, creating a seamless, integrated healthcare experience. From the first sign of a symptom to post-treatment recovery, MedQ is your trusted partner, providing intelligent guidance, immediate connections to experts, and transparent information every step of the way.
                </p>
                <h2 className="text-3xl font-bold mt-8 mb-4 font-headline text-foreground">What We Do</h2>
                <p>
                    MedQ is more than just an app; it's a comprehensive ecosystem designed to put you in control of your health. We leverage cutting-edge AI and a network of trusted medical professionals to offer:
                </p>
                <ul>
                    <li><strong>AI Symptom Analysis:</strong> Our intelligent symptom checker helps you understand your health concerns and guides you to the appropriate level of care.</li>
                    <li><strong>Real-Time Bed Finder:</strong> We provide up-to-the-minute information on hospital bed availability, reducing uncertainty during critical moments.</li>
                    <li><strong>Expert Consultations:</strong> Connect instantly with qualified doctors, nurses, and specialists for virtual consultations, getting the answers you need from the comfort of your home.</li>
                    <li><strong>Transparent Billing:</strong> Our AI-powered bill explainer demystifies complex medical charges, bringing clarity and fairness to your healthcare finances.</li>
                    <li><strong>Digital Queue Management:</strong> Skip the waiting room with our virtual queue system, allowing you to wait wherever you're most comfortable.</li>
                </ul>
                 <h2 className="text-3xl font-bold mt-8 mb-4 font-headline text-foreground">Our Commitment</h2>
                 <p>
                    Your trust is our most important asset. We are committed to protecting your privacy, providing medically sound information, and connecting you with a network of care you can depend on. At MedQ, we're not just building technology; we're building a healthier future, together.
                 </p>
            </article>
        </div>
    );
}
