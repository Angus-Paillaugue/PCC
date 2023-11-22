//* ||-----------------------------------||
//* ||          Helper functions         ||
//* ||-----------------------------------||

const marketplacesUrls = ["*://\*.pandabuy.com/*", "*://\*.sugargoo.com/*", "*://\*.yupoo.com/*", "*://\*.weidian.com/*", "*://weidian.com/*", "*://\*.taobao.com/*", "*://\*.1688.com/*", "*://\*.tmall.com/*"];

const urlMatch = (urls, testWith=location.origin) => {
    try { 
        for(const url of urls){
            if(new URLPattern(url).test(testWith)) return true;
        }
        return false;
    }catch(_){ return false; }
}


/**
 * Checks if the current URL matches any of the marketplace URLs.
 * @returns {boolean} - true if the URL matches any of the marketplace URLs, false otherwise.
 */
function isMarketplaceUrl () {
    return urlMatch(marketplacesUrls);
}


/**
 * Extracts the product ID from the provided URL.
 * @param {string} url - The URL to extract the product ID from.
 * @returns {string|boolean} - The product ID if found, false otherwise.
 */
function getProductId(url){
    if(!isMarketplaceUrl(url)) return false;
    if(urlMatch(["*://\*.pandabuy.com/*"], url)) {
        if("itemID" == new URL(url)?.searchParams?.get("itemID")) return new URL(url).searchParams.get(searchParam);
    }else {
        const searchParams = ["id", "itemID"];
    
        for(const searchParam of new URL(url)?.searchParams?.keys()){
            if(searchParams.includes(searchParam)) {
                return new URL(url).searchParams.get(searchParam);
            }
        }
    
        // For 1688
        if(new URLPattern({ pathname: "/offer/*.html" }).test(location.href)) return location.href.match(/[0-9]{12}/g)[0];
        // For CSSBuy
        if(urlMatch(["*://\*.cssbuy.com//item-*.html"], location.href)) return url.match(/item-[0-9]{12}/g)[0].replace("item-", "");
    }


    return false;
}


/**
 * Checks if the provided URL is a product page.
 * @param {string} url - The URL to check.
 * @returns {boolean} - true if the URL is a product page, false otherwise.
 */
function isAProductPage (url) {
    return !!getProductId(url);
}


/**
 * Copies the provided text to the clipboard.
 * @param {string} text - The text to copy to the clipboard.
 */
function copyToClipboard(text){
    const textarea = document.createElement('textarea');
    textarea.style.opacity = 0;
    textarea.style.width = 0;
    textarea.style.height = 0;
    textarea.style.position = 'absolute';
    textarea.style.bottom = '-100%';
    textarea.style.left = '-100%';
    textarea.style.margin = 0;
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    $("#likCopiedToast").remove();
    chrome.storage.local.get(["darkMode"], (status) => {
        status = status?.darkMode ?? false;
        $("body").append(`
        <div id="likCopiedToast" style="margin: 0; opacity: 0; display: flex; position: fixed; top: 0.5rem; right: 0.5rem; padding: 1rem; align-items: center; gap: .5rem; border-radius: 0.5rem; width: 100%; max-width: 20rem; color: rgb(${ status ? "21 128 61" : "22 163 74" }) !important; background-color: #${ status ? "1f2937" : "FFFFFF" } !important; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); z-index: 9999;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" id="linkCopiedToastSvg" style="width: 20px;height: 20px;">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
            <p style="font-size: 1rem;font-weight: 400; margin: 0;">Link copied successfully!</p>
        </div>
        `)
        $("#likCopiedToast").animate({opacity: "1"}, 150, function() {
            setTimeout(function() {
                $("#likCopiedToast").animate({opacity: "0"}, 150, function() {
                    $("#likCopiedToast").remove();
                });
            }, 3000);
        });
    });
}


/**
 * Fetches the conversion rates for the provided currency from the API.
 * @param {string} currencyToConvertTo - The currency to convert to.
 * @param {function} callback - The function to call with the conversion rates.
 */
function fetchLive(currencyToConvertTo, callback) {
    fetch(`https://pcc.paillaugue.fr/api/exchange-rates/${currencyToConvertTo}`).then(res => res.json()).then((data) => {
        console.log(data);
        chrome.storage.local.set({cache: {currencyToConvertTo, data:data.rates}, cacheTime: Date.now()}, () => {
            callback(data.rates);
        });
    });
}


/**
 * Gets the conversion rates for the provided currency from the cache or API.
 * @param {string} currencyToConvertTo - The currency to convert to.
 * @param {function} callback - The function to call with the conversion rates.
 */
function getRates(currencyToConvertTo, callback) {
    chrome.storage.local.get(['cache', 'cacheTime'], (items) => {
        if (items?.cache && items?.cacheTime > Date.now() - 3600*1000 && items?.cache?.currencyToConvertTo === currencyToConvertTo) {
            console.log(`PCC : Using cached ${currencyToConvertTo} conversion rates`);
            return callback(items.cache.data);
        }else {
            console.log(`PCC : Fetching live ${currencyToConvertTo} exchange rates from api`);
            fetchLive(currencyToConvertTo, callback);
        }
    });
}


/**
 * Converts the currencies in the provided string to the provided currency.
 * @param {string} inputString - The string to convert.
 * @param {object} rates - The conversion rates.
 * @param {object[]} currencies - The list of currencies.
 * @param {string} currencyToConvertTo - The currency to convert to.
 * @returns {string} - The converted string.
 */
function formatString(inputString, rates, currencies, currencyToConvertTo) {
    inputString = inputString.replaceAll("￥", "¥");
    if(urlMatch(["*://\*.pandabuy.com"]) && (location.pathname === "/cartEstimatedFreight" || location.pathname ==="/person/parcel/list")){
        for(const currency of currencies){
            inputString = inputString.replaceAll(currency.name, currency.symbol);
        }
    }
    // Do some regex magic to extract all the currency matches inside the provided string
    const regex = /([$€¥£₹₽₴₱₪₨₩₦₢₣₥₫₵]\s?\.?~?\s?\d+(\.\d{1,2})?|\d+(\.\d{1,2})?\s?\.?~?\s?[$€¥£₹₽₴₱₪₨₩₦₢₣₥₫₵])/g;
    const matches = [...inputString.matchAll(regex)];
    
    if (matches.length === 0) return inputString;
    
    let modifiedString = '';
    let lastIndex = 0;
    // For each currency math inside the string
    for (const match of matches) {
        const currencySymbol = match[0].match(/[$€¥£₹₽₴₱₪₨₩₦₢₣₥₫₵]/g)[0];
        const originalNumber = parseFloat(match[0].match(/[-+]?\d+(\.\d+)?/g)[0]);
        // Asserts the match contains a currency symbol and a numerical value inside
        if(currencySymbol && originalNumber){
            // Extract the currency (returns object from currencies.json) from the match
            const currency = currencies.filter(el => el.symbol === currencySymbol)[0];
            // If the matched currency is not the same as the one we are trying to convert to
            if(currency.name !== currencyToConvertTo){
                // Get the rate of th currency to convert it to the one selected to the user
                const rate = rates[currency.name];
                // Convert the amount in the match
                const convertedNumber = isNaN(originalNumber) ? '' : (parseFloat(originalNumber) / rate).toFixed(2);
                // Modifies the currency string to be converted to the chosen currency
                modifiedString += inputString.substring(lastIndex, match.index-1) + convertedNumber + " " + currencies.filter(el => el.name === currencyToConvertTo)[0].symbol;
                modifiedString = modifiedString.replaceAll(currency.name, "");
                lastIndex = match.index + match[0].length;
            }
        }
    }
    modifiedString += inputString.substring(lastIndex);

    return modifiedString;
}





    
//* ||-----------------------------------||
//* ||          Main functions           ||
//* ||-----------------------------------||

/**
 * Converts the currencies on the current page to the currency selected by the user.
 * @function
 * @name conversion
 * @returns {void}
 */
function conversion(){
    // Checking the currency to convert to
    chrome.storage.local.get(["convertTo"], (convertTo) => {
        // if currency to convert to does not exists, default to USD
        convertTo = convertTo?.convertTo ?? "USD";
        

        // Gathering the currencies converting rates (trying for cache and if miss fetching it from the api)
        getRates(convertTo, (rates) => {
            console.log(rates);
            // Fetch currencies data from ./currencies.json
            const xhr = new XMLHttpRequest();
            xhr.open("GET", chrome.runtime.getURL('currencies.json'));
            xhr.onreadystatechange  = function() {
                // Checks if the currencies.json fetching has ended and can proceed
                if (this.readyState == 4 && this.status === 200) {
                    const currencies = JSON.parse(xhr.responseText);
                    // Converts currencies in the title of the page
                    const titleEl = document.querySelector("title");
                    if(titleEl) titleEl.innerText = formatString(titleEl.innerText, rates, currencies, convertTo)
        
                    // Getting all the text nodes and converting the currencies inside their text content every second
                    setInterval(() => {
                        const text = document.querySelectorAll("span, p, a, h1, h2, h3, h4, h5, h6, em, tr, ul, ol, tr, label, div, dd, li");
                        text.forEach(textNode => {
                            // For all of the children inside the elements
                            for (let i = 0; i < textNode.childNodes.length; ++i){
                                // Checks if the child is a text node
                                if (textNode.childNodes[i].nodeType === Node.TEXT_NODE){
                                    // Extract the text, calls the format function and replace the text with the converted one
                                    const nodeText = textNode.childNodes[i].textContent;
                                    const formattedText = formatString(nodeText, rates, currencies, convertTo);
                                    if(formattedText !== textNode.childNodes[i].textContent) textNode.childNodes[i].textContent = formattedText;
                                }
                            }
                        });
                    }, 1000);
                }
            }
            xhr.send();
        });
    });
}



/**
 * Changes the grid layout of Yupoo's product pages.
 * @function
 * @name changeYupooGrid
 * @returns {void}
 */
function changeYupooGrid(){
    if(!urlMatch(["\*://\*.yupoo.com/\*"])) return;
    chrome.storage.local.get(["yupooInterfaceReDesign"], (data) => {
        const yupooInterfaceReDesign = data?.yupooInterfaceReDesign ?? false;
        if(!yupooInterfaceReDesign) return;
        chrome.storage.local.get(["yupooContentWidth"], (status) => {
            const yupooContentWidth = status?.yupooContentWidth ?? 170;
    
            if(document.querySelector(".showalbumheader__main"))document.querySelector(".showalbumheader__main").style.maxWidth = "100%";
            if(document.querySelector(".showindex__gallerycardwrap"))document.querySelector(".showindex__gallerycardwrap").style.maxWidth = "100%";
            if(document.querySelector(".showalbum__imagecardwrap"))document.querySelector(".showalbum__imagecardwrap").style.maxWidth = "100%";
            if(document.querySelector(".categories__box.clearfix"))document.querySelector(".categories__box.clearfix").style.maxWidth = "100%";
    
            // Change style of products containers
            let count = 0;
            const interval = setInterval(() => {
                const imagesContainers = document.querySelectorAll(".categories__parent.album__categories-box, .showalbum__parent, .showindex__parent, .showalbum__parent, .showindex__parent");
                if(imagesContainers.length > 0 || count === 10) clearInterval(interval);
                for(const imagesContainer of imagesContainers){
                    console.log(imagesContainer);
                    imagesContainer.style.display = "grid";
                    imagesContainer.style.gap = "10px";
                    imagesContainer.style.gridTemplateColumns = `repeat(auto-fill, minmax(${yupooContentWidth}px, 1fr))`;
                    // Change sty of products
                    Array.from(imagesContainer.children).forEach(el => {
                        el.style.width = "100%";
                        el.style.margin = "0";
                    });
                }
                count ++;
            }, 200);
        });
    });
}



/**
 * Toggles the visibility of Yupoo's sidebar.
 * @function
 * @name toggleYupooSideBar
 * @returns {void}
 */
function toggleYupooSideBar() {
    if(!urlMatch(["\*://\*.yupoo.com/\*"])) return;
    // If remove sidebar toggle switch is on
    chrome.storage.local.get(["removeYupooSideBar"], (status) => {
        status = status?.removeYupooSideBar ?? true;
        if(status){
            chrome.storage.local.get(["yupooInterfaceReDesign"], (data) => {
                const yupooInterfaceReDesign = data?.yupooInterfaceReDesign ?? false;
                if(!yupooInterfaceReDesign) return;
                if(document.querySelector(".yupoo-categories-hide-sidebar")) document.querySelector(".yupoo-categories-hide-sidebar").style.display = "none";
                if(document.querySelector(".categories__box-left")) document.querySelector(".categories__box-left").style.display = "none";
                if(document.querySelector(".categories__box-right")) document.querySelector(".categories__box-right").style.marginLeft = "0";
            });
        }else {
            if(document.querySelector(".yupoo-categories-hide-sidebar")) document.querySelector(".yupoo-categories-hide-sidebar").style.display = "block";
            if(document.querySelector(".categories__box-left")) document.querySelector(".categories__box-left").style.display = "block";
            if(document.querySelector(".categories__box-right")) document.querySelector(".categories__box-right").style.marginLeft = "216px";
        }
    });
}



/**
 * Retrieves the status of pandabuyProductWarnings from local storage and clicks on the accept button if it exists.
 * @function
 * @name productWarnings
 * @returns {void}
 */
function productWarnings(){
    chrome.storage.local.get(["pandabuyProductWarnings"], (status) => {
        status = status?.pandabuyProductWarnings ?? false;
        if(status){
            let count = 0;
            const interval = setInterval(() => {
                if(count === 20) clearInterval(interval);
                if(document.querySelector(".el-button.accept-btn.el-button--default")){
                    try {
                        document.querySelector(".el-button.accept-btn.el-button--default").click();
                        clearInterval(interval);
                    } catch (_) {}
                }
                count ++;
            }, 200);
        }
    });
}



/**
 * This function checks if the current URL matches a specific pattern and, if so, retrieves a product ID and provider type to display a quality control iframe.
 * @function
 * @name customProductQC
 * @returns {void}
 */
function customProductQC(){
    if(!urlMatch(["*://\*.pandabuy.com/product?*"], location.href)) return;

    chrome.storage.local.get(["customProductQC"], (status) => {
        status = status?.customProductQC ?? false;
        if(status){
            const productUrl = new URL(location.href).searchParams.get("url");
            let providerName = new URL(productUrl).origin.split(".").at(-2).split("/").at(-1);
            if(providerName === "weidian") providerName = "wd";
            if(providerName === "1688") providerName = "alibaba";
            if(providerName === "tmall") providerName = "taobao";
            const providerType = providerName;
            const productID = getProductId(productUrl);
            let count = 0;
            const interval = setInterval(() => {
                count += 1;
                try{
                    if(count >= 20) clearInterval(interval);
                    if($(".overview").length === 0) throw new Error("I got nowhere to append the QC's!");
                    clearInterval(interval);
                    
                    $(".overview").after(`<div style="padding:20px; width:100%;" class="customProductQCContainer"><h2 class="margin-bottom:5px;">Product QC : </h2><iframe src="https://www.pandabuy.com/storageQcImg?itemId=${productID}&providerType=${providerType}&activeIndex=0&type=imageList" style="width:100%; aspect-ratio:16/9; border:none;" id="QCIframe"></iframe></div>`);
        
                    const iframe = document.getElementById("QCIframe").contentDocument || document.getElementById("QCIframe").contentWindow.document;
                    const imgsContainer = iframe.getElementById("big-img-layout");
                    imgsContainer.style.maxWidth = "unset";
                    imgsContainer.style.width = "calc(100vw - 145px)";
                    imgsContainer.style.margin = "0 0 0 10px";
                }catch(_){}
            }, 1000);
        }
    });

}

/**
 * Sets the dark mode for the PandaBuy an Yupoo.
 * @function
 * @name setDarkMode
 * @returns {void}
 */
function setDarkMode(){
    chrome.storage.local.get(["darkMode"], (status) => {
        status = status?.darkMode ?? false;
        if(status && urlMatch(["*://\*.pandabuy.com/*", "*://\*.yupoo.com/*"])){
            const link = document.createElement("link");
            link.href = chrome.runtime.getURL("/src/dark-theme.css");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.id = "PCCDarkTheme";
            document.head.appendChild(link);
        }else {
            if(document.getElementById("PCCDarkTheme")) document.getElementById("PCCDarkTheme").parentNode.removeChild(document.getElementById("PCCDarkTheme"));
        }
    });
}

// ? EXPERIMENTAL : Tracking

function track() {
    if(!urlMatch(["*://\*.pandabuy.com/person/parcel/list"], location.href)) return;
    if(!document.querySelector(".parcel-num")) return setTimeout(track, 1000);
    const parcelNumbers = document.querySelectorAll("div.item.vertical-style.line > p:nth-child(3)");
    for(const number of parcelNumbers){
        const trackingNumber = number.innerText.trim();
        const trackingLink = document.createElement("a");
        trackingLink.href = `https://www.17track.net/en/track?nums=${trackingNumber}`;
        trackingLink.target = "_blank";
        trackingLink.innerText = `Track on 17Track`;
        number.parentNode.appendChild(trackingLink);
    }
}


//* ||-----------------------------------||
//* || Calling the function on page load ||
//* ||-----------------------------------||
// Checking if the conversion is enabled
chrome.storage.local.get(["status"], (status) => {
    status = status?.status ?? true;
    if(status && (isMarketplaceUrl() || new URLPattern("*://\*.reddit.com/*").test(new URL(location.href).origin))){
        chrome.storage.local.get(["username", "password"], (data) => {
            const { username, password } = data;
            if(username && password) conversion();
        });
    }
});

// Listening to popup changes
chrome.storage.local.get(["isPremium"], (status) => {
    status = status?.isPremium ?? false;
    if(status) callPremium();
});

track();


/**
 * Executes a series of functions related to premium features, such as changing the Yupoo grid, toggling the Yupoo sidebar, displaying product warnings, customizing product quality control, and setting dark mode. It also checks or not the required checkbox before adding a product to cart on PandaBuy, redirects or not automatically from a marketplace page to the product on PandaBuy, and listens to popup changes.
 * 
 * @function
 * @name callPremium
 * @returns {void}
 */
function callPremium() {
    changeYupooGrid();
    toggleYupooSideBar();
    productWarnings();
    customProductQC();
    setDarkMode();


    // For checking (or not) the required checkbox before adding a product to cart on PandaBuy
    chrome.storage.local.get(["thirdPartyDisclaimerAutoCheck"], (status) => {
        status = status?.thirdPartyDisclaimerAutoCheck ?? false;
        if(status && urlMatch(["*://\*.pandabuy.com/product?*"], location.href)){
            const setCheckBox = () => {
                try {
                    document.querySelector("input.el-checkbox__original").checked = false;
                    document.querySelector(".el-checkbox").classList.add("is-checked");
                } catch (_) {
                    setTimeout(() => {
                        setCheckBox();
                    }, 1000);
                }
            }
            setCheckBox();
        }
    });

    // Checks if current website is a marketplace and is a product page and not a shop page
    chrome.storage.local.get(["skipYupooRedirect"], (status) => {
        status = status?.skipYupooRedirect ?? false;
        if(status && urlMatch(["https://x.yupoo.com/external?url=*"], location.href)){
            chrome.runtime.sendMessage({ type: "updateTabURL", url: decodeURIComponent(new URL(location.href).searchParams.get("url")) });
        }
    });

    // Redirect (or not) automatically from a marketplace page to the product on PandaBuy
    chrome.storage.local.get(["autoPandaBuyRedirect"], (status) => {
        status = status?.autoPandaBuyRedirect ?? false;
        if(status && isAProductPage(location.href)){
            chrome.runtime.sendMessage({ type: "updateTabURL", url: `https://www.pandabuy.com/product?url=${encodeURIComponent(location.href)}` });
        }
    });
    
    // Listening to popup changes
    chrome.runtime.onMessage.addListener((request) => {
        if(request === "toggledSideBar") toggleYupooSideBar();
        if(request === "productWarningsChange") productWarnings();
        if(request === "yupooContentWidthChanged") changeYupooGrid();
        if(request === "darkModeToggled") setDarkMode();
        if(request?.message === "copyToClipboard") copyToClipboard(request.data);
    });
}
