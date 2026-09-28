/**
 * App Root Component
 *
 * Root component of the SkyCompare application.
 * Hosts the primary RouterOutlet for view navigation.
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LiveStudioComponent } from './design-system/studio/live-studio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LiveStudioComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'SkyCompare';
}
