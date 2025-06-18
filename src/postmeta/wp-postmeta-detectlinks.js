import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { ToggleControl, PanelRow } from '@wordpress/components';

const WikipediaPreviewPostMetaDetectLinks = ( { postMeta, setPostMeta } ) => {
	if ( postMeta === undefined ) {
		// this is probably a custom post type
		// without 'custom-fields' support
		return;
	}

	// https://make.wordpress.org/core/2024/06/18/editor-unified-extensibility-apis-in-6-6/
	const PluginDocumentSettingPanel = wp.editor?.PluginDocumentSettingPanel ??
		( wp.editPost?.PluginDocumentSettingPanel ?? wp.editSite?.PluginDocumentSettingPanel );

	if ( ! PluginDocumentSettingPanel ) {
		return null;
	}

	return (
		<PluginDocumentSettingPanel
			name="wikipedia-preview"
			title={ __( 'Wikipedia Preview', 'wikipedia-preview' ) }
			initialOpen="false"
		>
			<PanelRow>
				<ToggleControl
					label={ __(
						'Enable Preview on Wikipedia Links',
						'wikipedia-preview'
					) }
					onChange={ ( value ) =>
						setPostMeta( { wikipediapreview_detectlinks: value } )
					}
					checked={ postMeta.wikipediapreview_detectlinks }
				/>
			</PanelRow>
		</PluginDocumentSettingPanel>
	);
};

export default compose( [
	withSelect( ( select ) => {
		return {
			postMeta: select( 'core/editor' ).getEditedPostAttribute( 'meta' ),
			postType: select( 'core/editor' ).getCurrentPostType(),
		};
	} ),
	withDispatch( ( dispatch ) => {
		return {
			setPostMeta( newMeta ) {
				dispatch( 'core/editor' ).editPost( { meta: newMeta } );
			},
		};
	} ),
] )( WikipediaPreviewPostMetaDetectLinks );
