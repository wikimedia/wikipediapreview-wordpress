import { useEffect, useState } from '@wordpress/element';
import { KeyboardShortcuts } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import wikipediaPreview from 'wikipedia-preview';

export const Sections = ( {
	value,
	updateAttributes,
	activeAttributes,
	setPreviewHtml,
	setSelectingSection,
} ) => {
	const [ sections, setSections ] = useState( null );
	const [ hoveredIndex, setHoverIndex ] = useState( -1 );
	const [ selectedSection, setSelectedSection ] = useState( null );

	const withoutSection = ( title ) => {
		if ( title && title.includes( '#' ) ) {
			return title.split( '#' )[ 0 ];
		}
		return title;
	};

	const selectSection = ( sectionTitle ) => {
		const { title, lang } = activeAttributes;
		const titleWithSection = `${ withoutSection( title ) }#${ sectionTitle }`;
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

	useEffect( () => {
		const selectedSectionElement = document.querySelector( '.wikipediapreview-edit-sections-list-item-selected' );
		if ( selectedSectionElement ) {
			selectedSectionElement.scrollIntoView( { block: 'center' } );
		}
	}, [ sections ] );

	useEffect( () => {
		const hoveredSectionElement = document.querySelector( '.wikipediapreview-edit-sections-list-item-hovered' );
		if ( hoveredSectionElement ) {
			hoveredSectionElement.scrollIntoView( { block: 'center', behavior: 'auto' } );
		}
	}, [ hoveredIndex ] );

	return (
		<div className="wikipediapreview-edit-sections">
			<div className="wikipediapreview-edit-sections-header">
				{ withoutSection( activeAttributes.title ) }
				<div
					className="wikipediapreview-edit-sections-header-close"
					onClick={ () => setSelectingSection( false ) }
					role="presentation"
				></div>
			</div>
			{ sections && sections.length ? (
				<div className="wikipediapreview-edit-sections-list">
					{ sections.map( ( item, index ) => {
						return (
							<div
								className={
									`wikipediapreview-edit-sections-list-item
									${ item.id === selectedSection
								? 'wikipediapreview-edit-sections-list-item-selected'
								: '' }
									${ index === hoveredIndex
								? 'wikipediapreview-edit-sections-list-item-hovered'
								: '' }`
								}
								key={ item.id }
								role="link"
								tabIndex={ index }
								onClick={ () => {
									selectSection( item.id );
								} }
								onKeyUp={ () => {
									selectSection( item.id );
								} }
								onMouseEnter={ () => setHoverIndex( -1 ) }
							>
								<div className="wikipediapreview-edit-sections-list-item-content">
									<span className="wikipediapreview-edit-sections-list-item-content-title">
										{ index === 0 ? __( 'Summary', 'wikipedia-preview' ) : item.id.replaceAll( '_', ' ' ) }
									</span>
									<span
										className="wikipediapreview-edit-sections-list-item-content-text"
										dangerouslySetInnerHTML={ { __html: item.extractHtml.substring( 0, 180 ) } }
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
			<KeyboardShortcuts
				bindGlobal={ true }
				shortcuts={ {
					down: () => {
						setHoverIndex( ( hoveredIndex + 1 ) % sections.length );
					},
					up: () => {
						setHoverIndex(
							hoveredIndex ? hoveredIndex - 1 : sections.length - 1
						);
					},
					enter: () => {
						selectSection( sections[ hoveredIndex ].id );
					},
					escape: () => {
						setSelectingSection( false );
					},
				} }
			/>
		</div>
	);
};
