const attNameWPDarkModePlugin = 'data-wp-dark-mode-active';

const isWPDarkModePluginActive = () => {
	return document.documentElement.hasAttribute( attNameWPDarkModePlugin );
};

export const getColorScheme = () => {
	if ( isWPDarkModePluginActive() ) {
		return 'dark';
	}
	return 'detect';
};

export const observeDarkModePluginActivation = ( callback ) => {
	// eslint-disable-next-line no-undef
	const observer = new MutationObserver( () => {
		if ( isWPDarkModePluginActive() ) {
			callback( 'dark' );
		} else {
			callback( 'light' );
		}
	} );
	observer.observe( document.documentElement, { attributeFilter: [ attNameWPDarkModePlugin ] } );
};
