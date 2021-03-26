var console=(function(oldCons, appName){
   
   function post(s) {
        var x = new XMLHttpRequest();
        x.open("POST", "http://refplayer-dev.cloud.digitaluk.co.uk/consolelog/?appname=" + appName, true);
        x.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        x.send(appName + " " + s);
    }
    
    post("--- START DEBUG SESSION ---");
    post("UserAgent: " + navigator.userAgent);
    
    return {
        log: function(text){
            oldCons.log(text);
            // post("Log: " + text);
        },
        info: function (text) {
            oldCons.info(text);
            // post("Info: " + text);
        },
        warn: function (text) {
            oldCons.warn(text);
            post("WARNING: " + text);
        },
        error: function (text) {
            oldCons.error(text);
            post("ERROR: " + text);
        }
    };
}(window.console, "appdbg"));

window.console = console;

var Log = null;


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function StressLocalStorage() {
    
    const key = 'itv-user';
    const v = {             
        content: { 
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguaXR2LmNvbSIsInN1YiI6IjBjYThmMmI0LTQyZjUtNGIxMS05MGRhLTNiZWFjNjlmY2YxYSIsImV4cCI6MTU5MTM3MTk1NCwiaWF0IjoxNTkxMjgxOTU0LCJicm9hZGNhc3RFcnJvck1zZyI6IiIsImJyb2FkY2FzdFJlc3BvbnNlQ29kZSI6IjIwMCIsImJyb2FkY2FzdGVyIjoiSVRWIiwiaXNBY3RpdmUiOnRydWUsIm5vbmNlIjoiekpKbU1WdFlZQnY0ZVlFWlM5UW0iLCJuYW1lI9879789798797898787jhdwkhjsakasdhjskhdkashjdkashjdkjhkjQ3284979487329874923874923874987239487923874928379487293874982379487932874923879478239874923874987239487329874923874987239487923874938749873294879238749823794879328749knazk;fhjqehkfhjlkjh;kh493ufhwdhgkjhqkldjshlgkhjlkhjerlkjhgkhjgkerhjgkhjrekgjhkghjkerjhkjherkghjkergjhkhjerkjhgkkgerjghkrjhsf',
     
            emailVerified: false,
     
            entitlement: { 
                failedAvailabilityChecks: [],
                purchased: []
            },
     
            refreshToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2F1dGguaXR2LmNvbSIsInN1YiI6IjBjYThmMmI0LTQyZjUtNGIxMS05MGRhLTNiZWFjNjlmY2YxYSIsImV4cCI6NDc0Njk1NTU1NCwiaWF0IjoxNTkxMjgxOTU0LCJub25jZSI6InpKSm1NVnRZWUJ2NGVZRVpTOVFtIiwic2NvcGUiOiJjb250ZW50IiwiYXV0aF90aW1lIjoxNTkxMjgxOTU0fQ.YiEs53h-mjuYWal-6zMfq3rlteV_ex3hWn__qemJNpriMNbs8Fdz1ZZIFRHD0JN6q8CK--7opGhaawg9slGj0ZomB21opORkapvYciPe1I0cxbiWoGR_4TDGQdjZVpLJ8fRZNByi-wDroxkospSDu-gYzgWCx0kjhewdsfkjhkejdhskhkfhksdhfksdhjfkhdskfjhskdjhfkshjdfkhjksdhjfksdhjfkhjsdkfhjksdhjfkjhsdkfhjksdhjfkdjshfkhsdkjhfksdhfkhsdkhfksdhfksdhkhfkjhsdkfhsdkhkhjGYsIwPxUQ-kg249w',
     
            tokenType: 'bearer'
        }
    }

    var writeCt = 0;
    
    setInterval(() => {
        
        try {
            localStorage.setItem(key, JSON.stringify(v));
            Log && Log.info("w");
            //console.log(".");
            if (++writeCt > 1000) {
                location.reload();
            }
            
        } catch(e) {                    
            Log && Log.error("ERROR: Write Error (" + e.code + ")"); 
            //console.error("ERROR: Write Error (" + e.code + ")");
        }
        
    }, 100);


    setInterval(() => {
                        
        try {
            var t = localStorage.getItem(key);
            Log && Log.info("r");
            //console.log(".");
        } catch(e) {                    
            Log && Log.error("ERROR: Read Error (" + e.code + ")"); 
            //console.error("ERROR: Read Error (" + e.code + ")"); 
            clearInterval(intId);
        }

    }, 110);

}



window.onload = function () {

    function e(id) {
        return document.getElementById(id);
    }

    Log = window.InitLog(e("log"));
    
    Log.info("app loaded");
    
    var hbbtv = window.InitHBBTVApp(Log);

    var getKey = window.InitVKKeys();

    // Key mapping table
    function cmndRedButton() {
        Log.info("*** Red Button Pressed"); 
        location.reload();
    };  

    function cmndGreenButton() {
        Log.info("*** Green Button Pressed"); 

        var aPlayer = e('a');
        aPlayer.play();
    };  


    keyEntries = [
        { func : cmndRedButton,       key : "R", hbbKey : getKey("VK_RED")      },
        { func : cmndGreenButton,     key : "G", hbbKey : getKey("VK_GREEN")    }
    ];

    function OnKeyDown(e) {
        var keyCode = e.which || e.charCode || e.keyCode;
        var keyChar = String.fromCharCode(keyCode);
        var keyTableEntry = null;
        
        Log.info("KeyChar: " + keyChar);

        keyTableEntry = keyEntries.filter(function ( obj ) {
            return obj.key === keyChar;
        })[0];  
            
        if (!keyTableEntry) { 
            keyTableEntry = keyEntries.filter(function ( obj ) {
                return obj.hbbKey === keyCode;
            })[0];  
        }
        
        if (keyTableEntry && keyTableEntry.func) { 
            keyTableEntry.func(); 
        }   
    };

    function changeLoc(url) {
        Log.info("Use location to redirect to player to: " + url); 
        //window.location.replace(url);
        location.href = url;
    }
    
    
    document.addEventListener("keydown", OnKeyDown);

    // ------------ PUT YOUR STUFF HERE -------------------- //
    // ------------ PUT YOUR STUFF HERE -------------------- //
    // ------------ PUT YOUR STUFF HERE -------------------- //
    // ------------ PUT YOUR STUFF HERE -------------------- //
    // ------------ PUT YOUR STUFF HERE -------------------- //

    Log.info("HELLO WORLD!!!!"); 
    
    var aPlayer = e('a');
    aPlayer.oncanplay = () => {
        try {
            aPlayer.play();
        } catch (err) {
            Log.error("Audio playback failed");
        }
    };    
    aPlayer.load();
    
    // hbbtv.launchApp("http://192.168.140.133/index.html");
    
    var opt = getUrlVars()["opt"] || "";
    
    var f = hbbtv.launchApp;

    var loc = getUrlVars()["loc"] || "";
    
    if (loc) {
        Log.info("Use location redirect");
        f = changeLoc;
    } else {
        Log.info("Use create app");
    }
    
    
    Log.info(" --- Launch: " + opt); 
    
    switch (opt) {
        
        case "bb" :
            f("https://prod-tv.massive-itv.com/fvp/index.html");
            break;
            
        case "all4" :
            f("https://fvc-p06.stage.channel4.com/fvc-webapp/index.html");
            break;
            
        case "all4-http" :
            f("http://fvc-p06.stage.channel4.com/fvc-webapp/index.html");
            break;
            
        case "itvhub" :
            f("https://app.10ft.itv.com/freeview/index.html");
            break;
            
        case "dplay" :
            f("https://test.hbbtv.dplay.co.uk/");
            break;
            
        case "dplay-http" :
            f("http://test.hbbtv.dplay.co.uk/");
            break;
            
        case "ss" :
            f("http://hybridtv.ss7.tv/amc/prd/catchup/index.html?ait=service_deep_linked&amp;product=catchup&service=freeviewplay");
            break;
            
        case "ss-stg" :
            f("http://hybridtv.ss7.tv/amc/stg/catchup/index.html?ait=service_deep_linked&product=catchup&env=stg&service=freeviewplay");
            break;
            
            
        case "ss-stg-direct" :
            f("http://hybridtv.ss7.tv/amc/release/1.0.55.8.2/default-hbbtvfvp-default.html?ait=service_deep_linked&product=catchup&env=stg&service=freeviewplay");            
            break;
            
        case "stress-localstorage" :
            // StressLocalStorage();
    }
        
    // ------------ PUT YOUR STUFF HERE -------------------- //
    // ------------ PUT YOUR STUFF HERE -------------------- //
    // ------------ PUT YOUR STUFF HERE -------------------- //
    // ------------ PUT YOUR STUFF HERE -------------------- //
    // ------------ PUT YOUR STUFF HERE -------------------- //

};



var opt = getUrlVars()["opt"] || "";


if (opt === "stress-localstorage") {
    StressLocalStorage();
}
    
