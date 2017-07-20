/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    defaultJSExtensions: true,
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js',
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/animations': 'npm:@angular/core/bundles/animations.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'ng2-file-upload' : 'npm:ng2-file-upload',
      'ng2-ckeditor' :'https://npmcdn.com/ng2-ckeditor@latest',
      'angular2-cookie':            'npm:angular2-cookie',
     
    },
    // packages tells the System loader how to load when no filename and/or no extension
    
    

    packages: {
      app: {
        defaultExtension: 'js',
        
      },
      rxjs: {
        defaultExtension: 'js'
      },
      /** Configuration for ng2-file-upload */
      'ng2-file-upload' : { 
        main: './ng2-file-upload.js',
        defaultExtension: 'js'
      },
      'ng2-ckeditor':{
        main: 'lib/index.js', defaultExtension: 'js' 
      },
      'angular2-cookie': {
        main: './core.js',
        defaultExtension: 'js'
      }
      /** Configuration for ng2-file-upload */
    }
  });
})(this);
