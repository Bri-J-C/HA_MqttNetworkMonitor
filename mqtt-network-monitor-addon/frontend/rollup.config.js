import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const now = new Date();
const buildTime = `${now.getMonth()+1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;

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
    resolve(),
    terser(),
  ],
};
