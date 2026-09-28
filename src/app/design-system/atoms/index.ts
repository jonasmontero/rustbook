/**
 * toms - Nível 1 do Atomic Design
 * omponentes mais básicos e indivisíveis
 *
 * EGRA: Átomos NÃO podem importar outros componentes
 *
 * se este arquivo para importar múltiplos átomos de uma vez.
 *
 * @example
 * import { ButtonAtom, IconAtom, TextAtom } from './atoms';
 */

// Batch 1A: Fundações
export * from './icon';
export * from './text';
export * from './spinner';

// Batch 1B: Formulários
export * from './input';
export * from './label';
export * from './button';

// Batch 1C: Display
export * from './badge';
export * from './avatar';
export * from './tooltip';
export * from './divider';
