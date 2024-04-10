<?php

DEFINE( 'WIKIPEDIA_PREVIEW_TOOLTIP_DISPLAYED_COUNT', 'wikipediapreview_tooltip_count' );

function wikipediapreview_get_tooltip_count() {
	return get_option(
		WIKIPEDIA_PREVIEW_TOOLTIP_DISPLAYED_COUNT,
		0
	);
}

function wikipediapreview_increment_tooltip_count() {
	$count = wikipediapreview_get_tooltip_count();
	update_option(
		WIKIPEDIA_PREVIEW_TOOLTIP_DISPLAYED_COUNT,
		$count + 1
	);
}

function wikipediapreview_tooltip_enqueue_script() {
	$src_link_dir    = plugin_dir_url( __FILE__ ) . 'src/link';
	$no_dependencies = array();
	$in_footer       = true;

	wp_enqueue_script(
		'wikipedia-preview-tooltip',
		$src_link_dir . 'edit.js',
		$no_dependencies,
		WIKIPEDIA_PREVIEW_PLUGIN_VERSION,
		$in_footer
	);

	$options = array(
		'tooltipCount' => wikipediapreview_get_tooltip_count(),
	);

	wp_localize_script( 'wikipedia-preview-tooltip', 'wikipediapreview_custom_tooltip', $options );
}

add_action('rest_api_init', function () {
	$route_namespace = 'wikipediapreview/v1';

	register_rest_route( $route_namespace, '/option/', array(
		'methods'  => 'POST',
		'callback' => 'wikipediapreview_increment_tooltip_count',
	) );
});

add_action( 'enqueue_block_editor_assets', 'wikipediapreview_tooltip_enqueue_script' );
