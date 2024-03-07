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
	if ( window.matchMedia( '(prefers-color-scheme: dark)' ).matches ) {
		return 'dark';
	}

	return 'detect';
};
