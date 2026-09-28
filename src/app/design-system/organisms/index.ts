/**
 * rganisms - Nível 3 do Atomic Design
 * rupos de moléculas e átomos formando seções complexas
 *
 * EGRA: Organismos PODEM importar átomos (../atoms/index) e moléculas (../molecules/index)
 * EGRA: Organismos NÃO podem importar outros organismos
 */

// Batch 3A: Componentes Core de Voos
export * from './flight-card';
export * from './search-form';
export * from './flight-list';

// Batch 3B: Visualização de Dados
export * from './price-chart';
export * from './comparison-table';
export * from './benefits-grid';
export * from './season-calendar';

// Batch 3D: Charts Analytics (Novos Gráficos)
export * from './pie-chart';
export * from './column-chart';
export * from './bar-chart';
export * from './area-chart';

// Batch 3C: Layout
export * from './header';
export * from './sidebar';
export * from './stats-row';
