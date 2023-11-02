// On popup load
document.addEventListener('DOMContentLoaded', () => {

    // Conversion
    const status_input = document.getElementById('status');
    status_input.addEventListener('change', (e) => {
        let status = e.currentTarget.checked;
        chrome.storage.local.set({ "status": status });
        reloadTab(["*://\*.pandabuy.com/*", "*://\*.yupoo.com/*", "https://m.weidian.com/*", "https://weidian.com/*", "*://\*.taobao.com/*", "*://\*.1688.com/*", "*://\*.tmall.com/*"]);
    });
    chrome.storage.local.get(["status"], (status) => {
        status = status?.status ?? true;
        status_input.checked = status;
    });

    // Yupoo redesign
    const yupooInterfaceReDesign = document.getElementById('yupooInterfaceReDesign');
    yupooInterfaceReDesign.addEventListener('change', (e) => {
        let status = e.currentTarget.checked;
        chrome.storage.local.set({ "yupooInterfaceReDesign": status });
        reloadTab(["*://\*.yupoo.com/*"]);
    });
    chrome.storage.local.get(["yupooInterfaceReDesign"], (status) => {
        status = status?.yupooInterfaceReDesign ?? true;
        yupooInterfaceReDesign.checked = status;
    });

    // Side bar
    const removeYupooSideBar = document.getElementById('removeYupooSideBar');
    removeYupooSideBar.addEventListener('change', (e) => {
        let status = e.currentTarget.checked;
        chrome.storage.local.set({ "removeYupooSideBar": status });
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, "toggledSideBar");
        });
    });
    chrome.storage.local.get(["removeYupooSideBar"], (status) => {
        status = status?.removeYupooSideBar ?? true;
        removeYupooSideBar.checked = status;
    });

    // Yupoo redirect skip
    const skipYupooRedirect = document.getElementById('skipYupooRedirect');
    skipYupooRedirect.addEventListener('change', (e) => {
        let status = e.currentTarget.checked;
        chrome.storage.local.set({ "skipYupooRedirect": status });
    });
    chrome.storage.local.get(["skipYupooRedirect"], (status) => {
        status = status?.skipYupooRedirect ?? true;
        skipYupooRedirect.checked = status;
    });

    // Auto redirect to PandaBuy
    const autoPandaBuyRedirect = document.getElementById('autoPandaBuyRedirect');
    autoPandaBuyRedirect.addEventListener('change', (e) => {
        let status = e.currentTarget.checked;
        chrome.storage.local.set({ "autoPandaBuyRedirect": status });
        reloadTab(["https://m.weidian.com/*", "https://weidian.com/*", "*://\*.taobao.com/*", "*://\*.1688.com/*", "*://\*.tmall.com/*"]);
    });
    chrome.storage.local.get(["autoPandaBuyRedirect"], (status) => {
        status = status?.autoPandaBuyRedirect ?? true;
        autoPandaBuyRedirect.checked = status;
    });

    // Third party disclaimer
    const thirdPartyDisclaimerAutoCheck = document.getElementById('thirdPartyDisclaimerAutoCheck');
    thirdPartyDisclaimerAutoCheck.addEventListener('change', (e) => {
        let status = e.currentTarget.checked;
        chrome.storage.local.set({ "thirdPartyDisclaimerAutoCheck": status });
        reloadTab(["*://\*.pandabuy.com/*"]);
    });
    chrome.storage.local.get(["thirdPartyDisclaimerAutoCheck"], (status) => {
        status = status?.thirdPartyDisclaimerAutoCheck ?? true;
        thirdPartyDisclaimerAutoCheck.checked = status;
    });

    // Yupoo grid
    chrome.storage.local.get(["yupooContentWidth"], (status) => {
        console.log(status)
        let slider = document.getElementById("yupooContentWidthSlider");
        let output = document.getElementById("yupooContentWidth");
        yupooContentWidth = status?.yupooContentWidth ?? 180;
        slider.value = yupooContentWidth
        output.innerHTML = yupooContentWidth
        slider.oninput = function() {
            let newWidth = this.value;
            output.innerHTML = newWidth;
            chrome.storage.local.set({ "yupooContentWidth": newWidth });
            chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
                var activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, {"yupooContentWidthChanged": newWidth });
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


    // ! EXPERIMENTAL
    // Dark mode
    const darkMode = document.getElementById('darkMode');
    darkMode.addEventListener('change', (e) => {
        let status = e.currentTarget.checked;
        chrome.storage.local.set({ "darkMode": status });
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { "darkModeToggled" : status});
        });
    });
    chrome.storage.local.get(["darkMode"], (status) => {
        status = status?.darkMode ?? false;
        darkMode.checked = status;
    });



    // Footer link
    const links = document.querySelectorAll("a");
    for(const link of links){
        link.addEventListener("click", (e) => {
            chrome.tabs.create({url: e.target.getAttribute('href')});
        })
    }
});


// Get the tab with specified id (current tab if not specified) and reloads it
const reloadTab = (urlPatterns = ["*://\*/*"], id) => {
    if(id){
        chrome.tabs.reload(tab);
    } else {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, ([tab]) => {
            for(const urlPattern of urlPatterns){
                if(new URLPattern(urlPattern).test(new URL(tab.url).origin)) {
                    chrome.tabs.reload(tab.id);
                }
            }
        });
    }
}