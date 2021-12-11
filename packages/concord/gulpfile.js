const { src, dest, task, series } = require('gulp')
const prettier = require('gulp-prettier')
const rimraf = require('gulp-rimraf')
const { createProject } = require('gulp-typescript')
const headerComment = require('gulp-header-comment')

// TASKS _______________________________________________________________________________________________________________
function format(done) {
  src('src/**/.*ts').pipe(prettier()).pipe(dest('src'))
  done()
}

function clean(done) {
  src('dist', { read: false, allowEmpty: true }).pipe(rimraf())
  done()
}

function transpile(done) {
  const tsProject = createProject('tsconfig.json')
  const tsResult = tsProject.src().pipe(tsProject())

  tsResult.dts.pipe(dest('dist/@types'))
  tsResult.js.pipe(dest('dist'))
  done()
}

task('header', () => {
  return src('dist/**/*.js')
    .pipe(
      headerComment(`
        <%= pkg.name %> v<%= pkg.version %>
        <%=pkg.description %>
        Copyright (c) 2020-<%= moment().format('YYYY') %> <%= pkg.author.name %>
        Released under the <%= pkg.license %> License.`)
    )
    .pipe(dest('dist/'))
})

// RUN TASKS ___________________________________________________________________________________________________________
task('build', series(format, clean, transpile))
