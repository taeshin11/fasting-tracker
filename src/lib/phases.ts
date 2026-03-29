export interface MetabolicPhase {
  id: string;
  name: string;
  emoji: string;
  startHours: number;
  endHours: number;
  description: string;
  detail: string;
  color: string;
  bgColor: string;
}

export const METABOLIC_PHASES: MetabolicPhase[] = [
  {
    id: 'fed',
    name: 'Fed State',
    emoji: '🍽️',
    startHours: 0,
    endHours: 4,
    description: 'Digesting & absorbing nutrients',
    detail: 'Insulin is elevated, body is processing the last meal. Blood glucose is rising then stabilizing.',
    color: '#f59e0b',
    bgColor: '#fef3c7',
  },
  {
    id: 'early',
    name: 'Early Fasting',
    emoji: '⚖️',
    startHours: 4,
    endHours: 8,
    description: 'Blood sugar stabilizing',
    detail: 'Insulin levels dropping. Body starts using stored glycogen for energy. Hunger may peak then diminish.',
    color: '#10b981',
    bgColor: '#d1fae5',
  },
  {
    id: 'fatburn',
    name: 'Fat Burning',
    emoji: '🔥',
    startHours: 8,
    endHours: 12,
    description: 'Body switching to fat for fuel',
    detail: 'Glycogen stores depleting. Fat oxidation increasing. Mental clarity often improves. Growth hormone starting to rise.',
    color: '#f97316',
    bgColor: '#ffedd5',
  },
  {
    id: 'ketosis',
    name: 'Ketosis',
    emoji: '⚡',
    startHours: 12,
    endHours: 18,
    description: 'Ketone production increasing',
    detail: 'Liver producing ketone bodies. Brain shifting to ketone fuel. Anti-inflammatory effects begin. Insulin at its lowest.',
    color: '#8b5cf6',
    bgColor: '#ede9fe',
  },
  {
    id: 'deep',
    name: 'Deep Ketosis / Autophagy',
    emoji: '🌟',
    startHours: 18,
    endHours: 72,
    description: 'Cellular cleanup activated',
    detail: 'Autophagy ramping up — cells recycling damaged components. Maximum fat burning. Significant anti-aging benefits. Immune system renewal.',
    color: '#06b6d4',
    bgColor: '#cffafe',
  },
];

export function getCurrentPhase(elapsedHours: number): MetabolicPhase {
  for (let i = METABOLIC_PHASES.length - 1; i >= 0; i--) {
    if (elapsedHours >= METABOLIC_PHASES[i].startHours) {
      return METABOLIC_PHASES[i];
    }
  }
  return METABOLIC_PHASES[0];
}

export function getPhaseProgress(elapsedHours: number, phase: MetabolicPhase): number {
  const duration = phase.endHours - phase.startHours;
  const inPhase = Math.max(0, elapsedHours - phase.startHours);
  return Math.min(1, inPhase / duration);
}

export function getTotalProgress(elapsedHours: number, fastingGoalHours: number): number {
  return Math.min(1, elapsedHours / fastingGoalHours);
}
