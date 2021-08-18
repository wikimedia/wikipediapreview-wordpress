export const getSiteLanguage = () => {
	return document.documentElement.getAttribute( 'lang' ).split( '-' )[ 0 ];
};

export const customFormatEnabled = () => {
	return !! window.location.search.match( /wikipediapreview_gutenburg=1/ );
};
