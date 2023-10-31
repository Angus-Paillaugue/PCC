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
    chrome.contextMenus.create({
        title: "Open in PandaBuy",
        contexts:["link"],
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
    console.log(message)
    if (message.type === "updateTabURL") {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tabs]) => {
            chrome.tabs.update(tabs.id, { url: message.url });
        });
    }
});