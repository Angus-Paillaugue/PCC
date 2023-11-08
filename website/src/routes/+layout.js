/** @type {import('./$types').LayoutLoad} */
export async function load({ data }) {

    const currentNumberOfDownloads = 300;
    const premiumPrice = 399;
    
    return { 
        ...data,
        premiumPrice,
        currentNumberOfDownloads,
        extensions : [
            {
                plateforme:"chrome",
                logoUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Google_Chrome_icon_%28March_2011%29.svg/2048px-Google_Chrome_icon_%28March_2011%29.svg.png",
                link:"https://chrome.google.com/webstore/detail/pandabuy-currency-convert/bmefkfichlgfpmgdpkgkkebpdkfhbmnm"
            },
            {
                plateforme:"firefox",
                logoUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Mozilla_Firefox_logo_2013.svg/800px-Mozilla_Firefox_logo_2013.svg.png",
                link:"https://addons.mozilla.org/en-US/firefox/addon/pandabuy-currency-converter/"
            }
        ],
        getBrowserType : () => {
            const test = regexp => {
                return regexp.test(navigator.userAgent);
            };
            if (test(/opr\//i) || !!window.opr) {
                return 'opera';
            } else if (test(/edg/i)) {
                return 'edge';
            } else if (test(/chrome|chromium|crios/i)) {
                return 'chrome';
            } else if (test(/firefox|fxios/i)) {
                return 'firefox';
            } else if (test(/safari/i)) {
                return 'safari';
            } else if (test(/trident/i)) {
                return 'ie';
            } else if (test(/ucbrowser/i)) {
                return 'uc';
            } else if (test(/samsungbrowser/i)) {
                return 'samsung';
            } else {
                return 'Unknown';
            }
        }
    };
}