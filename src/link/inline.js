import {
	Popover,
	TextControl,
	Button,
	KeyboardShortcuts,
} from '@wordpress/components';
import { getLanguages } from '@wikimedia/language-data';
import { getTextContent, slice } from '@wordpress/rich-text';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { getSiteLanguage } from './utils';
import { isLanguageWithWiki, defaultLanguages } from './languages';
import { prefixSearch, fulltextSearch, abortAllRequest } from './api';

export const InlineEditUI = ( {
	anchorRef,
	onClose,
	onApply,
	value,
	activeAttributes,
} ) => {
	const [ title, setTitle ] = useState( activeAttributes.title );
	const [ lang, setLang ] = useState( activeAttributes.lang );
	const [ languageSelector, setLanguageSelector ] = useState( false );
	const [ searchList, setSearchList ] = useState( [] );
	const [ hoveredIndex, setHoverIndex ] = useState( -1 );
	const [ loading, setLoading ] = useState( false );

	useEffect( () => {
		setTitle( activeAttributes.title || getTextContent( slice( value ) ) );
		setLang( activeAttributes.lang || getSiteLanguage() );
	}, [ activeAttributes ] );

	useEffect( () => {
		if ( title ) {
			const term = title.trim();
			setLoading( true );
			prefixSearch( lang, term, ( prefixData ) => {
				if ( ! prefixData.length ) {
					fulltextSearch( lang, term, ( fulltextData ) => {
						setSearchList( fulltextData );
						setLoading( false );
					} );
				} else {
					setSearchList( prefixData );
					setLoading( false );
				}
				setHoverIndex( -1 );
			} );
		} else {
			abortAllRequest();
			setSearchList( [] );
			setLoading( false );
		}
	}, [ title, lang ] );

	return (
		<Popover
			anchorRef={ anchorRef }
			onClose={ onClose }
			position="bottom center"
			className="wikipediapreview-edit-inline"
			noArrow={ false }
			expandOnMobile={ true }
		>
			<div className="wikipediapreview-edit-inline-search">
				<p className="wikipediapreview-edit-inline-search-label">
					{ __( 'Add Wikipedia preview', 'wikipedia-preview' ) }
				</p>
				<TextControl
					className="wikipediapreview-edit-inline-search-input"
					value={ title }
					onChange={ setTitle }
					placeholder={ __(
						'Search Wikipedia',
						'wikipedia-preview'
					) }
				/>
				<div className="wikipediapreview-edit-inline-search-icon" />
				<div className="wikipediapreview-edit-inline-search-language" onClick={() => setLanguageSelector(true)}>
					<div className="wikipediapreview-edit-inline-search-language-code">{lang}</div>
					<div className="wikipediapreview-edit-inline-search-language-dropdown"></div>
				</div>
				{ title && (
					<Button
						onClick={ () => {
							setTitle( '' );
						} }
						className="wikipediapreview-edit-inline-search-close"
					/>
				) }
				{ loading && (
					<div className="wikipediapreview-edit-inline-search-loading"></div>
				) }
			</div>
			{ loading && ! searchList.length && (
				<div className="wikipediapreview-edit-inline-info">
					<bdi>
						{ __( 'Loading search results…', 'wikipedia-preview' ) }
					</bdi>
				</div>
			) }
			{ ! loading && title && ! searchList.length && (
				<div className="wikipediapreview-edit-inline-info">
					<bdi>{ __( 'No results found', 'wikipedia-preview' ) }</bdi>
				</div>
			) }
			{ searchList && searchList.length ? (
				<div className="wikipediapreview-edit-inline-list">
					{ searchList.map( ( item, index ) => {
						return (
							<div
								className={ `wikipediapreview-edit-inline-list-item ${
									index === hoveredIndex ? 'hovered' : ''
								}` }
								key={ item.title }
								role="link"
								tabIndex={ index }
								onClick={ () => {
									onApply( value, item.title, lang );
								} }
								onKeyUp={ () => {
									onApply( value, item.title, lang );
								} }
							>
								<div
									className="wikipediapreview-edit-inline-list-item-img"
									style={
										item.thumbnail
											? {
													backgroundImage: `url(${ item.thumbnail })`,
											  }
											: {}
									}
								/>
								<span className="wikipediapreview-edit-inline-list-item-title">
									{ item.title }
								</span>
								<span className="wikipediapreview-edit-inline-list-item-description">
									{ item.description }
								</span>
							</div>
						);
					} ) }
				</div>
			) : null }
			{ languageSelector ? (
				<LanguageSelector setLanguageSelector={ setLanguageSelector } setLang={ setLang } title={title}/>
			) : null }
			<KeyboardShortcuts
				bindGlobal={ true }
				shortcuts={ {
					down: () => {
						setHoverIndex(
							( hoveredIndex + 1 ) % searchList.length
						);
					},
					up: () => {
						setHoverIndex(
							hoveredIndex
								? hoveredIndex - 1
								: searchList.length - 1
						);
					},
					enter: () => {
						if ( hoveredIndex === -1 ) {
							const matchedItem = searchList.find(
								( list ) =>
									list.title.toLowerCase() ===
									title.toLowerCase().trim()
							);
							if ( matchedItem ) {
								onApply( value, matchedItem.title, lang );
							}
						} else {
							onApply(
								value,
								searchList[ hoveredIndex ].title,
								lang
							);
						}
					},
				} }
			/>
		</Popover>
	);
};

const LanguageSelector = ({setLanguageSelector, setLang, title}) => {
	const [ language, setLanguage ] = useState('');
	const [ items, setItems ] = useState([]);
	const limit = defaultLanguages.length;
	const languages = getLanguages()

	const normalize = (result, language) => {
		if (isLanguageWithWiki(language)) {
			result.push({
				name: languages[language][2],
				code: language
			})
		}
		return result
	}

	const filterLanguages = (targetLang) => {
		setLanguage(targetLang)

		if (targetLang === '') {
			setItems(defaultFilter())
			return
		}

		const filtered = Object.keys(languages)
			.filter( language => {
				if (languages[language].length > 2) {
					return languages[language][2].toLowerCase().indexOf(targetLang.toLowerCase()) !== -1
				}
				return false
			} )
			.reduce( (result, language) => normalize(result,language), [])

		setItems(filtered.slice(0, limit))
	}

	const defaultFilter = () => {
		const filtered = Object.keys(languages)
			.filter(language => {
				return defaultLanguages.indexOf(language) !== -1
			})
			.reduce( (result, language) => normalize(result,language), [])

		return filtered
	}

	const selectLanguage = (e) => {
		const languageCode = e.target.attributes['data-code'].nodeValue;
		setLang(languageCode)
		setLanguageSelector(false)
	}
	
	useEffect(() => {
		setItems(defaultFilter())
	}, [])

	return (
		<div className={`wikipediapreview-edit-inline-language-selector ${!title ? `no-title` : ''}`}>
			<div className="wikipediapreview-edit-inline-language-selector-header">
				<div>{ __( 'Languages', 'wikipedia-preview' ) }</div>
				<div className="wikipediapreview-edit-inline-language-selector-header-close" onClick={() => setLanguageSelector(false)}></div>
			</div>
			<TextControl
				className="wikipediapreview-edit-inline-language-selector-input"
				value={ language }
				onChange={ filterLanguages }
				placeholder={ __(
					'Search languages',
					'wikipedia-preview'
				) }
				autoFocus={true}
			/>
			<div className="wikipediapreview-edit-inline-language-selector-search-icon" />
			{ !language ? (
				<div className="wikipediapreview-edit-inline-language-selector-label">{ __( 'All languages', 'wikipedia-preview' ) }</div>
			) : null }
			<div className="wikipediapreview-edit-inline-language-selector-results">
				{items.length ? items.map(item => (
					<div className="wikipediapreview-edit-inline-language-selector-results-item" data-code={item.code} onClick={(e) => { selectLanguage(e) }}>{item.name}</div>
				)) : <div className="wikipediapreview-edit-inline-language-selector-results-none"> No results found</div>}
			</div>
		</div>
	);
};
