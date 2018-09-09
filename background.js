if (typeof browser == "undefined")
    var browser = chrome;

browser.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        details.requestHeaders.push({
            name: "X-Molotov-Agent",
            value: "{\"app_id\":\"electron_app\",\"app_build\":3,\"app_version_name\":\"2.3.0\",\"type\":\"desktop\",\"electron_version\":\"1.7.12\",\"os\":\"Unknown\",\"os_version\":\"Unknown\",\"manufacturer\":\"Cocktail\",\"serial\":\"Unknown\",\"model\":\"Cocktail\",\"brand\":\"Cocktail\", \"api_version\":2}"
        });
        
        return {requestHeaders: details.requestHeaders};
    },
    {
        urls: [
            "https://fapi.molotov.tv/*",
            "https://multi-screen.molotov.tv/*",
            "https://jessica.molotov.tv/*"
        ],
        types: ["xmlhttprequest"]
    },
    ["blocking", "requestHeaders"]
);

browser.webRequest.onCompleted.addListener(
    function(details) {
        // User successfully logged in.
        if (details.method == "POST"
            && details.url == "https://fapi.molotov.tv/v3/auth/login"
            && details.statusCode == "200"
            // When the maximum number of registered devices is reached, the
            // login "cookie" is immediately cleared and a device removing
            // dialog is opened. When this happens, we should NOT refresh
            // the page, otherwise the user is immediately redirected to the
            // login page.
            && localStorage.getItem("mltv_session")) {
                browser.tabs.reload();
        }
    },
    {
        urls: [
            "https://fapi.molotov.tv/v3/auth/login"
        ],
        types: ["xmlhttprequest"]
    }
);

browser.browserAction.onClicked.addListener(
    function(details) {
        browser.tabs.create({url: "https://app.molotov.tv/"});
    }
);

browser.contextMenus.create({
    id: "my-account",
    title: "Mon compte",
    contexts: ["browser_action"],
    onclick: function() {
        browser.tabs.create({url: "https://account.molotov.tv/account/profile"});
    }
});

browser.contextMenus.create({
    id: "on-tv",
    title: "Molotov sur mon téléviseur",
    contexts: ["browser_action"],
    onclick: function() {
        browser.tabs.create({url: "https://account.molotov.tv/account/tv"});
    }
});

browser.contextMenus.create({
    id: "faq",
    title: "Aide et contact",
    contexts: ["browser_action"],
    onclick: function() {
        if (confirm("Attention ! Cocktail n'est pas une application officielle de la société Molotov. Pour signaler un bug concernant Cocktail, utilisez le menu \"Signaler un bug\".")) {
            browser.tabs.create({url: "https://molotovtv.secure.force.com/"});
        }
    }
});

browser.contextMenus.create({
    id: "github",
    title: "Signaler un bug",
    contexts: ["browser_action"],
    onclick: function() {
        browser.tabs.create({url: "https://github.com/jleroy/Cocktail/issues"});
    }
});
