// Checks if current website is a marketplace and is a product page and not a shop page
chrome.storage.local.get(["skipYupooRedirect"], (status) => {
    status = status?.skipYupooRedirect ?? true;
    if(status){
        chrome.runtime.sendMessage({ type: "updateTabURL", url: decodeURIComponent(new URL(location.href).searchParams.get("url")) });
    }
});