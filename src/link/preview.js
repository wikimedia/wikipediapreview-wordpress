import {
	useState,
	useEffect,
	useLayoutEffect,
	useCallback,
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

	const insertControllersMenu = useCallback( () => {
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
	}, [] );

	const addScrollListener = useCallback( () => {
		const scrollCue = document.querySelector( '.wikipediapreview-scroll-cue' );
		const body = document.querySelector( '.wikipediapreview-body' );
		if ( scrollCue ) {
			body.addEventListener( 'scroll', ( e ) => {
				if ( e.target.scrollTop > 0 ) {
					scrollCue.remove();
				}
			} );
		}
	}, [] );

	useEffect( () => {
		const { title, lang } = activeAttributes;
		if ( title && lang ) {
			wikipediaPreview.getPreviewHtml( title, lang, ( preview ) => {
				setPreviewHtml( preview );
			} );
		}
	}, [ activeAttributes ] );

	useEffect( () => {
		addScrollListener();
		if ( isPopoverExpanded() ) {
			// The parent header div (where the menu needs to be inserted)
			// comes from previewHtml so we need to construct the menu on the fly
			insertControllersMenu();

			return () => {
				document
					.querySelector(
						'.wikipediapreview-edit-preview-controllers-menu'
					)
					?.removeEventListener( 'click', toggleControllersMenu );
			};
		}
	}, [ previewHtml, selectingSection, insertControllersMenu, addScrollListener ] );

	useLayoutEffect( () => {
		document
			.querySelector( '.wikipediapreview-header-closebtn' )
			?.addEventListener( 'click', onForceClose );
		return () => {
			document
				.querySelector( '.wikipediapreview-header-closebtn' )
				?.removeEventListener( 'click', onForceClose );
		};
	}, [ previewHtml, onForceClose, selectingSection ] );

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
