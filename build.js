import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// Inspired by
// https://rollupjs.org/guide/en/#rolluprollup
const buildBundle = async ({ inputOptions, outputOptions }) => {
  const bundle = await rollup(inputOptions);
  const { output } = await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
  await bundle.close();
};

const buildClient = async () => {
  await buildBundle({
    inputOptions: {
      input: 'client.js',
      plugins: [ nodeResolve(), commonjs() ],
      external: ['sharedb/lib/client'],
    },
    outputOptions: {
      file: 'bundle.js',
      format: 'iife',
    },
  });
};

buildClient();
