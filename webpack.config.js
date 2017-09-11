const path = require('path')

// configs
const js = [
  {
    entry: [
      path.join(__dirname, 'views/+.js'),
    ],
    output: path.join(__dirname, 'public/bundle.min.js'),
  },
]
const scss = [
  {
    entry: [
      path.join(__dirname, 'views/+.scss'),
    ],
    output: path.join(__dirname, 'public/bundle.min.css'),
  },
]

//
const stats = {
  assets: true,
  cached: false,
  cachedAssets: true,
  children: false,
  chunks: false,
  chunkModules: false,
  chunkOrigins: false,
  colors: true,
  depth: false,
  entrypoints: false,
  errors: true,
  errorDetails: true,
  hash: false,
  modules: false,
  moduleTrace: true,
  performance: true,
  providedExports: false,
  publicPath: true,
  reasons: true,
  source: true,
  timings: true,
  usedExports: false,
  version: false,
  warnings: true,
}
//
function buildJS (bundles, opts = {}) {
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

  function config (bundle) {
    return {
      stats: stats,
      entry: bundle.entry,
      output: {
        path: path.dirname(bundle.output),
        filename: path.basename(bundle.output),
      },
      watch: !!opts.watch,
      module: {
        loaders: [{
          test: /\Wws\W/,
          use: 'null-loader',
        }, {
          test: /\.jsx?$/,
          exclude: [/node_modules/],
          loader: 'babel-loader',
          query: {
            presets: [['env', {
              targets: {
                browsers: ['> 0%'],
              },
            }]],
            plugins: [
              'transform-class-properties',
              'transform-decorators',
              'transform-es2015-modules-umd',
              'transform-runtime',
            ],
          },
        }],
      },
      plugins: [
        new UglifyJSPlugin({
          sourceMap: true,
        }),
      ],
      devtool: 'source-map',
    }
  }
  const configs = []
  bundles.forEach(bundle => {
    configs.push(config(bundle))
  })
  return configs
}
function buildScss (bundles, opts = {}) {
  const ExtractTextPlugin = require('extract-text-webpack-plugin')
  const cssMqpacker = require('css-mqpacker')
  const discardDuplicates = require('postcss-discard-duplicates')
  const mergeRules = require('postcss-merge-rules')
  const autoprefixer = require('autoprefixer')
  const cssnano = require('cssnano')

  function config (bundle) {
    return {
      stats: stats,
      entry: bundle.entry,
      output: {
        path: path.dirname(bundle.output),
        filename: path.basename(bundle.output),
      },
      watch: !!opts.watch,
      module: {
        loaders: [{
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2,
                minimize: true,
                url: false,
              },
            }, {
              loader: 'postcss-loader',
              options: {
                sourceMap: 'inline',
                plugins: [
                  cssMqpacker(),
                  discardDuplicates(),
                  mergeRules(),
                  autoprefixer({
                    browsers: ['> 0%'],
                  }),
                  cssnano(),
                ],
              },
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sourceMapRoot: path.relative(
                  path.dirname(bundle.output),
                  __dirname
                ),
                importer: require('node-sass-glob-once'),
              },
            }],
          }),
        }],
      },
      plugins: [
        new ExtractTextPlugin({
          filename: path.basename(bundle.output),
        }),
      ],
      devtool: 'source-map',
    }
  }
  const configs = []
  bundles.forEach(bundle => {
    configs.push(config(bundle))
  })
  return configs
}

//
module.exports = function (env, argv) {
  if (env['build-js']) {
    return buildJS(js)
  }
  if (env['build-scss']) {
    return buildScss(scss)
  }
  if (env['watch']) {
    return [].concat(
      buildJS(js, {watch: true}),
      buildScss(scss, {watch: true})
    )
  }
}
