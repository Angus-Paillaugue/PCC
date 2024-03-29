chrome.contextMenus.onClicked.addListener(handleContextMenus);

function handleContextMenus(info) {
  switch (info.menuItemId) {
    case "openInPandaBuy":
      chrome.tabs.create({
        url: `https://www.pandabuy.com/product?url=${encodeURIComponent(
          info.linkUrl,
        )}`,
      });
      break;
    case "copyProductLink":
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
          message: "copyToClipboard",
          data: new URL(activeTab.url).searchParams.get("url"),
        });
      });
      break;
    default:
      console.log("Unknown context-menu clicked :", info.menuItemId);
  }
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Service worker installed.");

  chrome.contextMenus.create({
    title: "Open in PandaBuy",
    contexts: ["link"],
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
      "*://*.tmall.com/*?*itemID=*",
    ],
  });
  chrome.contextMenus.create({
    title: "Copy product link",
    contexts: ["page"],
    id: "copyProductLink",
    documentUrlPatterns: ["*://*.pandabuy.com/product?*"],
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
