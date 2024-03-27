import { __ } from '@wordpress/i18n';

export const CustomTooltip = () => {
    const wikipediaPreviewToolbarButton = document.querySelector( '.wikipediapreview-edit-toolbar-button' );
    const toolbarButtonRect = wikipediaPreviewToolbarButton?.getBoundingClientRect();

    // TODO computeTooltipPosition()
    

    return (
        <div
            className='wikipediapreview-edit-inline-tooltip'
            style={
                toolbarButtonRect
                    ? {
                        top: toolbarButtonRect.top,
                        left: toolbarButtonRect.left,
                    }
                    : {}
            }
        >
            { __( 'Add Wikipedia Preview', 'wikipedia-preview' ) }
        </div>
    );
};