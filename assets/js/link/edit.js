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

const Edit = ( { isActive, contentRef, value, onChange } ) => {
	const [ isFormVisible, setFormVisible ] = useState( true );
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
		setFormVisible( ! isActive );
	};

	const updateAttributes = ( title, lang ) => {
		onChange(
			applyFormat( value, {
				type: formatType,
				attributes: {
					'data-wikipedia-preview': '',
					'data-wp-title': title,
					'data-wp-lang': lang,
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
					lang={ 'en' }
					title={ value.text.substr(
						value.start,
						value.end - value.start
					) }
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
	edit: Edit,
};
