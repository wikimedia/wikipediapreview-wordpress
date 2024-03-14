/* global wikipediapreview_init_options */
import { getColorScheme } from './link/utils';

wikipediaPreview.init( {
	root: document,
	/* eslint-disable camelcase */
	detectLinks: !! wikipediapreview_init_options.detectLinks,
	prefersColorScheme: getColorScheme(),
	/* eslint-enable camelcase */
} );
