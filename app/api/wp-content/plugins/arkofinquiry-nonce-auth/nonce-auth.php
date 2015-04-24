<?php
/**
 * Plugin Name: Ark of Inquiry Nonce Authentication
 * Description: This plugin generates nonces to authenticate users in the Ark of Inquiry app
 * Version: 0.6.0
 * Author: Sander Aido
 * License: GPL2
 */

 $arkPodsUserRegisterHack = false;

// Custom filter to allow learners read group info but not edit
add_filter( 'pods_json_api_access_pods_get_items', function( $access, $method, $pod ) {
  if ( $pod == 'inq_activity' && current_user_can('read_inq_activity')) {
    $access = true;
  } else if ( $pod == 'group' && current_user_can( 'read_group' ) ) {
    $access = true;
  } else if ( $pod == 'inq_keywords' && current_user_can( 'read_inq_keyword' ) ) {
     $access = true;
  } else if ( $pod == 'user' && current_user_can( 'list_users' ) ) {
     $access = true;
  } else if ( $pod == 'completed_activity' && is_user_logged_in() ) {
     $access = true;
  } else {
     $access = false;
  }

 return $access;
}, 10, 3 );

// Custom filter to allow learners to view single users
add_filter( 'pods_json_api_access_pods_get_item', function( $access, $method, $pod ) {
  global $arkPodsUserRegisterHack;
  if ( $pod == 'user' && current_user_can( 'read_user' ) ) {
     $access = true;
  } else if ($pod == 'user' && $arkPodsUserRegisterHack === true){
     $access = true;
  } else if ( $pod == 'inq_activity' && current_user_can( 'read_inq_activity' ) ) {
     $access = true;
  } else if ( $pod == 'group' && current_user_can( 'read_group' ) ) {
     $access = true;
  } else {
     $access = false;
  }

 return $access;
}, 10, 3 );

// Filter to let everyone register a new user
add_filter( 'pods_json_api_access_pods_add_item', function( $access, $method, $pod ) {
    global $arkPodsUserRegisterHack;
    if ( $pod == 'user' ){
        $arkPodsUserRegisterHack = true;
        $access = true;
    } else if ( $pod == 'inq_activity' && current_user_can( 'publish_inq_activitys' ) ) {
       $access = true;
    }

    return $access;
 }, 10, 3 );

 // Filter to let everyone register a new user
 /* add_filter( 'pods_json_api_access_pods_save_item', function( $access, $method, $pod ) {
     if ( $pod == 'completed_activity' && current_user_can( 'confirm_completed_activity' )) {
          error_log(print_r($_REQUEST, true));
         $access = true;
     }

     return $access;
  }, 10, 3 ); */

add_action('init', 'create_nonce');

add_action('wp_ajax_get_logged_in_user', 'return_logged_in_user');
add_action('wp_ajax_nopriv_get_logged_in_user', 'not_logged_in_error');

add_action('wp_ajax_log_in', 'already_logged_in_error');
add_action('wp_ajax_nopriv_log_in', 'log_in');

add_action('wp_ajax_log_out', 'log_out');
add_action('wp_ajax_nopriv_log_out', 'not_logged_in_error');

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

    echo json_encode(array('nonce' => $nonce, 'userID' => $user->ID, 'userDisplayName' => $user->display_name, 'userRole' => $user->roles[0]));
    die();
}

function log_in(){
    $creds = array();
    $creds['user_login'] = $_POST['username'];
    $creds['user_password'] = $_POST['password'];
    $creds['remember'] = $_POST['remember'];

    $user = wp_signon($creds, false);

    if (is_wp_error($user)) {
        header('HTTP/1.0 401 Unauthorized'); // Set header to 401 (defaults to 200)
        echo '401 Unauthorized - Wrong username or password';
    } else {
        //wp_set_current_user($user->ID);
        echo $user->id;
    }
    die();
}

function log_out(){
    wp_clear_auth_cookie();
    wp_logout();
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
