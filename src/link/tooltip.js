import { __ } from '@wordpress/i18n';
import { Popover } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export const incrementDisplayedCount = () => {
	fetch( '/wp-json/wikipediapreview/v1/option/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	} );
};

export const CustomTooltip = ( {
	anchorRef,
	setDisplayTooltip,
} ) => {
	useEffect( () => {
		// Wait 5 seconds and then hide the tooltip
		setTimeout( () => {
			setDisplayTooltip( false );
		}, 5000 );
	} );

	return (
		<div>
			<Popover
				anchor={ anchorRef.current }
				placement={ 'top' }
				noArrow={ false }
				offset={ 10 }
				className="wikipediapreview-edit-tooltip-popover"
			>
				<div className="wikipediapreview-edit-tooltip-popover-content">
					<p className="wikipediapreview-edit-tooltip-popover-text">{ __( 'Add Wikipedia Preview' ) }</p>
				</div>
			</Popover>
		</div>
	);
};
