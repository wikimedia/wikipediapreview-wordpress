import { useEffect, useState } from '@wordpress/element';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import {
	create,
	insert,
	useAnchorRef,
	applyFormat,
	removeFormat,
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
		startViewingPreview();
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
		onChange( newValue );
		stopAddingPreview();
		startViewingPreview();
		onFocus();
	};

	const removeAttributes = () => {
		onChange( removeFormat( value, formatType ) );
		stopAddingPreview();
		stopViewingPreview();
	};

	const goToEdit = () => {
		stopViewingPreview();
		startAddingPreview();
	};

	const onClosePreview = () => {
		if ( ! Object.keys( activeAttributes ).length ) {
			stopViewingPreview();
		}
	};

	useEffect( () => {
		if ( Object.keys( activeAttributes ).length ) {
			stopAddingPreview();
			startViewingPreview();
		}
	}, [ activeAttributes ] );

	return (
		<>
			<RichTextToolbarButton
				icon="editor-code"
				title={ formatTitle }
				isActive={ isActive }
				onClick={ formatButtonClick }
			/>
			{ addingPreview && (
				<InlineEditUI
					anchorRef={ anchorRef }
					onApply={
						value.start !== value.end || activeAttributes.title
							? updateAttributes
							: insertText
					}
					value={ value }
					activeAttributes={ activeAttributes }
					onClose={ stopAddingPreview }
				/>
			) }
			{ viewingPreview && (
				<PreviewEditUI
					anchorRef={ anchorRef }
					onClose={ onClosePreview }
					onEdit={ goToEdit }
					onRemove={ removeAttributes }
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
