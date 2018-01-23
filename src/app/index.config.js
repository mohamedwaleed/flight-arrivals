/*global NODE_ENV*/
'use strict';
import reducers from './reducers';
import promiseMiddleware from 'redux-promise';

function config($logProvider, $compileProvider, $ngReduxProvider) {
	'ngInject';

    $logProvider.debugEnabled(true);

    if (NODE_ENV === 'production') {
        $logProvider.debugEnabled(false);
        $compileProvider.debugInfoEnabled(false);
    }
    $ngReduxProvider.createStoreWith(reducers, [promiseMiddleware]);
  
}

export default config;
