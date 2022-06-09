<?php
/**
 * Plugin Name: Wikipedia Preview
 * Plugin URI: https://github.com/wikimedia/wikipedia-preview
 * Description: Provide context to your readers by displaying a Wikipedia article preview when a reader clicks or hovers over a word or concept.
 * Text Domain: wikipedia-preview
 * Version: 1.3.0
 * Requires at least: 4.6
 * Requires PHP: 5.6.39
 * Author: Wikimedia Foundation
 * Author URI: https://wikimediafoundation.org/
 * License: MIT
 * License URI: https://github.com/wikimedia/wikipedia-preview/blob/main/LICENSE
 */

DEFINE( 'WIKIPEDIA_PREVIEW_PLUGIN_VERSION', '1.3.0' );

/*
 * This option will contain the UNIX timestamp of when the banner
 * was dismissed or the value 0 to indicate it should never be shown again.
 */
DEFINE( 'WIKIPEDIA_PREVIEW_BANNER_OPTION', 'wikipediapreview_banner_dismissed' );

function wikipediapreview_enqueue_scripts() {
	$build_dir       = plugin_dir_url( __FILE__ ) . 'build/';
	$libs_dir        = plugin_dir_url( __FILE__ ) . 'libs/';
	$media_type_all  = 'all';
	$no_dependencies = array();
	$in_footer       = true;

	wp_enqueue_script(
		'wikipedia-preview',
		$libs_dir . 'wikipedia-preview.production.js',
		$no_dependencies,
		WIKIPEDIA_PREVIEW_PLUGIN_VERSION,
		$in_footer
	);

	wp_enqueue_script(
		'wikipedia-preview-init',
		$build_dir . 'init.js',
		$no_dependencies,
		WIKIPEDIA_PREVIEW_PLUGIN_VERSION,
		$in_footer
	);

	global $post;
	if ( isset( $post->ID ) ) {
		$options = array(
			'detectLinks' => get_post_meta( $post->ID, 'wikipediapreview_detectlinks', true ),
		);
		wp_localize_script( 'wikipedia-preview-init', 'wikipediapreview_init_options', $options );
	}

	wp_enqueue_style(
		'wikipedia-preview-link-style',
		$libs_dir . 'wikipedia-preview-link.css',
		$no_dependencies,
		WIKIPEDIA_PREVIEW_PLUGIN_VERSION,
		$media_type_all
	);
}

function wikipediapreview_detect_deletion() {
	delete_option( 'wikipediapreview_options_detect_links' );
}

function wikipediapreview_guten_enqueue() {
	if ( ! in_array( get_post_type(), array( 'post', 'page' ), true ) ) {
		return;
	}
	$build_dir       = plugin_dir_url( __FILE__ ) . 'build/';
	$libs_dir        = plugin_dir_url( __FILE__ ) . 'libs/';
	$media_type_all  = 'all';
	$no_dependencies = array();
	$in_footer       = true;

	wp_enqueue_script(
		'wikipedia-preview-edit-link',
		$build_dir . 'index.js',
		$no_dependencies,
		WIKIPEDIA_PREVIEW_PLUGIN_VERSION,
		$in_footer
	);

	wp_enqueue_style(
		'wikipedia-preview-style',
		$build_dir . 'style-index.css',
		$no_dependencies,
		WIKIPEDIA_PREVIEW_PLUGIN_VERSION,
		$media_type_all
	);

	wp_enqueue_style(
		'wikipedia-preview-link-style',
		$libs_dir . 'wikipedia-preview-link.css',
		$no_dependencies,
		WIKIPEDIA_PREVIEW_PLUGIN_VERSION,
		$media_type_all
	);
}

function myguten_set_script_translations() {
	wp_set_script_translations( 'wikipedia-preview-localization', 'wikipedia-preview' );
}

function register_detectlinks_postmeta() {
	$all_post_types = '';
	$meta_name      = 'wikipediapreview_detectlinks';
	$options        = array(
		'show_in_rest'  => true,
		'auth_callback' => true,
		'single'        => true,
		'type'          => 'boolean',
		'default'       => true, // it could default to false when the gutenburg support is released
	);
	register_post_meta( $all_post_types, $meta_name, $options );
}

function should_show_banner() {
	if ( ! is_admin() ) {
		// Only for admin site
		return false;
	}

	$default = -1;
	return get_option( WIKIPEDIA_PREVIEW_BANNER_OPTION, $default ) === $default;
}

function review_banner() {
	if ( ! should_show_banner() ) {
		return;
	}

	$msg          = __( 'Love Wikipedia Preview? Help others discover it by leaving your rating on WordPress.', 'wikipedia-preview' );
	$rate_btn     = __( 'Rate Wikipedia Preview', 'wikipedia-preview' );
	$remind_btn   = __( 'Remind me later', 'wikipedia-preview' );
	$rate_url     = 'https://wordpress.org/support/plugin/wikipedia-preview/reviews/#new-post';
	$html         = <<<HTML
		<div class="notice notice-wikipediapreview notice-info is-dismissible">
			<p>{$msg}</p>
			<a href="{$rate_url}" class="button button-primary button-rate">{$rate_btn}</a>
			<button class="button button-secondary button-remind">{$remind_btn}</button>
		</div>
	HTML;
	$allowed_tags = array(
		'div'    => array( 'class' => array() ),
		'p'      => array(),
		'a'      => array(
			'class' => array(),
			'href'  => array(),
		),
		'button' => array( 'class' => array() ),
		'span'   => array( 'class' => array() ),
	);
	echo wp_kses( $html, $allowed_tags );
}

function review_banner_script() {
	if ( ! should_show_banner() ) {
		return;
	}

	$nonce = wp_create_nonce( 'wikipediapreview-banner-dismiss' );
	$html  = <<<HTML
		<script type='text/javascript'>
			jQuery( function( $ ) {
				$( '.notice-wikipediapreview' ).on(
					'click',
					'.button-rate, .notice-dismiss, .button-remind',
					function () {
						jQuery.post( ajaxurl, {
							_ajax_nonce: '{$nonce}',
							action: 'dismiss_review_banner',
							remind: $( this ).hasClass( 'button-remind' )
						} );
						$( '.notice-wikipediapreview' ).hide();
					}
				);
			} );
		</script>
	HTML;
	echo wp_kses( $html, array( 'script' => array( 'type' => array() ) ) );
}

function dismiss_review_banner() {
	check_ajax_referer( 'wikipediapreview-banner-dismiss' );
	$remind = sanitize_key( $_POST['remind'] ?? 'false' );
	update_option(
		WIKIPEDIA_PREVIEW_BANNER_OPTION,
		'true' === $remind ? time() : 0
	);
	wp_die();
}

register_deactivation_hook( __FILE__, 'wikipediapreview_detect_deletion' );
add_action( 'wp_enqueue_scripts', 'wikipediapreview_enqueue_scripts' );
add_action( 'enqueue_block_editor_assets', 'wikipediapreview_guten_enqueue' );
add_action( 'init', 'myguten_set_script_translations' );
add_action( 'init', 'register_detectlinks_postmeta' );

add_action( 'admin_notices', 'review_banner' );
add_action( 'admin_footer', 'review_banner_script' );
add_action( 'wp_ajax_dismiss_review_banner', 'dismiss_review_banner' );
