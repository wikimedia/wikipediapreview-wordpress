/* global wikipediapreview_init_options */
import { getColorScheme, observeDarkModePluginActivation } from './link/colorScheme';

wikipediaPreview.init( {
	root: document,
	/* eslint-disable-next-line camelcase */
	detectLinks: !! wikipediapreview_init_options.detectLinks,
	prefersColorScheme: getColorScheme(),
} );

observeDarkModePluginActivation();
