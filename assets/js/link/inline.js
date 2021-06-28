import {
	Popover,
	TextControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import { getTextContent, slice } from '@wordpress/rich-text';
import { useState, useEffect } from '@wordpress/element';

export const InlineEditUI = ( {
	anchorRef,
	focusOnMount = 'firstElement',
	onClose,
	onChange,
	onRemove,
	value,
	activeAttributes,
} ) => {
	const [ title, setTitle ] = useState( activeAttributes.title );
	const [ lang, setLang ] = useState( activeAttributes.lang );

	useEffect( () => {
		setTitle( activeAttributes.title || getTextContent( slice( value ) ) );
		setLang( activeAttributes.lang || 'fr' );
	}, [ activeAttributes ] );

	return (
		<>
			<Popover
				anchorRef={ anchorRef }
				focusOnMount={ focusOnMount }
				onClose={ onClose }
				position="bottom center"
				expandOnMobile={ true }
			>
				<div className="wikipediapreview-edit-inline-container">
					<SelectControl
						label="Size"
						value={ lang }
						options={ [
							{ label: 'en', value: 'en' },
							{ label: 'fr', value: 'fr' },
						] }
						onChange={ setLang }
					/>
					<TextControl
						label="title"
						value={ title }
						onChange={ setTitle }
					/>
					<Button
						variant="secondary"
						className="is-primary"
						onClick={ () => {
							onChange( value, title, lang );
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
		</>
	);
};
