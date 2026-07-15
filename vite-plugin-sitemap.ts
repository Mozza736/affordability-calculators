import type { Plugin } from 'vite';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { SEO_PAGES } from './src/data/seoPages';
import { ALL_LOCATION_PAGES } from './src/data/locationPages';
import { TAKE_HOME_PAGES } from './src/data/takeHomePages';
import { CAR_AFFORDABILITY_PAGES } from './src/data/carAffordabilityPages';

const BASE_URL = 'https://affordabilitycalculators.co.uk';

function buildSitemap(): string {
  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/calculators', priority: '0.8', changefreq: 'monthly' },
    { path: '/about', priority: '0.5', changefreq: 'monthly' },
    { path: '/get-your-plan', priority: '0.7', changefreq: 'monthly' },
    { path: '/how-long-will-my-savings-last', priority: '0.8', changefreq: 'monthly' },
    { path: '/can-i-afford-a-house-in-london-on-50k', priority: '0.9', changefreq: 'monthly' },
    { path: '/mortgage-options', priority: '0.8', changefreq: 'monthly' },
    { path: '/car-affordability', priority: '0.9', changefreq: 'monthly' },
    { path: '/how-much-should-i-spend-on-a-car-uk', priority: '0.9', changefreq: 'monthly' },
    { path: '/house-affordability', priority: '0.8', changefreq: 'monthly' },
    { path: '/rent-affordability', priority: '0.8', changefreq: 'monthly' },
    { path: '/savings-runway', priority: '0.8', changefreq: 'monthly' },
    { path: '/is-300-a-month-car-affordable-uk', priority: '0.9', changefreq: 'monthly' },
    { path: '/is-400-a-month-car-affordable-uk', priority: '0.9', changefreq: 'monthly' },
    { path: '/how-much-mortgage-can-i-afford-on-50k-salary-uk', priority: '0.9', changefreq: 'monthly' },
    { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  ];

  const seoRoutes = SEO_PAGES.map((p) => ({
    path: `/${p.slug}`,
    priority: '0.9',
    changefreq: 'monthly',
  }));

  const locationRoutes = ALL_LOCATION_PAGES.map((p) => ({
    path: `/${p.slug}`,
    priority: '0.9',
    changefreq: 'monthly',
  }));

  const takeHomeRoutes = TAKE_HOME_PAGES.map((p) => ({
    path: `/${p.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  const carAffordabilityRoutes = CAR_AFFORDABILITY_PAGES.map((p) => ({
    path: `/${p.slug}`,
    priority: '0.9',
    changefreq: 'monthly',
  }));

  const today = new Date().toISOString().split('T')[0];
  const allRoutes = [
    ...staticRoutes,
    ...seoRoutes,
    ...locationRoutes,
    ...takeHomeRoutes,
    ...carAffordabilityRoutes,
  ];

  const urls = allRoutes
    .map(
      ({ path, priority, changefreq }) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}

export function sitemapPlugin(): Plugin {
  return {
    name: 'vite-plugin-sitemap',
    apply: 'build',
    closeBundle() {
      const sitemap = buildSitemap();
      mkdirSync(resolve('dist'), { recursive: true });
      writeFileSync(resolve('dist/sitemap.xml'), sitemap, 'utf-8');
      console.log('sitemap.xml generated');
    },
  };
}
