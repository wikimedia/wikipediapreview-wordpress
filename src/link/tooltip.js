/* global wikipediapreviewCustomTooltip */
import { __ } from '@wordpress/i18n';
import { Popover } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

export const CustomTooltip = ( {
	anchorRef,
} ) => {
	const [ displayTooltip, setDisplayTooltip ] = useState( false );
	const tooltipDisplayedCount = useState( parseInt( wikipediapreviewCustomTooltip.tooltipCount ) )[ 0 ];
	const tooltipDisplayedLimit = 2;

	const incrementStoredDisplayedCount = () => {
		fetch( '/wp-json/wikipediapreview/v1/option/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		} );
	};

	const waitOneSecThenDisplayTooltip = () => {
		setTimeout( () => {
			if ( anchorRef.current ) {
				setDisplayTooltip( true );
				incrementStoredDisplayedCount();
				// Increment global tooltip count directly as well
				// to ensure count is up to date in between page reloads
				wikipediapreviewCustomTooltip.tooltipCount = tooltipDisplayedCount + 1;
				waitFiveSecsThenHideTooltip();
			}
		}, 1000 );
	};

	const waitFiveSecsThenHideTooltip = () => {
		setTimeout( () => {
			setDisplayTooltip( false );
		}, 5000 );
	};

	useEffect( () => {
		if ( tooltipDisplayedCount < tooltipDisplayedLimit ) {
			waitOneSecThenDisplayTooltip();
		}
	}, [] );

	return (
		<div>
			{ displayTooltip && (
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
			) }
		</div>
	);
};
