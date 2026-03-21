import fs from 'fs';
import path from 'path';
import { createTemplate, contentRoot } from './lib/content-tools.mjs';

const [, , kind, slug] = process.argv;

if (!kind || !slug) {
  console.error('Usage: node scripts/libu/new-entry.mjs <agents|workflows|logs|products> <slug>');
  process.exit(1);
}

const allowedKinds = ['agents', 'workflows', 'logs', 'products'];
if (!allowedKinds.includes(kind)) {
  console.error(`Unsupported content type: ${kind}`);
  process.exit(1);
}

const destination = path.join(contentRoot, kind, `${slug}.json`);

if (fs.existsSync(destination)) {
  console.error(`File already exists: ${destination}`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, createTemplate(kind, slug));

console.log(`Created ${destination}`);
