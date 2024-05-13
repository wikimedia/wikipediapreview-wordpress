let abortFunctions = [];

const handler = ( callback ) => {
	return ( data ) => {
		if ( ! data.query || ! data.query.pages ) {
			callback( [] );
		} else {
			callback(
				Object.values( data.query.pages )
					.filter( ( page ) => {
						return ! page.pageprops ||
							! page.pageprops.hasOwnProperty( 'disambiguation' );
					} )
					.map( ( page ) => {
						return {
							title: page.title,
							description: page.description,
							thumbnail: page.thumbnail?.source,
						};
					} )
			);
		}
	};
};

export const prefixSearch = ( lang, term, callback ) => {
	const params = {
		action: 'query',
		prop: 'pageimages|pageprops|description',
		piprop: 'thumbnail',
		pithumbsize: 64,
		pilimit: 5,
		generator: 'prefixsearch',
		gpssearch: term,
		gpsnamespace: 0,
		gpslimit: 5,
	};

	const url = buildMwApiUrl( lang, params );
	return request( url, handler( callback ) );
};

export const fulltextSearch = ( lang, term, callback ) => {
	const params = {
		action: 'query',
		prop: 'pageimages|pageprops|description',
		piprop: 'thumbnail',
		pithumbsize: 64,
		pilimit: 5,
		generator: 'search',
		gsrsearch: term,
		gsrnamespace: 0,
		gsrlimit: 5,
	};

	const url = buildMwApiUrl( lang, params );
	return request( url, handler( callback ) );
};

export const getArticleText = ( lang, title, callback ) => {
	const url = `https://${ lang }.wikipedia.org/api/rest_v1/page/mobile-html/${ encodeURIComponent( title ) }`;
	return request( url, callback );
};

export const abortAllRequest = () => {
	abortFunctions.forEach( ( x ) => x && x.abort() );
	abortFunctions = [];
};

const defautParams = {
	format: 'json',
	formatversion: 2,
	origin: '*',
	wprov: 'wpwpp',
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
	abortAllRequest();

	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url );
	xhr.send();
	xhr.addEventListener( 'load', () => {
		if ( xhr.responseURL.includes( 'rest_v1' ) ) {
			callback( xhr.responseText );
		} else {
			callback( JSON.parse( xhr.responseText ) );
		}
	} );
	xhr.addEventListener( 'error', () => {
		callback( null, xhr.status );
	} );

	abortFunctions.push( xhr );
};
