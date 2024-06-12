/* global wikipediapreviewCustomTooltip */
import { __ } from '@wordpress/i18n';
import { Popover } from '@wordpress/components';
import { useEffect, useState, useCallback } from '@wordpress/element';

export const CustomTooltip = ( {
	anchorRef,
	addingPreview,
} ) => {
	const [ displayTooltip, setDisplayTooltip ] = useState( false );
	const [ timeoutIds, setTimeoutIds ] = useState( [] );
	const tooltipDisplayedFullDuration = useState( parseInt( wikipediapreviewCustomTooltip.tooltipDuration ) )[ 0 ];
	const tooltipDisplayedCount = useState( parseInt( wikipediapreviewCustomTooltip.tooltipCount ) )[ 0 ];
	const tooltipDisplayedLimit = 2;

	const updateStoredProperty = ( prop ) => {
		fetch( `/wp-json/wikipediapreview/v1/${ prop }/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': wikipediapreviewCustomTooltip.nonce,
			},
		} );
	};

	const finishDisplayingTooltip = useCallback( () => {
		setDisplayTooltip( false );
		wikipediapreviewCustomTooltip.tooltipDuration = 1;
		updateStoredProperty( 'duration' );
	}, [] );

	const clearTimeouts = useCallback( () => {
		timeoutIds.forEach( ( id ) => {
			clearTimeout( id );
		} );
	}, [ timeoutIds ] );

	const waitFiveSecsThenHideTooltip = useCallback( () => {
		const fiveSecId = setTimeout( () => {
			finishDisplayingTooltip();
		}, 5000 );
		setTimeoutIds( ( timeoutIds ) => [ ...timeoutIds, fiveSecId ] );
	}, [ finishDisplayingTooltip ] );

	const waitOneSecThenDisplayTooltip = useCallback( () => {
		const oneSecId = setTimeout( () => {
			if ( anchorRef.current ) {
				setDisplayTooltip( true );
				updateStoredProperty( 'count' );
				// Increment global tooltip count directly as well
				// to ensure count is up to date in between page reloads
				wikipediapreviewCustomTooltip.tooltipCount = tooltipDisplayedCount + 1;
				waitFiveSecsThenHideTooltip();
			}
		}, 1000 );
		setTimeoutIds( ( timeoutIds ) => [ ...timeoutIds, oneSecId ] );
	}, [ anchorRef, tooltipDisplayedCount, waitFiveSecsThenHideTooltip ] );

	useEffect( () => {
		if ( tooltipDisplayedCount < tooltipDisplayedLimit && tooltipDisplayedFullDuration < 1 ) {
			waitOneSecThenDisplayTooltip();
		}
	}, [ tooltipDisplayedCount, tooltipDisplayedFullDuration, waitOneSecThenDisplayTooltip ] );

	useEffect( () => {
		// Clear all timeouts when unmounting
		return () => {
			clearTimeouts();
		};
	}, [ timeoutIds, clearTimeouts ] );

	useEffect( () => {
		if ( addingPreview ) {
			clearTimeouts();
			finishDisplayingTooltip();
		}
	}, [ addingPreview, clearTimeouts, finishDisplayingTooltip ] );

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
