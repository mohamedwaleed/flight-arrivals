'use strict';

// index.html page to dist folder
import '!!file-loader?name=[name].[ext]!../favicon.ico';

// vendor files
import "./index.vendor";

// main App module
import "./index.module";

import "../assets/styles/main.css";
import "../assets/styles/animate.css";

angular.element(document).ready(() => {
  angular.bootstrap(document, ['flight-arrivals'], {
    strictDi: true
  });
});
