import { Popover, TextControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

export const InlineEditUI = ( {
	anchorRef,
	focusOnMount = 'firstElement',
	onClose,
	onChange,
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
						onChange={ ( val ) => setNewLang( val ) }
					/>
					<TextControl
						label="title"
						value={ newTitle }
						onChange={ ( val ) => setNewTitle( val ) }
					/>
					<Button
						variant="link"
						onClick={ () => {
							onChange( newTitle, newLang );
						} }
					>
						Click me!
					</Button>
				</div>
			</Popover>
		</>
	);
};
