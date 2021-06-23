import { Popover, TextControl } from '@wordpress/components';

export const WmfWpPopover = function ( { anchorRef, focusOnMount, onClose } ) {
	return (
		<>
			<Popover
				anchorRef={ anchorRef }
				focusOnMount={ focusOnMount }
				onClose={ onClose }
				position="bottom center"
			/>
			<form>
				<TextControl label="lang" value="en" />
				<TextControl label="title" value="cat" />
			</form>
		</>
	);
};
