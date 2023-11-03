import toggleYupooSideBar from "./features/removeYupooSideBar.js";
import conversion from "./features/conversion.js";
import productWarnings from "./features/pandabuyProductWarnings.js";
import changeYupooGrid from "./features/yupooContentWidth.js";
import { isAProductPage } from "./utils/index.js";

// Listening to yupoo design changes
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request)
    if(request === "toggledSideBar") toggleYupooSideBar();
    if(request === "productWarningsChange") productWarnings();
    if(request === "yupooContentWidthChanged") changeYupooGrid();
});

// Running (or not) the functions on page load
productWarnings();
chrome.storage.local.get(["status"], (status) => {
    status = status?.status ?? true;
    if(status) conversion();
});
chrome.storage.local.get(["autoPandaBuyRedirect"], (status) => {
    status = status?.autoPandaBuyRedirect ?? true;
    if(status && isAProductPage(location.href)){
        chrome.runtime.sendMessage({ type: "updateTabURL", url: `https://www.pandabuy.com/product?url=${encodeURIComponent(location.href)}` });
    }
});
chrome.storage.local.get(["yupooInterfaceReDesign"], (data) => {
    let yupooInterfaceReDesign = data?.yupooInterfaceReDesign ?? true;
    if(new URLPattern("\*://\*.yupoo.com/\*").test(location.href) && yupooInterfaceReDesign){
        // Remove side bar part
        chrome.storage.local.get(["removeYupooSideBar"], (status) => {
            status = status?.removeYupooSideBar ?? true;
            // If remove sidebar toggle switch is on
            toggleYupooSideBar(status);
        });

        changeYupooGrid();
    }
});