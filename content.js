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
    if(new URLPattern("https://\*.pandabuy.com").test(location.origin) && location.pathname == "/cartEstimatedFreight"){
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