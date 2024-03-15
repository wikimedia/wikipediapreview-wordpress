/* global wikipediapreview_init_options */
import { getColorScheme } from './link/utils';

wikipediaPreview.init( {
	root: document,
	/* eslint-disable-next-line camelcase */
	detectLinks: !! wikipediapreview_init_options.detectLinks,
	prefersColorScheme: getColorScheme(),
} );
