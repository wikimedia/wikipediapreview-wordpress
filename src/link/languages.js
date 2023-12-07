import { getLanguages } from '@wikimedia/language-data';

const defaultLanguages = [
	'en',
	'nl',
	'de',
	'sv',
	'fr',
	'it',
	'ru',
	'es',
	'pl',
	'war',
	'sq',
	'is',
	'af',
	'yi',
	'sa',
];

const languagesWithWikis = [
	'en',
	'ceb',
	'sv',
	'de',
	'fr',
	'nl',
	'ru',
	'es',
	'it',
	'pl',
	'arz',
	'ja',
	'vi',
	'war',
	'zh',
	'ar',
	'uk',
	'pt',
	'fa',
	'ca',
	'sr',
	'id',
	'no',
	'ko',
	'fi',
	'hu',
	'cs',
	'sh',
	'ce',
	'zh-min-nan',
	'tr',
	'ro',
	'eu',
	'ms',
	'tt',
	'eo',
	'he',
	'hy',
	'bg',
	'da',
	'azb',
	'sk',
	'kk',
	'min',
	'et',
	'hr',
	'be',
	'lt',
	'el',
	'simple',
	'az',
	'gl',
	'sl',
	'ur',
	'nn',
	'ka',
	'hi',
	'ta',
	'th',
	'uz',
	'la',
	'cy',
	'ast',
	'vo',
	'zh-yue',
	'mk',
	'bn',
	'lv',
	'tg',
	'my',
	'af',
	'mg',
	'bs',
	'oc',
	'sq',
	'nds',
	'mr',
	'ky',
	'be-tarask',
	'ml',
	'te',
	'new',
	'br',
	'vec',
	'sw',
	'pms',
	'jv',
	'pnb',
	'ht',
	'su',
	'lb',
	'ba',
	'ga',
	'szl',
	'is',
	'ku',
	'lmo',
	'cv',
	'fy',
	'tl',
	'wuu',
	'an',
	'sco',
	'diq',
	'pa',
	'ckb',
	'yo',
	'ne',
	'bar',
	'io',
	'gu',
	'als',
	'kn',
	'scn',
	'bpy',
	'ia',
	'qu',
	'mn',
	'si',
	'nv',
	'bat-smg',
	'avk',
	'xmf',
	'or',
	'gd',
	'cdo',
	'ilo',
	'yi',
	'am',
	'sd',
	'nap',
	'frr',
	'os',
	'bug',
	'hsb',
	'map-bms',
	'mai',
	'fo',
	'li',
	'sah',
	'mzn',
	'eml',
	'ha',
	'ace',
	'ps',
	'gor',
	'crh',
	'sa',
	'bcl',
	'wa',
	'zh-classical',
	'lij',
	'mrj',
	'mhr',
	'zu',
	'hif',
	'shn',
	'ban',
	'as',
	'hak',
	'roa-tara',
	'hyw',
	'pam',
	'nso',
	'ie',
	'km',
	'rue',
	'se',
	'bh',
	'vls',
	'nds-nl',
	'sn',
	'mi',
	'sc',
	'nah',
	'vep',
	'sat',
	'so',
	'myv',
	'gan',
	'glk',
	'kab',
	'tk',
	'co',
	'bo',
	'fiu-vro',
	'ab',
	'kv',
	'csb',
	'mni',
	'pcd',
	'frp',
	'udm',
	'ug',
	'gv',
	'ay',
	'zea',
	'kw',
	'ary',
	'nrm',
	'bjn',
	'gn',
	'mt',
	'lez',
	'lfn',
	'stq',
	'lo',
	'mwl',
	'skr',
	'rm',
	'olo',
	'lad',
	'smn',
	'gom',
	'fur',
	'koi',
	'ang',
	'dsb',
	'dty',
	'ext',
	'tyv',
	'ln',
	'cbk-zam',
	'dv',
	'ksh',
	'gag',
	'bxr',
	'pfl',
	'pag',
	'pi',
	'av',
	'awa',
	'tay',
	'haw',
	'ig',
	'rw',
	'pap',
	'xal',
	'krc',
	'szy',
	'za',
	'pdc',
	'kaa',
	'inh',
	'arc',
	'to',
	'kbp',
	'jam',
	'na',
	'wo',
	'tpi',
	'kbd',
	'atj',
	'tcy',
	'nov',
	'ki',
	'mdf',
	'tet',
	'lld',
	'ak',
	'bi',
	'lg',
	'jbo',
	'roa-rup',
	'lbe',
	'kg',
	'fj',
	'ty',
	'xh',
	'srn',
	'om',
	'trv',
	'gcr',
	'nqo',
	'shi',
	'sm',
	'ltg',
	'alt',
	'nia',
	'chr',
	'tw',
	'mnw',
	'pih',
	'ks',
	'got',
	'ny',
	'st',
	'mad',
	'kl',
	'cu',
	'tn',
	'bm',
	'ts',
	'rmy',
	'dag',
	've',
	'chy',
	'rn',
	'tum',
	'iu',
	'ss',
	'ch',
	'pnt',
	'ady',
	'ik',
	'ee',
	'ff',
	'din',
	'sg',
	'dz',
	'ti',
	'cr',
	'ng',
	'cho',
	'kj',
	'mh',
	'ho',
	'ii',
	'aa',
	'lrc',
	'mus',
];

const limit = defaultLanguages.length;
const languages = getLanguages();

const isLanguageWithWiki = ( language ) =>
	languagesWithWikis.indexOf( language ) !== -1;

const normalize = ( result, language ) => {
	if ( isLanguageWithWiki( language ) ) {
		result.push( {
			name: languages[ language ][ 2 ],
			code: language,
		} );
	} else if ( language === 'en-simple' ) {
		result.push( {
			name: languages[ language ][ 2 ],
			code: 'simple',
		} );
	}
	return result;
};

const getLocalized = ( language, userLang ) => {
	if ( Intl.DisplayNames ) {
		const localizedName = new Intl.DisplayNames( [ userLang ], {
			type: 'language',
		} );
		const invalid = [
			'bat-smg',
			'be-x-old',
			'cbk-zam',
			'fiu-vro',
			'map-bms',
			'roa-rup',
			'zh-classical',
			'zh-min-nan',
			'zh-yue',
			'zh-cdo',
		];

		if ( invalid.indexOf( language ) === -1 ) {
			return localizedName.of( language ).toLowerCase();
		}
	}
	return false;
};

export const filterLanguages = ( target, lang ) => {
	const targetLang = target.toLowerCase().trim();

	if ( targetLang === '' ) {
		return defaultFilter();
	}

	const filtered = Object.keys( languages )
		.filter( ( language ) => {
			const localized = getLocalized( language, lang );
			if ( languages[ language ].length > 2 ) {
				return (
					languages[ language ][ 2 ].toLowerCase().indexOf( targetLang ) !==
						-1 ||
					language.indexOf( targetLang ) !== -1 ||
					( localized && localized.indexOf( targetLang ) !== -1 )
				);
			}
			return false;
		} )
		.reduce( ( result, language ) => normalize( result, language ), [] );

	return filtered.slice( 0, limit );
};

export const defaultFilter = () => {
	const filtered = Object.keys( languages )
		.filter( ( language ) => {
			return defaultLanguages.indexOf( language ) !== -1;
		} )
		.reduce( ( result, language ) => normalize( result, language ), [] );

	return filtered;
};
