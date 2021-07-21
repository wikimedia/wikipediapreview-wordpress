import { Popover, TextControl, Button } from '@wordpress/components';
import { getTextContent, slice } from '@wordpress/rich-text';
import { useState, useEffect } from '@wordpress/element';
import { getSiteLanguage } from './utils';

export const InlineEditUI = ( {
	anchorRef,
	focusOnMount = 'firstElement',
	onClose,
	onApply,
	onRemove,
	value,
	activeAttributes,
} ) => {
	const [ title, setTitle ] = useState( activeAttributes.title );
	const [ lang, setLang ] = useState( activeAttributes.lang );

	useEffect( () => {
		setTitle( activeAttributes.title || getTextContent( slice( value ) ) );
		setLang( activeAttributes.lang || getSiteLanguage() );
	}, [ activeAttributes ] );

	return (
		<Popover
			anchorRef={ anchorRef }
			focusOnMount={ focusOnMount }
			onClose={ onClose }
			position="bottom center"
			noArrow={ false }
			expandOnMobile={ true }
		>
			<div className="wikipediapreview-edit-inline-container">
				<TextControl
					label="title"
					value={ title }
					onChange={ setTitle }
				/>
				<Button
					variant="secondary"
					className="is-primary"
					onClick={ () => {
						onApply( value, title, lang );
					} }
				>
					Add
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
