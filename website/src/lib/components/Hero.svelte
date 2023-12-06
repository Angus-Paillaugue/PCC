<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { page } from '$app/stores';
    import Icon from '@iconify/svelte';
    import Select from '$lib/components/Form/Select.svelte';
    import Button from '$lib/components/Button.svelte';

    const data = $page.data;

    const { extensions, getBrowserType, currentNumberOfDownloads, exchangeRates } = data;
    let extension = extensions[0];
    let numberOfDownloads = 0;
    let heroConversionRates;
    let convertTo;
    let selectedSize;
    
    const shoeType = ["Jordan_4_pure_money", "Jordan_4_cool_gray", "Jordan_4_pine_green", "Jordan_4_seafoam", "Jordan_4_thunder", "Jordan_4_royalty"];
    const heroMainShoe = shoeType[Math.floor(Math.random()*shoeType.length)];
    
    const conversionProducts = [
        {
            name:"Air force 1 white",
            sizes: [{size:39, price:160}, {size:40, price:165}, {size:41, price:170}, {size:42, price:175}, {size:43, price:180}, {size:44, price:185}],
            image:"/illustrations/home_page/Hero/Air_force_1_white.png"
        },
        {
            name:"The north face 700",
            sizes: [{size:"XS", price:360}, {size:"S", price:365}, {size:"M", price:370}, {size:"L", price:375}, {size:"XL", price:380}, {size:"XXL", price:385}],
            image:"/illustrations/home_page/Hero/The_north_face_700_jacket.webp"
        },
        {
            name:"Yeezy slide resin bone",
            sizes: [{size:39, price:119}, {size:40, price:119}, {size:41, price:120}, {size:42, price:120}, {size:43, price:121}, {size:44, price:121}],
            image:"/illustrations/home_page/Hero/Yeezy_slide_bone.webp"
        },
        {
            name:"Stussy knit sweater",
            sizes: [{size:"XS", price:65}, {size:"S", price:65}, {size:"M", price:70}, {size:"L", price:70}, {size:"XL", price:75}, {size:"XXL", price:75}],
            image:"/illustrations/home_page/Hero/Stussy_knit_sweater.webp"
        }
    ];

    const conversionProduct = conversionProducts[Math.floor(Math.random()*conversionProducts.length)];
    let randomSize = Math.floor(Math.random()*conversionProduct.sizes.length);
    selectedSize = conversionProduct.sizes[randomSize].size;

    $: heroConversionRates = exchangeRates.find(rate => rate.currency === convertTo);

    onMount(() => {
        extension = extensions.filter(el => el.plateforme === getBrowserType())[0];
        
        let interval = setInterval(() => {
            if(numberOfDownloads > (currentNumberOfDownloads - currentNumberOfDownloads/10)){
                clearInterval(interval);
            }else{
                numberOfDownloads += currentNumberOfDownloads/10;
            }
        }, 100);
    });
</script>

<!-- Hero -->
<div class="w-full min-h-[calc(100dvh-7.5rem)] h-full max-w-screen-2xl md:mx-auto p-2 my-4 lg:mt-6 flex flex-col">
    <div class="rounded-3xl overflow-hidden h-full grow relative dark:bg-gray-800 bg-neutral-100 flex flex-col justify-between">
        <div class="p-4 md:p-10 my-auto">
            <!-- Blob svg -->
            <svg viewBox="0 0 599 609" class="absolute top-0 left-0 -translate-y-1/3 -translate-x-1/3 max-md:w-full w-[600px] fill-primary-600 dark:fill-primary-900" xmlns="http://www.w3.org/2000/svg" in:fly={{ y: 50 }}>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M162.226 569.147C207.48 589.279 253.579 615.819 303.175 606.458C352.57 597.136 384.695 548.669 426.931 519.187C477.239 484.072 546.17 471.771 575.18 416.594C605.163 359.568 605.181 285.749 579.479 229.043C554.73 174.437 486.784 163.002 442.66 124.205C398.907 85.7339 378.742 13.801 321.721 2.40138C264.601 -9.01781 210.606 37.3382 158.246 67.3459C108.87 95.6431 55.0142 121.604 25.9574 171.905C-2.68448 221.487 -0.353804 281.249 2.02843 337.773C4.2855 391.328 9.76539 446.388 39.3249 489.081C68.1257 530.678 116.688 548.889 162.226 569.147Z"/>
            </svg>
            <div class="md:max-w-[600px] md:w-[60%] relative flex flex-col gap-6 md:gap-14 bg-neutral-100/50 dark:bg-neutral-800/50 backdrop-blur-md p-6 rounded-lg md:shadow-md" in:fly={{ y: 100, delay:50 }}>
                <h1>Pandabuy Currency Converter</h1>
                <p class="text-lg font-medium">The one and only tool you need for PandaBuy.<br>Now more than <b>{Math.round(numberOfDownloads)}</b> downloads! Unlock a World of Seamless Shopping: Elevate Your PandaBuy Experience with PCC – Where Smart Features and Effortless Navigation Converge for a Truly Tailored and Rapid Retail Adventure!</p>
                
                {#if extension !== undefined}
                    <Button color="primary" icon="heroicons:chevron-double-up" buttonType="link" animationTo="up" href={extension.link}>
                        <span class="transition-all duration-200 group-hover:-translate-y-[150%]">
                            Download for {extension.plateforme.charAt(0).toUpperCase()+extension.plateforme.slice(1)}
                            <img src="{extension.logoUrl}" class="h-6 ml-2 inline-block" alt="">
                        </span>
                    </Button>
                {:else}
                    <Button buttonType="button" color="secondary" class="no-scale">Not available for your browser</Button>
                {/if}
            </div>
        </div>
        <!-- Image column -->
        <div class="h-[80%] w-1/3 bg-primary-600 dark:bg-primary-900 absolute bottom-0 right-10 rounded-t-full flex flex-col items-center max-md:hidden" in:fly={{ y: 100 }}>
            <img src="/illustrations/home_page/Hero/{heroMainShoe}.webp" alt="Main shoe" class="-rotate-12 w-full" draggable="false" in:fly={{ y: 50, delay:100 }}>
        </div>
        <!-- Bottom card -->
        <div class="dark:border-primary-900 border-2 border-primary-600 dark:bg-gray-900 bg-white p-4 rounded-3xl relative" in:fly={{ y: 50, delay:150 }}>
            <Select name="heroConversion" bind:value={convertTo} label="Convert to :" flow="row">
                {#each exchangeRates as rate} 
                    <option value={rate.currency} selected="{rate.currency === "USD"}">{rate.currency} {rate.symbol}</option>
                {/each}
            </Select>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 relative mt-4" in:fly={{ y: 50, delay:200 }}>
                <!-- Without PCC -->
                <div class="p-4 flex flex-row gap-4 h-[240px] border dark:border-neutral-700 border-neutral-200 rounded-lg">
                    <img src="{conversionProduct.image}" alt={conversionProduct.name} draggable="false" class="rounded-lg my-auto md:max-h-full max-w-[50%]">
                    <div class="flex flex-col gap-1">
                        <h5>{conversionProduct.name}</h5>
                        {#key selectedSize} 
                            <p class="text-base font-semibold" in:fade>CNY ¥ {conversionProduct.sizes.find(el => el.size === selectedSize).price}</p>
                        {/key}
                        <div>
                            <p>Size :</p>
                            <div class="flex flex-row flex-wrap gap-1">
                                {#each conversionProduct.sizes as size, i}
                                    <div>
                                        <input type="radio" name="size1" id="size1-{size.size}" class="hidden peer" checked={i === randomSize} on:change={() => {document.getElementById(`size2-${size.size}`).checked=true;}} value={size.size} bind:group={selectedSize}>
                                        <label for="size1-{size.size}" class="px-2 rounded-md cursor-pointer transition-all bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 peer-checked:bg-neutral-400 peer-checked:hover:bg-neutral-400">{size.size}</label>
                                    </div>
                                {/each}
                            </div>
                        </div>
                        <Button buttonType="button" size="small" color="primary" class="w-fit mt-auto">
                            Add to cart
                        </Button>
                    </div>
                </div>
                <!-- With PCC -->
                <div class="p-4 flex flex-row gap-4 h-[240px] border dark:border-neutral-700 border-neutral-200 rounded-lg" in:fly={{ y: 50, delay:200 }}>
                    <img src="{conversionProduct.image}" alt={conversionProduct.name} draggable="false" class="rounded-lg my-auto md:max-h-full max-w-[50%]">
                    <div class="flex flex-col gap-1">
                        <h5>{conversionProduct.name}</h5>
                        {#key heroConversionRates, selectedSize} 
                            <p class="text-base font-semibold" in:fade>{heroConversionRates?.currency} {heroConversionRates?.symbol} {(conversionProduct.sizes.find(el => el.size === selectedSize).price/heroConversionRates?.rates["CNY"]).toFixed(2)}</p>
                        {/key}
                        <div>
                            <p>Size :</p>
                            <div class="flex flex-row flex-wrap gap-1">
                                {#each conversionProduct.sizes as size, i}
                                    <div>
                                        <input type="radio" name="size2" id="size2-{size.size}" class="hidden peer" checked={i === randomSize} on:change={() => {document.getElementById(`size1-${size.size}`).checked=true;}} value={size.size} bind:group={selectedSize}>
                                        <label for="size2-{size.size}" class="px-2 rounded-md cursor-pointer transition-all bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 peer-checked:bg-neutral-400 peer-checked:hover:bg-neutral-400">{size.size}</label>
                                    </div>
                                {/each}
                            </div>
                        </div>
                        <Button buttonType="button" size="small" color="primary" class="w-fit mt-auto">
                            Add to cart
                        </Button>
                    </div>
                </div>

                <!-- Change arrow -->
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" in:fly={{ y: 100, delay:300 }}>
                    <Icon icon="heroicons:arrow-long-right" class="text-7xl text-text-main dark:text-neutral-400 drop-shadow-md transition-all max-lg:rotate-90" />
                </div>
            </div>
        </div>
    </div>
</div>