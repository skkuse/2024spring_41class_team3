const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    },
    plugins: {
      add: [
        new ESLintPlugin({
          extensions: ['js', 'jsx'],
          exclude: 'node_modules',
        }),
      ],
    },
  },
};
