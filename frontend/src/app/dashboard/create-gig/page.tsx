'use client';

import MainTemplate from '@/components/layout/MainTemplate';
import Stepper, { Step } from '@/components/ui/Stepper';
import { Overview } from '@/components/create-gig/Overview';
import { Pricing } from '@/components/create-gig/Pricing';
import { Description } from '@/components/create-gig/Description';
import { Gallery } from '@/components/create-gig/Gallery';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function CreateGigPage() {
    const handleFinalStep = () => {
        // In a real app, this would submit the form
        console.log("Gig Published!");
    };

    return (
        <MainTemplate>
            <div className="min-h-screen bg-gray-50 pt-20 pb-20">

                <div className="max-w-4xl mx-auto px-4 mb-4">
                    <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors mb-4">
                        <FiArrowLeft /> Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Create a New Gig</h1>
                </div>

                <Stepper
                    initialStep={1}
                    onFinalStepCompleted={handleFinalStep}
                    backButtonText="Back"
                    nextButtonText="Continue"
                    stepCircleContainerClassName="shadow-none bg-transparent border-0"
                    contentClassName="pt-8"
                >
                    <Step>
                        <Overview />
                    </Step>
                    <Step>
                        <Pricing />
                    </Step>
                    <Step>
                        <Description />
                    </Step>
                    <Step>
                        <Gallery />
                    </Step>
                    <Step>
                        <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                                🎉
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Almost Done!</h2>
                            <p className="text-gray-500 max-w-md mx-auto mb-8">
                                Your gig is ready to be published. Please review everything carefully before going live.
                            </p>
                        </div>
                    </Step>
                </Stepper>

            </div>
        </MainTemplate>
    );
}
