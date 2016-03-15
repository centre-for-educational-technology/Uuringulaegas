<?php

if ( !current_user_can( 'manage_options' ) ) {
    wp_die( __( 'Insufficient permissions.', aoi_get_text_domain() ) );
}

$activities_file_upload = null;
$activity_file_upload = null;

if ( isset($_POST['submit']) ) {
  if ( isset($_FILES['activities-background']) && $_FILES['activities-background']['error'] === 0 ) {
    $suitable_mime_types = array('image/jpeg', 'image/png');
    if ( in_array($_FILES['activities-background']['type'], $suitable_mime_types) ) {
      $upload_result = aoi_upload_file($_FILES['activities-background'], 'activities_background_' . time());

      if ( $upload_result ) {
        $activities_file_upload = true;

        $old_file_name = get_option('aoi_activities_background', null);
        if ( $old_file_name ) {
          unlink(aoi_get_uploaded_file_location($old_file_name));
        }
        update_option('aoi_activities_background', $upload_result);
      } else {
        $activities_file_upload = false;
      }
    } else {
      $activities_file_upload = false;
    }
  } else {
    $activities_file_upload = false;
  }

  if ( isset($_FILES['activity-background']) && $_FILES['activity-background']['error'] === 0 ) {
    $suitable_mime_types = array('image/jpeg', 'image/png');
    if ( in_array($_FILES['activity-background']['type'], $suitable_mime_types) ) {
      $upload_result = aoi_upload_file($_FILES['activity-background'], 'activity_background_' . time());

      if ( $upload_result ) {
        $activity_file_upload = true;

        $old_file_name = get_option('aoi_activity_background', null);
        if ( $old_file_name ) {
          unlink(aoi_get_uploaded_file_location($old_file_name));
        }
        update_option('aoi_activity_background', $upload_result);
      } else {
        $activity_file_upload = false;
      }
    } else {
      $activity_file_upload = false;
    }
  } else {
    $activity_file_upload = false;
  }
}
?>
<div class="wrap">
    <h2><?php _e( 'Arc of Inquiry settings', aoi_get_text_domain() ); ?></h2>
    <?php if ( $activities_file_upload === true ): ?>
      <div class="notice notice-success">
        <p>
          <?php _e( 'Activities image uploaded successfully.', aoi_get_text_domain() ); ?>
        </p>
      </div>
    <?php endif; ?>
    <?php if ( $activities_file_upload === false ): ?>
      <div class="notice notice-error">
        <p>
          <?php _e( 'Activities image could not be uploaded. Please check file type before contacting administrator.', aoi_get_text_domain() ); ?>
        </p>
      </div>
    <?php endif; ?>

    <?php if ( $activity_file_upload === true ): ?>
      <div class="notice notice-success">
        <p>
          <?php _e( 'Single activity image uploaded successfully.', aoi_get_text_domain() ); ?>
        </p>
      </div>
    <?php endif; ?>
    <?php if ( $activity_file_upload === false ): ?>
      <div class="notice notice-error">
        <p>
          <?php _e( 'Single activity image could not be uploaded. Please check file type before contacting administrator.', aoi_get_text_domain() ); ?>
        </p>
      </div>
    <?php endif; ?>

    <div class="aoi-settings-buttons">
      <button id="downloadUsersGroupsCsv" class="button button-secondary" onclick="window.open('<?php echo admin_url('?page=aoi-download-users-groups-csv&noheader=true'); ?>', '_blank');"><span class="dashicons dashicons-cloud"></span> <?php _e( 'Download users groups CSV', aoi_get_text_domain() ); ?></button>
      <button id="downloadUsersBadgesCsv" class="button button-secondary" onclick="window.open('<?php echo admin_url('?page=aoi-download-users-badges-csv&noheader=true'); ?>', '_blank');"><span class="dashicons dashicons-cloud"></span> <?php _e( 'Download users badges CSV', aoi_get_text_domain() ); ?></button>
    </div>

    <form method="post" action="" enctype="multipart/form-data">
      <h3><?php _e( 'Add/replace activities background image', aoi_get_text_domain() ); ?></h3>
      <label><?php _e( 'Activities page background', aoi_get_text_domain() ); ?></label>
      <input type="file" name="activities-background">
      <p class="description">
        <?php _e( 'Image should be with an extension of .jpg, .jpeg or .png and have dimensions of 870 x 145 pixels.', aoi_get_text_domain() ); ?>
      </p>
      <?php if ( get_option('aoi_activities_background', null) ): ?>
        <h4><?php _e( 'Current activities background preview.', aoi_get_text_domain() ); ?></h4>
        <img src="<?php echo aoi_get_uploaded_file_url(get_option('aoi_activities_background', null)); ?>" alt="current_activities_background" style="width:348px;height:58px;">
      <?php endif; ?>

      <hr>

      <h3><?php _e( 'Add/replace single activity background image', aoi_get_text_domain() ); ?></h3>
      <label><?php _e( 'Single activity page background', aoi_get_text_domain() ); ?></label>
      <input type="file" name="activity-background">
      <p class="description">
        <?php _e( 'Image should be with an extension of .jpg, .jpeg or .png and have dimensions of 870 x 400 pixels.', aoi_get_text_domain() ); ?>
      </p>
      <?php if ( get_option('aoi_activity_background', null) ): ?>
        <h4><?php _e( 'Current single activity background preview.', aoi_get_text_domain() ); ?></h4>
        <img src="<?php echo aoi_get_uploaded_file_url(get_option('aoi_activity_background', null)); ?>" alt="current_activity_background" style="width:348px;height:160px;">
      <?php endif; ?>

      <?php submit_button(); ?>
    </form>
</div>
