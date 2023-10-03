// Function for actually fetching currencies convertion rates from the api
function fetchLive(callback) {
    fetch("https://api.exchangerate-api.com/v4/latest/EUR").then(res => res.json()).then((data) => {
        chrome.storage.local.set({cache: data.rates, cacheTime: Date.now()}, function() {
            callback(data.rates);
        });
    });
}

// Checking currencies convertion rates in cache (calls fetchLive if cache-miss)
function getRates(callback) {
    chrome.storage.local.get(['cache', 'cacheTime'], function(items) {
        if (items.cache && items.cacheTime && items.cacheTime) {
            if (items.cacheTime > Date.now() - 3600*1000) {
                return callback(items.cache);
            }
        }
    
        fetchLive(callback);
    });
}


// Some regex magic to convert currencies inside strings
function formatString(string, rates, currencies){
    string = string.replaceAll("~", "");
    for(const currency of currencies){
        let regex = new RegExp(currency.symbolRegex);
        string = string.replace(regex, (match) => {
            return ((Number(match.slice(currency.trimLength).trim())*currency.multiplyBy)/rates[currency.currencySymbole]).toFixed(2)+" €";
        });
    }
    return string;
}

// Checking if toggle switch on popup is enabled
chrome.storage.local.get(["status"], (status) => {
    if(status.status){
        // Gathering the currencies converting rates (trying for cache and if miss fetching it from the api)
        getRates((rates) => {
            // Fetch custom data from ./currencies.json
            var xhr = new XMLHttpRequest();
            xhr.open("GET", chrome.runtime.getURL('currencies.json'));
            xhr.onreadystatechange  = function() {
                if (this.readyState == 4 && this.status == 200) {
                    const currencies = JSON.parse(xhr.responseText);
        
                    // Getting all the text nodes and converting the currencies inside their text content every second
                    setInterval(() => {
                        const text = document.querySelectorAll("span, p, a, h1, h2, h3, h4, h5, h6, em, tr, ul, ol, tr, label, div, dd, li");
                        text.forEach(textNode => {
                            for (var i = 0; i < textNode.childNodes.length; ++i){
                                if (textNode.childNodes[i].nodeType === Node.TEXT_NODE){
                                    let nodeText = textNode.childNodes[i].textContent;
                                    let formattedText = formatString(nodeText, rates, currencies);
                                    textNode.childNodes[i].textContent = formattedText;
                                }
                            }
                        });
                    }, 1000);
                }     
            }
            xhr.send();
        });
    }
});