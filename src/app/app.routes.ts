/**
 * Application Routes Configuration
 *
 * Route definitions for the SkyCompare application.
 * All route components are loaded lazily for optimal performance.
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
    title: 'Search Flights - SkyCompare'
  },
  {
    path: 'compare',
    loadComponent: () =>
      import('./design-system/pages/comparison-page/comparison-page.component')
        .then(m => m.ComparisonPageComponent),
    title: 'Compare Flights - SkyCompare'
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./design-system/pages/analytics-page/analytics-page.component')
        .then(m => m.AnalyticsPageComponent),
    title: 'Analytics - SkyCompare'
  },
  {
    path: 'workbench',
    loadComponent: () =>
      import('./design-system/pages/workbench-page/workbench-page.component')
        .then(m => m.WorkbenchPageComponent),
    title: 'Component Workbench - Design System'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
