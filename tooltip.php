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

function wikipediapreview_set_rest_endpoints() {
	$route_namespace = 'wikipediapreview/v1';

	register_rest_route(
		$route_namespace,
		'/option/',
		array(
			'methods'  => 'GET',
			'callback' => 'wikipediapreview_get_tooltip_count',
		)
	);
	register_rest_route(
		$route_namespace,
		'/option/',
		array(
			'methods'  => 'POST',
			'callback' => 'wikipediapreview_increment_tooltip_count',
		)
	);
}

add_action( 'rest_api_init', 'wikipediapreview_set_rest_endpoints' );
