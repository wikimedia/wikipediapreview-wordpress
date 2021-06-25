import { Popover, TextControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

export const InlineEditUI = ( {
	anchorRef,
	focusOnMount = 'firstElement',
	onClose,
	onChange,
	onRemove,
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
					<TextControl
						label="lang"
						value={ newLang }
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
							onChange( newTitle, newLang );
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
