// создаем переменные на модули:
// const - объялвение переменной, require - подтягиваем модуль
const gulp = require('gulp');
const sass = require('gulp-sass');
// а т.ж. создаем browserSync: .create()
const browserSync = require('browser-sync').create();

// пример будет написан на gulp 4 версии (может встречаться 3я, по-другому)
function style () {
    // место - указывали в html:    <link rel="stylesheet" href="css/style.css">
    return gulp.src('./scss/**/*.scss')
            // конвертируем sass (внутренние () - параметры (напр. минификацию - см. в документации)
            .pipe(sass()) 
            // выбираем, куда положить конвертированные файлы:
            .pipe(gulp.dest('./css'))
    // это значит: в папке scss (scss) и во всех вложенных папках (**) все файлы (*) с расширением (.scss)
    // gulp работает с pipe-ами ()
            // исполнить: .stream()
            .pipe(browserSync.stream())
}

// создаем функцию для вотчеров (чтобы каждый раз не писать gulp style в терминале для конвертации scss в css)
function watch() {
    // инициализируем browserSync в watch-е:
    browserSync.init({
        // корневая дириктория проекта: './'
        server: {
            baseDir: './'
        }
    })
    // указываем адрес файла scss ('./scss/**/*.scss'), и 
    // команду, которую нужно выполнить при изменении этого файла (style)
    gulp.watch('./scss/**/*.scss', style);
    // находим все .html файлы: *.html в корневой дириктории ./
    // on() - когда, 'change' - изменяется, выполни команду: browserSync.reload
    gulp.watch('./*.html').on('change', browserSync.reload);
}

// экспортируем функции, чтобы их можно было запустить:
exports.style = style;
exports.watch = watch;
