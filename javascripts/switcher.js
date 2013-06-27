(function($){

    /*!
     * jQuery Cookie Plugin
     * https://github.com/carhartl/jquery-cookie
     *
     * Copyright 2011, Klaus Hartl
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://www.opensource.org/licenses/mit-license.php
     * http://www.opensource.org/licenses/GPL-2.0
     */

    $.cookie = function(key, value, options) {
        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };

    function body_class( prefix, newClass ) {
        // remove all app- prefixed classes
        $( 'body' ).removeClass (function (index, css) {

            var re = new RegExp( "\\b" + prefix + "\\S+", "g" );
            return (css.match (re) || []).join(' ');
        });
        $('body').addClass( newClass );
        $.cookie( prefix + 'smartbiz', newClass, { path : '/', expires : 7 } );
    }

    $(document).ready(function() {
        var switcher = $( '#style-switcher' );

        // check if we have a cookie for the pattern
        if( $.cookie( 'theme-pattern-smartbiz') !== null ) {
            body_class( 'theme-pattern-', $.cookie( 'theme-pattern-smartbiz') );
        }

        if( $.cookie( 'theme-colour-smartbiz') !== null ) {
            body_class( 'theme-color-', $.cookie( 'theme-colour-smartbiz') );
        }

        // set pattern clicks
        switcher.find( '.pattern-switch' ).click( function() {
            var $link = $( this );
            var pattern = $link.data('pattern');
            body_class( 'theme-pattern-', pattern );
        })

        // set colour clicks
        switcher.find( '.colour-switch' ).click( function() {
            var $link = $( this );
            var colour = $link.data('colour');
            body_class( 'theme-color-', colour );
        })

        // make switcher toggle
        var bt = switcher.find('.handle');
        bt.on('click', function(e) {
            switcher.toggleClass('open');
            if ( switcher.hasClass('open') ) {
                switcher.animate({
                    left: 0
                }, 400);
            } else {
                switcher.animate({
                    left: -240
                }, 400);
            }
            e.preventDefault();
        })
    });
})(jQuery);
