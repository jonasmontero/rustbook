/**
 * nvironment Configuration - Production
 *
 * onfigurações para ambiente de produção.
 * sa API real e otimizações de performance.
 */

export const environment = {
  production: true,
  apiUrl: 'https://api.skycompare.com/api',
  useMockData: false,

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
    name: 'SkyCompare Design System',
    version: '1.0.0',
    environment: 'production',
  },

  // Debug Options
  debug: {
    enableLogs: false,
    showPerformanceMetrics: false,
  },
};
