import { useState } from '@wordpress/element';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import {
	useAnchorRef,
	toggleFormat,
	applyFormat,
	removeFormat,
} from '@wordpress/rich-text';
import { InlineEditUI } from './inline';

const formatType = 'wikipediapreview/link';
const formatTitle = 'Wikipedia Preview'; // @todo i18n

const Edit = ( {
	isActive,
	activeAttributes,
	contentRef,
	value,
	onChange,
} ) => {
	const [ isFormVisible, setFormVisible ] = useState( true );
	const anchorRef = useAnchorRef( {
		ref: contentRef,
		value,
		settings,
	} );

	const toggleWP = () => {
		onChange(
			toggleFormat( value, {
				type: formatType,
			} )
		);
		setFormVisible( ! isActive );
	};

	const updateAttributes = ( selectedValue, title, lang ) => {
		onChange(
			applyFormat( selectedValue, {
				type: formatType,
				attributes: {
					preview: '',
					title,
					lang,
				},
			} )
		);
		setFormVisible( false );
	};

	const removeAttributes = () => {
		onChange( removeFormat( value, formatType ) );
		setFormVisible( false );
	};

	return (
		<>
			<RichTextToolbarButton
				icon="editor-code"
				title={ `${ formatTitle } (${ isActive ? 'ON' : 'OFF' })` }
				isActive={ isActive }
				onClick={ toggleWP }
			/>
			{ isFormVisible && isActive && (
				<InlineEditUI
					anchorRef={ anchorRef }
					onChange={ updateAttributes }
					onRemove={ removeAttributes }
					value={ value }
					activeAttributes={ activeAttributes }
				/>
			) }
		</>
	);
};

export const name = formatType;
export const settings = {
	title: formatTitle,
	tagName: 'span',
	className: 'wmf-wp-with-preview', // class name from wikipedia preview item
	attributes: {
		title: 'data-wp-title',
		lang: 'data-wp-lang',
		preview: 'data-wikipedia-preview',
	},
	edit: Edit,
};