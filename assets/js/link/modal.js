const h = wp.element.createElement;
const { Popover, TextControl } = wp.components;

export const WmfWpPopover = function ( { anchorRef, focusOnMount, onClose } ) {
	return h(
		Popover,
		{
			anchorRef, //={ anchorRef }
			focusOnMount, //={ focusOnMount.current }
			onClose, //={ stopAddingLink }
			position: 'bottom center',
		},
		h(
			'form',
			{
				style: { width: 250 },
			},
			h( TextControl, { label: 'lang', value: 'en' } ),
			h( TextControl, { label: 'title', value: 'cat' } )
		)
	);
};
