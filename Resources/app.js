(function() {
    //render appropriate components based on the platform and form factor
    var osname = Ti.Platform.osname,
        version = Ti.Platform.version,
        height = Ti.Platform.displayCaps.platformHeight,
        width = Ti.Platform.displayCaps.platformWidth;

    //considering tablets to have width over 720px and height over 600px - you can define your own
    function checkTablet() {
        var platform = Ti.Platform.osname;

        switch (platform) {
        case 'ipad':
            return true;
        case 'android':
            var psc = Ti.Platform.Android.physicalSizeCategory;
            var tiAndroid = Ti.Platform.Android;
            return psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_LARGE || psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_XLARGE;
        default:
            return Math.min(
                Ti.Platform.displayCaps.platformHeight,
                Ti.Platform.displayCaps.platformWidth
            ) >= 400;
        }
    }

    var isTablet = checkTablet();
    console.log(isTablet);

    var Window;
    if (isTablet) {
        Window = require('ui/tablet/ApplicationWindow');
    } else {
        // Android uses platform-specific properties to create windows.
        // All other platforms follow a similar UI pattern.
        if (osname === 'android') {
            Window = require('ui/handheld/android/ApplicationWindow');
        } else {
            Window = require('ui/handheld/ApplicationWindow');
        }
    }
    var rss = require('rss');
    rss.getRSSData(null,
                   function(rss) {
                       Window(rss).open();
                   });
})();
