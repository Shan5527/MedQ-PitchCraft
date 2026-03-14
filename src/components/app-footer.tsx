import Link from 'next/link';
import { placeholderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function AppFooter() {
    const logo = placeholderImages.find(p => p.id === 'logo');

    return (
        <footer className="w-full bg-secondary text-secondary-foreground mt-12">
            <div className="mx-auto w-full max-w-5xl p-6 md:p-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                         {logo && (
                            <Link href="/" className="flex items-center gap-3">
                                <div className="relative h-12 w-12 rounded-lg bg-white p-1">
                                    <Image
                                        src={logo.imageUrl}
                                        alt="MedQ Logo"
                                        fill
                                        className="object-contain"
                                        data-ai-hint={logo.imageHint}
                                    />
                                </div>
                                <span className="self-center text-2xl font-bold font-headline whitespace-nowrap">MedQ</span>
                            </Link>
                         )}
                         <p className="mt-4 max-w-xs text-sm text-muted-foreground">Find the right care, faster. Your guide through every step of your healthcare journey.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">Resources</h2>
                            <ul className="space-y-4">
                                <li>
                                    <Link href="/beds" className="hover:underline">Bed Finder</Link>
                                </li>
                                <li>
                                    <Link href="/symptom-checker" className="hover:underline">Symptom Checker</Link>
                                </li>
                                <li>
                                    <Link href="/experts" className="hover:underline">Talk to an Expert</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">Company</h2>
                            <ul className="space-y-4">
                                <li>
                                    <Link href="#" className="hover:underline">About Us</Link>
                                </li>
                                <li>
                                    <Link href="/#blogs" className="hover:underline">Blog</Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:underline">Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
                            <ul className="space-y-4">
                                <li>
                                    <Link href="#" className="hover:underline">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:underline">Terms of Service</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-border sm:mx-auto" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-muted-foreground sm:text-center">© {new Date().getFullYear()} MedQ™. All Rights Reserved.</span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                       {/* Social media icons could go here */}
                    </div>
                </div>
                 <p className="mt-6 text-xs text-muted-foreground text-center">
                    Disclaimer: MedQ provides information for guidance only and is not a substitute for professional medical advice. Always consult a qualified healthcare provider for diagnosis and treatment.
                </p>
            </div>
        </footer>
    );
}
