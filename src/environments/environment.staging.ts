/**
 * nvironment Configuration - Staging
 *
 * onfigurações para ambiente de staging/homologação.
 * sa API real mas com dados de teste.
 */

export const environment = {
  production: false,
  apiUrl: 'https://staging-api.skycompare.com/api',
  useMockData: false, // Usar API real em staging

  // GitHub Configuration
  github: {
    enabled: true,
    token: process.env['GITHUB_TOKEN'] || '',
    repositoryUrl: process.env['GITHUB_REPO_URL'] || '',
    owner: process.env['GITHUB_OWNER'] || '',
    repo: process.env['GITHUB_REPO'] || '',
  },

  // Feature Flags
  features: {
    analytics: true,
    comparison: true,
    search: true,
  },

  // App Configuration
  app: {
    name: 'SkyCompare Design System (Staging)',
    version: '1.0.0',
    environment: 'staging',
  },

  // Debug Options
  debug: {
    enableLogs: true,
    showPerformanceMetrics: false,
  },
};
