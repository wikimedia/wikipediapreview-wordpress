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
	const sectionsPrefix = 'wikipediapreview-edit-sections';

	const withoutSection = ( title ) => {
		if ( title && title.includes( '#' ) ) {
			return title.split( '#' )[ 0 ];
		}
		return title;
	};

	const isItemSelected = ( item ) => {
		return item.id === selectedSection;
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

	const getItemClassName = ( item, index ) => {
		return `${ sectionsPrefix }-list-item
				${ isItemSelected( item )
		? `${ sectionsPrefix }-list-item-selected`
		: '' }
				${ index === hoveredIndex
		? `${ sectionsPrefix }-list-item-hovered`
		: '' }
				`;
	};

	const getItemTitle = ( item, index ) => {
		return index === 0 ? __( 'Summary', 'wikipedia-preview' ) : item.id.replaceAll( '_', ' ' );
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
		const selectedSectionElement = document.querySelector( `.${ sectionsPrefix }-list-item-selected` );
		if ( selectedSectionElement ) {
			selectedSectionElement.scrollIntoView( { block: 'center' } );
			setHoverIndex( selectedSectionElement.tabIndex );
		}
	}, [ sections ] );

	useEffect( () => {
		const hoveredSectionElement = document.querySelector( `.${ sectionsPrefix }-list-item-hovered` );
		if ( hoveredSectionElement ) {
			hoveredSectionElement.scrollIntoView( { block: 'center', behavior: 'auto' } );
		}
	}, [ hoveredIndex ] );

	return (
		<div className={ `${ sectionsPrefix }` }>
			<div className={ `${ sectionsPrefix }-header` }>
				{ withoutSection( activeAttributes.title ) }
				<div
					className={ `${ sectionsPrefix }-header-close` }
					onClick={ () => setSelectingSection( false ) }
					role="presentation"
				></div>
			</div>
			{ sections && sections.length ? (
				<div className={ `${ sectionsPrefix }-list` }>
					{ sections.map( ( item, index ) => {
						return (
							<div
								className={ getItemClassName( item, index ) }
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
								<div className={ `${ sectionsPrefix }-list-item-content` }>
									<span className={ `${ sectionsPrefix }-list-item-content-title` }>
										{ getItemTitle( item, index ) }
									</span>
									<span
										className={ `${ sectionsPrefix }-list-item-content-text` }
										dangerouslySetInnerHTML={ { __html: item.extractHtml.substring( 0, 180 ) } }
									></span>
								</div>
								{ isItemSelected( item ) && (
									<div className={ `${ sectionsPrefix }-list-item-selected-indicator` }>
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
					down: ( e ) => {
						e.preventDefault();
						setHoverIndex( ( hoveredIndex + 1 ) % sections.length );
					},
					up: ( e ) => {
						e.preventDefault();
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
