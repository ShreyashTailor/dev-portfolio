"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
    Rocket,
    Zap,
    MousePointer2,
    Sparkles,
    Layers,
    Coffee,
    FileCode,
    Terminal,
    Palette,
    Layout,
    Figma as FigmaIcon,
    Triangle,
    Banana,
    Cpu
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const tools = [
    { name: "Canva", category: "Design" },
    { name: "Figma", category: "Design" },
    { name: "Framer", category: "Design" },
    { name: "v0", category: "AI Design" },
    { name: "Gemini", category: "LLM" },
    { name: "Bolt", category: "AI Tools" },
]

const languages = [
    { name: "Python", category: "Backend" },
    { name: "PHP", category: "Backend" },
    { name: "Java", category: "Core" },
    { name: "C", category: "System" },
    { name: "MEAN Stack", category: "Full Stack" },
]

export function ToolsSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current || !headerRef.current || !gridRef.current) return

        const ctx = gsap.context(() => {
            // Header slide in
            gsap.from(headerRef.current, {
                x: -60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            })

            // Grid items staggered fade up
            const items = gridRef.current?.querySelectorAll(".tool-card")
            if (items) {
                gsap.from(items, {
                    y: 40,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                })
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="tools" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30">
            {/* Section header */}
            <div ref={headerRef} className="mb-16">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03 / Stack</span>
                <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">TOOLS & TECH</h2>
            </div>

            <div ref={gridRef} className="space-y-16">
                {/* Tools Grid */}
                <div>
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8">Design & AI</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {tools.map((tool, index) => (
                            <ToolCard key={index} tool={tool} />
                        ))}
                    </div>
                </div>

                {/* Languages Grid */}
                <div>
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8">Engineering</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {languages.map((tool, index) => (
                            <ToolCard key={index} tool={tool} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

const toolIcons: Record<string, React.ReactNode> = {
    "Canva": <Palette className="w-full h-full" />,
    "Framer": <Layout className="w-full h-full" />,
    "Figma": <FigmaIcon className="w-full h-full" />,
    "v0": <Triangle className="w-full h-full fill-current" />,
    "Gemini": <Sparkles className="w-full h-full" />,
    "Bolt": <Zap className="w-full h-full fill-current" />,
    "Cursor": <MousePointer2 className="w-full h-full" />,
    "Claude": <Sparkles className="w-full h-full" />,
    "Python": <Terminal className="w-full h-full" />,
    "PHP": <FileCode className="w-full h-full" />,
    "Java": <Coffee className="w-full h-full" />,
    "C": <div className="font-mono font-bold text-xl leading-none">C</div>,
    "MEAN Stack": <Layers className="w-full h-full" />,
}

function ToolCard({ tool }: { tool: { name: string; category: string } }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className={cn(
                "tool-card group relative p-6 border border-border/40 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 cursor-crosshair overflow-hidden",
                isHovered && "ring-1 ring-accent/20"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center h-full min-h-[100px]">
                {/* Animated Logo */}
                <div
                    className={cn(
                        "w-8 h-8 flex items-center justify-center transition-all duration-500",
                        isHovered ? "scale-110 text-accent" : "text-muted-foreground"
                    )}
                >
                    {toolIcons[tool.name] || <Terminal className="w-full h-full" />}
                </div>

                <span className={cn(
                    "font-mono text-xs uppercase tracking-wider transition-colors duration-300",
                    isHovered ? "text-foreground" : "text-muted-foreground"
                )}>
                    {tool.name}
                </span>
            </div>

            {/* Hover Glow Effect */}
            <div
                className={cn(
                    "absolute inset-0 bg-accent/5 blur-xl transition-opacity duration-500",
                    isHovered ? "opacity-100" : "opacity-0"
                )}
            />

            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/0 group-hover:border-accent/100 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent/0 group-hover:border-accent/100 transition-all duration-300" />
        </div>
    )
}
