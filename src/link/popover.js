import { useAnchor } from '@wordpress/rich-text';
import { Popover } from '@wordpress/components';
import { InlineEditUI } from './inline';
import { PreviewEditUI } from './preview';

export const WikipediaPreviewPopover = ( {
    addingPreview,
    stopAddingPreview,
    viewingPreview,
    stopViewingPreview,
    updateAttributes,
    insertText,
    removeAttributes,
    goToEdit,
    value,
    activeAttributes,
    contentRef,
    settings,
} ) => {
    const anchor = useAnchor( {
		editableContentElement: contentRef.current,
		value,
		settings,
	} );

    const onClosePreview = () => {
		if ( ! Object.keys( activeAttributes ).length ) {
			stopViewingPreview();
		}
	};

    return (
        <Popover
            anchor={ anchor }
            placement={ addingPreview ? 'top' : 'bottom' }
            noArrow={ false }
            expandOnMobile={ true }
            onClose={ addingPreview ? stopAddingPreview : onClosePreview }
            className={`wikipediapreview-edit-${ addingPreview ? 'inline' : 'preview-popover' }`}
            // onClick={ onClickPopoverOutside }
        >
            { addingPreview && (
                <InlineEditUI
                    onApply={
                        value.start !== value.end || activeAttributes.title
                            ? updateAttributes
                            : insertText
                    }
                    value={ value }
                    activeAttributes={ activeAttributes }
                />
            ) }
            { viewingPreview && (
                <PreviewEditUI
                    onEdit={ goToEdit }
                    onRemove={ removeAttributes }
                    onForceClose={ stopViewingPreview }
                    activeAttributes={ activeAttributes }
                />
            ) }
        </Popover>
    );
};