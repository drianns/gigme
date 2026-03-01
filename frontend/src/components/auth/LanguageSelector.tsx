'use client';

import { FiChevronDown } from 'react-icons/fi';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/animate-ui/components/radix/dropdown-menu';
import { useLanguage } from '@/context/LanguageContext';

export function LanguageSelector() {
    const { language, setLanguage } = useLanguage();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors focus:outline-none">
                    <span>{language === 'ID' ? 'IND' : 'ENG'}</span>
                    <div className="w-5 h-3 relative overflow-hidden rounded-[1px] shadow-sm">
                        {language === 'ID' ? (
                            <>
                                <div className="absolute top-0 left-0 right-0 h-1/2 bg-red-600" />
                                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white" />
                            </>
                        ) : (
                            <div className="w-full h-full bg-blue-800 flex items-center justify-center">
                                <div className="text-[6px] text-white">★</div>
                            </div>
                        )}
                    </div>
                    <FiChevronDown />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setLanguage('ID')} className="cursor-pointer gap-2">
                        <div className="w-4 h-3 relative overflow-hidden rounded-[1px] shadow-sm">
                            <div className="absolute top-0 left-0 right-0 h-1/2 bg-red-600" />
                            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white" />
                        </div>
                        <span>Bahasa (ID)</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('EN')} className="cursor-pointer gap-2">
                        <div className="w-4 h-3 bg-blue-800 rounded-[1px] shadow-sm" />
                        <span>English (EN)</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
