/* global wikipediapreview_init_options */
import { getColorScheme } from './link/utils';

// TODO: support multiple color scheme checks
// const colorScheme = getColorScheme() || wikipediapreview_init_options.prefersColorScheme

wikipediaPreview.init( {
	root: document,
	/* eslint-disable-next-line camelcase */
	detectLinks: !! wikipediapreview_init_options.detectLinks,
	prefersColorScheme: getColorScheme()
} );
