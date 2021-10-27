import { TextControl, KeyboardShortcuts } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { getLanguages } from '@wikimedia/language-data';
import { isLanguageWithWiki, defaultLanguages } from './languages';

export const LanguageSelector = ( { setLanguageSelector, setLang } ) => {
	const [ value, setValue ] = useState( '' );
	const [ items, setItems ] = useState( [] );
	const [ hoveredIndex, setHoverIndex ] = useState( -1 );
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

	const filterLanguages = ( target ) => {
		setValue( target );
		const targetLang = target.toLowerCase().trim();

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
							.indexOf( targetLang ) !== -1 ||
						language === targetLang
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

	const selectLanguage = ( languageCode ) => {
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
					items.map( ( item, index ) => (
						<div
							className={ `wikipediapreview-edit-inline-language-selector-results-item ${
								index === hoveredIndex ? 'hovered' : ''
							}` }
							data-code={ item.code }
							onClick={ () => {
								selectLanguage( items[ index ].code );
							} }
							onMouseEnter={ () => setHoverIndex( -1 ) }
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
			<KeyboardShortcuts
				shortcuts={ {
					down: () => {
						setHoverIndex( ( hoveredIndex + 1 ) % items.length );
					},
					up: () => {
						setHoverIndex(
							hoveredIndex ? hoveredIndex - 1 : items.length - 1
						);
					},
					enter: () => {
						selectLanguage( items[ hoveredIndex ].code );
					},
				} }
			/>
		</div>
	);
};
