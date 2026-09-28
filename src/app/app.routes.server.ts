import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'dashboard',
    renderMode: RenderMode.Server,
  },
  {
    path: 'search',
    renderMode: RenderMode.Server,
  },
  {
    path: 'compare',
    renderMode: RenderMode.Server,
  },
  {
    path: 'analytics',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
