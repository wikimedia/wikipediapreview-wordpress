<?php
/**
 * Plugin Name: Wikipedia Preview
 * Plugin URI: https://github.com/wikimedia/wikipedia-preview
 * Description: Wikipedia Preview allows you to show a popup card with a short summary from Wikipedia when a reader clicks or hovers over a link
 * Version: 1.0.0
 * Requires at least: 4.2
 * Requires PHP: 5.6.39
 * Author: Wikimedia Foundation
 * Author URI: https://wikimediafoundation.org/
 * License: MIT
 * License URI: https://github.com/wikimedia/wikipedia-preview/blob/main/LICENSE
 */
function wikipediapreview_enqueue_scripts() {
    $assets_dir = plugin_dir_url( __FILE__ ) . 'assets/';
    $enqueue_script_in_footer = true;
    $enqueue_ver_value = '1.0.0';
    $stylesheet_media_type = 'all';

    wp_enqueue_script(
        'wikipedia-preview-script', $assets_dir . 'js/wikipedia-preview.production.js', [], 
        $enqueue_ver_value, 
        $enqueue_script_in_footer
    );

    wp_enqueue_script( 
        'wikipedia-preview-init', $assets_dir . 'js/init.js', [], 
        $enqueue_ver_value, 
        $enqueue_script_in_footer
    );	

    wp_enqueue_style(
        'wikipedia-preview-style', $assets_dir . 'styles/wikipedia-preview.production.css', [], 
        $enqueue_ver_value, 
        $stylesheet_media_type
    );
}

// record the option of detect links feature enabled in this version,
// detect links feature may disable by default in the next version
function wikipediapreview_detect_true() {
    add_option( 'wikipediapreview_options_detect_links', true );
}

function wikipediapreview_detect_deletion() {
    delete_option( 'wikipediapreview_options_detect_links' );
}

register_activation_hook( __FILE__, 'wikipediapreview_detect_true' );
register_deactivation_hook( __FILE__, 'wikipediapreview_detect_deletion' );
add_action( 'wp_enqueue_scripts', 'wikipediapreview_enqueue_scripts' );
