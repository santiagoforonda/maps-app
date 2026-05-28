const fs = require('fs');
const path = require('path');

const content = `export const environment = {
  production: true,
  mapboxToken: '${process.env.MAP_BOX || ''}'
};
`;

fs.mkdirSync(path.resolve(__dirname, '../src/environments'), { recursive: true });
fs.writeFileSync(path.resolve(__dirname, '../src/environments/environment.ts'), content);
console.log('✅ environment.ts generado');
