import { Popover } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { getPreviewHtml } from 'wikipedia-preview';

export const PreviewEditUI = ( {
	anchorRef,
	activeAttributes,
	onClose,
	onEdit,
	onRemove,
} ) => {
	const [ previewHtml, setPreviewHtml ] = useState( null );

	useEffect( () => {
		const { title, lang } = activeAttributes;
		if ( title && lang ) {
			getPreviewHtml( title, lang, ( preview ) => {
				setPreviewHtml( preview );
			} );
		}
	}, [ activeAttributes ] );

	return (
		<div>
			<Popover
				anchorRef={ anchorRef }
				onClose={ onClose }
				position="bottom center"
				noArrow={ false }
				expandOnMobile={ true }
				className="wikipediapreview-edit-preview-popover"
			>
				<div className="wikipediapreview-edit-preview-container">
					<div
						className="wikipediapreview-edit-preview"
						dangerouslySetInnerHTML={ { __html: previewHtml } }
					></div>
					{ previewHtml && (
						<ControllerEditUI
							onEdit={ onEdit }
							onRemove={ onRemove }
						/>
					) }
				</div>
			</Popover>
		</div>
	);
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
