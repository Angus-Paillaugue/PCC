/**
 * Envoie un message à l'onglet actif dans la fenêtre courante.
 * @param {any} message - Le message à envoyer.
 */
function sendMessage(message){
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}


/**
 * Reloads the active tab or a specific tab matching the given URL pattern(s).
 * @param {string[]} [urlPatterns=['*:\\/\\/*'] - The URL pattern(s) to match.
 * @param {string} [url="origin"] - The URL part to match.
 * @param {number} [id] - The ID of the tab to reload.
 * @returns {void}
*/
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


/**
 * The main function of the popup.js file.
 * It retrieves the username and password from the local storage and displays the appropriate UI based on their presence.
 * If the username and password are not present, it displays the authentication UI and listens for the login form submission.
 * If the username and password are present, it displays the main UI and sets the plan text to "Premium" or "Basic" based on the isPremium value in the storage.
 * It also listens for changes in the premium features toggle buttons and updates the local storage accordingly.
 * @function
 * @name main
 * @returns {void}
 */
function main() {
    chrome.storage.local.get(["username", "password"], (data) => {
        const { username, password } = data;
        const errEl = document.getElementById("err");

        if(!username || !password) {
            if(document.getElementById("main")) document.getElementById("main").style.display = "none";
            if(document.getElementById("auth")) document.getElementById("auth").style.display = "block";
            document.getElementById("log-in").addEventListener("submit", (e) => {
                e.preventDefault();
                const button = e.submitter;
                // Adding loader to the button
                button.innerHTML = `<svg fill='none' class="w-6 h-6 animate-spin mx-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'><path clip-rule='evenodd' d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z' fill='currentColor' fill-rule='evenodd' /></svg>`;
                const username = document.getElementById("username").value;
                const password = document.getElementById("password").value;
                fetch("https://pcc.paillaugue.fr/checkPremium", { method:"POST", headers:{ "Content-Type": "application/json" }, body:JSON.stringify({ username, password }), mode:"no-cors" }).then(response => response.json()).then(data => {
                    if(!data.err) {
                        errEl.style.display = "none";
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
                    button.innerText = "Log in";
                }).catch(error => {
                    console.error("Error making the request:", error);
                });
            });
        }else {
            chrome.storage.local.get(["isPremium"], (status) => {
                const isPremium = status?.isPremium ?? false;
                if(document.getElementById("unlockFeaturesParagraph")) document.getElementById("unlockFeaturesParagraph").remove();
                if(document.getElementById("hide")) document.getElementById("hide").remove();
                if(document.getElementById("auth")) document.getElementById("auth").style.display = "none";
                if(document.getElementById("main")) document.getElementById("main").style.display = "block";
                document.getElementById("plan").innerText = isPremium ? "Premium" : "Basic";
                if(!isPremium){
                    setGrayedBackground();
                }else {
                    if(document.getElementById("hide")) document.getElementById("hide").remove();
                    setCheckBoxes();

                    //* ||--------------------------------------------------||
                    //* || Listening for the toggle of the premium features ||
                    //* ||--------------------------------------------------||

                    // Auto redirect to PandaBuy
                    const autoPandaBuyRedirect = document.getElementById('autoPandaBuyRedirect');
                    autoPandaBuyRedirect.addEventListener('change', (e) => {
                        const status = e.currentTarget.checked;
                        chrome.storage.local.set({ "autoPandaBuyRedirect": status });
                        reloadTab(["*://m.weidian.com/*", "*://weidian.com/*", "*://\*.taobao.com/*", "*://\*.1688.com/*", "*://\*.tmall.com/*"]);
                    });

                    const pandabuyProductWarnings = document.getElementById('pandabuyProductWarnings');
                    pandabuyProductWarnings.addEventListener('change', (e) => {
                        const status = e.currentTarget.checked;
                        chrome.storage.local.set({ "pandabuyProductWarnings": status });
                        sendMessage("productWarningsChange");
                    });

                    // Third party disclaimer
                    const thirdPartyDisclaimerAutoCheck = document.getElementById('thirdPartyDisclaimerAutoCheck');
                    thirdPartyDisclaimerAutoCheck.addEventListener('change', (e) => {
                        const status = e.currentTarget.checked;
                        chrome.storage.local.set({ "thirdPartyDisclaimerAutoCheck": status });
                        reloadTab(["*://\*.pandabuy.com/*"]);
                    });

                    // Custom product QC
                    const customProductQC = document.getElementById('customProductQC');
                    customProductQC.addEventListener('change', (e) => {
                        const status = e.currentTarget.checked;
                        chrome.storage.local.set({ "customProductQC": status });
                        reloadTab(["*://\*.pandabuy.com/product?*"], "href");
                    });

                    // Yupoo redesign
                    const yupooInterfaceReDesign = document.getElementById('yupooInterfaceReDesign');
                    yupooInterfaceReDesign.addEventListener('change', (e) => {
                        const status = e.currentTarget.checked;
                        chrome.storage.local.set({ "yupooInterfaceReDesign": status });
                        reloadTab(["*://\*.yupoo.com/*"]);
                        document.getElementById("yupooInterfaceReDesignChildren").style.maxHeight = (status ? document.getElementById("yupooInterfaceReDesignChildren").scrollHeight : 0) + "px";
                        setGrayedBackground();
                    });

                    // Side bar
                    const removeYupooSideBar = document.getElementById('removeYupooSideBar');
                    removeYupooSideBar.addEventListener('change', (e) => {
                        const status = e.currentTarget.checked;
                        chrome.storage.local.set({ "removeYupooSideBar": status });
                        sendMessage("toggledSideBar");
                    });

                    // Yupoo redirect skip
                    const skipYupooRedirect = document.getElementById('skipYupooRedirect');
                    skipYupooRedirect.addEventListener('change', (e) => {
                        const status = e.currentTarget.checked;
                        chrome.storage.local.set({ "skipYupooRedirect": status });
                    });

                    // ? EXPERIMENTAL : Dark mode
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
                }
            });
        }
    });
}


/**
 * Sets the checked status of various checkboxes based on their corresponding values in chrome storage.
 * @function
 * @name setCheckBoxes
 * @returns {void}
 */
function setCheckBoxes() {
    chrome.storage.local.get(["isPremium"], (status) => {
        const isPremium = status?.isPremium ?? false;
        
        const autoPandaBuyRedirect = document.getElementById('autoPandaBuyRedirect');
        chrome.storage.local.get(["autoPandaBuyRedirect"], (status) => {
            status = isPremium ? status?.autoPandaBuyRedirect ?? false : false;
            autoPandaBuyRedirect.checked = status;
        });
    
        // Third party disclaimer
        const thirdPartyDisclaimerAutoCheck = document.getElementById('thirdPartyDisclaimerAutoCheck');
        chrome.storage.local.get(["thirdPartyDisclaimerAutoCheck"], (status) => {
            status = isPremium ? status?.thirdPartyDisclaimerAutoCheck ?? false : false;
            thirdPartyDisclaimerAutoCheck.checked = status;
        });
    
        const pandabuyProductWarnings = document.getElementById('pandabuyProductWarnings');
        chrome.storage.local.get(["pandabuyProductWarnings"], (status) => {
            status = isPremium ? status?.pandabuyProductWarnings ?? false : false;
            pandabuyProductWarnings.checked = status;
        });
    
        // Custom product QC
        const customProductQC = document.getElementById('customProductQC');
        chrome.storage.local.get(["customProductQC"], (status) => {
            status = status?.customProductQC ?? false;
            customProductQC.checked = status;
        });
    
        // Yupoo redesign
        const yupooInterfaceReDesign = document.getElementById('yupooInterfaceReDesign');
        chrome.storage.local.get(["yupooInterfaceReDesign"], (status) => {
            status = isPremium ? status?.yupooInterfaceReDesign ?? false : false;
            yupooInterfaceReDesign.checked = status;
            document.getElementById("yupooInterfaceReDesignChildren").style.maxHeight = (status ? document.getElementById("yupooInterfaceReDesignChildren").scrollHeight : 0) + "px";
            setGrayedBackground();
        });
    
        // Side bar
        const removeYupooSideBar = document.getElementById('removeYupooSideBar');
        chrome.storage.local.get(["removeYupooSideBar"], (status) => {
            status = isPremium ? status?.removeYupooSideBar ?? false : false;
            removeYupooSideBar.checked = status;
        });
    
        // Yupoo redirect skip
        const skipYupooRedirect = document.getElementById('skipYupooRedirect');
        chrome.storage.local.get(["skipYupooRedirect"], (status) => {
            status = isPremium ? status?.skipYupooRedirect ?? false : false;
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
    });
}


/**
 * Sets a grayed background and a message inviting the user to upgrade to premium if they are not already a premium user.
 * @function
 * @name setGrayedBackground
 * @returns {void}
 */
function setGrayedBackground() {
    if(document.getElementById("hide")) document.getElementById("hide").remove();
    if(document.getElementById("unlockFeaturesParagraph")) document.getElementById("unlockFeaturesParagraph").remove();
    chrome.storage.local.get(["isPremium"], (status) => {
        status = status?.isPremium ?? false;
        if(!status){
            const hide = document.createElement("div");
            hide.id = "hide";
            hide.className = "absolute left-0 z-40 pointer-events-none w-full bg-neutral-600/50 text-white p-4 pointer-events-none";
        
            // Paragraph
            const p = document.createElement("p");
            p.id = "unlockFeaturesParagraph";
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
        }
    });
}


/**
 * Sets the theme of the popup based on the user's preference stored in local storage.
 * @function
 * @returns {void}
 */
function setPopupTheme() {
    const setPopupThemeSwitch = document.getElementById("popupTheme");
    setPopupThemeSwitch.addEventListener('change', (e) => {
        const status = e.currentTarget.checked;
        chrome.storage.local.set({ popupDarkTheme: status });
        setPopupTheme();
    });
    chrome.storage.local.get(["popupDarkTheme"], (status) => {
        status = status?.popupDarkTheme ?? false;
        setPopupThemeSwitch.checked = status;
        if(status){
            document.documentElement.classList.add('dark');
        }else {
            document.documentElement.classList.remove('dark');
        }
    });
}


/**
 * Refreshes the plan by fetching the user's premium status from the server and updating the local storage.
 * @param {Event} e - The event object.
 */
function refreshPlan(e) {
    const button = e.target;
    button.innerHTML = `<svg fill='none' class="w-6 h-6 animate-spin mx-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'><path clip-rule='evenodd' d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z' fill='currentColor' fill-rule='evenodd' /></svg>`;
    chrome.storage.local.get(["username", "password"], (data) => {
        const { username, password } = data;
        fetch("https://pcc.paillaugue.fr/checkPremium", { method:"POST", headers:{"Content-Type": "application/json", "Access-Control-Allow-Origin" : "*"}, body:JSON.stringify({ username, password }), mode: 'cors' }).then(response => response.json()).then(data => {
            chrome.storage.local.set({ isPremium:data.isPremium }); 
            main();
            button.innerText = "Refresh plan";
        });
    });
}

// On popup load
document.addEventListener('DOMContentLoaded', () => {
    main();
    setPopupTheme();

    document.getElementById("log-out").addEventListener("click", () => {
        chrome.storage.local.set({"username": null });
        chrome.storage.local.set({"password": null });
        chrome.storage.local.set({"isPremium": null });
        main();
    });

    document.getElementById("refreshPlan").addEventListener("click", (e) => {
        refreshPlan(e);
    });

    // Currency conversion
    const status_input = document.getElementById('status');
    status_input.addEventListener('change', (e) => {
        const status = e.currentTarget.checked;
        chrome.storage.local.set({ status });
        reloadTab(["*://\*.pandabuy.com/*", "*://\*.yupoo.com/*", "*://*.weidian.com/*", "*://weidian.com/*", "*://\*.taobao.com/*", "*://\*.1688.com/*", "*://\*.tmall.com/*"]);
        if(status) {
            document.getElementById("conversionChildren").style.maxHeight = document.getElementById("conversionChildren").scrollHeight+"px";
        }else {
            document.getElementById("conversionChildren").style.maxHeight = "0px";
        }
        setGrayedBackground();
    });
    chrome.storage.local.get(["status"], (status) => {
        status = status?.status ?? true;
        status_input.checked = status;
        if(status) {
            document.getElementById("conversionChildren").style.maxHeight = document.getElementById("conversionChildren").scrollHeight+"px";
        }else {
            document.getElementById("conversionChildren").style.maxHeight = "0px";
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



    // Footer link
    const links = document.querySelectorAll("a");
    for(const link of links){
        link.addEventListener("click", (e) => {
            chrome.tabs.create({url: e.target.getAttribute('href')});
        });
    }


    // Easter egg
    let keyStroke = [];
    document.addEventListener('keydown', event => {
        keyStroke.push(event.key);
        keyStroke.forEach((key, index) => {
            switch(index){
                case 0:
                case 1:
                    if(key !== "ArrowUp") keyStroke = [];
                    break;
                case 2:
                case 3:
                    if(key !== "ArrowDown") keyStroke = [];
                    break;
                case 4:
                case 6:
                    if(key !== "ArrowLeft") keyStroke = [];
                    break;
                case 5:
                case 7:
                    if(key !== "ArrowRight") keyStroke = [];
                    break;
                case 8:
                    if(key !== "b") keyStroke = [];
                    break;
                case 9:
                    if(key !== "a") keyStroke = [];
                    break;
            }
            if(index == 9 && keyStroke.length == 10){
                keyStroke = [];
                chrome.storage.local.get(["popupDarkTheme"], (status) => {
                    status = status?.popupDarkTheme ?? false;
                    const screamer = document.createElement("div");
                    screamer.classList = "fixed bg-neutral-500 dark:bg-neutral-400 bg-opacity-75 h-screen z-50 w-full h-full top-0 left-0 flex flex-col justify-content-center items-center";
                    screamer.innerHTML = `<img src="https://img4.wikia.nocookie.net/__cb20111014155123/creepypasta/images/a/a1/Scary_screamer.jpg" class="h-full w-auto">`;
                    screamer.id = "screamer";
                    document.body.appendChild(screamer);
                    setTimeout(() => {
                        if(document.getElementById("screamer")) document.getElementById("screamer").remove();
                    }, 1500);
                });
            }
        });
    });
});