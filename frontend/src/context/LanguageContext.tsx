'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionaries, Language } from '@/lib/dictionaries';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    dict: typeof dictionaries['ID'] | typeof dictionaries['EN'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('ID');

    // Simple persistence or detection could go here (e.g. localStorage)
    // For now, default to ID as requested.

    const value = {
        language,
        setLanguage,
        dict: dictionaries[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
