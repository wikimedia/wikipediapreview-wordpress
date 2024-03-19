import wikipediaPreview from 'wikipedia-preview';

const isWPDarkModePluginActive = () => {
	const htmlTag = document.documentElement;
	// TODO also need to check for attribute as well as class
	// to correctly read on the first render if already in dark mode
	return htmlTag.classList.contains( 'wp-dark-mode-active' );
};

export const getColorScheme = () => {
	// eslint-disable-next-line no-console
	console.log( 'getColorScheme...' );
	if (
		window.matchMedia( '(prefers-color-scheme: dark)' ).matches ||
		isWPDarkModePluginActive()
	) {
		// eslint-disable-next-line no-console
		console.log( '...dark detected' );
		return 'dark';
	}

	return 'detect';
};

const removePreviewPopup = () => {
	// eslint-disable-next-line no-console
	console.log( 'removePreviewPopup...' );
	const wikipediaPreviewPopup = document.querySelector( '.wp-popup' );
	if ( wikipediaPreviewPopup ) {
		// eslint-disable-next-line no-console
		console.log( '...removing popup' );
		wikipediaPreviewPopup.remove();
	}
};

const reInitWikipediaPreview = ( scheme ) => {
	// eslint-disable-next-line no-console
	console.log( 'reInitWikipediaPreview', scheme );
	wikipediaPreview.init( {
		root: document,
		detectLinks: true, // TODO read from wikipediapreview_init_options
		prefersColorScheme: scheme,
	} );
};

// Another idea was updating the class directly to the preview div
// but classlist gets overwritten on render

// const updateWikipediaPreviewColorScheme = ( scheme ) => {
//     // eslint-disable-next-line no-console
//     console.log('updateWikipediaPreviewColorScheme', scheme);
//     const wikipediaPreviewPopup = document.querySelector( '.wp-popup' );
//     wikipediaPreviewPopup.children[0].classList.add('wikipediapreview-dark-theme');
// }

export const observeDarkModePluginActivation = () => {
	const htmlTag = document.documentElement;

	// eslint-disable-next-line no-undef
	const observer = new MutationObserver( ( mutationsList ) => {
		for ( const mutation of mutationsList ) {
			if ( mutation.type === 'attributes' && mutation.attributeName === 'class' ) {
				if ( htmlTag.classList.contains( 'wp-dark-mode-active' ) ) {
					// eslint-disable-next-line no-console
					console.log( 'Plugin dark mode enabled, try with detectLinks' );
					removePreviewPopup();
					reInitWikipediaPreview( 'dark' );
					// updateWikipediaPreviewColorScheme( 'dark');
				} else {
					// eslint-disable-next-line no-console
					console.log( 'Plugin dark mode disabled' );
					removePreviewPopup();
					reInitWikipediaPreview( 'light' );
				}
			}
		}
	} );

	// Start observing changes in the body element
	observer.observe( htmlTag, { attributes: true } );
};
