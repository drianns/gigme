    'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    ease?: string;
    splitType?: 'chars' | 'words';
    from?: { opacity?: number; y?: number; x?: number; scale?: number; rotate?: number };
    to?: { opacity?: number; y?: number; x?: number; scale?: number; rotate?: number };
    threshold?: number;
    rootMargin?: string;
    textAlign?: 'left' | 'center' | 'right';
    tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
    onLetterAnimationComplete?: () => void;
}

const SplitText = ({
    text,
    className = '',
    delay = 50,
    duration = 0.8,
    ease = 'power3.out',
    splitType = 'chars',
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = '-50px',
    textAlign = 'left',
    tag = 'p',
    onLetterAnimationComplete
}: SplitTextProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Split text into chars or words
    const elements = useMemo(() => {
        if (splitType === 'words') {
            return text.split(' ').map((word, i) => ({ text: word, key: i }));
        }
        return text.split('').map((char, i) => ({ text: char === ' ' ? '\u00A0' : char, key: i }));
    }, [text, splitType]);

    // Intersection Observer for scroll trigger
    useEffect(() => {
        if (!containerRef.current || hasAnimated) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [threshold, rootMargin, hasAnimated]);

    // GSAP Animation
    useEffect(() => {
        if (!inView || !containerRef.current || hasAnimated) return;

        const chars = containerRef.current.querySelectorAll('.split-char');
        if (!chars.length) return;

        gsap.fromTo(
            chars,
            from,
            {
                ...to,
                duration,
                ease,
                stagger: delay / 1000,
                onComplete: () => {
                    setHasAnimated(true);
                    onLetterAnimationComplete?.();
                }
            }
        );
    }, [inView, hasAnimated, from, to, duration, ease, delay, onLetterAnimationComplete]);

    const containerStyle: React.CSSProperties = {
        textAlign,
        display: 'inline-block',
        overflow: 'hidden'
    };

    const charStyle: React.CSSProperties = {
        display: 'inline-block',
        opacity: 0,
        transform: `translateY(${from.y || 0}px)`,
        willChange: 'transform, opacity'
    };

    const content = (
        <span style={{ display: 'inline' }}>
            {elements.map((el, index) => (
                <span
                    key={el.key}
                    className="split-char"
                    style={charStyle}
                >
                    {el.text}
                    {splitType === 'words' && index < elements.length - 1 && '\u00A0'}
                </span>
            ))}
        </span>
    );

    const TagComponent = tag as React.ElementType;

    return (
        <div ref={containerRef} style={containerStyle} className={className}>
            <TagComponent style={{ margin: 0, display: 'inline' }}>
                {content}
            </TagComponent>
        </div>
    );
};

export default SplitText;
