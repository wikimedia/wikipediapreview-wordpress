import {
	Popover,
	TextControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import { getTextContent, slice } from '@wordpress/rich-text';
import { useState } from '@wordpress/element';

export const InlineEditUI = ( {
	anchorRef,
	focusOnMount = 'firstElement',
	onClose,
	onChange,
	onRemove,
	value,
	activeAttributes,
} ) => {
	const selectedTitle =
		activeAttributes.title || getTextContent( slice( value ) );
	const selectedLang = activeAttributes.lang || 'fr'; // default lang of wordpress site
	const [ newTitle, setNewTitle ] = useState( selectedTitle );
	const [ newLang, setNewLang ] = useState( selectedLang );
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
						value={ newLang }
						options={ [
							{ label: 'en', value: 'en' },
							{ label: 'fr', value: 'fr' },
						] }
						onChange={ setNewLang }
					/>
					<TextControl
						label="title"
						value={ newTitle }
						onChange={ setNewTitle }
					/>
					<Button
						variant="link"
						onClick={ () => {
							onChange( value, newTitle, newLang );
						} }
					>
						Click me!
					</Button>
					<Button variant="link" onClick={ onRemove }>
						Remove
					</Button>
				</div>
			</Popover>
		</>
	);
};
