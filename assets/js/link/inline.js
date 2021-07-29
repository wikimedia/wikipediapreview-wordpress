import { Popover, TextControl, Button } from '@wordpress/components';
import { getTextContent, slice } from '@wordpress/rich-text';
import { useState, useEffect } from '@wordpress/element';
import { getSiteLanguage } from './utils';

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
	const { __, _x, _n, sprintf } = wp.i18n;

	useEffect( () => {
		setTitle( activeAttributes.title || getTextContent( slice( value ) ) );
		setLang( activeAttributes.lang || getSiteLanguage() );
	}, [ activeAttributes ] );

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
					label="Add Wikipedia preview"
					value={ title }
					onChange={ setTitle }
					placeholder="Type preview to add"
				/>
				<Button
					variant="secondary"
					className="is-primary"
					onClick={ () => {
						onApply( value, title, lang );
					} }
				>
					{__( 'Add', 'wikipedia-preview' )}
				</Button>{ ' ' }
				<Button
					variant="link"
					className="is-secondary"
					onClick={ onRemove }
				>
					Remove
				</Button>
			</div>
		</Popover>
	);
};
