var topbar = document.createElement("div");
topbar.id = "topbar";
var xhr = new XMLHttpRequest();

// Replace all occurrences of "__MSG_@@extension_id__" in HTML code by the real
// extention ID.
// Based on: https://github.com/mikewest/Instapaper-Chrome-Extension/blob/
// master/sendtoinstapaper.js#L286
function set_extension_id(html) {
    return html.replace(/__MSG_@@extension_id__/g, function(m, key) {
        return chrome.i18n.getMessage("@@extension_id");
    });
}

function set_topbar() {
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            topbar.innerHTML = set_extension_id(xhr.responseText);
            document.body.innerHTML = topbar.outerHTML + document.body.innerHTML;
            
            // Dropdown menu.
            const menu = document.querySelector('#topbar-username');
            const dropdown = document.querySelector('#topbar-dropdown');
            
            menu.addEventListener('click', function() {
                if(dropdown.className === "hide") {
                    dropdown.className = "";
                } else {
                    dropdown.className = "hide";
                }
            });
            
            // Logout link.
            const logout = document.querySelector('#dropdown-disconnect');
            logout.addEventListener('click', function() {
                molotov_logout();
            });
            
            // Algolia search script.
            var algjs = document.createElement("script");
            algjs.type = "text/javascript";
            algjs.src = "https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js";
            document.head.appendChild(algjs);
            
            var searchjs = document.createElement("script");
            searchjs.type = "text/javascript";
            searchjs.src = chrome.extension.getURL('/web_resources/search.js');
            document.head.appendChild(searchjs);
        }
    }
    
    xhr.open("GET", chrome.extension.getURL('/web_resources/topbar.html'), true);
    xhr.send();
}

function molotov_logout() {
    localStorage.clear();
    window.location = "/";
}

// Check if user is logged in.
if (localStorage.getItem("session_v1_1")) {
    set_topbar();
    
    // Wait for the page to load before doing any modification
    // on application content.
    window.addEventListener("load", function() {
        setTimeout(function() {
            // Resize lateral (yellow) column.
            var column = document.querySelector('.index__root___3mvAe');
            column.style.height = "95%";
        },
        500); // Dirty hack :(
    });
}