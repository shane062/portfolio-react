"use client";
import React, { useState, useRef, MouseEvent, useEffect, useMemo } from 'react';
import Image from "next/image";

export interface Experience {
    company: string;
    time: string;
    title: string;
    content: string;
    image?: string;
    tech_badge: string[];
}

export default function NeuralExperienceHub() {
    const [experiences, setExperiences] = useState<Experience[]>([]);

    // 1. UPDATED: Initial scale set to 1.4 for a "more zoomed in" default view
    const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1.6 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    
    const canvasRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Fetch data
    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch("/metadata.json");
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setExperiences(data.experiences || []);
            } catch (error) {
                console.error("Failed to load experience metadata:", error);
            }
        }
        fetchProjects();
    }, []);

    // Prevent Page Scroll on Wheel
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleNativeWheel = (e: WheelEvent) => {
            e.preventDefault();
            const scaleAdjust = e.deltaY * -0.001;
            
            setTransform((prev) => {
                const newScale = Math.min(Math.max(0.4, prev.scale + scaleAdjust), 2.5);
                return { ...prev, scale: newScale };
            });
        };

        container.addEventListener('wheel', handleNativeWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleNativeWheel);
    }, []);

    // Organic Network Algorithm
    const network = useMemo(() => {
        if (!experiences.length) return { nodes: [], links: [] };

        const companiesMap: Record<string, Experience[]> = {};
        experiences.forEach(exp => {
            if (!companiesMap[exp.company]) companiesMap[exp.company] = [];
            companiesMap[exp.company].push(exp);
        });

        const compKeys = Object.keys(companiesMap);
        const numComps = compKeys.length || 1;
        const cx = 1000;
        const cy = 1000;
        const newNodes: any[] = [];
        const newLinks: any[] = [];

        const baseRotation = Math.random() * Math.PI * 2; 

        compKeys.forEach((compName, cIdx) => {
            const sectorSize = (2 * Math.PI) / numComps;
            const baseAngle = baseRotation + (cIdx * sectorSize);
            const angleJitter = (Math.random() - 0.5) * (sectorSize * 0.5);
            const compAngle = baseAngle + angleJitter;

            const compR = 180 + Math.random() * 60; 
            const compX = cx + compR * Math.cos(compAngle);
            const compY = cy + compR * Math.sin(compAngle);
            const compId = `comp-${cIdx}`;

            newNodes.push({ id: compId, type: 'company', label: compName, x: compX, y: compY });
            newLinks.push({ fromX: cx, fromY: cy, toX: compX, toY: compY, color: 'rgba(0, 219, 231, 0.5)' });

            const projs = companiesMap[compName];
            const numProjs = projs.length;

            projs.forEach((proj, pIdx) => {
                const projBaseAngle = compAngle + (pIdx - (numProjs - 1) / 2) * 0.45;
                const projAngle = projBaseAngle + (Math.random() - 0.5) * 0.15;
                
                const projR = 360 + Math.random() * 80; 
                const projX = cx + projR * Math.cos(projAngle);
                const projY = cy + projR * Math.sin(projAngle);
                const projId = `proj-${cIdx}-${pIdx}`;

                newNodes.push({ id: projId, type: 'project', data: proj, x: projX, y: projY });
                newLinks.push({ fromX: compX, fromY: compY, toX: projX, toY: projY, color: 'rgba(110, 32, 140, 0.5)' });

                const skills = proj.tech_badge || [];
                const numSkills = skills.length;

                skills.forEach((skill, sIdx) => {
                    const skillBaseAngle = projAngle + (sIdx - (numSkills - 1) / 2) * 0.2;
                    const skillAngle = skillBaseAngle + (Math.random() - 0.5) * 0.1;
                    
                    const skillR = 500 + Math.random() * 100; 
                    const skillX = cx + skillR * Math.cos(skillAngle);
                    const skillY = cy + skillR * Math.sin(skillAngle);

                    newNodes.push({ id: `skill-${cIdx}-${pIdx}-${sIdx}`, type: 'skill', label: skill, x: skillX, y: skillY });
                    newLinks.push({ fromX: projX, fromY: projY, toX: skillX, toY: skillY, color: 'rgba(255, 255, 255, 0.15)' });
                });
            });
        });

        return { nodes: newNodes, links: newLinks };
    }, [experiences]);

    // 2. UPDATED: Prevent default behaviors that cause page scrolling on drag
    const handleMouseDown = (e: MouseEvent) => {
        if (e.button !== 0) return; // Only allow left-click dragging
        e.preventDefault(); // STOPS text highlighting and browser native drag-scroll
        setIsDragging(true);
        setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault(); // STOPS browser native drag-scroll
        setTransform((prev) => ({
            ...prev,
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        }));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div 
            ref={containerRef} 
            // 3. UPDATED: Added `touch-none` and `select-none` to strictly disable mobile pull-to-refresh, touch panning, and ghost text selection
            className="relative w-full min-h-screen bg-[#111319] overflow-hidden font-mono text-slate-200 touch-none select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <style dangerouslySetInnerHTML={{__html: `
                .noise-bg {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
                }
                .glass-panel {
                    background: rgba(26, 30, 46, 0.4);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .glass-card {
                    background: rgba(17, 19, 25, 0.6);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(0, 219, 231, 0.2);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 219, 231, 0.05);
                }
            `}} />

            <div className="absolute inset-0 noise-bg pointer-events-none z-0"></div>

            {/* FIXED HUD ELEMENTS */}
            <div className="absolute bottom-12 right-12 z-50 w-96 glass-card p-6 rounded-xl cursor-default pointer-events-none hidden md:block">
                <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">Experience Architecture.</h2>
                    <span className="material-symbols-outlined text-cyan-400">schema</span>
                </div>
                <p className="text-sm text-slate-400 mb-6">
                    Visualizing the interconnected neurons of professional history, tech stacks, and successful deployments.
                </p>
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider">
                        <span>CONNECTIVITY SCORE</span>
                        <span className="text-cyan-400">98.4%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 w-[98.4%] shadow-[0_0_10px_rgba(0,219,231,0.5)]"></div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 glass-panel px-6 py-3 rounded-lg text-sm text-slate-400 flex items-center gap-3 pointer-events-none">
                <span className="material-symbols-outlined text-cyan-400 animate-bounce">touch_app</span>
                Scroll to zoom. Drag to pan. Hover nodes to explore.
            </div>

            {/* INFINITE CANVAS */}
            <div 
                ref={canvasRef}
                className={`absolute top-1/2 left-1/2 w-[2000px] h-[2000px] -ml-[1000px] -mt-[1000px] origin-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{ 
                    transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out' 
                }}
            >
                {/* DYNAMIC SVG LINES */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 219, 231, 0.3))' }}>
                    {network.links.map((link, i) => (
                        <line 
                            key={`link-${i}`} 
                            x1={link.fromX} y1={link.fromY} 
                            x2={link.toX} y2={link.toY} 
                            stroke={link.color} 
                            strokeWidth="1.5" 
                            strokeDasharray="4 4" 
                        />
                    ))}
                </svg>

                {/* CORE NODE (Center 1000, 1000) */}
                <div className="absolute top-[1000px] left-[1000px] -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center group cursor-pointer">
                    <div className="text-[10px] font-bold tracking-widest text-cyan-400 mb-2 opacity-70 group-hover:opacity-100 transition-opacity">CORE_ENTITY</div>
                    <div className="w-28 h-28 rounded-xl p-[2px] bg-gradient-to-br from-cyan-400 to-purple-500 shadow-[0_0_30px_rgba(0,219,231,0.2)] group-hover:shadow-[0_0_40px_rgba(228,152,255,0.4)] transition-all duration-500">
                        <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900 relative">
                            <Image src="/images/lai-weng-hong.png" alt="Profile" fill className="object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                            <span className="absolute bottom-2 right-2 material-symbols-outlined text-cyan-400 text-sm">memory</span>
                        </div>
                    </div>
                    <div className="mt-3 text-[12px] font-bold tracking-[0.2em] text-white whitespace-nowrap bg-slate-900/60 px-2 py-1 rounded">LAI WENG HONG</div>
                </div>

                {/* DYNAMIC NODES */}
                {network.nodes.map((node) => {
                    if (node.type === 'company') {
                        return (
                            <div key={node.id} className="absolute z-30 flex flex-col items-center" style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}>
                                <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center border-cyan-400/30 shadow-[0_0_10px_rgba(0,219,231,0.1)] hover:border-cyan-400 transition-colors">
                                    <span className="material-symbols-outlined text-cyan-400 text-lg">domain</span>
                                </div>
                                <span className="mt-2 text-[9px] font-bold text-cyan-400 tracking-wider whitespace-nowrap bg-slate-900/80 px-2 py-1 rounded border border-cyan-400/20">{node.label}</span>
                            </div>
                        );
                    }

                    if (node.type === 'project') {
                        const data = node.data as Experience;
                        const isRightSide = node.x > 1000;

                        return (
                            <div key={node.id} className="absolute z-40 group cursor-crosshair" style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}>
                                <div className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center border-purple-400/30 group-hover:border-purple-400 transition-colors shadow-[0_0_15px_rgba(237,177,255,0.1)] relative z-10 bg-slate-900">
                                    <span className="material-symbols-outlined text-purple-400 text-lg">work</span>
                                </div>
                                
                                <div className={`absolute top-1/2 -translate-y-1/2 ${isRightSide ? 'left-14 translate-x-4' : 'right-14 -translate-x-4'} w-72 glass-card p-5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 border-purple-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] z-50`}>
                                    <div className="text-[10px] text-purple-400/70 mb-1 border-b border-white/10 pb-1 inline-block uppercase tracking-widest">{data.time}</div>
                                    <h3 className="text-lg font-bold text-white mb-2 mt-1 leading-tight">{data.title}</h3>
                                    <p className="text-[12px] text-slate-300 mb-0 leading-relaxed font-sans line-clamp-4">
                                        {data.content}
                                    </p>
                                </div>
                            </div>
                        );
                    }

                    if (node.type === 'skill') {
                        return (
                            <div key={node.id} className="absolute z-20" style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}>
                                <div className="px-3 py-1.5 rounded-full glass-panel border-slate-700/50 hover:border-cyan-400 hover:text-cyan-400 transition-colors text-[9px] font-bold uppercase tracking-wider whitespace-nowrap text-slate-400 cursor-help shadow-[0_0_5px_rgba(0,0,0,0.5)]">
                                    {node.label}
                                </div>
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        </div>
    );
}