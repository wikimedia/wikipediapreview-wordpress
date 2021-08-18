<?php
/**
 * Plugin Name: Wikipedia Preview
 * Plugin URI: https://github.com/wikimedia/wikipedia-preview
 * Description: Wikipedia Preview allows you to show a popup card with a short summary from Wikipedia when a reader clicks or hovers over a link
 * Text Domain: wikipedia-preview
 * Version: 1.0.6
 * Requires at least: 4.6
 * Requires PHP: 5.6.39
 * Author: Wikimedia Foundation
 * Author URI: https://wikimediafoundation.org/
 * License: MIT
 * License URI: https://github.com/wikimedia/wikipedia-preview/blob/main/LICENSE
 */

DEFINE( 'WIKIPEDIA_PREVIEW_PLUGIN_VERSION', '1.0.6' );
DEFINE( 'WIKIPEDIA_PREVIEW_STYLESHEET_MEDIA_TYPE', 'all' );

function wikipediapreview_enqueue_scripts() {
	$build_dir  = plugin_dir_url( __FILE__ ) . 'build/';
	$assets_dir = plugin_dir_url( __FILE__ ) . 'assets/';

	wp_enqueue_script(
		'wikipedia-preview',
		$assets_dir . 'wikipedia-preview.production.js',
		array(),
		WIKIPEDIA_PREVIEW_PLUGIN_VERSION,
		true
	);

	wp_enqueue_script(
		'wikipedia-preview-init',
		$build_dir . 'init.js',
		array(),
		WIKIPEDIA_PREVIEW_PLUGIN_VERSION,
		true
	);

	global $post;
	$detectLinks = get_post_meta( $post->ID, 'wikipediapreview_detectlinks', true );
	$options = [
		'detectLinks' => $detectLinks
	];
	wp_localize_script( "wikipedia-preview-init", "options", $options );

	wp_enqueue_style(
		'wikipedia-preview-link-style',
		$assets_dir . 'wikipedia-preview-link.css',
		array(),
		WIKIPEDIA_PREVIEW_PLUGIN_VERSION,
		WIKIPEDIA_PREVIEW_STYLESHEET_MEDIA_TYPE
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

function wikipediapreview_guten_enqueue() {
	$build_dir  = plugin_dir_url( __FILE__ ) . 'build/';
	$assets_dir = plugin_dir_url( __FILE__ ) . 'assets/';
	wp_enqueue_script(
		'wikipedia-preview-edit-link',
		$build_dir . 'index.js',
		array(),
		WIKIPEDIA_PREVIEW_PLUGIN_VERSION,
		true
	);

	wp_enqueue_style(
		'wikipedia-preview-style',
		$build_dir . 'style-index.css',
		array(),
		WIKIPEDIA_PREVIEW_PLUGIN_VERSION,
		WIKIPEDIA_PREVIEW_STYLESHEET_MEDIA_TYPE
	);

	wp_enqueue_style(
		'wikipedia-preview-link-style',
		$assets_dir . 'wikipedia-preview-link.css',
		array(),
		WIKIPEDIA_PREVIEW_PLUGIN_VERSION,
		WIKIPEDIA_PREVIEW_STYLESHEET_MEDIA_TYPE
	);
}

function myguten_set_script_translations() {
	wp_set_script_translations( 'wikipedia-preview-localization', 'wikipedia-preview' );
}

register_activation_hook( __FILE__, 'wikipediapreview_detect_true' );
register_deactivation_hook( __FILE__, 'wikipediapreview_detect_deletion' );
add_action( 'wp_enqueue_scripts', 'wikipediapreview_enqueue_scripts' );
add_action( 'enqueue_block_editor_assets', 'wikipediapreview_guten_enqueue' );
add_action( 'init', 'myguten_set_script_translations' );

add_action( 'init', function() {
	register_post_meta( 'post', 'wikipediapreview_detectlinks', [
		'show_in_rest' => true,
		'auth_callback' => true,
		'single' => true,
		'type' => 'boolean',
		'default' => true, // it could default to false when the gutenburg support is released
	] );
} );
