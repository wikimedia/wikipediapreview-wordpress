import { Popover } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
// import { getSiteLanguage } from './utils';
import { getPreviewHtml } from 'wikipedia-preview'


export const PreviewEditUI = ( {
	anchorRef,
  onClose,
	title
} ) => {
	const [previewHtml, setPreviewHtml] = useState(null)

	useEffect( () => {
    getPreviewHtml(title).then(setPreviewHtml)
	}, [ title ] );

	return (
		<Popover
			anchorRef={ anchorRef }
			onClose={ onClose }
			position="bottom center"
			noArrow={ false }
			expandOnMobile={ true }
		>
			<div className="wikipediapreview-edit-inline-container" dangerouslySetInnerHTML={{__html: previewHtml}}></div>
		</Popover>
	);
};
