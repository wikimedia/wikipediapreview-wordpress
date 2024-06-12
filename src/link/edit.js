import { useEffect, useState, useRef, useCallback } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import {
	create,
	insert,
	applyFormat,
	removeFormat,
} from '@wordpress/rich-text';
import { __ } from '@wordpress/i18n';
import { WikipediaPreviewPopover } from './popover';
import { CustomTooltip } from './tooltip';

const formatType = 'wikipediapreview/link';
const formatTitle = __( 'Wikipedia Preview', 'wikipedia-preview' );

const generateWikipediaLogo = ( color = 'black' ) => {
	return (
		<svg
			viewBox="-2 -2 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.0958 4.01H13.9558C14.0642 4.2131 14.0642 4.4569 13.9558 4.66C12.9558 4.82 12.5958 5.57 12.1458 6.49L10.7458 9.24L13.0958 14.45H13.1658L16.6858 6.35C17.1258 5.28 17.0858 4.76 15.8958 4.65C15.7855 4.44736 15.7855 4.20264 15.8958 4H19.3458C19.4561 4.20264 19.4561 4.44736 19.3458 4.65C18.1358 4.81 17.9258 5.56 17.5358 6.48L13.1658 16.56C13.0358 16.86 12.9258 17.01 12.7258 17.01C12.5258 17.01 12.3958 16.85 12.3058 16.56L9.8258 10.83L7.1058 16.56C6.9958 16.86 6.8658 17.01 6.6658 17.01C6.4658 17.01 6.3558 16.85 6.2458 16.56L2.2458 6.47C1.6758 5.07 1.6458 4.77 0.5958 4.67C0.475598 4.46822 0.468036 4.21869 0.575797 4.01H4.4858C4.59606 4.21264 4.59606 4.45736 4.4858 4.66C3.3258 4.79 3.2758 5.11 3.7458 6.24L7.1558 14.43H7.2058L9.2558 10.01L7.7358 6.46C7.1258 5.06 6.9558 4.78 6.1958 4.67C6.08735 4.4669 6.08735 4.2231 6.1958 4.02H9.5158C9.62606 4.22264 9.62606 4.46736 9.5158 4.67C8.7758 4.79 8.8158 5.12 9.3258 6.25L10.1958 8.25L10.2758 8.34L11.2758 6.34C11.8458 5.2 11.9158 4.76 11.1258 4.64C11.0148 4.44713 11.0036 4.21255 11.0958 4.01Z"
				fill={ color }
			/>
		</svg>
	);
};

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
	const valueRef = useRef( value );
	const toolbarButtonRef = useRef();

	const formatButtonClick = () => {
		if ( ! isActive ) {
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
		onFocus();
	};

	const updateAttributes = ( selectedValue, title, lang ) => {
		const newValue = applyFormat(
			selectedValue,
			{
				type: formatType,
				attributes: {
					preview: '',
					title,
					lang,
				},
			},
			getTrimmedStart( selectedValue ),
			getTrimmedEnd( selectedValue )
		);
		onChange( newValue );
		onFocus();
	};

	const removeAttributes = () => {
		onChange( removeFormat( value, formatType ) );
		stopAddingPreview();
		stopViewingPreview();
	};

	const goToEdit = () => {
		startAddingPreview();
		stopViewingPreview();
	};

	const getFormatStart = useCallback( ( position ) => {
		if (
			value.formats[ position ] &&
			value.formats[ position ][ 0 ].type === formatType
		) {
			return getFormatStart( position - 1 );
		}
		return position;
	}, [ value.formats ] );

	const getFormatEnd = useCallback( ( position ) => {
		if (
			value.formats[ position ] &&
			value.formats[ position ][ 0 ].type === formatType
		) {
			return getFormatEnd( position + 1 );
		}
		return position;
	}, [ value.formats ] );

	const getTrimmedStart = ( selectedValue ) => {
		const selectedString = selectedValue.text.slice(
			selectedValue.start,
			selectedValue.end
		);
		const trimmed = selectedString.trimStart();
		if ( selectedString.length !== trimmed.length ) {
			const delta = selectedString.length - trimmed.length;
			return selectedValue.start + delta;
		}
		return selectedValue.start;
	};

	const getTrimmedEnd = ( selectedValue ) => {
		const selectedString = selectedValue.text.slice(
			selectedValue.start,
			selectedValue.end
		);
		const trimmed = selectedString.trimEnd();
		if ( selectedString.length !== trimmed.length ) {
			const delta = selectedString.length - trimmed.length;
			return selectedValue.end - delta;
		}
		return selectedValue.end;
	};

	const handleTextFormatRemoval = useCallback( () => {
		// Assuming a Left-To-Right language:
		// --> cursorDirection > 0 means cursor is moving left
		// --> cursorDirection < 0 means cursor is moving right
		const previousValue = valueRef.current;
		const cursorDirection = previousValue.start - value.start;
		const editDetected = value.text !== previousValue.text;
		const involvesPreviewFormat =
			cursorDirection >= 0
				? previousValue.formats[ value.start ] &&
				previousValue.formats[ value.start ][ 0 ].type === formatType
				: previousValue.formats[ value.end - 1 ] &&
				previousValue.formats[ value.end - 1 ][ 0 ].type === formatType;

		if ( editDetected && involvesPreviewFormat ) {
			const formatStart = getFormatStart( value.start - 1 );
			const formatEnd = getFormatEnd( value.end + 1 );
			onChange( removeFormat( value, formatType, formatStart, formatEnd ) );
		}
	}, [ getFormatStart, getFormatEnd, onChange, value ] );

	useEffect( () => {
		if ( Object.keys( activeAttributes ).length ) {
			stopAddingPreview();
			startViewingPreview();
		} else {
			stopViewingPreview();
		}
	}, [ activeAttributes ] );

	useEffect( () => {
		handleTextFormatRemoval();
		valueRef.current = value;
	}, [ value, handleTextFormatRemoval ] );

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ generateWikipediaLogo( isActive ? 'white' : 'black' ) }
						title={ __( 'Add Wikipedia Preview', 'wikipedia-preview' ) }
						isActive={ isActive }
						onClick={ formatButtonClick }
						ref={ toolbarButtonRef }
					/>
				</ToolbarGroup>
			</BlockControls>
			<CustomTooltip
				anchorRef={ toolbarButtonRef }
				addingPreview={ addingPreview }
			/>
			{ ( addingPreview || viewingPreview ) && (
				<WikipediaPreviewPopover
					addingPreview={ addingPreview }
					stopAddingPreview={ stopAddingPreview }
					viewingPreview={ viewingPreview }
					stopViewingPreview={ stopViewingPreview }
					updateAttributes={ updateAttributes }
					insertText={ insertText }
					removeAttributes={ removeAttributes }
					goToEdit={ goToEdit }
					value={ value }
					activeAttributes={ activeAttributes }
					contentRef={ contentRef }
					settings={ settings }
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
