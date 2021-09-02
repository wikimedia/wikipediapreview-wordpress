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
	onRemove,
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
			noArrow={ false }
			expandOnMobile={ true }
		>
			<div className="wikipediapreview-edit-inline-container">
				<TextControl
					label={ __( 'Add Wikipedia preview', 'wikipedia-preview' ) }
					value={ title }
					onChange={ setTitle }
					placeholder={ __(
						'Search Wikipedia',
						'wikipedia-preview'
					) }
				/>
				{ /* <Button
					variant="secondary"
					className="is-primary"
					onClick={ () => {
						onApply( value, title, lang );
					} }
				>
					{ __( 'Add', 'wikipedia-preview' ) }
				</Button>{ ' ' }
				<Button
					variant="link"
					className="is-secondary"
					onClick={ onRemove }
				>
					{ __( 'Remove', 'wikipedia-preview' ) }
				</Button> */ }
			</div>
			{ searchList &&
				searchList.length &&
				searchList.map( ( item ) => {
					return (
						<div
							key={ item.title }
							onClick={ () => {
								onApply( value, item.title, lang );
							} }
						>
							<img
								src={ item.thumbnail }
								alt={ item.title }
								width="50"
							/>
							<span>
								{ item.title } <br />
								{ item.description }
							</span>
						</div>
					);
				} ) }
		</Popover>
	);
};
