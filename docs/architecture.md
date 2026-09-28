# Architecture Documentation

## Overview

SkyCompare is a flight comparison platform and design system built with Angular 21 and Storybook 10. The system employs Atomic Design methodology to guarantee component reusability, isolation, and scalability.

## Architectural Layers

The design system is structured into five distinct Atomic Design tiers:

### 1. Atoms (`src/app/design-system/atoms`)
Atoms represent the basic HTML elements and primitives. They are stateless, agnostic of business context, and configurable purely through input properties.
* `AvatarAtom`: User profile and airline image containers with fallback placeholders.
* `BadgeAtom`: Status indicators, tags, and alert counters.
* `ButtonAtom`: Interactive action triggers with primary, secondary, danger, and ghost variants.
* `DividerAtom`: Visual separation lines with horizontal and vertical orientations.
* `IconAtom`: Inline SVG vector icons mapped by icon name.
* `InputAtom`: Single-line text, email, number, and password entry fields.
* `LabelAtom`: Text labels for inputs and standalone indicators.
* `SpinnerAtom`: Circular loading indicators with multiple size tokens.
* `TextAtom`: Typography abstraction supporting headings, body, and caption scales.
* `TooltipAtom`: Contextual popover messages anchored to trigger elements.

### 2. Molecules (`src/app/design-system/molecules`)
Molecules combine two or more atoms to perform specific UI actions.
* `AirlineLogoMolecule`: Airline branding combining Avatar and Text.
* `AlertMessageMolecule`: Notification banners combining Icon, Text, and Badge.
* `BenefitItemMolecule`: Feature rows with status icons and descriptive labels.
* `DatePickerMolecule`: Date selection field with formatted display and range indicators.
* `FlightTimeMolecule`: Departure and arrival timestamp display with duration indicators.
* `PassengerSelectorMolecule`: Increment and decrement counters for passenger breakdown.
* `PriceRangeMolecule`: Dual thumb slider for price filtering.
* `PriceTagMolecule`: Currency formatted price display with discount indicators.
* `SearchFieldMolecule`: Input field with embedded search icon and clear trigger.
* `StatCardMolecule`: Metric summary card with value, title, and trend indicator.

### 3. Organisms (`src/app/design-system/organisms`)
Organisms assemble molecules and atoms into cohesive functional sections of an interface.
* `AreaChartOrganism`: Responsive SVG area graph for trend analysis.
* `BarChartOrganism`: Categorical bar visualization for comparative data.
* `BenefitsGridOrganism`: Matrix layout displaying airline amenities.
* `ColumnChartOrganism`: Vertical column visualization for time series metrics.
* `ComparisonTableOrganism`: Multi-column matrix comparing flight attributes.
* `FlightCardOrganism`: Detailed flight itinerary card with price, airline, duration, and selection trigger.
* `FlightListOrganism`: Scrollable and sortable container for flight cards with empty and loading states.
* `HeaderOrganism`: Top navigation bar containing branding, global search, and user profile.
* `PieChartOrganism`: SVG distribution chart for market share and category allocations.
* `PriceChartOrganism`: Multi-airline price comparison line and area visualization.
* `SearchFormOrganism`: Complete flight search form with origins, destinations, dates, and passengers.
* `SeasonCalendarOrganism`: 12-month calendar heatmap showing seasonal fare fluctuations.
* `SidebarOrganism`: Collapsible side navigation menu with active route tracking.
* `StatsRowOrganism`: Responsive grid layout aggregating key summary metrics.

### 4. Templates (`src/app/design-system/templates`)
Templates arrange organisms into page layouts, defining structural grids and slots for dynamic content.
* `DashboardLayoutTemplate`: Standard administrative layout featuring a sidebar, header, and main content area.
* `SearchResultsLayoutTemplate`: Sticky search bar layout with a toggleable filters sidebar and result feed.
* `ComparisonLayoutTemplate`: Tabbed layout providing price graphs, feature grids, and comparison matrices.

### 5. Pages (`src/app/design-system/pages`)
Pages are routed views that bind templates with real or mock data stores and manage business events.
* `HomePageComponent`: Overview dashboard showing high-level stats, price trends, seasonal calendars, and recent flights.
* `SearchPageComponent`: Flight exploration view with real-time filtering by airline, stops, and price range.
* `ComparisonPageComponent`: Detailed side-by-side flight comparison with analytical insights.
* `AnalyticsPageComponent`: Comprehensive metric dashboard including market share, monthly fare evolutions, and volume stats.
* `WorkbenchPageComponent`: Interactive design system gallery and testbed for all atoms, molecules, and organisms.

### 6. Live Studio & Theme Customizer (`src/app/design-system/studio`)
* `LiveStudioComponent`: In-browser visual customizer drawer allowing real-time color picking, border radius tuning, font selection, dark/light theme switching, and live component knob manipulation.
* `ThemeStudioService`: Reactive token engine using Angular Signals to dynamically mutate CSS custom properties on `document.documentElement` and export CSS/JSON configurations.

## Multi-Domain Isolation Architecture

The repository isolates foundational elements from domain-specific kits:
* `@core-ui`: Foundational atoms (buttons, inputs, badges, avatars, icons, tooltips), theme tokens, layout templates, and live studio tooling.
* `@travel-ui` (Active): Travel-specific molecules and organisms (flight cards, search forms, season calendars, comparison matrices, airline branding).
* Future Domain Kits (Incremental Evolution):
  * `@finance-ui`: Payment methods, transaction lists, invoice cards, financial statement summaries.
  * `@ecommerce-ui`: Product cards, price competitor radars, inventory badges, cart drawers.

## Design Tokens and Styling System

The styling layer relies on SCSS tokens located in `src/styles/`:
* `_tokens.scss`: CSS custom properties and SCSS maps defining color scales, shadows, radii, and z-index layers.
* `_typography.scss`: Font family definitions, weight mappings, font sizes, and line-height tokens.
* `_variables.scss`: Global spacing tokens based on a 4px grid.
* `_mixins.scss`: Breakpoint helpers, flexbox shortcuts, and glassmorphism utility mixins.

## Routing Architecture

The routing configuration in `src/app/app.routes.ts` uses Angular standalone route definitions with lazy loading:
* `/`: Loads `HomePageComponent` directly.
* `/dashboard`: Loads `HomePageComponent`.
* `/search`: Loads `SearchPageComponent`.
* `/compare`: Loads `ComparisonPageComponent`.
* `/analytics`: Loads `AnalyticsPageComponent`.
* `/workbench`: Loads `WorkbenchPageComponent`.
* `/**`: Wildcard route redirecting to root.

## License

MIT License (c) 2026 Jonas Monteiro.
