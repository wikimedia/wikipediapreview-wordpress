/* global wikipediapreview_init_options */
import { getColorScheme, observeDarkModePluginActivation } from './link/color-scheme';

const init = ( scheme ) => {
	wikipediaPreview.init( {
		root: document,
		/* eslint-disable-next-line camelcase */
		detectLinks: !! wikipediapreview_init_options.detectLinks,
		prefersColorScheme: scheme,
	} );
};

// Initial init on first page load
init( getColorScheme() );

// Re-init as needed as the color scheme changes
observeDarkModePluginActivation( init );
