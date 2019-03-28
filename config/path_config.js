const path = require('path');

function path_join(url){
    return path.join(__dirname , url);
}
module.exports={
    //  src
    SRC_CSS_PATH: path_join('../src/css'),
    SRC_HTML_PATH: path_join('../src/html'),
    SRC_JS_PATH: path_join('../src/js'),
    SRC_FONTS_PATH: path_join('../src/fonts'),
    SRC_UTILS_PATH: path_join('../src/utils'),
    //  dist
    DIST_PATH: path_join('../dist'),
    DIST_HTML_PATH: path_join('../dist/html'),
    DIST_JS_PATH: path_join('../dist/js'),
    DIST_CSS_PATH: path_join('../dist/css'),
    
}