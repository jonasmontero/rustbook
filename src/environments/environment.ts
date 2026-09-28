/**
 * nvironment Configuration - Development
 *
 * onfigurações para ambiente de desenvolvimento local.
 * sa dados mockados e configurações de debug habilitadas.
 */

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  useMockData: true,

  // GitHub Configuration
  github: {
    enabled: false,
    token: '',
    repositoryUrl: '',
    owner: '',
    repo: '',
  },

  // Feature Flags
  features: {
    analytics: true,
    comparison: true,
    search: true,
  },

  // App Configuration
  app: {
    name: 'SkyCompare Design System',
    version: '1.0.0',
    environment: 'development',
  },

  // Debug Options
  debug: {
    enableLogs: true,
    showPerformanceMetrics: true,
  },
};
