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
        contexts:["all"],
        id: "openInPandaBuy"
    });
});