/**
 * rollup.config.browser.js
 * A config for ES6 modules (esm) and browsers (umd).
 * - Includes all dependencies in `npm_modules`.
 *   Where `rollup-plugin-node-resolve` does the actual jobs.
 *   Where `rollup-plugin-commonjs` enable legacy default exports.
 * - Extracts license information from dependencies.
 *   Where `rollup-plugin-license` does the job.
 *   (a) `banner` option reads `banner.tmpl` which contains
 *     `@preserve` keyword. As the license information is being
 *     attached to the top of the bundle, then `rollup-plugin-terser`
 *     ignores the lines when minifying.
 *   (b) `thirdParty` option outputs `dist/dependencies.txt`.
 */
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.module,
            format: 'esm', // ES6 modules
        },
        {
            file: pkg.browser,
            // `iife` is much smaller in size, but does
            // not resolve export default issue.
            format: 'umd',
            name: 'MyLib',
        },
    ],
    plugins: [
        typescript({
            tsconfig: 'tsconfig.json',
        }),
        resolve(),
        commonjs(),
        license({
            banner: {
                content: {
                    file: 'banner.tmpl',
                },
            },
            thirdParty: {
                output: {
                    file: 'dist/dependencies.txt',
                },
            },
        }),
        terser({
            output: {
                comments: (node, comment) => {
                    const { value, type } = comment || {};
                    if (type === 'comment2') { // only for multiline comments
                        return /@preserve/i.test(value);
                    }
                },
            }
        }),
    ]
};