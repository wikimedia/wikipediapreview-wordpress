import {
	useState,
	useEffect,
	useLayoutEffect,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import wikipediaPreview from 'wikipedia-preview';
import { Sections } from './sections';

export const PreviewEditUI = ( {
	onEditTopic,
	onRemove,
	onForceClose,
	activeAttributes,
	updateAttributes,
	value,
} ) => {
	const [ previewHtml, setPreviewHtml ] = useState( null );
	const [ selectingSection, setSelectingSection ] = useState( false );
	const [ showControllersMenu, setShowControllersMenu ] = useState( true );
	const toggleControllersMenu = () => {
		/* eslint-disable-next-line no-shadow */
		setShowControllersMenu( ( showControllersMenu ) => ! showControllersMenu );
	};

	const showSections = () => {
		setSelectingSection( true );
	};

	useEffect( () => {
		const { title, lang } = activeAttributes;
		if ( title && lang ) {
			wikipediaPreview.getPreviewHtml( title, lang, ( preview ) => {
				setPreviewHtml( preview );
			} );
		}
	}, [ activeAttributes ] );

	useEffect( () => {
		if ( isPopoverExpanded() ) {
			const preview = document.querySelector( '.wikipediapreview' );
			const previewHeader = document.querySelector(
				'.wikipediapreview-header'
			);
			const previewHeaderCloseBtn = document.querySelector(
				'.wikipediapreview-header-closebtn'
			);
			const controllersMenu = document.createElement( 'div' );
			controllersMenu.setAttribute(
				'class',
				'wikipediapreview-edit-preview-controllers-menu'
			);
			controllersMenu.addEventListener( 'click', toggleControllersMenu );
			setShowControllersMenu( false );

			if ( previewHeader ) {
				previewHeader.insertBefore(
					controllersMenu,
					previewHeaderCloseBtn
				);
			}

			// special handle to set the container direction
			if ( preview ) {
				document
					.querySelector( '.wikipediapreview-edit-preview-container' )
					.setAttribute( 'dir', preview.getAttribute( 'dir' ) );
			}

			return () => {
				document
					.querySelector(
						'.wikipediapreview-edit-preview-controllers-menu'
					)
					?.removeEventListener( 'click', toggleControllersMenu );
			};
		}
	}, [ previewHtml ] );

	useLayoutEffect( () => {
		document
			.querySelector( '.wikipediapreview-header-closebtn' )
			?.addEventListener( 'click', onForceClose );
		return () => {
			document
				.querySelector( '.wikipediapreview-header-closebtn' )
				?.removeEventListener( 'click', onForceClose );
		};
	}, [ previewHtml ] );

	return (
		<>
			{ ! selectingSection ? (
				<div className="wikipediapreview-edit-preview-container">
					<div
						className="wikipediapreview-edit-preview"
						dangerouslySetInnerHTML={ { __html: previewHtml } }
					></div>
					{ previewHtml && showControllersMenu && (
						<ControllerEditUI onEditTopic={ onEditTopic } onEditSection={ showSections } onRemove={ onRemove } />
					) }
				</div>
			) : (
				<Sections
					value={ value }
					updateAttributes={ updateAttributes }
					activeAttributes={ activeAttributes }
					setPreviewHtml={ setPreviewHtml }
					setSelectingSection={ setSelectingSection }
				/>
			) }
		</>
	);
};

const isPopoverExpanded = () => {
	const hasPreviewPopup = document.querySelector(
		'.wikipediapreview-edit-preview-container'
	);
	const hasExpandedClass = document.querySelector( '.is-expanded' );
	return hasPreviewPopup && hasExpandedClass;
};

const ControllerEditUI = ( { onEditTopic, onEditSection, onRemove } ) => {
	return (
		<div className="wikipediapreview-edit-preview-controllers">
			<div
				className="wikipediapreview-edit-preview-controllers-option"
				onClick={ onEditTopic }
				role="presentation"
			>
				<div className="wikipediapreview-edit-preview-controllers-option-icon-change"></div>
				<div className="wikipediapreview-edit-preview-controllers-option-message">
					{ __( 'Topic', 'wikipedia-preview' ) }
				</div>
			</div>
			<div
				className="wikipediapreview-edit-preview-controllers-option"
				onClick={ onEditSection }
				role="presentation"
			>
				<div className="wikipediapreview-edit-preview-controllers-option-icon-sections"></div>
				<div className="wikipediapreview-edit-preview-controllers-option-message">
					{ __( 'Sections', 'wikipedia-preview' ) }
				</div>
			</div>
			<div
				className="wikipediapreview-edit-preview-controllers-option"
				onClick={ onRemove }
				role="presentation"
			>
				<div className="wikipediapreview-edit-preview-controllers-option-icon-remove"></div>
				<div className="wikipediapreview-edit-preview-controllers-option-message">
					{ __( 'Remove', 'wikipedia-preview' ) }
				</div>
			</div>
		</div>
	);
};
