import { readFileSync, writeFileSync, existsSync } from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const now = new Date();
const buildTime = `${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
const cacheVersion = now.toISOString().replace(/[-:T]/g, '').slice(0, 14);

export default {
  input: 'src/app.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    {
      name: 'build-time',
      transform(code) {
        return code.replace(/\bBUILD_TIME\b/g, JSON.stringify(buildTime));
      },
    },
    {
      name: 'cache-bust',
      writeBundle() {
        // Auto-update cache buster in index.html after each build
        const indexPath = 'dist/index.html';
        if (existsSync(indexPath)) {
          let html = readFileSync(indexPath, 'utf8');
          html = html.replace(/bundle\.js\?v=\w+/, `bundle.js?v=${cacheVersion}`);
          writeFileSync(indexPath, html);
        }
      },
    },
    resolve(),
    terser(),
  ],
};
