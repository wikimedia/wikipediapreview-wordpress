export const getSiteLanguage = () => {
	return document.documentElement.getAttribute( 'lang' ).split( '-' )[ 0 ];
};

export const isTextNearTheEdge = ( anchor ) => {
	const anchorXPosition = anchor.getBoundingClientRect();
	const scrollWidth = document.body.scrollWidth;

	return (
		anchorXPosition.left / scrollWidth < 0.2 ||
		( scrollWidth - anchorXPosition.right ) / scrollWidth < 0.2
	);
};

export const getColorScheme = () => {
	// TODO: add extra check for document.body.style background color?
	if (
		window.matchMedia( '(prefers-color-scheme: dark)' ).matches
	) {
		return 'dark';
	}

	return 'detect';
};

export const observeDarkModePluginActivation = ( callback ) => {
	const htmlTag = document.documentElement;

	// eslint-disable-next-line no-undef
	const observer = new MutationObserver( ( mutationsList ) => {
		for ( const mutation of mutationsList ) {
			if ( mutation.type === 'attributes' && mutation.attributeName === 'class' ) {
				if ( htmlTag.classList.contains( 'wp-dark-mode-active' ) ) {
					// eslint-disable-next-line no-console
					console.log( 'Plugin dark mode enabled' );
					callback( 'dark', true );
				} else {
					// eslint-disable-next-line no-console
					console.log( 'Plugin dark mode disabled' );
					callback( 'light', true );
				}
			}
		}
	} );

	// Start observing changes in the body element
	observer.observe( htmlTag, { attributes: true } );
};
