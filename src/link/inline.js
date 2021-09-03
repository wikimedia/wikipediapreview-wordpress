import { Popover, TextControl, Button } from '@wordpress/components';
import { getTextContent, slice } from '@wordpress/rich-text';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { getSiteLanguage } from './utils';
import { search } from './api';

export const InlineEditUI = ( {
	anchorRef,
	onClose,
	onApply,
	value,
	activeAttributes,
} ) => {
	const [ title, setTitle ] = useState( activeAttributes.title );
	const [ lang, setLang ] = useState( activeAttributes.lang );
	const [ searchList, setSearchList ] = useState( false );

	useEffect( () => {
		setTitle( activeAttributes.title || getTextContent( slice( value ) ) );
		setLang( activeAttributes.lang || getSiteLanguage() );
	}, [ activeAttributes ] );

	useEffect( () => {
		if ( title ) {
			search( lang, title, ( data ) => {
				setSearchList( data );
			} );
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
				<TextControl
					label={ __( 'Add Wikipedia preview', 'wikipedia-preview' ) }
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
			{ searchList?.length ? (
				<div className="wikipediapreview-edit-inline-list">
					{ searchList.map( ( item, index ) => {
						return (
							// eslint-disable-next-line jsx-a11y/click-events-have-key-events
							<div
								className="wikipediapreview-edit-inline-list-item"
								key={ item.title }
								role="link"
								tabIndex={ index }
								onClick={ () => {
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
		</Popover>
	);
};
