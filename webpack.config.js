// webpack.config.js
import { resolve as _resolve } from 'path';

export default {
  mode: 'none',
  entry: './src/client/scripts.ts',
  target: 'web',
  output: {
    filename: 'scripts.js',
    path: _resolve(new URL('public/js', import.meta.url).pathname),
    // module: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};