function sendMessage(message){
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}

function main() {
    chrome.storage.local.get(["username", "password"], (data) => {
        const { username, password } = data;
        const errEl = document.getElementById("err");

        if(!username || !password) {
            if(document.getElementById("main")) document.getElementById("main").style.display = "none";
            if(document.getElementById("auth")) document.getElementById("auth").style.display = "block";
            document.getElementById("log-in").addEventListener("submit", (e) => {
                e.preventDefault();
                errEl.style.display = "none";
                const username = document.getElementById("username").value;
                const password = document.getElementById("password").value;
                fetch("https://pcc.paillaugue.fr/checkPremium", { method:"POST", headers:{"Content-Type": "application/json"}, body:JSON.stringify({ username, password }) }).then(response => response.json()).then(data => {
                    if(!data.err) {
                        chrome.storage.local.set({ isPremium:data.isPremium });
                        chrome.storage.local.set({"username": username });
                        chrome.storage.local.set({"password": password });
                        if(document.getElementById("main")) document.getElementById("main").style.display = "block";
                        if(document.getElementById("auth")) document.getElementById("auth").style.display = "none";
                        main();
                    }else {
                        errEl.style.display = "flex";
                        errEl.innerText = data.err;
                    }
                }).catch(error => {
                    console.error("Error making the request:", error);
                });
            });
        }else {
            chrome.storage.local.get(["isPremium"], (status) => {
                const isPremium = status?.isPremium ?? false;
                if(document.getElementById("unlockFeaturesParagraph")) document.getElementById("unlockFeaturesParagraph").style.display = "none";
                if(document.getElementById("auth")) document.getElementById("auth").style.display = "none";
                if(document.getElementById("main")) document.getElementById("main").style.display = "block";
                document.getElementById("plan").innerText = isPremium ? "Premium" : "Basic";
                if(!isPremium && !document.getElementById("hide")){
                    // Grayed background
                    const hide = document.createElement("div");
                    hide.id = "hide";
                    hide.className = "bg-neutral-600/50 absolute left-0 z-20 pointer-events-none w-full bottom-0 flex flex-col text-white items-center p-4";

                    // Paragraph
                    const p = document.createElement("p");
                    p.id = "unlockFeaturesParagraph"
                    p.className = "text-base font-bold px-4 block text-center";
                    p.innerHTML = `To unlock all these features, `;
                    // Link
                    const a = document.createElement("a");
                    a.href = "https://pcc.paillaugue.fr/pricing";
                    a.innerText = "Upgrade to premium";
                    a.addEventListener("click", (e) => {
                        chrome.tabs.create({url: e.target.getAttribute('href')});
                    });
                    p.appendChild(a);

                    // Appending message and grayed background
                    document.querySelector("#main > section:nth-child(1)").appendChild(p);
                    hide.style.top = document.querySelector("#main > section:nth-child(2)").offsetTop + "px";
                    hide.style.bottom = window.innerHeight - (document.querySelector("#main > section:nth-last-child(2)").offsetTop + document.querySelector("#main > section:nth-last-child(2)").clientHeight) + "px";
                    document.body.appendChild(hide);
                }else if (isPremium) {
                    if(document.getElementById("hide")) document.getElementById("hide").remove()
                }
            });
        }
    });
}


// On popup load
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("log-out").addEventListener("click", () => {
        chrome.storage.local.set({"username": null });
        chrome.storage.local.set({"password": null });
        chrome.storage.local.set({"isPremium": null });
        main();
    });

    document.getElementById("refreshPlan").addEventListener("click", () => {
        chrome.storage.local.get(["username", "password"], (data) => {
            const { username, password } = data;
            fetch("https://pcc.paillaugue.fr/checkPremium", { method:"POST", headers:{"Content-Type": "application/json"}, body:JSON.stringify({ username, password }) }).then(response => response.json()).then(data => {
                chrome.storage.local.set({ isPremium:data.isPremium }); 
                main();
            });
        });
    })

    main();

    // Conversion
    const status_input = document.getElementById('status');
    status_input.addEventListener('change', (e) => {
        const status = e.currentTarget.checked;
        chrome.storage.local.set({ "status": status });
        reloadTab(["*://\*.pandabuy.com/*", "*://\*.yupoo.com/*", "https://m.weidian.com/*", "https://weidian.com/*", "*://\*.taobao.com/*", "*://\*.1688.com/*", "*://\*.tmall.com/*"]);
    });
    chrome.storage.local.get(["status"], (status) => {
        status = status?.status ?? true;
        status_input.checked = status;
    });

    // Auto redirect to PandaBuy
    const autoPandaBuyRedirect = document.getElementById('autoPandaBuyRedirect');
    autoPandaBuyRedirect.addEventListener('change', (e) => {
        const status = e.currentTarget.checked;
        chrome.storage.local.set({ "autoPandaBuyRedirect": status });
        reloadTab(["https://m.weidian.com/*", "https://weidian.com/*", "*://\*.taobao.com/*", "*://\*.1688.com/*", "*://\*.tmall.com/*"]);
    });
    chrome.storage.local.get(["autoPandaBuyRedirect"], (status) => {
        status = status?.autoPandaBuyRedirect ?? false;
        autoPandaBuyRedirect.checked = status;
    });

    const pandabuyProductWarnings = document.getElementById('pandabuyProductWarnings');
    pandabuyProductWarnings.addEventListener('change', (e) => {
        const status = e.currentTarget.checked;
        chrome.storage.local.set({ "pandabuyProductWarnings": status });
        sendMessage("productWarningsChange");
    });
    chrome.storage.local.get(["pandabuyProductWarnings"], (status) => {
        status = status?.pandabuyProductWarnings ?? false;
        pandabuyProductWarnings.checked = status;
    });

    // Third party disclaimer
    const thirdPartyDisclaimerAutoCheck = document.getElementById('thirdPartyDisclaimerAutoCheck');
    thirdPartyDisclaimerAutoCheck.addEventListener('change', (e) => {
        const status = e.currentTarget.checked;
        chrome.storage.local.set({ "thirdPartyDisclaimerAutoCheck": status });
        reloadTab(["*://\*.pandabuy.com/*"]);
    });
    chrome.storage.local.get(["thirdPartyDisclaimerAutoCheck"], (status) => {
        status = status?.thirdPartyDisclaimerAutoCheck ?? false;
        thirdPartyDisclaimerAutoCheck.checked = status;
    });

    // Third party disclaimer
    const customProductQC = document.getElementById('customProductQC');
    customProductQC.addEventListener('change', (e) => {
        const status = e.currentTarget.checked;
        chrome.storage.local.set({ "customProductQC": status });
        reloadTab(["*://\*.pandabuy.com/product?*"], "href");
    });
    chrome.storage.local.get(["customProductQC"], (status) => {
        status = status?.customProductQC ?? false;
        customProductQC.checked = status;
    });

    // Yupoo redesign
    const yupooInterfaceReDesign = document.getElementById('yupooInterfaceReDesign');
    yupooInterfaceReDesign.addEventListener('change', (e) => {
        const status = e.currentTarget.checked;
        chrome.storage.local.set({ "yupooInterfaceReDesign": status });
        reloadTab(["*://\*.yupoo.com/*"]);
    });
    chrome.storage.local.get(["yupooInterfaceReDesign"], (status) => {
        status = status?.yupooInterfaceReDesign ?? false;
        yupooInterfaceReDesign.checked = status;
    });

    // Side bar
    const removeYupooSideBar = document.getElementById('removeYupooSideBar');
    removeYupooSideBar.addEventListener('change', (e) => {
        const status = e.currentTarget.checked;
        chrome.storage.local.set({ "removeYupooSideBar": status });
        sendMessage("toggledSideBar");
    });
    chrome.storage.local.get(["removeYupooSideBar"], (status) => {
        status = status?.removeYupooSideBar ?? false;
        removeYupooSideBar.checked = status;
    });

    // Yupoo redirect skip
    const skipYupooRedirect = document.getElementById('skipYupooRedirect');
    skipYupooRedirect.addEventListener('change', (e) => {
        const status = e.currentTarget.checked;
        chrome.storage.local.set({ "skipYupooRedirect": status });
    });
    chrome.storage.local.get(["skipYupooRedirect"], (status) => {
        status = status?.skipYupooRedirect ?? false;
        skipYupooRedirect.checked = status;
    });

    // Yupoo grid
    chrome.storage.local.get(["yupooContentWidth"], (status) => {
        const slider = document.getElementById("yupooContentWidthSlider");
        const output = document.getElementById("yupooContentWidth");
        yupooContentWidth = status?.yupooContentWidth ?? 180;
        slider.value = yupooContentWidth
        output.innerHTML = yupooContentWidth
        slider.oninput = function() {
            const newWidth = this.value;
            output.innerHTML = newWidth;
            chrome.storage.local.set({ "yupooContentWidth": newWidth });
            sendMessage("yupooContentWidthChanged");
        }
    });
    
    // Fetches the currencies.json to append to the select menu on the popup
    const xhr = new XMLHttpRequest();
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
        const status = e.currentTarget.checked;
        chrome.storage.local.set({ "darkMode": status });
        sendMessage("darkModeToggled");
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
        });
    }
});


// Get the tab with specified id (current tab if not specified) and reloads it
const reloadTab = (urlPatterns = ["*://\*/*"], url="origin", id) => {
    if(id){
        chrome.tabs.reload(tab);
    } else {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, ([tab]) => {
            for(const urlPattern of urlPatterns){
                if(new URLPattern(urlPattern).test(new URL(tab.url)[url])) {
                    chrome.tabs.reload(tab.id);
                }
            }
        });
    }
}