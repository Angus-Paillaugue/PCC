// On popup load
document.addEventListener('DOMContentLoaded', () => {
    const status_input = document.getElementById('status');
    status_input.addEventListener('change', (e) => {
        let status = e.currentTarget.checked;
        chrome.storage.local.set({ "status": status });
        reloadTab();
    });
    chrome.storage.local.get(["status"], (status) => {
        status = status?.status ?? true;
        status_input.checked = status;
    });

    const yuppoInterfaceReDesign = document.getElementById('yuppoInterfaceReDesign');
    yuppoInterfaceReDesign.addEventListener('change', (e) => {
        let status = e.currentTarget.checked;
        chrome.storage.local.set({ "yuppoInterfaceReDesign": status });
        reloadTab();
    });
    chrome.storage.local.get(["yuppoInterfaceReDesign"], (status) => {
        status = status?.yuppoInterfaceReDesign ?? true;
        yuppoInterfaceReDesign.checked = status;
    });

    const linkConversion = document.getElementById('linkConversion');
    linkConversion.addEventListener('change', (e) => {
        let status = e.currentTarget.checked;
        chrome.storage.local.set({ "linkConversion": status });
        reloadTab();
    });
    chrome.storage.local.get(["linkConversion"], (status) => {
        status = status?.linkConversion ?? true;
        linkConversion.checked = status;
    });

    chrome.storage.local.get(["yuppoContentWidth"], (status) => {
        let slider = document.getElementById("yuppoContentWidthSlider");
        let output = document.getElementById("yuppoContentWidth");
        yuppoContentWidth = status?.yuppoContentWidth ?? 180;
        slider.value = yuppoContentWidth
        output.innerHTML = yuppoContentWidth
        slider.oninput = function() {
            let newWidth = this.value;
            output.innerHTML = newWidth;
            chrome.storage.local.set({ "yuppoContentWidth": newWidth });
            chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
                var activeTab = tabs[0];
                console.log(newWidth);
                chrome.tabs.sendMessage(activeTab.id, {"yuppoContentWidthChanged": newWidth });
            });
        }
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
                    if(convertTo?.convertTo === currency.name || (!convertTo?.convertTo && currency.name === "USD")){
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