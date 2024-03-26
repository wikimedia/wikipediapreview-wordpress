const attNameWPDarkModePluginActive = 'data-wp-dark-mode-active';
const attNameWPDarkModePluginInstalled = 'data-wp-dark-mode-preset';

const isWPDarkModePluginActive = () => {
	return document.documentElement.hasAttribute( attNameWPDarkModePluginActive );
};

const isWPDarkModePluginInstalled = () => {
	return document.documentElement.hasAttribute( attNameWPDarkModePluginInstalled );
};

export const getColorScheme = () => {
	if ( isWPDarkModePluginInstalled() && isWPDarkModePluginActive() ) {
		return 'dark';
	} else if ( isWPDarkModePluginInstalled() && ! isWPDarkModePluginActive() ) {
		return 'light';
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
	observer.observe( document.documentElement, { attributeFilter: [ attNameWPDarkModePluginActive ] } );
};
