<?php
/**
 *
 * $HeadURL: http://plugins.svn.wordpress.org/types/tags/1.6.5.1/embedded/common/toolset-forms/external/autocompleter.php $
 * $LastChangedDate: 2014-05-29 08:44:10 +0000 (Thu, 29 May 2014) $
 * $LastChangedRevision: 922956 $
 * $LastChangedBy: iworks $
 *
 */

$path = dirname(__FILE__);
$file = '/wp-config.php';
while ( !is_file( $path.$file) ) {
    $path = dirname($path);
}
require_once $path.$file;
function autocompleter()
{
	$results = 1;
	$wpdb =& $GLOBALS['wpdb'];
	$search = @$wpdb->escape($_GET['q']);
	if(strlen($search)){
		switch($results){
			case 1: //Tags and categories
				$words = $wpdb->get_results("SELECT concat( name, '|', sum( count ) ) name, sum( count ) cnt FROM ".$wpdb->prefix."terms t, ".$wpdb->prefix."term_taxonomy tt WHERE t.term_id = tt.term_id AND name LIKE '$search%' GROUP BY t.term_id ORDER BY cnt DESC");
				break;
			case 2: //Only tags
				$words = $wpdb->get_results("SELECT concat( name, '|', sum( count ) ) name, sum( count ) cnt FROM ".$wpdb->prefix."terms t, ".$wpdb->prefix."term_taxonomy tt WHERE t.term_id = tt.term_id AND tt.taxonomy='post_tag' AND name LIKE '$search%' GROUP BY t.term_id ORDER BY cnt DESC");
				break;
			case 3: //Only categories
				$words = $wpdb->get_results("SELECT concat( name, '|', sum( count ) ) name, sum( count ) cnt FROM ".$wpdb->prefix."terms t, ".$wpdb->prefix."term_taxonomy tt WHERE t.term_id = tt.term_id AND tt.taxonomy='category' AND name LIKE '$search%' GROUP BY t.term_id ORDER BY cnt DESC");
				break;
			case 4: //Posts and pages titles
				$words = $wpdb->get_results("SELECT concat( post_title, '|', 1 ) name, 1 cnt, ID FROM ".$wpdb->prefix."posts t WHERE post_status='publish' and (post_type='post' OR post_type='page') and post_date < NOW() and post_title LIKE '%$search%' ORDER BY post_title");
				break;
			case 5: //Posts titles
				$words = $wpdb->get_results("SELECT concat( post_title, '|', 1 ) name, 1 cnt, ID FROM ".$wpdb->prefix."posts t WHERE post_status='publish' and (post_type='post') and post_date < NOW() and post_title LIKE '%$search%' ORDER BY post_title");
				break;
			case 6: //Pages titles
				$words = $wpdb->get_results("SELECT concat( post_title, '|', 1 ) name, 1 cnt, ID FROM ".$wpdb->prefix."posts t WHERE post_status='publish' and (post_type='page') and post_date < NOW() and post_title LIKE '%$search%' ORDER BY post_title");
				break;
		}
		foreach ($words as $word){
			if($results > 3)
				echo $word->name."|".get_permalink($word->ID)."\n";
			else
				echo $word->name."\n";
		}
	}
}
if($_GET['q']){
	autocompleter();
}
