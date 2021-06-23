import { WmfWpPopover } from './modal';
import { useState } from '@wordpress/element';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { useAnchorRef, toggleFormat } from '@wordpress/rich-text';

const formatType = 'wmf/wikipedia-preview';
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

export const name = formatType;
export const settings = {
	title: formatTitle,
	tagName: 'span',
	className: 'wmf-wp-with-preview', // class name from wikipedia preview item
	edit: Edit,
};
