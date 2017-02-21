chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        details.requestHeaders.push({
            name: "X-Molotov-Agent",
            value: "{\"app_id\":\"electron_app\",\"app_build\":2,\"app_version_name\":\"1.2.2\",\"type\":\"desktop\",\"os\":\"\",\"os_version\":\"\",\"manufacturer\":\"Molotov\",\"serial\":\"Molotov\",\"model\":\"Molotov\",\"brand\":\"Molotov\"}"
        });
        
        return {requestHeaders: details.requestHeaders};
    },
    {
        urls: [
            "https://fapi.molotov.tv/v2/auth/login",
            "https://fapi.molotov.tv/v2/auth/refresh/*"
        ],
        types: ["xmlhttprequest"]
    },
    ["blocking", "requestHeaders"]
);

chrome.webRequest.onCompleted.addListener(
    function(details) {
        // User successfully logged in.
        if (details.method == "POST"
            && details.url == "https://fapi.molotov.tv/v2/auth/login"
            && details.statusCode == "200") {
                chrome.tabs.reload();
        }
    },
    {
        urls: [
            "https://fapi.molotov.tv/v2/auth/login"
        ],
        types: ["xmlhttprequest"]
    }
);

chrome.browserAction.onClicked.addListener(
    function(details) {
        chrome.tabs.create({url: "http://app.molotov.tv/"});
    }
);
