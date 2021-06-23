import { WmfWpPopover } from './modal';
import { useState } from '@wordpress/element';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { decodeEntities } from '@wordpress/html-entities';
import {
	useAnchorRef,
	toggleFormat,
	isCollapsed,
	applyFormat,
} from '@wordpress/rich-text';

const formatType = 'wikipediapreview/link';
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

	// paste rule script copied from link format
	__unstablePasteRule( value, { html, plainText } ) {
		if ( isCollapsed( value ) ) {
			return value;
		}

		const pastedText = ( html || plainText )
			.replace( /<[^>]+>/g, '' )
			.trim();

		return applyFormat( value, {
			type: name,
			attributes: {
				url: decodeEntities( pastedText ),
			},
		} );
	},
};
