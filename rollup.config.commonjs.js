/**
 * rollup.config.commonjs.js
 * A config for CommonJS (cjs).
 * - Excludes NPM dependencies.
 * - Minifies all.
 *   (where `rollup-plugin-terser` does the job)
 */
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

// Constructing `external` and `globals` for NPM dependencies.
// `external` specifies which NPM modules to externalize.
// `globals` provides a map of names for the externals.
let external = [];
let globals = {};

[pkg.dependencies, pkg.peerDependencies].forEach((o = {}) => {
    Object.keys(o).forEach((key) => {
        if (key.indexOf('@types') === -1) {
            external.push(key);
            globals[key] = key;
        }
    });
});

export default {
    input: 'src/index.ts',
    external,
    output: [
        {
            file: pkg.main,
            format: 'cjs', // CommonJS
            globals,
        },
    ],
    plugins: [
        typescript({
            tsconfig: 'tsconfig.json',
        }),
        terser(), // Regardless of LICENSE info, minifies all.
    ]
};