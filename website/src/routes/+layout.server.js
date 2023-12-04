/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {

    const currentNumberOfDownloads = 300;
    const premiumPrice = 399;
    const supportEmail = "pandabuycurrencyconversion@gmail.com";
    const latestUpdate = { date:"2023-11-20", description: "Added premium features for the low low price of $3.99!" };
    

    return { 
        user:locals?.user,
        premiumPrice,
        currentNumberOfDownloads,
        supportEmail,
        latestUpdate,
        extensions : [
            {
                plateforme:"chrome",
                logoUrl:"/Chrome_logo.png",
                link:"https://chrome.google.com/webstore/detail/pandabuy-currency-convert/bmefkfichlgfpmgdpkgkkebpdkfhbmnm"
            },
            {
                plateforme:"firefox",
                logoUrl:"/Firefox_logo.png",
                link:"https://addons.mozilla.org/en-US/firefox/addon/pandabuy-currency-converter/"
            },
            {
                plateforme:"opera",
                logoUrl:"/Opera_logo.png",
                link:"https://chrome.google.com/webstore/detail/pandabuy-currency-convert/bmefkfichlgfpmgdpkgkkebpdkfhbmnm"
            },
        ],
    };
}