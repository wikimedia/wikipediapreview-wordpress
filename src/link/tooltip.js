import { __ } from '@wordpress/i18n';
import { Popover } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

export const CustomTooltip = ( {
	anchorRef,
	setShowCustomTooltip,
} ) => {
	useEffect( () => {
		setTimeout( () => {
			setShowCustomTooltip( false );
		}, 5000 );
	}, [] );

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
