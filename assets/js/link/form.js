import { Popover, TextControl } from '@wordpress/components';

export const EditForm = ( { anchorRef, focusOnMount, onClose } ) => {
	return (
		<>
			<Popover
				anchorRef={ anchorRef }
				focusOnMount={ focusOnMount }
				onClose={ onClose }
				position="bottom center"
			>
				{ /* @todo styling */ }
				<TextControl label="lang" value="en" />
				<TextControl label="title" value="cat" />
			</Popover>
		</>
	);
};
