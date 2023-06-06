import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-delete";
import terser from '@rollup/plugin-terser';

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'dist/vector-math.js',
				sourcemap: true,
				format: 'umd',
				name: 'VECTOR_MATH',
			},
			{
				file: 'dist/vector-math.min.js',
				sourcemap: true,
				format: 'umd',
				name: 'VECTOR_MATH',
				plugins: [
					terser(),
				],
			},
		],
		plugins: [
			resolve({
				browser: true,
			}),
			commonjs(),
			typescript({
				sourceMap: true,
				inlineSources: true,
			}),
		],
	},
	{
		input: "./dist/index.d.ts",
		output: [{ file: "dist/vector-math.d.ts", format: "es" }],
		plugins: [
			dts(),
			del({ hook: "buildEnd", targets: ["./dist/*.d.ts", "./dist/*/"] }),
		],
	},
];