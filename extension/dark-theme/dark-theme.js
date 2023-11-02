// ? Experimental
// Dark mode on PandaBuy and Yupoo
function setDarkMode(status){
    if(status){
        const link = document.createElement("link");
        link.href = chrome.runtime.getURL("/dark-theme/dark-theme.css");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.id = "PCCDarkTheme";
        document.head.appendChild(link);
    }else {
        if(document.getElementById("PCCDarkTheme")) document.getElementById("PCCDarkTheme").parentNode.removeChild(document.getElementById("PCCDarkTheme"));
    }
}

// Set the theme based on the loading status
chrome.storage.local.get(["darkMode"], (status) => {
    status = status?.darkMode ?? false;
    setDarkMode(status);
});

// Listening to theme changes
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(Object.keys(request).includes('darkModeToggled')) setDarkMode(request.darkModeToggled);
});