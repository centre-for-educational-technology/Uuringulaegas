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
  if ( $pod == 'inq_activity' && current_user_can('read_inq')) {
    $access = true;
  } else if ( $pod == 'inq_log' && current_user_can( 'read_inq_log' ) ) {
    $access = true;
  } else if ( $pod == 'inq_status' && current_user_can( 'read_inq_status' ) ) {
      $access = true;
  } else if ( $pod == 'group' && current_user_can( 'read_group' ) ) {
    $access = true;
  } else if ( $pod == 'group_comment' && current_user_can( 'read_group_comment' ) ) {
      $access = true;
  } else if ( $pod == 'user_comment' && current_user_can( 'read_user_comment' ) ) {
      $access = true;
  } else if ( $pod == 'inq_keywords' && current_user_can( 'read_inq' ) ) {
     $access = true;
  } else if ( $pod == 'user' && current_user_can( 'list_users' ) ) {
     $access = true;
  } else if ( $pod == 'completed_activity' && is_user_logged_in() ) {
     $access = true;
  } else if ( $pod == 'inq_evidence' && current_user_can( 'read_inq_evidence' ) ) {
      $access = true;
  } else if ( $pod == 'peer_review' && current_user_can( 'read_peer_review' ) ) {
      $access = true;
  } else if ( $pod == 'teacher_review' && current_user_can( 'read_teacher_review' ) ) {
      $access = true;
  } else if ( $pod == 'page' ) {
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
  } else if ( $pod == 'inq_activity' && current_user_can( 'read_inq' ) ) {
     $access = true;
  } else if ( $pod == 'inq_keywords' && current_user_can( 'read_inq' ) ) {
      $access = true;
  } else if ( $pod == 'inq_log' && current_user_can( 'read_inq_log' ) ) {
     $access = true;
  } else if ( $pod == 'inq_status' && current_user_can( 'read_inq_status' ) ) {
      $access = true;
  } else if ( $pod == 'group' && current_user_can( 'read_group' ) ) {
     $access = true;
  } else if ( $pod == 'group_comment' && current_user_can( 'read_group_comment' ) ) {
      $access = true;
  } else if ( $pod == 'user_comment' && current_user_can( 'read_user_comment' ) ) {
      $access = true;
  } else if ( $pod == 'inq_evidence' && current_user_can( 'read_inq_evidence' ) ) {
      $access = true;
  } else if ( $pod == 'peer_review' && current_user_can( 'read_peer_review' ) ) {
      $access = true;
  } else if ( $pod == 'teacher_review' && current_user_can( 'read_teacher_review' ) ) {
      $access = true;
  } else if ( $pod == 'page' ) {
      $access = true;
  } else {
     $access = false;
  }

 return $access;
}, 10, 3 );

// Filter to let everyone register a new user
add_filter( 'pods_json_api_access_pods_add_item', function( $access, $method, $pod ) {
    global $arkPodsUserRegisterHack;

    /**
     * @param $learnerID
     * @param $badgeKey - key/identifier of the Badge, to find the correct ID
     */
    function giveBadgeToLearner($learnerID, $badgeKey){
        $badgeID = pods('badge')->first_id(array('where' => 'key.meta_value = "' . $badgeKey . '"'));
        pods('user', $learnerID)->add_to('badges', $badgeID);
    }

    if ( $pod == 'user' ){
        $arkPodsUserRegisterHack = true;
        $access = true;
    } else if ( $pod == 'inq_activity' && current_user_can( 'publish_inq_activitys' ) ) {
       $access = true;
    } else if ( $pod == 'inq_keywords' && current_user_can( 'publish_inq_activitys' ) ) {
        $access = true;
    } else if ( $pod == 'inq_log' && current_user_can( 'pods_add_inq_log' ) ) {
       $access = true;
    } else if ( $pod == 'inq_status' && current_user_can( 'pods_add_inq_status' ) ) {
        $access = true;
    } else if ( $pod == 'inq_evidence' && current_user_can( 'pods_add_inq_evidence' ) ) {

        $learnerID = $_REQUEST[learner];

        $params = array(
            'where' => 'learner.id = ' . $learnerID . ' AND status >= 5'
        );
        $completedActivities = pods('inq_status', $params);

        switch ($completedActivities->total_found()) {
            case 1:
                giveBadgeToLearner($learnerID, 'activity_1');
                //error_log(print_r('gave user activity_1 Badge', true));
                break;
            case 5:
                giveBadgeToLearner($learnerID, 'activity_5');
                break;
            case 10:
                giveBadgeToLearner($learnerID, 'activity_10');
                break;
            case 25:
                giveBadgeToLearner($learnerID, 'activity_25');
                break;
            case 50:
                giveBadgeToLearner($learnerID, 'activity_50');
                break;
            case 100:
                giveBadgeToLearner($learnerID, 'activity_100');
                break;
        }

        //error_log(print_r('total found: ' . $statuses->total_found(), true));
        //error_log(print_r('kala', true));

        $access = true;
    } else if ( $pod == 'peer_review' && current_user_can( 'pods_add_peer_review' ) ) {

        $peerID = $_REQUEST[peer];

        $peerReviews = pods('peer_review', array(
            'where' => 'peer.id = ' . $peerID
        ));

        switch ($peerReviews->total_found() + 1) { // +1 because this check happens before a new review is saved //todo - what if an error happens after this?
            case 1:
                giveBadgeToLearner($peerID, 'pr_1');
                //error_log(print_r('gave user pr_1 Badge', true));
                break;
            case 5:
                giveBadgeToLearner($peerID, 'pr_5');
                break;
            case 10:
                giveBadgeToLearner($peerID, 'pr_10');
                break;
            case 50:
                giveBadgeToLearner($peerID, 'pr_50');
                break;
        }

        //error_log(print_r('peer Reviews found: ' . $peerReviews->total_found(), true));

        $access = true;
    } else if ( $pod == 'teacher_review' && current_user_can( 'pods_add_teacher_review' ) ) {
        $access = true;
    }
    //error_log(print_r($_REQUEST, true));

    return $access;
 }, 10, 3 );

add_filter( 'pods_json_api_access_pods_save_item', function( $access, $method, $pod) {
     if ( $pod == 'completed_activity' && current_user_can( 'confirm_completed_activity' )) {
          error_log(print_r($_REQUEST, true));
         $access = true;
     } else if ( $pod == 'inq_keywords' && current_user_can( 'publish_inq_activitys' ) ) {
         $access = true;
     } else if ( $pod == 'inq_status' && current_user_can( 'pods_add_inq_status' ) ) {
         $access = true;
     } else if ( $pod == 'inq_evidence' && current_user_can( 'edit_inq_evidence' ) ) {
         $access = true;
     } else if ( $pod == 'user' ) {
         parse_str(file_get_contents("php://input"),$post_vars);
         error_log(print_r($post_vars, true));
         error_log(print_r($method, true));
         $access = true;
     }

     return $access;
  }, 10, 3 );

/*
 *  Custom endpoints for REST api
 *
 */

add_action('wp_ajax_get_total_activities', 'return_total_activities');
add_action('wp_ajax_nopriv_get_total_activities', 'not_logged_in_error');

function return_total_activities() {
    //echo pods('inq_activity')->total_found();
    echo pods('inq_activity')->find()->total_found();
    die();
}

add_action('wp_ajax_add_to_group_wait_list', 'add_to_group_wait_list');
add_action('wp_ajax_nopriv_add_to_group_wait_list', 'not_logged_in_error');

function add_to_group_wait_list() {
    error_log(print_r($_REQUEST, true));
    $groupID = $_REQUEST[groupID];
    $learnerID = wp_get_current_user()->ID;

    pods('group', $groupID)->add_to('wait_list', $learnerID);
    die();
}

add_action('wp_ajax_accept_from_group_wait_list', 'accept_from_group_wait_list');
add_action('wp_ajax_nopriv_accept_from_group_wait_list', 'not_logged_in_error');

function accept_from_group_wait_list() {
    if(current_user_can( 'pods_edit_group' )){
        $groupID = $_REQUEST[groupID];
        $learnerID = $_REQUEST[learnerID];

        $group = pods('group', $groupID);
        $group->add_to('learners', $learnerID);
        $group->remove_from('wait_list', $learnerID);
    }
    die();
}

add_action('wp_ajax_decline_from_group_wait_list', 'decline_from_group_wait_list');
add_action('wp_ajax_nopriv_decline_from_group_wait_list', 'not_logged_in_error');

function decline_from_group_wait_list() {
    if(current_user_can( 'pods_edit_group' )){
        $groupID = $_REQUEST[groupID];
        $learnerID = $_REQUEST[learnerID];

        $group = pods('group', $groupID);
        $group->remove_from('wait_list', $learnerID);
    }
    die();
}

/*
 *
 *
 *
 *
 */

add_action('init', 'create_nonce');

add_action('wp_ajax_get_logged_in_user', 'return_logged_in_user');
add_action('wp_ajax_nopriv_get_logged_in_user', 'not_logged_in_error');

add_action('wp_ajax_log_in', 'already_logged_in_error');
add_action('wp_ajax_nopriv_log_in', 'log_in');

add_action('wp_ajax_log_out', 'log_out');
add_action('wp_ajax_nopriv_log_out', 'not_logged_in_error');

add_action('wp_ajax_log_in_social', 'already_logged_in_error');
add_action('wp_ajax_nopriv_log_in_social', 'log_in_social');
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

function log_in_social() {
    error_log(print_r('trying login', true));
    wsl_process_login();
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

/*
 * Main wordpress redirect to app
 */

function redirect_homepage() {
    if( is_home() || is_front_page() ) {
        wp_redirect( site_url( '/..' ), 301 );
    }
    exit;
}
add_action( 'template_redirect', 'redirect_homepage' );
