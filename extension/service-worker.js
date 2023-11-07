chrome.contextMenus.onClicked.addListener(handleContextMenus);

function handleContextMenus(info){
    switch (info.menuItemId) {
        case 'openInPandaBuy':
            chrome.tabs.create({url: `https://www.pandabuy.com/product?url=${encodeURIComponent(info.linkUrl)}`});
            break;
        default:
            console.log('Unknown context-menu clicked.');
    }
}
  

chrome.runtime.onInstalled.addListener(function () {
    console.log("Service worker installed.");

    chrome.storage.local.get(["username", "password"], (data) => {
        const { username, password } = data;
        if(username, password) {
            fetch("http://localhost:5173/checkPremium", { method:"POST", headers:{"Content-Type": "application/json"}, body:JSON.stringify({ username, password }) }).then(response => response.json()).then(data => {
                chrome.storage.local.set({ isPremium:data.isPremium });
            }).catch(error => {
                console.error("Error making the request:", error);
            });
        }else {
            chrome.storage.local.set({ isPremium:false });
        }
    });
    

    chrome.contextMenus.create({
        title: "Open in PandaBuy",
        contexts:[ "link" ],
        id: "openInPandaBuy",
        targetUrlPatterns: [
            "*://*.yupoo.com/*?*id=*",
            "*://*.yupoo.com/*?*itemID=*",
            "*://m.weidian.com/*?*id=*",
            "*://m.weidian.com/*?*itemID=*",
            "*://weidian.com/*?*id=*",
            "*://weidian.com/*?*itemID=*",
            "*://*.taobao.com/*?*id=*",
            "*://*.taobao.com/*?*itemID=*",
            "*://*.1688.com/*?*id=*",
            "*://*.1688.com/*?*itemID=*",
            "*://*.tmall.com/*?*id=*",
            "*://*.tmall.com/*?*itemID=*"
        ]
    });
});

// To update the tab url to the product on PandaBuy if a user visits taobao or some other marketplace url 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "updateTabURL") {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tabs]) => {
            chrome.tabs.update(tabs.id, { url: message.url });
        });
    }
});