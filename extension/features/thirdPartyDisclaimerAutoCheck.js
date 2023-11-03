// For checking (or not) the required checkbox before adding a product to cart on PandaBuy
chrome.storage.local.get(["thirdPartyDisclaimerAutoCheck"], (status) => {
    status = status?.thirdPartyDisclaimerAutoCheck ?? true;
    if(status){
        const setCheckBox = () => {
            try {
                document.querySelector("input.el-checkbox__original").checked = true;
                document.querySelector(".el-checkbox").classList.add("is-checked");
            } catch (_) {
                setTimeout(() => {
                    setCheckBox();
                }, 1000);
            }
        }
        setTimeout(() => {
            setCheckBox();
        }, 1000);
    }
});