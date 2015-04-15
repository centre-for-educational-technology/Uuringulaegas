<?php
/**
 * Plugin Name: Ark of Inquiry Nonce Authentication
 * Description: This plugin generates nonces to authenticate users in the Ark of Inquiry app
 * Version: 0.5.0
 * Author: Sander Aido
 * License: GPL2
 */

add_action('init', 'create_nonce');

add_action('wp_ajax_get_logged_in_user', 'return_nonce');
add_action('wp_ajax_nopriv_get_logged_in_user', 'not_logged_in_error');

add_action('wp_ajax_log_in', 'already_logged_in_error');
add_action('wp_ajax_nopriv_log_in', 'log_in');

// Deprecated, return_logged_in_user returns nonce as a parameter
add_action('wp_ajax_get_nonce', 'return_nonce');
add_action('wp_ajax_nopriv_get_nonce', 'not_logged_in_error');

// Declare global nonce variable
$nonce;

function create_nonce() {
    global $nonce;
    $nonce = wp_create_nonce( 'wp_json' );
}

function return_logged_in_user(){
    global $nonce;
    $user = wp_get_current_user();

    echo $nonce;
    die();
}

function log_in(){
    $creds = array();
    $creds['user_login'] = $_POST['username'];
    $creds['user_password'] = $_POST['password'];
    $creds['remember'] = true;

    $user = wp_signon($creds, false);

    if (is_wp_error($user)) {
        echo ' wp_error';
        echo $user->get_error_message();
    } else {
        //wp_set_current_user($user->ID);
        echo $user->id;
    }
    die();
}

function not_logged_in_error(){
    header('HTTP/1.0 401 Unauthorized'); // Set header to 401 (defaults to 200)
    echo '401 Unauthorized - Not logged in';
    die();
}

function already_logged_in_error(){
    header('HTTP/1.0 400 Bad Request'); // Set header to 400 (defaults to 200)
    echo '400 Bad Request - Already logged in';
    die();
}

// Deprecated, return_logged_in_user returns nonce as a parameter
function return_nonce(){
    global $nonce;
    echo $nonce;
    die();
}