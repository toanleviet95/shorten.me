'use strict';
/**
 * @author Batch Themes Ltd.
 */
(function() {
    $(function() {

        var colors = bootstrap_colors();
        var config = {
            name: 'Peak',
            colors: colors
        };

        if ($('html').hasClass('loading')) {
            var loaderTime = 3000;
            var loaderColor = colors.primary;
            var htmlClass = $('html').attr('class').toString();
            if (htmlClass.match(/loading-secondary/gi)) {
                loaderColor = colors.secondary;
            } else if (htmlClass.match(/loading\-info/gi)) {
                loaderColor = colors.info;
            } else if (htmlClass.match(/loading\-success/gi)) {
                loaderColor = colors.success;
            } else if (htmlClass.match(/loading\-warning/gi)) {
                loaderColor = colors.warning;
            } else if (htmlClass.match(/loading\-danger/gi)) {
                loaderColor = colors.danger;
            } else {
                loaderColor = colors.primary;
            }

            $('#fakeloader').fakeLoader({
                timeToHide: loaderTime,
                zIndex: '99999',
                spinner: 'spinner2', //Options: 'spinner1', 'spinner2', 'spinner3', 'spinner4', 'spinner5', 'spinner6', 'spinner7'
                bgColor: '#673AB7'
            });
            setTimeout(function() {
                $('html').removeClass('loading');
            }, loaderTime);
        }
        $('body').bootstrapMaterialDesign({
            text: {
                selector: [`input:not([type=range]):not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=button]):not([type=submit]):not([type=reset])`]
            },
        });

    });
})();