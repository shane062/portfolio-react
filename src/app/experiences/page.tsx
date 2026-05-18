"use client";
import React, { useState, useRef, MouseEvent, useEffect, useMemo, useCallback } from 'react';
import Image from "next/image";
import { assetUrl } from '@/lib/basePath';

export interface Experience {
    company: string;
    time: string;
    title: string;
    content: string;
    image?: string;
    logo?: string;
    tech_badge: string[];
}

export default function NeuralExperienceHub() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [isListView, setIsListView] = useState(false);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // ═══ UNIFIED HOVER with delayed leave (fixes hover-trap for ALL tooltips) ═══
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleNodeEnter = useCallback((nodeId: string) => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setHoveredNode(nodeId);
    }, []);

    const handleNodeLeave = useCallback(() => {
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredNode(null);
        }, 200);
    }, []);

    const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1.2 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const canvasRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch(assetUrl("/metadata.json"));
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setExperiences(data.experiences || []);
            } catch (error) {
                console.error("Failed to load experience metadata:", error);
            }
        }
        fetchProjects();
    }, []);

    // ═══ HYDRATION SAFE DYNAMIC TIMELINE ═══
    // Calculates current year purely on the client after mount
    // to avoid Hydration Mismatch errors against pre-rendered static HTML.
    const [mountedYear, setMountedYear] = useState<number | null>(null);
    useEffect(() => {
        setMountedYear(new Date().getFullYear());
    }, []);

    // Helper function to safely format timeline strings dynamically.
    const renderTimeline = (timeStr: string) => {
        if (!mountedYear) return timeStr; // Fallback to raw string during initial SSR
        if (timeStr.toLowerCase().includes("present")) {
            return timeStr.replace(/Present/i, `PRESENT (${mountedYear})`);
        }
        return timeStr;
    };

    // ═══ NATIVE EVENT LISTENERS ═══
    // Handles Wheel (Zoom) and Touch (Pan & Pinch-to-Zoom)
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Wheel Zoom
        const handleNativeWheel = (e: WheelEvent) => {
            if (isListView) return;
            e.preventDefault();
            const scaleAdjust = e.deltaY * -0.001;
            setTransform((prev) => {
                const newScale = Math.min(Math.max(0.4, prev.scale + scaleAdjust), 2.5);
                return { ...prev, scale: newScale };
            });
        };

        // Touch Variables
        let currentPinchDist: number | null = null;
        let isDraggingTouch = false;
        let dragStartTouch = { x: 0, y: 0 };

        const handleTouchStart = (e: TouchEvent) => {
            if (isListView) return;
            if (e.touches.length === 1) {
                // Start Panning
                isDraggingTouch = true;
                setTransform(prev => {
                    dragStartTouch = { x: e.touches[0].clientX - prev.x, y: e.touches[0].clientY - prev.y };
                    return prev;
                });
            } else if (e.touches.length === 2) {
                // Start Pinch-to-Zoom
                isDraggingTouch = false;
                currentPinchDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (isListView) return;
            e.preventDefault(); // Prevent standard page scroll behavior

            if (e.touches.length === 1 && isDraggingTouch) {
                // Execute Pan
                setTransform((prev) => ({ 
                    ...prev, 
                    x: e.touches[0].clientX - dragStartTouch.x, 
                    y: e.touches[0].clientY - dragStartTouch.y 
                }));
            } else if (e.touches.length === 2 && currentPinchDist !== null) {
                // Execute Zoom
                const dist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                const scaleAdjust = (dist - currentPinchDist) * 0.005; // Pinch sensitivity factor
                setTransform((prev) => {
                    const newScale = Math.min(Math.max(0.4, prev.scale + scaleAdjust), 2.5);
                    return { ...prev, scale: newScale };
                });
                currentPinchDist = dist;
            }
        };

        const handleTouchEnd = () => {
            isDraggingTouch = false;
            currentPinchDist = null;
        };

        container.addEventListener('wheel', handleNativeWheel, { passive: false });
        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd);
        container.addEventListener('touchcancel', handleTouchEnd);

        return () => {
            container.removeEventListener('wheel', handleNativeWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
            container.removeEventListener('touchcancel', handleTouchEnd);
        };
    }, [isListView]);

    useEffect(() => {
        return () => { if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current); };
    }, []);

    const extractProjectName = (content: string) => {
        const match = content.match(/^\[\s*(.+?)\s*\]/);
        return match ? match[1] : 'PROJECT';
    };

    // ═══ NETWORK RADIAL MATH CALCULATOR ═══
    const network = useMemo(() => {
        if (!experiences.length) return { nodes: [], links: [] };
        
        // 1. Group data logically by Company -> Roles & Projects
        const companyGroupsMap: Record<string, any> = {};
        experiences.forEach(exp => {
            if (!companyGroupsMap[exp.company]) {
                companyGroupsMap[exp.company] = { company: exp.company, logo: exp.logo || exp.image, roles: [], projects: [] };
            }
            const cleanTitle = exp.title.trim();
            const exists = companyGroupsMap[exp.company].roles.some((r: any) => r.title.toLowerCase() === cleanTitle.toLowerCase());
            if (!exists) {
                companyGroupsMap[exp.company].roles.push({ title: cleanTitle, time: exp.time });
            }
            companyGroupsMap[exp.company].projects.push(exp);
        });

        const companyGroups = Object.values(companyGroupsMap);
        
        // 2. Setup Central Origin Point
        const cx = 1000, cy = 1000;
        const newNodes: any[] = [];
        const newLinks: any[] = [];
        
        const numComps = companyGroups.length;
        const baseRotation = Math.PI / 4; // Shift starting angle for aesthetics

        // 3. Iterative positioning of hierarchical nodes
        companyGroups.forEach((group: any, cIdx: number) => {
            // -- Calculate Company Ring --
            const sectorSize = (2 * Math.PI) / numComps;
            const compAngle = baseRotation + (cIdx * sectorSize);
            const compR = 200; // Radius for company ring
            const compX = cx + compR * Math.cos(compAngle);
            const compY = cy + compR * Math.sin(compAngle);
            const compId = `comp-${cIdx}`;
            
            newNodes.push({ id: compId, type: 'company', data: group, x: compX, y: compY });
            newLinks.push({ sourceId: 'core', targetId: compId, fromX: cx, fromY: cy, toX: compX, toY: compY });

            // -- Calculate Project Ring --
            const projs = group.projects;
            const numProjs = projs.length;
            const projSpread = 0.6; // Angular spread available for projects
            
            projs.forEach((proj: any, pIdx: number) => {
                const projAngleOffset = numProjs === 1 ? 0 : (pIdx - (numProjs - 1) / 2) * (projSpread / numProjs);
                const projAngle = compAngle + projAngleOffset;
                const projR = 380; // Radius for project ring
                const projX = cx + projR * Math.cos(projAngle);
                const projY = cy + projR * Math.sin(projAngle);
                const projId = `proj-${cIdx}-${pIdx}`;
                
                newNodes.push({ id: projId, type: 'project', data: proj, x: projX, y: projY });
                newLinks.push({ sourceId: compId, targetId: projId, fromX: compX, fromY: compY, toX: projX, toY: projY });

                // -- Calculate Skills Ring --
                const skills = proj.tech_badge || [];
                const numSkills = skills.length;
                const skillSpread = 0.7; // Angular spread available for skills
                
                skills.forEach((skill: string, sIdx: number) => {
                    const skillAngleOffset = numSkills === 1 ? 0 : (sIdx - (numSkills - 1) / 2) * (skillSpread / numSkills);
                    const skillAngle = projAngle + skillAngleOffset;
                    // Stagger radius slightly for organic visual layering
                    const skillR = 560 + (sIdx % 2 === 0 ? 0 : 30); 
                    const skillX = cx + skillR * Math.cos(skillAngle);
                    const skillY = cy + skillR * Math.sin(skillAngle);
                    const skillId = `skill-${cIdx}-${pIdx}-${sIdx}`;
                    
                    newNodes.push({ id: skillId, type: 'skill', label: skill, x: skillX, y: skillY });
                    newLinks.push({ sourceId: projId, targetId: skillId, fromX: projX, fromY: projY, toX: skillX, toY: skillY });
                });
            });
        });
        return { nodes: newNodes, links: newLinks };
    }, [experiences]);

    const handleMouseDown = (e: MouseEvent) => {
        if (isListView || e.button !== 0) return;
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    };
    const handleMouseMove = (e: MouseEvent) => {
        if (isListView || !isDragging) return;
        e.preventDefault();
        setTransform((prev) => ({ ...prev, x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }));
    };
    const handleMouseUp = () => setIsDragging(false);

    const getActivePathNodes = (hoverId: string | null) => {
        if (!hoverId) return null;
        const activeIds = new Set<string>();
        activeIds.add('core');
        if (hoverId === 'core') {
            network.nodes.forEach(n => { if (n.id.startsWith('comp-')) activeIds.add(n.id); });
            return activeIds;
        }
        const parts = hoverId.split('-');
        const type = parts[0];
        const cIdx = parts[1];
        const pIdx = parts[2];
        if (cIdx) activeIds.add(`comp-${cIdx}`);
        if (type === 'comp') {
            network.nodes.forEach(n => {
                if (n.id.startsWith(`proj-${cIdx}-`)) activeIds.add(n.id);
                if (n.id.startsWith(`skill-${cIdx}-`)) activeIds.add(n.id);
            });
        } else if (type === 'proj') {
            activeIds.add(`proj-${cIdx}-${pIdx}`);
            network.nodes.forEach(n => { if (n.id.startsWith(`skill-${cIdx}-${pIdx}-`)) activeIds.add(n.id); });
        } else if (type === 'skill') {
            activeIds.add(`proj-${cIdx}-${pIdx}`);
            activeIds.add(hoverId);
        }
        return activeIds;
    };

    const activeNodeIds = useMemo(() => getActivePathNodes(hoveredNode), [hoveredNode, network]);
    const isNodeActive = (id: string) => { if (!activeNodeIds) return true; return activeNodeIds.has(id); };
    const isLinkActive = (sId: string, tId: string) => { if (!activeNodeIds) return true; return activeNodeIds.has(sId) && activeNodeIds.has(tId); };

    // Skills ONLY revealed when hovering a project or skill node (not company/core)
    const isSkillRevealed = (id: string) => {
        if (!hoveredNode) return false;
        if (hoveredNode.startsWith('proj-') || hoveredNode.startsWith('skill-')) {
            return isNodeActive(id);
        }
        return false;
    };

    const isCoreHovered = hoveredNode === 'core';

    // Compute tooltip direction based on viewport position (accounts for pan + zoom)
    const getTooltipDir = (canvasX: number, canvasY: number) => {
        const el = containerRef.current;
        if (!el) return { below: true, right: true };
        const w = el.clientWidth;
        const h = el.clientHeight;
        const screenX = w / 2 + (canvasX - 1000) * transform.scale + transform.x;
        const screenY = h / 2 + (canvasY - 1000) * transform.scale + transform.y;
        return {
            below: screenY < h * 0.45,   // node in top 45% → tooltip below
            right: screenX < w * 0.45,    // node in left 45% → tooltip right
        };
    };

    // ═══ LIST VIEW ═══
    const renderListView = () => (
        <div className="w-full max-w-4xl mx-auto pt-24 pb-12 px-6">
            <div className="mb-12">
                <div className="font-dot-matrix text-[9px] uppercase tracking-[0.3em] text-black/30 dark:text-white/30 mb-2">SYS.CAREER_LOG</div>
                <h1 className="text-4xl font-bold uppercase tracking-widest text-black dark:text-white border-b border-black/10 dark:border-white/10 pb-4">Experience Architecture</h1>
            </div>
            <div className="space-y-0">
                {experiences.map((exp, idx) => (
                    <div key={idx} className="relative group border border-black/10 dark:border-white/10 p-8 hover:border-[#ff0000] transition-colors duration-300 -mt-px">
                        <div className="absolute -left-px top-0 w-px h-full bg-black/10 dark:bg-white/10"></div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                            <div className="flex items-start md:items-center gap-4 flex-wrap min-w-[280px]">
                                {(exp.logo || exp.image) && (
                                    <div className="shrink-0 opacity-80 flex items-center bg-white dark:bg-white p-1.5 grayscale contrast-125">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={assetUrl((exp.logo || exp.image) as string)} loading="lazy" width={32} height={32} className="object-contain h-6 w-auto" alt={exp.company} />
                                    </div>
                                )}
                                <div className="break-words max-w-full">
                                    <h2 className="text-base font-bold uppercase text-black dark:text-white tracking-wide">{exp.company}</h2>
                                    <h3 className="font-dot-matrix text-[11px] text-[#ff0000] uppercase tracking-wider mt-1">{exp.title}</h3>
                                </div>
                            </div>
                            <div className="font-dot-matrix text-[10px] text-black/40 dark:text-white/40 uppercase tracking-widest border border-black/10 dark:border-white/10 px-3 py-1 whitespace-nowrap shrink-0">{renderTimeline(exp.time)}</div>
                        </div>
                        <div className="font-dot-matrix text-[9px] uppercase tracking-[0.2em] text-black/30 dark:text-white/30 mb-2">{extractProjectName(exp.content)}</div>
                        <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed mb-6 text-justify">{exp.content.replace(/^\[.*?\]\s*/, '')}</p>
                        {exp.tech_badge && exp.tech_badge.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {exp.tech_badge.map((skill, sIdx) => (
                                    <span key={sIdx} className="font-dot-matrix text-[9px] uppercase tracking-widest px-2 py-1 border border-black/10 dark:border-white/10 hover:border-[#ff0000] hover:text-[#ff0000] transition-colors text-black/40 dark:text-white/40">[ {skill} ]</span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div
            ref={containerRef}
            className={`relative w-full min-h-screen bg-white dark:bg-[#050505] ${isListView ? 'overflow-y-auto' : 'overflow-hidden touch-none select-none'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className="absolute inset-0 noise-bg pointer-events-none z-0"></div>

            {/* TOGGLE BUTTON — fixed below navbar */}
            <div className="fixed top-20 right-8 z-50">
                <button
                    onClick={() => setIsListView(!isListView)}
                    className="font-dot-matrix text-[10px] uppercase tracking-widest px-4 py-2 border border-black/20 dark:border-white/20 text-black/60 dark:text-white/60 bg-white dark:bg-[#050505] hover:border-[#ff0000] hover:text-[#ff0000] transition-colors duration-300"
                >
                    {isListView ? '[ NETWORK VIEW ]' : '[ LIST VIEW ]'}
                </button>
            </div>

            {isListView ? (
                renderListView()
            ) : (
                <div
                    ref={canvasRef}
                    className={`absolute top-1/2 left-1/2 w-[2000px] h-[2000px] -ml-[1000px] -mt-[1000px] origin-center ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    style={{
                        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}
                >
                    {/* SVG LINES — skill links hidden when skills not revealed */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {network.links.map((link, i) => {
                            const active = isLinkActive(link.sourceId, link.targetId);
                            const isHoveredPath = hoveredNode && activeNodeIds?.has(link.sourceId) && activeNodeIds?.has(link.targetId);
                            const isSkillLink = link.targetId.startsWith('skill-');
                            const visible = !isSkillLink || isSkillRevealed(link.targetId);
                            return (
                                <line
                                    key={`link-${i}`}
                                    x1={link.fromX} y1={link.fromY}
                                    x2={link.toX} y2={link.toY}
                                    stroke={active ? (isHoveredPath ? "#ff0000" : "var(--nothing-border)") : "var(--nothing-border-subtle)"}
                                    strokeWidth="1"
                                    strokeDasharray="2 4"
                                    opacity={visible ? (active ? (isHoveredPath ? 1 : 0.4) : 0.15) : 0}
                                    className="node-transition"
                                />
                            );
                        })}
                    </svg>

                    {/* ═══ CORE NODE ═══ */}
                    <div
                        className={`absolute top-[1000px] left-[1000px] -translate-x-1/2 -translate-y-1/2 ${isCoreHovered ? 'z-[90]' : 'z-40'} flex flex-col items-center cursor-pointer node-transition ${isNodeActive('core') ? 'opacity-100' : 'opacity-20'}`}
                        onMouseEnter={() => handleNodeEnter('core')}
                        onMouseLeave={handleNodeLeave}
                    >
                        <div className={`w-28 h-28 border p-1 bg-white dark:bg-black relative transition-colors duration-300 ${isCoreHovered ? 'border-[#ff0000]' : 'border-black dark:border-white'}`}>
                            <div className="w-full h-full overflow-hidden bg-black relative">
                                <Image src={assetUrl("/images/lai-weng-hong.png")} alt="Profile" fill priority className="object-cover" />
                            </div>
                        </div>

                        {/* Core tooltip */}
                        <div
                            className={`absolute top-32 left-1/2 -translate-x-1/2 w-64 nothing-tooltip p-4 z-[100] transition-all duration-300 ${isCoreHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none -translate-y-2'}`}
                            onMouseEnter={() => handleNodeEnter('core')}
                        >
                            <h3 className="text-black dark:text-white font-bold uppercase tracking-widest text-sm mb-1">LAI WENG HONG</h3>
                            <div className="font-dot-matrix text-[#ff0000] text-[10px] uppercase tracking-widest mb-3 border-b border-black/10 dark:border-white/10 pb-2">SOFTWARE ENGINEER</div>
                            <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-4 text-justify">
                                Specializing in AWS Cloud Engineering and Event-Driven Architectures. Building high-throughput, scalable backend systems.
                            </p>
                            <a href={assetUrl("/lai_weng_hong_cv.pdf")} target="_blank" className="block w-full text-center font-dot-matrix text-[10px] uppercase tracking-widest border border-black dark:border-white text-black dark:text-white py-2 hover:bg-[#ff0000] hover:border-[#ff0000] hover:text-white transition-colors">
                                [ DOWNLOAD CV .PDF ]
                            </a>
                        </div>
                    </div>

                    {/* ═══ DYNAMIC NODES ═══ */}
                    {network.nodes.map((node) => {

                        {/* ─── COMPANY NODE ─── */}
                        if (node.type === 'company') {
                            const data = node.data;
                            const isActive = isNodeActive(node.id);
                            const isHovered = hoveredNode === node.id;
                            return (
                                <div
                                    key={node.id}
                                    className={`absolute ${isHovered ? 'z-[90]' : 'z-30'} flex flex-col items-center cursor-pointer node-transition ${isActive ? 'opacity-100' : 'opacity-20'}`}
                                    style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
                                    onMouseEnter={() => handleNodeEnter(node.id)}
                                    onMouseLeave={handleNodeLeave}
                                >
                                    <div className={`flex items-center gap-3 px-4 py-2 border ${isHovered ? 'border-[#ff0000]' : 'border-black dark:border-white'} glass-pill transition-colors duration-300`}>
                                        {data.logo ? (
                                            <div className={`bg-white p-1.5 flex items-center justify-center transition-all duration-300 ${isHovered ? '' : 'grayscale contrast-125'}`}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={assetUrl(data.logo)} alt={data.company} loading="lazy" className="h-8 w-auto block" />
                                            </div>
                                        ) : (
                                            <div className="h-8 px-3 bg-white flex items-center justify-center text-black font-bold text-[12px] grayscale contrast-125">
                                                {(data.company || 'C')[0]}
                                            </div>
                                        )}
                                    </div>
                                    {/* Company tooltip — viewport-aware direction */}
                                    {(() => {
                                        const dir = getTooltipDir(node.x, node.y);
                                        const posY = dir.below ? 'top-14' : 'bottom-14';
                                        const posX = dir.right ? 'left-0' : 'right-0';
                                        return (
                                            <div
                                                className={`absolute ${posY} ${posX} w-72 nothing-tooltip p-4 z-[100] transition-all duration-300 ${isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                                                onMouseEnter={() => handleNodeEnter(node.id)}
                                            >
                                        <h3 className="text-black dark:text-white font-bold uppercase tracking-widest text-[11px] mb-3 border-b border-black/10 dark:border-white/10 pb-2">{data.company}</h3>
                                        <div className="space-y-3">
                                            {data.roles.map((role: any, idx: number) => (
                                                <div key={idx} className="flex flex-col">
                                                    <span className="font-dot-matrix text-[#ff0000] text-[10px] uppercase tracking-widest">{role.title}</span>
                                                    <span className="font-dot-matrix text-black/30 dark:text-white/30 text-[8px] uppercase tracking-widest mt-0.5">{renderTimeline(role.time)}</span>
                                                </div>
                                            ))}
                                        </div>
                                        </div>
                                        );
                                    })()}
                                </div>
                            );
                        }

                        {/* ─── PROJECT NODE ─── */}
                        if (node.type === 'project') {
                            const data = node.data as Experience;
                            const isActive = isNodeActive(node.id);
                            const isHovered = hoveredNode === node.id;
                            // Viewport-aware direction for label + tooltip
                            const dir = getTooltipDir(node.x, node.y);
                            return (
                                <div
                                    key={node.id}
                                    className={`absolute ${isHovered ? 'z-[90]' : 'z-40'} cursor-crosshair node-transition ${isActive ? 'opacity-100' : 'opacity-20'}`}
                                    style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
                                    onMouseEnter={() => handleNodeEnter(node.id)}
                                    onMouseLeave={handleNodeLeave}
                                >
                                    <div className={`w-3 h-3 border ${isHovered ? 'border-[#ff0000] bg-[#ff0000]' : 'border-black dark:border-white bg-white dark:bg-black'} transition-colors duration-300`} />
                                    {/* Project name label */}
                                    <div className={`absolute top-1/2 -translate-y-1/2 ${dir.right ? 'left-6' : 'right-6'} font-dot-matrix text-[8px] uppercase tracking-widest whitespace-nowrap transition-colors duration-300 ${isHovered ? 'text-[#ff0000]' : 'text-black/30 dark:text-white/30'}`}>
                                        {extractProjectName(data.content)}
                                    </div>
                                    {/* Project tooltip — viewport-aware direction */}
                                    <div
                                        className={`absolute ${dir.below ? 'top-6' : 'bottom-6'} ${dir.right ? 'left-0' : 'right-0'} w-80 nothing-tooltip p-5 z-[100] transition-all duration-300 ${isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                                        onMouseEnter={() => handleNodeEnter(node.id)}
                                    >
                                        <h3 className="text-black dark:text-white font-bold uppercase tracking-widest text-[10px] mb-2 border-b border-black/10 dark:border-white/10 pb-2 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-[#ff0000]"></span> {extractProjectName(data.content)}
                                        </h3>
                                        <p className="text-[11px] text-black/60 dark:text-white/60 leading-relaxed text-justify">{data.content.replace(/^\[.*?\]\s*/, '')}</p>
                                    </div>
                                </div>
                            );
                        }

                        {/* ─── SKILL NODE — hidden by default, revealed on parent hover ─── */}
                        if (node.type === 'skill') {
                            const revealed = isSkillRevealed(node.id);
                            const isHovered = hoveredNode === node.id;
                            return (
                                <div
                                    key={node.id}
                                    className={`absolute ${revealed ? 'z-[80]' : 'z-20'} node-transition ${revealed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                    style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
                                    onMouseEnter={() => handleNodeEnter(node.id)}
                                    onMouseLeave={handleNodeLeave}
                                >
                                    {/* Background padding prevents line overlap */}
                                    <div className={`font-dot-matrix text-[9px] uppercase tracking-widest cursor-default px-2 py-1 bg-white dark:bg-[#050505] transition-colors duration-300 ${isHovered ? 'text-[#ff0000]' : 'text-black/40 dark:text-white/40'}`}>
                                        [ {node.label} ]
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            )}

            {/* Instruction hint — network view only */}
            {!isListView && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-6 pointer-events-none">
                    <span className="font-dot-matrix text-[9px] uppercase tracking-[0.2em] text-black/20 dark:text-white/20">SCROLL TO ZOOM</span>
                    <span className="text-black/10 dark:text-white/10">•</span>
                    <span className="font-dot-matrix text-[9px] uppercase tracking-[0.2em] text-black/20 dark:text-white/20">DRAG TO PAN</span>
                    <span className="text-black/10 dark:text-white/10">•</span>
                    <span className="font-dot-matrix text-[9px] uppercase tracking-[0.2em] text-black/20 dark:text-white/20">HOVER TO EXPLORE</span>
                </div>
            )}
        </div>
    );
}