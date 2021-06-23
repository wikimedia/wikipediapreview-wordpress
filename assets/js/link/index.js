import { WmfWpPopover } from './modal.js';
import { useState } from '@wordpress/element';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import {
	registerFormatType,
	useAnchorRef,
	toggleFormat,
} from '@wordpress/rich-text';

const formatType = 'wmf/wp-format';
const formatTitle = 'Wikipedia Preview';

const WmfWpButton = function ( { isActive, onClick } ) {
	const icon = 'editor-code';
	const title = formatTitle + ( isActive ? ' (ON)' : ' (OFF)' );
	return (
		<RichTextToolbarButton
			icon={ icon }
			title={ title }
			isActive={ isActive }
			onClick={ onClick }
		/>
	);
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

	return (
		<>
			<WmfWpButton isActive={ isActive } onClick={ toggleWP } />
			{ ( isEditingWP || isActive ) && (
				<WmfWpPopover anchorRef={ anchorRef } />
			) }
		</>
	);
};

const settings = {
	title: formatTitle,
	tagName: 'span',
	className: 'wmf-wp-with-preview',
	edit: Edit,
};

registerFormatType( formatType, settings );
