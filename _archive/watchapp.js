 var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    gutil = require('gulp-util'),
    streamify = require('gulp-streamify');

gulp.task('watchapp', function() {

    var appBundler = browserify({
      entries: [config.src.mainjs],
      paths: ['./src/app/'],
      debug: true,
      cache: {}, packageCache: {}, fullPaths: true
    });

    var rebundle = function() {
      appBundler.bundle()
      .on('error', function(err) {
          gutil.log('ERROR in ' + err.fileName);
          gutil.log(err.message);
        })
      .pipe(source(config.dest.build.bundle))
      .pipe(gulp.dest(config.dest.build.scripts));
    };

    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);

    rebundle();

    return appBundler;
});