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
			wikipediaPreview.getSections( lang, title, ( info ) => {
				setSections( info.sections );
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
								key={ item.id }
								role="link"
								tabIndex={ index }
								onClick={ () => {
									selectSection( item.id );
								} }
								onKeyUp={ () => {
									// TODO: console.log( 'onKeyUp' );
								} }
							>
								<span className="wikipediapreview-edit-sections-list-item-title">
									{ item.id }
								</span>
								<span className="wikipediapreview-edit-sections-list-item-content">
									{ item.extractHtml && item.extractHtml.substring( 0, 100 ) }
								</span>
							</div>
						);
					} ) }
				</div>
			) : null }
		</div>
	);
};
