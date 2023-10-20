<script>
    import { onMount } from 'svelte';
    import { reveal } from 'svelte-reveal';
    import { fly } from "svelte/transition";

    export let data;

    const { extensions, getBrowserType, currentNumberOfDownloads } = data;
    let extension = extensions[0];
    let numberOfDownloads = 0;
    let isPageLoaded = false;

    onMount(() => {
        isPageLoaded = true;
        extension = extensions.filter(el => el.plateforme === getBrowserType())[0];
        
        let interval = setInterval(() => {
            if(numberOfDownloads >= (currentNumberOfDownloads - currentNumberOfDownloads/10)){
                clearInterval(interval);
            }else{
                numberOfDownloads += currentNumberOfDownloads/10;
            }
        }, 100);
    });
    
    const sections = [
        {
            title : "How does it works?",
            description : `First, you nee to install the extension. To do so, go to <a href="/get-started" class="link" target="_blank">the extension page</a>. Then, click on "Add to Chrome". In your extensions bar, you will now see the PCC extension. The extension will now convert any currency to the one you choose. To parameter it, click on it's icon. You can now configure any settings.`,
            imgSrc : "/questionMark.webp"
        },
        {
            title : "In what currency can I convert to?",
            description : `You can choose from a wide range of currencies. Here are all of them : AED (د.إ), AUD (A$), BRL (R$), CAD (C$), CHF (Fr), CNY (¥), CZK (Kč), DKK (kr), EGP (E£), EUR (€), GBP (£), HKD (HK$), HUF (Ft), IDR (Rp), INR (₹), KRW (₩), MXN (Mex$), MYR (RM), NOK (kr), NZD(NZ$), PHP (₱), PLN (zł), RUB (₽), SEK (kr), SGD (S$), THB (฿), TRY (₺), USD ($), VND (₫), ZAR (R)`,
            imgSrc : "/convertTo.webp"
        },
        {
            title : "Does it works on all sites?",
            description : `At the moment, PCC works on the most famous sites like pandabuy.com, weidian, yuppo, taobao, 1688, tmall and even reddit.`,
            imgSrc : "/workingMarketplaces.webp"
        },
        {
            title : "What if don't like the yuppo website design?",
            description : `If you are like me and don't like the yuppo website design, this extension is made for you. With PCC you can remove the page borders to fit more products on the page. You can also choose the sise of the products on the page to really customise it and please your tases.`,
            imgSrc : "/yuppoInterfaceReDesign.webp"
        }
    ]
</script>

<svelte:head>
    <title>PCC - The one and only tool for PandaBuy</title>
</svelte:head>

{#if isPageLoaded}
    <section class="min-h-[100dvh - 5rem] p-2 md:p-6 lg:px-10 md:py-4 flex flex-col items-center justify-center gap-10">
        <img src="/pandabuyLogo.webp" alt="" class="max-w-[500px] w-full rounded-2xl shadow-xl" in:fly={{y: 50}}>
        <div class="flex flex-col gap-2 border border-neutral-200 rounded-lg p-2 md:p-4" in:fly={{y: 50}}>
            <h2 in:fly={{y: 50, delay:50}}>PCC - Pandabuy Currency Converter</h2>
            <h6 class="font-medium" in:fly={{y: 50, delay:100}}>The one and only tool you need for PandaBuy.</h6>
            <p in:fly={{y: 50, delay:150}}>Now more than <b>{Math.round(numberOfDownloads)}</b> downloads!</p>
            <div class="flex mt-2 flex-col md:flex-row gap-4 mx-auto items-center justify-center">
                {#if extension !== undefined}
                    <a href="{extension.link}" class="button-primary overflow-hidden group w-fit" in:fly={{y: 100, delay:200}}>
                        <span class="transition-all duration-200 group-hover:-translate-y-[150%]">
                            Download for {extension.plateforme.charAt(0).toUpperCase()+extension.plateforme.slice(1)}
                            <img src="{extension.logoUrl}" class="h-6 ml-2 inline-block" alt="">
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all duration-200 group-hover:top-1/2 group-hover:-translate-y-1/2 absolute top-full left-1/2 -translate-x-1/2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                        </svg>
                    </a>
                {:else}
                    <p class="text-red-600">Not available for your browser</p>
                {/if}

                <a href="#learn-more" class="button-secondary-animation w-fit group" in:fly={{y: 100, delay:250}}>
                    Learn more
                    <svg class="w-5 h-5 absolute right-0 flex items-center justify-start duration-300 transform translate-x-full group-hover:-translate-x-full ease" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
            </div>
        </div>
    </section>

    <section id="learn-more" class="min-h-screen p-4 md:p-6 lg:p-10 flex flex-col items-center justify-center gap-10">
        <div class="w-full max-w-4xl mx-auto pt-24 flex flex-col gap-10">
            <h4 class="text-primary-600 font-extrabold">Learn More</h4>

            {#each sections as section, index}
                <div class="{index % 2 == 0 ? "row" : "row-reverse"} grid lg:grid-cols-5 grid-cols-1 lg:grid-flow-col rounded-2xl lg:p-10 p-6 bg-white dark:bg-gray-700 text-start transition-all border dark:border-gray-600 border-gray-300 project" use:reveal={{ transition: "fly", duration:200, y:60 }}>
                    <div class="rounded-2xl border border-gray-300 lg:col-span-3 {index % 2 == 0 ? "lg:-mt-0 -mt-9 lg:-ml-20 -ml-9 lg:-mr-0 -mr-9 lg:col-start-1" : "lg:-mt-0 -mt-9 lg:-ml-0 -ml-9 lg:-mr-20 -mr-9 lg:col-start-3"}">
                        <img src="{section.imgSrc}" alt="{section.title}" class="rounded-2xl w-full h-full">
                    </div>
                    
                    <div class="flex flex-col w-full gap-4 justify-between lg:col-span-2 {index % 2 == 0 ? "lg:pl-4 lg:col-start-4" :"lg:pr-4 lg:col-start-1"}">
                        <div class="flex flex-col w-full gap-4">
                            <h4 class="font-bold">{section.title}</h4>

                            <p>{@html section.description}</p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>
{/if}