/* 
 * Group edit page JS
 * 
 * This file should be used from now on as dedicated JS for group edit page.
 * Avoid adding new functionalities to basic.js
 *
 * Thanks!
 *
 * @since Types 1.1.5
 * @autor srdjan
 *
 * $HeadURL: http://plugins.svn.wordpress.org/types/tags/1.6.5.1/embedded/resources/js/fields-form.js $
 * $LastChangedDate: 2014-11-18 06:47:25 +0000 (Tue, 18 Nov 2014) $
 * $LastChangedRevision: 1027712 $
 * $LastChangedBy: iworks $
 *
 */

jQuery(document).ready(function($){
    // Invoke drag on mouse enter
    $('#wpcf-fields-sortable').on('mouseenter', '.js-types-sortable', function(){
        if (!$(this).parent().hasClass('ui-sortable')) {
            $(this).parent().sortable({
                revert: true,
                handle: 'img.js-types-sort-button',
                start: function(e, ui){
                        ui.placeholder.height(ui.item.find('.wpcf-form-fieldset').height());
                    }                
            });
        }
    });
    // Sort and Drag
    $('#wpcf-fields-sortable').sortable({
        cursor: 'ns-resize',
        axis: 'y',
        handle: 'img.wpcf-fields-form-move-field',
        forcePlaceholderSize: true,
        tolerance: 'pointer',
        start: function(e, ui){
                ui.placeholder.height(ui.item.height() + 23);
            }
        
    });

    $('.wpcf-fields-radio-sortable,.wpcf-fields-select-sortable').sortable({
        cursor: 'ns-resize',
        axis: 'y',
        handle: 'img.js-types-sort-button',
        start: function(e, ui){
                ui.placeholder.height(ui.item.height() - 2);
            }                
    });

    $('.wpcf-fields-checkboxes-sortable').sortable({
        cursor: 'ns-resize',
        axis: 'y',
        handle: 'img.js-types-sort-button',
        start: function(e, ui){
                ui.placeholder.height(ui.item.height() + 13);
            }                
    });

    $('[data-wpcf-type="checkbox"],[data-wpcf-type=checkboxes]').each( function() {
        $(this).bind('change', function() {
            wpcf_checkbox_value_zero($(this))
        });
        wpcf_checkbox_value_zero($(this));
    });
});

function wpcf_checkbox_value_zero(field) {
    var passed = true;

    if (jQuery(field).hasClass('wpcf-value-store-error-error')) {
        jQuery(field).prev().remove();
        jQuery(field).removeClass('wpcf-value-store-error-error');
    }
    
    var value = jQuery(field).val();
    if (value === '') {
        passed = false;
        if (!jQuery(field).hasClass('wpcf-value-store-error-error')) {
            jQuery(field).before('<div class="wpcf-form-error">' + jQuery(field).data('required-message') + '</div>').addClass('wpcf-value-store-error-error');
        }
        jQuery(field).focus();

    }
    if (value === '0') {
        passed = false;
        if (!jQuery(field).hasClass('wpcf-value-store-error-error')) {
            jQuery(field).before('<div class="wpcf-form-error">' + jQuery(field).data('required-message-0') + '</div>').addClass('wpcf-value-store-error-error');
        }
        jQuery(field).focus();
    }
    
    return !passed;

}

