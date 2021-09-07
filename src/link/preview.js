import { Popover } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { getSiteLanguage } from './utils';
import { getPreviewHtml } from 'wikipedia-preview'

export const PreviewEditUI = ( {
	anchorRef,
  title,
	activePreview,
	onClose,
	onEdit,
	onRemove
} ) => {
	const [previewHtml, setPreviewHtml] = useState(null);
	const lang = getSiteLanguage()

	useEffect( () => {
		getPreviewHtml(title, lang, preview => {
			setPreviewHtml(preview)
		});
	}, [ activePreview ] );

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
					<div className="wikipediapreview-edit-preview" dangerouslySetInnerHTML={{__html: previewHtml}}></div>
					{previewHtml && (
						<ControllerEditUI
							onEdit={onEdit}
							onRemove={onRemove}
						/>
					)}
				</div>
			</Popover>
		</div>
	);
};

const ControllerEditUI = ( {
	onEdit,
	onRemove
} ) => {
	return (
		<div className="wikipediapreview-edit-preview-controllers">
			<div className="wikipediapreview-edit-preview-controllers-change" onClick={onEdit}>{ __( 'Change', 'wikipedia-preview' ) }</div>
			<div className="wikipediapreview-edit-preview-controllers-remove" onClick={onRemove}>{ __( 'Remove', 'wikipedia-preview' ) }</div>
		</div>
	);
};
