import { useEffect, useState } from '@wordpress/element';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import {
	create,
	insert,
	useAnchorRef,
	applyFormat,
	removeFormat,
	getActiveFormat
} from '@wordpress/rich-text';
import { __ } from '@wordpress/i18n';
import { InlineEditUI } from './inline';
import { PreviewEditUI } from './preview';

const formatType = 'wikipediapreview/link';
const formatTitle = __( 'Wikipedia Preview', 'wikipedia-preview' );

const Edit = ( {
	isActive,
	activeAttributes,
	contentRef,
	value,
	onChange,
	onFocus,
} ) => {
	const [ addingPreview, setAddingPreview ] = useState( false );
	const startAddingPreview = () => setAddingPreview( true );
	const stopAddingPreview = () => setAddingPreview( false );
	const [ viewingPreview, setViewingPreview ] = useState( false );
	const startViewingPreview = () => setViewingPreview( true );
	const stopViewingPreview = () => setViewingPreview( false );
	const [ previewTitle, setPreviewTitle ] = useState( );
	const activePreview = getActiveFormat( value, name );

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
		// console.log('edit.js - updateAttributes - addingPreview...', addingPreview);
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
		setPreviewTitle(title)
		stopAddingPreview();
		startViewingPreview()
		onFocus();
	};

	const removeAttributes = () => {
		onChange( removeFormat( value, formatType ) );
		stopAddingPreview();
	};

	useEffect( () => {
		// console.log('edit.js - useEffect - addingPreview, viewingPreview...', addingPreview, viewingPreview);
		// console.log('...isActive, activeAttributes...', isActive, activeAttributes);
		// console.log('...previewTitle...', previewTitle);
		// console.log('...activePreview...', activePreview);
		if (activePreview) {
			stopAddingPreview();
			setPreviewTitle(activePreview.attributes.title)
			startViewingPreview();
		}
	}, [activePreview])

	return (
		<>
			<RichTextToolbarButton
				icon="editor-code"
				title={ formatTitle }
				isActive={ isActive }
				onClick={ formatButtonClick }
			/>
			{ ( addingPreview && !viewingPreview ) && (
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
			{ ( viewingPreview && !addingPreview || isActive ) && (
				<PreviewEditUI
					anchorRef={ anchorRef }
					onClose={ stopViewingPreview }
					title={previewTitle}
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
