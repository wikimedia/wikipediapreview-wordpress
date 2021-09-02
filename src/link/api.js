import apiFetch from '@wordpress/api-fetch';

export const search = ( lang, term ) => {
	// prefix search
	const params = {
		action: 'query',
		prop: 'description|pageimages|pageprops',
		piprop: 'thumbnail',
		pilimit: 5,
		pprop: 'displaytitle',
		generator: 'prefixsearch',
		redirects: true,
		pithumbsize: 64,
		gpslimit: 15,
		gpsnamespace: 0,
		gpssearch: term.replace( /:/g, ' ' ),
	};

	const url = buildMwApiUrl( lang, params );
	return apiFetch( { url } ).then( ( data ) => {
		if ( ! data.query || ! data.query.pages ) {
			return [];
		}

		return Object.values( data.query.pages ).map( ( page ) => {
			return {
				title: page.title,
				description: page.description,
				imageUrl: page.thumbnail?.source,
			};
		} );
	} );
};

const defautParams = {
	format: 'json',
	formatversion: 2,
	origin: '*',
};

const buildMwApiUrl = ( lang, params ) => {
	params = Object.assign( {}, defautParams, params );
	const baseUrl = `https://${ lang }.wikipedia.org/w/api.php`;
	return (
		baseUrl +
		'?' +
		Object.keys( params )
			.map( ( p ) => {
				return `${ p }=${ encodeURIComponent( params[ p ] ) }`;
			} )
			.join( '&' )
	);
};
