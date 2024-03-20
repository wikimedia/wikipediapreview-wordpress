const attNameWPDarkModePlugin = 'data-wp-dark-mode-active';

const isWPDarkModePluginActive = () => {
	const htmlTag = document.documentElement;
	return htmlTag.hasAttribute( attNameWPDarkModePlugin );
};

export const getColorScheme = () => {
	if ( isWPDarkModePluginActive() ) {
		return 'dark';
	}
	return 'detect';
};

export const observeDarkModePluginActivation = ( callback ) => {
	const htmlTag = document.documentElement;
	// eslint-disable-next-line no-undef
	const observer = new MutationObserver( ( mutationsList ) => {
		for ( const mutation of mutationsList ) {
			if ( mutation.type === 'attributes' && mutation.attributeName === attNameWPDarkModePlugin ) {
				if ( isWPDarkModePluginActive() ) {
					callback( 'dark' );
				} else {
					callback( 'light' );
				}
			}
		}
	} );

	observer.observe( htmlTag, { attributes: true } );
};
