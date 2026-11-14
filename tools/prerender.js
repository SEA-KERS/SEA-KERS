// Turns the server build into a fully static site for Vercel (or any static
// host). Run after `vite build`. Pages, robots.txt, sitemap.xml and
// security.txt are rendered through the same Worker fetch handler Cloudflare
// uses, and its security headers are copied into a vercel.json so the static
// deployment sends the same headers.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const clientDir = join(rootDir, 'apps', 'web', 'dist', 'client');
const serverEntry = join(rootDir, 'apps', 'web', 'dist', 'server', 'index.js');

// path requested -> files written. Pages get both `x.html` and `x/index.html`
// so `/x` and `/x/` resolve on hosts with or without clean URLs.
const ROUTES = [
  { path: '/', files: ['index.html'] },
  { path: '/team', files: ['team.html', 'team/index.html'] },
  { path: '/wins?track=ALL', files: ['wins.html', 'wins/index.html'] },
  { path: '/projects', files: ['projects.html', 'projects/index.html'] },
  { path: '/404', files: ['404.html'], status: 404 },
  { path: '/robots.txt', files: ['robots.txt'] },
  { path: '/sitemap.xml', files: ['sitemap.xml'] },
  { path: '/.well-known/security.txt', files: ['.well-known/security.txt', 'security.txt'] },
];

// Headers the Worker sets that a static host should repeat.
const COPIED_HEADERS = [
  'content-security-policy',
  'cross-origin-opener-policy',
  'permissions-policy',
  'referrer-policy',
  'x-content-type-options',
  'x-frame-options',
];

const IMMUTABLE = 'public, max-age=31536000, immutable';

async function prerender() {
  if (!process.env.VITE_SITE_URL) {
    console.warn('! VITE_SITE_URL is not set: canonical URLs and the sitemap will use http://localhost.');
  }

  const server = await import(pathToFileURL(serverEntry).href);
  const fetchHandler = server.default?.fetch;
  if (typeof fetchHandler !== 'function') {
    throw new Error(`Could not find server.default.fetch in ${serverEntry}`);
  }

  let securityHeaders = [];
  for (const route of ROUTES) {
    const res = await fetchHandler(new Request(`http://localhost${route.path}`));
    const expected = route.status ?? 200;
    if (res.status !== expected) {
      throw new Error(`${route.path} returned ${res.status}, expected ${expected}`);
    }
    const body = await res.text();
    for (const file of route.files) {
      const target = join(clientDir, file);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, body, 'utf8');
    }
    if (route.path === '/') {
      securityHeaders = COPIED_HEADERS.filter((key) => res.headers.has(key)).map((key) => ({
        key,
        value: res.headers.get(key),
      }));
    }
    console.log(`✓ ${route.path} -> ${route.files.join(', ')} (${body.length} bytes)`);
  }

  const vercelConfig = {
    cleanUrls: true,
    headers: [
      { source: '/(.*)', headers: securityHeaders },
      { source: '/assets/(.*)', headers: [{ key: 'Cache-Control', value: IMMUTABLE }] },
    ],
  };
  writeFileSync(join(clientDir, 'vercel.json'), `${JSON.stringify(vercelConfig, null, 2)}\n`, 'utf8');
  console.log(`✓ vercel.json with ${securityHeaders.length} security headers`);
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
