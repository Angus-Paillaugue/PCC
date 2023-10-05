chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyImage") chrome.tabs.sendMessage(tab.id, { action: "copyImage" });
});
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "copyImage",
    "title": "Copy image",
    "contexts": ["all"]
  });  
});