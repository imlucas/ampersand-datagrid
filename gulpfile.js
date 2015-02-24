var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsfmt = require('gulp-jsfmt');
var dc = require('dependency-check');
var gutil = require('gulp-util');
var spawn = require('child_process').spawn;


function check(mode, done) {
  var opts = {
    path: __dirname + '/package.json'
  };

  dc(opts, function(err, data) {
    if (err) return done(err);
    var pkg = data.package;
    var deps = data.used;
    var results, errMsg, successMsg, corrector;

    if (mode === 'extra') {
      results = dc.extra(pkg, deps, {
        excludeDev: true
      });
      errMsg = 'Modules in package.json not used in code';
      corrector = 'npm uninstall --save ' + results.join(' ') + ';';
      successMsg = 'All dependencies in package.json are used in the code';
    } else {
      results = dc.missing(pkg, deps);
      errMsg = 'Dependencies not listed in package.json';
      successMsg = 'All dependencies used in the code are listed in package.json';
      corrector = 'npm install --save ' + results.join(' ') + ';';
    }
    if (results.length === 0) {
      gutil.log(gutil.colors.green('Success') + ' ' + successMsg);
      return done();
    }
    gutil.log(gutil.colors.red('Error') + ' ' + errMsg + '. To fix this, run:\n\n    ' + corrector + '\n');
    return done(new Error(errMsg));
  });
}

gulp.task('format', function() {
  return gulp.src('./lib/*.js')
    .pipe(jsfmt.format({}));
});

gulp.task('lint', function() {
  return gulp.src('./lib/*')
    .pipe(jshint({}));
});

gulp.task('phantom', function(done) {
  var testFailed = 0,
    child = spawn(__dirname + '/node_modules/.bin/zuul',
      ['--phantom', '--', process.cwd() + '/test/index.test.js']);

  child.stderr.pipe(process.stderr);
  child.stdout.pipe(process.stdout);
  child.stdout.on('data', function(buf) {
    if (buf.toString('utf-8').indexOf('failed ') === 0) {
      testFailed += 1;
    }

  });
  child.on('error', done)
    .on('exit', function(code) {
      if (code === 0) return done();

      gutil.log(gutil.colors.red('Error') + ' ' + testFailed + ' tests failed. ' +
      'Try running these tests in your browser:\n\n  npm run test-browser;\n');
      done(new Error(testFailed + ' tests failed'));
    });
});

gulp.task('dist', function() {
  // @todo: compile less
  // @todo: can jadeify inline compiled templates?
});

gulp.task('check dependencies', function(done) {
  check('missing', function(err) {
    if (err) return done(err);
    check('extra', done);
  });
});

gulp.task('check', ['format', 'lint', 'check dependencies']);

gulp.task('precommit', ['check', 'phantom']);
