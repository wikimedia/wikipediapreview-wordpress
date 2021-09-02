export const search = ( lang, term, callback ) => {
	// prefix search
	const params = {
		action: 'query',
		prop: 'description|pageimages',
		piprop: 'thumbnail',
		pilimit: 5,
		pprop: 'displaytitle',
		generator: 'prefixsearch',
		redirects: true,
		pithumbsize: 64,
		gpslimit: 5,
		gpsnamespace: 0,
		gpssearch: term.replace( /:/g, ' ' ),
	};

	const url = buildMwApiUrl( lang, params );
	return request( url, ( data ) => {
		if ( ! data.query?.pages ) {
			callback( [] );
		} else {
			callback(
				Object.values( data.query.pages ).map( ( page ) => {
					return {
						title: page.title,
						description: page.description,
						thumbnail: page.thumbnail?.source,
					};
				} )
			);
		}
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

const request = ( url, callback ) => {
	// eslint-disable-next-line no-undef
	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url );
	xhr.send();
	xhr.addEventListener( 'load', () => {
		callback( JSON.parse( xhr.responseText ) );
	} );
	xhr.addEventListener( 'error', () => {
		callback( null, xhr.status );
	} );
};
