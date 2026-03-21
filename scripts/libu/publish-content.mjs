import { loadContent, writeGeneratedModule } from './lib/content-tools.mjs';

const data = loadContent();
writeGeneratedModule(data);

console.log('Libu publish pipeline completed.');
console.log('Next steps:');
console.log('1. npm run build');
console.log('2. git status');
console.log('3. git add . && git commit -m "Publish content update"');
console.log('4. git push');
