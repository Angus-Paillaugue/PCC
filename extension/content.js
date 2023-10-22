// Function for actually fetching currencies conversion rates from the api
function fetchLive(currencyToConvertTo, callback) {
    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyToConvertTo}`).then(res => res.json()).then((data) => {
        chrome.storage.local.set({cache: {currencyToConvertTo, data:data.rates}, cacheTime: Date.now()}, () => {
            callback(data.rates);
        });
    });
}

// Checking currencies conversion rates in cache (calls fetchLive if cache-miss)
function getRates(currencyToConvertTo, callback) {
    chrome.storage.local.get(['cache', 'cacheTime'], (items) => {
        if (items?.cache && items?.cacheTime > Date.now() - 3600*1000 && items?.cache?.currencyToConvertTo === currencyToConvertTo) {
            console.log(`PCC : Using cached conversion rates to ${currencyToConvertTo}`);
            return callback(items.cache.data);
        }else {
            console.log(`PCC : Fetching live from api rates to ${currencyToConvertTo}`);
            fetchLive(currencyToConvertTo, callback);
        }
    });
}

// Some regex magic to convert currencies inside strings
function formatString(inputString, rates, currencies, currencyToConvertTo) {
    inputString = inputString.replaceAll("￥", "¥");
    if(new URLPattern("https://\*.pandabuy.com").test(location.origin) && (location.pathname === "/cartEstimatedFreight" || location.pathname ==="/person/parcel/list")){
        for(const currency of currencies){
            inputString = inputString.replaceAll(currency.name, currency.symbol);
        }
    }
    // Do some regex magic to extract all the currency matches inside the provided string
    const regex = /([$€¥£₹₽₴₱₪₨₩₦₢₣₥₫₵])[^$€¥£₹₽₴₱₪₨₩₦₢₣₥₫₵]{0,3}(\d+(\.\d{1,2})?)/g;
    const matches = [...inputString.matchAll(regex)];
    
    if (matches.length === 0) return inputString;
    
    let modifiedString = '';
    let lastIndex = 0;
    // For each currency math inside the string
    for (const match of matches) {
        const currencySymbol = match[1];
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

function changeYuppoGrid(){
    chrome.storage.local.get(["yuppoInterfaceReDesign"], (data) => {
        let yuppoInterfaceReDesign = data?.yuppoInterfaceReDesign ?? true;
        if(new URLPattern("\*://\*.yupoo.com/\*").test(location.origin) && yuppoInterfaceReDesign){
            chrome.storage.local.get(["yuppoContentWidth"], (status) => {
                yuppoContentWidth = status?.yuppoContentWidth ?? 170;

                if(document.querySelector(".showalbumheader__main"))document.querySelector(".showalbumheader__main").style.maxWidth = "100%";
                if(document.querySelector(".showindex__gallerycardwrap"))document.querySelector(".showindex__gallerycardwrap").style.maxWidth = "100%";
                if(document.querySelector(".showalbum__imagecardwrap"))document.querySelector(".showalbum__imagecardwrap").style.maxWidth = "100%";
                if(document.querySelector(".categories__box.clearfix"))document.querySelector(".categories__box.clearfix").style.maxWidth = "100%";

                // Change style og products containers
                let imagesContainers = document.querySelectorAll(".categories__parent.album__categories-box, .showalbum__parent.showalbum__min.min, .showindex__parent");
                for(let imagesContainer of imagesContainers){
                    imagesContainer.style.display = "grid";
                    imagesContainer.style.gap = "10px";
                    imagesContainer.style.gridTemplateColumns = `repeat(auto-fill, minmax(${yuppoContentWidth}px, 1fr))`;
                    // Change sty of products
                    Array.from(imagesContainer.children).forEach(el => {
                        el.style.width = "100%";
                        el.style.margin = "0";
                    });
                }
            });
        }
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request?.yuppoContentWidthChanged) changeYuppoGrid();
    }
);

changeYuppoGrid();

// Checking if toggle switch on popup is enabled
chrome.storage.local.get(["status"], (status) => {
    status = status?.status ?? true;
    if(status){
        // Appends the style of the "Pandabuy link" button on pages like reddit
        appendButtonStyle();
        // Checking the currency to convert to
        chrome.storage.local.get(["convertTo"], (convertTo) => {
            // if currency to convert to does not exists, default to USD
            convertTo = convertTo?.convertTo ?? "USD";
            

            // Gathering the currencies converting rates (trying for cache and if miss fetching it from the api)
            getRates(convertTo, (rates) => {
                // Fetch currencies data from ./currencies.json
                var xhr = new XMLHttpRequest();
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
                            if(isMarketplaceUrl(location.href) || new URLPattern("*://\*.reddit.com/*").test(new URL(location.href).origin)){
                                const text = document.querySelectorAll("span, p, a, h1, h2, h3, h4, h5, h6, em, tr, ul, ol, tr, label, div, dd, li");
                                text.forEach(textNode => {
                                    // For all of the children inside the elements
                                    for (let i = 0; i < textNode.childNodes.length; ++i){
                                        // Checks if the child is a text node
                                        if (textNode.childNodes[i].nodeType === Node.TEXT_NODE){
                                            // Extract the text, calls the format function and replace the text with the converted one
                                            let nodeText = textNode.childNodes[i].textContent;
                                            let formattedText = formatString(nodeText, rates, currencies, convertTo);
                                            if(formattedText !== textNode.childNodes[i].textContent) textNode.childNodes[i].textContent = formattedText;
                                        }
                                    }
                                });
                            }
                            
                            // chrome.storage.local.get(["linkConversion"], (data) => {
                            //     let linkConversion = data?.linkConversion ?? true;
                            //     if(linkConversion){
                            //         // Converts plain text link into link buttons
                            //         const links = document.querySelectorAll("a");
                            //         links.forEach(link => {
                            //             try {
                            //                 if(isMarketplaceUrl(link.innerText) && new URL(link.innerText).host !== "www.pandabuy.com"){
                            //                     const newLink = document.createElement("a");
                            //                     newLink.href = `https://www.pandabuy.com/product?url=${encodeURIComponent(link.innerText)}`;
                            //                     newLink.classList.add("PCCButton");
                            //                     newLink.target = "blank";
                            //                     newLink.innerHTML = "<span>Pandabuy link</span>";
                            //                     link.replaceWith(newLink);
                            //                 }else if(isMarketplaceUrl(link.innerText)){
                            //                     const newLink = document.createElement("a");
                            //                     newLink.href = link.innerText;
                            //                     newLink.classList.add("PCCButton");
                            //                     newLink.target = "blank";
                            //                     newLink.innerHTML = "<span>Pandabuy link</span>";
                            //                     link.replaceWith(newLink);
                            //                 }
                            //             }catch(_){}
                            //         });
                            //     }
                            // });
                        }, 1000);
                    }     
                }
                xhr.send();
            });
        });
    }
});

const marketplacesUrls = ["*://\*.pandabuy.com/*", "*://\*.yupoo.com/*", "https://m.weidian.com/*", "https://weidian.com/*", "*://\*.taobao.com/*", "*://\*.1688.com/*", "*://\*.tmall.com/*"];

const isMarketplaceUrl = (url) => {
    try { 
        let isValid = false;
        for(let marketplaceUrl of marketplacesUrls){
            if(new URLPattern(marketplaceUrl).test(new URL(url).origin)) isValid = true;
        }
        return isValid;
    }catch(e){ 
        return false; 
    }
}

const appendButtonStyle = () => {
    const css = `.PCCButton {text-size-adjust: none;-webkit-box-direction: normal;word-break: break-word !important;font: inherit;font-family: inherit;vertical-align: baseline;display: inline-flex;flex-direction:row;justify-content: center;align-items: center;line-height: 1;white-space: nowrap;cursor: pointer;background: #fff;border: 1px solid #dcdfe6;-webkit-appearance: none;text-align: center;box-sizing: border-box;outline: none;margin: 0;transition: .1s;-webkit-user-select: none;padding: 12px 20px;border-radius: 4px;color: rgb(232, 230, 227) !important;background-color: #11ba66;border-color: #11ba66;width: 180px;font-weight: 700;font-size: 18px;}`
    const head = document.head || document.getElementsByTagName('head')[0]
    const style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet) style.styleSheet.cssText = css; else style.appendChild(document.createTextNode(css));
}