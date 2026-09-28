/**
 * pp Root Component
 *
 * omponente raiz da aplicação SkyCompare Design System.
 * enderiza o RouterOutlet para navegação entre páginas.
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Componente principal - apenas renderiza o router-outlet
}
