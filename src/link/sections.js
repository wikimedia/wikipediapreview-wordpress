import { useEffect, useState } from '@wordpress/element';
import wikipediaPreview from 'wikipedia-preview';

export const Sections = ( {
	value,
	updateAttributes,
	activeAttributes,
	setPreviewHtml,
	setSelectingSection,
} ) => {
	const [ sections, setSections ] = useState( null );
	const [ selectedSection, setSelectedSection ] = useState( null );

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
		const [ titlePart, sectionPart ] = title.split( '#' );

		if ( ! sectionPart ) {
			setSelectedSection( titlePart );
		} else {
			setSelectedSection( sectionPart );
		}

		if ( ! sections && title && lang ) {
			wikipediaPreview.getSections( lang, title, ( info ) => {
				setSections( info.sections );
			} );
		}
	}, [] );

	return (
		<div className="wikipediapreview-edit-sections">
			<div className="wikipediapreview-edit-sections-header">
				{ activeAttributes.title }
			</div>
			{ sections && sections.length ? (
				<div className="wikipediapreview-edit-sections-list">
					{ sections.map( ( item, index ) => {
						return (
							<div
								className={ `wikipediapreview-edit-sections-list-item ${ item.id === selectedSection ? 'wikipediapreview-edit-sections-list-item-selected' : '' }` }
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
								<div className="wikipediapreview-edit-sections-list-item-content">
									<span className="wikipediapreview-edit-sections-list-item-content-title">
										{ item.id }
									</span>
									<span
										className="wikipediapreview-edit-sections-list-item-content-text"
										dangerouslySetInnerHTML={ { __html: item.extractHtml.substring( 0, 100 ) } }
									></span>
								</div>
								{ item.id === selectedSection && (
									<div className="wikipediapreview-edit-sections-list-item-selected-indicator">
									</div>
								) }
							</div>
						);
					} ) }
				</div>
			) : null }
		</div>
	);
};
