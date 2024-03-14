/* global wikipediapreview_init_options */
import { getColorScheme, observeDarkModePluginActivation } from './link/utils';

wikipediaPreview.unload = () => {
	// eslint-disable-next-line no-console
	console.log( 'unload' );
	delete window.wikipediaPreview;
};

const init = ( colorScheme, reinit = false ) => {
	// eslint-disable-next-line no-console
	console.log( 'init - colorScheme, reinit', colorScheme, reinit );
	// if ( reinit ) {
	// 	console.log('reinit');
	// 	wikipediaPreview.unload();
	// }

	wikipediaPreview.init( {
		root: document,
		/* eslint-disable camelcase */
		detectLinks: !! wikipediapreview_init_options.detectLinks,
		prefersColorScheme: colorScheme,
		/* eslint-enable camelcase */
	} );
};

init( getColorScheme() );
observeDarkModePluginActivation( init );
