/**
 * Resizer en iframe i høyden når innholder endrer seg
 * @author Daniel Staver IXD AS
 * @param {Object} options Objekt med opsjoner som skal sendes til iframeSizer
 * @param {Integer} options.interval Intervallet scriptet skal kjøres med   
 */
(function($) {
    $.fn.iframeSizer = function(options) {        
        options = options || {};
        options.interval = options.hasOwnProperty('interval') ? options.interval : 400;
        
        var iframe = $(this);
        var oldHeight = 0;
        var oldLocation = '';
        
        // Function to poll iframe document for a resized calculator
        var checkHeight = function(){
            // IE will trigger an exception if the child document is not loaded
            // and the document.domain variable fo that document is not yet set
            try {
                var height = iframe.contents().find('body').height();
    
                if( height > 0 && height != oldHeight ) {
                    oldHeight = height;
                    iframe.trigger('iframeNewHeight', [height]) // Height is different, trigger iframeNewHeight event
                }
            } catch(e) {
                
            }
        }
        
        // Poll iframe for a new height
        var checkHeightInterval = setInterval( checkHeight, options.interval );
        
        // Binds iframe to iframeNewHeight event 
        iframe.bind( 'iframeNewHeight', function( e, height ) {
            iframe.height(height);
        });
    }
})(jQuery);