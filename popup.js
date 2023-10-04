// Prepend message to all console.log messages
(function(){
    if(window.console && console.log){
        var old = console.log;
        console.log = function(){
            Array.prototype.unshift.call(arguments, 'Conversion : ');
            old.apply(this, arguments);
        }
    }  
})();

// On popup load
document.addEventListener('DOMContentLoaded', () => {
    const status_input = document.getElementById('status');
    status_input.addEventListener('change', (e) => {
        e.currentTarget.checked;
        chrome.storage.local.set({ "status": e.currentTarget.checked });
        reloadTab();
    });
    chrome.storage.local.get(["status"], (status) => {
        if(status.status) status_input.checked = true;
    });

    // Fetches the currencies.json to append to the select menu on the popup
    var xhr = new XMLHttpRequest();
    xhr.open("GET", chrome.runtime.getURL('currencies.json'));
    xhr.onreadystatechange  = function() {
        // Checks if the currencies.json fetching has ended and can proceed
        if (this.readyState == 4 && this.status === 200) {
            const currencies = JSON.parse(xhr.responseText);
            const currencySelect = document.getElementById("convertTo");

            chrome.storage.local.get(["convertTo"], (convertTo) => {
                // For each currency in the currencies.json, appends option to the select menu of the popup
                currencies.forEach(currency => {
                    const option = document.createElement("option");
                    option.value = currency.name;
                    option.text = `${currency.name} - ${currency.symbol}`;
                    currencySelect.appendChild(option);
                    if(convertTo?.convertTo === currency.name){
                        option.selected = "selected";
                    }else if(!convertTo?.convertTo && currency.name === "USD"){
                        option.selected = "selected";
                    }
                });
            });
        
            // Updates the convertTo variable in the chrome storage 
            currencySelect.addEventListener('change', () => {
                chrome.storage.local.set({ "convertTo": currencySelect.value });
                reloadTab();
            });
        }     
    }
    xhr.send();
});

// Get the tab with specified id (current tab if not specified) and reloads it
const reloadTab = (id) => {
    if(id){
        chrome.tabs.reload(tab);
    } else {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, ([tab]) => {
            chrome.tabs.reload(tab.id);
        });
    }
}