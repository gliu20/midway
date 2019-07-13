var loader_firstLoad = Date.now();
var loader_loadTime;


    (function () {
        var loader = document.getElementById('loader');
        
        function load10 () {loader.className = "p1";}
        function load20 () {loader.className = "p2";}
        function load30 () {loader.className = "p3";}
        function load40 () {loader.className = "p4";}
        function load50 () {loader.className = "p5";}
        function load60 () {loader.className = "p6";}
        function load70 () {loader.className = "p7";}
        function load80 () {loader.className = "p8";}
        function load90 () {loader.className = "p9";}
        
        function done () {
            var timeElapsed = Date.now() - loader_firstLoad;
			
			// log load times
			loader_loadTime = timeElapsed;
				
            // animation for loading begins and ends b/w 1100 and 1600
            // if it happens during loading, then wait until done.
            if (1100 < timeElapsed && timeElapsed < 1600) {
                // 1500 - timeElapsed is the time left until 1600 mark
                // 10ms is added to ensure function will run second time around
                setTimeout(done,1600 - timeElapsed + 10);

                // stop everything and escape
                return;
            }

            loader.className = "loading-end";
            setTimeout(function () {
                loader.remove();
            }, 200);

            return;
        }
        
		// this is for trolling purposes; to keep user waiting
        setTimeout(load20,1500);
        setTimeout(load70,1600);
        setTimeout(done,1700);
    })();
