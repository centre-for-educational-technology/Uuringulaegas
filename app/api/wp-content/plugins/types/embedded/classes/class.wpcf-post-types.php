<?php
/**
 *
 * Post Types Class
 *
 * $HeadURL: http://plugins.svn.wordpress.org/types/tags/1.6.5.1/embedded/classes/class.wpcf-post-types.php $
 * $LastChangedDate: 2014-11-18 06:47:25 +0000 (Tue, 18 Nov 2014) $
 * $LastChangedRevision: 1027712 $
 * $LastChangedBy: iworks $
 *
 */

require_once WPCF_EMBEDDED_INC_ABSPATH . '/custom-types.php';

/**
 * Post Types Class
 *
 * @since Types 1.2
 * @package Types
 * @subpackage Classes
 * @version 0.1
 * @category Post Type
 * @author srdjan <srdjan@icanlocalize.com>
 */
class WPCF_Post_Types
{

    var $data;
    var $settings;
    var $messages = null;

    function set($post_type, $settings = null)
    {
        $data = get_post_type_object( $post_type );
        if ( empty( $data ) ) {

        }
        $this->data = $data;
        $this->settings = is_null( $settings ) ? $this->get_settings( $post_type ) : (array) $settings;
    }

    function _get_labels($data)
    {
        $data = (array) $data;
        return isset( $data['labels'] ) ? (object) $data['labels'] : new stdClass();
    }

    function check_singular_plural_match($data = null)
    {
        if ( is_null( $data ) ) {
            $data = $this->data;
        }
        $labels = $this->_get_labels( $data );
        if ( array_key_exists( 'ignore', $labels ) && 'on' == $labels->ignore ) {
            return false;
        }
        return strtolower( $labels->singular_name ) == strtolower( $labels->name );
    }

    function message($message_id)
    {
        $this->_set_messenger();
        return isset( $this->messages[$message_id] ) ? $this->messages[$message_id] : 'Howdy!';
    }

    function _set_messenger()
    {
        if ( is_null( $this->messages ) ) {
            include dirname( __FILE__ ) . '/post-types/messages.php';
            $this->messages = $messages;
        }
    }

    function get_settings($post_type)
    {
        return wpcf_get_custom_post_type_settings( $post_type );
    }

}
