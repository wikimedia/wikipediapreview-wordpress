<?php
/**
 * Plugin Name: Wikipedia Preview
 * Description: Add Wikipedia Preview to your articles
 * Version: 0.1.0
 */

function wikipediapreview_enqueue_scripts() {
	wp_enqueue_script(
        'wikipedia-preview', 
        plugin_dir_url( __FILE__ ) . 'node_modules/wikipedia-preview/dist/wikipedia-preview.development.js', [], false, true 
    );

    wp_enqueue_style(
		'wmf-wp-format-css',
        plugin_dir_url( __FILE__ ) . 'node_modules/wikipedia-preview/dist/wikipedia-preview.css', [], false, true 
	);

	wp_enqueue_script('wikipedia-preview-init', plugin_dir_url( __FILE__ ) . 'init.js', [], false, true);	
}

add_action( 'wp_enqueue_scripts', 'wikipediapreview_enqueue_scripts' );
