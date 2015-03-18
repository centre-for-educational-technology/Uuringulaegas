=== Pods - Custom Content Types and Fields ===
Contributors: sc0ttkclark, pglewis, Shelob9, jamesgol, clubduece, dan.stefan, Desertsnowman, curtismchale, logikal16, mikedamage, jchristopher
Donate link: http://podsfoundation.org/donate/
Tags: pods, custom post types, custom taxonomies, user fields, custom fields, cck, cms, content types, database, framework, drupal, post types, avatars, comment fields, media fields
Requires at least: 3.8
Tested up to: 4.1.1
Stable tag: 2.5.1.2
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Pods is a framework for creating, managing, and deploying customized content types and fields.

== Description ==

Check out http://pods.io/ for our User Guide, Forums, and other resources to help you develop with Pods.

= Introduction =
[youtube http://www.youtube.com/watch?v=tkBDNOAQJxg]

= Content types that evolve with your needs =
Create any type of content that you want -- small or large -- we've got you covered. Every content type created with Pods gets all the love it needs to grow up big and strong. You'll get an easy to use interface that lets you manage custom fields and how your content type will function.

We now give you the power you've never before had with a single plugin because we've reimagined how to manage content types from the ground up.

= Create new content types =
With Pods, you can create entirely new content types:

* Custom Post Types - Content types that look and function like Posts and Pages, but in their own separate areas
* Custom Taxonomies - Content types that look and function like Categories and Tags, but in their own separate areas
* Custom Settings Pages - Create custom admin forms under Settings to help organize your site's custom global settings
* Advanced Content Types - These are entirely separate from WordPress and function off their own database tables

= Extend existing content types =
Not satisfied? How about the power of being able to extend existing content types? We've got you covered with extending these major WordPress objects:

* Post Types - Create and manage fields for any existing Post Type (Posts, Pages, etc), even those created by plugins or themes
* Taxonomies - Create and manage fields for any existing Taxonomies (Categories, Tags, etc), even those created by plugins or themes
* Media - Create and manage fields for your media uploads, easily add additional information and context to any file you want
* Users - Create and manage fields for your user profiles, this is truly the bees knees!
* Comments - Create and manage fields for your visitor comments, easily add fields to fit the way you use comments as reviews and more

= Use our field types, or make your own =
We have a lot of common field types available for you to use, or you can build your own with our extensible field type classes.

Each of these field type have their own set of options, if those aren't enough they are also easily extended:

* Date / Time - Date, Time, or both
* Number - Plain Number or Currency
* Text - Plain Text, Website, Phone, E-mail, or Password
* Paragraph Text - Plain Paragraph, WYSIWYG (TinyMCE or CLEditor, or add your own), or Code (Syntax Highlighting)
* Color Picker - Choose colors, because colors are great
* Yes / No - You can't really go wrong with a checkbox, but we've added a few charms to make it stand out
* File / Image / Video - Upload new media or select from existing ones with our Media Library integration, or use a simple uploader, your choice
* Avatars - Upload new media or select from existing ones, automatically integrates with get_avatar calls for Users extended by Pods
* Relationships - Relate any item, to any item of any WP object type, another Pod, or a custom user-defined list -- with bidirectional relationships

= Relationships to rule the world with =

* Custom defined list
* Post Types
* Taxonomies
* Users
* User Roles
* User Capabilities
* Media
* Comments

And many other relationships are also available including:

* Image Sizes
* Navigation Menus
* Post Formats
* Post Status
* Sidebars
* Countries (predefined)
* US States (predefined)
* Days of Week (predefined)
* Months of Year (predefined)

= Easily display your content =
There are several ways to get Pods data to show up throughout your site, but with any WP object type you create or extend with Pods, you can use all of the functions and methods you're already used to with the core WordPress API / Loop -- out of the box!

Additionally, we have a United Theming API that lets you theme your content types across every type of Pod, regardless if it's a post type or taxonomy or user, or.. you get the picture.

= Customized Management Panels =
Utilize Pods UI (included in Pods 1.10+) to build your own Custom Management panels for your Pods.

= Optional Components to do even more =
You can enable some of our included components to extend your WordPress site even further:

* Roles and Capabilities - Create or edit Roles for your site, and customize their corresponding capabilities
* Pages - Create custom pages that function off of your site's path, with wildcard support, and choose the Page Template to use
* Templates - Use our template engine to create templates that can be handed off to clients for carefree management
* Helpers - Customize how Pods works right from the admin area with simple to advanced reusable code snippets
* Advanced Content Types - These types of content were built into Pods prior to 2.3, but are now optionally enabled
* Table Storage - Enable table-based storage for custom fields on Post Types, Media, Users, and Comments. Also adds the ability to add custom fields to Taxonomies
* Advanced Relationships - Add advanced relationship objects for relating to including Database Tables, Multisite Networks, Multisite Sites, Themes, Page Templates, Sidebars, Post Type Objects, and Taxonomy Objects
* Markdown Syntax - Parses Markdown Syntax for Paragraph Text / WYSIWYG fields
* Builder theme integration - Use our tightly integrated modules for Builder in your layouts

= Migrate to Pods, find out what you've been missing =
Using another solution? We've built additional components to help you transition:

* Import from Custom Post Type UI
* More imports coming soon including Importing from Custom Field Suite, Advanced Custom Fields, and Custom Tables

= Plays well with others =
We also do our best to integrate and play nicely with other projects:

* Plugins we've integrated with
 * [Tabify Edit Screen](http://wordpress.org/plugins/tabify-edit-screen/)
 * [Codepress Admin Columns](http://wordpress.org/plugins/codepress-admin-columns/)
 * [Polylang](http://wordpress.org/plugins/polylang/)
 * [YARPP](http://wordpress.org/plugins/yet-another-related-posts-plugin/)
 * [WPML](http://wpml.org/)
 * [Conductor](https://conductorplugin.com/)
 * [Timber](http://upstatement.com/timber/)
 * [Gravity Forms](http://www.gravityforms.com/) Using the [Pods Gravity Forms Add-on](https://github.com/pods-framework/pods-gravity-forms)
 * [Caldera Forms](http://calderaforms.com) Using the [Pods Caldera Forms Add-on](https://github.com/pods-framework/pods-caldera-forms)
 * [WordPress JSON REST API (WP-API)](http://wp-api.org) Using the [Pods JSON API](https://github.com/pods-framework/pods-json-api)
* Themes we've integrated with
 * [Builder](http://www.ithemes.com/) (iThemes)
 * [Genesis](http://www.studiopress.com/) (StudioPress)

== Installation ==

1. Unpack the entire contents of this plugin zip file into your `wp-content/plugins/` folder locally
1. Upload to your site
1. Navigate to `wp-admin/plugins.php` on your site (your WP Admin plugin page)
1. Activate this plugin

OR you can just install it with WordPress by going to Plugins >> Add New >> and type this plugin's name

== Screenshots ==

1. Create new content types or extend existing ones
2. Add fields of many different types, with individual options for each so you can define your content type to be what you need it to be
3. Post Type pods will add fields to the Post editor
4. Taxonomy pods will add fields to the Taxonomy forms
5. User pods will add fields to the User forms
6. Comment pods will add fields to the Comment forms
7. Media pods will add fields to the Media forms
8. Create Advanced Content Types that exist only as you define them, outside of the normal WP object structure

== Contributors ==

Pods really wouldn't be where it is without all of the contributions both financially and through code / time. Check out our GitHub for a list of contributors, or search our GitHub issues to see everyone involved in adding features, fixing bugs, or reporting issues/testing.

[github.com/pods-framework/pods/graphs/contributors](https://github.com/pods-framework/pods/graphs/contributors)

== Translations ==

Many thanks go out to the fine folks who have helped us translate Pods into other languages other than English! Join us in further translating the Pods interface at: http://wp-translate.org/projects/pods
 Join us in further translating the Pods interface at: http://wp-translate.org/projects/pods

== Changelog ==
= 2.5.1.2 - March 16th, 2015 =
* Security Update: We recommend all Pods 1.x/2.x installations be updated to the latest version of Pods
* or replace your plugin files with the download of your version from http://wordpress.org/plugins/pods/developers/
* Fixed: Pods UI orderby now strictly enforces Database column format

= 2.5.1.1 - January 22nd, 2015 =
* Fixed missing files for font icon.

= 2.5.1 - January 22nd, 2015 =
* Fixed: Issue preventing fields from being sorted by weight or by orderby, that was affecting image multi-select image field ordering.
* Fixed: Missing gradients in UI.
* Fixed: Use of anonymous function in PodsMeta.php causing issues with old versions of PHP.
* Fixed: Issue where hidden fields were being shown for admin users, when they should have been hidden.
* Fixed: Issue where PodsAPI::delete_field() was unable to delete fields in certain situations.
* Fixed: Issue with pods_version_check() usage that was causing a deprecated core function to run, when it was supposed to prevent it from running.
* Fixed: Issue with pods_error() that was causing it to display AJAX errors improperly.
* Fixed: Issue preventing public, publicly queryable & rewrite with front from saving choices in advanced options.
* Fixed: Magic tag for custom taxonomy, which was showing no content in Pods Templates in 2.5.
* Fixed: If block in Frontier.
* Fixed: Issue with custom taxonomy joins preventing "custom_tax.d.custom_field" type where clauses from working.

= 2.5 - December 30th, 2014 =
* Major performance enhancements can now make things run up to 400% faster (props to @jamesgol!)
* More unit tests -- now 1,858 tests with a total of 13,420 assertions covering all content type, storage type, and field variations (props to @sc0ttkclark, @clubduece, and @mordauk! it was a group effort)
* Added Travis-CI / Scrutinizer-CI for all pushes and pull requests to unit test and check for other issues
* Upgraded Code Mirror library
* Upgraded qTip library
* Updated translations -- Add your translations at http://wp-translate.org/projects/pods
* Fixed: Added nonces for multiple actions in the admin area to avoid accidental / unwanted results
* Fixed: Issue causing issues in admin with CodePress admin columns.
* Fixed: Issue preventing Pods Template editor from working with certain xcache configurations.
* Added: 'join' to the accepted tags for Pods Shortcode.
* Added: 'pods_data_pre_select_params' filter.
* Improve: PodsAPI::export_pod_item_lvl(), adding item ID to all steps.
* Simplify logic when creating new PodsAPI singleton internally.
* Switch from Pods::do_hook() to apply_filters() or do_action() for 'pods_pods_fields', 'pods_pods_field_related_output_type', 'pods_pods_field_', 'pods_pods_field', 'pods_pods_fetch', 'pods_pods_reset', 'pods_pods_total_found', 'pods_pods_filters'
* Fixed: YARRP support.
* Ensure that pods_v_sanitized() passes the $strict argument to pods_v().
* Prevent use of date_i18n() in PodsData when not needed.
* Fixed: Issue where updating relationship to users in pods editor  threw an erroneous error.
* Fixed: Hiding of text in title-prompt-text
* Updated design of new Pod wizard to match MP6 (props to @nikv!)
* Fixed: Inline docs for pods_api_get_table_info_default_post_status filter
* Fixed: Issue where Pods::field() showed cached data after saving via Pods::save(), without re-building the Pods Object.
* Allowed PodsField_Pick to save names
* Switched pods_v() to use switch/case instead of if/else where possible.
* Prevented Pods::id() from calling the field method unless it has to.
* In PodsData::select(), allow proper use of cache expiration time.
* Fixed: Issue in currency fields to ensure proper handling of decimals.
* Added a "pre_select" hook in PodsData.
* Improved traversal regex in Pods::find() to have better handling for variation of backticks.
* Removed usages of the deprecated WordPress function like_escape().
* Remove redundant file/class checks for Pods Templates.
* Implement glotpress-grunt for manging translations.
* Fixed: Issue where get_current_screen(), in some contexts was used as an object, when it was null.
* Improved: Styling of shortcode insert button.
* Prevented string replace and trim from running on a form field default when default value is not a string
* Fixed: Issue preventing color pickers from working in front-end form.
* Switched from using $wpdb->prefix to $wpdb->base_prefix in pick field class.
* Fixed: Default avatars on the Discussion settings page replaced by user's custom avatar.
* When saving custom fields, whitespace is now trimmed.
* Better validation of custom fields when saving custom post types.
* Improved: Handling of required fields.
* Changed the default of $display_errors in Pods class to true.
* Allowed save_post_meta to delete single meta elements instead of update.
* Fixed: An issue preventing fields from being sorted by orderby.
* Fixed: Issue where fields, storing one value, returned arrays, instead of strings.
* Allowed extending the link category taxonomy, if in use.
* Added join as an acceptable tag for Pods shortcodes.
* Fixed pods_error(): reversed logic that was emitting an error instead of throwing an exception when $display_errors is false
* Fixed issue where user_url was created as a required field when extending users.
* Add ability to use pods_group_add() in the ACT editor.
* Security Update Reminder: As of Pods 2.4.2, we recommend all Pods 2.x installations be updated to the latest version, or replace your plugin files with the download of your version from http://wordpress.org/plugins/pods/developers/
* If you need assistance in upgrading your Pods 2.x site to the latest version of Pods, please don't hesitate to contact us at http://pods.io/help/

= 2.4.3 - June 23rd, 2014 =
* Fixed: Pods Templates component now has better handling of the new shortcodes
* Fixed: PodsUI data issue with Custom DB Table support
* Fixed: Readonly fields and noncing now works properly, Pods 2.4.2 caused all forms with readonly fields to fail submission
* Hardened: Further security hardening of the `[pods]` shortcode, added PODS_DISABLE_SHORTCODE constant to allow sites to disable the Pods shortcode altogether

= 2.4.2 - June 22nd, 2014 =
* Security Update: We recommend all Pods 2.x installations be updated to the latest version of Pods to fix a noncing issue with form saving, or replace your plugin files with the download of your version from http://wordpress.org/plugins/pods/developers/

= 2.4.1 - June 19th, 2014 =
* Fixed: Display of of hidden fields in Pods Forms
* Fixed: Reordering fields in PodsUI
* Fixed: PodsUI Admin Icon Display
* Add new filter: ‘pods_pod_form_success_message’ for changing the message when Pods Forms are successfully submitted.
* Fixed: Issues in Packages component when importing existing fields.
* Added new filter: ‘pods_view_alt_view’ for overriding normal Pods Views to be loaded in via AJAX inline from Pods AJAX Views plugin.
* Fixed: PHP error in Pods Template reference.
* New Constant: PODS_PRELOAD_CONFIG_AFTER_FLUSH check to allow for preloading $api->load_pods() after a Pods Cache flush.
* Fixed: Issue with tabled-based SQL delete actions.
* Fixed: PodsUI SQL table-based lookups
* Added: New Hooks In ui/admin/form, which generates ACT editor, for adding additional forms or other content to editor.
* Added: Inline docs for 'pods_meta_default_box_title' filter and normalized args across each usage.
* Added: Item ID to pods_api::export() item array.
* Fixed: Update from GitHub functionality.
* Fixed: Issue where extended custom post types had diffrent names then original post type due to use of dashes in names.
* Improved UX for select2 field adding new items.
* Fixed: $params with unslashed data in Pods_Admin::admin_ajax()
* Fixed: Unwarranted base_dir warnings.
* Fixed: Pagination/search boolean checks.
* Fixed: Issue when mbstring module is not active.
* Fixed: Issue with markdown module header causing activation errors.
* New Filter: 'pods_admin_components_menu' to add/edit components submenu items.
* Added: Ability to use pods() without any parameters. Will pull the pod object based off of the current WP_Query queried object / object id

= 2.4 - April 16th, 2014 =
* After a long road, we've got a new minor release out that fixes a large number of outstanding bugs and adds a few improvements that were within reach right away.
* In Pods 3.0 we're focusing on finishing some overarching performance improvements that are necessary to support large installs with the new Loop and Repeatable fields features.
* Added: Tagging feature for Relationship fields with Autocomplete (Select2) which lets you add new items on-demand when saving
* Added: PodsAPI::get_changed_fields() that can be used when in a pre-save hook to return array of changed values or used in PodsAPI::save_pods_item() to track changes to fields
* Added: _pods_location to $params for PodsAPI::save_pod_item which will contain the URL of the form it was submitted from
* Added: New Pods Template editor revamp to include auto-complete for magic tags and field reference, which can be further extended by installing Pods Frontier
* Added: An optional download link to File Upload field type
* Added: Additional Currency formats to Currency field type
* Added: created/modified functionality (see Advanced Content Types) to other Pod types, as long as they are date/datetime fields
* Added: Support for JetPack Publicize and Markdown modules
* Added: Max character length option for paragraph fields
* Added: Actions before and after Pods Form all and individual form fields are outputted
* Added: New constant PODS_ALLOW_FULL_META for for enabling/disabling get_post_meta( $id ) interaction with Pods (on by default)
* Added: New constant PODS_DISABLE_SHORTCODE_SQL to disable SQL-related parameters in shortcode
* Added: 'pods_admin_media_button' filter to disable the Pods shortcode button in post editor
* Added: 'pods_api_save_pod_item_track_changed_fields_{POD_NAME}' filter for tracking changes to fields
* Added: 'pods_pick_ignore_internal' filter to enable/disable Relationships with core Pods types (_pods_pod, etc)
* Added: 'pods_image_default' filter to allow for placekitten.com or other image placeholder scripts for testing
* Added: Improved Pods Template code sanitization
* Added: Better names for many fields in Pods Editor
* Added: New and improved help bubbles in Pods Editor
* Added: Instructions about using Pods Templates in Pods Widgets
* Added: New descriptions for Pods Pages and Pods Advanced Content Types component descriptions
* Added: Support links in Pods Admin -> Help
* Added: Currently active theme to Pods Debug info list
* Added: Inline docs for 'pods_api_get_table_info_default_post_status' filter
* Added: Inline docs for 'pods_admin_menu' filter
* Added: Inline docs for 'pods_admin_setup_edit_options' (and related) filters
* Added: Inline docs for 'pods_admin_setup_edit_tabs' (and related) filters
* Fixed: Issues with user tables in multisite
* Fixed: Issue with PodsForm::default_value
* Fixed: With Pods UI. Keep view when generating pagination links
* Fixed: Bug with custom extensions for allowed file types in upload fields
* Fixed: Compatibility problem with changes to plupload in WordPress 3.9 that prevented upload pop-up from loading
* Fixed: Array to string conversion error for CSS fields in Pods UI
* Fixed: Magic tags for taxonomies in Pods Templates
* Fixed: Fixed jQuery scope in Pods Form inline JavaScript
* Fixed: Added 'output' to reserved content types names and reserved query vars
* Fixed: Issue where required currency and number fields could be saved at default value
* Fixed: Undefined method error in WP 3.4 due to use of WP_User::to_array() which was added in WP 3.5
* Fixed: Issue with ability to use filters on reorder page with Pods UI
* Fixed: Pre-save enforcing of max length for meta-based values
* Fixed: Extra spaces in custom defined list labels
* Fixed: Pagination default value for Pods shortcode
* Fixed: PodsForm::submit_button() method that had been lost from previous versions
* Fixed: Usage of pods_v in currency.php for optimzation purposes
* Fixed: Correct parent_file to highlight the correct top level menu
* Fixed: Improper wording for text at top of settings page field
* Found a bug? Have a great feature idea? Get on GitHub and tell us about it and we'll get right on it: https://pods.io/submit/
* Our GitHub also has a full list of issues closed for this release and all previous 2.x releases, you can even browse our code or contribute notes and patches all from the web at: http://pods.io/github/

= 2.3.18 - November 4th, 2013 =
* Be on the look out for Pods 2.4, officially in development and in Beta soon! It will include our new Loop and Repeatable fields
* Fixed: PodsData row handling during fetch loop, thanks to a number of users who helped find this one

= 2.3.17 - November 4th, 2013 =
* Fixed: PodsData item caching now disabled for WP objects, relying on core WP caching entirely
* Fixed: PodsAPI::save_pod_item default value handling for new items no goes through all fields, even if not included in form

= 2.3.16 - November 4th, 2013 =
* Fixed: PodsMeta pod caching is now different between meta calls and the form methods, avoiding potential issues with functions used that call their own meta (TinyMCE)
* Fixed: Properly add/drop column for table-based Pods when switching between a custom simple relationship and a normal relationship
* Fixed: Session starting for memcache-based sessions and other tcp:// configs improved
* Fixed: Media saving bug, where the custom fields were not saving when going to Media Library > Edit

= 2.3.15 - October 31st, 2013 =
* Added: New 'calc_rows' option in Pods::find, this allows for SQL_CALC_FOUND_ROWS to be run selectively (default is off, since we run a separate count query on demand by default)
* Added: You can now override the 'manage' action link in PodsUI 'action_links'
* Added: `shortcodes="1"` attribute for the Pods shortcode will allow for running of shortcodes output through templates or fields included
* Fixed: PHP warnings with role restriction when limited to one role
* Fixed: 2.3.14 introduced a regression bug that would not save fields in the user profile, so values never changed
* Fixed: Quick Edit on terms could potentially save empty values for the custom fields
* Fixed: Traversal handling of Pods::field for related_item.ID would cache into object as related_item, so a subsequent lookup of related_item would come back as the ID and return the wrong value

= 2.3.14 - October 29th, 2013 =
* Fixed: Some users experienced and issue with user registration when there were required fields

= 2.3.13 - N/A =

= 2.3.12 - October 15th, 2013 =
* Improved: Meta object caching improved
* Fixed: Some users experienced an issue with a reference error

= 2.3.11 - October 12th, 2013 =
* Fixed: User / Post field value saving with better nonce handling
* Fixed: pods_v_set saving for user meta

= 2.3.10 - October 11th, 2013 =
* Added: Ability to set 'output' type in Pods::field() to 'pods' for Relationship fields related to a Pod, which will return an array of fully functional 'pods' objects for further advanced code
* Added: Pod Pages now have an option to redirect to the login page or a custom URL if the user does not have permission to view it (based on restrict settings on the Pod Page itself)
* Added: Ability to set Taxonomy terms for a Post Type item through the normal Pods 'add' / 'save' / etc methods
* Added: Ability to set User 'role' for a User through the normal Pods 'add' / 'save' methods
* Added: Taxonomy-specific capabilities added to the Pods Roles component
* Added: New Days of Week and Months in Year pre-defined relationships added for simplistic date-oriented fields
* Added: Support for $offset handling in Pods::pagination()
* Added: YARPP integration for Post Types
* Added: Default Select Text customization for Relationship fields that are set to a Dropdown input
* Added: Default Post Status to use for Custom Post Types created by Pods, when utilizing the Pods 'add' method
* Added: mu-plugins support for Pods as a Must-Use plugin on WordPress Multisite installations (props @studioanino)
* Improved: Smarter handling of post_status for Post Types, easier to override to show other post statuses, and if you don't provide it in the 'where', it will fall back to the default(s)
* Improved: Pods::remove_from() now removes all values if you provide no 'value' for a specific field
* Fixed: Comment queries using comment_type should allow for a blank string (props @sirbeagle)
* Fixed: Date / Time saving for 24 hour formats
* Fixed: Timezone notices on certain configurations

= 2.3.9 - August 5th, 2013 =
* A big welcome to the newest contributor to our team, David Cramer (@desertsnowman)!
* Added: Theme-based Pod Templates now available, when using $pod->template( 'your-template' ) or other places a template can be used (shortcode, widget, etc), with $obj variable available for use like in a normal template -- this will automatically include your template file from the following locations, child-theme aware: pods/your-template.php, pods-your-template.php, or your-template.php -- Get the code out of the database and get rid of the need for the Templates component!
* Added: When saving items via the API, relationship fields now accept slugs (previously only IDs)
* Added: When saving items via the API, file fields now accept URLs or GUIDs (previously only IDs), if you provide a URL and it isn't already in WordPress, it will automatically import as a new WP attachment
* Added: Read Only option for fields, works like Hidden option, under Advanced tab of field editor
* Added: New '_src_relative' and '_src_schemeless' field options for returning an attachment field's URL that's schemeless (// instead of http://)
* Added: New 'list' option for pagination, a clone of the 'paginate' option that's Bootstrap compatible
* Added: Added Chinese translations
* Fixed: Updated compatibility for WordPress 3.6 slashing changes while maintaining compatibility for WP 3.4+
* Fixed: Custom Taxonomies now have their menu icon option available, previously hidden due to a bug
* Fixed: Various PHP notices/warnings
* Fixed: Translation tweaks and fixes

= 2.3.8 - June 8th, 2013 =
* Fixed: Hide field from UI option now works properly for admins
* Fixed: User data handling for `pods( 'user' )`
* Fixed: jpeg extension now included in built-in 'images' option for File field type
* Fixed: iThemes Builder / Markdown components weren't loading properly (no errors, just didn't load)

= 2.3.7 - June 7th, 2013 =
* Added: New filter to allow searching across different fields in autocomplete relationship fields: https://github.com/pods-framework/pods/issues/1464
* Improved: JS performance used for the field manager drastically improved (props @pglewis)
* Improved: PHP optimization tweaks for how we handle $_POST sanitization
* Fixed: Parent Menu ID handling for the Pods that support it
* Fixed: E_STRICT PHP notices
* Fixed: Shortcode popup JS building logic
* Fixed: Issue with find() queries using number decimals matching the relationship traversal regex rules

= 2.3.6 - May 24th, 2013 =
* Fixed: Issue with the Pod list when you delete or empty a Pod, it would repeat the same row in the list until you went back to the Edit Pods screen without the id=X in the URL
* Fixed: Issue with renaming a field to another name would rename the field name and then delete it due to a missing ID validation check

= 2.3.5.1 - May 20th, 2013 =
* Fixed: Issue with the Upgrade wizard from 1.x to 2.x showing up properly

= 2.3.5 - May 19th, 2013 =
* Added: Ability to add new global field options (separate from field types) and new field editor tabs
* Various fixes that can be found on GitHub

= 2.3.4 - April 29th, 2013 =
* Added: Ability to iterate through the Pods object with `foreach ( $pod as $item ) { echo $item->display( 'name' ); }`
* Added: Ability to override serial array parameters in Pods::display() `$pod->display( array( 'name' => 'field_name', 'serial_params' => array( 'and' => '' ) ) )`
* Added: Ability to override related field parameters in Pods::field() to further filter related field arrays beyond the defaults `$pod->field( array( 'name' => 'related_field', 'params' => array( 'where' => 't.active = 1' ) ) )`
* Added: Ability to use RegEx in Pod Page URI's, just filter 'pods_page_regex_matching' and return true (default is false, normal wildcard * handling)
* Improved: Pod Page detection on URLs is cleaner and more performant, the tricky MySQL query from the days of Pods 1.x has been completely replaced with a process similar to WP Rewrites
* And 15 other bug fixes that can be found on GitHub

= 2.3.3.1 - April 21st, 2013 =
* Fixed: Advanced Content Types were missing their 'Advanced' tab
* Fixed: IE 8-10 issue with plupload implementation for the 'Add File' button

= 2.3.3 - April 21st, 2013 =
* Added: Ability to change the output type of relationship fields with pods_field_related_output_type filter - Options are arrays (default), objects, ids, or names
* Added: Traversal for detail_url (related_post.detail_url maps to get_permalink, same for Taxonomies, Users, or Comments)
* Added: Pods::is( $field, $value ) to check if a field is a specific value
* Added: Pods::has( $field, $value ) to check if a field has a specific value in it - Check for value(s) in related/file fields, get stripos for text-based fields, uses Pods::is for all other fields
* Added: Pods::remove_from( $field, $value ) to remove a value for relationship (remove ID), file (remove ID), and number (subtract) and saves (see Pods::add_to for the reverse of this)
* Added: Ability to change the default file upload type (default images) with the pods_form_ui_field_file_type_default filter
* Improved: Pods class caching now better and utilized object caching for primary object init
* Translated: Full pt_BR translation provided by [Luciana](https://github.com/yammye)
* And 40+ other enhancements and bug fixes that can be found on GitHub

= 2.3.2 - April 11th, 2013 =
* Added: You can now select 'ID' from the list of available columns to show in Admin UI for Advanced Content Types
* Various fixes that can be found on GitHub

= 2.3.1 - April 9th, 2013 =
* Added: New ability to set the menu location of Custom Taxonomies (expose a Custom Taxonomy that isn't associated to a Post Type)
* Various fixes that can be found on GitHub

= 2.3 - April 7th, 2013 =
* Added: Custom Settings Pages - now you can add new settings pages with their own custom fields!
* Added: Pods find() 'where' / 'having' parameters now accepts the standard WP_Query meta_query format! With the added ability to nest AND/OR 'relation' too!
* Added: When using pods() function and `[pods]` shortcode, Pod and ID will be auto-detected from current post type and ID if on singular post page or in the loop
* Added: Pods fields() method now takes two new arguments, $field and $option to get an option from a specific field
* Added: `{@detail_url}` handling for taxonomies, users, and comments
* Added: New find() traversal capabilities https://github.com/pods-framework/pods/issues/972
* Added: New field() value and traversal capabilities https://github.com/pods-framework/pods/issues/971
* Added: When saving a relationship field that's bidirectional, and the related field is required - if the save would cause that field to be empty a warning will now be shown on save
* Added: New Pods first_id/last_id methods for getting the first/last ID of find()
* Added: New Pods nth( $pos ) method for when in a fetch() loop, works like CSS nth-child and accepts the same format `5`, `3n+3`, etc: http://css-tricks.com/how-nth-child-works/
* Added: New Pods position() method for when in a fetch() loop, returns current row number (1+)
* Added: New Pods add_to() method to add a value to relationship (add ID), file (add ID), number (add/subtract), and text (append) fields to their existing values and saves
* Added: New Pods import() method maps to PodsAPI import() method
* Added: New Pods export() method maps to PodsAPI export() and accepts find $params and the ability to choose depth level
* Added: Advanced Content Types now have Admin UI settings available which expose the most popular PodsUI options
* Added: Advanced Content Types now have the ability to be Hierarchical, by selecting a relationship field to itself
* Added: Now you can Duplicate Pods themselves!
* Added: Pods now automatically adds Post Type capabilities (based on the Post Type options) for each Custom Post Type you create in Pods, works with Members capabilities filter
* Added: Additional support in the Pods API for (eventually) extending WP Multisite Sites / Networks, and Custom Tables
* Added: New shortcode / widget / Builder module for including a file from the theme (using PodsView)
* Added: New shortcode option for including a field value from the current post/page
* Added: New WordPress 3.5 Media Library integration, more on the way soon!
* Added: New shortcode option for including Pod Page content
* Added: New Pod Page option to associate a Pod and choose the slug {@url.2} to use for populating the pod
* Added: New translations! Join us in further translating the Pods interface at: http://translate.rocksta.rs/projects/pods-framework
* Revamped: Admin interface for editing Pods has been updated with tabs and better organization, includes the new ability to add your own tabs and options using the pods_admin_setup_edit_tabs and pods_admin_setup_edit_options filters
* Revamped: Relationships saving has been revamped to provide better abstraction (less code, more reusable)
* Updated: Additional Polylang and WPML support throughout the Pods API
* Updated: Pods Edit list now separated by Pod Type for easier management on large sites
* Updated: Pods Components list now separated by Category, getting us ready for many new components that will be separately available soon
* Updated: Pods export() method now exports to JSON and you can choose the depth of the export (whether to include relationships and their related items, etc)
* Updated: Better handling for Pods prev/next methods, detecting if there's a find() already on that page
* Updated: More phpDoc updates
* Updated: More refined caching and optimization of specific calls to get only what they need
* Updated: Now enforcing maximum post type (20 chars) / taxonomy (32 chars) naming
* Changed: Advanced Content Types have been split off into their own component which you can enable to be able to add new Advanced Content Types
* Changed: Table-based storage for WordPress objects (Post Types, Taxonomies, Media, Users, and Comments) has been split off into it's own component which you can enable to add the table-based storage option to the Pods Add New interface
* Various fixes that can be found on GitHub

= 2.2 - January 5th, 2013 =
* Added: New 'Duplicate Field' option, that lets you copy a field's settings into a new field in the Pod editor
* Added: New iThemes Builder component - Adds four new modules available for use in Builder Layouts -- Field Value, Form, List Items, and Single Item
* Updated: Split up the old Pods Admin > Setup menu into two separate items -- Edit Pods and Add New
* Fixed: Upgrade from Pods 1.x to Pods 2.x now fixed, in Pods 2.1 the upgrade wizard was not shown
* Various fixes that can be found on GitHub

= 2.1 - December 7th, 2012 =
* Pods is now WordPress 3.5 compatible as we've added a number of fixes for all the 3.5 media goodness! We're also working on some tighter integration with the new 3.5 media popups (thanks to the awesome work of @jchristopher) - watch for that in Pods 2.2 soon
* Added: New Tableless mode (for WordPress VIP compatibility!) lets Pods run on any site w/ table-based storage turned off and wp_podsrel won't be utilized (or even created if tableless mode is on during activation) - define( 'PODS_TABLELESS', true )
* Added: New Light mode disables all Components - define( 'PODS_LIGHT', true )
* Added: New Avatar field type available for when you extend the Users object with Pods - Automatically takes over get_avatar calls!
* Added: New Relate to options available for relationships fields for Post Formats and WP Nav Menus
* Added: API to register pods and fields from a theme or another plugin (doesn't save into the DB): pods_register_type and pods_register_field - See https://github.com/pods-framework/pods/issues/700
* Added: Now you can look up meta field values within find() calls, just use the field_name.meta_value syntax (instead of t.field_name) and Pods will auto-join the table needed
* Updated: Relationship 'where' option in Field editor now more robust and has all fields (including relationships, or meta like above) can be referenced
* Updated: Relationship 'where' option in Field editor now supports {@user.ID} lookups which maps to pods_var( 'ID', 'user' ) to sanitize (ex. user.ID != '{@user.ID}' in the Pick WHERE will return all users not the current user); You can use any pods_var enabled option, documentation coming this month
* Updated: Relationship saving has been optimized for both bi-directional relationships and regular relationships
* Various fixes that can be found on GitHub

= 2.0.5.1 - November 25th, 2012 =
* Fixed: 'Edit' link wasn't appearing for Pod Pages / Templates / Helpers (you could click the title though)

= 2.0.5 - November 24th, 2012 =
* Another big set of stability fixes to improve performance and functionality
* Added: Migrate Packages component - Our Package manager makes a return! You may remember it from Pods 1.x, but we've cleaned it up and improved the interface to make it easier to migrate your settings between sites or share them with others

= 2.0.4.1 - October 17th, 2012 =
* Updated: Pods UI duplicate method labels were confusing
* Fixed: Simple Relationships were returning raw data for table-based Pods
* Fixed: Specify specific content types to import in Migrate Custom Post Types UI component
* Fixed: Add Custom Capabilities bug with first text box wouldn't save in Roles component
* Fixed: Various Widget fixes to Widget UI
* Fixed: XHTML balance tags option in Writing settings was adding a space in <?php tags for Pod Pages / Helpers / Templates
* Fixed: Date / Time field now allows an empty value to be saved rather than setting the current date / time, this is an option that can be turned off
* Fixed: WP Rewrites are properly flushed upon adding / editing / deleting Pods

= 2.0.4 - October 15th, 2012 =
* Big bug fix release, we've fixed tons of bugs and improved backwards compatibility even further - stability, stability, stability!

= 2.0.3.1 - October 5th, 2012 =
* Fixed an upgrade issue a few users were reporting where the upgrade wouldn't start
* Fixed reserved post_name issues with our internal post types for Pods and Fields (rss, date, and any other feeds)

= 2.0.3 - October 4th, 2012 =
* We've fixed many more bugs, that means even more stability and backwards compatibility for those who have been holding off on upgrading
* Added: 'expires' parameter to find() / findRecords() calls, defaults to null, but set it to 0 or above (in seconds) and it will cache the results for as long as you'd like.
* Added: 'cache_mode' parameter to find() / findRecords() calls, defaults to 'cache', additional options are 'transient' and 'site-transient' and it kicks in when 'expires' is 0 or above
* Added: 'search_across' parameter to find() / findRecords() calls, defaults to false, set it to true to have your searches search across all of the fields on your pod (excluding relationship / files)
* Added: 'search_across_pick' parameter to find() / findRecords() calls, defaults to false, set it to true to have your searches search across all of the relationship fields on your pod
* Added: 'search_across_file' parameter to find() / findRecords() calls, defaults to false, set it to true to have your searches search across all of the file fields on your pod
* Added: Bidirectional fields are now available again in Pods 2.0, our new fully revamped functionality takes care of the headaches and will keep your relationships in sync with each other. As a result of the revamp, any previous bidirectional fields will need to be set again. Those now upgrading from Pods 1.x will have their existing bidirectional fields upgraded automatically and won't have to worry about setting them up again.
* Added: Widgets are now available to use to List Pod items, Show a specific Pod item, or to Show a specific field from a Pod item much like our TinyMCE shortcode popup -- enjoy!
* Improved: Search handling has been improved along with the above tweaks
* Check out the new screenshots we added to our plugin page if you're new to the plugin
* While we have been working on our new Pods 2.0 documentation for our site, we went ahead and synced all of that good stuff over into the code comments along with links back to the documentation.

= 2.0.2 - September 27th, 2012 =
* Even more bugs have now been fixed including additional backwards compatibility fixes
* Caching improvements and fixes, things should be even more responsive, try enabling object caching to see super speed!

= 2.0.1 - September 25th, 2012 =
* With the help of our awesome users, we've been able to quickly fix 14 bugs
* Improved backwards compatibility
* Fixed Pods UI reordering saving bug

= 2.0 - September 21st, 2012 =
* An all new, fully revamped Pods has arrived! Check our plugin page for all the details
* Please backup your site database before upgrading, even though we've tested migration it's never a bad idea to be safe
* Create and extend WP objects like Post Types, Taxonomies, Media, Users, and Comments, plus everything you love about Pods from before