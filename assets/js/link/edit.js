import { EditForm } from './form';
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

const ToggleButton = ( { isActive, onClick } ) => {
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

const Edit = ( { isActive, contentRef, value, onChange } ) => {
	const anchorRef = useAnchorRef( {
		ref: contentRef,
		value,
		settings,
	} );

	const toggleWP = () => {
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
			<ToggleButton isActive={ isActive } onClick={ toggleWP } />
			{ isActive && <EditForm anchorRef={ anchorRef } /> }
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
