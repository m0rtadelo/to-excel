// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    main: './src/web.ts',
  },
  output: {
    path: path.resolve(__dirname, './out'),
    filename: 'toExcel.js', // <--- Will be compiled to this single file
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.bro.json',
        },
      },
    ],
  },
};
