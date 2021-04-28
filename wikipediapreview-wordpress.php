<?php
/**
 * Plugin Name: Wikipedia Preview
 * Description: Add Wikipedia Preview to your articles
 * Version: 0.1.0
 */
function wikipediapreview_enqueue_scripts() {
    $assets_dir = plugin_dir_url( __FILE__ ) .'assets/';
    
    wp_enqueue_script(
        'wikipedia-preview', $assets_dir . 'js/wikipedia-preview.production.js', [], false, true 
    );

    wp_enqueue_script( 
        'wikipedia-preview-init', $assets_dir . 'js/init.js', [], false, true 
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
register_uninstall_hook( __FILE__, 'wikipediapreview_detect_deletion' );
add_action( 'wp_enqueue_scripts', 'wikipediapreview_enqueue_scripts' );
