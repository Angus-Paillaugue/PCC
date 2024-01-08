/**
 * Envoie un message à l'onglet actif dans la fenêtre courante.
 * @param {any} message - Le message à envoyer.
 */
function sendMessage(message) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
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
const reloadTab = (urlPatterns = ["*://*/*"], url = "origin", id) => {
  if (id) {
    chrome.tabs.reload(tab);
  } else {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, ([tab]) => {
      for (const urlPattern of urlPatterns) {
        if (new URLPattern(urlPattern).test(new URL(tab.url)[url])) {
          chrome.tabs.reload(tab.id);
        }
      }
    });
  }
};

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
  const conversionChildren = document.getElementById("conversionChildren");
  chrome.storage.local.get(["status"], (status) => {
    status = status?.status ?? true;
    document.getElementById("status").checked = status;
    if (status) {
      conversionChildren.style.maxHeight =
        conversionChildren.scrollHeight + "px";
    } else {
      conversionChildren.style.maxHeight = "0px";
    }
  });
  // if(isPremium){
  setCheckBoxes();

  //* ||--------------------------------------------------||
  //* || Listening for the toggle of the premium features ||
  //* ||--------------------------------------------------||

  // Auto redirect to PandaBuy
  const autoPandaBuyRedirect = document.getElementById("autoPandaBuyRedirect");
  autoPandaBuyRedirect.addEventListener("change", (e) => {
    const status = e.currentTarget.checked;
    chrome.storage.local.set({ autoPandaBuyRedirect: status });
    reloadTab([
      "*://m.weidian.com/*",
      "*://weidian.com/*",
      "*://*.taobao.com/*",
      "*://*.1688.com/*",
      "*://*.tmall.com/*",
    ]);
  });

  const pandabuyProductWarnings = document.getElementById(
    "pandabuyProductWarnings",
  );
  pandabuyProductWarnings.addEventListener("change", (e) => {
    const status = e.currentTarget.checked;
    chrome.storage.local.set({ pandabuyProductWarnings: status });
    sendMessage("productWarningsChange");
  });

  // Third party disclaimer
  const thirdPartyDisclaimerAutoCheck = document.getElementById(
    "thirdPartyDisclaimerAutoCheck",
  );
  thirdPartyDisclaimerAutoCheck.addEventListener("change", (e) => {
    const status = e.currentTarget.checked;
    chrome.storage.local.set({ thirdPartyDisclaimerAutoCheck: status });
    reloadTab(["*://*.pandabuy.com/product?*"], "href");
  });

  // Custom product QC
  const customProductQC = document.getElementById("customProductQC");
  customProductQC.addEventListener("change", (e) => {
    const status = e.currentTarget.checked;
    chrome.storage.local.set({ customProductQC: status });
    reloadTab(["*://*.pandabuy.com/product?*"], "href");
  });

  // Yupoo redesign
  const yupooInterfaceReDesign = document.getElementById(
    "yupooInterfaceReDesign",
  );
  yupooInterfaceReDesign.addEventListener("change", (e) => {
    const status = e.currentTarget.checked;
    chrome.storage.local.set({ yupooInterfaceReDesign: status });
    reloadTab(["*://*.yupoo.com/*"]);
    document.getElementById("yupooInterfaceReDesignChildren").style.maxHeight =
      (status
        ? document.getElementById("yupooInterfaceReDesignChildren").scrollHeight
        : 0) + "px";
  });

  // Side bar
  const removeYupooSideBar = document.getElementById("removeYupooSideBar");
  removeYupooSideBar.addEventListener("change", (e) => {
    const status = e.currentTarget.checked;
    chrome.storage.local.set({ removeYupooSideBar: status });
    sendMessage("toggledSideBar");
  });

  // Yupoo redirect skip
  const skipYupooRedirect = document.getElementById("skipYupooRedirect");
  skipYupooRedirect.addEventListener("change", (e) => {
    const status = e.currentTarget.checked;
    chrome.storage.local.set({ skipYupooRedirect: status });
  });

  // Dark mode
  const darkMode = document.getElementById("darkMode");
  darkMode.addEventListener("change", (e) => {
    const status = e.currentTarget.checked;
    chrome.storage.local.set({ darkMode: status });
    sendMessage("darkModeToggled");
  });
  chrome.storage.local.get(["darkMode"], (status) => {
    status = status?.darkMode ?? false;
    darkMode.checked = status;
  });

  // ? EXPERIMENTAL : Agent switcher
  // const agentSwitch = document.getElementById('agentSwitch');
  // const agents = ["PandaBuy", "CSSBuy", "Sugargoo"]
  // agentSwitch.addEventListener('change', () => {
  //     chrome.storage.local.set({ "agent": agentSwitch.value });
  //     sendMessage("agentSwitched");
  // });
  // chrome.storage.local.get(["agent"], (agent) => {
  //     if(!agent?.agent) chrome.storage.local.set({ "agent": agents[0] });
  //     agent = agent?.agent ?? agents[0];
  //     agents.forEach(el => {
  //         const option = document.createElement("option");
  //         option.value = el;
  //         option.text = el;
  //         agentSwitch.appendChild(option);
  //         if(agent === el) option.selected = "selected";
  //     });
  // });
  // }
  //         });
  //     }
  // });
}

/**
 * Sets the checked status of various checkboxes based on their corresponding values in chrome storage.
 * @function
 * @name setCheckBoxes
 * @returns {void}
 */
function setCheckBoxes() {

  const autoPandaBuyRedirect = document.getElementById("autoPandaBuyRedirect");
  chrome.storage.local.get(["autoPandaBuyRedirect"], (status) => {
    // status = isPremium ? status?.autoPandaBuyRedirect ?? false : false;
    status = status?.autoPandaBuyRedirect ?? false;
    autoPandaBuyRedirect.checked = status;
  });

  // Third party disclaimer
  const thirdPartyDisclaimerAutoCheck = document.getElementById(
    "thirdPartyDisclaimerAutoCheck",
  );
  chrome.storage.local.get(["thirdPartyDisclaimerAutoCheck"], (status) => {
    // status = isPremium ? status?.thirdPartyDisclaimerAutoCheck ?? false : false;
    status = status?.thirdPartyDisclaimerAutoCheck ?? false;
    thirdPartyDisclaimerAutoCheck.checked = status;
  });

  const pandabuyProductWarnings = document.getElementById(
    "pandabuyProductWarnings",
  );
  chrome.storage.local.get(["pandabuyProductWarnings"], (status) => {
    // status = isPremium ? status?.pandabuyProductWarnings ?? false : false;
    status = status?.pandabuyProductWarnings ?? false;
    pandabuyProductWarnings.checked = status;
  });

  // Custom product QC
  const customProductQC = document.getElementById("customProductQC");
  chrome.storage.local.get(["customProductQC"], (status) => {
    // status = status?.customProductQC ?? false;
    status = status?.customProductQC ?? false;
    customProductQC.checked = status;
  });

  // Yupoo redesign
  const yupooInterfaceReDesign = document.getElementById(
    "yupooInterfaceReDesign",
  );
  chrome.storage.local.get(["yupooInterfaceReDesign"], (status) => {
    // status = isPremium ? status?.yupooInterfaceReDesign ?? false : false;
    status = status?.yupooInterfaceReDesign ?? false;
    yupooInterfaceReDesign.checked = status;
    document.getElementById("yupooInterfaceReDesignChildren").style.maxHeight =
      (status
        ? document.getElementById("yupooInterfaceReDesignChildren").scrollHeight
        : 0) + "px";
  });

  // Side bar
  const removeYupooSideBar = document.getElementById("removeYupooSideBar");
  chrome.storage.local.get(["removeYupooSideBar"], (status) => {
    // status = isPremium ? status?.removeYupooSideBar ?? false : false;
    status = status?.removeYupooSideBar ?? false;
    removeYupooSideBar.checked = status;
  });

  // Yupoo redirect skip
  const skipYupooRedirect = document.getElementById("skipYupooRedirect");
  chrome.storage.local.get(["skipYupooRedirect"], (status) => {
    // status = isPremium ? status?.skipYupooRedirect ?? false : false;
    status = status?.skipYupooRedirect ?? false;
    skipYupooRedirect.checked = status;
  });

  // Yupoo grid
  chrome.storage.local.get(["yupooContentWidth"], (status) => {
    const slider = document.getElementById("yupooContentWidthSlider");
    const output = document.getElementById("yupooContentWidth");
    yupooContentWidth = status?.yupooContentWidth ?? 180;
    slider.value = yupooContentWidth;
    output.innerHTML = yupooContentWidth;
    slider.oninput = function () {
      const newWidth = this.value;
      output.innerHTML = newWidth;
      chrome.storage.local.set({ yupooContentWidth: newWidth });
      sendMessage("yupooContentWidthChanged");
    };
  });
}

/**
 * Sets the theme of the popup based on the user's preference stored in local storage.
 * @function
 * @returns {void}
 */
function setPopupTheme() {
  const setPopupThemeSwitch = document.getElementById("popupTheme");
  setPopupThemeSwitch.addEventListener("change", (e) => {
    const status = e.currentTarget.checked;
    chrome.storage.local.set({ popupDarkTheme: status });
    setPopupTheme();
  });
  chrome.storage.local.get(["popupDarkTheme"], (status) => {
    status = status?.popupDarkTheme ?? false;
    setPopupThemeSwitch.checked = status;
    if (status) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
}

/**
 * Sets the update banner in the popup window.
 * Retrieves the extension version from the manifest.json and chrome storage,
 * and updates the banner if a new version is available.
 * @function
 * @returns {void}
 */
function setUpdateBanner() {
  // Get the extension version from the manifest.json
  const extensionVersion = chrome.runtime.getManifest().version;
  const updateNotes = chrome.runtime.getManifest().update_notes;
  const updateBanner = document.getElementById("updateBanner");

  // Get the extension version from the chrome storage
  chrome.storage.local.get(["extensionVersion"], (status) => {
    status = status?.extensionVersion ?? "0.0.0";
    if (status !== extensionVersion) {
      updateBanner.querySelector("p").innerHTML =
        `<span class="text-base"><span class="font-bold">New update v${extensionVersion}</span> : ${updateNotes}</span>`;
      updateBanner.classList.remove("-mt-12");
      updateBanner.querySelector("button").addEventListener("click", () => {
        console.log("click");
        chrome.storage.local.set({ extensionVersion });
        updateBanner.classList.add("-mt-12");
      });
    }
  });
}

// On popup load
document.addEventListener("DOMContentLoaded", () => {
  main();
  setPopupTheme();
  setUpdateBanner();

  // Currency conversion
  const status_input = document.getElementById("status");
  const conversionChildren = document.getElementById("conversionChildren");
  status_input.addEventListener("change", (e) => {
    const status = e.currentTarget.checked;
    chrome.storage.local.set({ status });
    reloadTab([
      "*://*.pandabuy.com/*",
      "*://*.yupoo.com/*",
      "*://*.weidian.com/*",
      "*://weidian.com/*",
      "*://*.taobao.com/*",
      "*://*.1688.com/*",
      "*://*.tmall.com/*",
    ]);
    if (status) {
      conversionChildren.style.maxHeight =
        conversionChildren.scrollHeight + "px";
    } else {
      conversionChildren.style.maxHeight = "0px";
    }
  });
  chrome.storage.local.get(["status"], (status) => {
    status = status?.status ?? true;
    status_input.checked = status;
    if (status) {
      conversionChildren.style.maxHeight =
        conversionChildren.scrollHeight + "px";
    } else {
      conversionChildren.style.maxHeight = "0px";
    }
  });

  // Fetches the currencies.json to append to the select menu on the popup
  const xhr = new XMLHttpRequest();
  xhr.open("GET", chrome.runtime.getURL("currencies.json"));
  xhr.onreadystatechange = function () {
    // Checks if the currencies.json fetching has ended and can proceed
    if (this.readyState == 4 && this.status === 200) {
      const currencies = JSON.parse(xhr.responseText);
      const currencySelect = document.getElementById("convertTo");

      chrome.storage.local.get(["convertTo"], (convertTo) => {
        // For each currency in the currencies.json, appends option to the select menu of the popup
        currencies.forEach((currency) => {
          const option = document.createElement("option");
          option.value = currency.name;
          option.text = `${currency.name} - ${currency.symbol}`;
          currencySelect.appendChild(option);
          if (
            convertTo?.convertTo === currency.name ||
            (!convertTo?.convertTo && currency.name === "USD")
          ) {
            option.selected = "selected";
          }
        });
      });

      // Updates the convertTo variable in the chrome storage
      currencySelect.addEventListener("change", () => {
        chrome.storage.local.set({ convertTo: currencySelect.value });
        reloadTab();
      });
    }
  };
  xhr.send();

  // Footer link
  const links = document.querySelectorAll("a");
  for (const link of links) {
    link.addEventListener("click", (e) => {
      chrome.tabs.create({ url: e.target.getAttribute("href") });
    });
  }

  // Easter egg
  let keyStroke = [];
  document.addEventListener("keydown", (event) => {
    keyStroke.push(event.key);
    keyStroke.forEach((key, index) => {
      switch (index) {
        case 0:
        case 1:
          if (key !== "ArrowUp") keyStroke = [];
          break;
        case 2:
        case 3:
          if (key !== "ArrowDown") keyStroke = [];
          break;
        case 4:
        case 6:
          if (key !== "ArrowLeft") keyStroke = [];
          break;
        case 5:
        case 7:
          if (key !== "ArrowRight") keyStroke = [];
          break;
        case 8:
          if (key !== "b") keyStroke = [];
          break;
        case 9:
          if (key !== "a") keyStroke = [];
          break;
      }
      if (index == 9 && keyStroke.length == 10) {
        keyStroke = [];
        chrome.storage.local.get(["popupDarkTheme"], (status) => {
          status = status?.popupDarkTheme ?? false;
          const screamer = document.createElement("div");
          screamer.classList =
            "fixed bg-neutral-500 dark:bg-neutral-400 bg-opacity-75 h-screen z-50 w-full h-full top-0 left-0 flex flex-col justify-content-center items-center";
          screamer.innerHTML = `<img src="/src/Screamer.webp" class="h-full w-auto">`;
          screamer.id = "screamer";
          document.body.appendChild(screamer);
          setTimeout(() => {
            if (document.getElementById("screamer"))
              document.getElementById("screamer").remove();
          }, 1500);
        });
      }
    });
  });
});
