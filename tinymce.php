<?php
function add_tinymce_button() {
    if (current_user_can('edit_posts') && current_user_can('edit_pages')) {
        add_filter('mce_external_plugins', 'add_tinymce_plugin');
        add_filter('mce_buttons', 'register_tinymce_button');
    }
}

function register_tinymce_button($buttons) {
    array_push($buttons, 'my_tinymce_button');
    return $buttons;
}

function add_tinymce_plugin($plugin_array) {
    $plugin_array['my_tinymce_button'] = plugin_dir_url( __FILE__ ) . 'build/index.js';
    return $plugin_array;
}

add_action('init', 'add_tinymce_button');