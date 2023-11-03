const marketplacesUrls = ["*://\*.pandabuy.com/*", "*://\*.yupoo.com/*", "https://m.weidian.com/*", "https://weidian.com/*", "*://\*.taobao.com/*", "*://\*.1688.com/*", "*://\*.tmall.com/*"];

function isMarketplaceUrl (url) {
    try { 
        let isValid = false;
        for(let marketplaceUrl of marketplacesUrls){
            if(new URLPattern(marketplaceUrl).test(new URL(url).origin)) isValid = true;
        }
        return isValid;
    }catch(_){ 
        return false; 
    }
}

function isAProductPage (url) {
    if(!isMarketplaceUrl(url)) return false;
    let isValid = false;
    const searchParams = ["id", "itemID"];

    for(const searchParam of new URL(location.href)?.searchParams?.keys()){
        if(searchParams.includes(searchParam)) isValid = true;
    }

    return isValid;
}

export { isMarketplaceUrl, isAProductPage }