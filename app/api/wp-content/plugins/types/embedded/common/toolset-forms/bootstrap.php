<?php

/**
 *
 * $HeadURL: http://plugins.svn.wordpress.org/types/tags/1.6.5.1/embedded/common/toolset-forms/bootstrap.php $
 * $LastChangedDate: 2015-01-16 14:28:15 +0000 (Fri, 16 Jan 2015) $
 * $LastChangedRevision: 1069430 $
 * $LastChangedBy: iworks $
 *
 */

require_once 'api.php';

define( 'WPTOOLSET_FORMS_VERSION', '0.1.1' );
define( 'WPTOOLSET_FORMS_ABSPATH', dirname( __FILE__ ) );

/**
 * check we are as a embedded?
 */
if ( defined('WPCF_RUNNING_EMBEDDED' ) && WPCF_RUNNING_EMBEDDED ) {
    define( 'WPTOOLSET_FORMS_RELPATH', wpcf_get_file_url( __FILE__, false ) );
}
/**
 * setup WPTOOLSET_FORMS_RELPATH for plugin
 */
if ( !defined( 'WPTOOLSET_FORMS_RELPATH' ) ) {
    define( 'WPTOOLSET_FORMS_RELPATH', plugins_url( '', __FILE__ ) );
}
if ( !defined( 'WPTOOLSET_COMMON_PATH' ) ) {
    define( 'WPTOOLSET_COMMON_PATH', plugin_dir_path( __FILE__ ) );
}

class WPToolset_Forms_Bootstrap
{

    private $__forms;

    public final function __construct()
    {
        // Custom conditinal AJAX check
        add_action( 'wp_ajax_wptoolset_custom_conditional',
            array($this, 'ajaxCustomConditional') );

        // Date conditinal AJAX check
        add_action( 'wp_ajax_wptoolset_conditional',
            array($this, 'ajaxConditional') );

        // Date extended localization AJAX callback
        add_action( 'wp_ajax_wpt_localize_extended_date', array( $this, 'wpt_localize_extended_date' ) );
        add_action( 'wp_ajax_nopriv_wpt_localize_extended_date', array( $this, 'wpt_localize_extended_date' ) );

        // File media popup
        if ( (isset( $_GET['context'] ) && $_GET['context'] == 'wpt-fields-media-insert') || (isset( $_SERVER['HTTP_REFERER'] ) && strpos( $_SERVER['HTTP_REFERER'],
            'context=wpt-fields-media-insert' ) !== false)
        ) {
            require_once WPTOOLSET_FORMS_ABSPATH . '/classes/class.file.php';
            add_action( 'init', array('WPToolset_Field_File', 'mediaPopup') );
        }
        add_filter('sanitize_file_name', array( $this, 'sanitize_file_name' ) );

        add_filter( 'wptoolset_filter_wptoolset_repdrag_image', array( $this, 'set_default_repdrag_image' ), 10, 1 );
        /**
         * common class for calendar
         */
        require_once WPTOOLSET_FORMS_ABSPATH.'/classes/class.date.scripts.php';
        new WPToolset_Field_Date_Scripts();

        add_action('pre_get_posts', array($this,'pre_get_posts'));
    }

    // returns HTML
    public function field($form_id, $config, $value)
    {
        $form = $this->form( $form_id, array() );
        return $form->metaform( $config, $config['name'], $value );
    }

    // returns HTML
    //    public function fieldEdit($form_id, $config) {
    //        $form = $this->form( $form_id, array() );
    //        return $form->editform( $config );
    //    }

    public function form( $form_id, $config = array() )
    {
        if ( isset( $this->__forms[$form_id] ) ) {
            return $this->__forms[$form_id];
        }
        require_once WPTOOLSET_FORMS_ABSPATH . '/classes/class.form_factory.php';
        return $this->__forms[$form_id] = new FormFactory( $form_id, $config );
    }

    public function validate_field($form_id, $config, $value)
    {
        if ( empty( $config['validation'] ) ) {
            return true;
        }
        $form = $this->form( $form_id, array() );
        return $form->validateField( $config, $value );
    }

    public function ajaxCustomConditional()
    {
        require_once WPTOOLSET_FORMS_ABSPATH . '/classes/class.conditional.php';
        WPToolset_Forms_Conditional::ajaxCustomConditional();
    }

    public function checkConditional($config)
    {
        if ( empty( $config['conditional'] ) ) {
            return true;
        }
        require_once WPTOOLSET_FORMS_ABSPATH . '/classes/class.conditional.php';
        return WPToolset_Forms_Conditional::evaluate( $config['conditional'] );
    }

    public function addConditional($form_id, $config)
    {
        $this->form( $form_id )->addConditional( $config );
    }

    public function ajaxConditional()
    {
        $data = $_POST['conditions'];
        $data['values'] = $_POST['values'];
        echo $this->checkConditional( array('conditional' => $data) );
        die();
    }

    public function wpt_localize_extended_date()
    {
        $date_format = $_POST['date-format'];
        if ($date_format == '') {
            $date_format = get_option('date_format');
        }
        $date = $_POST['date'];
        $date = adodb_mktime(0, 0, 0, substr($date, 2, 2), substr($date, 0, 2), substr($date, 4, 4));
        $date_format = str_replace('\\\\', '\\', $date_format);
        echo json_encode(array('display' => adodb_date($date_format, $date),'timestamp' => $date));
        die();
    }

    public function filterTypesField($field, $post_id = null, $_post_wpcf = array())
    {
        require_once WPTOOLSET_FORMS_ABSPATH . '/classes/class.types.php';
        return WPToolset_Types::filterField( $field, $post_id, $_post_wpcf);
    }

    public function addFieldFilters($type)
    {
        if ( $class = $this->form( 'generic' )->loadFieldClass( $type ) ) {
            call_user_func( array($class, 'addFilters') );
            call_user_func( array($class, 'addActions') );
        }
    }

    public function getConditionalData($form_id)
    {
        return $this->form( $form_id )->getConditionalClass()->getData();
    }

    public function strtotime($date, $format = null)
    {
        require_once WPTOOLSET_FORMS_ABSPATH . '/classes/class.date.php';
        return WPToolset_Field_Date::strtotime( $date, $format );
    }

    public function timetodate($timestamp, $format = null)
    {
        require_once WPTOOLSET_FORMS_ABSPATH . '/classes/class.date.php';
        return WPToolset_Field_Date::timetodate( $timestamp, $format );
    }

    public function sanitize_file_name($filename)
    {
        /**
         * replace german special characters
         */
        $de_from   = array('ä','ö','ü','ß','Ä','Ö','Ü');
        $de_to     = array('ae','oe','ue','ss','Ae','Oe','Ue');
        $filename = str_replace($de_from, $de_to, $filename);
        /**
         * replace polish special characters
         */
        $pl_from   = array( 'ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż', 'Ą', 'Ć', 'Ę', 'Ł', 'Ń', 'Ó', 'Ś', 'Ź', 'Ż' );
        $pl_to     = array( 'a', 'c', 'e', 'l', 'n', 'o', 's', 'z', 'z', 'A', 'C', 'E', 'L', 'N', 'O', 'S', 'Z', 'Z' );
        $filename = str_replace($pl_from, $pl_to, $filename);
        /**
         * remove special characters
         */
        $filename = preg_replace( '/[^A-Za-z0-9\._@]/', '-', $filename);
        $filename = preg_replace( '/%20/', '-', $filename);
        return $filename;
    }

    public function set_default_repdrag_image($image)
    {
        return WPTOOLSET_FORMS_RELPATH . '/images/move.png';
    }

    /**
     * add custom post type to query when they use category or tags taxonomy.
     */
    public function pre_get_posts($query)
    {
        if ( is_admin() ) {
            return;
        }
        /**
         * do that only for main query
         */
        if (!$query->is_main_query()) {
            return;
        }
        
        /**
         * check terms
         */
        if( $query->is_tax() ) 
            $term =  get_queried_object(); 
        
        if ( empty($term) ) {
            return;
        }
        /**
         * check Types CPT
         */
        $types_cpt = get_option( 'wpcf-custom-types');
        if (!is_array($types_cpt) || empty($types_cpt)) {
            return;
        }
        /**
         * add cpt
         */
        foreach($types_cpt as $cpt_slug => $cpt) {
            if (array_key_exists('taxonomies', $cpt) && is_array($cpt['taxonomies'])) {
                foreach($cpt['taxonomies'] as $tax_slug => $value) {
                    if (
                        isset($term->taxonomy)
                        && $term->taxonomy == $tax_slug
                        && $value
                    ) {
                        $cpt_to_add[] = $cpt_slug;
                    }
                }
            }
        }
        /**
         * change query if some CPT use this
         */
        if (empty($cpt_to_add)) {
            return;
        }
        /**
         * remeber if is empty, then is post
         */
        $current_types = $query->get('post_type');
        if(empty($current_types)) {
            $cpt_to_add[] = 'post';
        } else if ( is_array($current_types) ) {
            $cpt_to_add = array_merge($current_types, $cpt_to_add);
        } else {
            $cpt_to_add[] = $current_types;
        }
        $query->set('post_type', $cpt_to_add);
    }
}

$GLOBALS['wptoolset_forms'] = new WPToolset_Forms_Bootstrap();
