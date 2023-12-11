import { exchangeRatesRef } from '$lib/server/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {

    const currentNumberOfDownloads = 300;
    const premiumPrice = 399;
    const supportEmail = "send.email.pcc@gmail.com";
    const latestUpdate = { date:"2023-11-20", description: "Added premium features for the low low price of $3.99!" };
    const textualRates = [
        {
            "name": "AED",
            "symbol": "د.إ"
        },
        {
            "name": "AUD",
            "symbol": "A$"
        },
        {
            "name": "BRL",
            "symbol": "R$"
        },
        {
            "name": "CAD",
            "symbol": "C$"
        },
        {
            "name": "CHF",
            "symbol": "Fr"
        },
        {
            "name": "CNY",
            "symbol": "¥"
        },
        {
            "name": "CZK",
            "symbol": "Kč"
        },
        {
            "name": "DKK",
            "symbol": "kr"
        },
        {
            "name": "EGP",
            "symbol": "E£"
        },
        {
            "name": "EUR",
            "symbol": "€"
        },
        {
            "name": "GBP",
            "symbol": "£"
        },
        {
            "name": "HKD",
            "symbol": "HK$"
        },
        {
            "name": "HUF",
            "symbol": "Ft"
        },
        {
            "name": "IDR",
            "symbol": "Rp"
        },
        {
            "name": "INR",
            "symbol": "₹"
        },
        {
            "name": "KRW",
            "symbol": "₩"
        },
        {
            "name": "MXN",
            "symbol": "Mex$"
        },
        {
            "name": "MYR",
            "symbol": "RM"
        },
        {
            "name": "NOK",
            "symbol": "kr"
        },
        {
            "name": "NZD",
            "symbol": "NZ$"
        },
        {
            "name": "PHP",
            "symbol": "₱"
        },
        {
            "name": "PLN",
            "symbol": "zł"
        },
        {
            "name": "RUB",
            "symbol": "₽"
        },
        {
            "name": "SEK",
            "symbol": "kr"
        },
        {
            "name": "SGD",
            "symbol": "S$"
        },
        {
            "name": "THB",
            "symbol": "฿"
        },
        {
            "name": "TRY",
            "symbol": "₺"
        },
        {
            "name": "USD",
            "symbol": "$"
        },
        {
            "name": "VND",
            "symbol": "₫"
        },
        {
            "name": "ZAR",
            "symbol": "R"
        }
    ]
    let exchangeRates = structuredClone(await exchangeRatesRef.findOne({ id:1 })).rates;
    exchangeRates = exchangeRates.map(rate => {return {...rate, symbol:textualRates.find(textualRate => textualRate.name === rate.currency).symbol}});
    
    return { 
        user:locals?.user,
        premiumPrice,
        exchangeRates,
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