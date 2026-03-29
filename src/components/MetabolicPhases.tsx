'use client';
import { useState } from 'react';
import { METABOLIC_PHASES, getCurrentPhase } from '@/lib/phases';

interface MetabolicPhasesProps {
  elapsedSeconds: number;
  fastingGoalHours: number;
}

export default function MetabolicPhases({ elapsedSeconds, fastingGoalHours }: MetabolicPhasesProps) {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const elapsedHours = elapsedSeconds / 3600;
  const currentPhase = getCurrentPhase(elapsedHours);

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">Metabolic Phases</h2>

      {/* Overall progress bar */}
      <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-green-500 to-cyan-500 rounded-full transition-all duration-1000"
          style={{ width: `${Math.min(100, (elapsedHours / Math.max(fastingGoalHours, 24)) * 100)}%` }}
        />
      </div>

      {/* Phase cards */}
      <div className="space-y-2">
        {METABOLIC_PHASES.map((phase) => {
          const isReached = elapsedHours >= phase.startHours;
          const isCurrent = currentPhase.id === phase.id;
          const isExpanded = expandedPhase === phase.id;

          return (
            <div
              key={phase.id}
              onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
              className={`rounded-xl p-3 cursor-pointer transition-all border ${
                isCurrent
                  ? 'border-green-400 shadow-md shadow-green-100 dark:shadow-green-900/20'
                  : isReached
                  ? 'border-gray-200 dark:border-gray-700'
                  : 'border-gray-100 dark:border-gray-800 opacity-50'
              }`}
              style={{ backgroundColor: isCurrent ? phase.bgColor : undefined }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{phase.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm ${isCurrent ? 'text-gray-800' : 'text-gray-600 dark:text-gray-400'}`}>
                      {phase.name}
                    </span>
                    {isCurrent && (
                      <span className="text-xs px-2 py-0.5 bg-green-600 text-white rounded-full animate-pulse">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{phase.description}</div>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap">{phase.startHours}–{phase.endHours}h</div>
                <span className="text-gray-400 text-sm">{isExpanded ? '▲' : '▼'}</span>
              </div>
              {isExpanded && (
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                  {phase.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
