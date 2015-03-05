<?php

class Installer_Deps_Loader{

    private $config = array();
    private $missing = array();

    function __construct(){

        //_disable_wp_redirects
        if(isset($_POST['action']) && $_POST['action'] == 'wp_installer_fix_deps'){            
            add_filter('wp_redirect', '__return_false', 10000);            
        }

        add_action('admin_init', array($this, 'init'), 30);
        add_filter('installer_deps_missing', array($this, 'get_missing_deps'));
    }

    public function init(){
        global $wp_installer_instances;

        $repositories = array();

        add_action('wp_ajax_wp_installer_fix_deps', array($this, 'run'));

        foreach($wp_installer_instances as $instance) {

            $config_file = dirname($instance['bootfile']) . '/deps.xml';

            if (file_exists($config_file) && is_readable($config_file)) {

                $config = $this->read_config($config_file);
                $config_arr_key = md5($config_file) . '|' . $config['name'];

                foreach ($config['repositories'] as $repository_id => $repository) {

                    foreach ($repository['plugins'] as $plugin) {

                        if(empty($plugin['version']) || $plugin['version'] == 'latest'){
                            $plugin['version'] = WP_Installer()->get_plugin_repository_version($repository_id, $plugin['name']);
                        }


                        $plugin_full_name = $this->get_plugin_full_name($repository_id, $plugin['name'], $config);
                        if (!$plugin_full_name) continue;

                        $real_basename = $plugin['name'];
                        if (isset($plugin['format'])) {
                            $real_basename .= '-' . $plugin['format'];
                        }

                        $latest_version     = WP_Installer()->get_plugin_repository_version($repository_id, $plugin['name']);
                        $installed_version  = WP_Installer()->get_plugin_installed_version($plugin_full_name, $plugin['name']);

                        if ($this->is_plugin_installed($plugin['name']) && !$this->is_plugin_installed($real_basename)) { //FULL PLUGIN INSTALLED?
                            if (!$this->is_plugin_active($plugin['name'])) {
                                $this->missing[$config_arr_key][] = array(
                                    'basename' => $plugin['name'],
                                    'name' => $plugin_full_name,
                                    'url' => $this->get_plugin_download_url($repository_id, $plugin['name'], $config),
                                    'repository_id' => $repository_id,
                                    'status' => __('inactive', 'installer')
                                );
                            } else {
                                continue;
                            }
                        } elseif (!$this->is_plugin_installed($real_basename)) {
                            $this->missing[$config_arr_key][] = array(
                                'basename' => $plugin['name'],
                                'name' => $plugin_full_name,
                                'url' => $this->get_plugin_download_url($repository_id, $plugin['name'], $config),
                                'repository_id' => $repository_id,
                                'status' => __('not installed', 'installer')
                            );
                        } elseif (version_compare($latest_version, $installed_version)) {

                            if(!$this->is_plugin_active($real_basename) && !$this->is_plugin_active($plugin['name'])){
                                $status = sprintf(__('inactive and out of date: installed - %s, available - %s', 'installer'), $installed_version, $latest_version);
                            }else{
                                $status = sprintf(__('out of date: installed - %s, available - %s', 'installer'), $installed_version, $latest_version);
                            }

                            $this->missing[$config_arr_key][] = array(
                                'basename' => $plugin['name'],
                                'name' => $plugin_full_name,
                                'url' => $this->get_plugin_download_url($repository_id, $plugin['name'], $config),
                                'repository_id' => $repository_id,
                                'status' => $status
                            );
                        } elseif (!$this->is_plugin_active($real_basename) && !$this->is_plugin_active($plugin['name'])) {
                            $this->missing[$config_arr_key][] = array(
                                'basename' => $plugin['name'],
                                'name' => $plugin_full_name,
                                'url' => $this->get_plugin_download_url($repository_id, $plugin['name'], $config),
                                'repository_id' => $repository_id,
                                'status' => __('inactive', 'installer')
                            );
                        }

                        //set affiliate info if any
                        if (isset($repository['affiliate_id']) && isset($repository['affiliate_key'])) {
                            WP_Installer()->set_config('affiliate_id:' . $repository_id, $repository['affiliate_id']);
                            WP_Installer()->set_config('affiliate_key:' . $repository_id, $repository['affiliate_key']);
                        }

                    }

                }

                $this->config[$config_arr_key] = $config;

            }

        }

        if($this->missing){
            add_action('admin_notices', array($this, 'setup_notice'));
            add_action('admin_footer', array($this, 'js_footer'));

        }

    }

    public function read_config($config_file){

        $repositories = array();

        $repositories_xml = simplexml_load_file($config_file);

        $array = json_decode(json_encode($repositories_xml), true);

        $repositories_arr = isset($array['repositories']['repository'][0]) ? $array['repositories']['repository'] : array($array['repositories']['repository']);

        foreach($repositories_arr as $r){
            $r['plugins'] = isset($r['plugins']['plugin'][0]) ? $r['plugins']['plugin'] : array($r['plugins']['plugin']);

            $repositories[$r['id']] = $r;
        }

        $config['repositories'] = $repositories;
        $config['name']         = $array['name'];

        return $config;

    }

    public function get_missing_deps(){
        return $this->missing;
    }

    public function setup_notice(){
        ?>
        <div class="updated" id="wp_installer_fix_deps_notice" >
            <?php foreach($this->missing as $key => $missing): ?>
                <?php list($null, $name) = explode('|', $key); ?>
                <p><strong><?php printf(__('%s needs these plugins to work:', 'installer'), $name); ?></strong></p>
                <ul>
                    <?php foreach($missing as $p): ?>
                    <li>
                        <?php echo $p['name'] ?> (<?php echo $p['status'] ?>)
                        <?php if(!WP_Installer()->is_uploading_allowed()): ?>
                        | <a href="<?php echo $p['url'] ?>"><?php _e('Download', 'installer') ?></a>
                        <?php endif; ?>
                    </li>
                    <?php endforeach;?>
                </ul>

            <?php endforeach; ?>

            <?php if(!WP_Installer()->is_uploading_allowed()): ?>
                <p class="installer-warn-box">
                    <?php _e('Automatic downloading is not possible because WordPress cannot write into the plugins folder. Please use the download links above to get the zip files, unpack and upload to the plugins folder. If folders with the same name exist, please replace with the new ones.', 'installer') ?>
                </p>
            <?php endif; ?>

            <p class="submit">
                <input id="wp_installer_fix_deps" type="button" class="button-primary" value="<?php esc_attr_e('Install and activate', 'installer') ?>" <?php
                disabled(!WP_Installer()->is_uploading_allowed()); ?> />
                <span class="spinner"></span>&nbsp;<span id="wp_installer_fix_deps_status"></span>
            </p>

        </div>

        <?php

    }

    public function is_plugin_installed($basename, $version = false, $compare = '='){

        $is = false;
        $plugins = get_plugins();
        foreach($plugins as $plugin_id => $plugin_data){

            if(dirname($plugin_id) == $basename){
                if($version !== false ){
                    if(version_compare($plugin_data['Version'], $version, $compare)){
                        $is = true;
                    }
                }else{
                    $is = true;

                }
                break;

            }
        }

        return $is;

    }

    public function is_plugin_active($basename){

        $is = false;
        $plugins = get_plugins();
        foreach($plugins as $plugin_id => $plugin_data){
            if(dirname($plugin_id) == $basename && is_plugin_active($plugin_id)){
                $is = true;
                break;

            }
        }

        return $is;

    }

    public function get_plugin_id($basename){

        $plugin_wp_id = false;

        $plugins = get_plugins();
        foreach($plugins as $plugin_id => $plugin_data){
            if(dirname($plugin_id) == $basename){
                $plugin_wp_id = $plugin_id;
                break;

            }
        }

        return $plugin_wp_id;

    }

    function plugins_upgrade_check($update_plugins){
        global $wp_installer_instances;

        foreach($wp_installer_instances as $instance) {

            $config_file = dirname($instance['bootfile']) . '/deps.xml';

            if (file_exists($config_file) && is_readable($config_file)) {

                $config = $this->read_config($config_file);
                $config_arr_key = md5($config_file) . '|' . $config['name'];

                foreach($config['repositories'] as $repository_id => $repository){

                    $downloads = $this->get_repository_downloads($repository_id, $config);

                    foreach($repository['plugins'] as $plugin){

                        if(!isset($downloads[$plugin['name']])) continue;

                        $real_basename = $plugin['name'];
                        if(isset($plugin['format']) && $plugin['format'] != 'standard'){
                            $real_basename .= '-' . $plugin['format'];
                        }
                        $plugin_wp_id = $this->get_plugin_id($real_basename);
                        if($plugin_wp_id){

                            $latest_version = WP_Installer()->get_plugin_repository_version($repository_id, $plugin['name']);    

                            $response = new stdClass();
                            $response->id = 0;
                            $response->slug = $real_basename;
                            $response->plugin = $plugin_wp_id;
                            $response->new_version = $latest_version;
                            $response->upgrade_notice = '';
                            $response->url = $this->get_plugin_download_url($repository_id, $plugin['name'], $config);
                            $response->package = $this->get_plugin_download_url($repository_id, $plugin['name'], $config);
                            $update_plugins->checked[$plugin_wp_id]  = $latest_version;
                            $update_plugins->response[$plugin_wp_id] = $response;


                        }

                    }

                }

            }
        }
        
        return $update_plugins;
    }

    public function run(){
        global $wp_installer_instances;

        $return['stop'] = 0;        

        foreach($wp_installer_instances as $instance) {

            $config_file = dirname($instance['bootfile']) . '/deps.xml';

            if (file_exists($config_file) && is_readable($config_file)) {

                $config = $this->read_config($config_file);
                $config_arr_key = md5($config_file) . '|' . $config['name'];

                foreach($config['repositories'] as $repository_id => $repository){

                    $downloads = $this->get_repository_downloads($repository_id, $config);

                    foreach($repository['plugins'] as $plugin){

                        if(!isset($downloads[$plugin['name']])) continue;

                        $plugin_full_name = $this->get_plugin_full_name($repository_id, $plugin['name'], $config);

                        $latest_version     = WP_Installer()->get_plugin_repository_version($repository_id, $plugin['name']);
                        $installed_version  = WP_Installer()->get_plugin_installed_version($plugin_full_name, $plugin['name']);

                        $real_basename = $plugin['name'];
                        if(isset($plugin['format']) && $plugin['format'] != 'standard'){
                            $real_basename .= '-' . $plugin['format'];
                        }

                        $plugin_downloaded_once = false;    
                        if(isset($_POST['plugins_downloaded'])){
                            $return['plugins_downloaded'] = $_POST['plugins_downloaded'];
                            if(in_array($real_basename, $_POST['plugins_downloaded'])){
                                $plugin_downloaded_once = true;
                            }
                        }else{
                            $return['plugins_downloaded'] = array();
                        }

                        if(!$plugin_downloaded_once && $this->is_plugin_installed($plugin['name']) && !$this->is_plugin_active($plugin['name']) && !$this->is_plugin_active($real_basename)){ // FULL PLUGIN PRESENT BUT INACTIVE
                            if($plugin_wp_id = $this->get_plugin_id($plugin['name'])){
                                //prevent redirects
                                add_filter('wp_redirect', '__return_false', 10000);
                                $ret = activate_plugin($plugin_wp_id);
                                $return['status_message'] = sprintf(__('Activated %s', 'installer'), $downloads[$plugin['name']]['name']);
                            }else{

                                $return['status_message'] = sprintf(__('Plugin not found: %s', 'installer'), $downloads[$plugin['name']]['name']);
                                $return['stop'] = 1;
                            }
                            break; // one operation at the time
                        }elseif(!$plugin_downloaded_once && !$this->is_plugin_installed($real_basename) && !$this->is_plugin_installed($plugin['name'])){
                            $ret = WP_Installer()->download_plugin($downloads[$plugin['name']]['basename'],
                                $downloads[$plugin['name']]['url']);
                            if($ret){
                                $return['status_message'] = sprintf(__('Installed %s', 'installer'), $downloads[$plugin['name']]['name']);
                            }else{
                                $return['status_message'] = sprintf(__('Failed to download %s', 'installer'), $downloads[$plugin['name']]['name']);
                                $return['stop'] = 1;
                            }
                            $return['plugins_downloaded'][] = $real_basename;
                            break; // one operation at the time

                        } elseif (version_compare($latest_version, $installed_version)) {

                            require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
                            require_once WP_Installer()->plugin_path() . '/includes/installer-upgrader-skins.php';

                            $upgrader_skins = new Installer_Upgrader_Skins(); //use our custom (mute) Skin
                            $upgrader = new Plugin_Upgrader($upgrader_skins);

                            remove_action( 'upgrader_process_complete', array( 'Language_Pack_Upgrader', 'async_upgrade' ), 20 );
                            add_filter( 'site_transient_update_plugins', array( $this, 'plugins_upgrade_check') );

                            $plugin_wp_id = $this->get_plugin_id($real_basename);
                            $ret = $upgrader->upgrade($plugin_wp_id);

                            if($ret){
                                activate_plugin($plugin_wp_id);
                                $return['status_message'] = sprintf(__('Upgraded %s', 'installer'), $downloads[$plugin['name']]['name']);
                            }else{
                                $return['status_message'] = sprintf(__('Failed to upgrade %s', 'installer'), $downloads[$plugin['name']]['name']);
                                $return['stop'] = 1;
                            }

                            $return['plugins_downloaded'][] = $real_basename;

                            break; // one operation at the time

                        }elseif(!$this->is_plugin_active($real_basename) && !$this->is_plugin_active($plugin['name'])){

                            if($plugin_wp_id = $this->get_plugin_id($real_basename)){
                                //prevent redirects
                                add_filter('wp_redirect', '__return_false', 10000);

                                $ret = activate_plugin($plugin_wp_id);
                                $return['status_message'] = sprintf(__('Activated %s', 'installer'), $downloads[$plugin['name']]['name']);
                            }else{

                                $return['status_message'] = sprintf(__('Plugin not found: %s', 'installer'), $downloads[$plugin['name']]['name']);
                                $return['stop'] = 1;
                            }
                            break; // one operation at the time

                        }

                    }

                }

            }
        }

        if(empty($return['status_message'])){
            $return['status_message'] = __('Operation complete!', 'installer');
            $return['status_message'] .=  '&nbsp;<a href="#" id="wp_installer_fix_deps_dismiss">'. __('Dismiss', 'installer') . '</a>';
            $return['stop'] = 1;
        }

        echo json_encode($return);
        exit;

    }

    public function get_repository_downloads($repository_id, $config){

        if(!isset($this->repository_downloads[md5(serialize($config))][$repository_id])) {

            $downloads = array();
            $installer_settings = WP_Installer()->get_settings();

            if (isset($installer_settings['repositories'][$repository_id])) {

                foreach ($installer_settings['repositories'][$repository_id]['data']['packages'] as $package) {

                    foreach ($package['products'] as $product) {

                        $available_in_installer = WP_Installer()->is_product_available_for_download($product['name'], $repository_id);

                        foreach ($product['downloads'] as $download) {

                            if (!isset($downloads[$download['basename']]) || (empty($d['_installer_download_url']) && $available_in_installer)) {

                                $d['name']              = $download['name'];
                                $d['basename']          = $download['basename'];
                                $d['version']           = $download['version'];
                                $d['date']              = $download['date'];
                                $d['_installer_url']    = $available_in_installer;

                                /*
                                $format = 'standard';
                                foreach($config['repositories'][$repository_id]['plugins'] as $p){
                                    if($p['name'] == $d['basename']){
                                        if(isset($p['format'])){
                                            $format = $p['format'];
                                        }
                                        break;
                                    }
                                }
                                */

                                //case of valid subscription                                
                                if($available_in_installer){
                                    $d['url'] = WP_Installer()->append_site_key_to_download_url($download['url'], WP_Installer()->get_site_key($repository_id), $repository_id);

                                }else{

                                    $d['url'] = $download['url'] . '&theme_key=' . $config['repositories'][$repository_id]['key']
                                            . '&theme_name=' . urlencode($config['name']); 
                                    //. '&format=' . $format;
                                }


                                $downloads[$d['basename']] = $d;
                            }

                        }

                    }

                }

            }

            $this->repository_downloads[md5(serialize($config))][$repository_id] = $downloads;

        }

        return $this->repository_downloads[md5(serialize($config))][$repository_id];

    }

    public function get_plugin_download_url($repository_id, $basename, $config){

        $downloads = $this->get_repository_downloads($repository_id, $config);

        return isset($downloads[$basename]) ? $downloads[$basename]['url'] : false;

    }

    public function get_plugin_full_name($repository_id, $basename, $config){

        $downloads = $this->get_repository_downloads($repository_id, $config);

        return isset($downloads[$basename]) ? $downloads[$basename]['name'] : false;

    }

    public function js_footer(){
        ?>
        <script type='text/javascript'>
        /* <![CDATA[ */

        jQuery('#wp_installer_fix_deps').click(function(){

            jQuery('#wp_installer_fix_deps').attr('disabled', 'disabled');
            jQuery('#wp_installer_fix_deps_notice').find('.spinner').addClass('spinner-inline').show();

            var plugins_downloaded = [];
            wp_installer_deps_load_run(plugins_downloaded);
            return false;
        })

        function wp_installer_deps_load_run(plugins_downloaded){

            jQuery.ajax({
                url:        ajaxurl,
                type:       'post',
                dataType:   'json',
                data:       {action: 'wp_installer_fix_deps', plugins_downloaded: plugins_downloaded},
                success: function(ret){

                    plugins_downloaded = ret.plugins_downloaded;
                    jQuery('#wp_installer_fix_deps_status').html(ret.status_message);

                    if(ret.stop){
                        jQuery('#wp_installer_fix_deps_notice').find('.spinner').removeClass('spinner-inline').hide();

                    }else{

                        wp_installer_deps_load_run(plugins_downloaded);
                    }

                }
            })
        }

        jQuery('#wp_installer_fix_deps_status').on('click', '#wp_installer_fix_deps_dismiss', function(){
            jQuery('#wp_installer_fix_deps_notice').fadeOut();
            return false;
        })

        /* ]]> */
        </script>
        <?php
    }

}
