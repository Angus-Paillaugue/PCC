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
        }
        console.log(`PCC : Fetching live from api rates to ${currencyToConvertTo}`);
        fetchLive(currencyToConvertTo, callback);
    });
}

// Some regex magic to convert currencies inside strings
function formatString(inputString, rates, currencies, currencyToConvertTo) {
    inputString = inputString.replaceAll("￥", "¥");
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

// Checking if toggle switch on popup is enabled
chrome.storage.local.get(["status"], (status) => {
    status = status?.status ?? true;
    if(status){
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
                        titleEl.innerText = formatString(titleEl.innerText, rates, currencies, convertTo)
            
                        // Getting all the text nodes and converting the currencies inside their text content every second
                        setInterval(() => {
                            const text = document.querySelectorAll("span, p, a, h1, h2, h3, h4, h5, h6, em, tr, ul, ol, tr, label, div, dd, li");
                            text.forEach(textNode => {
                                // For all of the children inside the elements
                                for (var i = 0; i < textNode.childNodes.length; ++i){
                                    // Checks if the child is a text node
                                    if (textNode.childNodes[i].nodeType === Node.TEXT_NODE){
                                        // Extract the text, calls the format function and replace the text with the converted one
                                        let nodeText = textNode.childNodes[i].textContent;
                                        let formattedText = formatString(nodeText, rates, currencies, convertTo);
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
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Checks if the copyImage function is being called and the active tab has a root domain of pandabuy
    if (message.action === "copyImage" && new URLPattern("https://\*.pandabuy.com").test(location.origin)) {
        const image = document.querySelector("#pic-box > div > img");
        // Copying the image element (or else we cannot export canvas)
        const cloneElement = image.cloneNode();
        cloneElement.crossOrigin = "anonymous";;
        document.body.appendChild(cloneElement);

        // Painting the image onto the canvas and exporting it as a blob
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = cloneElement.width;
        canvas.height = cloneElement.height;
        ctx.drawImage(cloneElement, 0, 0);
        canvas.toBlob(blob => {
            cloneElement.remove();
            if(blob){
                // Copying the blob to clipboard
                navigator.clipboard.write([
                    new ClipboardItem({
                        [blob.type]: blob
                    })
                ]).then(() => {
                    // Adding a success toast
                    const toast = document.createElement("div");
                    toast.style.position = "fixed";
                    toast.style.top = "20px";
                    toast.style.right = "20px";
                    toast.style.backgroundColor = "#10c15c";
                    toast.style.padding = "5px";
                    toast.style.borderRadius = "10px";
                    toast.style.border = "1px solid #097538";
                    toast.style.display = "flex";
                    toast.style.flexDirection = "row";
                    toast.style.gap = "10px";
                    toast.style.zIndex = "10000";
                    toast.style.wordBreak = "keep-all";
                    toast.style.justifyItems = "center";
                    toast.style.alignItems = "center";
                    toast.style.fontSize = "17px";
                    toast.style.color = "white";
                    toast.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="height: 30px;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Image successfully copied!`;
                    document.body.appendChild(toast);

                    // Removing toast after 2.5s
                    setTimeout(() => {
                        toast.remove();
                    }, 2500);
                });
            }
        });
    }else if (!new URLPattern("https://\*.pandabuy.com").test(location.origin)){
        const toast = document.createElement("div");
        toast.style.position = "fixed";
        toast.style.top = "20px";
        toast.style.right = "20px";
        toast.style.backgroundColor = "#d12121";
        toast.style.padding = "5px";
        toast.style.borderRadius = "10px";
        toast.style.border = "1px solid #851515";
        toast.style.display = "flex";
        toast.style.flexDirection = "row";
        toast.style.gap = "10px";
        toast.style.zIndex = "10000";
        toast.style.wordBreak = "keep-all";
        toast.style.justifyItems = "center";
        toast.style.alignItems = "center";
        toast.style.fontSize = "17px";
        toast.style.color = "white";
        toast.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="height: 30px;"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> This feature only works on pandabuy.com for now!`;
        document.body.appendChild(toast);

        // Removing toast after 2.5s
        setTimeout(() => {
            toast.remove();
        }, 2500);
    }
});