<script>
    import { onMount } from 'svelte';
    import { reveal } from 'svelte-reveal';
    import { enhance } from '$app/forms';
    import Alert from '$lib/components/Form/Alert.svelte';
    import TextInput from '$lib/components/Form/TextInput.svelte';
    import Icon from '@iconify/svelte';
    import Button from '$lib/components/Button.svelte';
    import Tooltip from '$lib/components/Tooltip.svelte';
    import Hero from '$lib/components/Hero.svelte';

    export let form;

    let isPageLoaded = false;
    let seeMoreReleases = false;
    let releasesContainer;

    onMount(() => {
        isPageLoaded = true;
    });

    $: if(seeMoreReleases && releasesContainer){
        releasesContainer.style.maxHeight = releasesContainer.scrollHeight+"px";
    }else if(releasesContainer) {
        let sum = 0;
        for(let i = 1; i <= 5; i++){
            sum += releasesContainer.children[i].clientHeight;
        }
        releasesContainer.style.maxHeight = sum+"px";
    }

    const releases = [
        {
            "version": "2.0.0",
            "date": "2023-11-15",
            "message": "Added premium features for the low low price of $3.99!"
        },
        {
            "version": "1.4.3",
            "date": "2023-11-8",
            "message": "Added account system."
        },
        {
            "version": "1.4.0",
            "date": "2023-11-7",
            "message": "Bug fixes and improvements."
        },
        {
            "version": "1.4.0",
            "date": "2023-11-6",
            "message": "Extension interface re-design."
        },
        {
            "version": "1.3.5",
            "date": "2023-11-5",
            "message": "New feature : Inline product QC."
        },
        {
            "version": "1.3.0",
            "date": "2023-11-4",
            "message": "New feature : Remove products warnings."
        },
        {
            "version": "1.2.3",
            "date": "2023-11-4",
            "message": "New feature : Remove products warnings."
        },
        {
            "version": "1.2.1",
            "date": "2023-11-3",
            "message": "New feature : Third party disclaimer auto-check."
        },
        {
            "version": "1.2.0",
            "date": "2023-11-2",
            "message": "New experimental feature : Dark mode."
        },
        {
            "version": "1.1.5",
            "date": "2023-11-2",
            "message": "Bug fixes and improvements."
        },
        {
            "version": "1.1.2",
            "date": "2023-10-31",
            "message": "Extension interface re-design."
        },
        {
            "version": "1.1.0",
            "date": "2023-10-29",
            "message": "When navigating to a product page on a marketplace like taobao, you are redirected to the PandaBuy product page."
        },
        {
            "version": "1.0.5",
            "date": "2023-10-27",
            "message": "You can now right click on a product link to open it in PandaBuy."
        },
        {
            "version": "1.0.4",
            "date": "2023-10-25",
            "message": "Bug fixes and currency conversion algorithm changes."
        },
        {
            "version": "1.0.3",
            "date": "2023-10-19",
            "message": "Added the Yupoo custom grid and side-bar toggle."
        },
        {
            "version": "1.0.2",
            "date": "2023-10-16",
            "message": "Added a second feature : Yupoo interface redesign."
        },
        {
            "version": "1.0.1",
            "date": "2023-10-13",
            "message": "Bug fixes and improvements."
        },
        {
            "version": "1.0.0",
            "date": "2023-10-03",
            "message": "First release of PCC."
        }
    ]
    
    const sections = [
        {
            title : "How does it works?",
            description : `First, you nee to install the extension. To do so, go to <a href="/get-started" class="link" target="_blank">the extension page</a>. Then, click on "Add to Chrome". In your extensions bar, you will now see the PCC extension. The extension will now convert any currency to the one you choose. To parameter it, click on it's icon. You can now configure any settings.`,
            imgSrc : "/illustrations/home_page/How_does_it_works.png"
        },
        {
            title : "In what currency can I convert to?",
            description : `You can choose from a wide range of currencies. Here are all of them : AED (د.إ), AUD (A$), BRL (R$), CAD (C$), CHF (Fr), CNY (¥), CZK (Kč), DKK (kr), EGP (E£), EUR (€), GBP (£), HKD (HK$), HUF (Ft), IDR (Rp), INR (₹), KRW (₩), MXN (Mex$), MYR (RM), NOK (kr), NZD(NZ$), PHP (₱), PLN (zł), RUB (₽), SEK (kr), SGD (S$), THB (฿), TRY (₺), USD ($), VND (₫), ZAR (R)`,
            imgSrc : "/illustrations/home_page/In_what_currency_can_I_convert_to.png"
        },
        {
            title : "How much does it cost?",
            description : `PCC has a very generous free tier where you can access the main features without any limitations. However, if you want to access the premium features, you will need to pay a small fee of $3.99.`,
            imgSrc : "/illustrations/home_page/How_much_does_it_costs.png"
        },
        {
            title : "Is it safe?",
            description : `Yes, it is. We don't collect any data from you. We don't even know who you are or anything about you, we don't have access to any of your data, we don't even have access to your PandaBuy account.`,
            imgSrc : "/illustrations/home_page/Is_it_safe.png"
        }
    ]

    const features = [
        {
            "title": "Currency conversion",
            "description": "Tired of deciphering currency values while shopping on PandaBuy? PCC (PandaBuy Currency Converter) effortlessly parses PandaBuy pages, converting prices from CNY or other currencies into your preferred one. Stay updated with real-time exchange rates, ensuring a seamless and stress-free shopping experience.",
            "price":"free"
        },
        {
            "title": "Instant PandaBuy Access",
            "description": "Say goodbye to the hassle of manually redirecting from marketplace pages to PandaBuy. PCC automates the process, seamlessly navigating you to the corresponding PandaBuy product page as soon as you land on a marketplace product. Save time and streamline your shopping journey.",
            "price":"premium"
        },
        {
            "title":"Swift Checkout Checkbox",
            "description":"Accelerate your checkout process on PandaBuy with PCC. The extension automatically checks the required checkbox when adding a product to your cart, eliminating the need for manual confirmation. Save valuable seconds and breeze through your purchases effortlessly.",
            "price":"premium"
        },
        {
            "title":"Integrated Reviews and Photos",
            "description":"Dive deeper into product details without navigating away. PCC embeds product reviews and photos directly into the page, providing a seamless browsing experience. Make informed decisions without the hassle of constantly switching between pages.",
            "price":"premium"
        },
        {
            "title":"Customize Yupoo for Your Comfort",
            "description":"Tailor your Yupoo experience with PCC's customization options. Toggle the sidebar on and off, and adjust the product grid width to suit your preferences. Enjoy a personalized browsing experience as you explore the vast array of products on Yupoo.",
            "price":"premium"
        },
        {
            "title":"Bypass Yupoo's Delay",
            "description":"Experience zero delays when clicking on external links on Yupoo. PCC eliminates the standard 3-second delay, allowing you to navigate instantaneously to external links and swiftly discover more products without interruption.",
            "price":"premium"
        },
        {
            "title":"Enchanting Dark Mode",
            "description":"Elevate your visual experience on PandaBuy and Yupoo with PCC's Dark Mode. Enjoy a sleek and eye-friendly interface, reducing eye strain during extended shopping sessions. Immerse yourself in a stylish and comfortable browsing environment.",
            "price":"premium"
        }
    ]


</script>

<svelte:head>
    <title>PCC - The one and only tool for PandaBuy</title>
    <meta name="description" content="The one and only tool for PandaBuy shopping">
</svelte:head>

{#if isPageLoaded}

    <Hero />

    <!-- <section class="min-h-[calc(100dvh-4rem)] py-8 px-4 lg:py-16 lg:px-6 flex flex-col items-center justify-center gap-10 max-w-screen-xl w-full mx-auto">
        <img src="/logos/Square_logo.webp" alt="" class="max-w-[500px] w-full rounded-2xl shadow-xl" in:fly={{y: 50}}>
        <Card class="w-fit">
            <h2 in:fly={{y: 50, delay:50}}>PCC - Pandabuy Currency Converter</h2>
            <h6 class="font-medium" in:fly={{y: 50, delay:100}}>The one and only tool you need for PandaBuy.</h6>
            <p in:fly={{y: 50, delay:150}}>Now more than <b>{Math.round(numberOfDownloads)}</b> downloads!</p>
            <div class="flex mt-2 flex-col md:flex-row gap-4 mx-auto items-center justify-center">
                {#if extension !== undefined}
                    <Button color="primary" icon="heroicons:chevron-double-up" buttonType="link" animationTo="up" href={extension.link}>
                        <span class="transition-all duration-200 group-hover:-translate-y-[150%]">
                            Download for {extension.plateforme.charAt(0).toUpperCase()+extension.plateforme.slice(1)}
                            <img src="{extension.logoUrl}" class="h-6 ml-2 inline-block" alt="">
                        </span>
                    </Button>
                {:else}
                    <p class="text-red-600">Not available for your browser</p>
                {/if}
    
                <Button buttonType="link" color="secondary" href="#learn-more" animationTo="left" icon="heroicons:arrow-right">
                    Learn more
                </Button>
            </div>
        </Card>
    </section> -->

    <section id="learn-more" class="p-4 md:p-6 lg:p-10 flex flex-col items-center justify-center gap-10 max-w-screen-xl w-full mx-auto">
        <div class="w-full pt-24 flex flex-col gap-10">
            <h4 class="text-primary-600 font-extrabold">Learn More</h4>
            {#each sections as section, index}
                <div class="{index % 2 == 0 ? "row" : "row-reverse"} grid lg:grid-cols-5 grid-cols-1 lg:grid-flow-col rounded-2xl lg:p-10 p-6 bg-neutral-100 dark:bg-gray-800 text-start transition-all" use:reveal={{ transition: "fly", duration:200, y:60 }}>
                    <div class="rounded-2xl lg:col-span-2 {index % 2 == 0 ? "lg:-mt-0 -mt-9 lg:-ml-20 -ml-9 lg:-mr-0 -mr-9 lg:col-start-1" : "lg:-mt-0 -mt-9 lg:-ml-0 -ml-9 lg:-mr-20 -mr-9 lg:col-start-4"}">
                        <img src="{section.imgSrc}" alt="{section.title}" class="rounded-2xl w-auto h-full shadow-md {index % 2 == 0 ? "mr-auto" : "ml-auto"} max-h-[300px]">
                    </div>
                    
                    <div class="flex flex-col w-full gap-4 justify-between lg:col-span-3 {index % 2 == 0 ? "lg:pl-4 lg:col-start-3" :"lg:pr-4 lg:col-start-1"}">
                        <div class="flex flex-col w-full gap-4">
                            <h4 class="font-bold text-primary-600">{section.title}</h4>

                            <p>{@html section.description}</p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>


    <section id="features" class="p-4 md:p-6 lg:p-10 flex flex-col items-center justify-center gap-10 max-w-screen-xl w-full mx-auto">
        <div class="w-full pt-24 flex flex-col gap-10">
            <h4 class="text-primary-600 font-extrabold">Features</h4>
            <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {#each features as feature}
                <div class="flex flex-col gap-4 rounded-lg bg-neutral-100 dark:bg-gray-800 cursor-default p-4 transition-all relative">
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="absolute top-0 left-0 w-full h-full border border-neutral-300 dark:border-gray-600 rounded-lg opacity-0 hover:opacity-100 transition-all" style="--mask: 135deg; mask-image: linear-gradient(var(--mask), #fff 0%, transparent 50%)" on:mousemove={(e) => {
                            const elementRect = e.target.getBoundingClientRect();
                            const centerX = elementRect.left + elementRect.width / 2;
                            const centerY = elementRect.top + elementRect.height / 2;
                            const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180/Math.PI) - 90;
                            e.target.style.setProperty("--mask", `${angle}deg`);
                        }}></div>
                        <h5 class="font-bold flex flex-row gap-2 items-center text-primary-600">
                            {#if feature.price === "free"}
                                <Tooltip text="Free feature">
                                    <Icon icon="heroicons:currency-dollar" class="text-yellow-800 darktext-yellow-600" />
                                </Tooltip>
                            {/if}
                            {feature.title}
                        </h5>
                        <p class="p-4">{feature.description}</p>
                    </div>
                {/each}
            </div>
        </div>
    </section>
      

    <!-- <section class="p-4 md:p-6 lg:p-10 pt-24 flex flex-col items-center gap-10 max-sm:pl-6 max-w-screen-xl w-full mx-auto">
        <h4 class="text-primary-600 w-full font-extrabold">Releases</h4>

        <div class="max-w-screen-lg mx-auto w-full flex flex-col gap-4">
            <ol class="relative space-y-6 pl-8 transition-all overflow-y-hidden w-full duration-[2s] ease-in-out" bind:this={releasesContainer}>
                <li class="absolute top-8 bottom-0 left-7 border-l border-gray-200"></li>
                {#each releases as release}
                    <li class="ml-8">
                        <span class="absolute flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full left-2 ring-8 ring-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-primary-800">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                            </svg>
                        </span>
                        <h3 class="mb-1">PCC v{release.version}</h3>
                        <time class="block mb-2 text-sm font-normal leading-none text-neutral-400">Released on {new Date(release.date).toDateString()}</time>
                        <p>{release.message}</p>
                    </li>
                {/each}
            </ol>
            <button class="button-secondary mx-auto" on:click={() => {seeMoreReleases = !seeMoreReleases;}}>
                {seeMoreReleases ? "See less" : "See more"}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 transition-all {seeMoreReleases && "rotate-180"}">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
        </div>
    </section> -->

    <section class="max-w-screen-xl w-full mx-auto p-4 md:p-6 lg:p-10 items-center" id="newsletter">
        <h4 class="text-primary-600 w-full font-extrabold">Newsletter</h4>
        <div class="w-full p-0 max-sm:pt-4 md:p-6 lg:p-10 flex flex-col md:flex-row gap-10 items-center">
            <h2 class="max-lg:text-xl text-text-main dark:text-neutral-100">Want product news and updates?<br>Sign up for our newsletter.</h2>
            <div class="flex flex-col gap-4 w-full lg:w-1/2">
                <form use:enhance method="POST" class="flex flex-row gap-4" action="?/subscribeToNewsletter">
                    <TextInput name="email" type="email" placeholder="Email" class="block" />
                    <Button type="submit" buttonType="button" size="small">
                        Subscribe
                    </Button>
                </form>

                {#if form?.type === "newsletter"}  
                    <Alert type={form?.error === true ? "error" : "success"} message={form?.message} />
                {/if}
                <p>We care about your data. Read our <a href="/privacy-policy" class="link">privacy policy</a>.</p>
            </div>
        </div>
    </section>

{/if}