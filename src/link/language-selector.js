import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { getLanguages } from '@wikimedia/language-data';
import { isLanguageWithWiki, defaultLanguages } from './languages';

export const LanguageSelector = ( { setLanguageSelector, setLang } ) => {
	const [ value, setValue ] = useState( '' );
	const [ items, setItems ] = useState( [] );
	const limit = defaultLanguages.length;
	const languages = getLanguages();

	const normalize = ( result, language ) => {
		if ( isLanguageWithWiki( language ) ) {
			result.push( {
				name: languages[ language ][ 2 ],
				code: language,
			} );
		}
		return result;
	};

	const filterLanguages = ( targetLang ) => {
		setValue( targetLang );

		if ( targetLang === '' ) {
			setItems( defaultFilter() );
			return;
		}

		const filtered = Object.keys( languages )
			.filter( ( language ) => {
				if ( languages[ language ].length > 2 ) {
					return (
						languages[ language ][ 2 ]
							.toLowerCase()
							.indexOf( targetLang.toLowerCase() ) !== -1
					);
				}
				return false;
			} )
			.reduce(
				( result, language ) => normalize( result, language ),
				[]
			);

		setItems( filtered.slice( 0, limit ) );
	};

	const defaultFilter = () => {
		const filtered = Object.keys( languages )
			.filter( ( language ) => {
				return defaultLanguages.indexOf( language ) !== -1;
			} )
			.reduce(
				( result, language ) => normalize( result, language ),
				[]
			);

		return filtered;
	};

	const selectLanguage = ( e ) => {
		const languageCode = e.target.attributes[ 'data-code' ].nodeValue;
		setLang( languageCode );
		setLanguageSelector( false );
	};

	useEffect( () => {
		setItems( defaultFilter() );
	}, [] );

	return (
		<div className="wikipediapreview-edit-inline-language-selector">
			<div className="wikipediapreview-edit-inline-language-selector-header">
				<div>{ __( 'Languages', 'wikipedia-preview' ) }</div>
				<div
					className="wikipediapreview-edit-inline-language-selector-header-close"
					onClick={ () => setLanguageSelector( false ) }
					role="presentation"
				></div>
			</div>
			<TextControl
				className="wikipediapreview-edit-inline-language-selector-input"
				value={ value }
				onChange={ filterLanguages }
				placeholder={ __( 'Search languages', 'wikipedia-preview' ) }
				autoFocus={ true } // eslint-disable-line jsx-a11y/no-autofocus
			/>
			<div className="wikipediapreview-edit-inline-language-selector-search-icon" />
			{ ! value ? (
				<div className="wikipediapreview-edit-inline-language-selector-label">
					{ __( 'All languages', 'wikipedia-preview' ) }
				</div>
			) : null }
			<div className="wikipediapreview-edit-inline-language-selector-results">
				{ items.length ? (
					items.map( ( item ) => (
						<div
							className="wikipediapreview-edit-inline-language-selector-results-item"
							data-code={ item.code }
							onClick={ ( e ) => {
								selectLanguage( e );
							} }
							role="presentation"
							key={ item.code }
						>
							{ item.name }
						</div>
					) )
				) : (
					<div className="wikipediapreview-edit-inline-language-selector-results-none">
						<bdi>
							{ __( 'No results found', 'wikipedia-preview' ) }
						</bdi>
					</div>
				) }
			</div>
		</div>
	);
};
