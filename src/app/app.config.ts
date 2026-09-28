/**
 * ️ Application Configuration
 *
 * onfiguração principal da aplicação SkyCompare.
 * nclui routing, hydration e error handling.
 */

import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions
} from '@angular/router';
import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding()
    ),
    provideClientHydration(withEventReplay())
  ]
};
