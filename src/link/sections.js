import { useEffect, useState } from '@wordpress/element';
import { KeyboardShortcuts } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import wikipediaPreview from 'wikipedia-preview';
import { titleWithoutSection } from './utils';

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
	const [ loading, setLoading ] = useState( true );
	const sectionsPrefix = 'wikipediapreview-edit-sections';

	const isItemSelected = ( item ) => {
		return item.id === selectedSection;
	};

	const craftNewTitle = ( title, selected ) => {
		return title === selected ? titleWithoutSection( title ) : `${ titleWithoutSection( title ) }#${ selected }`;
	};

	const selectSection = ( selectedSection ) => {
		const { title, lang } = activeAttributes;
		const newTitle = craftNewTitle( title, selectedSection );
		wikipediaPreview.getPreviewHtml( newTitle, lang, ( preview ) => {
			setPreviewHtml( preview );
		} );
		setSelectingSection( false );
		updateAttributes( value, newTitle, lang );
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
		const [ titlePart, sectionPart ] = title && title.split( '#' );
		const selectedSectionElement = document.querySelector( `.${ sectionsPrefix }-list-item-selected` );

		if ( ! sectionPart ) {
			setSelectedSection( titlePart );
		} else {
			setSelectedSection( sectionPart );
		}

		if ( ! sections && title && lang ) {
			wikipediaPreview.getSections( lang, title, ( info ) => {
				setSections( info.sections );
				setLoading( false );
			} );
		}

		if ( selectedSectionElement ) {
			selectedSectionElement.scrollIntoView( { block: 'center' } );
			setHoverIndex( selectedSectionElement.tabIndex );
		}
	}, [ activeAttributes, sections ] );

	useEffect( () => {
		const hoveredSectionElement = document.querySelector( `.${ sectionsPrefix }-list-item-hovered` );
		if ( hoveredSectionElement ) {
			hoveredSectionElement.scrollIntoView( { block: 'center', behavior: 'auto' } );
		}
	}, [ hoveredIndex ] );

	return (
		<div className={ `${ sectionsPrefix }` }>
			<div className={ `${ sectionsPrefix }-header` }>
				{ titleWithoutSection( activeAttributes.title ) }
				<div
					className={ `${ sectionsPrefix }-header-close` }
					onClick={ () => setSelectingSection( false ) }
					role="presentation"
				></div>
			</div>
			{ ! loading && sections && sections.length ? (
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
			{ loading && (
				<div className={ `${ sectionsPrefix }-loading` }>
					<div className={ `${ sectionsPrefix }-loading-spinner` }></div>
					<bdi className={ `${ sectionsPrefix }-loading-message` }>
						{ __( 'Loading sections…', 'wikipedia-preview' ) }
					</bdi>
				</div>
			) }
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
