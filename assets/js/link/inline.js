import {
	Popover,
	TextControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

export const InlineEditUI = ( {
	anchorRef,
	focusOnMount = 'firstElement',
	onClose,
	onChange,
	onRemove,
	value,
	lang,
	title,
} ) => {
	const [ newTitle, setNewTitle ] = useState( title );
	const [ newLang, setNewLang ] = useState( lang );
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
