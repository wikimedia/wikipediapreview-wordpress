import { useEffect, useState } from '@wordpress/element';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import {
	create,
	insert,
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
	onFocus
} ) => {
	const [ addingPreview, setAddingPreview ] = useState( false );
	const startAddingPreview = () => setAddingPreview( true );
	const stopAddingPreview = () => setAddingPreview( false );

	const anchorRef = useAnchorRef( {
		ref: contentRef,
		value,
		settings,
	} );

	const formatButtonClick = () => {
		if ( isActive ) {
			removeAttributes();
		} else {
			startAddingPreview();
		}
	};

	const insertText = ( selectedValue, title, lang ) => {
		const toInsert = applyFormat(
			create( { text: title } ),
			{
				type: formatType,
				attributes: {
					preview: '',
					title,
					lang,
				},
			},
			0,
			title.length
		);
		onChange( insert( value, toInsert ) );
		stopAddingPreview();
	};

	const updateAttributes = ( selectedValue, title, lang ) => {
		const newValue = applyFormat( selectedValue, {
			type: formatType,
			attributes: {
				preview: '',
				title,
				lang,
			},
		} );
		newValue.start = newValue.end;
		newValue.activeFormats = [];
		onChange( newValue );
		stopAddingPreview();
		onFocus();
	};

	const removeAttributes = () => {
		onChange( removeFormat( value, formatType ) );
		stopAddingPreview();
	};

	return (
		<>
			<RichTextToolbarButton
				icon="editor-code"
				title={ `${ formatTitle } (${ isActive ? 'ON' : 'OFF' })` }
				isActive={ isActive }
				onClick={ formatButtonClick }
			/>
			{ ( addingPreview || isActive ) && (
				<InlineEditUI
					anchorRef={ anchorRef }
					onApply={
						value.start !== value.end || activeAttributes.title
							? updateAttributes
							: insertText
					}
					onRemove={ removeAttributes }
					value={ value }
					activeAttributes={ activeAttributes }
					onClose={ stopAddingPreview }
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
