const gulp = require('gulp')
const rename = require('gulp-rename')
const path = require('path')

// configs
// - js
const jsEntry = './@components/+.js'
const jsBundle = './bundle.min.js'
// - scss
const scssEntry = './@components/+.scss'
const scssBundle = './bundle.min.css'
const scssFiles = ['./@components/**/*.scss']

// watch
gulp.task('watch', function () {
  buildJS({isWatch: true})
  buildScss({isWatch: true})
  runServer({isWatch: true})
})

// js
function buildJS ({isWatch}) {
  const webpack = require('webpack-stream')
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
  const uglifyJSPlugin = new UglifyJSPlugin({
    sourceMap: true,
  })

  return gulp
    .src('')
    .pipe(webpack({
      entry: [jsEntry],
      output: {
        filename: jsBundle,
      },
      watch: isWatch,
      module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: [/node_modules/, /bower_components/],
          loader: 'babel-loader',
          query: {
            presets: [['env', {
              targets: {
                browsers: ['> 0%'],
              },
            }]],
            plugins: [
              'transform-decorators',
              'transform-es2015-modules-umd',
              'transform-runtime',
            ],
          },
        }],
      },
      plugins: [uglifyJSPlugin],
      devtool: 'source-map',
    }))
    .pipe(gulp.dest(''))
}
gulp.task('build-js', function () {
  return buildJS({isWatch: false})
})

// scss
function buildScss ({isWatch}) {
  const sass = require('gulp-sass')
  const postcss = require('gulp-postcss')
  const sourcemaps = require('gulp-sourcemaps')
  const cssMqpacker = require('css-mqpacker')
  const discardDuplicates = require('postcss-discard-duplicates')
  const mergeRules = require('postcss-merge-rules')
  const autoprefixer = require('autoprefixer')
  const cssnano = require('cssnano')

  if (isWatch) {
    gulp.watch(scssFiles, async function (opts) {
      buildScss({isWatch: false})
    })
  }

  const plugins = [
    cssMqpacker(),
    discardDuplicates(),
    mergeRules(),
    autoprefixer({
      browsers: ['> 0%'],
    }),
    cssnano(),
  ]

  return gulp
    .src(scssEntry)
    .pipe(sourcemaps.init())
    .pipe(sass({
      file: scssEntry,
      outFile: scssBundle,
      sourceMap: true,
      sourceMapRoot: path.relative(
        path.dirname(scssEntry),
        path.dirname(scssBundle)
      ),
      importer: require('node-sass-glob-once'),
    }).on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename(scssBundle))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(''))
    .on('end', function () {
      console.log('> success build scss')
    })
}
gulp.task('build-scss', function () {
  return buildScss({isWatch: false})
})
