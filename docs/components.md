# Component Catalog

## Overview

This catalog documents the components available in the SkyCompare Design System. All components are standalone Angular components built without third-party UI dependencies.

## Atoms

### ButtonAtom (`atom-button`)
* Selector: `atom-button`
* Inputs:
  * `variant`: `'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'` (default: `'primary'`)
  * `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
  * `disabled`: `boolean` (default: `false`)
  * `loading`: `boolean` (default: `false`)
  * `type`: `'button' | 'submit' | 'reset'` (default: `'button'`)
  * `fullWidth`: `boolean` (default: `false`)
* Outputs:
  * `clicked`: `EventEmitter<MouseEvent>`

### BadgeAtom (`atom-badge`)
* Selector: `atom-badge`
* Inputs:
  * `variant`: `'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'` (default: `'primary'`)
  * `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
  * `pill`: `boolean` (default: `false`)

### IconAtom (`atom-icon`)
* Selector: `atom-icon`
* Inputs:
  * `name`: Supported SVG icon name (e.g., `'search'`, `'plane'`, `'calendar'`, `'filter'`)
  * `size`: `number | string` (default: `20`)
  * `color`: `string` (CSS color value)

### InputAtom (`atom-input`)
* Selector: `atom-input`
* Inputs:
  * `type`: `'text' | 'email' | 'password' | 'number' | 'tel'` (default: `'text'`)
  * `placeholder`: `string`
  * `value`: `string`
  * `disabled`: `boolean` (default: `false`)
  * `readonly`: `boolean` (default: `false`)
  * `error`: `boolean` (default: `false`)
* Outputs:
  * `valueChange`: `EventEmitter<string>`

## Molecules

### StatCardMolecule (`molecule-stat-card`)
* Selector: `molecule-stat-card`
* Inputs:
  * `title`: `string`
  * `value`: `string | number`
  * `change`: `number` (percentage difference)
  * `changeType`: `'increase' | 'decrease' | 'neutral'`
  * `icon`: `string`
  * `variant`: `'default' | 'primary' | 'success' | 'warning'`

### FlightTimeMolecule (`molecule-flight-time`)
* Selector: `molecule-flight-time`
* Inputs:
  * `departureTime`: `string`
  * `arrivalTime`: `string`
  * `departureCode`: `string`
  * `arrivalCode`: `string`
  * `duration`: `string`
  * `stops`: `number`

## Organisms

### FlightCardOrganism (`organism-flight-card`)
* Selector: `organism-flight-card`
* Inputs:
  * `flight`: `FlightModel`
  * `selected`: `boolean` (default: `false`)
* Outputs:
  * `select`: `EventEmitter<FlightModel>`

### PriceChartOrganism (`organism-price-chart`)
* Selector: `organism-price-chart`
* Inputs:
  * `data`: `PriceHistoryModel[]`
  * `period`: `'7d' | '30d' | '90d'` (default: `'30d'`)
* Outputs:
  * `periodChange`: `EventEmitter<'7d' | '30d' | '90d'>`

### SearchFormOrganism (`organism-search-form`)
* Selector: `organism-search-form`
* Inputs:
  * `initialValues`: `Partial<SearchModel>`
  * `loading`: `boolean` (default: `false`)
* Outputs:
  * `search`: `EventEmitter<SearchModel>`

## Templates

### DashboardLayoutTemplate (`template-dashboard-layout`)
* Selector: `template-dashboard-layout`
* Inputs:
  * `sidebarCollapsed`: `boolean`
  * `userName`: `string`
  * `activeRoute`: `string`
* Outputs:
  * `sidebarToggle`: `EventEmitter<void>`
  * `navigate`: `EventEmitter<string>`
