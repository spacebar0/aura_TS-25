// src/components/aura/RadialMenu.tsx
'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export interface RadialMenuItem {
  icon: React.ReactNode;
  label: string;
  action: () => void;
}

interface RadialMenuProps {
  items: RadialMenuItem[];
  children: React.ReactNode;
  radius?: number;
  startAngle?: number;
}

export function RadialMenu({ items, children, radius = 65, startAngle = -90 }: RadialMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  const angleStep = 360 / (items.length || 1);

  return (
    <TooltipProvider delayDuration={100}>
      <div
        className="relative flex items-center justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              {items.map((item, index) => {
                const angle = startAngle + index * angleStep;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <motion.button
                        className="radial-menu-item"
                        style={{
                          // Position from center, then adjust for button size
                          left: `calc(50% + ${x}px - 1.5rem)`,
                          top: `calc(50% + ${y}px - 1.5rem)`,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          item.action();
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ delay: index * 0.04, duration: 0.15 }}
                      >
                        {item.icon}
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={10}>
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
}