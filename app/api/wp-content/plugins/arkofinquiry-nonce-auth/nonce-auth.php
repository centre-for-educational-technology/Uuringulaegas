<?php
/**
 * Plugin Name: Ark of Inquiry Authentication and Settings
 * Description: This plugin generates nonces to authenticate users in the Ark of Inquiry app and provides some settings in the settings menu.
 * Version: 0.8.0
 * Author: Sander Aido
 * License: GPL2
 */

 $arkPodsUserRegisterHack = false;

// Custom filter to allow learners read group info but not edit
add_filter( 'pods_json_api_access_pods_get_items', function( $access, $method, $pod ) {
    $access = false;

    if ( current_user_can('read')) {
    $access = true;
  }
  if ( $pod == 'user' && current_user_can( 'list_users' ) ) {
     $access = true;
  }
  if ( $pod == 'completed_activity' && is_user_logged_in() ) {
     $access = true;
  }

  if ( $pod == 'page' ) {
      $access = true;
  }

 return $access;
}, 10, 3 );

// Custom filter to allow learners to view single users
add_filter( 'pods_json_api_access_pods_get_item', function( $access, $method, $pod ) {
    global $arkPodsUserRegisterHack;
    $access = false;
    if ( current_user_can( 'read' ) ) {
        $access = true;
    } else if ($pod == 'user' && $arkPodsUserRegisterHack === true){
        $access = true;
    }
    if ( $pod == 'page' ) {
        $access = true;
    }


 return $access;
}, 10, 3 );

add_action('user_register', function($user_id){
    giveBadgeToLearner($user_id, "welcome");
});

function giveBadgeToLearner($learnerID, $badgeKey){
    $badgeID = pods('badge')->first_id(array('where' => 'key.meta_value = "' . $badgeKey . '"'));
    pods('user', $learnerID)->add_to('badges', $badgeID);
    pods('inq_log')->add(array(
        'learner' => $learnerID,
        'status' => 8,
        'badge' => $badgeID
    ));
}

// Filter to let everyone register a new user
add_filter( 'pods_json_api_access_pods_add_item', function( $access, $method, $pod ) {
    global $arkPodsUserRegisterHack;

    /**
     * @param $learnerID
     * @param $badgeKey - key/identifier of the Badge, to find the correct ID
     */


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

         $access = true;
     } else if ( $pod == 'inq_keywords' && current_user_can( 'publish_inq_activitys' ) ) {
         $access = true;
     } else if ( $pod == 'inq_status' && current_user_can( 'pods_add_inq_status' ) ) {
         $access = true;
     } else if ( $pod == 'inq_evidence' && current_user_can( 'edit_inq_evidence' ) ) {
         $access = true;
     } else if ( $pod == 'user' ) {
         parse_str(file_get_contents("php://input"),$post_vars);
         $access = true;
     }

     return $access;
  }, 10, 3 );

/*
 * Pods filters
 */

add_filter('pods_api_pre_create_pod_item_group', function ($pieces) {
    if(!empty($pieces['fields']['name']['value']) && !empty($pieces['fields']['description']['value']) && !empty($pieces['fields']['domains']['value'])){
        array_push ($pieces[ 'fields_active' ], 'teachers' );
        $pieces[ 'fields' ][ 'teachers' ][ 'value' ] = wp_get_current_user()->ID;
        return $pieces;
    } else {
        pods_error( 'Missing fields!');
    }
}, 10, 2);


/*
 *  Custom endpoints for REST api
 *
 */

add_action('wp_ajax_get_hall_of_fame', 'return_hall_of_fame');
add_action('wp_ajax_nopriv_get_hall_of_fame', 'not_logged_in_error');

function return_hall_of_fame(){

    function getMedalists($badgeKey){
        $learners = [];
        $params = ['where' => 'badges.key.meta_value = "' . $badgeKey . '"'];
        $medalists = pods('user', $params);
        while ( $medalists->fetch() ) {
            $user = [
                'id' => $medalists->id(),
                'name' => $medalists->field('display_name'),
                'email' => $medalists->field('user_email'),
                'url' => $medalists->field('user_url')
            ];
            array_push($learners, $user);
        }
        return $learners;
    }

    $medals =[];
    $medals['medals_gold'] = getMedalists('medal_gold');
    $medals['medals_silver'] = getMedalists('medal_silver');
    $medals['medals_bronze'] = getMedalists('medal_bronze');
    $medals['diplomas'] = getMedalists('diploma');
    $medals['stars'] = getMedalists('star');

    header('Content-Type: application/json');
    echo json_encode($medals);
    die();
}

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

add_action('wp_ajax_get_my_feedback', 'get_my_feedback');
add_action('wp_ajax_nopriv_get_my_feedback', 'not_logged_in_error');

function get_my_feedback() {
    if (current_user_can('read_peer_review')) {
        $activityID = $_REQUEST[activityID];

        $peerQueryParams = [
            'select' => 't.id, peer.display_name as peer, t.post_content, rating.meta_value as rating, t.post_modified',
            'where' => 'inq_activity.ID = "' . $activityID . '" AND learner.id = "' . wp_get_current_user()->ID . '"',
        ];
        $teacherQueryParams = [
            'select' => '
                t.id,
                teacher.display_name as teacher, 
                t.post_content, 
                rating.meta_value as rating, 
                phase_1_level.meta_value as phase_1_rating,
                phase_2_level.meta_value as phase_2_rating,
                phase_3_level.meta_value as phase_3_rating,
                phase_4_level.meta_value as phase_4_rating,
                phase_5_level.meta_value as phase_5_rating,
                perf_eval.meta_value as perf_eval,
                t.post_modified',
            'where' => 'inq_activity.ID = "' . $activityID . '" AND learner.id = "' . wp_get_current_user()->ID . '"'
        ];

        $reviews = [];
        $reviews['peerReviews'] = pods('peer_review', $peerQueryParams)->rows;
        $reviews['teacherReviews'] = pods('teacher_review', $teacherQueryParams)->rows;
        echo json_encode($reviews);
    }
    die();
}

add_action('wp_ajax_get_my_recommendations', 'get_my_recommendations');
add_action('wp_ajax_nopriv_get_my_recommendations', 'not_logged_in_error');

function get_my_recommendations() {
    if (current_user_can('read_user')) {

        $interestsQuery = [
            'where' => 't.id = "' . wp_get_current_user()->ID . '"',
        ];

        $interests = pods('user', $interestsQuery)->field('interests');

        $activities = [];
        foreach ($interests as $interest) {
            $actQuery = [
                'select' => 't.id, t.post_title, t.post_content',
                'where' => 'domains.meta_value = "' . $interest . '"'
            ];
            $act = pods('inq_activity', $actQuery)->rows;
            array_push($activities, $act);
        }

        echo json_encode($activities);
    }
    die();
}

add_action('wp_ajax_get_group_list', 'get_group_list');
add_action('wp_ajax_nopriv_get_group_list', 'not_logged_in_error');

function get_group_list() {
    if (current_user_can('read')) {

        $params = [
            'select' => 't.id, t.name, GROUP_CONCAT(teachers.display_name SEPARATOR " | ") as teachers',
            'limit' => -1,
            'groupby' => 't.id'
        ];

        $podsGroups = pods('group', $params)->rows;
        
        echo json_encode($podsGroups);
    }
    die();
}

add_action('wp_ajax_get_group_feed', 'get_group_feed');
add_action('wp_ajax_nopriv_get_group_feed', 'not_logged_in_error');

function get_group_feed() {
    if (current_user_can('read')) {

        $groupID = $_REQUEST[groupID];

        if(isset($_REQUEST[page])){
            $feedPage = $_REQUEST[page];
        } else {
            $feedPage = 1;
        }

        $learnerQueryParams = [
            'select' => 'learners.ID',
            'where' => 't.id = '. $groupID
        ];

        $learnersPods = pods('group', $learnerQueryParams);

        $learners = [];
        while ($learnersPods->fetch()){
            array_push($learners, intval($learnersPods->field('ID')));
        }

        $learnerIDs = join("','",$learners);


        error_log(print_r($learners, true));

        //echo json_encode($learners);


        $logParams = [
            'select' => '
                t.id, 
                learner.id as learnerID, 
                learner.display_name as learnerName, 
                learner.user_email as learnerEmail, 
                teacher.id as teacherID, 
                teacher.display_name as teacherName, 
                teacher.user_email as teacherEmail, 
                peer.id as peerID, 
                peer.display_name as peerName, 
                peer.user_email as peerEmail, 
                badge.key.meta_value as badgeKey, 
                badge.post_title as badgeTitle, 
                badge.description.meta_value as badgeDescription, 
                badge.image.guid as badgeImage, 
                t.created, 
                inq_activity.id as inqID, 
                inq_activity.post_title as inqTitle, 
                t.status',
            'orderby' => '-t.created',
            'limit' => 30,
            'page' => $feedPage,
            'where'=> "learner.id IN ('$learnerIDs')"
        ];

        $logs = pods('inq_log', $logParams)->rows;

        echo json_encode($logs);

        /*
        $activities = [];
        foreach ($interests as $interest) {
            $actQuery = [
                'select' => 't.id, t.post_title, t.post_content',
                'where' => 'domains.meta_value = "' . $interest . '"'
            ];
            $act = pods('inq_activity', $actQuery)->rows;
            array_push($activities, $act);
        }

        echo json_encode($activities);
        */
    }
    die();
}

add_action('wp_ajax_search_learners', 'search_learners');
add_action('wp_ajax_nopriv_search_learners', 'not_logged_in_error');

function search_learners() {
    if (current_user_can('read')) {

        if(isset($_REQUEST[search])){
            $searchParam = $_REQUEST[search];
        } else {
            die();
        }

        $params = [
            'select' => '*',
            'limit' => 15,
            'where' => '(t.user_nicename LIKE "%'.$searchParam.'%" OR t.user_email LIKE "%'.$searchParam.'%")'
        ];

        $podsGroups = pods('user', $params);

        echo json_encode($podsGroups);
    }
    die();
}

/*
 *
 * Login logic
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
    $profile_completed = false;
    $extra_info_completed = false;
    if(!empty($user->preferred_language)){
        $profile_completed = true;
    }

    if(!empty($user->like_research_text)){
        $extra_info_completed = true;
    }

    echo json_encode(
        array(
            'nonce' => $nonce,
            'userID' => $user->ID,
            'userDisplayName' => $user->display_name,
            'userRole' => $user->roles[0],
            'profileCompleted' => $profile_completed,
            'extraInfoCompleted' => $extra_info_completed
        )
    );
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

/**
 * Administration pages and logic
 */

/**
 * [aoi_upload_dir description]
 * @return [type] [description]
 */
function aoi_upload_dir() {
  $wp_upload_dir = wp_upload_dir();

  if ( !file_exists($wp_upload_dir['basedir'] . '/aoi') ) {
    mkdir($wp_upload_dir['basedir'] . '/aoi');
  }

  return array(
    'path' => $wp_upload_dir['basedir'] . '/aoi',
    'url' => $wp_upload_dir['baseurl'] . '/aoi',
  );
}

/**
 * Mova uploade file to new correct location with set name and original
 * extension. Creates a directory if needed.
 * @param  array $tmp_file Uploaded file data
 * @return mixed New file name on succes and FALSE on failure
 */
function aoi_upload_file(&$tmp_file, $file_name) {
  $aoi_upload_dir = aoi_upload_dir();
  $new_file_name = $file_name . '.' . pathinfo($tmp_file['name'], PATHINFO_EXTENSION);
  $new_file_location = $aoi_upload_dir['path'] . '/' . $new_file_name;
  $uploaded = move_uploaded_file($tmp_file['tmp_name'], $new_file_location);
  if ( $uploaded ) {
    return $new_file_name;
  }
  return $uploaded;
}

/**
 * Get uploade file location.
 * @param  string $file_name Uploaded file name.
 * @return string            Full file path.
 */
function aoi_get_uploaded_file_location($file_name) {
  $aoi_upload_dir = aoi_upload_dir();
  return $aoi_upload_dir['path'] . '/' . $file_name;
}

/**
 * Get uploaded file public url.
 * @param  string $file_name Uploaded file name.
 * @return string            URL of the file.
 */
function aoi_get_uploaded_file_url($file_name) {
  $aoi_upload_dir = aoi_upload_dir();
  return $aoi_upload_dir['url'] . '/' . $file_name;
}

/**
 * Returns text domain
 * @return string Text domain value
 */
function aoi_get_text_domain() {
  return 'aoi';
}

/**
 * Loads and displays settings page
 * @return void
 */
function aoi_load_settings_page() {
  include_once(__DIR__ . '/parts/settings-page.php');
}

/**
 * Starts CSV file download
 * @param  array $csv_data   Data to be converted into CSV
 * @param  string $file_name Downloaded file name (no need for extension)
 * @return void
 */
function _aoi_start_csv_download(&$csv_data, $file_name) {
  $fp = fopen('php://memory', 'w+');
  foreach ( $csv_data as $single_data ) {
    fputcsv( $fp, $single_data );
  }
  rewind( $fp );
  $contents = stream_get_contents( $fp );
  fclose( $fp );

  // Force line separator to Windows style
  if (PHP_EOL !== "\r\n") {
    $contents = str_replace("\n", "\r\n", $contents);
  }

  header('Content-Description: File Transfer');
  header('Content-Type: text/csv');
  header('Content-Disposition: attachment; filename=' . $file_name. '.csv');
  header('Expires: 0');
  header('Cache-Control: must-revalidate');
  header('Pragma: public');
  echo $contents;
  exit;
}

/**
 * Starts users groups CSV file download
 * @return void
 */
function aoi_download_users_groups_csv() {
  if ( !current_user_can( 'manage_options' ) ) {
    wp_die( __( 'Insufficient permissions.', aoi_get_text_domain() ) );
  }

  $csv_data = array();

  $user = pods('user', array(
    'limit' => -1,
  ));

  while( $user->fetch() ) {
    $groups = $user->field('groups');

    if ( $groups && is_array($groups) && sizeof($groups) > 0 ) {
      foreach( $groups as $group ) {
        $csv_data []= array(
            'id' => $user->id(),
            'email' => $user->field('user_email'),
            'name' => $user->field('display_name'),
            'group_id' => $group['id'],
            'group_name' => $group['name'],
        );
      }
    } else {
      $csv_data []= array(
          'id' => $user->id(),
          'email' => $user->field('user_email'),
          'name' => $user->field('display_name'),
          'group_id' => '',
          'group_name' => '',
      );
    }
  }

  _aoi_start_csv_download($csv_data, 'users_groups');
}

/**
 * Starts users badges CSV file download
 * @return [type] [description]
 */
function aoi_download_users_badges_csv() {
  if ( !current_user_can( 'manage_options' ) ) {
    wp_die( __( 'Insufficient permissions.', aoi_get_text_domain() ) );
  }

  $csv_data = array();

  $user = pods('user', array(
    'limit' => -1,
  ));

  while( $user->fetch() ) {
    $badges = $user->field('badges');

    if ( $badges && is_array($badges) && sizeof($badges) > 0 ) {
      foreach( $badges as $badge ) {
        $csv_data []= array(
            'id' => $user->id(),
            'email' => $user->field('user_email'),
            'name' => $user->field('display_name'),
            'group_id' => $badge['ID'],
            'group_name' => $badge['post_title'],
        );
      }
    }
  }

  _aoi_start_csv_download($csv_data, 'users_badges');
}

/**
 * Admin menu pages
 */
function aoi_add_menu_pages() {
  if ( current_user_can('manage_options') ) {
    add_options_page( __( 'Arc of Inquiry settings', aoi_get_text_domain() ), __( 'Arc of Inquiry settings', aoi_get_text_domain() ), 'manage_options', 'aoi-settings', 'aoi_load_settings_page' );
    add_submenu_page( NULL, '', '', 'manage_options', 'aoi-download-users-groups-csv', 'aoi_download_users_groups_csv' );
    add_submenu_page( NULL, '', '', 'manage_options', 'aoi-download-users-badges-csv', 'aoi_download_users_badges_csv' );
  }
}
add_action('admin_menu', 'aoi_add_menu_pages');

/**
 * Responds with activities background image data in JSON.
 * @return void
 */
function aoi_api_return_activities_background_image() {
  $background_image = get_option('aoi_activities_background', null);
  $response = array(
    'status' => 'success',
    'url' => null,
  );

  if ( $background_image ) {
    $response['url'] = aoi_get_uploaded_file_url($background_image);

  }

  wp_send_json($response);
}
add_action('wp_ajax_get_activities_background_image', 'aoi_api_return_activities_background_image');
add_action('wp_ajax_nopriv_get_activities_background_image', 'aoi_api_return_activities_background_image');

/**
 * Responds with activities background image data in JSON.
 * @return void
 */
function aoi_api_return_activity_background_image() {
  $background_image = get_option('aoi_activity_background', null);
  $response = array(
    'status' => 'success',
    'url' => null,
  );

  if ( $background_image ) {
    $response['url'] = aoi_get_uploaded_file_url($background_image);

  }

  wp_send_json($response);
}
add_action('wp_ajax_get_activity_background_image', 'aoi_api_return_activity_background_image');
add_action('wp_ajax_nopriv_get_activity_background_image', 'aoi_api_return_activity_background_image');

/**
 * Responds with activities background image data in JSON.
 * @return void
 */
function aoi_api_return_groups_background_image() {
    $background_image = get_option('aoi_groups_background', null);
    $response = array(
        'status' => 'success',
        'url' => null,
    );

    if ( $background_image ) {
        $response['url'] = aoi_get_uploaded_file_url($background_image);

    }

    wp_send_json($response);
}
add_action('wp_ajax_get_groups_background_image', 'aoi_api_return_groups_background_image');
add_action('wp_ajax_nopriv_get_groups_background_image', 'aoi_api_return_groups_background_image');


function no_admin_access() {
    $redirect = site_url( '/' );
    if ( ! ( current_user_can( 'manage_options' ) || current_user_can( 'edit_pages' ) ) ){
        exit( wp_redirect( $redirect ) );
    }
}
add_action( 'admin_menu', 'no_admin_access', 100 );