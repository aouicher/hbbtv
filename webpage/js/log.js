// *************************************************************************************** //
// *************************************************************************************** //
// *************************************************************************************** //
//                                                                                         //
// Logging Module                                                                          //
//                                                                                         //
// *************************************************************************************** //
// *************************************************************************************** //
// *************************************************************************************** //

/*eslint no-console: "error"*/

window.InitLog = function(d) { 

    var lastLogTime = Date.now();
    var logStr 		= "";
    var logDiv      = d;
    
    
    function write(message, cssClass) {
        var txt, elapsedTime, logItem;
		
        elapsedTime = ("000000" + (Date.now() - lastLogTime)).slice(-6);
        lastLogTime = Date.now();
		
        txt = elapsedTime + "ms:" + message;
        //logStr += txt + "\r\n";
		
        logItem = document.createElement("p");
        logItem.setAttribute("class", cssClass);

        logItem.innerHTML = txt;
        logDiv.appendChild(logItem);
        
        logDiv.scrollTop = logDiv.scrollHeight - logDiv.clientHeight;
    }

    return {
        error 	: function (message) {
            write("ERROR: " + message, "error");
            // eslint-disable-next-line no-console
            console.error(message);
        },

        warn 	: function (message) {
            write("WARN: " + message, "warn");
            // eslint-disable-next-line no-console
            console.warn(message);
        },

        info 	: function (message) {
            write("INFO: " + message, "info");
            // eslint-disable-next-line no-console
            console.info(message);
        },

        debug 	: function (message) {
            write("DEBUG: " + message, "debug");
            // eslint-disable-next-line no-console
            console.trace(message);
        }		
    };
};
