/**
 * pplication Routes Configuration
 *
 * onfiguração de rotas da aplicação SkyCompare.
 * odas as rotas usam lazy loading para otimização de performance.
 */

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./design-system/pages/home-page/home-page.component')
        .then(m => m.HomePageComponent),
    title: 'Dashboard - SkyCompare'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./design-system/pages/home-page/home-page.component')
        .then(m => m.HomePageComponent),
    title: 'Dashboard - SkyCompare'
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./design-system/pages/search-page/search-page.component')
        .then(m => m.SearchPageComponent),
    title: 'Buscar Voos - SkyCompare'
  },
  {
    path: 'compare',
    loadComponent: () =>
      import('./design-system/pages/comparison-page/comparison-page.component')
        .then(m => m.ComparisonPageComponent),
    title: 'Comparar Voos - SkyCompare'
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./design-system/pages/analytics-page/analytics-page.component')
        .then(m => m.AnalyticsPageComponent),
    title: 'Analytics - SkyCompare'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
