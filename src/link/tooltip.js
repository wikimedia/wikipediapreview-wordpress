import { __ } from '@wordpress/i18n';
import { Popover } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export const getDisplayedCount = ( setLocal ) => {
	fetch( '/wp-json/wikipediapreview/v1/option/' )
		.then( ( response ) => response.json() )
		.then( ( value ) => {
			setLocal( value );
		} );
};

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
			>
				<div className="wikipediapreview-edit-inline-tooltip">
					<p className="wikipediapreview-edit-inline-tooltip-text">{ __( 'Add Wikipedia Preview' ) }</p>
				</div>
			</Popover>
		</div>
	);
};
