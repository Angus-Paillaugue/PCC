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
            "*://*.yupoo.com/*",
            "*://m.weidian.com/*",
            "*://weidian.com/*",
            "*://*.taobao.com/*",
            "*://*.1688.com/*",
            "*://*.tmall.com/*"
        ]
    });
});

// To update the tab url to the product on pandabuy if a user visits taobao or some other marketplace url 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    if (message.type === "updateTabURL") {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tabs]) => {
            chrome.tabs.update(tabs.id, { url: message.url });
        });
    }
});