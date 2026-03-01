'use client';
import { motion } from 'motion/react';
import { FiCheck } from 'react-icons/fi';

interface StepsProps {
    currentStep: number;
}

const steps = [
    { id: 1, name: 'Overview' },
    { id: 2, name: 'Pricing' },
    { id: 3, name: 'Description' },
    { id: 4, name: 'Gallery' },
    { id: 5, name: 'Publish' },
];

export function StepsIndicator({ currentStep }: StepsProps) {
    return (
        <div className="w-full mb-8">
            <div className="flex items-center justify-between relative">
                {/* Progress Bar Background */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full -z-10" />

                {/* Active Progress Bar */}
                <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 rounded-full -z-10"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {steps.map((step) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
                            <motion.div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${isActive ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' :
                                        isCompleted ? 'border-emerald-500 bg-emerald-500 text-white' :
                                            'border-gray-200 bg-white text-gray-400'
                                    }`}
                                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                            >
                                {isCompleted ? <FiCheck className="w-5 h-5" /> : <span className="font-bold text-sm">{step.id}</span>}
                            </motion.div>
                            <span className={`text-xs font-medium ${isActive ? 'text-emerald-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                                {step.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
