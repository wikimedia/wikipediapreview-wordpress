<?php

/*
 * The number of times the tooltip has been displayed, whether in full duration or not.
 * This count can be incremented until we hit a limit (set on the client side).
 */
DEFINE( 'WIKIPEDIA_PREVIEW_TOOLTIP_DISPLAYED_COUNT', 'wikipediapreview_tooltip_count' );

/*
 * Whether or not the tooltip has been displayed in full duration at least once,
 * this acts as a boolean that's either 0 or 1. When set to 1, we infer the
 * Wikipedia Preview plugin has been 'discovered' and hence we do not display it again
 */
DEFINE( 'WIKIPEDIA_PREVIEW_TOOLTIP_DISPLAYED_DURATION', 'wikipediapreview_tooltip_duration' );

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

function wikipediapreview_update_tooltip_duration() {
	update_option(
		WIKIPEDIA_PREVIEW_TOOLTIP_DISPLAYED_DURATION,
		1
	);
}

// For debugging purposes
function wikipediapreview_reset_tooltip_properties() {
	update_option(
		WIKIPEDIA_PREVIEW_TOOLTIP_DISPLAYED_COUNT,
		0
	);
	update_option(
		WIKIPEDIA_PREVIEW_TOOLTIP_DISPLAYED_DURATION,
		0
	);
}


function wikipediapreview_set_rest_endpoint() {
	register_rest_route(
		'wikipediapreview/v1',
		'/count/',
		array(
			'methods'  => 'POST',
			'callback' => 'wikipediapreview_increment_tooltip_count',
		)
	);
	register_rest_route(
		'wikipediapreview/v1',
		'/duration/',
		array(
			'methods'  => 'POST',
			'callback' => 'wikipediapreview_update_tooltip_duration',
		)
	);
	register_rest_route(
		'wikipediapreview/v1',
		'/reset/',
		array(
			'methods'  => 'POST',
			'callback' => 'wikipediapreview_reset_tooltip_properties',
		)
	);
}

function wikipediapreview_tooltip_enqueue_script() {
	$src_link_dir    = plugin_dir_url( __FILE__ ) . 'src/link';
	$no_dependencies = array();
	$in_footer       = true;

	wp_enqueue_script(
		'wikipedia-preview-tooltip',
		$src_link_dir . 'tooltip.js',
		$no_dependencies,
		WIKIPEDIA_PREVIEW_PLUGIN_VERSION,
		$in_footer
	);

	$options = array(
		'tooltipCount'    => wikipediapreview_get_tooltip_count(),
		'tooltipDuration' => get_option( WIKIPEDIA_PREVIEW_TOOLTIP_DISPLAYED_DURATION, 0 ),
	);

	wp_localize_script( 'wikipedia-preview-tooltip', 'wikipediapreviewCustomTooltip', $options );
}

add_action( 'enqueue_block_editor_assets', 'wikipediapreview_tooltip_enqueue_script' );
add_action( 'rest_api_init', 'wikipediapreview_set_rest_endpoint' );
