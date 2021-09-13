import {
	Popover,
	TextControl,
	Button,
	KeyboardShortcuts,
} from '@wordpress/components';
import { getTextContent, slice } from '@wordpress/rich-text';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { getSiteLanguage } from './utils';
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
	const [ searchList, setSearchList ] = useState( [] );
	const [ hoveredIndex, setHoverIndex ] = useState( -1 );

	useEffect( () => {
		setTitle( activeAttributes.title || getTextContent( slice( value ) ) );
		setLang( activeAttributes.lang || getSiteLanguage() );
	}, [ activeAttributes ] );

	useEffect( () => {
		if ( title ) {
			const term = title.trim();
			prefixSearch( lang, term, ( prefixData ) => {
				if ( ! prefixData.length ) {
					fulltextSearch( lang, term, ( fulltextData ) => {
						setSearchList( fulltextData );
					} );
				} else {
					setSearchList( prefixData );
				}
				setHoverIndex( -1 );
			} );
		} else {
			abortAllRequest();
			setSearchList( [] );
		}
	}, [ title ] );

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
				{ title && (
					<Button
						onClick={ () => {
							setTitle( '' );
						} }
						className="wikipediapreview-edit-inline-search-close"
					/>
				) }
			</div>
			{ searchList.length ? (
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
						onApply(
							value,
							searchList[ hoveredIndex ].title,
							lang
						);
					},
				} }
			/>
		</Popover>
	);
};
