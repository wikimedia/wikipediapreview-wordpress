const { WmfWpPopover } = require( './modal.js' );
const h = wp.element.createElement;
const { Fragment, useState } = wp.element;
const { RichTextToolbarButton } = wp.blockEditor;
const { registerFormatType, useAnchorRef, toggleFormat } = wp.richText;
const formatType = 'wmf/wp-format';
const formatTitle = 'Wikipedia Preview';

const WmfWpButton = function ( { isActive, onClick } ) {
	return h( RichTextToolbarButton, {
		icon: 'editor-code',
		title: formatTitle + ( isActive ? ' (ON)' : ' (OFF)' ),
		isActive,
		onClick,
	} );
};

const Edit = function ( { isActive, contentRef, value, onChange } ) {
	const [ isEditingWP ] = useState( false );
	const anchorRef = useAnchorRef( {
		ref: contentRef,
		value,
		settings,
	} );

	const toggleWP = function () {
		const text = value.text.substr( value.start, value.end - value.start );
		onChange(
			toggleFormat( value, {
				type: formatType,
				attributes: {
					'data-wikipedia-preview': '',
					'data-wp-title': text,
					'data-wp-lang': 'fr',
				},
			} )
		);
	};
	let popover = null;
	if ( isEditingWP || isActive ) {
		popover = WmfWpPopover( { anchorRef } );
	}
	return h(
		Fragment,
		null,
		WmfWpButton( { isActive, onClick: toggleWP } ),
		popover
	);
};

const settings = {
	title: formatTitle,
	tagName: 'span',
	className: 'wmf-wp-with-preview',
	edit: Edit,
};

registerFormatType( formatType, settings );
