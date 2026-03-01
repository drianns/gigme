'use client';

import { useEffect, useRef, useState } from 'react';

interface ScratchCardProps {
    children: React.ReactNode;
    overlayColor?: string;
    brushSize?: number;
    onReveal?: () => void;
    onProgress?: (percentage: number) => void; // Track erase progress
}

export default function ScratchCard({
    children,
    overlayColor = '#ffffff',
    brushSize = 50,
    onReveal,
    onProgress,
}: ScratchCardProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const lastPointRef = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to match container
        const resizeCanvas = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            // Fill with white overlay
            ctx.fillStyle = overlayColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [overlayColor]);

    const getCoordinates = (e: MouseEvent | TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;

        if (e instanceof MouseEvent) {
            clientX = e.clientX;
            clientY = e.clientY;
        } else {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
        };
    };

    const erase = (x: number, y: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = brushSize * 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw line from last point to current point for smooth effect
        if (lastPointRef.current) {
            ctx.beginPath();
            ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        // Also draw circle at current point
        ctx.beginPath();
        ctx.arc(x, y, brushSize, 0, Math.PI * 2);
        ctx.fill();

        lastPointRef.current = { x, y };
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
        if (isRevealed) return;

        const { x, y } = getCoordinates(e);
        erase(x, y);

        if (e instanceof TouchEvent) {
            e.preventDefault();
        }
    };

    const checkRevealPercentage = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;

        // Check alpha channel (every 4th value)
        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] < 128) {
                transparentPixels++;
            }
        }

        const totalPixels = pixels.length / 4;
        const revealedPercentage = (transparentPixels / totalPixels) * 100;

        // Call progress callback
        if (onProgress) {
            onProgress(revealedPercentage);
        }

        // Auto-complete at 90% revealed
        if (revealedPercentage >= 90 && !isRevealed) {
            setIsRevealed(true);
            if (onReveal) onReveal();

            // Smooth fade out
            if (canvas) {
                canvas.style.transition = 'opacity 0.6s ease-out';
                canvas.style.opacity = '0';
                setTimeout(() => {
                    canvas.style.display = 'none';
                }, 600);
            }
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Mouse events - hover only
        const mouseMove = (e: MouseEvent) => {
            handleMove(e);
            checkRevealPercentage();
        };

        // Touch events
        const touchMove = (e: TouchEvent) => {
            handleMove(e);
            checkRevealPercentage();
        };

        canvas.addEventListener('mousemove', mouseMove);
        canvas.addEventListener('touchmove', touchMove, { passive: false });

        return () => {
            canvas.removeEventListener('mousemove', mouseMove);
            canvas.removeEventListener('touchmove', touchMove);
        };
    }, [isRevealed]);

    return (
        <div ref={containerRef} className="relative w-full h-full">
            {/* Background content (revealed) */}
            <div className="absolute inset-0">
                {children}
            </div>

            {/* Scratch overlay canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 cursor-crosshair touch-none"
                style={{ zIndex: 10 }}
                aria-label="Hover to reveal content"
            />
        </div>
    );
}
