import {
	useState,
	useEffect,
	useLayoutEffect,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import wikipediaPreview from 'wikipedia-preview';

export const PreviewEditUI = ( {
	activeAttributes,
	onForceClose,
	onEdit,
	onRemove,
} ) => {
	const [ previewHtml, setPreviewHtml ] = useState( null );
	const [ showControllersMenu, setShowControllersMenu ] = useState( true );
	const toggleControllersMenu = () => {
		/* eslint-disable-next-line no-shadow */
		setShowControllersMenu( ( showControllersMenu ) => ! showControllersMenu );
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
	}, [ previewHtml, onForceClose ] );

	return (
		<div className="wikipediapreview-edit-preview-container">
			<div
				className="wikipediapreview-edit-preview"
				dangerouslySetInnerHTML={ { __html: previewHtml } }
			></div>
			{ previewHtml && showControllersMenu && (
				<ControllerEditUI onEdit={ onEdit } onRemove={ onRemove } />
			) }
		</div>
	);
};

const isPopoverExpanded = () => {
	const hasPreviewPopup = document.querySelector(
		'.wikipediapreview-edit-preview-container'
	);
	const hasExpandedClass = document.querySelector( '.is-expanded' );
	return hasPreviewPopup && hasExpandedClass;
};

const ControllerEditUI = ( { onEdit, onRemove } ) => {
	return (
		<div className="wikipediapreview-edit-preview-controllers">
			<div
				className="wikipediapreview-edit-preview-controllers-change"
				onClick={ onEdit }
				role="presentation"
			>
				{ __( 'Change', 'wikipedia-preview' ) }
			</div>
			<div
				className="wikipediapreview-edit-preview-controllers-remove"
				onClick={ onRemove }
				role="presentation"
			>
				{ __( 'Remove', 'wikipedia-preview' ) }
			</div>
		</div>
	);
};
