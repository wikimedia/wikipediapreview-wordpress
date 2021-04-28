<?php
/**
 * Plugin Name: Wikipedia Preview
 * Description: Add Wikipedia Preview to your articles
 * Version: 0.1.0
 */

function wikipediapreview_enqueue_scripts() {
    wp_enqueue_script(
        'wikipedia-preview', 
        plugin_dir_url( __FILE__ ) . 'assets/js/wikipedia-preview.production.js', [], false, true 
    );

    wp_enqueue_script( 'wikipedia-preview-init', plugin_dir_url( __FILE__ ) . 'init.js', [], false, true );	
}

// record the option of detect links feature enabled in this version,
// detect links feature may disable by default in the next version
function record_options() {
    $options = array( 'auto_detects' => true );
    add_option( 'wikipedia_preview_options', $options );
}

add_action( 'init', 'record_options' );
add_action( 'wp_enqueue_scripts', 'wikipediapreview_enqueue_scripts' );
