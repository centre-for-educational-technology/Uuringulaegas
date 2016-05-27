<?php
/**
 * Plugin Name: Ark of Inquiry Openbadges
 * Description: Sends badges to Mozilla backpack
 * Version: 0.1.0
 * Author: Sander Aido
 * License: GPL2
 */

require_once(__DIR__.'/vendor/autoload.php');
use \Firebase\JWT\JWT;

function get_ark_base_url(){
    return rtrim(get_site_url(), "/api");
}

/*
 *  Custom endpoints for REST api
 *
 */

add_action('wp_ajax_get_badge_assertions', 'return_assertions');
add_action('wp_ajax_nopriv_get_badge_assertions', 'not_logged_in_error2');

function return_assertions() {
    $badgeKeys = $_REQUEST[badgeKeys];
    $assertions = [];
    foreach ($badgeKeys as $badgeKey){
        if(check_badge_status($badgeKey)){
            $assertion = generate_assertion($badgeKey);
            $signed = sign_assertion($assertion);
            array_push($assertions, $signed);
        }
    }

    if (!empty($assertions)){
        wp_send_json(array("assertions" => $assertions));
    } else {
        header('HTTP/1.0 404 Not Found'); // Set header to 404 (defaults to 200)
        echo "You don't have these badges!";
    }

    exit;
}

function sign_assertion($payload){
    $jwt = JWT::encode(
        $payload,
        get_option('ark_badges_priv_key'),
        'RS256'
    );
    return $jwt;
}

function generate_assertion($badgeKey){
    $siteUrl = get_site_url();

    $assertion = array(
        "uid"=> generateUID(),
        "recipient"=> [
            "identity"=> hashEmailAddress(wp_get_current_user()->user_email),
            "type"=> "email",
            "hashed"=> true
        ],
        "badge"=> $siteUrl . "/wp-admin/admin-ajax.php?action=get_badge_json&badgeKey=" . $badgeKey,
        "verify"=> [
            "url"=> $siteUrl . "/wp-admin/admin-ajax.php?action=get_badge_public_key",
            "type"=> "signed"
        ],
        "issuedOn"=> time()
    );
    return $assertion;
}

function check_badge_status($badgeKey){
    $learnerID = wp_get_current_user()->ID;

    $learner = pods('user', $learnerID);
    foreach ($learner->field('badges') as $badge){
        $badgeData = pods('badge', [
            'select' => 'key.meta_value as badgeKey',
            'where' => 't.id = "' . $badge['ID'] . '"'
        ])->rows[0];
        if ($badgeData->badgeKey == $badgeKey){
            return true;
        }
    }
    return false;
}

function generateUID(){
    return substr(str_shuffle(MD5(microtime())), 0, 20);
}

function hashEmailAddress($email) {
    return 'sha256$' . hash('sha256', $email);
}

function not_logged_in_error2(){
    header('HTTP/1.0 401 Unauthorized'); // Set header to 401 (defaults to 200)
    echo '401 Unauthorized - Not logged in';
    die();
}

/*
 * Return badge info in JSON for OpenBadges API
 */

add_action('wp_ajax_get_badge_json', 'get_badge_json');
add_action('wp_ajax_nopriv_get_badge_json', 'get_badge_json');

function get_badge_json(){

    $badgeKey = $_REQUEST[badgeKey];
    $badgeData = pods('badge', [
        'select' => 't.post_title as name, description.meta_value as description, image.id as imageID',
        'where' => 'key.meta_value = "' . $badgeKey . '"'
    ])->rows[0];
    $badgeData->image = wp_get_attachment_image_src($badgeData->imageID, 'full')[0];
    $badgeData->issuer = get_site_url() . "/wp-admin/admin-ajax.php?action=get_badge_issuer_json";
    $badgeData->criteria = get_ark_base_url() . "/#/badge/" . $badgeKey;
    unset($badgeData->imageID);
    wp_send_json($badgeData);
}



add_action('wp_ajax_get_badge_issuer_json', 'get_badge_issuer_json');
add_action('wp_ajax_nopriv_get_badge_issuer_json', 'get_badge_issuer_json');

function get_badge_issuer_json(){
    $issuer = [
        "name" => get_bloginfo("name"),
        "url" => get_ark_base_url()
    ];
    wp_send_json($issuer);
}

add_action('wp_ajax_get_badge_public_key', 'get_badge_public_key');
add_action('wp_ajax_nopriv_get_badge_public_key', 'get_badge_public_key');

function get_badge_public_key(){
    header("Content-Type: application/x-pem-file");
    echo esc_attr( get_option('ark_badges_public_key') );
    exit;
}












// create custom plugin settings menu
add_action('admin_menu', 'ark_openbadges_create_menu');

function ark_openbadges_create_menu() {

    //create new top-level menu
    add_menu_page('OpenBadges Settings', 'OpenBadges Settings', 'administrator', __FILE__, 'ark_openbadges_settings_page' );

    //call register settings function
    add_action( 'admin_init', 'register_ark_openbadges_settings' );
}


function register_ark_openbadges_settings() {
    //register our settings
    register_setting( 'ark-openbadges-settings-group', 'ark_badges_priv_key' );
    register_setting( 'ark-openbadges-settings-group', 'ark_badges_public_key' );
}

function ark_openbadges_settings_page() {
    ?>
    <div class="wrap">
        <h2>OpenBadges Settings</h2>
        <p>You can generate a key pair in a terminal with the command:</p>
        <code>openssl genrsa -out private-key.pem 1024</code>
        <p>You can then extract the public key from this as follows:</p>
        <code>openssl rsa -in private-key.pem -out public-key.pem -outform PEM -pubout</code>
        <p>The two keys should now be accessible in the current directory. Open them with a text editor and copy the ENTIRE contents to these fields.</p>

        <form method="post" action="options.php">
            <?php settings_fields( 'ark-openbadges-settings-group' ); ?>
            <?php do_settings_sections( 'ark-openbadges-settings-group' ); ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">RSA Private Key</th>
                    <td><textarea cols="80" rows="15" name="ark_badges_priv_key"><?php echo esc_attr( get_option('ark_badges_priv_key') ); ?></textarea></td>
                </tr>

                <tr valign="top">
                    <th scope="row">RSA Public Key</th>
                    <td><textarea cols="80" rows="10" name="ark_badges_public_key"><?php echo esc_attr( get_option('ark_badges_public_key') ); ?></textarea></td>
                </tr>
            </table>

            <?php submit_button(); ?>

        </form>
    </div>
<?php } ?>
