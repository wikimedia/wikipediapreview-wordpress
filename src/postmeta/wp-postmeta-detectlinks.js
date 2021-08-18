const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

const { PluginDocumentSettingPanel } = wp.editPost;
const { ToggleControl, PanelRow } = wp.components;

const WikipediaPreviewPostMetaDetectLinks = ( {
	postType,
	postMeta,
	setPostMeta,
} ) => {
	if ( postType !== 'post' ) return null;

	return (
		<PluginDocumentSettingPanel
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
