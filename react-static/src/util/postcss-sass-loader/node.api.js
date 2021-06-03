import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';

export default ({ cssLoaderConfigOptions = {}, sassIncludePaths = [] }) => ({
  webpack: (config, { stage }) => {
    let loaders = [];

    const cssLoaderOptions = {
      importLoaders: 2,
      modules: false,
      camelCase: true,
      localIdentName: stage === 'dev' ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:5]',
      sourceMap: true,
      ...cssLoaderConfigOptions,
    };
    const cssLoader = {
      loader: 'css-loader',
      options: cssLoaderOptions,
    };
    const postcssLoader = {
      loader: 'postcss-loader',
      options: {
        config: {
          // File must be named in one of these formats:
          // https://github.com/michael-ciniawsky/postcss-load-config#usage
          path: 'src/configuration/',
        },
      },
    };
    const sassLoader = {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        sassOptions: {
          includePaths: ['src/', ...sassIncludePaths],
        },
      },
    };

    if (stage === 'dev') {
      // Dev
      loaders = [
        // {
        //   loader: ExtractCssChunks.loader,
        //   options: {
        //     hot: true,
        //   },
        // },
        'style-loader',
        cssLoader,
        postcssLoader,
        sassLoader,
      ];
    } else if (stage === 'node') {
      // Node
      // Don't extract css to file during node build process
      loaders = [
        {
          ...cssLoader,
          loader: 'css-loader',
          options: {
            ...cssLoaderOptions,
            exportOnlyLocals: true,
          },
        },
        postcssLoader,
        sassLoader,
      ];
    } else {
      // Prod
      loaders = [ExtractCssChunks.loader, cssLoader, postcssLoader, sassLoader];
    }

    config.module.rules[0].oneOf.unshift({
      test: /\.s(a|c)ss$/,
      use: loaders,
    });

    // config.plugins.push(new ExtractCssChunks());

    return config;
  },
});
