import { useEffect, useState } from '@wordpress/element';
import wikipediaPreview from 'wikipedia-preview';
import { getArticleText } from './api';

export const Sections = ( {
	value,
	updateAttributes,
	activeAttributes,
	setPreviewHtml,
	setSelectingSection,
} ) => {
	const [ sections, setSections ] = useState( null );

	const parseSections = ( articleText ) => {
		// eslint-disable-next-line no-undef
		const doc = new DOMParser().parseFromString( articleText, 'text/html' );
		const sections = Array.from( doc.querySelectorAll( 'section' ) );

		return sections.map( ( section ) => {
			const titleElement = section.querySelector( 'h2, h3, h4, h5, h6' );
			const paragraphElement = section.querySelector( 'p' );

			if ( ! titleElement ) {
				return {
					title: 'Summary',
					textContent: paragraphElement && paragraphElement.textContent,
				};
			}

			return {
				title: titleElement.id, // TODO: title without underscore
				textContent: paragraphElement && paragraphElement.textContent,
			};
		} );
	};

	const selectSection = ( sectionTitle ) => {
		const { title, lang } = activeAttributes;
		const titleWithSection = `${ title }#${ sectionTitle }`;
		wikipediaPreview.getPreviewHtml( titleWithSection, lang, ( preview ) => {
			setPreviewHtml( preview );
		} );
		setSelectingSection( false );
		updateAttributes( value, titleWithSection, lang );
	};

	useEffect( () => {
		const { title, lang } = activeAttributes;
		if ( ! sections && title && lang ) {
			getArticleText( lang, title, ( articleText ) => {
				setSections( parseSections( articleText ) );
			} );
		}
	}, [] );

	return (
		<div className="wikipediapreview-edit-sections">
			{ sections && sections.length ? (
				<div className="wikipediapreview-edit-sections-list">
					{ sections.map( ( item, index ) => {
						return (
							<div
								className={ `wikipediapreview-edit-sections-list-item` }
								key={ item.title }
								role="link"
								tabIndex={ index }
								onClick={ () => {
									selectSection( item.title );
								} }
								onKeyUp={ () => {
									// TODO: console.log( 'onKeyUp' );
								} }
							>
								<span className="wikipediapreview-edit-sections-list-item-title">
									{ item.title }
								</span>
								<span className="wikipediapreview-edit-sections-list-item-content">
									{ item.textContent && item.textContent.substring( 0, 100 ) }
								</span>
							</div>
						);
					} ) }
				</div>
			) : null }
		</div>
	);
};
