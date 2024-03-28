import { __ } from '@wordpress/i18n';

export const CustomTooltip = () => {
	const wikipediaPreviewToolbarButton = document.querySelector( '.wikipediapreview-edit-toolbar-button' );
	const toolbarButtonRect = wikipediaPreviewToolbarButton?.getBoundingClientRect();

	const computeTooltipPosition = ( targetRect ) => {
        console.log('computeTooltipPosition...');
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;


        console.log('...top, left', targetCenterY, targetCenterX);

        return {
            top: targetCenterY,
            left: targetCenterX,
        };
    }

	return (
		<div
			className="wikipediapreview-edit-inline-tooltip"
			style={
				toolbarButtonRect
					? computeTooltipPosition( toolbarButtonRect )
					: {}
			}
		>
			{ __( 'Add Wikipedia Preview', 'wikipedia-preview' ) }
		</div>
	);
};
