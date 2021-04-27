<?php
/**
 * Plugin Name: Wikipedia Preview
 * Description: Add Wikipedia Preview to your articles
 * Version: 0.1.0
 */

function wikipediapreview_enqueue_scripts() {
    // @todo insert script from node_modules
	wp_enqueue_script(
        'wikipedia-preview', 
        'https://unpkg.com/wikipedia-preview@1.1.1/dist/wikipedia-preview.production.js', [], null, true
    );

    wp_enqueue_style(
		'wmf-wp-format-css',
		'https://unpkg.com/wikipedia-preview@1.1.1/dist/wikipedia-preview.css'
	);

	// The content of the init file is basically `wikipediaPreview.init({});`
	wp_enqueue_script('wikipedia-preview-init', plugin_dir_url( __FILE__ ) . '/init.js', [], false, true);	
}

add_action( 'wp_enqueue_scripts', 'wikipediapreview_enqueue_scripts' );
