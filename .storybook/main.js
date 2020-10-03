const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register',
    'storybook-dark-mode/register',
    '@storybook/addon-backgrounds/register',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './.storybook/postcss.config',
            },
          },
        },
      ],
      include: path.resolve(__dirname),
    });

    config.module.rules.push({
      test: /\.s[ca]ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });

    config.module.rules.push({
      test: /\.(jpeg|png|gif|svg)$/,
      loader: 'file-loader?name=[name].[ext]',
    });

    config.module.rules.push({
      test: /.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    config.resolve.alias['@'] = path.resolve(__dirname, '../src');
    config.resolve.alias['public'] = path.resolve(__dirname, '../public');
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
