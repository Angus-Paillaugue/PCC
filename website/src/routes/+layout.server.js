/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {

    const currentNumberOfDownloads = 300;
    const premiumPrice = 399;
    const supportEmail = "pandabuycurrencyconversion@gmail.com"

    return { 
        user:locals?.user,
        premiumPrice,
        currentNumberOfDownloads,
        supportEmail,
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
    };
}