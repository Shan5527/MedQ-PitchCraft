import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'What is MedQ?',
    answer: 'MedQ is a comprehensive healthcare platform designed to guide you from symptoms to treatment without the chaos. We offer services like an AI symptom checker, a bed finder for hospitals, expert consultations, and more.',
  },
  {
    question: 'Is the AI Symptom Checker accurate?',
    answer: 'Our AI Symptom Checker is a powerful tool designed to provide potential causes for your symptoms based on a large dataset. However, it is for informational purposes only and is not a substitute for professional medical advice. Always consult a doctor for a proper diagnosis.',
  },
  {
    question: 'How does the Bed Finder work?',
    answer: 'Our Bed Finder provides real-time information on bed availability in nearby hospitals. The data is updated frequently, but we recommend calling the hospital to confirm before you travel.',
  },
  {
    question: 'Are the experts on MedQ qualified?',
    answer: 'Yes, all doctors, nurses, and specialists on our platform are verified and credentialed professionals. You can view their qualifications and ratings on their profiles.',
  },
];

export default function FAQPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline lg:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Find answers to common questions about MedQ.
        </p>
      </header>
      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqItems.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index} className="rounded-lg border bg-card px-4">
            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
