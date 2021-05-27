<?php
/**
 * Plugin Name: Wikipedia Preview
 * Plugin URI: https://github.com/wikimedia/wikipedia-preview
 * Description: Wikipedia Preview allows you to show a popup card with a short summary from Wikipedia when a reader clicks or hovers over a link
 * Version: 1.0.2
 * Requires at least: 4.2
 * Requires PHP: 5.6.39
 * Author: Wikimedia Foundation
 * Author URI: https://wikimediafoundation.org/
 * License: MIT
 * License URI: https://github.com/wikimedia/wikipedia-preview/blob/main/LICENSE
 */
function wikipediapreview_enqueue_scripts() {
	$assets_dir = plugin_dir_url( __FILE__ ) . 'assets/';
	$version    = '1.0.2';

	wp_enqueue_script(
		'wikipedia-preview',
		$assets_dir . 'js/wikipedia-preview.production.js',
		array(),
		$version,
		true
	);

	wp_enqueue_script(
		'wikipedia-preview-init',
		$assets_dir . 'js/init.js',
		array(),
		$version,
		true
	);
}

/**
 * Record the option of detect links feature enabled in this version,
 * detect links feature may be disabled by default in the next version.
 */
function wikipediapreview_detect_true() {
	add_option( 'wikipediapreview_options_detect_links', true );
}

function wikipediapreview_detect_deletion() {
	delete_option( 'wikipediapreview_options_detect_links' );
}

register_activation_hook( __FILE__, 'wikipediapreview_detect_true' );
register_deactivation_hook( __FILE__, 'wikipediapreview_detect_deletion' );
add_action( 'wp_enqueue_scripts', 'wikipediapreview_enqueue_scripts' );
